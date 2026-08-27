import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/**
 * Cover-fit sampling + slow fluid displacement, breathing zoom, pointer
 * parallax, chromatic edge split, honey light bloom, vignette and film grain.
 */
const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_img;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_intro;
uniform float u_scroll;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // cover fit
  float canvasAspect = u_res.x / u_res.y;
  float imgAspect = u_img.x / u_img.y;
  vec2 scale = canvasAspect > imgAspect
    ? vec2(1.0, imgAspect / canvasAspect)
    : vec2(canvasAspect / imgAspect, 1.0);
  vec2 flipped = vec2(v_uv.x, 1.0 - v_uv.y);
  vec2 uv = (flipped - 0.5) / scale + 0.5;

  // breathing zoom + intro push-in
  float zoom = 1.06 + 0.02 * sin(u_time * 0.18) + 0.10 * (1.0 - u_intro) + 0.22 * u_scroll;
  uv = (uv - 0.5) / zoom + 0.5;

  // pointer parallax
  uv += u_pointer * vec2(-0.055, -0.042);
  // scroll-synced vertical drift
  uv.y += u_scroll * 0.08;

  // slow fluid drift
  float n1 = noise(uv * 3.0 + vec2(u_time * 0.045, u_time * 0.03));
  float n2 = noise(uv * 5.5 - vec2(u_time * 0.03, u_time * 0.05));
  vec2 flow = vec2(n1 - 0.5, n2 - 0.5) * (0.012 + 0.02 * u_scroll);
  uv += flow;

  // subtle chromatic split away from centre
  vec2 dir = (v_uv - 0.5);
  float ca = 0.0022 + 0.0016 * length(dir);
  vec3 col;
  col.r = texture2D(u_tex, uv + dir * ca).r;
  col.g = texture2D(u_tex, uv).g;
  col.b = texture2D(u_tex, uv - dir * ca).b;

  // honey light bloom sweeping slowly across the frame
  float sweep = smoothstep(0.55, 0.0, abs(v_uv.x - (0.5 + 0.45 * sin(u_time * 0.12))));
  col += vec3(0.92, 0.66, 0.28) * sweep * 0.02;

  // vignette
  float vig = smoothstep(1.15, 0.25, length((v_uv - 0.5) * vec2(1.05, 1.25)) * 1.35);
  col *= mix(0.42, 1.0, vig);
  // deepen as the hero scrolls away
  col *= 1.0 - 0.35 * u_scroll;

  // film grain
  float g = hash(v_uv * u_res + fract(u_time) * 91.7) - 0.5;
  col += g * 0.035;

  gl_FragColor = vec4(col, u_intro);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/**
 * Renders an image through a WebGL shader for a living, cinematic backdrop.
 * Falls back to the plain <img> when WebGL is unavailable or motion is reduced.
 */
export function WebGLImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(program, "u_tex");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uImg = gl.getUniformLocation(program, "u_img");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    const uIntro = gl.getUniformLocation(program, "u_intro");
    const uScroll = gl.getUniformLocation(program, "u_scroll");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let frame = 0;
    let ready = false;
    let start = 0;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const scroll = { current: 0, target: 0 };

    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const span = rect.height || window.innerHeight;
      scroll.target = Math.min(1, Math.max(0, -rect.top / span));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const onPointer = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(uTex, 0);
      gl.uniform2f(uImg, image.naturalWidth, image.naturalHeight);
      resize();
      ready = true;
      start = performance.now();
      setActive(true);
    };
    image.src = src;

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!ready) return;
      const elapsed = (now - start) / 1000;
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      scroll.current += (scroll.target - scroll.current) * 0.08;
      gl.uniform1f(uScroll, scroll.current);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uIntro, Math.min(1, elapsed / 1.6));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    frame = requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [src]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="eager"
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          active ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

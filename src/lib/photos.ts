import logoAsset from "@/assets/aysan-army-logo.png.asset.json";
import wordmarkAsset from "@/assets/aysan-army-wordmark.png.asset.json";
import pilatesAsset from "@/assets/pilates-studio.png.asset.json";
import ringAsset from "@/assets/ring-hall.png.asset.json";
import strengthAsset from "@/assets/strength-hall.png.asset.json";

export const logoUrl = logoAsset.url;
export const wordmarkUrl = wordmarkAsset.url;

export const clubPhotos = {
  ring: {
    url: ringAsset.url,
    alt: "Kulübün halat kenarlıklı boks ringi, klasik büstler ve kum torbalarıyla aydınlatılmış salon",
  },
  pilates: {
    url: pilatesAsset.url,
    alt: "Ahşap reformer ve cadillac ekipmanlarının bulunduğu, aynalarla ferahlatılmış pilates stüdyosu",
  },
  strength: {
    url: strengthAsset.url,
    alt: "Ahşap raflarda sıralanmış paslanmaz çelik dambıl seti ve kuvvet antrenman alanı",
  },
} as const;

export const clubPhotoList = [clubPhotos.ring, clubPhotos.pilates, clubPhotos.strength];

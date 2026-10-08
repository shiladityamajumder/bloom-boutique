import Link from "next/link";
import Image from "next/image";
import { imagePath } from "@/lib/images";
import { FlowerMark } from "./FlowerMark";

export function BrandLogo({
  mark = "botanical",
}: {
  mark?: "botanical" | "crest";
}) {
  return (
    <Link href="/" className="brand-logo" aria-label="L’Âme des Fleurs home">
      {mark === "crest" ? (
        <Image
          className="brand-logo__mark"
          src={imagePath("brand-mark")}
          width={80}
          height={80}
          alt=""
          sizes="80px"
        />
      ) : (
        <FlowerMark className="brand-logo__mark" />
      )}
      <span className="brand-logo__copy">
        <span className="brand-logo__name">L’Âme des Fleurs</span>
        <span className="brand-logo__tagline">
          Flowers · Bouquets · A Brighter Tomorrow
        </span>
      </span>
    </Link>
  );
}

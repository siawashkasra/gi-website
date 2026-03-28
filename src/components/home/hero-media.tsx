import Image from "next/image";

type HeroMediaProps = { imageSrc: string };

export function HeroMedia({ imageSrc }: HeroMediaProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Image src={imageSrc} alt="" fill className="object-cover object-center" priority sizes="100vw" aria-hidden />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type HeroMediaProps = { posterSrc: string; videoSrc: string };

export function HeroMedia({ posterSrc, videoSrc }: HeroMediaProps) {
  const [videoOk, setVideoOk] = useState(true);
  const onVideoError = useCallback(() => setVideoOk(false), []);
  return (
    <div className="absolute inset-0 z-0">
      <Image src={posterSrc} alt="" fill className="object-cover object-center" priority sizes="100vw" aria-hidden />
      {videoOk ? (
        <video className="absolute inset-0 h-full w-full object-cover object-center" autoPlay muted loop playsInline poster={posterSrc} aria-hidden onError={onVideoError}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

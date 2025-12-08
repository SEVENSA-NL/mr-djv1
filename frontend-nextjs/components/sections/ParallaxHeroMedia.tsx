'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
};

export default function ParallaxHeroMedia({ src, alt, priority, className, overlayClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div ref={ref} className={className ? `absolute inset-0 ${className}` : 'absolute inset-0'}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale }}>
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" quality={90} />
      </motion.div>
      {overlayClassName ? <div className={overlayClassName} /> : null}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ServiceCard as ServiceCardType } from '@/lib/types/service';

interface ServiceCardProps {
  service: ServiceCardType;
  variant?: 'clickable' | 'static';
}

export function ServiceCard({ service, variant = 'clickable' }: ServiceCardProps) {
  const { title, icon, description, href } = service;
  const baseClasses = 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition';

  if (variant === 'static') {
    return (
      <div className={`${baseClasses} bg-slate-50`}>
        <div className="mb-3 text-4xl">{icon}</div>
        <h2 className="mb-2 text-xl font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} group hover:shadow-md`}>
      <div className="mb-3 text-4xl">{icon}</div>
      <h2 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-amber-600">{title}</h2>
      <p className="mb-4 text-sm text-slate-600">{description}</p>
      <span className="text-sm font-medium text-amber-600 group-hover:underline">
        Meer over {title.toLowerCase()} →
      </span>
    </Link>
  );
}

export default ServiceCard;

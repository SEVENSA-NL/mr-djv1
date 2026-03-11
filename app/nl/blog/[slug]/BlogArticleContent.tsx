"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { getPublishedPosts, type BlogPost } from "@/src/data/blog-posts";

interface Props {
  post: BlogPost;
}

const categoryColors: Record<string, string> = {
  bruiloften: "bg-pink-500/20 text-pink-300",
  tips: "bg-blue-500/20 text-blue-300",
  prijzen: "bg-green-500/20 text-green-300",
  bedrijfsfeesten: "bg-purple-500/20 text-purple-300",
  lokaal: "bg-orange-500/20 text-orange-300",
  entertainment: "bg-cyan-500/20 text-cyan-300",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function BlogArticleContent({ post }: Props) {
  const related = getPublishedPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: "nl",
    author: {
      "@type": "Organization",
      name: "Mister DJ",
      url: "https://mr-dj.nl",
    },
    publisher: {
      "@type": "Organization",
      name: "Mister DJ",
      url: "https://mr-dj.nl",
      logo: { "@type": "ImageObject", url: "https://mr-dj.nl/images/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mr-dj.nl/nl/blog/${post.slug}`,
    },
  };

  return (
    <MrDjLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs />

      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-6 flex items-center gap-3">
          <span className={`rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${categoryColors[post.category] || "bg-gray-100 text-gray-500"}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
          <span className="text-xs text-gray-400">{post.readingTime} min lezen</span>
        </div>

        <h1 className="mb-6 text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">
          {post.title}
        </h1>

        <div
          className="prose-mrdj [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-900 [&_p]:mb-4 [&_p]:text-sm [&_p]:text-gray-700 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-sm [&_ul]:text-gray-700 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-sm [&_ol]:text-gray-700 [&_li]:ml-4 [&_strong]:text-gray-900 [&_a]:text-yellow-600 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-10 md:px-6">
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-400/5 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Benieuwd wat Mister DJ voor jou kan doen?</h2>
          <p className="mb-4 text-sm text-gray-600">Neem vrijblijvend contact op en we bespreken de mogelijkheden.</p>
          <Link href="/nl/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300">
            Neem contact op
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-3xl px-4 pb-14 md:px-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Gerelateerde artikelen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link key={r.slug} href={`/nl/blog/${r.slug}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:bg-gray-100">
              <h3 className="mb-1 text-sm font-semibold text-yellow-600">{r.title}</h3>
              <p className="text-xs text-gray-600">{r.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </MrDjLayout>
  );
}

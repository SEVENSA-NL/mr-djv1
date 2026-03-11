"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { getPublishedPosts } from "@/src/data/blog-posts";

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
  const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function BlogContent() {
  return (
    <MrDjLayout>
      <Breadcrumbs />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Blog</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Tips, inspiratie en advies van Mister DJ
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Lees onze artikelen over bruiloftsmuziek, bedrijfsfeesten, prijzen en meer.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {getPublishedPosts().map((post) => (
            <Link
              key={post.slug}
              href={`/nl/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:bg-gray-100"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${categoryColors[post.category] || "bg-gray-100 text-gray-500"}`}>
                  {post.category}
                </span>
                <span className="text-[0.6rem] text-gray-400">{formatDate(post.publishedAt)}</span>
                <span className="text-[0.6rem] text-gray-400">{post.readingTime} min lezen</span>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {post.title}
              </h2>
              <p className="mb-4 flex-1 text-sm text-gray-600">{post.excerpt}</p>
              <span className="text-xs font-semibold text-yellow-600">
                Lees meer &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </MrDjLayout>
  );
}

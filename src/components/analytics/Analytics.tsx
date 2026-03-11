"use client";

import React from "react";
import Script from "next/script";
import { useConsent } from "@/src/components/ui/CookieConsent";

/**
 * Placeholder IDs -- swap these when real accounts are set up.
 */
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
const META_PIXEL_ID = "XXXXXXXXXXXXXXXXX";
const CLARITY_PROJECT_ID = "XXXXXXXXXX";

/**
 * Conditionally loads analytics / marketing scripts based on cookie consent.
 * Must be rendered inside a client component tree.
 */
export function Analytics() {
  const consent = useConsent();

  return (
    <>
      {/* ---- Google Analytics 4 (requires analytics consent) ---- */}
      {consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* ---- Microsoft Clarity (requires analytics consent) ---- */}
      {consent?.analytics && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}

      {/* ---- Meta Pixel (requires marketing consent) ---- */}
      {consent?.marketing && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ---- Initialize dataLayer if not already present ---- */}
      <Script id="datalayer-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
    </>
  );
}

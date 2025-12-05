'use client';

import React, { useState, useEffect } from 'react';
import styles from './PriceCalculator.module.css';

interface Package {
  id: 'brons' | 'zilver' | 'goud';
  name: string;
  basePrice: number;
  description: string;
  recommended?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: 'brons',
    name: 'Brons Pakket',
    basePrice: 850,
    description: 'Perfect voor kleine feesten tot 80 gasten',
  },
  {
    id: 'zilver',
    name: 'Zilver Pakket',
    basePrice: 1350,
    description: 'Meest gekozen voor bruiloften 80-150 gasten',
    recommended: true,
  },
  {
    id: 'goud',
    name: 'Goud Pakket',
    basePrice: 2000,
    description: 'Premium pakket voor grote events 150+ gasten',
  },
];

const ADD_ONS: AddOn[] = [
  {
    id: 'led-floor',
    name: 'LED Dansvloer',
    price: 450,
    description: 'Verlichte dansvloer 4x4m',
    popular: true,
  },
  {
    id: 'photobooth',
    name: 'Photobooth',
    price: 350,
    description: 'Inclusief prints en props',
    popular: true,
  },
  {
    id: 'co2-cannons',
    name: 'CO2 Cannons',
    price: 200,
    description: '2 cannons + CO2 tanks',
  },
  {
    id: 'live-sax',
    name: 'Live Saxofoon (extra uur)',
    price: 300,
    description: 'Extra uur live saxofoon',
    popular: true,
  },
  {
    id: 'uplighting',
    name: 'Venue Uplighting',
    price: 250,
    description: '12 LED uplights voor venue',
  },
  {
    id: 'love-letters',
    name: 'Love Letters',
    price: 150,
    description: 'Verlichte LOVE letters 1.2m',
  },
];

export const PriceCalculator: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package['id']>('zilver');
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState<number>(0);

  // Calculate total whenever selections change
  useEffect(() => {
    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    const pkgPrice = pkg?.basePrice || 0;

    const addOnsPrice = Array.from(selectedAddOns).reduce((sum, addOnId) => {
      const addOn = ADD_ONS.find((a) => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);

    setTotal(pkgPrice + addOnsPrice);
  }, [selectedPackage, selectedAddOns]);

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = new Set(selectedAddOns);
    if (newAddOns.has(addOnId)) {
      newAddOns.delete(addOnId);
    } else {
      newAddOns.add(addOnId);
    }
    setSelectedAddOns(newAddOns);

    // Track in PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_addon_toggle', {
        addon_id: addOnId,
        action: newAddOns.has(addOnId) ? 'added' : 'removed',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handlePackageChange = (pkgId: Package['id']) => {
    setSelectedPackage(pkgId);

    // Track in PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_package_change', {
        package_id: pkgId,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const getRecommendedPackage = (): Package['id'] => {
    if (guestCount < 80) return 'brons';
    if (guestCount >= 150) return 'goud';
    return 'zilver';
  };

  useEffect(() => {
    const recommended = getRecommendedPackage();
    if (recommended !== selectedPackage) {
      // Show recommendation but don't auto-change
    }
  }, [guestCount]);

  const handleGetQuote = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_get_quote', {
        package_id: selectedPackage,
        guest_count: guestCount,
        addons: Array.from(selectedAddOns),
        total_price: total,
        timestamp: new Date().toISOString(),
      });
    }

    // Redirect to contact page with pre-filled data
    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    const queryParams = new URLSearchParams({
      package: pkg?.name || '',
      guests: guestCount.toString(),
      total: total.toString(),
    });

    window.location.href = `/contact?${queryParams.toString()}`;
  };

  return (
    <div className={styles.priceCalculator}>
      <div className={styles.header}>
        <h2 className={styles.title}>💰 Prijs Calculator</h2>
        <p className={styles.subtitle}>
          Bereken direct wat jouw feest gaat kosten
        </p>
      </div>

      <div className={styles.content}>
        {/* Guest Count Slider */}
        <div className={styles.section}>
          <label className={styles.sectionTitle}>
            Aantal Gasten: <strong>{guestCount}</strong>
          </label>
          <input
            type="range"
            min="20"
            max="300"
            step="10"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>20</span>
            <span>150</span>
            <span>300+</span>
          </div>
          {getRecommendedPackage() !== selectedPackage && (
            <p className={styles.recommendation}>
              💡 Tip: Voor {guestCount} gasten raden we het{' '}
              <strong>{PACKAGES.find((p) => p.id === getRecommendedPackage())?.name}</strong> aan
            </p>
          )}
        </div>

        {/* Package Selection */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Kies je pakket:</h3>
          <div className={styles.packages}>
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                className={`${styles.packageCard} ${
                  selectedPackage === pkg.id ? styles.packageSelected : ''
                } ${pkg.recommended ? styles.packageRecommended : ''}`}
                onClick={() => handlePackageChange(pkg.id)}
              >
                {pkg.recommended && (
                  <span className={styles.recommendedBadge}>⭐ POPULAIR</span>
                )}
                <h4 className={styles.packageName}>{pkg.name}</h4>
                <p className={styles.packagePrice}>€{pkg.basePrice}</p>
                <p className={styles.packageDescription}>{pkg.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Extra's toevoegen:</h3>
          <div className={styles.addons}>
            {ADD_ONS.map((addOn) => (
              <label key={addOn.id} className={styles.addonItem}>
                <input
                  type="checkbox"
                  checked={selectedAddOns.has(addOn.id)}
                  onChange={() => handleAddOnToggle(addOn.id)}
                  className={styles.checkbox}
                />
                <div className={styles.addonInfo}>
                  <div className={styles.addonHeader}>
                    <span className={styles.addonName}>
                      {addOn.name}
                      {addOn.popular && <span className={styles.popularBadge}>🔥 POPULAIR</span>}
                    </span>
                    <span className={styles.addonPrice}>+€{addOn.price}</span>
                  </div>
                  <p className={styles.addonDescription}>{addOn.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Total & CTA */}
        <div className={styles.totalSection}>
          <div className={styles.totalBreakdown}>
            <div className={styles.breakdownLine}>
              <span>Pakket ({PACKAGES.find((p) => p.id === selectedPackage)?.name})</span>
              <span>€{PACKAGES.find((p) => p.id === selectedPackage)?.basePrice}</span>
            </div>
            {Array.from(selectedAddOns).length > 0 && (
              <>
                {Array.from(selectedAddOns).map((addOnId) => {
                  const addOn = ADD_ONS.find((a) => a.id === addOnId);
                  return (
                    <div key={addOnId} className={styles.breakdownLine}>
                      <span>{addOn?.name}</span>
                      <span>+€{addOn?.price}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className={styles.totalLine}>
            <span className={styles.totalLabel}>Totaal:</span>
            <span className={styles.totalAmount}>€{total}</span>
          </div>

          <button type="button" className={styles.ctaButton} onClick={handleGetQuote}>
            ✨ Offerte Aanvragen voor €{total}
          </button>

          <p className={styles.disclaimer}>
            * Prijzen zijn indicatief en exclusief BTW. Exacte prijs wordt bevestigd in je offerte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;

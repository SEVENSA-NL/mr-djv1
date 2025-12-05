'use client';

import React, { useState } from 'react';
import type { PackageType } from '@/lib/schemas/booking';
import styles from './PackageSelector.module.css';

interface Package {
  id: PackageType;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface PackageSelectorProps {
  selectedPackage?: PackageType;
  onPackageSelect: (packageId: PackageType) => void;
  selectedAddons?: string[];
  onAddonsChange?: (addonIds: string[]) => void;
  error?: string;
}

const PACKAGES: Package[] = [
  {
    id: 'basis',
    name: 'Basis',
    description: 'Perfect voor een intieme feest',
    price: 'Vanaf €495',
    features: [
      'Professionele DJ (4 uur)',
      'Standaard geluidsinstallatie',
      'Basis verlichting',
      'Muziekwensen vooraf',
      'Eigen muziek mogelijk',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Voor een onvergetelijke ervaring',
    price: 'Vanaf €795',
    features: [
      'Professionele DJ (6 uur)',
      'Premium geluidsinstallatie',
      'LED verlichting pakket',
      'Rookmachine',
      'Persoonlijke muziekadvies',
      'Gratis planning gesprek',
      'Backup apparatuur',
    ],
    popular: true,
  },
  {
    id: 'all-in',
    name: 'All-In',
    description: 'De ultieme party ervaring',
    price: 'Vanaf €1295',
    features: [
      'Professionele DJ (8 uur)',
      'Premium geluidsinstallatie XL',
      'Moving heads & lasers',
      'Rookmachine & CO2 jets',
      'DJ booth met LED',
      'Persoonlijke planning',
      'Backup DJ beschikbaar',
      'Foto/video content',
      'Priority support',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Volledig op maat',
    price: 'Op aanvraag',
    features: [
      'Alles uit All-In pakket',
      'Meerdere locaties',
      'Extra DJ\'s',
      'Extra apparatuur',
      'Custom show elementen',
      'Dedicated event manager',
    ],
  },
];

const ADDONS: Addon[] = [
  {
    id: 'extra-hour',
    name: 'Extra Uur',
    description: 'Verleng je feest met een extra uur',
    price: 125,
  },
  {
    id: 'photo-booth',
    name: 'Photo Booth',
    description: 'Professionele photobooth met onbeperkte prints',
    price: 395,
  },
  {
    id: 'led-letters',
    name: 'LED Letters',
    description: 'Grote LED letters met je initialen of tekst',
    price: 295,
  },
  {
    id: 'confetti-canon',
    name: 'Confetti Canon',
    description: 'Spectaculaire confetti effecten',
    price: 195,
  },
  {
    id: 'cold-sparks',
    name: 'Cold Sparks',
    description: 'Veilige indoor vuurwerk effecten',
    price: 495,
  },
  {
    id: 'live-sax',
    name: 'Live Saxofonist',
    description: 'Live saxofonist tijdens het feest (2 uur)',
    price: 695,
  },
];

export const PackageSelector: React.FC<PackageSelectorProps> = ({
  selectedPackage,
  onPackageSelect,
  selectedAddons = [],
  onAddonsChange,
  error,
}) => {
  const [showAddons, setShowAddons] = useState(false);

  const handleAddonToggle = (addonId: string) => {
    if (!onAddonsChange) return;

    const newAddons = selectedAddons.includes(addonId)
      ? selectedAddons.filter((id) => id !== addonId)
      : [...selectedAddons, addonId];

    onAddonsChange(newAddons);
  };

  const calculateTotalAddonPrice = () => {
    return ADDONS.filter((addon) => selectedAddons.includes(addon.id)).reduce(
      (sum, addon) => sum + addon.price,
      0
    );
  };

  return (
    <div className={styles.packageSelector}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kies je Pakket</h3>
        <p className={styles.subtitle}>
          Selecteer het pakket dat het beste bij je event past
        </p>
      </div>

      <div className={styles.packagesGrid}>
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`${styles.packageCard} ${
              selectedPackage === pkg.id ? styles.selected : ''
            } ${pkg.popular ? styles.popular : ''}`}
            onClick={() => onPackageSelect(pkg.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPackageSelect(pkg.id);
              }
            }}
          >
            {pkg.popular && <div className={styles.popularBadge}>Populair</div>}

            <div className={styles.packageHeader}>
              <h4 className={styles.packageName}>{pkg.name}</h4>
              <p className={styles.packageDescription}>{pkg.description}</p>
              <div className={styles.packagePrice}>{pkg.price}</div>
            </div>

            <ul className={styles.featuresList}>
              {pkg.features.map((feature, idx) => (
                <li key={idx} className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.selectButton}>
              {selectedPackage === pkg.id ? 'Geselecteerd' : 'Selecteer'}
            </div>
          </div>
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {selectedPackage && selectedPackage !== 'custom' && (
        <div className={styles.addonsSection}>
          <button
            type="button"
            className={styles.addonsToggle}
            onClick={() => setShowAddons(!showAddons)}
          >
            <span>Extra Opties Toevoegen</span>
            <span className={styles.toggleIcon}>{showAddons ? '−' : '+'}</span>
          </button>

          {showAddons && (
            <div className={styles.addonsGrid}>
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    className={`${styles.addonCard} ${isSelected ? styles.selectedAddon : ''}`}
                    onClick={() => handleAddonToggle(addon.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAddonToggle(addon.id);
                      }
                    }}
                  >
                    <div className={styles.addonCheckbox}>
                      {isSelected && <span className={styles.checkmark}>✓</span>}
                    </div>
                    <div className={styles.addonInfo}>
                      <h5 className={styles.addonName}>{addon.name}</h5>
                      <p className={styles.addonDescription}>{addon.description}</p>
                    </div>
                    <div className={styles.addonPrice}>+€{addon.price}</div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedAddons.length > 0 && (
            <div className={styles.addonsSummary}>
              <p className={styles.summaryText}>
                <strong>{selectedAddons.length}</strong> extra optie(s) geselecteerd
              </p>
              <p className={styles.summaryPrice}>
                +€{calculateTotalAddonPrice()}
              </p>
            </div>
          )}
        </div>
      )}

      {selectedPackage === 'custom' && (
        <div className={styles.customNote}>
          <p>
            Voor een custom pakket nemen we persoonlijk contact met je op om je wensen te bespreken.
          </p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;

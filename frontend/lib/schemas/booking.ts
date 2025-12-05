import { z } from 'zod';

/**
 * Booking Form Validation Schema
 * Comprehensive validation for DJ booking requests
 */

// Event type enum
export const eventTypeSchema = z.enum([
  'bruiloft',
  'bedrijfsfeest',
  'feest',
  'verjaardag',
  'jubileum',
  'other',
]);

// Package type enum
export const packageTypeSchema = z.enum([
  'basis',
  'premium',
  'all-in',
  'custom',
]);

// Contact information schema
export const contactInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Naam moet minimaal 2 karakters zijn')
    .max(100, 'Naam mag maximaal 100 karakters zijn')
    .regex(/^[a-zA-Z\s\-']+$/, 'Naam mag alleen letters, spaties en streepjes bevatten'),
  email: z
    .string()
    .email('Voer een geldig e-mailadres in')
    .toLowerCase()
    .max(255, 'E-mailadres is te lang'),
  phone: z
    .string()
    .min(10, 'Telefoonnummer moet minimaal 10 cijfers zijn')
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Voer een geldig telefoonnummer in')
    .transform((val) => val.replace(/\s/g, '')), // Remove spaces
  company: z.string().max(100, 'Bedrijfsnaam mag maximaal 100 karakters zijn').optional(),
});

// Event details schema
export const eventDetailsSchema = z.object({
  eventType: eventTypeSchema,
  eventDate: z
    .string()
    .min(1, 'Selecteer een datum')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'De datum moet in de toekomst liggen'),
  eventTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Voer een geldige tijd in (HH:MM)')
    .optional(),
  guestCount: z
    .number()
    .int('Aantal gasten moet een geheel getal zijn')
    .min(1, 'Minimaal 1 gast')
    .max(10000, 'Aantal gasten lijkt onrealistisch')
    .optional(),
  duration: z
    .number()
    .int('Duur moet een geheel getal zijn')
    .min(1, 'Minimaal 1 uur')
    .max(24, 'Maximaal 24 uur')
    .optional(),
  location: z.object({
    venue: z.string().max(200, 'Locatienaam is te lang').optional(),
    address: z.string().max(255, 'Adres is te lang').optional(),
    city: z.string().min(2, 'Voer een geldige stad in').max(100, 'Stadsnaam is te lang'),
    postalCode: z
      .string()
      .regex(/^[0-9]{4}\s?[A-Z]{2}$/i, 'Voer een geldige Nederlandse postcode in')
      .optional()
      .transform((val) => val?.toUpperCase().replace(/\s/g, '')),
  }),
});

// Package selection schema
export const packageSelectionSchema = z.object({
  packageType: packageTypeSchema,
  addons: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().nonnegative(),
      })
    )
    .optional()
    .default([]),
  specialRequests: z
    .string()
    .max(1000, 'Speciale wensen mogen maximaal 1000 karakters zijn')
    .optional(),
});

// Complete booking form schema
export const bookingFormSchema = z
  .object({
    ...contactInfoSchema.shape,
    ...eventDetailsSchema.shape,
    ...packageSelectionSchema.shape,

    // Additional fields
    budget: z
      .number()
      .positive('Budget moet een positief getal zijn')
      .max(1000000, 'Budget lijkt onrealistisch')
      .optional(),

    hearAboutUs: z
      .enum([
        'google',
        'social_media',
        'referral',
        'previous_client',
        'website',
        'other',
      ])
      .optional(),

    newsletter: z.boolean().default(false),

    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'Je moet akkoord gaan met de voorwaarden'),

    privacyAccepted: z
      .boolean()
      .refine((val) => val === true, 'Je moet akkoord gaan met het privacybeleid'),

    // Honeypot field for spam protection
    website: z.string().max(0).optional(),
  })
  .refine(
    (data) => {
      // Business events should have company name
      if (data.eventType === 'bedrijfsfeest' && !data.company) {
        return false;
      }
      return true;
    },
    {
      message: 'Bedrijfsnaam is verplicht voor bedrijfsfeesten',
      path: ['company'],
    }
  );

// Type exports
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type PackageSelection = z.infer<typeof packageSelectionSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;
export type PackageType = z.infer<typeof packageTypeSchema>;

// Validation helper
export const validateBookingForm = (data: unknown) => {
  return bookingFormSchema.safeParse(data);
};

// Partial validation for multi-step forms
export const validateContactInfo = (data: unknown) => {
  return contactInfoSchema.safeParse(data);
};

export const validateEventDetails = (data: unknown) => {
  return eventDetailsSchema.safeParse(data);
};

export const validatePackageSelection = (data: unknown) => {
  return packageSelectionSchema.safeParse(data);
};

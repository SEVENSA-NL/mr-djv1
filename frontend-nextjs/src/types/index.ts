export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Booking {
  id: string;
  date: Date;
  eventType: string;
  location: string;
  duration: number;
  notes?: string;
}

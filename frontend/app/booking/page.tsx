import { BookingForm } from '@/components/booking/BookingForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boek je DJ | Mr. DJ - Direct Online Boeken',
  description:
    'Boek direct online je professionele DJ voor je bruiloft, bedrijfsfeest of feest. Snel en eenvoudig, binnen 4 uur persoonlijk contact.',
  keywords: 'DJ boeken, bruiloft DJ, bedrijfsfeest DJ, party DJ, online boeken',
  openGraph: {
    title: 'Boek je DJ | Mr. DJ',
    description: 'Direct online je DJ boeken. Binnen 4 uur persoonlijk contact.',
    type: 'website',
  },
};

export default function BookingPage() {
  return (
    <main className="booking-page">
      <section className="hero-section">
        <div className="container">
          <h1>Boek je DJ</h1>
          <p className="subtitle">
            Vul het formulier in en ontvang binnen 4 uur een persoonlijke offerte
          </p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <BookingForm />
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <h2>Waarom Mr. DJ?</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">⭐</div>
              <h3>1000+ Tevreden Klanten</h3>
              <p>4.9/5 gemiddelde beoordeling</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🎵</div>
              <h3>Professionele DJ's</h3>
              <p>Ervaren en volledig verzekerd</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💬</div>
              <h3>Persoonlijk Contact</h3>
              <p>Binnen 4 uur persoonlijk advies</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <h3>100% Garantie</h3>
              <p>Niet tevreden? Geld terug</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .booking-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
        }

        .hero-section {
          padding: 4rem 2rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 1rem 0;
        }

        .subtitle {
          font-size: 1.25rem;
          margin: 0;
          opacity: 0.95;
        }

        .form-section {
          padding: 3rem 2rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .trust-section {
          padding: 4rem 2rem;
          background: white;
        }

        .trust-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 3rem 0;
          color: #1a1a1a;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .trust-item {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: #f9fafb;
          transition: all 0.3s ease;
        }

        .trust-item:hover {
          background: #dbeafe;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .trust-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .trust-item h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.5rem 0;
        }

        .trust-item p {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.125rem;
          }

          .trust-section h2 {
            font-size: 2rem;
          }

          .trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

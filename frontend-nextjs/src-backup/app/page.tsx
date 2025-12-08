export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-h1 font-bold text-neutral-dark mb-4">
            Mister DJ
          </h1>
          <p className="text-xl text-neutral-gray-500 mb-8 max-w-2xl">
            Premium DJ Services voor Bruiloften, Bedrijfsfeesten & Private Events
          </p>
          <p className="text-lg text-neutral-gray-500 mb-12">
            Next.js 14 Migration Project
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <a
              href="#"
              className="group rounded-lg border border-neutral-gray-300 px-6 py-8 transition-all hover:border-primary hover:shadow-soft bg-white"
            >
              <h2 className="text-2xl font-semibold text-neutral-dark mb-3">
                Diensten
              </h2>
              <p className="text-neutral-gray-500">
                Ontdek al onze DJ services en events waar we aan bijdragen.
              </p>
            </a>

            <a
              href="#"
              className="group rounded-lg border border-neutral-gray-300 px-6 py-8 transition-all hover:border-primary hover:shadow-soft bg-white"
            >
              <h2 className="text-2xl font-semibold text-neutral-dark mb-3">
                Over Ons
              </h2>
              <p className="text-neutral-gray-500">
                Leer meer over het team achter Mister DJ en onze ervaring.
              </p>
            </a>

            <a
              href="#"
              className="group rounded-lg border border-neutral-gray-300 px-6 py-8 transition-all hover:border-primary hover:shadow-soft bg-white"
            >
              <h2 className="text-2xl font-semibold text-neutral-dark mb-3">
                Contact
              </h2>
              <p className="text-neutral-gray-500">
                Neem contact op voor een vrijblijvend gesprek over jouw event.
              </p>
            </a>
          </div>

          <div className="mt-16">
            <a
              href="#"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:bg-primary-dark"
            >
              Boek nu
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

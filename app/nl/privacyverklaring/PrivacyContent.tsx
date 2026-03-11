"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";

export default function PrivacyContent() {
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Privacy
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Privacyverklaring
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-gray-700 md:text-base">
          Mister DJ hecht veel waarde aan de bescherming van je persoonsgegevens. In deze
          privacyverklaring leggen wij uit welke gegevens wij verzamelen, waarom wij dat doen en
          welke rechten je hebt.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-700 md:text-base">
          {/* Bedrijfsgegevens */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Wie zijn wij?</h2>
            <p>
              Mister DJ is gevestigd aan de Kapteijnlaan 17, 5505 AV Veldhoven en is ingeschreven
              bij de Kamer van Koophandel onder nummer 68906277. Voor vragen over deze
              privacyverklaring kun je contact opnemen via{" "}
              <a href="mailto:info@mr-dj.nl" className="text-yellow-600 hover:underline">
                info@mr-dj.nl
              </a>
              .
            </p>
          </div>

          {/* Welke gegevens */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              2. Welke persoonsgegevens verzamelen wij?
            </h2>
            <p className="mb-2">
              Wij kunnen de volgende persoonsgegevens verwerken wanneer je onze website bezoekt,
              contact met ons opneemt of een boeking plaatst:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Adresgegevens van de eventlocatie</li>
              <li>Datum en type evenement</li>
              <li>Muziekvoorkeuren en speciale wensen</li>
              <li>Betalingsgegevens (bij facturatie)</li>
              <li>IP-adres en browsergegevens (via cookies)</li>
            </ul>
          </div>

          {/* Waarom / rechtsgrond */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              3. Waarom verwerken wij je gegevens?
            </h2>
            <p className="mb-2">Wij verwerken je persoonsgegevens voor de volgende doeleinden:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Uitvoering van de overeenkomst:</strong> om je
                boeking te verwerken, het evenement voor te bereiden en de DJ-dienst te leveren.
              </li>
              <li>
                <strong className="text-gray-900">Communicatie:</strong> om je te informeren over de
                voortgang van je boeking en om vragen te beantwoorden.
              </li>
              <li>
                <strong className="text-gray-900">Facturatie:</strong> om facturen te versturen en
                betalingen te verwerken.
              </li>
              <li>
                <strong className="text-gray-900">Wettelijke verplichting:</strong> om te voldoen aan
                boekhoudkundige en fiscale verplichtingen.
              </li>
              <li>
                <strong className="text-gray-900">Gerechtvaardigd belang:</strong> om onze website te
                verbeteren en om eventuele geschillen af te handelen.
              </li>
            </ul>
          </div>

          {/* Rechtsgrond */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Rechtsgrond</h2>
            <p>
              De verwerking van je persoonsgegevens is gebaseerd op een of meer van de volgende
              rechtsgronden uit de Algemene Verordening Gegevensbescherming (AVG):
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Uitvoering van een overeenkomst (artikel 6 lid 1 sub b AVG)</li>
              <li>Wettelijke verplichting (artikel 6 lid 1 sub c AVG)</li>
              <li>Gerechtvaardigd belang (artikel 6 lid 1 sub f AVG)</li>
              <li>Toestemming, indien van toepassing (artikel 6 lid 1 sub a AVG)</li>
            </ul>
          </div>

          {/* Bewaartermijn */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Bewaartermijn</h2>
            <p>
              Wij bewaren je persoonsgegevens niet langer dan strikt noodzakelijk is voor het doel
              waarvoor ze zijn verzameld. Over het algemeen hanteren wij de volgende bewaartermijnen:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Boekingsgegevens:</strong> tot 2 jaar na het
                evenement, tenzij een langere termijn wettelijk vereist is.
              </li>
              <li>
                <strong className="text-gray-900">Financiele administratie:</strong> 7 jaar (wettelijke
                bewaarplicht).
              </li>
              <li>
                <strong className="text-gray-900">Contactformulier:</strong> maximaal 1 jaar na het
                laatste contact.
              </li>
            </ul>
          </div>

          {/* Delen met derden */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              6. Delen met derden
            </h2>
            <p>
              Wij delen je persoonsgegevens alleen met derden wanneer dit noodzakelijk is voor de
              uitvoering van onze diensten, of wanneer wij hiertoe wettelijk verplicht zijn. Denk
              hierbij aan onze boekhouder, betalingsverwerker of hostingprovider. Wij sluiten met
              deze partijen verwerkersovereenkomsten om de beveiliging van je gegevens te
              waarborgen. Wij verkopen je gegevens nooit aan derden.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Cookies</h2>
            <p className="mb-2">
              Onze website maakt gebruik van cookies. Cookies zijn kleine tekstbestanden die op je
              apparaat worden geplaatst wanneer je onze website bezoekt.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Functionele cookies:</strong> noodzakelijk voor de
                werking van de website.
              </li>
              <li>
                <strong className="text-gray-900">Analytische cookies:</strong> om het gebruik van de
                website te analyseren en te verbeteren. Deze gegevens worden geanonimiseerd.
              </li>
            </ul>
            <p className="mt-2">
              Je kunt cookies uitschakelen via je browserinstellingen. Let op: dit kan de
              functionaliteit van de website beperken.
            </p>
          </div>

          {/* Rechten */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Jouw rechten</h2>
            <p className="mb-2">Op grond van de AVG heb je de volgende rechten:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Recht op inzage:</strong> je mag opvragen welke
                gegevens wij van je hebben.
              </li>
              <li>
                <strong className="text-gray-900">Recht op rectificatie:</strong> je mag onjuiste
                gegevens laten corrigeren.
              </li>
              <li>
                <strong className="text-gray-900">Recht op verwijdering:</strong> je mag verzoeken dat
                wij je gegevens wissen.
              </li>
              <li>
                <strong className="text-gray-900">Recht op beperking:</strong> je mag verzoeken dat wij
                het gebruik van je gegevens beperken.
              </li>
              <li>
                <strong className="text-gray-900">Recht op overdraagbaarheid:</strong> je mag vragen om
                je gegevens in een gangbaar formaat te ontvangen.
              </li>
              <li>
                <strong className="text-gray-900">Recht van bezwaar:</strong> je mag bezwaar maken
                tegen de verwerking van je gegevens.
              </li>
            </ul>
            <p className="mt-2">
              Om een van deze rechten uit te oefenen, neem contact op via{" "}
              <a href="mailto:info@mr-dj.nl" className="text-yellow-600 hover:underline">
                info@mr-dj.nl
              </a>
              . Wij reageren binnen 30 dagen op je verzoek. Je hebt daarnaast altijd het recht om
              een klacht in te dienen bij de Autoriteit Persoonsgegevens.
            </p>
          </div>

          {/* Beveiliging */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">9. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te
              beschermen tegen ongeoorloofde toegang, verlies of misbruik. Onze website maakt
              gebruik van een SSL-certificaat voor een beveiligde verbinding.
            </p>
          </div>

          {/* Wijzigingen */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              10. Wijzigingen in deze privacyverklaring
            </h2>
            <p>
              Wij behouden ons het recht voor om deze privacyverklaring te wijzigen. De meest
              actuele versie is altijd beschikbaar op onze website. Wij raden je aan om deze pagina
              regelmatig te raadplegen.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">11. Contact</h2>
            <p>
              Heb je vragen of opmerkingen over deze privacyverklaring? Neem dan contact met ons op:
            </p>
            <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Mister DJ</p>
              <p>Kapteijnlaan 17</p>
              <p>5505 AV Veldhoven</p>
              <p className="mt-2">
                E-mail:{" "}
                <a href="mailto:info@mr-dj.nl" className="text-yellow-600 hover:underline">
                  info@mr-dj.nl
                </a>
              </p>
              <p>
                Telefoon:{" "}
                <a href="tel:+31408422594" className="text-yellow-600 hover:underline">
                  040-8422594
                </a>
              </p>
              <p className="mt-2 text-xs text-gray-400">KvK: 68906277</p>
            </div>
          </div>

          <p className="text-xs text-gray-400">Laatst bijgewerkt: maart 2026</p>
        </div>
      </section>
    </MrDjLayout>
  );
}

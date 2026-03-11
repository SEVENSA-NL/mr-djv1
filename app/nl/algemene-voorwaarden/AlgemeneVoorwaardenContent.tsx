"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";

export default function AlgemeneVoorwaardenContent() {
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Voorwaarden
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Algemene Voorwaarden
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-gray-700 md:text-base">
          Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten
          van Mister DJ.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-700 md:text-base">
          {/* Artikel 1 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Artikel 1 - Definities</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Mister DJ:</strong> de eenmanszaak Mister DJ,
                gevestigd aan de Kapteijnlaan 17, 5505 AV Veldhoven, ingeschreven bij de KvK onder
                nummer 68906277.
              </li>
              <li>
                <strong className="text-gray-900">Opdrachtgever:</strong> de natuurlijke of
                rechtspersoon die een overeenkomst aangaat met Mister DJ.
              </li>
              <li>
                <strong className="text-gray-900">Overeenkomst:</strong> de afspraak tussen
                opdrachtgever en Mister DJ voor het leveren van DJ-diensten.
              </li>
              <li>
                <strong className="text-gray-900">Evenement:</strong> het feest, de bruiloft, het
                bedrijfsevenement of de gelegenheid waarvoor Mister DJ wordt ingehuurd.
              </li>
            </ul>
          </div>

          {/* Artikel 2 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 2 - Toepasselijkheid
            </h2>
            <p>
              Deze algemene voorwaarden zijn van toepassing op elk aanbod, elke offerte en elke
              overeenkomst tussen Mister DJ en de opdrachtgever. Afwijkingen van deze voorwaarden
              zijn alleen geldig indien schriftelijk overeengekomen. De toepasselijkheid van
              eventuele voorwaarden van de opdrachtgever wordt uitdrukkelijk van de hand gewezen.
            </p>
          </div>

          {/* Artikel 3 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 3 - Offertes en aanbiedingen
            </h2>
            <p>
              Alle offertes en aanbiedingen van Mister DJ zijn vrijblijvend, tenzij uitdrukkelijk
              anders vermeld. Een offerte is geldig gedurende 30 dagen na de datum van uitgifte.
              Mister DJ is pas gebonden wanneer de opdrachtgever de offerte schriftelijk (waaronder
              per e-mail) heeft aanvaard en Mister DJ de boeking heeft bevestigd.
            </p>
          </div>

          {/* Artikel 4 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 4 - Boekingen en bevestiging
            </h2>
            <p>
              Een boeking komt tot stand na schriftelijke bevestiging door Mister DJ. Na bevestiging
              ontvangt de opdrachtgever een boekingsbevestiging met daarin de datum, locatie, tijden,
              het gekozen pakket en de totale kosten. Wijzigingen in de boeking zijn mogelijk in
              overleg en dienen schriftelijk te worden bevestigd.
            </p>
          </div>

          {/* Artikel 5 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 5 - Prijzen en betaling
            </h2>
            <p className="mb-2">
              Alle genoemde prijzen zijn inclusief BTW, tenzij anders vermeld. Voor de betaling
              geldt het volgende:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Aanbetaling:</strong> 50% van het totaalbedrag dient
                binnen 14 dagen na boekingsbevestiging te worden voldaan. Met de aanbetaling is de
                datum definitief gereserveerd.
              </li>
              <li>
                <strong className="text-gray-900">Restbetaling:</strong> het resterende bedrag dient
                uiterlijk 2 weken voor de datum van het evenement te zijn voldaan.
              </li>
              <li>
                <strong className="text-gray-900">Extra kosten:</strong> eventuele extra kosten
                (meeruren, extra apparatuur, reiskosten buiten de regio) worden vooraf gecommuniceerd
                en na het evenement gefactureerd met een betaaltermijn van 14 dagen.
              </li>
            </ul>
            <p className="mt-2">
              Bij niet-tijdige betaling behoudt Mister DJ zich het recht voor de uitvoering van de
              overeenkomst op te schorten en wettelijke rente in rekening te brengen.
            </p>
          </div>

          {/* Artikel 6 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Artikel 6 - Annulering</h2>
            <p className="mb-2">
              Annulering door de opdrachtgever dient schriftelijk te geschieden. De volgende
              annuleringskosten zijn van toepassing:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-gray-900">Meer dan 6 maanden voor het evenement:</strong> 25%
                van het totaalbedrag.
              </li>
              <li>
                <strong className="text-gray-900">3 tot 6 maanden voor het evenement:</strong> 50% van
                het totaalbedrag.
              </li>
              <li>
                <strong className="text-gray-900">1 tot 3 maanden voor het evenement:</strong> 75% van
                het totaalbedrag.
              </li>
              <li>
                <strong className="text-gray-900">Minder dan 1 maand voor het evenement:</strong> 100%
                van het totaalbedrag.
              </li>
            </ul>
            <p className="mt-2">
              Mister DJ mag de overeenkomst annuleren bij overmacht (zie artikel 8) of wanneer de
              opdrachtgever niet aan de betalingsverplichtingen voldoet. In geval van annulering door
              Mister DJ zonder overmacht wordt de aanbetaling volledig terugbetaald.
            </p>
          </div>

          {/* Artikel 7 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 7 - Aansprakelijkheid
            </h2>
            <p>
              Mister DJ is niet aansprakelijk voor schade die voortvloeit uit of verband houdt met de
              uitvoering van de overeenkomst, tenzij er sprake is van opzet of grove schuld. De
              aansprakelijkheid van Mister DJ is in alle gevallen beperkt tot het bedrag dat voor de
              betreffende dienst in rekening is gebracht. Mister DJ is niet aansprakelijk voor
              indirecte schade, waaronder gederfde winst, gemiste besparingen of schade door
              bedrijfsstagnatie. Mister DJ is niet verantwoordelijk voor schade aan de locatie,
              apparatuur van derden of persoonlijk letsel dat niet direct is toe te schrijven aan
              nalatigheid van Mister DJ.
            </p>
          </div>

          {/* Artikel 8 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Artikel 8 - Overmacht</h2>
            <p>
              Onder overmacht wordt verstaan elke omstandigheid buiten de wil van Mister DJ die de
              nakoming van de overeenkomst tijdelijk of blijvend verhindert. Hieronder vallen onder
              meer: ziekte of ongeval van de DJ, extreme weersomstandigheden, overheidsmaatregelen,
              stakingen, natuurrampen en pandemische situaties. In geval van overmacht zal Mister DJ
              zich inspannen een vervangende DJ te regelen. Indien dit niet mogelijk is, wordt de
              overeenkomst ontbonden en wordt de aanbetaling terugbetaald, met aftrek van reeds
              gemaakte kosten.
            </p>
          </div>

          {/* Artikel 9 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 9 - Uitvoering van de dienst
            </h2>
            <p>
              Mister DJ zal de overeenkomst naar beste inzicht en vermogen uitvoeren. De
              opdrachtgever zorgt ervoor dat de locatie tijdig toegankelijk is voor opbouw (minimaal
              2 uur voor aanvang), dat er voldoende stroomvoorziening beschikbaar is (minimaal 2
              geaarde stopcontacten van 16A op een eigen groep) en dat er een droge, overdekte ruimte
              beschikbaar is voor de DJ-apparatuur. Eventuele schade aan apparatuur van Mister DJ
              veroorzaakt door toedoen van de opdrachtgever of diens gasten komt voor rekening van de
              opdrachtgever.
            </p>
          </div>

          {/* Artikel 10 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Artikel 10 - Klachten</h2>
            <p>
              Klachten over de uitvoering van de overeenkomst dienen binnen 14 dagen na het
              evenement schriftelijk te worden ingediend bij Mister DJ. Mister DJ zal de klacht
              binnen 30 dagen in behandeling nemen en streven naar een passende oplossing. Het
              indienen van een klacht schort de betalingsverplichting niet op.
            </p>
          </div>

          {/* Artikel 11 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 11 - Intellectueel eigendom
            </h2>
            <p>
              Alle rechten op de door Mister DJ geproduceerde content, waaronder foto&apos;s,
              video&apos;s, playlists en promotiemateriaal, berusten bij Mister DJ, tenzij
              schriftelijk anders overeengekomen. Mister DJ behoudt het recht om beeldmateriaal van
              evenementen te gebruiken voor promotionele doeleinden, tenzij de opdrachtgever hier
              vooraf schriftelijk bezwaar tegen maakt.
            </p>
          </div>

          {/* Artikel 12 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 12 - Toepasselijk recht en geschillen
            </h2>
            <p>
              Op alle overeenkomsten tussen Mister DJ en de opdrachtgever is Nederlands recht van
              toepassing. Geschillen die voortvloeien uit of verband houden met de overeenkomst
              zullen in eerste instantie worden voorgelegd aan de bevoegde rechter in het
              arrondissement Oost-Brabant.
            </p>
          </div>

          {/* Artikel 13 */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Artikel 13 - Slotbepalingen
            </h2>
            <p>
              Indien een of meerdere bepalingen van deze algemene voorwaarden nietig of vernietigbaar
              blijken, blijven de overige bepalingen onverminderd van kracht. Mister DJ behoudt zich
              het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen treden in werking 30
              dagen na bekendmaking op de website.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Contact</h2>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
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

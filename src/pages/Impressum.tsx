
const Impressum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p><strong>AMCD Consult GmbH</strong></p>
                <p>Rubensstr. 13</p>
                <p>81245 München</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
              <div className="space-y-2">
                <p><strong>Telefon:</strong> +49 30 12345678</p>
                <p><strong>E-Mail:</strong> info@amcd-agentur.de</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registereintrag</h2>
              <div className="space-y-2">
                <p>Eintragung im Handelsregister.</p>
                <p>Registergericht: Amtsgericht München</p>
                <p>Registernummer: HRB 235317</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE987654321</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="space-y-2">
                <p>Armin Doster</p>
                <p>Rubensstr. 13</p>
                <p>81245 München</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftung für Inhalte</h2>
              <p className="leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftung für Links</h2>
              <p className="leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Urheberrecht</h2>
              <p className="leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;

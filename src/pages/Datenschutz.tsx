
const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Allgemeine Hinweise</h3>
              <p className="leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Datenschutz</h3>
              <p className="leading-relaxed mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Server-Log-Dateien</h3>
              <p className="leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Kontaktformular</h2>
              <p className="leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                von Anschlussfragen bei uns gespeichert.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Bewerbungsdaten</h2>
              <p className="leading-relaxed mb-4">
                Wenn Sie sich bei uns bewerben, verarbeiten wir die von Ihnen übermittelten personenbezogenen Daten 
                ausschließlich zum Zwecke des Bewerbungsverfahrens. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Ihre Rechte</h2>
              <p className="leading-relaxed mb-4">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, 
                Sperrung oder Löschung dieser Daten zu verlangen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kontakt</h2>
              <p className="leading-relaxed">
                Bei Fragen zum Datenschutz wenden Sie sich bitte an: <br />
                <strong>E-Mail:</strong> datenschutz@amcd.de <br />
                <strong>Telefon:</strong> +49 30 12345678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;

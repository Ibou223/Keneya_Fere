import './globals.css';

export const metadata = {
  title: 'KENEYA FERE - Application de Santé',
  description: 'Application web de santé pour accéder aux services et informations de santé essentiels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-blue-800 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">KENEYA FERE</a>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/repertoire" className="hover:text-blue-200">Répertoire</a></li>
                <li><a href="/fiche-medicale" className="hover:text-blue-200">Fiche Médicale</a></li>
                <li><a href="/conseils" className="hover:text-blue-200">Conseils</a></li>
                <li><a href="/trousse-secours" className="hover:text-blue-200">Trousse de Secours</a></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-gray-100 border-t">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600">© {new Date().getFullYear()} KENEYA FERE - Tous droits réservés</p>
          </div>
        </footer>
      </body>
    </html>
  );
}


import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Benutzer hat versucht, auf nicht existierende Route zuzugreifen:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-500 mb-4">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Seite nicht gefunden
        </p>
        <p className="text-gray-600 mb-8">
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

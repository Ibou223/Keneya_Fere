'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Données de démonstration pour les structures de santé
const STRUCTURES_SANTE = [
  {
    id: 1,
    nom: "CSCom de Banconi",
    type: "CSCom",
    adresse: "Banconi, Bamako",
    telephone: "+223 20 20 20 20",
    services: ["Consultation générale", "Vaccination", "Maternité"],
    position: [12.6392, -8.0029]
  },
  {
    id: 2,
    nom: "Hôpital Gabriel Touré",
    type: "CHU",
    adresse: "Centre-ville, Bamako",
    telephone: "+223 20 22 27 12",
    services: ["Urgences", "Chirurgie", "Pédiatrie", "Maternité"],
    position: [12.6429, -7.9913]
  },
  {
    id: 3,
    nom: "Clinique Pasteur",
    type: "Clinique",
    adresse: "ACI 2000, Bamako",
    telephone: "+223 20 29 10 10",
    services: ["Consultation spécialisée", "Imagerie médicale", "Laboratoire"],
    position: [12.6232, -8.0091]
  },
  {
    id: 4,
    nom: "Pharmacie du Point G",
    type: "Pharmacie",
    adresse: "Point G, Bamako",
    telephone: "+223 20 22 50 02",
    services: ["Médicaments", "Produits parapharmaceutiques"],
    position: [12.6651, -8.0012]
  },
  {
    id: 5,
    nom: "Laboratoire Rodolphe Mérieux",
    type: "Laboratoire",
    adresse: "Bamako",
    telephone: "+223 20 22 47 72",
    services: ["Analyses médicales", "Tests COVID-19"],
    position: [12.6339, -8.0023]
  }
];

// Composant pour afficher les détails d'une structure de santé
const StructureDetails = ({ structure }) => {
  if (!structure) return null;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-blue-800">{structure.nom}</h3>
      <div className="mt-2">
        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{structure.type}</span>
      </div>
      <p className="mt-2 text-gray-600"><strong>Adresse:</strong> {structure.adresse}</p>
      <p className="text-gray-600"><strong>Téléphone:</strong> {structure.telephone}</p>
      <div className="mt-2">
        <strong className="text-gray-700">Services:</strong>
        <ul className="list-disc list-inside mt-1 text-gray-600">
          {structure.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Itinéraire
      </button>
    </div>
  );
};

// Composant pour filtrer les structures de santé
const FilterBar = ({ onFilterChange }) => {
  const types = ["Tous", "CSCom", "CsRef", "Hôpital", "CHU", "Laboratoire", "Pharmacie", "Clinique"];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Rechercher une structure de santé..." 
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <button 
            key={type} 
            className="px-3 py-1 bg-gray-100 hover:bg-blue-100 rounded-full text-sm"
            onClick={() => onFilterChange({ type: type === "Tous" ? null : type })}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function RepertoirePage() {
  const [userPosition, setUserPosition] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [filteredStructures, setFilteredStructures] = useState(STRUCTURES_SANTE);
  const [filters, setFilters] = useState({ search: "", type: null });
  const [mapLoaded, setMapLoaded] = useState(false);

  // Chargement dynamique du composant Map pour éviter les erreurs côté serveur
  const Map = dynamic(() => import('../../components/ui/Map'), {
    ssr: false,
    loading: () => <div className="map-container bg-gray-100 flex items-center justify-center">Chargement de la carte...</div>
  });

  // Obtenir la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          // Position par défaut (Bamako)
          setUserPosition([12.6392, -8.0029]);
        }
      );
    } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      // Position par défaut (Bamako)
      setUserPosition([12.6392, -8.0029]);
    }
    
    setMapLoaded(true);
  }, []);

  // Filtrer les structures de santé
  useEffect(() => {
    let result = STRUCTURES_SANTE;
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(structure => 
        structure.nom.toLowerCase().includes(searchLower) || 
        structure.adresse.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.type) {
      result = result.filter(structure => structure.type === filters.type);
    }
    
    setFilteredStructures(result);
  }, [filters]);

  // Gérer les changements de filtre
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Répertoire des Structures de Santé</h1>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {mapLoaded && userPosition && (
            <Map 
              userPosition={userPosition} 
              structures={filteredStructures}
              onMarkerClick={setSelectedStructure}
            />
          )}
        </div>
        
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Structures de santé</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredStructures.map(structure => (
                <div 
                  key={structure.id} 
                  className="p-3 border border-gray-200 rounded hover:bg-blue-50 cursor-pointer"
                  onClick={() => setSelectedStructure(structure)}
                >
                  <h3 className="font-medium">{structure.nom}</h3>
                  <p className="text-sm text-gray-600">{structure.type} - {structure.adresse}</p>
                </div>
              ))}
              
              {filteredStructures.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucune structure de santé trouvée</p>
              )}
            </div>
          </div>
          
          {selectedStructure && (
            <StructureDetails structure={selectedStructure} />
          )}
        </div>
      </div>
    </div>
  );
}

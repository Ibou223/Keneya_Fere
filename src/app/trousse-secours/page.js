'use client';

import { useState } from 'react';
import Image from 'next/image';

// Données de démonstration pour les situations d'urgence
const SITUATIONS_URGENCE = [
  {
    id: 1,
    titre: "Arrêt cardiaque",
    description: "Comment réagir face à une personne en arrêt cardiaque",
    image: "/images/trousse/arret-cardiaque.jpg",
    etapes: [
      {
        id: 101,
        titre: "Vérifier l'état de conscience",
        description: "Secouez doucement la personne et demandez-lui si elle va bien. Si elle ne répond pas, elle est inconsciente.",
        image: "/images/trousse/conscience.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 102,
        titre: "Appeler les secours",
        description: "Appelez immédiatement le 15 (SAMU) ou le 112 (numéro d'urgence européen) et suivez leurs instructions.",
        image: "/images/trousse/appel-secours.jpg",
        video: null
      },
      {
        id: 103,
        titre: "Commencer la réanimation cardio-pulmonaire",
        description: "Placez vos mains au centre de la poitrine et effectuez des compressions thoraciques à un rythme de 100 à 120 par minute.",
        image: "/images/trousse/rcp.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 104,
        titre: "Utiliser un défibrillateur si disponible",
        description: "Suivez les instructions vocales du défibrillateur automatisé externe (DAE).",
        image: "/images/trousse/defibrillateur.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  },
  {
    id: 2,
    titre: "Hémorragie grave",
    description: "Comment arrêter un saignement abondant",
    image: "/images/trousse/hemorragie.jpg",
    etapes: [
      {
        id: 201,
        titre: "Appliquer une pression directe",
        description: "Appuyez fermement sur la plaie avec un tissu propre, une compresse ou à défaut, votre main.",
        image: "/images/trousse/pression-directe.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 202,
        titre: "Surélever le membre blessé",
        description: "Si possible, élevez la zone blessée au-dessus du niveau du cœur pour réduire le flux sanguin.",
        image: "/images/trousse/surelevation.jpg",
        video: null
      },
      {
        id: 203,
        titre: "Appliquer un pansement compressif",
        description: "Maintenez la pression avec un bandage serré mais pas trop pour ne pas couper la circulation.",
        image: "/images/trousse/pansement-compressif.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  },
  {
    id: 3,
    titre: "Étouffement",
    description: "Comment réagir face à une personne qui s'étouffe",
    image: "/images/trousse/etouffement.jpg",
    etapes: [
      {
        id: 301,
        titre: "Identifier l'étouffement",
        description: "La personne ne peut pas parler, respirer ou tousser, et peut porter ses mains à sa gorge.",
        image: "/images/trousse/identifier-etouffement.jpg",
        video: null
      },
      {
        id: 302,
        titre: "Effectuer la manœuvre de Heimlich",
        description: "Placez-vous derrière la personne, entourez sa taille de vos bras, placez un poing entre le nombril et le sternum, et exercez des pressions rapides vers le haut.",
        image: "/images/trousse/heimlich.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 303,
        titre: "Continuer jusqu'à l'expulsion du corps étranger",
        description: "Répétez la manœuvre jusqu'à ce que l'objet soit expulsé ou que la personne perde conscience.",
        image: "/images/trousse/expulsion.jpg",
        video: null
      }
    ]
  },
  {
    id: 4,
    titre: "Brûlure",
    description: "Comment traiter une brûlure",
    image: "/images/trousse/brulure.jpg",
    etapes: [
      {
        id: 401,
        titre: "Refroidir la brûlure",
        description: "Placez la zone brûlée sous l'eau froide (pas glacée) pendant au moins 10 minutes.",
        image: "/images/trousse/refroidir-brulure.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 402,
        titre: "Retirer les bijoux et vêtements",
        description: "Enlevez délicatement les bijoux, ceintures ou vêtements de la zone brûlée avant que le gonflement ne commence.",
        image: "/images/trousse/retirer-bijoux.jpg",
        video: null
      },
      {
        id: 403,
        titre: "Couvrir la brûlure",
        description: "Couvrez la brûlure avec un pansement stérile non adhésif ou un linge propre.",
        image: "/images/trousse/couvrir-brulure.jpg",
        video: null
      }
    ]
  },
  {
    id: 5,
    titre: "Fracture",
    description: "Comment immobiliser une fracture suspectée",
    image: "/images/trousse/fracture.jpg",
    etapes: [
      {
        id: 501,
        titre: "Immobiliser le membre",
        description: "Ne déplacez pas la personne sauf en cas de danger immédiat. Stabilisez le membre dans la position où vous l'avez trouvé.",
        image: "/images/trousse/immobiliser-membre.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 502,
        titre: "Appliquer de la glace",
        description: "Appliquez de la glace enveloppée dans un tissu pour réduire le gonflement et la douleur.",
        image: "/images/trousse/appliquer-glace.jpg",
        video: null
      },
      {
        id: 503,
        titre: "Créer une attelle improvisée",
        description: "Utilisez des objets rigides (bâtons, magazines roulés) et des bandages pour immobiliser l'articulation au-dessus et en dessous de la fracture.",
        image: "/images/trousse/attelle-improvisee.jpg",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  }
];

// Composant pour afficher une carte de situation d'urgence
const SituationCard = ({ situation, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(situation)}
    >
      <div className="bg-gray-200 h-40 flex items-center justify-center">
        <span className="text-gray-500">Image situation</span>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{situation.titre}</h3>
        <p className="text-sm text-gray-600">{situation.description}</p>
      </div>
    </div>
  );
};

// Composant pour afficher les étapes d'une situation d'urgence
const EtapesList = ({ etapes, onViewVideo }) => {
  return (
    <div className="space-y-6 mt-6">
      {etapes.map((etape, index) => (
        <div key={etape.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
              {index + 1}
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-lg mb-2">{etape.titre}</h4>
              <p className="text-gray-700 mb-4">{etape.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
                  <span className="text-gray-500">Image étape</span>
                </div>
                
                {etape.video && (
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => onViewVideo(etape)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Voir la vidéo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Composant pour afficher le lecteur vidéo
const VideoPlayer = ({ etape, onClose }) => {
  if (!etape || !etape.video) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium text-lg">{etape.titre}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <iframe 
            className="w-full h-full"
            src={etape.video} 
            title={etape.titre}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Composant pour la recherche
const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une situation d'urgence..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Page principale de la trousse de secours
export default function TrousseSecoursPage() {
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [videoEtape, setVideoEtape] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les situations en fonction du terme de recherche
  const filteredSituations = SITUATIONS_URGENCE.filter(situation => 
    situation.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    situation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer la recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedSituation(null);
  };
  
  // Gérer la sélection d'une situation
  const handleSituationSelect = (situation) => {
    setSelectedSituation(situation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Gérer l'affichage d'une vidéo
  const handleViewVideo = (etape) => {
    setVideoEtape(etape);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Trousse de Secours Virtuelle</h1>
      <p className="text-gray-600 mb-6">Apprenez les gestes qui sauvent pour agir efficacement avant l'arrivée des secours</p>
      
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              En cas d'urgence, appelez immédiatement les secours : SAMU (15), Pompiers (18), ou numéro d'urgence européen (112).
            </p>
          </div>
        </div>
      </div>
      
      {selectedSituation ? (
        <div>
          <button 
            onClick={() => setSelectedSituation(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Retour aux situations d'urgence
          </button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Image principale</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedSituation.titre}</h2>
              <p className="text-gray-700 mb-4">{selectedSituation.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Étapes à suivre</h3>
              <EtapesList 
                etapes={selectedSituation.etapes} 
                onViewVideo={handleViewVideo} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SearchBar onSearch={handleSearch} />
          
          {filteredSituations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune situation d'urgence trouvée pour votre recherche.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSituations.map(situation => (
                <SituationCard 
                  key={situation.id} 
                  situation={situation} 
                  onClick={handleSituationSelect} 
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      {videoEtape && (
        <VideoPlayer 
          etape={videoEtape} 
          onClose={() => setVideoEtape(null)} 
        />
      )}
    </div>
  );
}

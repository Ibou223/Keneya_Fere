'use client';

import { useState } from 'react';

// Données de démonstration pour les vidéos de conseils médicaux
const CATEGORIES_CONSEILS = [
  {
    id: 1,
    nom: "Nutrition et alimentation",
    description: "Conseils pour une alimentation saine et équilibrée",
    videos: [
      {
        id: 101,
        titre: "L'importance des fruits et légumes",
        description: "Découvrez pourquoi il est essentiel de consommer au moins 5 fruits et légumes par jour",
        duree: "5:24",
        vignette: "/images/conseils/nutrition-fruits-legumes.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 102,
        titre: "Bien s'hydrater au quotidien",
        description: "Les bonnes pratiques pour maintenir une hydratation optimale tout au long de la journée",
        duree: "4:15",
        vignette: "/images/conseils/hydratation.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  },
  {
    id: 2,
    nom: "Hygiène et prévention",
    description: "Conseils pour maintenir une bonne hygiène et prévenir les maladies",
    videos: [
      {
        id: 201,
        titre: "Le lavage des mains efficace",
        description: "Technique correcte pour se laver les mains et prévenir la propagation des maladies",
        duree: "3:45",
        vignette: "/images/conseils/lavage-mains.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 202,
        titre: "Prévention du paludisme",
        description: "Mesures préventives contre le paludisme et l'utilisation correcte des moustiquaires",
        duree: "6:30",
        vignette: "/images/conseils/prevention-paludisme.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  },
  {
    id: 3,
    nom: "Santé maternelle et infantile",
    description: "Conseils pour les femmes enceintes et les soins aux nouveau-nés",
    videos: [
      {
        id: 301,
        titre: "Suivi de grossesse",
        description: "L'importance des consultations prénatales régulières",
        duree: "7:15",
        vignette: "/images/conseils/suivi-grossesse.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 302,
        titre: "Allaitement maternel",
        description: "Techniques et bienfaits de l'allaitement maternel pour le bébé",
        duree: "8:20",
        vignette: "/images/conseils/allaitement.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  },
  {
    id: 4,
    nom: "Maladies chroniques",
    description: "Conseils pour vivre avec des maladies chroniques comme le diabète ou l'hypertension",
    videos: [
      {
        id: 401,
        titre: "Vivre avec le diabète",
        description: "Conseils pratiques pour gérer le diabète au quotidien",
        duree: "9:45",
        vignette: "/images/conseils/diabete.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      },
      {
        id: 402,
        titre: "Contrôler l'hypertension",
        description: "Mesures diététiques et comportementales pour maintenir une tension artérielle normale",
        duree: "6:50",
        vignette: "/images/conseils/hypertension.jpg",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de démonstration
      }
    ]
  }
];

// Composant pour afficher une vignette de vidéo
const VideoThumbnail = ({ video, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(video)}
    >
      <div className="relative">
        <div className="bg-gray-200 h-40 flex items-center justify-center">
          <span className="text-gray-500">Vignette vidéo</span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {video.duree}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{video.titre}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

// Composant pour afficher le lecteur vidéo
const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium text-lg">{video.titre}</h3>
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
            src={video.url} 
            title={video.titre}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

// Composant pour la recherche et le filtrage
const SearchFilter = ({ onSearch }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher des conseils médicaux..."
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

// Page principale des conseils médicaux
export default function ConseilsPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Filtrer les catégories et vidéos en fonction du terme de recherche
  const filteredCategories = CATEGORIES_CONSEILS.map(category => {
    const filteredVideos = category.videos.filter(video => 
      video.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      ...category,
      videos: filteredVideos
    };
  }).filter(category => category.videos.length > 0 || category.nom.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Gérer la recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
    setActiveCategory(null); // Réinitialiser la catégorie active lors d'une recherche
  };
  
  // Gérer la sélection d'une catégorie
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Conseils Médicaux</h1>
      
      <SearchFilter onSearch={handleSearch} />
      
      {searchTerm ? (
        // Affichage des résultats de recherche
        <div>
          <h2 className="text-xl font-semibold mb-4">Résultats de recherche pour "{searchTerm}"</h2>
          
          {filteredCategories.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun résultat trouvé pour votre recherche.</p>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map(category => (
                <div key={category.id}>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{category.nom}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.videos.map(video => (
                      <VideoThumbnail 
                        key={video.id} 
                        video={video} 
                        onClick={setSelectedVideo} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Affichage normal par catégories
        <div className="space-y-8">
          {CATEGORIES_CONSEILS.map(category => (
            <div key={category.id}>
              <div 
                className="flex justify-between items-center mb-3 cursor-pointer"
                onClick={() => handleCategorySelect(category.id)}
              >
                <h2 className="text-xl font-semibold text-gray-900">{category.nom}</h2>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform ${activeCategory === category.id ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              {(activeCategory === category.id || activeCategory === null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.videos.map(video => (
                    <VideoThumbnail 
                      key={video.id} 
                      video={video} 
                      onClick={setSelectedVideo} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
}

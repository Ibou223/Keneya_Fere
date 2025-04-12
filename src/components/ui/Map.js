'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Correction des icônes Leaflet qui ne s'affichent pas correctement dans Next.js
useEffect(() => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
}, []);

// Icônes personnalisées pour les différents types de structures
const getIcon = (type) => {
  const iconSize = [25, 41];
  const iconAnchor = [12, 41];
  const popupAnchor = [1, -34];
  const shadowSize = [41, 41];

  let iconUrl;
  switch (type) {
    case 'CSCom':
      iconUrl = '/images/marker-icon-blue.png';
      break;
    case 'CHU':
      iconUrl = '/images/marker-icon-red.png';
      break;
    case 'Clinique':
      iconUrl = '/images/marker-icon-green.png';
      break;
    case 'Pharmacie':
      iconUrl = '/images/marker-icon-orange.png';
      break;
    case 'Laboratoire':
      iconUrl = '/images/marker-icon-purple.png';
      break;
    default:
      iconUrl = '/images/marker-icon.png';
  }

  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor,
    shadowUrl: '/images/marker-shadow.png',
    shadowSize,
  });
};

// Composant pour centrer la carte sur la position de l'utilisateur
const SetViewOnUser = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
};

// Composant principal de la carte
const Map = ({ userPosition, structures, onMarkerClick }) => {
  // Position par défaut (Bamako)
  const defaultPosition = [12.6392, -8.0029];
  const position = userPosition || defaultPosition;

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marqueur pour la position de l'utilisateur */}
        {userPosition && (
          <Marker 
            position={userPosition}
            icon={L.divIcon({
              className: 'user-position-marker',
              html: '<div style="background-color: #4285F4; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white;"></div>',
              iconSize: [22, 22],
              iconAnchor: [11, 11],
            })}
          >
            <Popup>Votre position actuelle</Popup>
          </Marker>
        )}
        
        {/* Marqueurs pour les structures de santé */}
        {structures.map(structure => (
          <Marker
            key={structure.id}
            position={structure.position}
            icon={getIcon(structure.type)}
            eventHandlers={{
              click: () => onMarkerClick(structure),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{structure.nom}</h3>
                <p>{structure.type}</p>
                <p>{structure.adresse}</p>
                <button 
                  className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  onClick={() => onMarkerClick(structure)}
                >
                  Voir détails
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <SetViewOnUser coords={userPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;

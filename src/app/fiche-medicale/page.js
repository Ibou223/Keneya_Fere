'use client';

import { useState } from 'react';
import Link from 'next/link';

// Composant pour afficher un onglet de la fiche médicale
const TabContent = ({ id, activeTab, children }) => {
  return (
    <div className={`${activeTab === id ? 'block' : 'hidden'} py-4`}>
      {children}
    </div>
  );
};

// Composant pour le formulaire d'informations personnelles
const InformationsPersonnelles = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sexe</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Sélectionner</option>
            <option>Masculin</option>
            <option>Féminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Groupe sanguin</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Sélectionner</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Maladies chroniques</label>
        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Médicaments actuels</label>
        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
      </div>
      <div className="flex justify-end">
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Enregistrer
        </button>
      </div>
    </div>
  );
};

// Composant pour le carnet de vaccination
const CarnetVaccination = () => {
  const [vaccins, setVaccins] = useState([
    { id: 1, nom: 'BCG', date: '2022-01-15', rappel: null },
    { id: 2, nom: 'Polio', date: '2022-02-20', rappel: '2023-02-20' },
    { id: 3, nom: 'Tétanos', date: '2021-11-05', rappel: '2026-11-05' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVaccin, setNewVaccin] = useState({ nom: '', date: '', rappel: '' });

  const handleAddVaccin = () => {
    if (newVaccin.nom && newVaccin.date) {
      setVaccins([...vaccins, { ...newVaccin, id: Date.now() }]);
      setNewVaccin({ nom: '', date: '', rappel: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Carnet de vaccination</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showAddForm ? 'Annuler' : 'Ajouter un vaccin'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom du vaccin</label>
              <input 
                type="text" 
                value={newVaccin.nom}
                onChange={(e) => setNewVaccin({...newVaccin, nom: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date" 
                value={newVaccin.date}
                onChange={(e) => setNewVaccin({...newVaccin, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de rappel</label>
              <input 
                type="date" 
                value={newVaccin.rappel}
                onChange={(e) => setNewVaccin({...newVaccin, rappel: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleAddVaccin}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccin</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prochain rappel</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vaccins.map((vaccin) => (
              <tr key={vaccin.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vaccin.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(vaccin.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vaccin.rappel ? new Date(vaccin.rappel).toLocaleDateString() : 'Aucun rappel'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">Modifier</button>
                  <button className="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant pour les visites médicales
const VisitesMedicales = () => {
  const [visites, setVisites] = useState([
    { id: 1, date: '2023-05-10', medecin: 'Dr. Konaté', motif: 'Consultation générale', notes: 'Tension artérielle normale, prescription de vitamines' },
    { id: 2, date: '2023-02-15', medecin: 'Dr. Diallo', motif: 'Douleurs abdominales', notes: 'Suspicion de gastrite, prescription d\'antiacides' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVisite, setNewVisite] = useState({ date: '', medecin: '', motif: '', notes: '' });

  const handleAddVisite = () => {
    if (newVisite.date && newVisite.medecin && newVisite.motif) {
      setVisites([...visites, { ...newVisite, id: Date.now() }]);
      setNewVisite({ date: '', medecin: '', motif: '', notes: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Visites médicales</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showAddForm ? 'Annuler' : 'Ajouter une visite'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date" 
                value={newVisite.date}
                onChange={(e) => setNewVisite({...newVisite, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Médecin</label>
              <input 
                type="text" 
                value={newVisite.medecin}
                onChange={(e) => setNewVisite({...newVisite, medecin: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Motif</label>
              <input 
                type="text" 
                value={newVisite.motif}
                onChange={(e) => setNewVisite({...newVisite, motif: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea 
                value={newVisite.notes}
                onChange={(e) => setNewVisite({...newVisite, notes: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleAddVisite}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {visites.map((visite) => (
          <div key={visite.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <div className="font-medium">{new Date(visite.date).toLocaleDateString()} - {visite.medecin}</div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Modifier</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Supprimer</button>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-medium">Motif:</span> {visite.motif}
            </div>
            <div className="mt-1 text-gray-700">
              <span className="font-medium">Notes:</span> {visite.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour les résultats d'analyses
const ResultatsAnalyses = () => {
  const [analyses, setAnalyses] = useState([
    { id: 1, date: '2023-06-20', type: 'Analyse de sang', laboratoire: 'Labo Central', resultats: 'Taux de glycémie normal', fichiers: ['analyse_sang_20230620.pdf'] },
    { id: 2, date: '2023-03-05', type: 'Radiographie pulmonaire', laboratoire: 'Centre d\'Imagerie Médicale', resultats: 'Aucune anomalie détectée', fichiers: ['radio_poumons_20230305.jpg'] },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAnalyse, setNewAnalyse] = useState({ date: '', type: '', laboratoire: '', resultats: '', fichiers: [] });
  const [showCamera, setShowCamera] = useState(false);

  const handleAddAnalyse = () => {
    if (newAnalyse.date && newAnalyse.type) {
      setAnalyses([...analyses, { ...newAnalyse, id: Date.now() }]);
      setNewAnalyse({ date: '', type: '', laboratoire: '', resultats: '', fichiers: [] });
      setShowAddForm(false);
    }
  };

  const handleCapture = () => {
    // Simuler la capture d'une photo
    alert("Fonctionnalité de capture photo simulée. En production, cela activerait la caméra de l'appareil.");
    setShowCamera(false);
    // Ajouter un nom de fichier fictif pour la démonstration
    setNewAnalyse({...newAnalyse, fichiers: [...newAnalyse.fichiers, `capture_${Date.now()}.jpg`]});
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Résultats d'analyses</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showAddForm ? 'Annuler' : 'Ajouter une analyse'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date" 
                value={newAnalyse.date}
                onChange={(e) => setNewAnalyse({...newAnalyse, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type d'analyse</label>
              <input 
                type="text" 
                value={newAnalyse.type}
                onChange={(e) => setNewAnalyse({...newAnalyse, type: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Laboratoire</label>
              <input 
                type="text" 
                value={newAnalyse.laboratoire}
                onChange={(e) => setNewAnalyse({...newAnalyse, laboratoire: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Résultats</label>
              <textarea 
                value={newAnalyse.resultats}
                onChange={(e) => setNewAnalyse({...newAnalyse, resultats: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                rows="2"
              ></textarea>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
            <div className="flex space-x-2">
              <div className="relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setNewAnalyse({
                        ...newAnalyse, 
                        fichiers: [...newAnalyse.fichiers, e.target.files[0].name]
                      });
                    }
                  }}
                />
                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm">
                  Importer un fichier
                </button>
              </div>
              <button 
                onClick={() => setShowCamera(true)}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
              >
                Prendre une photo
              </button>
            </div>
            
            {showCamera && (
              <div className="mt-3 p-4 border border-gray-300 rounded-md">
                <div className="bg-gray-200 h-40 flex items-center justify-center mb-2">
                  <span className="text-gray-500">Aperçu caméra (simulation)</span>
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={handleCapture}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Capturer
                  </button>
                </div>
              </div>
            )}
            
            {newAnalyse.fichiers.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Fichiers sélectionnés:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {newAnalyse.fichiers.map((fichier, index) => (
                    <li key={index}>{fichier}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleAddAnalyse}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {analyses.map((analyse) => (
          <div key={analyse.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <div className="font-medium">{new Date(analyse.date).toLocaleDateString()} - {analyse.type}</div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Modifier</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Supprimer</button>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-medium">Laboratoire:</span> {analyse.laboratoire}
            </div>
            <div className="mt-1 text-gray-700">
              <span className="font-medium">Résultats:</span> {analyse.resultats}
            </div>
            {analyse.fichiers.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Documents:</span>
                <ul className="list-disc list-inside text-sm text-blue-600">
                  {analyse.fichiers.map((fichier, index) => (
                    <li key={index}>
                      <a href="#" className="hover:underline">{fichier}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FicheMedicalePage() {
  const [activeTab, setActiveTab] = useState('infos');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Ma Fiche Médicale</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('infos')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'infos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informations personnelles
            </button>
            <button
              onClick={() => setActiveTab('vaccins')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'vaccins'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Carnet de vaccination
            </button>
            <button
              onClick={() => setActiveTab('visites')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'visites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visites médicales
            </button>
            <button
              onClick={() => setActiveTab('analyses')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'analyses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Résultats d'analyses
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <TabContent id="infos" activeTab={activeTab}>
            <InformationsPersonnelles />
          </TabContent>
          
          <TabContent id="vaccins" activeTab={activeTab}>
            <CarnetVaccination />
          </TabContent>
          
          <TabContent id="visites" activeTab={activeTab}>
            <VisitesMedicales />
          </TabContent>
          
          <TabContent id="analyses" activeTab={activeTab}>
            <ResultatsAnalyses />
          </TabContent>
        </div>
      </div>
    </div>
  );
}

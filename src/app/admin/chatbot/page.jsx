'use client';
import { useEffect, useState } from 'react';
import Notification from '../../../components/admin/Notification';

export default function ChatbotCMSPage() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    activeSessions: 0,
    rdvSessions: 0,
    rappelSessions: 0,
    pdfSessions: 0,
    leadsQualifies: 0,
    tauxConversion: 0,
    topIntentions: []
  });
  const [sessions, setSessions] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [pdfDemandes, setPdfDemandes] = useState([]);
  const [rdvStats, setRdvStats] = useState({ en_cours: 0, done: 0, canceled: 0 });
  const [loading, setLoading] = useState(false); // Ne pas bloquer sur le chargement initial
  const [activeTab, setActiveTab] = useState('content'); // 'content' ou 'sessions'
  const [rdvFilter, setRdvFilter] = useState('all');
  const [saraContent, setSaraContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentNotification, setContentNotification] = useState({ isOpen: false, message: '', type: 'success' });

  useEffect(() => {
    if (activeTab === 'sessions') {
      setLoading(true);
      fetchStats();
      fetchSessions();
      fetchRendezVous();
      fetchPdfDemandes();
    } else if (activeTab === 'content') {
      fetchSaraContent();
    }
  }, [rdvFilter, activeTab]);

  const fetchSaraContent = async () => {
    setContentLoading(true);
    try {
      const response = await fetch('/api/cms/content?path=sara&t=' + Date.now());
      const data = await response.json();
      if (data.success && data.data) {
        setSaraContent(data.data);
      } else {
        // Si la page n'existe pas, initialiser avec un contenu par défaut
        setSaraContent({
          welcome: {
            text: "Bonjour et bienvenue sur azalee-patrimoine.fr ! Je suis votre conseiller patrimonial virtuel. Vous souhaitez optimiser vos finances, investir, ou anticiper l'avenir ? Je peux vous aider à y voir clair.",
            options: [
              { text: '💬 Obtenir une réponse rapide à une question patrimoniale', value: 'question' },
              { text: '📞 Être rappelé(e) par un conseiller', value: 'rappel' },
              { text: '📅 Prendre un rendez-vous directement', value: 'rdv_direct' }
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error fetching Sara content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  const saveSaraContent = async () => {
    setContentLoading(true);
    try {
      const response = await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: 'sara',
          title: 'Chatbot Sara',
          content: saraContent,
          published: true
        })
      });

      const data = await response.json();
      if (data.success) {
        setContentNotification({
          isOpen: true,
          message: 'Contenu sauvegardé avec succès !',
          type: 'success'
        });
        setTimeout(() => setContentNotification({ ...contentNotification, isOpen: false }), 3000);
      } else {
        setContentNotification({
          isOpen: true,
          message: 'Erreur lors de la sauvegarde: ' + (data.message || 'Erreur inconnue'),
          type: 'error'
        });
        setTimeout(() => setContentNotification({ ...contentNotification, isOpen: false }), 3000);
      }
    } catch (error) {
      console.error('Error saving Sara content:', error);
      setContentNotification({
        isOpen: true,
        message: 'Erreur lors de la sauvegarde: ' + error.message,
        type: 'error'
      });
      setTimeout(() => setContentNotification({ ...contentNotification, isOpen: false }), 3000);
    } finally {
      setContentLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/chatbot/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chatbot/sessions?limit=100');
      const data = await response.json();
      if (data.success) {
        setSessions(data.data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchRendezVous = async (filter = null) => {
    try {
      const filterToUse = filter !== null ? filter : rdvFilter;
      const url = filterToUse === 'all' 
        ? '/api/chatbot/rendezvous' 
        : `/api/chatbot/rendezvous?statut=${filterToUse}`;
      
      // Ajouter un timestamp pour éviter le cache
      const response = await fetch(`${url}&_t=${Date.now()}`);
      const data = await response.json();
      if (data.success) {
        setRendezVous(data.data);
        setRdvStats(data.stats || { en_cours: 0, done: 0, canceled: 0 });
      }
    } catch (error) {
      console.error('Error fetching rendez-vous:', error);
    }
  };

  const fetchPdfDemandes = async () => {
    try {
      const response = await fetch('/api/chatbot/sessions?actionFinale=pdf&limit=100');
      const data = await response.json();
      if (data.success) {
        setPdfDemandes(data.data);
      }
    } catch (error) {
      console.error('Error fetching PDF demandes:', error);
    }
  };

  const updateRendezVousStatut = async (sessionId, newStatut) => {
    if (!sessionId) {
      console.error('SessionId is missing');
      alert('Erreur: ID de session manquant');
      return;
    }
    
    // Mise à jour optimiste de l'interface
    setRendezVous(prevRendezVous => 
      prevRendezVous.map(session => {
        if ((session.sessionId === sessionId) || (session._id === sessionId)) {
          return {
            ...session,
            rendezVous: {
              ...session.rendezVous,
              statut: newStatut
            }
          };
        }
        return session;
      })
    );
    
    try {
      const response = await fetch('/api/chatbot/rendezvous', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, statut: newStatut }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Rafraîchir les données depuis le serveur pour s'assurer de la cohérence
        // Utiliser le filtre actuel pour maintenir la vue
        await fetchRendezVous(rdvFilter);
        await fetchStats();
      } else {
        console.error('API Error:', data);
        // Annuler la mise à jour optimiste en cas d'erreur
        await fetchRendezVous();
        alert('Erreur lors de la mise à jour: ' + (data.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Error updating rendez-vous:', error);
      // Annuler la mise à jour optimiste en cas d'erreur
      await fetchRendezVous(rdvFilter);
      alert('Erreur lors de la mise à jour: ' + error.message);
    }
  };

  if (loading && activeTab === 'sessions') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 text-white">
          <h1 className="text-3xl font-cairo font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#B99066] rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            Gestion du Chatbot SARAH
          </h1>
          <p className="text-gray-200">Gérez le contenu du chatbot et suivez les interactions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 px-6 py-4 text-center font-cairo font-semibold transition-all ${
                activeTab === 'content'
                  ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white border-b-2 border-[#B99066]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              📝 Gérer le contenu
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`flex-1 px-6 py-4 text-center font-cairo font-semibold transition-all ${
                activeTab === 'sessions'
                  ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white border-b-2 border-[#B99066]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              📊 Sessions et leads
            </button>
          </div>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <>
            <Notification
              isOpen={contentNotification.isOpen}
              message={contentNotification.message}
              type={contentNotification.type}
              onClose={() => setContentNotification({ ...contentNotification, isOpen: false })}
            />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-cairo font-bold text-white">Message de bienvenue</h2>
                  <button
                    onClick={saveSaraContent}
                    disabled={contentLoading}
                    className="bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white px-6 py-2 rounded-lg hover:from-[#A67C52] hover:to-[#B99066] transition-all duration-300 font-cairo font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contentLoading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </div>
              <div className="p-6">
                {contentLoading && !saraContent ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60]"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                        Texte du message de bienvenue
                      </label>
                      <textarea
                        value={saraContent?.welcome?.text || ''}
                        onChange={(e) => setSaraContent({
                          ...saraContent,
                          welcome: {
                            ...saraContent?.welcome,
                            text: e.target.value
                          }
                        })}
                        className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y min-h-[120px]"
                        placeholder="Entrez le message de bienvenue..."
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066]">
                          Options du menu
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const currentOptions = saraContent?.welcome?.options || [];
                            setSaraContent({
                              ...saraContent,
                              welcome: {
                                ...saraContent?.welcome,
                                options: [...currentOptions, { text: '', value: '' }]
                              }
                            });
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 text-sm font-cairo font-semibold"
                        >
                          + Ajouter une option
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(saraContent?.welcome?.options || []).map((option, index) => (
                          <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-cairo font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                  Texte de l'option
                                </label>
                                <input
                                  type="text"
                                  value={option.text || ''}
                                  onChange={(e) => {
                                    const currentOptions = [...(saraContent?.welcome?.options || [])];
                                    currentOptions[index] = { ...currentOptions[index], text: e.target.value };
                                    setSaraContent({
                                      ...saraContent,
                                      welcome: {
                                        ...saraContent?.welcome,
                                        options: currentOptions
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                                  placeholder="Ex: 💬 Obtenir une réponse rapide..."
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-cairo font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                  Valeur (value)
                                </label>
                                <input
                                  type="text"
                                  value={option.value || ''}
                                  onChange={(e) => {
                                    const currentOptions = [...(saraContent?.welcome?.options || [])];
                                    currentOptions[index] = { ...currentOptions[index], value: e.target.value };
                                    setSaraContent({
                                      ...saraContent,
                                      welcome: {
                                        ...saraContent?.welcome,
                                        options: currentOptions
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-2 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                                  placeholder="Ex: question, rappel, rdv_direct"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const currentOptions = [...(saraContent?.welcome?.options || [])];
                                currentOptions.splice(index, 1);
                                setSaraContent({
                                  ...saraContent,
                                  welcome: {
                                    ...saraContent?.welcome,
                                    options: currentOptions
                                  }
                                });
                              }}
                              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-semibold mt-6"
                              title="Supprimer cette option"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        {(!saraContent?.welcome?.options || saraContent.welcome.options.length === 0) && (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>Aucune option. Cliquez sur "Ajouter une option" pour commencer.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Sessions totales</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">{stats.totalSessions}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#B99066]/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Sessions complétées</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">{stats.completedSessions}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Leads qualifiés</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">{stats.leadsQualifies}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#B99066] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#B99066]/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Taux de conversion</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">{stats.tauxConversion}%</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066]">Rendez-vous</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.rdvSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#B99066]/20 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066]">Rappels</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.rappelSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066]">PDF demandés</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.pdfSessions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rendez-vous Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
          <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl">
            <h2 className="text-xl font-cairo font-bold text-white mb-4">Gestion des Rendez-vous</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRdvFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  rdvFilter === 'all'
                    ? 'bg-[#B99066] text-white shadow-lg'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                Tous ({rdvStats.en_cours + rdvStats.done + rdvStats.canceled})
              </button>
              <button
                onClick={() => setRdvFilter('en_cours')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  rdvFilter === 'en_cours'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                En cours ({rdvStats.en_cours})
              </button>
              <button
                onClick={() => setRdvFilter('done')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  rdvFilter === 'done'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                Terminés ({rdvStats.done})
              </button>
              <button
                onClick={() => setRdvFilter('canceled')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  rdvFilter === 'canceled'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                Annulés ({rdvStats.canceled})
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {rendezVous.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Aucun rendez-vous pour le moment</p>
              ) : (
                rendezVous.map((session) => (
                  <div key={session._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.rendezVous?.statut === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          session.rendezVous?.statut === 'canceled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {session.rendezVous?.statut === 'done' ? 'Terminé' :
                           session.rendezVous?.statut === 'canceled' ? 'Annulé' :
                           'En cours'}
                        </span>
                        {session.profile?.nom && session.profile?.prenom && (
                          <span className="font-cairo font-semibold text-[#253F60] dark:text-[#B99066]">
                            {session.profile.prenom} {session.profile.nom}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={session.rendezVous?.statut || 'en_cours'}
                          onChange={(e) => {
                            const selectedStatut = e.target.value;
                            console.log('Changing statut for session:', session.sessionId || session._id, 'to:', selectedStatut);
                            updateRendezVousStatut(session.sessionId || session._id, selectedStatut);
                          }}
                          className="px-3 py-1 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B99066]"
                        >
                          <option value="en_cours">En cours</option>
                          <option value="done">Terminé</option>
                          <option value="canceled">Annulé</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {session.rendezVous?.date && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {new Date(session.rendezVous.date).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      )}
                      {session.rendezVous?.heure && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Heure:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.rendezVous.heure}</p>
                        </div>
                      )}
                      {session.rendezVous?.canal && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Canal:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.rendezVous.canal}</p>
                        </div>
                      )}
                      {session.profile?.telephone && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Téléphone:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.telephone}</p>
                        </div>
                      )}
                      {session.profile?.email && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Email:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.email}</p>
                        </div>
                      )}
                      {session.intention && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Intention:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.intention}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Demandes PDF Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
          <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl">
            <h2 className="text-xl font-cairo font-bold text-white mb-2">Demandes de Mini-Bilan PDF</h2>
            <p className="text-sm text-gray-300">Total: {pdfDemandes.length} demande(s)</p>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {pdfDemandes.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Aucune demande de PDF pour le moment</p>
              ) : (
                pdfDemandes.map((session) => (
                  <div key={session._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        {session.profile?.nom && session.profile?.prenom ? (
                          <span className="font-cairo font-semibold text-[#253F60] dark:text-[#B99066]">
                            {session.profile.prenom} {session.profile.nom}
                          </span>
                        ) : (
                          <span className="font-cairo font-semibold text-gray-500 dark:text-gray-400">
                            Utilisateur anonyme
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
                          PDF demandé
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(session.createdAt).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {session.profile?.email && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Email:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 break-all">{session.profile.email}</p>
                        </div>
                      )}
                      {session.profile?.telephone && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Téléphone:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.telephone}</p>
                        </div>
                      )}
                      {session.intention && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Intention:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.intention}</p>
                        </div>
                      )}
                      {session.thematique && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Thématique:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.thematique}</p>
                        </div>
                      )}
                      {session.profile?.age && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Âge:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.age} ans</p>
                        </div>
                      )}
                      {session.profile?.tmi && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">TMI:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.tmi}</p>
                        </div>
                      )}
                      {session.profile?.situationMatrimoniale && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Situation:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.situationMatrimoniale}</p>
                        </div>
                      )}
                      {session.profile?.montantProjet && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Montant projet:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.montantProjet}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
          <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl">
            <h2 className="text-xl font-cairo font-bold text-white">Sessions récentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {sessions.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Aucune session pour le moment</p>
              ) : (
                sessions.map((session) => (
                  <div key={session._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          session.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                        }`}>
                          {session.status}
                        </span>
                        {session.profile?.nom && session.profile?.prenom && (
                          <span className="font-cairo font-semibold text-[#253F60] dark:text-[#B99066]">
                            {session.profile.prenom} {session.profile.nom}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(session.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      {session.intention && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Intention:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.intention}</p>
                        </div>
                      )}
                      {session.actionFinale && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Action:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.actionFinale}</p>
                        </div>
                      )}
                      {session.profile?.age && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Âge:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.age} ans</p>
                        </div>
                      )}
                      {session.profile?.tmi && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">TMI:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.tmi}</p>
                        </div>
                      )}
                      {session.profile?.telephone && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Téléphone:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.telephone}</p>
                        </div>
                      )}
                      {session.profile?.email && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Email:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.profile.email}</p>
                        </div>
                      )}
                      {session.rendezVous?.date && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">RDV:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {new Date(session.rendezVous.date).toLocaleDateString('fr-FR')} {session.rendezVous.heure}
                          </p>
                        </div>
                      )}
                      {session.rendezVous?.canal && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Canal:</span>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{session.rendezVous.canal}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}


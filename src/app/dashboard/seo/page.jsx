'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SEOManagementPage() {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    openGraph: {
      title: '',
      description: '',
      url: ''
    },
    twitter: {
      title: '',
      description: ''
    }
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      // Get all pages that might have layout.jsx files
      const response = await fetch('/api/cms/pages');
      const data = await response.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageSEO = async (path) => {
    try {
      // Try to get SEO data from CMS
      const response = await fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`);
      const data = await response.json();
      if (data.success && data.data) {
        const page = data.data;
        // Check if SEO data exists in content.seo
        if (page.content && page.content.seo) {
          setSeoData(page.content.seo);
          setSelectedPage(page);
        } else {
          // If no SEO data exists, initialize with empty values
          setSeoData({
            title: '',
            description: '',
            keywords: '',
            openGraph: {
              title: '',
              description: '',
              url: ''
            },
            twitter: {
              title: '',
              description: ''
            }
          });
          setSelectedPage({ path, title: path });
        }
      } else {
        // If page doesn't exist, initialize with empty values
        setSeoData({
          title: '',
          description: '',
          keywords: '',
          openGraph: {
            title: '',
            description: '',
            url: ''
          },
          twitter: {
            title: '',
            description: ''
          }
        });
        setSelectedPage({ path, title: path });
      }
    } catch (error) {
      console.error('Error fetching page SEO:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      // First, get existing page content
      const getResponse = await fetch(`/api/cms/pages?path=${encodeURIComponent(selectedPage.path)}`);
      const getData = await getResponse.json();
      
      let existingContent = {};
      if (getData.success && getData.data.content) {
        existingContent = getData.data.content;
      }

      // Merge SEO data with existing content
      const updatedContent = {
        ...existingContent,
        seo: seoData
      };

      const response = await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: selectedPage.path,
          content: updatedContent
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('✅ SEO mis à jour avec succès!');
        fetchPages();
      } else {
        alert('❌ Erreur: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving SEO:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#253F60] to-[#1a2d47]">
        <div className="text-lg text-white font-cairo">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-cairo font-bold mb-2 flex items-center gap-3">
                <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Gestion SEO
              </h1>
              <p className="text-gray-200 font-inter">Gérez les meta descriptions et titres SEO de vos pages</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white px-6 py-3 rounded-lg hover:from-[#A67C52] hover:to-[#B99066] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-cairo font-semibold"
            >
              ← Retour
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60]/20">
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] p-4 rounded-t-xl">
                <h2 className="text-lg font-cairo font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Pages ({pages.length})
                </h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto p-4">
                <div
                  onClick={() => fetchPageSEO('immobilier')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedPage?.path === 'immobilier'
                      ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-[#B99066]'
                      : 'border-[#253F60]/20 hover:border-[#B99066] hover:bg-[#253F60]/5'
                  }`}
                >
                  <h3 className="font-cairo font-semibold text-[#253F60]">Immobilier</h3>
                  <p className="text-sm text-gray-500 font-inter">/immobilier</p>
                </div>
                <div
                  onClick={() => fetchPageSEO('fiscalite')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedPage?.path === 'fiscalite'
                      ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-[#B99066]'
                      : 'border-[#253F60]/20 hover:border-[#B99066] hover:bg-[#253F60]/5'
                  }`}
                >
                  <h3 className="font-cairo font-semibold text-[#253F60]">Fiscalité</h3>
                  <p className="text-sm text-gray-500 font-inter">/fiscalite</p>
                </div>
                <div
                  onClick={() => fetchPageSEO('placements')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedPage?.path === 'placements'
                      ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-[#B99066]'
                      : 'border-[#253F60]/20 hover:border-[#B99066] hover:bg-[#253F60]/5'
                  }`}
                >
                  <h3 className="font-cairo font-semibold text-[#253F60]">Placements</h3>
                  <p className="text-sm text-gray-500 font-inter">/placements</p>
                </div>
                <div
                  onClick={() => fetchPageSEO('retraite')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedPage?.path === 'retraite'
                      ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-[#B99066]'
                      : 'border-[#253F60]/20 hover:border-[#B99066] hover:bg-[#253F60]/5'
                  }`}
                >
                  <h3 className="font-cairo font-semibold text-[#253F60]">Retraite</h3>
                  <p className="text-sm text-gray-500 font-inter">/retraite</p>
                </div>
                <div
                  onClick={() => fetchPageSEO('patrimoine')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all mb-2 ${
                    selectedPage?.path === 'patrimoine'
                      ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-[#B99066]'
                      : 'border-[#253F60]/20 hover:border-[#B99066] hover:bg-[#253F60]/5'
                  }`}
                >
                  <h3 className="font-cairo font-semibold text-[#253F60]">Patrimoine</h3>
                  <p className="text-sm text-gray-500 font-inter">/patrimoine</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Editor */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60]/20">
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] p-4 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-cairo font-bold text-white flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        SEO - {selectedPage.title || selectedPage.path}
                      </h2>
                      <p className="text-sm text-gray-200 mt-1 font-inter">/{selectedPage.path}</p>
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white px-6 py-3 rounded-lg hover:from-[#A67C52] hover:to-[#B99066] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-cairo font-semibold flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      Enregistrer
                    </button>
                  </div>
                </div>
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                        Titre SEO
                      </label>
                      <input
                        type="text"
                        value={seoData.title}
                        onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                        placeholder="Titre de la page pour les moteurs de recherche"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={seoData.description}
                        onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter resize-y"
                        placeholder="Description de la page pour les moteurs de recherche (150-160 caractères recommandés)"
                      />
                      <p className="text-xs text-gray-500 mt-1 font-inter">
                        {seoData.description.length} caractères
                      </p>
                    </div>

                    {/* Keywords */}
                    <div>
                      <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                        Mots-clés (séparés par des virgules)
                      </label>
                      <input
                        type="text"
                        value={seoData.keywords}
                        onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                        placeholder="mot-clé1, mot-clé2, mot-clé3"
                      />
                    </div>

                    {/* Open Graph */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-[#253F60]/20">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#B99066]/30">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                        <h3 className="text-xl font-cairo font-bold text-[#253F60]">Open Graph (Réseaux sociaux)</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            Titre Open Graph
                          </label>
                          <input
                            type="text"
                            value={seoData.openGraph.title}
                            onChange={(e) => setSeoData({
                              ...seoData,
                              openGraph: { ...seoData.openGraph, title: e.target.value }
                            })}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                            placeholder="Titre pour le partage sur les réseaux sociaux"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            Description Open Graph
                          </label>
                          <textarea
                            value={seoData.openGraph.description}
                            onChange={(e) => setSeoData({
                              ...seoData,
                              openGraph: { ...seoData.openGraph, description: e.target.value }
                            })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter resize-y"
                            placeholder="Description pour le partage sur les réseaux sociaux"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            URL Open Graph
                          </label>
                          <input
                            type="text"
                            value={seoData.openGraph.url}
                            onChange={(e) => setSeoData({
                              ...seoData,
                              openGraph: { ...seoData.openGraph, url: e.target.value }
                            })}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                            placeholder="https://azalee-patrimoine.fr/immobilier"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Twitter Card */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-[#253F60]/20">
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#B99066]/30">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                        <h3 className="text-xl font-cairo font-bold text-[#253F60]">Twitter Card</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            Titre Twitter
                          </label>
                          <input
                            type="text"
                            value={seoData.twitter.title}
                            onChange={(e) => setSeoData({
                              ...seoData,
                              twitter: { ...seoData.twitter, title: e.target.value }
                            })}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                            placeholder="Titre pour Twitter"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            Description Twitter
                          </label>
                          <textarea
                            value={seoData.twitter.description}
                            onChange={(e) => setSeoData({
                              ...seoData,
                              twitter: { ...seoData.twitter, description: e.target.value }
                            })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter resize-y"
                            placeholder="Description pour Twitter"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border-2 border-[#253F60]/20 p-12 text-center">
                <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">Sélectionnez une page</h3>
                <p className="text-gray-600 font-inter">Choisissez une page dans la liste à gauche pour gérer son SEO</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


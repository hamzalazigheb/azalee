'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PdfUpload from '@/components/admin/PdfUpload';
import Notification from '@/components/admin/Notification';

export default function RessourcesAdminPage() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/cms/content?path=ressources');
      const data = await response.json();
      if (data.success && data.data && Object.keys(data.data).length > 0) {
        setContent(data.data);
      } else {
        // Initialize with default structure
        setContent({
          hero: {
            title: "Ressources & Guides",
            subtitle: "Téléchargez gratuitement nos guides experts pour maîtriser la gestion de votre patrimoine et optimiser votre fiscalité."
          },
          guides: [
            {
              id: 1,
              title: 'Guide Complet de la Gestion de Patrimoine',
              description: 'Tout ce que vous devez savoir pour organiser, optimiser et transmettre votre patrimoine. Un guide de 45 pages rédigé par nos experts.',
              category: 'Patrimoine',
              pages: 45,
              icon: '📊',
              color: 'from-[#253F60] to-[#1a2d47]',
              featured: true,
              pdfUrl: ''
            },
            {
              id: 2,
              title: 'Optimisation Fiscale 2025',
              description: 'Les meilleures stratégies pour réduire votre imposition en toute légalité. Dispositifs PER, SCPI, LMNP et plus.',
              category: 'Fiscalité',
              pages: 28,
              icon: '💰',
              color: 'from-[#B99066] to-[#8a6b4d]',
              featured: true,
              pdfUrl: ''
            },
            {
              id: 3,
              title: 'Préparer sa Retraite : Le Guide Pratique',
              description: 'De 40 à 65 ans, les étapes clés pour sécuriser vos revenus futurs et profiter sereinement de votre retraite.',
              category: 'Retraite',
              pages: 32,
              icon: '🏖️',
              color: 'from-[#4a6b8a] to-[#253F60]',
              featured: false,
              pdfUrl: ''
            },
            {
              id: 4,
              title: 'Investir en SCPI : Mode d\'Emploi',
              description: 'Comprendre les SCPI, choisir les meilleures, et optimiser votre investissement pierre-papier.',
              category: 'Placements',
              pages: 24,
              icon: '🏢',
              color: 'from-[#6b8a4a] to-[#4a6b3a]',
              featured: false,
              pdfUrl: ''
            },
            {
              id: 5,
              title: 'Transmission de Patrimoine : Anticiper pour Protéger',
              description: 'Donation, succession, assurance-vie : les outils pour transmettre dans les meilleures conditions.',
              category: 'Patrimoine',
              pages: 36,
              icon: '👨‍👩‍👧‍👦',
              color: 'from-[#8a4a6b] to-[#6b3a4a]',
              featured: false,
              pdfUrl: ''
            },
            {
              id: 6,
              title: 'L\'Assurance-Vie : Guide Complet',
              description: 'Fonctionnement, fiscalité, gestion : maîtrisez l\'assurance-vie pour optimiser votre épargne.',
              category: 'Placements',
              pages: 30,
              icon: '🛡️',
              color: 'from-[#4a8a6b] to-[#3a6b4a]',
              featured: false,
              pdfUrl: ''
            }
          ],
          categories: ['Tous', 'Patrimoine', 'Fiscalité', 'Placements', 'Retraite']
        });
      }
    } catch (error) {
      console.error('Error fetching ressources content:', error);
      setContent({
        hero: { title: "Ressources & Guides", subtitle: "" },
        guides: [],
        categories: ['Tous', 'Patrimoine', 'Fiscalité', 'Placements', 'Retraite']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: 'ressources',
          title: 'Ressources & Guides',
          content: content
        })
      });
      const data = await response.json();
      if (data.success) {
        setNotification({ type: 'success', message: 'Ressources sauvegardées avec succès !' });
        // Dispatch event to refresh public page
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cmsContentUpdated', { 
            detail: { path: 'ressources' } 
          }));
        }
      } else {
        setNotification({ type: 'error', message: data.message || 'Erreur lors de la sauvegarde' });
      }
    } catch (error) {
      console.error('Error saving ressources:', error);
      setNotification({ type: 'error', message: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const addGuide = () => {
    setContent(prev => ({
      ...prev,
      guides: [...(prev.guides || []), {
        id: Date.now(),
        title: '',
        description: '',
        category: 'Patrimoine',
        pages: 0,
        icon: '📊',
        color: 'from-[#253F60] to-[#1a2d47]',
        featured: false,
        pdfUrl: ''
      }]
    }));
  };

  const updateGuide = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      guides: prev.guides.map((guide, i) => 
        i === index ? { ...guide, [field]: value } : guide
      )
    }));
  };

  const removeGuide = (index) => {
    setContent(prev => ({
      ...prev,
      guides: prev.guides.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B99066] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-cairo font-bold text-[#253F60]">
                Gestion des Ressources
              </h1>
              <p className="text-gray-600 mt-2">Uploader et gérer les guides PDF téléchargeables</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#B99066] hover:bg-[#A67C52] text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>

          {/* Hero Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-cairo font-bold text-[#253F60] mb-4">Section Hero</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Titre</label>
                <input
                  type="text"
                  value={content.hero?.title || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Sous-titre</label>
                <textarea
                  value={content.hero?.subtitle || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Guides Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-cairo font-bold text-[#253F60]">Guides PDF</h2>
              <button
                onClick={addGuide}
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un guide
              </button>
            </div>

            <div className="space-y-6">
              {(content.guides || []).map((guide, index) => (
                <div key={guide.id || index} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#253F60]">Guide #{index + 1}</h3>
                    <button
                      onClick={() => removeGuide(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Supprimer
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Titre</label>
                      <input
                        type="text"
                        value={guide.title || ''}
                        onChange={(e) => updateGuide(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="Titre du guide"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Catégorie</label>
                      <select
                        value={guide.category || 'Patrimoine'}
                        onChange={(e) => updateGuide(index, 'category', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                      >
                        <option>Patrimoine</option>
                        <option>Fiscalité</option>
                        <option>Placements</option>
                        <option>Retraite</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Description</label>
                      <textarea
                        value={guide.description || ''}
                        onChange={(e) => updateGuide(index, 'description', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        rows={3}
                        placeholder="Description du guide"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre de pages</label>
                      <input
                        type="number"
                        value={guide.pages || 0}
                        onChange={(e) => updateGuide(index, 'pages', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Icône (emoji)</label>
                      <input
                        type="text"
                        value={guide.icon || '📊'}
                        onChange={(e) => updateGuide(index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="📊"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Couleur (gradient)</label>
                      <input
                        type="text"
                        value={guide.color || 'from-[#253F60] to-[#1a2d47]'}
                        onChange={(e) => updateGuide(index, 'color', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="from-[#253F60] to-[#1a2d47]"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={guide.featured || false}
                          onChange={(e) => updateGuide(index, 'featured', e.target.checked)}
                          className="w-5 h-5 text-[#B99066] focus:ring-[#B99066]"
                        />
                        <span className="text-sm font-semibold">Mis en avant</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Fichier PDF</label>
                      <PdfUpload
                        onUploadSuccess={(url) => updateGuide(index, 'pdfUrl', url)}
                        initialPdfUrl={guide.pdfUrl || ''}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!content.guides || content.guides.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">Aucun guide pour le moment</p>
                  <button
                    onClick={addGuide}
                    className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Ajouter le premier guide
                  </button>
                </div>
              )}
            </div>
          </div>

          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              isOpen={true}
              onClose={() => setNotification(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}


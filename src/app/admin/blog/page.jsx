'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '@/components/admin/Notification';
import ImageUpload from '@/components/admin/CloudinaryUpload';

export default function BlogAdminPage() {
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
      const response = await fetch('/api/cms/content?path=blog');
      const data = await response.json();
      if (data.success && data.data && Object.keys(data.data).length > 0) {
        setContent(data.data);
      } else {
        // Initialize with default structure
        setContent({
          hero: {
            title: "Blog & Actualités",
            subtitle: "Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser la gestion de votre patrimoine."
          },
          articles: [],
          categories: ['Tous', 'Fiscalité', 'Retraite', 'Placements', 'Patrimoine', 'Immobilier'],
          newsletter: {
            title: "Restez Informé",
            description: "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.",
            buttonText: "S'abonner"
          }
        });
      }
    } catch (error) {
      console.error('Error fetching blog content:', error);
      setContent({
        hero: { title: "Blog & Actualités", subtitle: "" },
        articles: [],
        categories: ['Tous', 'Fiscalité', 'Retraite', 'Placements', 'Patrimoine', 'Immobilier'],
        newsletter: {
          title: "Restez Informé",
          description: "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.",
          buttonText: "S'abonner"
        }
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
          path: 'blog',
          title: 'Blog & Actualités',
          content: content
        })
      });
      const data = await response.json();
      if (data.success) {
        setNotification({ type: 'success', message: 'Blog sauvegardé avec succès !' });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cmsContentUpdated', { 
            detail: { path: 'blog' } 
          }));
        }
      } else {
        setNotification({ type: 'error', message: data.message || 'Erreur lors de la sauvegarde' });
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setNotification({ type: 'error', message: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const addArticle = () => {
    setContent(prev => ({
      ...prev,
      articles: [...(prev.articles || []), {
        id: Date.now(),
        slug: '',
        title: '',
        excerpt: '',
        category: 'Fiscalité',
        author: 'Équipe Azalée',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 min',
        image: '',
        featured: false,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      }]
    }));
  };

  const updateArticle = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      articles: prev.articles.map((article, i) => {
        if (i === index) {
          if (field.startsWith('socialLinks.')) {
            const socialPlatform = field.split('.')[1];
            return {
              ...article,
              socialLinks: {
                ...article.socialLinks,
                [socialPlatform]: value
              }
            };
          }
          return { ...article, [field]: value };
        }
        return article;
      })
    }));
  };

  const removeArticle = (index) => {
    setContent(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
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
                Gestion du Blog
              </h1>
              <p className="text-gray-600 mt-2">Gérer les articles de blog et leurs liens vers les réseaux sociaux</p>
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

          {/* Articles Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-cairo font-bold text-[#253F60]">Articles de Blog</h2>
              <button
                onClick={addArticle}
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un article
              </button>
            </div>

            <div className="space-y-6">
              {(content.articles || []).map((article, index) => (
                <div key={article.id || index} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#253F60]">Article #{index + 1}</h3>
                    <button
                      onClick={() => removeArticle(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Supprimer
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Slug (URL)</label>
                      <input
                        type="text"
                        value={article.slug || ''}
                        onChange={(e) => updateArticle(index, 'slug', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="optimisation-fiscale-2025"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Catégorie</label>
                      <select
                        value={article.category || 'Fiscalité'}
                        onChange={(e) => updateArticle(index, 'category', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                      >
                        <option>Fiscalité</option>
                        <option>Retraite</option>
                        <option>Placements</option>
                        <option>Patrimoine</option>
                        <option>Immobilier</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Titre</label>
                      <input
                        type="text"
                        value={article.title || ''}
                        onChange={(e) => updateArticle(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="Titre de l'article"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Extrait</label>
                      <textarea
                        value={article.excerpt || ''}
                        onChange={(e) => updateArticle(index, 'excerpt', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        rows={3}
                        placeholder="Description courte de l'article"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Auteur</label>
                      <input
                        type="text"
                        value={article.author || ''}
                        onChange={(e) => updateArticle(index, 'author', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date</label>
                      <input
                        type="date"
                        value={article.date || ''}
                        onChange={(e) => updateArticle(index, 'date', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Temps de lecture</label>
                      <input
                        type="text"
                        value={article.readTime || ''}
                        onChange={(e) => updateArticle(index, 'readTime', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                        placeholder="5 min"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={article.featured || false}
                          onChange={(e) => updateArticle(index, 'featured', e.target.checked)}
                          className="w-5 h-5 text-[#B99066] focus:ring-[#B99066]"
                        />
                        <span className="text-sm font-semibold">Mis en avant</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Image de l'article</label>
                      <ImageUpload
                        onUploadSuccess={(url) => {
                          updateArticle(index, 'image', url);
                        }}
                        initialImageUrl={article.image || ''}
                        recommendedWidth={1200}
                        recommendedHeight={675}
                      />
                    </div>
                    
                    {/* Social Links Section */}
                    <div className="md:col-span-2 border-t border-gray-300 pt-4 mt-4">
                      <h4 className="text-sm font-bold text-[#253F60] mb-3">Liens vers les réseaux sociaux</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">LinkedIn</label>
                          <input
                            type="url"
                            value={article.socialLinks?.linkedin || ''}
                            onChange={(e) => updateArticle(index, 'socialLinks.linkedin', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                            placeholder="https://linkedin.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Facebook</label>
                          <input
                            type="url"
                            value={article.socialLinks?.facebook || ''}
                            onChange={(e) => updateArticle(index, 'socialLinks.facebook', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Twitter/X</label>
                          <input
                            type="url"
                            value={article.socialLinks?.twitter || ''}
                            onChange={(e) => updateArticle(index, 'socialLinks.twitter', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                            placeholder="https://twitter.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Instagram</label>
                          <input
                            type="url"
                            value={article.socialLinks?.instagram || ''}
                            onChange={(e) => updateArticle(index, 'socialLinks.instagram', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!content.articles || content.articles.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">Aucun article pour le moment</p>
                  <button
                    onClick={addArticle}
                    className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Ajouter le premier article
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-cairo font-bold text-[#253F60] mb-4">Section Newsletter</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Titre</label>
                <input
                  type="text"
                  value={content.newsletter?.title || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    newsletter: { ...prev.newsletter, title: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={content.newsletter?.description || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    newsletter: { ...prev.newsletter, description: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Texte du bouton</label>
                <input
                  type="text"
                  value={content.newsletter?.buttonText || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    newsletter: { ...prev.newsletter, buttonText: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                />
              </div>
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


'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from '../../../components/admin/SortableItem';
import ImageUpload from '../../../components/admin/CloudinaryUpload';
import Notification from '../../../components/admin/Notification';
import TextEditor from '../../../components/admin/TextEditor';
import { getImagePath } from '@/lib/paths';

// Helper function to strip HTML tags and show only text
const stripHTML = (html) => {
  if (!html || typeof html !== 'string') return html;
  // Remove HTML tags but keep the text content
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

// Helper function to detect if text contains HTML
const containsHTML = (text) => {
  if (!text || typeof text !== 'string') return false;
  return /<[^>]+>/g.test(text);
};

// Helper function to safely convert value to string for input fields
const safeStringValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    // If it's an object, try to stringify it, but only if it's a simple object
    try {
      // Check if it's a simple object (not an array, Date, etc.)
      if (Array.isArray(value)) return '';
      if (value instanceof Date) return value.toISOString();
      // For complex objects, return empty string - they should be rendered differently
      return '';
    } catch (e) {
      return '';
    }
  }
  return '';
};

// Editors removed - using simple textarea for all fields

// Fonction pour catégoriser les pages
const categorizePages = (pages) => {
  // Liste exacte des chemins présents dans la navigation (Navbar)
  const navbarPaths = new Set([
    'accueil', 'home', '/',
    // Fiscalité
    'fiscalite', 'fiscalite/impot-sur-le-revenu', 'fiscalite/declaration-impots', 'fiscalite/tranches-baremes-plafonds', 'fiscalite/lois-fiscales',
    'fiscalite/loi-pinel', 'fiscalite/loi-girardin', 'fiscalite/loi-denormandie', 'fiscalite/loi-malraux', 'fiscalite/loi-cosse',
    'fiscalite/monument-historique', 'fiscalite/reductions-impot-deficit-foncier', 'fiscalite/fiscalite-placements', 'fiscalite/pfu',
    'fiscalite/tmi-prelevements-sociaux', 'fiscalite/defiscalisation-cas-specifiques', 'fiscalite/autre-fiscalite',
    // Immobilier
    'immobilier', 'immobilier/immobilier-neuf', 'immobilier/vefa', 'immobilier/scellier', 'immobilier/faire-construire',
    'immobilier/investissement-locatif', 'immobilier/sci', 'immobilier/credit-immobilier-ptz', 'immobilier/plus-value-immobiliere',
    'immobilier/lmnp', 'immobilier/immeubles-de-rapport',
    // Placements
    'placements', 'placements/assurance-vie', 'placements/assurance-vie-luxembourg', 'placements/compte-titres',
    'placements/contrat-capitalisation', 'placements/livret', 'placements/bourse-actions', 'placements/scpi-opci',
    'placements/pea-per', 'placements/taux-interets', 'placements/etf-produits-financiers', 'placements/autres',
    // Retraite
    'retraite', 'retraite/plan-retraite', 'retraite/rachat-trimestres', 'retraite/simulation', 'retraite/prevoyance-protection',
    'retraite/retraite-progressive', 'retraite/autre',
    // Patrimoine
    'patrimoine', 'patrimoine/succession-heritage', 'patrimoine/donation-gratuite', 'patrimoine/donation-onereuse',
    'patrimoine/transmission', 'patrimoine/protection-famille', 'patrimoine/bilan', 'patrimoine/conseils', 'patrimoine/autre',
    // Outils
    'outils-financiers', 'outils-financiers/guide-defiscalisation', 'outils/calculatrice-impots', 'outils/calculs-financiers',
    'outils-financiers/assurance-vie-vs-per', 'outils/simulateur-investissement', 'outils/guides-pratiques',
    // Institutionnel
    'qui-sommes-nous', 'equipe', 'notre-approche', 'contact',
    // Blog et Ressources
    'blog', 'ressources'
  ]);

  // Fonction pour vérifier si une page doit être incluse
  // UNIQUEMENT les pages explicitement listées dans navbarPaths
  const shouldIncludePage = (path) => {
    // Normaliser le path
    const normalizedPath = path.toLowerCase().replace(/^\//, '');
    
    // UNIQUEMENT vérifier si le path exact est dans navbarPaths
    // Ne pas inclure automatiquement toutes les sous-pages
    return navbarPaths.has(normalizedPath) || navbarPaths.has(path);
  };

  const categories = {
    'Accueil': { pages: [], icon: '🏠', color: 'from-blue-500 to-blue-600' },
    'Fiscalité': { pages: [], icon: '📊', color: 'from-purple-500 to-purple-600' },
    'Immobilier': { pages: [], icon: '🏠', color: 'from-green-500 to-green-600' },
    'Placements': { pages: [], icon: '💰', color: 'from-yellow-500 to-yellow-600' },
    'Retraite': { pages: [], icon: '👴', color: 'from-orange-500 to-orange-600' },
    'Patrimoine': { pages: [], icon: '💼', color: 'from-indigo-500 to-indigo-600' },
    'Outils': { pages: [], icon: '🔧', color: 'from-gray-500 to-gray-600' },
    'Institutionnel': { pages: [], icon: '🏛️', color: 'from-red-500 to-red-600' }
  };

  pages.forEach(page => {
    if (!page.path) return; // Ignorer les pages sans path
    const rawPath = page.path.toLowerCase().replace(/^\//, ''); // Normaliser le chemin
    const path = rawPath === '' ? '/' : rawPath;

    // Ne garder que les pages de la navbar et leurs sous-pages
    if (!shouldIncludePage(path)) return;

    if (path === 'accueil' || path === 'home' || path === '/') {
      categories['Accueil'].pages.push(page);
    } else if (path.startsWith('fiscalite')) {
      categories['Fiscalité'].pages.push(page);
    } else if (path.startsWith('immobilier')) {
      categories['Immobilier'].pages.push(page);
    } else if (path.startsWith('placements')) {
      categories['Placements'].pages.push(page);
    } else if (path.startsWith('retraite')) {
      categories['Retraite'].pages.push(page);
    } else if (path.startsWith('patrimoine')) {
      categories['Patrimoine'].pages.push(page);
    } else if (path.startsWith('outils') || path.startsWith('outils-financiers')) {
      categories['Outils'].pages.push(page);
    } else if (['qui-sommes-nous', 'equipe', 'notre-approche', 'contact', 'blog', 'ressources'].includes(path)) {
      categories['Institutionnel'].pages.push(page);
    }
  });

  // Trier les pages dans chaque catégorie
  Object.keys(categories).forEach(key => {
    categories[key].pages.sort((a, b) => {
      const aIsMain = !a.path.includes('/') || navbarPaths.has(a.path);
      const bIsMain = !b.path.includes('/') || navbarPaths.has(b.path);
      if (aIsMain && !bIsMain) return -1;
      if (!aIsMain && bIsMain) return 1;
      return a.path.localeCompare(b.path);
    });
  });

  return categories;
};

export default function CMSManagementPage() {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPage, setNewPage] = useState({ path: '', title: '', content: {} });
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    'Accueil': true,
    'Fiscalité': true,
    'Immobilier': true,
    'Placements': true,
    'Retraite': true,
    'Patrimoine': true,
    'Outils': true,
    'Institutionnel': true
  });
  const [sortBy, setSortBy] = useState('path'); // 'path', 'date', 'title'

  // dnd-kit sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const initializeCMS = async () => {
      setLoading(true);
      try {
        // Fetch pages first
        await fetchPages();

        // Check if there's a path parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const pathParam = urlParams.get('path');
        if (pathParam) {
          await fetchPageContent(pathParam);
        }
      } catch (error) {
        console.error('Error initializing CMS:', error);
      } finally {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    initializeCMS();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/cms/pages');
      const data = await response.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  };

  const fetchPageContent = async (path) => {
    try {
      const response = await fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`);
      const data = await response.json();
      if (data.success) {
        setSelectedPage(data.data);
        const content = data.data.content || {};
        console.log('📦 CMS Admin - Fetched content for', path, ':', {
          totalSections: Object.keys(content).length,
          sections: Object.keys(content),
          hasDeclarationSteps: !!content.declarationSteps,
          declarationStepsCount: content.declarationSteps?.length || 0,
          hasCalendarData: !!content.calendarData,
          calendarDataCount: content.calendarData?.length || 0,
          hasCommonErrors: !!content.commonErrors,
          commonErrorsCount: content.commonErrors?.length || 0,
          hasQuickStats: !!content.quickStats,
          quickStatsCount: content.quickStats?.length || 0,
          hasTabContent: !!content.tabContent,
          tabContentKeys: content.tabContent ? Object.keys(content.tabContent) : [],
          hasConclusion: !!content.conclusion
        });

        // Convert partners from string array to object array if needed
        if (content.partners && Array.isArray(content.partners) && content.partners.length > 0) {
          if (typeof content.partners[0] === 'string') {
            console.log('Converting partners from strings to objects');
            content.partners = content.partners.map((item) => {
              if (typeof item === 'string') {
                return { image: item, website: '', name: '' };
              }
              return item;
            });
          }
        }

        setFormData(content);
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  const handleInputChange = (section, field, value) => {
    console.log('handleInputChange:', { section, field, value: typeof value === 'string' ? value.substring(0, 50) : value });

    // Validate that section is not undefined or empty
    if (!section || section.trim() === '') {
      console.error('ERROR: handleInputChange called with invalid section:', section);
      return;
    }

    setFormData(prev => {
      // Special case: if section is directly an array (e.g., "partners"), replace the entire section
      if (section === field && Array.isArray(value)) {
        const newData = {
          ...prev,
          [section]: value
        };
        console.log('Updated array section:', section, 'with', value.length, 'items');
        return newData;
      }

      // Handle nested fields with dot notation (e.g., "hero.h1" or "section2.h3_inflation.title")
      // Also handle cases like section="solutions", field="solutions.solutions"
      const fieldParts = field.split('.');

      // Check if the first part of field matches the section name (e.g., section="solutions", field="solutions.solutions")
      // In this case, we should skip the first part since it's redundant
      const adjustedFieldParts = (fieldParts.length > 1 && fieldParts[0] === section)
        ? fieldParts.slice(1)
        : fieldParts;

      if (adjustedFieldParts.length === 1) {
        // Simple field - ensure we're updating the correct section
        const newData = {
          ...prev,
          [section]: {
            ...(prev[section] || {}),
            [adjustedFieldParts[0]]: value
          }
        };
        console.log('Updated formData for section:', section, 'field:', adjustedFieldParts[0], 'value:', typeof value === 'string' ? value.substring(0, 50) : value);
        console.log('Section data after update:', newData[section]);
        return newData;
      } else {
        // Nested field - build nested object structure
        const newSection = { ...(prev[section] || {}) };
        let current = newSection;

        // Navigate/create nested structure
        for (let i = 0; i < adjustedFieldParts.length - 1; i++) {
          const part = adjustedFieldParts[i];
          if (!current[part] || typeof current[part] !== 'object' || Array.isArray(current[part])) {
            current[part] = {};
          }
          current = current[part];
        }

        // Set the final value
        current[adjustedFieldParts[adjustedFieldParts.length - 1]] = value;

        return {
          ...prev,
          [section]: newSection
        };
      }
    });
  };

  const handleArrayChange = (section, field, index, value) => {
    setFormData(prev => {
      const newArray = [...(prev[section]?.[field] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const addArrayItem = (section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section]?.[field] || []), '']
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    // Get current array value - handle nested fields with dot notation
    const fieldParts = field.split('.');
    let currentArray = null;

    if (fieldParts.length === 1) {
      // Simple field
      currentArray = formData[section]?.[field] || [];
    } else {
      // Nested field - navigate to the nested structure
      let current = formData[section];
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (current && typeof current === 'object') {
          current = current[fieldParts[i]];
        } else {
          current = null;
          break;
        }
      }
      currentArray = current?.[fieldParts[fieldParts.length - 1]] || [];
    }

    // Remove item and update using handleInputChange
    const newArray = [...currentArray];
    newArray.splice(index, 1);
    handleInputChange(section, field, newArray);
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      console.log('Saving page:', selectedPage.path);

      // Filter out menuItems section before saving (menu items are static)
      const contentToSave = Object.keys(formData).reduce((acc, key) => {
        if (key.toLowerCase() !== 'menuitems' && key.toLowerCase() !== 'menu items') {
          acc[key] = formData[key];
        }
        return acc;
      }, {});

      const response = await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: selectedPage.path,
          content: contentToSave
        })
      });

      const data = await response.json();
      console.log('Save response:', data);

      if (data.success) {
        setNotification({ isOpen: true, message: 'Page mise à jour avec succès !', type: 'success' });
        // Refresh the page content to show updated data
        await fetchPageContent(selectedPage.path);
        fetchPages();

        // Dispatch custom event to notify other pages that content was updated
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cmsContentUpdated', {
            detail: { 
              path: selectedPage.path,
              timestamp: Date.now()
            }
          });
          window.dispatchEvent(event);
          console.log('📢 CMS update event dispatched:', { path: selectedPage.path, timestamp: Date.now() });
          
          // Also try to dispatch to all windows (for cross-tab communication)
          try {
            localStorage.setItem('cmsLastUpdate', JSON.stringify({
              path: selectedPage.path,
              timestamp: Date.now()
            }));
            // Trigger storage event for other tabs
            window.dispatchEvent(new StorageEvent('storage', {
              key: 'cmsLastUpdate',
              newValue: JSON.stringify({ path: selectedPage.path, timestamp: Date.now() })
          }));
          } catch (e) {
            console.warn('Could not use localStorage for cross-tab communication:', e);
          }
        }
      } else {
        setNotification({ isOpen: true, message: 'Erreur : ' + data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setNotification({ isOpen: true, message: 'Erreur lors de la sauvegarde de la page: ' + error.message, type: 'error' });
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: newPage.path,
          title: newPage.title,
          content: newPage.content
        })
      });

      const data = await response.json();
      if (data.success) {
        setNotification({ isOpen: true, message: 'Page créée avec succès !', type: 'success' });
        setShowCreateModal(false);
        setNewPage({ path: '', title: '', content: {} });
        fetchPages();
      } else {
        setNotification({ isOpen: true, message: 'Erreur : ' + data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error creating page:', error);
      setNotification({ isOpen: true, message: 'Erreur lors de la création de la page', type: 'error' });
    }
  };

  // Fonction pour filtrer et trier les pages
  const getFilteredAndSortedPages = (pagesList) => {
    let filtered = pagesList;

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(page =>
        (page.title && page.title.toLowerCase().includes(query)) ||
        (page.path && page.path.toLowerCase().includes(query))
      );
    }

    // Tri
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.lastModified) - new Date(a.lastModified);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        // Par défaut, tri par path
        return a.path.localeCompare(b.path);
      }
    });

    return filtered;
  };

  // Fonction pour toggle une catégorie
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleDelete = async (path) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const response = await fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        setNotification({ isOpen: true, message: 'Page supprimée avec succès !', type: 'success' });
        setSelectedPage(null);
        fetchPages();
      } else {
        setNotification({ isOpen: true, message: 'Erreur : ' + data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      setNotification({ isOpen: true, message: 'Erreur lors de la suppression de la page', type: 'error' });
    }
  };

  const renderFormField = (section, field, label, type = 'text', isArray = false) => {
    const currentPagePath = selectedPage?.path || '';

    // Handle nested fields with dot notation
    const getNestedValue = (obj, path) => {
      const parts = path.split('.');
      // If the first part matches the section name, skip it (e.g., section="solutions", field="solutions.solutions")
      const adjustedParts = (parts.length > 1 && parts[0] === section) ? parts.slice(1) : parts;
      let current = obj;
      for (const part of adjustedParts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return current;
    };

    const value = getNestedValue(formData[section], field);

    if (isArray && Array.isArray(value)) {
      // Check if array contains objects
      const isObjectArray = value.length > 0 && typeof value[0] === 'object' && value[0] !== null && !Array.isArray(value[0]);

      if (isObjectArray) {
        // Render object array with drag & drop support
        const handleDragEnd = (event) => {
          const { active, over } = event;
          if (active.id !== over.id) {
            const oldIndex = value.findIndex((_, idx) => idx.toString() === active.id);
            const newIndex = value.findIndex((_, idx) => idx.toString() === over.id);
            const newArray = arrayMove(value, oldIndex, newIndex);
            handleInputChange(section, field, newArray);
          }
        };

        return (
          <div>
            <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
              {label}
            </label>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={value.map((_, index) => index.toString())}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {value.map((item, index) => (
                    <SortableItem key={index} id={index.toString()}>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Item {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeArrayItem(section, field, index)}
                            className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-sm font-inter font-semibold"
                            title="Remove item"
                          >
                            ✕ Remove
                          </button>
                        </div>
                        <div className="space-y-3">
                          {Object.keys(item || {}).map((key) => {
                            const fieldValue = item[key] || '';
                            
                            // Detect if this is an image field (PRIORITY CHECK)
                            const isImageField = 
                              key.toLowerCase().includes('photo') ||
                              key.toLowerCase().includes('image') ||
                              key.toLowerCase().includes('picture') ||
                              key.toLowerCase().includes('img') ||
                              (typeof fieldValue === 'string' && (
                                fieldValue.startsWith('/images/') ||
                                fieldValue.includes('.webp') ||
                                fieldValue.includes('.jpg') ||
                                fieldValue.includes('.png')
                              ));
                            
                            const isTextField = !isImageField && typeof fieldValue === 'string' && (
                              fieldValue.includes('<strong') ||
                              fieldValue.includes('<em') ||
                              fieldValue.includes('<b') ||
                              key.toLowerCase().includes('text') ||
                              key.toLowerCase().includes('description') ||
                              key.toLowerCase().includes('content') ||
                              key.toLowerCase().includes('error') ||
                              key.toLowerCase().includes('title')
                            );

                            // Detect long text fields that should use textarea
                            const isLongTextField = !isImageField && (key.toLowerCase().includes('details') ||
                              key.toLowerCase().includes('detail') ||
                              key.toLowerCase().includes('paragraph') ||
                              (typeof fieldValue === 'string' && fieldValue.length > 50));

                            return (
                              <div key={key}>
                                <label className="block text-xs font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-1">
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </label>
                                {isImageField ? (
                                  <ImageUpload
                                    onUploadSuccess={(url) => {
                                      console.log('🖼️ ImageUpload - array item:', index, 'key:', key, 'url:', url.substring(0, 50));
                                      const newArray = [...value];
                                      newArray[index] = { ...newArray[index], [key]: url };
                                      handleInputChange(section, field, newArray);
                                    }}
                                    initialImageUrl={fieldValue}
                                  />
                                ) : isTextField ? (
                                  <TextEditor
                                    value={fieldValue}
                                    onChange={(newValue) => {
                                      const newArray = [...value];
                                      newArray[index] = { ...newArray[index], [key]: newValue };
                                      // Handle nested fields with dot notation
                                      handleInputChange(section, field, newArray);
                                    }}
                                    placeholder={`Écrivez ${key}...`}
                                  />
                                ) : isLongTextField ? (
                                  <textarea
                                    value={fieldValue}
                                    onChange={(e) => {
                                      const newArray = [...value];
                                      newArray[index] = { ...newArray[index], [key]: e.target.value };
                                      handleInputChange(section, field, newArray);
                                    }}
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
                                    placeholder={`Entrez ${key}...`}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={fieldValue}
                                    onChange={(e) => {
                                      const newArray = [...value];
                                      newArray[index] = { ...newArray[index], [key]: e.target.value };
                                      // Handle nested fields with dot notation
                                      handleInputChange(section, field, newArray);
                                    }}
                                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    placeholder={`Entrez ${key}...`}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <button
              type="button"
              onClick={() => {
                // Add new object with same structure as first item
                const newItem = value.length > 0
                  ? Object.keys(value[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
                  : { title: '', description: '' };
                // Use handleInputChange to properly handle nested fields like "enveloppes.items"
                const newArray = [...value, newItem];
                handleInputChange(section, field, newArray);
              }}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
            >
              + Add Item
            </button>
          </div>
        );
      }

      // Render simple string array with drag & drop
      const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
          const oldIndex = value.findIndex((_, idx) => idx.toString() === active.id);
          const newIndex = value.findIndex((_, idx) => idx.toString() === over.id);
          const newArray = arrayMove(value, oldIndex, newIndex);
          handleInputChange(section, field, newArray);
        }
      };

      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={value.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {value.map((item, index) => {
                  const itemValue = typeof item === 'string' ? item : '';
                  const hasHTML = containsHTML(itemValue);
                  const isParagraphField = field.toLowerCase().includes('paragraph') || label.toLowerCase().includes('paragraph');

                  return (
                    <SortableItem key={index} id={index.toString()}>
                      <div className="flex gap-2 items-start">
                        {hasHTML || isParagraphField ? (
                          <div className="flex-1">
                            <TextEditor
                              value={itemValue}
                              onChange={(newValue) => {
                                handleArrayChange(section, field, index, newValue);
                              }}
                              placeholder={`Écrivez ${label.toLowerCase()} ${index + 1}...`}
                            />
                          </div>
                        ) : (
                          <textarea
                            value={itemValue}
                            onChange={(e) => handleArrayChange(section, field, index, e.target.value)}
                            rows={3}
                            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
                            placeholder={`Écrivez ${label.toLowerCase()} ${index + 1}...`}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeArrayItem(section, field, index)}
                          className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 font-inter font-semibold flex-shrink-0"
                          title="Supprimer"
                        >
                          ✕
                        </button>
                      </div>
                    </SortableItem>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
          <button
            type="button"
            onClick={() => addArrayItem(section, field)}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
          >
            + Add Item
          </button>
        </div>
      );
    }

    // Exclure les champs de lien (link, url, ctaLink, etc.) de la détection d'image
    const isLinkField = field.toLowerCase().includes('link') ||
      field.toLowerCase().includes('url') ||
      field.toLowerCase() === 'href' ||
      (field.toLowerCase() === 'src' && !field.toLowerCase().includes('image')) ||
      label.toLowerCase().includes('link') ||
      label.toLowerCase().includes('url');

    // Check if field is an image (but exclude fields that are specifically background images and link fields)
    const isImageField = !isLinkField && (
      type === 'image' ||
      (field.toLowerCase().includes('image') && !field.toLowerCase().includes('background')) ||
      field.toLowerCase().includes('photo') ||
      field.toLowerCase().includes('picture') ||
      (field.toLowerCase().includes('img') && !field.toLowerCase().includes('background')) ||
      (label.toLowerCase().includes('image') && !label.toLowerCase().includes('background')) ||
      label.toLowerCase().includes('photo') ||
      (typeof value === 'string' && (
        value.startsWith('/images/') ||
        (value.startsWith('http') && (value.includes('.jpg') || value.includes('.png') || value.includes('.webp') || value.includes('.svg') || value.includes('.gif'))) ||
        value.includes('.jpg') ||
        value.includes('.png') ||
        value.includes('.webp') ||
        value.includes('.svg')
      ))
    );

    // Check if field is specifically a background image
    const isBackgroundImage = field.toLowerCase().includes('background') || label.toLowerCase().includes('background');

    // Check if field contains HTML
    const fieldValue = value || '';
    const hasHTML = typeof fieldValue === 'string' && containsHTML(fieldValue);

    // Use TextEditor for fields with HTML or description/text/paragraph fields
    // This ensures users never see raw HTML tags
    const shouldUseTextEditor = typeof fieldValue === 'string' && !isImageField && (
      hasHTML ||
      field.toLowerCase().includes('text') ||
      field.toLowerCase().includes('description') ||
      field.toLowerCase().includes('content') ||
      field.toLowerCase().includes('paragraph') ||
      label.toLowerCase().includes('texte') ||
      label.toLowerCase().includes('description') ||
      label.toLowerCase().includes('paragraph') ||
      label.toLowerCase().includes('paragraphe')
    );

    return (
      <div>
        <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
          {label}
        </label>
        {isImageField ? (
          <div>
            <ImageUpload
              onUploadSuccess={(url) => {
                console.log('ImageUpload onUploadSuccess - section:', section, 'field:', field, 'url:', url.substring(0, 50));
                if (!section || section.trim() === '') {
                  console.error('ERROR: ImageUpload called with invalid section:', section);
                  return;
                }
                handleInputChange(section, field, url);
              }}
              initialImageUrl={value || ''}
            />
          </div>
        ) : shouldUseTextEditor ? (
          typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) ? (
            <textarea
              value={JSON.stringify(fieldValue, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleInputChange(section, field, parsed);
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#253F60] dark:focus:ring-[#B99066] focus:border-transparent resize-y bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm"
              placeholder={`${label} (JSON)...`}
            />
          ) : (
            <TextEditor
              value={typeof fieldValue === 'string' ? fieldValue : ''}
              onChange={(newValue) => handleInputChange(section, field, newValue)}
              placeholder={`Écrivez ${label.toLowerCase()}...`}
            />
          )
        ) : type === 'textarea' ? (
          <textarea
            value={typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) ? JSON.stringify(fieldValue, null, 2) : safeStringValue(fieldValue)}
            onChange={(e) => {
              if (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue)) {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleInputChange(section, field, parsed);
                } catch (err) {
                  // Invalid JSON, don't update
                }
              } else {
                handleInputChange(section, field, e.target.value);
              }
            }}
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#253F60] dark:focus:ring-[#B99066] focus:border-transparent resize-y bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) ? 'font-mono text-sm' : ''}`}
            placeholder={typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue) ? `${label} (JSON)...` : `Entrez ${label.toLowerCase()}...`}
          />
        ) : (
          <input
            type={type}
            value={typeof value === 'object' && value !== null && !Array.isArray(value) ? JSON.stringify(value, null, 2) : safeStringValue(value)}
            onChange={(e) => {
              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleInputChange(section, field, parsed);
                } catch (err) {
                  // Invalid JSON, don't update
                }
              } else {
                handleInputChange(section, field, e.target.value);
              }
            }}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#253F60] dark:focus:ring-[#B99066] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${typeof value === 'object' && value !== null && !Array.isArray(value) ? 'font-mono text-xs' : ''}`}
            placeholder={typeof value === 'object' && value !== null && !Array.isArray(value) ? `${label} (JSON)...` : `Entrez ${label.toLowerCase()}...`}
          />
        )}
      </div>
    );
  };

  const renderNestedSection = (sectionKey, sectionData, title) => {
    if (!sectionData) return null;

    // Handle case where section is directly an array (e.g., "partners", "stats")
    if (Array.isArray(sectionData)) {
      // Special handling for partners - they should be objects with image and website
      const isPartnersSection = sectionKey.toLowerCase() === 'partners';

      const isImageArray = sectionData.length > 0 && typeof sectionData[0] === 'string' &&
        (sectionData[0].startsWith('/images/') || sectionData[0].startsWith('http') || sectionData[0].includes('.jpg') || sectionData[0].includes('.png') || sectionData[0].includes('.webp') || sectionData[0].includes('.svg') || sectionKey.toLowerCase().includes('partner'));

      // Check if it's an array of objects (e.g., "stats" with {value, label} or "partners" with {image, website})
      const isObjectArray = sectionData.length > 0 && typeof sectionData[0] === 'object' && sectionData[0] !== null && !Array.isArray(sectionData[0]);

      return (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6 border-2 border-[#253F60]/20 dark:border-gray-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#B99066]/30 dark:border-gray-700">
            <div className="w-1 h-8 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
            <h3 className="text-xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">{title}</h3>
          </div>
          <div className="space-y-4">
            {isPartnersSection && (isObjectArray || isImageArray) ? (
              // Special rendering for partners with image and website fields
              <>
                {sectionData.map((partner, index) => {
                  // Handle both string and object formats
                  const partnerObj = typeof partner === 'string'
                    ? { image: partner, website: '', name: '' }
                    : {
                      image: partner?.image || partner?.url || '',
                      website: partner?.website || partner?.url || '',
                      name: partner?.name || ''
                    };

                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-5 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-[#253F60] dark:text-[#B99066]">Partenaire {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newArray = sectionData.filter((_, i) => i !== index);
                            handleInputChange(sectionKey, sectionKey, newArray);
                          }}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                          title="Supprimer ce partenaire"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-4">
                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                            Logo du partenaire
                          </label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <ImageUpload
                              onUploadSuccess={(url) => {
                                const newArray = [...sectionData];
                                newArray[index] = { ...partnerObj, image: url };
                                handleInputChange(sectionKey, sectionKey, newArray);
                              }}
                              initialImageUrl={partnerObj.image || ''}
                            />
                          </div>
                        </div>

                        {/* Website URL */}
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                            Site web du partenaire (URL)
                          </label>
                          <input
                            type="url"
                            value={partnerObj.website || ''}
                            onChange={(e) => {
                              const newArray = [...sectionData];
                              newArray[index] = { ...partnerObj, website: e.target.value };
                              handleInputChange(sectionKey, sectionKey, newArray);
                            }}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="https://www.exemple.fr"
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Laissez vide ou mettez "#" si le partenaire n'a pas de site web
                          </p>
                        </div>

                        {/* Partner Name (optional) */}
                        <div>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                            Nom du partenaire (optionnel)
                          </label>
                          <input
                            type="text"
                            value={partnerObj.name || ''}
                            onChange={(e) => {
                              const newArray = [...sectionData];
                              newArray[index] = { ...partnerObj, name: e.target.value };
                              handleInputChange(sectionKey, sectionKey, newArray);
                            }}
                            className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Nom du partenaire"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    const newArray = [...sectionData, { image: '', website: '', name: '' }];
                    handleInputChange(sectionKey, sectionKey, newArray);
                  }}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
                >
                  + Ajouter un partenaire
                </button>
              </>
            ) : isImageArray ? (
              <>
                {sectionData.map((imageUrl, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const newArray = sectionData.filter((_, i) => i !== index);
                        handleInputChange(sectionKey, sectionKey, newArray);
                      }}
                      className="absolute top-2 right-2 z-10 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                      title="Supprimer ce partenaire"
                    >
                      ✕
                    </button>
                    <ImageUpload
                      onUploadSuccess={(url) => {
                        console.log('ImageUpload onUploadSuccess - section:', sectionKey, 'url:', url.substring(0, 50));
                        const newArray = [...sectionData];
                        newArray[index] = url;
                        handleInputChange(sectionKey, sectionKey, newArray);
                      }}
                      initialImageUrl={imageUrl || ''}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newArray = [...sectionData, ''];
                    handleInputChange(sectionKey, sectionKey, newArray);
                  }}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
                >
                  + Ajouter un partenaire
                </button>
              </>
            ) : isObjectArray ? (
              // Render array of objects (e.g., stats with {value, label})
              <>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => {
                    const { active, over } = event;
                    if (active.id !== over.id) {
                      const oldIndex = sectionData.findIndex((_, idx) => idx.toString() === active.id);
                      const newIndex = sectionData.findIndex((_, idx) => idx.toString() === over.id);
                      const newArray = arrayMove(sectionData, oldIndex, newIndex);
                      handleInputChange(sectionKey, sectionKey, newArray);
                    }
                  }}
                >
                  <SortableContext
                    items={sectionData.map((_, index) => index.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    {sectionData.map((item, index) => (
                      <SortableItem key={index} id={index.toString()}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700 mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-md font-medium text-[#253F60] dark:text-[#B99066]">Item {index + 1}</h4>
                            <button
                              type="button"
                              onClick={() => {
                                const newArray = sectionData.filter((_, i) => i !== index);
                                handleInputChange(sectionKey, sectionKey, newArray);
                              }}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                              title="Supprimer cet item"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="space-y-3">
                            {Object.keys(item).map((key) => {
                              const fieldValue = item[key] || '';
                              
                              // Detect if this is an image field
                              const isImageField = 
                                key.toLowerCase().includes('photo') ||
                                key.toLowerCase().includes('image') ||
                                key.toLowerCase().includes('picture') ||
                                key.toLowerCase().includes('img') ||
                                (typeof fieldValue === 'string' && (
                                  fieldValue.startsWith('/images/') ||
                                  fieldValue.includes('.webp') ||
                                  fieldValue.includes('.jpg') ||
                                  fieldValue.includes('.png')
                                ));
                              
                              return (
                              <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                  {isImageField ? (
                                    <ImageUpload
                                      onUploadSuccess={(url) => {
                                        console.log('ImageUpload onUploadSuccess - array item:', index, 'key:', key, 'url:', url.substring(0, 50));
                                        const newArray = [...sectionData];
                                        newArray[index] = { ...newArray[index], [key]: url };
                                        handleInputChange(sectionKey, sectionKey, newArray);
                                      }}
                                      initialImageUrl={fieldValue}
                                    />
                                  ) : (
                                <input
                                  type="text"
                                      value={fieldValue}
                                  onChange={(e) => {
                                    const newArray = [...sectionData];
                                    newArray[index] = { ...newArray[index], [key]: e.target.value };
                                    handleInputChange(sectionKey, sectionKey, newArray);
                                  }}
                                  className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                  placeholder={`Entrez ${key}...`}
                                />
                                  )}
                              </div>
                              );
                            })}
                          </div>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
                <button
                  type="button"
                  onClick={() => {
                    // Add new object with same structure as first item
                    const newItem = sectionData.length > 0
                      ? Object.keys(sectionData[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
                      : { value: '', label: '' };
                    const newArray = [...sectionData, newItem];
                    handleInputChange(sectionKey, sectionKey, newArray);
                  }}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
                >
                  + Ajouter un item
                </button>
              </>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Tableau non-image détecté</div>
            )}
          </div>
        </div>
      );
    }

    if (typeof sectionData !== 'object') return null;

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 border-2 border-[#253F60]/20 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-[#B99066]/30 dark:border-gray-700">
          <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
          <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] dark:text-[#B99066] break-words">{title}</h3>
        </div>
        <div className="space-y-4">
          {Object.keys(sectionData).map((field) => {
            const value = sectionData[field];
            const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

            if (Array.isArray(value)) {
              // Check if array contains image URLs
              const isImageArray = value.length > 0 && typeof value[0] === 'string' &&
                (value[0].startsWith('/images/') || value[0].startsWith('http') || value[0].includes('.jpg') || value[0].includes('.png') || value[0].includes('.webp') || value[0].includes('.svg') || field.toLowerCase().includes('background') || field.toLowerCase().includes('image') || field.toLowerCase().includes('partner'));

              return (
                <div key={field} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  {isImageArray ? (
                    <div>
                      <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                        {label}
                      </label>
                      <div className="space-y-4">
                        {value.map((imageUrl, index) => (
                          <div key={index} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 relative">
                            <button
                              type="button"
                              onClick={() => {
                                const newArray = value.filter((_, i) => i !== index);
                                handleInputChange(sectionKey, field, newArray);
                              }}
                              className="absolute top-2 right-2 z-10 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                              title="Supprimer cette image"
                            >
                              ✕
                            </button>
                            <ImageUpload
                              onUploadSuccess={(url) => {
                                const newArray = [...value];
                                newArray[index] = url;
                                handleInputChange(sectionKey, field, newArray);
                              }}
                              initialImageUrl={imageUrl || ''}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newArray = [...value, ''];
                            handleInputChange(sectionKey, field, newArray);
                          }}
                          className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
                        >
                          + Ajouter une image
                        </button>
                      </div>
                    </div>
                  ) : (
                    renderFormField(sectionKey, field, label, 'text', true)
                  )}
                </div>
              );
            } else if (typeof value === 'object' && value !== null) {
              // Check if it's an array (shouldn't happen here, but just in case)
              if (Array.isArray(value)) {
                return (
                  <div key={field}>
                    {renderFormField(sectionKey, field, label, 'text', true)}
                  </div>
                );
              }

              // Check if object contains nested objects (objects within objects)
              const hasNestedObjects = Object.values(value).some(v =>
                typeof v === 'object' && v !== null && !Array.isArray(v)
              );

              if (hasNestedObjects) {
                // Recursively render nested objects
                return (
                  <div key={field} className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-[#253F60]/20 dark:border-gray-700 shadow-sm">
                    <h4 className="text-md font-medium text-[#253F60] dark:text-[#B99066] mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">{label}</h4>
                    <div className="space-y-3">
                      {Object.keys(value).map((subField) => {
                        const subValue = value[subField];
                        const subLabel = subField.charAt(0).toUpperCase() + subField.slice(1).replace(/([A-Z])/g, ' $1');

                        // Exclure les champs de lien (link, url, ctaLink, etc.) de la détection d'image
                        const isSubLinkField = subField.toLowerCase().includes('link') ||
                          subField.toLowerCase().includes('url') ||
                          subField.toLowerCase() === 'href' ||
                          (subField.toLowerCase() === 'src' && !subField.toLowerCase().includes('image'));

                        // Check if sub field is an image (but exclude fields that are specifically background images and link fields)
                        const isSubImageField = !isSubLinkField && (
                          (subField.toLowerCase().includes('image') && !subField.toLowerCase().includes('background')) ||
                          subField.toLowerCase().includes('photo') ||
                          subField.toLowerCase().includes('picture') ||
                          (subField.toLowerCase().includes('img') && !subField.toLowerCase().includes('background')) ||
                          (typeof subValue === 'string' && (
                            subValue.startsWith('/images/') ||
                            (subValue.startsWith('http') && (subValue.includes('.jpg') || subValue.includes('.png') || subValue.includes('.webp') || subValue.includes('.svg') || subValue.includes('.gif'))) ||
                            subValue.includes('.jpg') ||
                            subValue.includes('.png') ||
                            subValue.includes('.webp') ||
                            subValue.includes('.svg')
                          ))
                        );

                        // Check if sub field is specifically a background image
                        const isSubBackgroundImage = subField.toLowerCase().includes('background');

                        if (Array.isArray(subValue)) {
                          // Check if array contains image URLs
                          const isSubImageArray = subValue.length > 0 && typeof subValue[0] === 'string' &&
                            (subValue[0].startsWith('/images/') || subValue[0].startsWith('http') || subValue[0].includes('.jpg') || subValue[0].includes('.png') || subValue[0].includes('.webp') || subValue[0].includes('.svg'));

                          return (
                            <div key={subField}>
                              {isSubImageArray ? (
                                <div>
                                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                                    {subLabel}
                                  </label>
                                  <div className="space-y-4">
                                    {subValue.map((imageUrl, index) => (
                                      <div key={index} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 relative">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newArray = subValue.filter((_, i) => i !== index);
                                            handleInputChange(sectionKey, `${field}.${subField}`, newArray);
                                          }}
                                          className="absolute top-2 right-2 z-10 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                                          title="Supprimer cette image"
                                        >
                                          ✕
                                        </button>
                                        <ImageUpload
                                          onUploadSuccess={(url) => {
                                            const newArray = [...subValue];
                                            newArray[index] = url;
                                            handleInputChange(sectionKey, `${field}.${subField}`, newArray);
                                          }}
                                          initialImageUrl={imageUrl || ''}
                                        />
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newArray = [...subValue, ''];
                                        handleInputChange(sectionKey, `${field}.${subField}`, newArray);
                                      }}
                                      className="mt-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm font-cairo font-semibold"
                                    >
                                      + Ajouter une image
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                renderFormField(sectionKey, `${field}.${subField}`, subLabel, 'text', true)
                              )}
                            </div>
                          );
                        } else if (isSubImageField) {
                          return (
                            <div key={subField}>
                              {renderFormField(sectionKey, `${field}.${subField}`, subLabel, 'image')}
                            </div>
                          );
                        } else if (typeof subValue === 'object' && subValue !== null) {
                          // Nested object - render recursively
                          return (
                            <div key={subField} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                              <h5 className="text-sm font-semibold text-[#253F60] dark:text-[#B99066] mb-2">{subLabel}</h5>
                              <div className="space-y-2">
                                {Object.keys(subValue).map((nestedField) => {
                                  const nestedValue = subValue[nestedField];
                                  const nestedLabel = nestedField.charAt(0).toUpperCase() + nestedField.slice(1).replace(/([A-Z])/g, ' $1');

                                  if (Array.isArray(nestedValue)) {
                                    return (
                                      <div key={nestedField}>
                                        {renderFormField(sectionKey, `${field}.${subField}.${nestedField}`, nestedLabel, 'text', true)}
                                      </div>
                                    );
                                  }

                                  return (
                                    <div key={nestedField}>
                                      <label className="block text-xs font-cairo font-semibold text-[#253F60] mb-1">
                                        {nestedLabel}
                                      </label>
                                      {typeof nestedValue === 'object' && nestedValue !== null && !Array.isArray(nestedValue) ? (
                                        // Render object fields individually for better UX
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-2 border-[#253F60]/20 dark:border-gray-600 space-y-3">
                                          {Object.keys(nestedValue).map((objKey) => {
                                            const objValue = nestedValue[objKey];
                                            const objLabel = objKey.charAt(0).toUpperCase() + objKey.slice(1).replace(/([A-Z])/g, ' $1');

                                            return (
                                              <div key={objKey}>
                                                <label className="block text-xs font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-1">
                                                  {objLabel}
                                                </label>
                                                {containsHTML(objValue) || objKey.toLowerCase().includes('description') || objKey.toLowerCase().includes('text') ? (
                                                  <TextEditor
                                                    value={typeof objValue === 'string' ? objValue : ''}
                                                    onChange={(newValue) => {
                                                      setFormData(prev => ({
                                                        ...prev,
                                                        [sectionKey]: {
                                                          ...prev[sectionKey],
                                                          [field]: {
                                                            ...prev[sectionKey]?.[field],
                                                            [subField]: {
                                                              ...prev[sectionKey]?.[field]?.[subField],
                                                              [nestedField]: {
                                                                ...prev[sectionKey]?.[field]?.[subField]?.[nestedField],
                                                                [objKey]: newValue
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }));
                                                    }}
                                                    placeholder={`Écrivez ${objLabel.toLowerCase()}...`}
                                                  />
                                                ) : typeof objValue === 'string' && objValue.length > 80 ? (
                                                  <textarea
                                                    value={objValue || ''}
                                                    onChange={(e) => {
                                                      setFormData(prev => ({
                                                        ...prev,
                                                        [sectionKey]: {
                                                          ...prev[sectionKey],
                                                          [field]: {
                                                            ...prev[sectionKey]?.[field],
                                                            [subField]: {
                                                              ...prev[sectionKey]?.[field]?.[subField],
                                                              [nestedField]: {
                                                                ...prev[sectionKey]?.[field]?.[subField]?.[nestedField],
                                                                [objKey]: e.target.value
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }));
                                                    }}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y text-sm transition-all font-inter"
                                                    placeholder={`${objLabel}...`}
                                                  />
                                                ) : (
                                                  <input
                                                    type="text"
                                                    value={safeStringValue(objValue)}
                                                    onChange={(e) => {
                                                      setFormData(prev => ({
                                                        ...prev,
                                                        [sectionKey]: {
                                                          ...prev[sectionKey],
                                                          [field]: {
                                                            ...prev[sectionKey]?.[field],
                                                            [subField]: {
                                                              ...prev[sectionKey]?.[field]?.[subField],
                                                              [nestedField]: {
                                                                ...prev[sectionKey]?.[field]?.[subField]?.[nestedField],
                                                                [objKey]: e.target.value
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }));
                                                    }}
                                                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] text-sm transition-all font-inter"
                                                    placeholder={objLabel}
                                                  />
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : containsHTML(nestedValue) || nestedField.toLowerCase().includes('description') || nestedField.toLowerCase().includes('text') || nestedField.toLowerCase().includes('paragraph') ? (
                                        <TextEditor
                                          value={typeof nestedValue === 'string' ? nestedValue : ''}
                                          onChange={(newValue) => {
                                            setFormData(prev => ({
                                              ...prev,
                                              [sectionKey]: {
                                                ...prev[sectionKey],
                                                [field]: {
                                                  ...prev[sectionKey]?.[field],
                                                  [subField]: {
                                                    ...prev[sectionKey]?.[field]?.[subField],
                                                    [nestedField]: newValue
                                                  }
                                                }
                                              }
                                            }));
                                          }}
                                          placeholder={`Écrivez ${nestedLabel.toLowerCase()}...`}
                                        />
                                      ) : typeof nestedValue === 'string' && nestedValue.length > 100 ? (
                                        <textarea
                                          value={nestedValue || ''}
                                          onChange={(e) => {
                                            setFormData(prev => ({
                                              ...prev,
                                              [sectionKey]: {
                                                ...prev[sectionKey],
                                                [field]: {
                                                  ...prev[sectionKey]?.[field],
                                                  [subField]: {
                                                    ...prev[sectionKey]?.[field]?.[subField],
                                                    [nestedField]: e.target.value
                                                  }
                                                }
                                              }
                                            }));
                                          }}
                                          rows={3}
                                          className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y text-sm transition-all font-inter"
                                          placeholder={`${nestedLabel} (texte simple)...`}
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          value={safeStringValue(nestedValue)}
                                          onChange={(e) => {
                                            setFormData(prev => ({
                                              ...prev,
                                              [sectionKey]: {
                                                ...prev[sectionKey],
                                                [field]: {
                                                  ...prev[sectionKey]?.[field],
                                                  [subField]: {
                                                    ...prev[sectionKey]?.[field]?.[subField],
                                                    [nestedField]: e.target.value
                                                  }
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] text-sm transition-all font-inter"
                                          placeholder={nestedLabel}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // Simple string or number value
                        return (
                          <div key={subField}>
                            <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                              {subLabel}
                            </label>
                            {typeof subValue === 'string' && subValue.length > 100 ? (
                              <textarea
                                value={containsHTML(subValue) ? stripHTML(subValue) : (subValue || '')}
                                onChange={(e) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    [sectionKey]: {
                                      ...prev[sectionKey],
                                      [field]: {
                                        ...prev[sectionKey]?.[field],
                                        [subField]: e.target.value
                                      }
                                    }
                                  }));
                                }}
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y transition-all font-inter"
                                placeholder={`${subLabel} (texte simple)...`}
                              />
                            ) : typeof subValue === 'object' && subValue !== null && !Array.isArray(subValue) ? (
                              // Render object as JSON editor
                              <textarea
                                value={JSON.stringify(subValue, null, 2)}
                                onChange={(e) => {
                                  try {
                                    const parsed = JSON.parse(e.target.value);
                                    setFormData(prev => ({
                                      ...prev,
                                      [sectionKey]: {
                                        ...prev[sectionKey],
                                        [field]: {
                                          ...prev[sectionKey]?.[field],
                                          [subField]: parsed
                                        }
                                      }
                                    }));
                                  } catch (err) {
                                    // Invalid JSON, don't update
                                  }
                                }}
                                rows={6}
                                className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y transition-all font-inter font-mono text-sm"
                                placeholder={`${subLabel} (JSON)...`}
                              />
                            ) : (
                              <input
                                type="text"
                                value={safeStringValue(subValue)}
                                onChange={(e) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    [sectionKey]: {
                                      ...prev[sectionKey],
                                      [field]: {
                                        ...prev[sectionKey]?.[field],
                                        [subField]: e.target.value
                                      }
                                    }
                                  }));
                                }}
                                className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                                placeholder={subLabel}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Simple object with only string/number values
              return (
                <div key={field} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-md font-medium text-[#253F60] dark:text-[#B99066] mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">{label}</h4>
                  <div className="space-y-3">
                    {Object.keys(value).map((subField) => {
                      const subValue = value[subField];
                      const subLabel = subField.charAt(0).toUpperCase() + subField.slice(1).replace(/([A-Z])/g, ' $1');

                      if (Array.isArray(subValue)) {
                        return (
                          <div key={subField}>
                            {renderFormField(sectionKey, `${field}.${subField}`, subLabel, 'text', true)}
                          </div>
                        );
                      }

                      return (
                        <div key={subField}>
                          <label className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                            {subLabel}
                          </label>
                          {typeof subValue === 'object' && subValue !== null && !Array.isArray(subValue) ? (
                            // Render object as JSON editor
                            <textarea
                              value={JSON.stringify(subValue, null, 2)}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setFormData(prev => ({
                                    ...prev,
                                    [sectionKey]: {
                                      ...prev[sectionKey],
                                      [field]: {
                                        ...prev[sectionKey]?.[field],
                                        [subField]: parsed
                                      }
                                    }
                                  }));
                                } catch (err) {
                                  // Invalid JSON, don't update
                                }
                              }}
                              rows={6}
                              className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y transition-all font-inter font-mono text-sm"
                              placeholder={`${subLabel} (JSON)...`}
                            />
                          ) : containsHTML(subValue) || subField.toLowerCase().includes('description') || subField.toLowerCase().includes('text') || subField.toLowerCase().includes('paragraph') ? (
                            <TextEditor
                              value={typeof subValue === 'string' ? subValue : ''}
                              onChange={(newValue) => {
                                setFormData(prev => ({
                                  ...prev,
                                  [sectionKey]: {
                                    ...prev[sectionKey],
                                    [field]: {
                                      ...prev[sectionKey]?.[field],
                                      [subField]: newValue
                                    }
                                  }
                                }));
                              }}
                              placeholder={`Écrivez ${subLabel.toLowerCase()}...`}
                            />
                          ) : typeof subValue === 'string' && subValue.length > 100 ? (
                            <textarea
                              value={subValue || ''}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  [sectionKey]: {
                                    ...prev[sectionKey],
                                    [field]: {
                                      ...prev[sectionKey]?.[field],
                                      [subField]: e.target.value
                                    }
                                  }
                                }));
                              }}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y transition-all font-inter"
                              placeholder={`${subLabel} (texte simple)...`}
                            />
                          ) : typeof subValue === 'object' && subValue !== null && !Array.isArray(subValue) ? (
                            // Render object as JSON editor
                            <textarea
                              value={JSON.stringify(subValue, null, 2)}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setFormData(prev => ({
                                    ...prev,
                                    [sectionKey]: {
                                      ...prev[sectionKey],
                                      [field]: {
                                        ...prev[sectionKey]?.[field],
                                        [subField]: parsed
                                      }
                                    }
                                  }));
                                } catch (err) {
                                  // Invalid JSON, don't update
                                }
                              }}
                              rows={6}
                              className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] resize-y transition-all font-inter font-mono text-sm"
                              placeholder={`${subLabel} (JSON)...`}
                            />
                          ) : (
                            <input
                              type="text"
                              value={safeStringValue(subValue)}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  [sectionKey]: {
                                    ...prev[sectionKey],
                                    [field]: {
                                      ...prev[sectionKey]?.[field],
                                      [subField]: e.target.value
                                    }
                                  }
                                }));
                              }}
                              className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                              placeholder={subLabel}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              const isLongText = typeof value === 'string' && value.length > 100;

              // Exclure les champs de lien (link, url, ctaLink, etc.) de la détection d'image
              const isLinkField = field.toLowerCase().includes('link') ||
                field.toLowerCase().includes('url') ||
                field.toLowerCase() === 'href' ||
                field.toLowerCase() === 'src' && !field.toLowerCase().includes('image');

              // Détecter les champs d'image uniquement si ce n'est PAS un champ de lien
              const isImageField = !isLinkField && (
                field.toLowerCase().includes('image') ||
                field.toLowerCase().includes('background') ||
                field.toLowerCase().includes('photo') ||
                field.toLowerCase().includes('picture') ||
                field.toLowerCase().includes('img') ||
                (typeof value === 'string' && (
                  value.startsWith('/images/') ||
                  (value.startsWith('http') && (value.includes('.jpg') || value.includes('.png') || value.includes('.webp') || value.includes('.svg') || value.includes('.gif'))) ||
                  value.includes('.jpg') ||
                  value.includes('.png') ||
                  value.includes('.webp') ||
                  value.includes('.svg')
                ))
              );

              return (
                <div key={field} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  {renderFormField(sectionKey, field, label, isImageField ? 'image' : (isLongText ? 'textarea' : 'text'))}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#B99066] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Ultra-professional animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple gradient orbs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#B99066]/30 rounded-full blur-3xl animate-orb-float-1"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#253F60]/30 rounded-full blur-3xl animate-orb-float-2"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#A67C52]/20 rounded-full blur-3xl animate-orb-float-3"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#1a2d47]/25 rounded-full blur-3xl animate-orb-float-4"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B99066]/15 rounded-full blur-3xl animate-orb-pulse"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              animation: 'grid-move 25s linear infinite'
            }}></div>
          </div>

          {/* Particle effect */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Ultra-professional logo animation */}
          <div className="mb-12 relative">
            {/* Multiple glow rings */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B99066] via-[#A67C52] to-[#B99066] opacity-25 blur-3xl animate-glow-pulse scale-130"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#253F60] via-[#1a2d47] to-[#253F60] opacity-20 blur-2xl animate-glow-pulse-2 scale-120"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B99066] to-[#253F60] opacity-15 blur-xl animate-glow-pulse-3 scale-115"></div>

            {/* Animated rotating gradient border */}
            <div className="absolute inset-0 rounded-3xl animate-border-rotate" style={{
              background: 'conic-gradient(from 0deg, #B99066, #253F60, #A67C52, #1a2d47, #B99066)',
              padding: '4px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}>
              <div className="w-full h-full rounded-3xl bg-transparent"></div>
            </div>

            {/* Inner shadow ring */}
            <div className="absolute inset-2 rounded-3xl border-2 border-white/10 animate-inner-glow"></div>

            {/* Logo container */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-40 h-40 flex items-center justify-center transform animate-logo-premium">
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#B99066]/10 to-transparent"></div>

              <img
                src={getImagePath("/images/azalee-patrimoine3.webp")}
                alt="Azalée Patrimoine Logo"
                className="max-w-full max-h-full object-contain relative z-10 animate-logo-refined drop-shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex flex-col items-center justify-center text-white font-cairo font-bold shadow-inner relative z-10 animate-logo-refined hidden">
                <span className="text-6xl leading-none mb-2 drop-shadow-lg">A</span>
                <span className="text-sm leading-tight tracking-wider drop-shadow">AZALÉE</span>
              </div>
            </div>
          </div>

          {/* Ultra-professional loading text */}
          <div className="text-center animate-text-premium-fade">
            <h2 className="text-4xl font-cairo font-bold text-white mb-4 relative inline-block">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-[#B99066] via-white to-[#B99066] blur-xl opacity-50 animate-text-glow"></span>
                <span className="relative bg-gradient-to-r from-white via-[#B99066] to-white bg-clip-text text-transparent animate-text-gradient-premium" style={{
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Chargement du CMS
                </span>
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B99066] to-transparent animate-underline-premium"></span>
            </h2>
            <p className="text-gray-200 font-inter text-lg font-light tracking-wider animate-text-slide-premium mt-2">
              <span className="inline-block animate-dot-1">.</span>
              <span className="inline-block animate-dot-2">.</span>
              <span className="inline-block animate-dot-3">.</span>
              <span className="ml-2">Préparation de votre espace</span>
            </p>
          </div>

          {/* Ultra-professional spinner */}
          <div className="mt-12 relative">
            <div className="w-24 h-24 border-4 border-white/20 rounded-full relative">
              <div className="absolute inset-0 border-4 border-transparent border-t-[#B99066] rounded-full animate-spin-premium"></div>
              <div className="absolute inset-2 border-4 border-transparent border-r-[#A67C52] rounded-full animate-spin-premium-reverse"></div>
              <div className="absolute inset-4 border-4 border-transparent border-b-[#253F60] rounded-full animate-spin-premium"></div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 bg-[#B99066]/40 rounded-full blur-2xl animate-glow-premium"></div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes logo-premium {
            0%, 100% {
              transform: translateY(0px) scale(1) rotate(0deg);
              box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(185, 144, 102, 0.2);
            }
            25% {
              transform: translateY(-10px) scale(1.03) rotate(0.5deg);
              box-shadow: 0 25px 70px rgba(0,0,0,0.35), 0 0 50px rgba(185, 144, 102, 0.3);
            }
            50% {
              transform: translateY(-15px) scale(1.06) rotate(0deg);
              box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(185, 144, 102, 0.4);
            }
            75% {
              transform: translateY(-10px) scale(1.03) rotate(-0.5deg);
              box-shadow: 0 25px 70px rgba(0,0,0,0.35), 0 0 50px rgba(185, 144, 102, 0.3);
            }
          }
          
          @keyframes logo-refined {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              opacity: 0.98;
              transform: scale(1.02);
              filter: brightness(1.05);
            }
          }
          
          @keyframes orb-float-1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            33% {
              transform: translate(40px, -40px) scale(1.15);
              opacity: 0.4;
            }
            66% {
              transform: translate(-30px, 30px) scale(0.95);
              opacity: 0.25;
            }
          }
          
          @keyframes orb-float-2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            33% {
              transform: translate(-40px, 40px) scale(0.9);
              opacity: 0.25;
            }
            66% {
              transform: translate(30px, -30px) scale(1.15);
              opacity: 0.4;
            }
          }
          
          @keyframes orb-float-3 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
            50% {
              transform: translate(30px, 30px) scale(1.1);
              opacity: 0.3;
            }
          }
          
          @keyframes orb-float-4 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.25;
            }
            50% {
              transform: translate(-30px, -30px) scale(0.95);
              opacity: 0.35;
            }
          }
          
          @keyframes orb-pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.15;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.25);
              opacity: 0.3;
            }
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.25;
              transform: scale(1.3);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.35);
            }
          }
          
          @keyframes glow-pulse-2 {
            0%, 100% {
              opacity: 0.2;
              transform: scale(1.2);
            }
            50% {
              opacity: 0.3;
              transform: scale(1.25);
            }
          }
          
          @keyframes glow-pulse-3 {
            0%, 100% {
              opacity: 0.15;
              transform: scale(1.15);
            }
            50% {
              opacity: 0.25;
              transform: scale(1.2);
            }
          }
          
          @keyframes border-rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes inner-glow {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.2;
            }
          }
          
          @keyframes text-premium-fade {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes text-gradient-premium {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 300% center;
            }
          }
          
          @keyframes text-glow {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.05);
            }
          }
          
          @keyframes underline-premium {
            0% {
              width: 0%;
              opacity: 0;
              transform: scaleX(0);
            }
            50% {
              width: 100%;
              opacity: 1;
              transform: scaleX(1);
            }
            100% {
              width: 100%;
              opacity: 0.9;
              transform: scaleX(1);
            }
          }
          
          @keyframes text-slide-premium {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes dot-1 {
            0%, 20% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes dot-2 {
            0%, 40% {
              opacity: 0;
            }
            60% {
              opacity: 1;
            }
          }
          
          @keyframes dot-3 {
            0%, 60% {
              opacity: 0;
            }
            80% {
              opacity: 1;
            }
          }
          
          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }
          
          @keyframes particle {
            0%, 100% {
              opacity: 0;
              transform: translateY(0) translateX(0);
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-100vh) translateX(20px);
            }
          }
          
          @keyframes spin-premium {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes spin-premium-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
          
          @keyframes glow-premium {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
          
          .animate-logo-premium {
            animation: logo-premium 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          
          .animate-logo-refined {
            animation: logo-refined 4s ease-in-out infinite;
          }
          
          .animate-orb-float-1 {
            animation: orb-float-1 10s ease-in-out infinite;
          }
          
          .animate-orb-float-2 {
            animation: orb-float-2 12s ease-in-out infinite;
          }
          
          .animate-orb-float-3 {
            animation: orb-float-3 8s ease-in-out infinite;
          }
          
          .animate-orb-float-4 {
            animation: orb-float-4 9s ease-in-out infinite;
          }
          
          .animate-orb-pulse {
            animation: orb-pulse 7s ease-in-out infinite;
          }
          
          .animate-glow-pulse {
            animation: glow-pulse 4s ease-in-out infinite;
          }
          
          .animate-glow-pulse-2 {
            animation: glow-pulse-2 5s ease-in-out infinite;
          }
          
          .animate-glow-pulse-3 {
            animation: glow-pulse-3 6s ease-in-out infinite;
          }
          
          .animate-border-rotate {
            animation: border-rotate 10s linear infinite;
          }
          
          .animate-inner-glow {
            animation: inner-glow 3s ease-in-out infinite;
          }
          
          .animate-text-premium-fade {
            animation: text-premium-fade 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .animate-text-gradient-premium {
            animation: text-gradient-premium 4s linear infinite;
          }
          
          .animate-text-glow {
            animation: text-glow 3s ease-in-out infinite;
          }
          
          .animate-underline-premium {
            animation: underline-premium 2.5s ease-in-out infinite;
          }
          
          .animate-text-slide-premium {
            animation: text-slide-premium 1s ease-out 0.5s both;
          }
          
          .animate-dot-1 {
            animation: dot-1 1.5s ease-in-out infinite;
          }
          
          .animate-dot-2 {
            animation: dot-2 1.5s ease-in-out infinite 0.2s;
          }
          
          .animate-dot-3 {
            animation: dot-3 1.5s ease-in-out infinite 0.4s;
          }
          
          .animate-spin-premium {
            animation: spin-premium 1s linear infinite;
          }
          
          .animate-spin-premium-reverse {
            animation: spin-premium-reverse 1.5s linear infinite;
          }
          
          .animate-glow-premium {
            animation: glow-premium 2.5s ease-in-out infinite;
          }
          
          .animate-particle {
            animation: particle linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Notification
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, isOpen: false })}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 text-white dark:text-gray-100">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Content Management System</span>
                <span className="sm:hidden">CMS</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-300 hidden sm:block">Gérez tout le contenu de vos pages visuellement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {/* Pages List */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-t-xl">
                  <h2 className="text-base sm:text-lg font-cairo font-bold text-white flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pages ({
                      Object.values(categorizePages(pages)).reduce((sum, category) => sum + category.pages.length, 0)
                    })
                  </h2>

                  {/* Barre de recherche */}
                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Rechercher une page..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 pl-10 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B99066]"
                      />
                      <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Tri */}
                  <div className="mb-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B99066]"
                    >
                      <option value="path">Trier par chemin</option>
                      <option value="title">Trier par titre</option>
                      <option value="date">Trier par date</option>
                    </select>
                  </div>
                </div>
                <div className="max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                  {pages.length === 0 ? (
                    <div className="p-8 text-center">
                      <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 font-inter">Aucune page trouvée. Créez-en une pour commencer.</p>
                    </div>
                  ) : searchQuery ? (
                    // Mode recherche : afficher toutes les pages filtrées
                    getFilteredAndSortedPages(pages).map((page) => (
                      <div
                        key={page._id}
                        className={`p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200 ${selectedPage?.path === page.path
                          ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 dark:from-[#253F60]/20 dark:to-[#B99066]/20 border-l-4 border-[#B99066]'
                          : 'hover:bg-gradient-to-r hover:from-[#253F60]/5 hover:to-transparent dark:hover:from-gray-700 dark:hover:to-transparent'
                          }`}
                        onClick={() => fetchPageContent(page.path)}
                      >
                        <div className="flex items-start sm:items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-cairo font-semibold text-sm sm:text-base text-[#253F60] dark:text-[#B99066] truncate">{page.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-inter truncate">{page.path}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span
                                className={`text-xs px-2 py-1 rounded font-inter ${page.published
                                  ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200'
                                  : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200'
                                  }`}
                              >
                                {page.published ? 'Publié' : 'Brouillon'}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500 font-inter">
                                {new Date(page.lastModified).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(page.path);
                            }}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                            title="Supprimer"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Mode catégories : afficher par catégories
                    Object.entries(categorizePages(pages)).map(([categoryName, category]) => {
                      if (category.pages.length === 0) return null;

                      const isExpanded = expandedCategories[categoryName];
                      const sortedPages = getFilteredAndSortedPages(category.pages);

                      return (
                        <div key={categoryName} className="border-b border-gray-200 dark:border-gray-700">
                          {/* En-tête de catégorie */}
                          <button
                            onClick={() => toggleCategory(categoryName)}
                            className="w-full p-3 sm:p-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-lg sm:text-xl">{category.icon}</span>
                              <div className="text-left">
                                <h3 className="font-cairo font-bold text-sm sm:text-base text-[#253F60] dark:text-white">
                                  {categoryName}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                                  {category.pages.length} page{category.pages.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Pages de la catégorie */}
                          {isExpanded && (
                            <div className="bg-white dark:bg-gray-800">
                              {sortedPages.map((page) => {
                                const isSubPage = page.path.includes('/');
                                return (
                                  <div
                                    key={page._id}
                                    className={`p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200 ${isSubPage ? 'pl-6 sm:pl-8 bg-gray-50 dark:bg-gray-900/50' : ''
                                      } ${selectedPage?.path === page.path
                                        ? 'bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 dark:from-[#253F60]/20 dark:to-[#B99066]/20 border-l-4 border-[#B99066]'
                                        : 'hover:bg-gradient-to-r hover:from-[#253F60]/5 hover:to-transparent dark:hover:from-gray-700 dark:hover:to-transparent'
                                      }`}
                                    onClick={() => fetchPageContent(page.path)}
                                  >
                                    <div className="flex items-start sm:items-center justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          {isSubPage && (
                                            <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                          )}
                                          <h3 className="font-cairo font-semibold text-sm sm:text-base text-[#253F60] dark:text-[#B99066] truncate">
                                            {page.title}
                                          </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-inter truncate">
                                          {page.path}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                                          <span
                                            className={`text-xs px-2 py-1 rounded font-inter ${page.published
                                              ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200'
                                              : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200'
                                              }`}
                                          >
                                            {page.published ? 'Publié' : 'Brouillon'}
                                          </span>
                                          <span className="text-xs text-gray-400 dark:text-gray-500 font-inter">
                                            {new Date(page.lastModified).toLocaleDateString('fr-FR')}
                                          </span>
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDelete(page.path);
                                        }}
                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                                        title="Supprimer"
                                      >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Visual Editor */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {selectedPage ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-t-xl sticky top-0 z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-cairo font-bold text-white flex items-center gap-2">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#B99066] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          <span className="truncate">{selectedPage.title}</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-200 mt-1 font-inter truncate">{selectedPage.path}</p>
                      </div>
                      <button
                        onClick={handleSave}
                        className="w-full sm:w-auto bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:from-[#A67C52] hover:to-[#B99066] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-cairo font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                        </svg>
                        <span className="hidden sm:inline">Enregistrer les modifications</span>
                        <span className="sm:hidden">Enregistrer</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto">
                    {formData && Object.keys(formData).length > 0 ? (
                      Object.keys(formData)
                        .filter((sectionKey) => sectionKey.toLowerCase() !== 'menuitems' && sectionKey.toLowerCase() !== 'menu items')
                        .map((sectionKey) => {
                          const section = formData[sectionKey];
                          const sectionTitle = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1).replace(/([A-Z])/g, ' $1');
                          return (
                            <div key={sectionKey}>
                              {renderNestedSection(sectionKey, section, sectionTitle)}
                            </div>
                          );
                        })
                    ) : (
                      <div className="text-center py-12">
                        <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 dark:from-[#253F60]/20 dark:to-[#B99066]/20 rounded-xl p-8 border-2 border-[#253F60]/20 dark:border-gray-700">
                          <svg className="w-16 h-16 text-[#253F60] dark:text-[#B99066] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-lg font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-2">Aucune section de contenu trouvée</h3>
                          <p className="text-gray-600 dark:text-gray-300 font-inter">Commencez l'édition pour ajouter du contenu</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700 p-12 text-center">
                  <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] dark:from-gray-700 dark:to-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-2">Sélectionnez une page à modifier</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-inter">Choisissez une page dans la liste à gauche pour commencer l'édition</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 max-w-md w-full border-2 border-[#253F60]/20 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 -m-4 sm:-m-6 mb-4 sm:mb-6 p-3 sm:p-4 rounded-t-xl">
                <h2 className="text-lg sm:text-xl font-cairo font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Créer une nouvelle page</span>
                  <span className="sm:hidden">Nouvelle page</span>
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">Chemin</label>
                  <input
                    type="text"
                    value={newPage.path}
                    onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="ex: placements/assurance-vie"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">Titre</label>
                  <input
                    type="text"
                    value={newPage.title}
                    onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Titre de la page"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-cairo font-semibold text-[#253F60] dark:text-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-cairo font-semibold"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

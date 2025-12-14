'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../../../components/admin/Notification';

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [notes, setNotes] = useState('');
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'success' });
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }
    
    // Check for filter in URL params on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter && ['all', 'new', 'read', 'contacted', 'archived'].includes(urlFilter)) {
      setFilter(urlFilter);
    }
    
    // Fetch contacts on initial load
    fetchContacts(true);
    setIsInitialLoad(false);
  }, [router]);

  // Fetch contacts when filter changes (but not on initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      fetchContacts(false);
    }
  }, [filter]);

  const fetchContacts = async (showLoading = true) => {
    try {
      // Only show loading spinner on initial load, not when filtering
      if (showLoading) {
        setLoading(true);
      }
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/dashboard/login');
        return;
      }
      
      const status = filter === 'all' ? '' : filter;
      const url = `/api/contact/list${status ? `?status=${status}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/dashboard/login');
          return;
        }
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.data || []);
      } else {
        if (data.message === 'Unauthorized' || data.message === 'Invalid token') {
          router.push('/dashboard/login');
        } else {
          showNotification('Erreur lors du chargement des contacts', 'error');
        }
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showNotification('Erreur lors du chargement des contacts', 'error');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const updateContactStatus = async (id, newStatus) => {
    // Optimistic update - update UI immediately without flash
    const previousContacts = [...contacts];
    const previousSelectedContact = selectedContact;
    
    // Update contacts list immediately
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact._id === id
          ? { ...contact, status: newStatus }
          : contact
      )
    );
    
    // Update selected contact if it's the one being updated
    if (selectedContact && selectedContact._id === id) {
      setSelectedContact({ ...selectedContact, status: newStatus });
    }
    
    setUpdatingStatus(prev => ({ ...prev, [id]: true }));

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/contact/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();
      if (!data.success) {
        // Revert on error
        setContacts(previousContacts);
        if (previousSelectedContact && previousSelectedContact._id === id) {
          setSelectedContact(previousSelectedContact);
        }
        showNotification('Erreur lors de la mise à jour', 'error');
      } else {
        // If filter is active and contact no longer matches, remove it from list smoothly
        if (filter !== 'all' && newStatus !== filter) {
          // Remove contact from list after a short delay for smooth transition
          setTimeout(() => {
            setContacts(prevContacts => prevContacts.filter(c => c._id !== id));
            if (selectedContact && selectedContact._id === id) {
              setSelectedContact(null);
            }
          }, 300);
        }
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      // Revert on error
      setContacts(previousContacts);
      if (previousSelectedContact && previousSelectedContact._id === id) {
        setSelectedContact(previousSelectedContact);
      }
      showNotification('Erreur lors de la mise à jour', 'error');
    } finally {
      setUpdatingStatus(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const updateContactNotes = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/contact/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, notes })
      });

      const data = await response.json();
      if (data.success) {
        showNotification('Notes sauvegardées avec succès', 'success');
        // Refresh contacts list without showing loading
        fetchContacts(false);
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, notes });
        }
        setNotes('');
      } else {
        showNotification('Erreur lors de la sauvegarde', 'error');
      }
    } catch (error) {
      console.error('Error updating notes:', error);
      showNotification('Erreur lors de la sauvegarde', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ isOpen: true, message, type });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      read: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      contacted: 'bg-green-100 text-green-800 border-green-200',
      archived: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return badges[status] || badges.new;
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Nouveau',
      read: 'Lu',
      contacted: 'Contacté',
      archived: 'Archivé'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#253F60] to-[#1a2d47]">
        <div className="text-lg text-white font-cairo">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <Notification
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 mb-6 text-white dark:text-gray-100">
            <h1 className="text-3xl font-cairo font-bold mb-2 flex items-center gap-3">
              <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Demandes de contact ({contacts.length})
            </h1>
            <p className="text-gray-200 dark:text-gray-300">Gérez toutes les demandes de contact reçues</p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border-2 border-[#253F60]/20 dark:border-gray-700">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setFilter('all');
                  // Update URL without page reload
                  const url = new URL(window.location);
                  url.searchParams.set('filter', 'all');
                  window.history.pushState({}, '', url);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => {
                  setFilter('new');
                  const url = new URL(window.location);
                  url.searchParams.set('filter', 'new');
                  window.history.pushState({}, '', url);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'new'
                    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Nouveaux
              </button>
              <button
                onClick={() => {
                  setFilter('read');
                  const url = new URL(window.location);
                  url.searchParams.set('filter', 'read');
                  window.history.pushState({}, '', url);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'read'
                    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Lus
              </button>
              <button
                onClick={() => {
                  setFilter('contacted');
                  const url = new URL(window.location);
                  url.searchParams.set('filter', 'contacted');
                  window.history.pushState({}, '', url);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'contacted'
                    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Contactés
              </button>
              <button
                onClick={() => {
                  setFilter('archived');
                  const url = new URL(window.location);
                  url.searchParams.set('filter', 'archived');
                  window.history.pushState({}, '', url);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'archived'
                    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Archivés
              </button>
            </div>
          </div>

          {/* Contacts List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="lg:col-span-2 space-y-4">
              {contacts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border-2 border-[#253F60]/20 dark:border-gray-700">
                  <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 font-inter">Aucune demande de contact trouvée</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={() => {
                      setSelectedContact(contact);
                      setNotes(contact.notes || '');
                    }}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 cursor-pointer transition-all ${
                      selectedContact?._id === contact._id
                        ? 'border-[#B99066] shadow-xl'
                        : 'border-[#253F60]/20 dark:border-gray-700 hover:border-[#B99066]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-2">
                          {contact.nom}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p>📧 {contact.email}</p>
                          <p>📞 {contact.telephone}</p>
                          <p>📍 {contact.ville}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(contact.status)}`}>
                        {getStatusLabel(contact.status)}
                      </span>
                    </div>
                    {contact.profession && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Profession:</strong> {contact.profession}
                      </p>
                    )}
                    {contact.patrimoine && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Patrimoine:</strong> {contact.patrimoine}
                      </p>
                    )}
                    {contact.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic line-clamp-2">
                        {contact.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Contact Details Sidebar */}
            {selectedContact && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
                <h2 className="text-2xl font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-4">
                  Détails du contact
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                    <p className="text-gray-900 dark:text-gray-100">{selectedContact.nom}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <p className="text-gray-900 dark:text-gray-100">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                    <p className="text-gray-900 dark:text-gray-100">{selectedContact.telephone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Ville</label>
                    <p className="text-gray-900 dark:text-gray-100">{selectedContact.ville}</p>
                  </div>
                  {selectedContact.profession && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Profession</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedContact.profession}</p>
                    </div>
                  )}
                  {selectedContact.patrimoine && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Patrimoine</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedContact.patrimoine}</p>
                    </div>
                  )}
                  {selectedContact.message && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  )}
                </div>

                {/* Status Actions */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Statut
                    {updatingStatus[selectedContact._id] && (
                      <span className="ml-2 text-xs text-gray-500">Mise à jour...</span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateContactStatus(selectedContact._id, 'read')}
                      disabled={updatingStatus[selectedContact._id]}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedContact.status === 'read'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Lu
                    </button>
                    <button
                      onClick={() => updateContactStatus(selectedContact._id, 'contacted')}
                      disabled={updatingStatus[selectedContact._id]}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedContact.status === 'contacted'
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Contacté
                    </button>
                    <button
                      onClick={() => updateContactStatus(selectedContact._id, 'archived')}
                      disabled={updatingStatus[selectedContact._id]}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedContact.status === 'archived'
                          ? 'bg-gray-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Archivé
                    </button>
                    <button
                      onClick={() => updateContactStatus(selectedContact._id, 'new')}
                      disabled={updatingStatus[selectedContact._id]}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedContact.status === 'new'
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Nouveau
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Ajoutez des notes sur ce contact..."
                  />
                  <button
                    onClick={() => updateContactNotes(selectedContact._id)}
                    className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 font-cairo font-semibold"
                  >
                    Sauvegarder les notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


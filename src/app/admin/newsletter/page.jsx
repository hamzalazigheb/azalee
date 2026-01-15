'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsletterAdminPage() {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchSubscribers();
  }, [filter]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const activeParam = filter === 'all' ? '' : `?active=${filter === 'active'}`;
      const response = await fetch(`/api/newsletter${activeParam}`);
      
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
        setError(null);
      } else {
        setError('Erreur lors du chargement des abonnés');
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError('Erreur lors du chargement des abonnés');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Date d\'inscription', 'Source', 'Statut'],
      ...subscribers.map(sub => [
        sub.email,
        formatDate(sub.subscribedAt),
        sub.source || 'homepage',
        sub.active ? 'Actif' : 'Inactif'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Newsletter - Abonnés</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gérez les abonnés à votre newsletter
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/cms')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retour au CMS
              </button>
              {subscribers.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-[#B99066] text-white rounded-lg hover:bg-[#A67A5A] transition-colors"
                >
                  Exporter CSV
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-[#253F60] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tous ({subscribers.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'active'
                ? 'bg-[#253F60] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Actifs ({subscribers.filter(s => s.active).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'inactive'
                ? 'bg-[#253F60] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Inactifs ({subscribers.filter(s => !s.active).length})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B99066] mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des abonnés...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Subscribers List */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {subscribers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Aucun abonné pour le moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(subscriber.subscribedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {subscriber.source || 'homepage'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {subscriber.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && subscribers.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600">Total abonnés</div>
              <div className="text-2xl font-bold text-[#253F60] mt-2">
                {subscribers.length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600">Abonnés actifs</div>
              <div className="text-2xl font-bold text-green-600 mt-2">
                {subscribers.filter(s => s.active).length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600">Dernière inscription</div>
              <div className="text-sm font-medium text-[#253F60] mt-2">
                {subscribers.length > 0 ? formatDate(subscribers[0].subscribedAt) : '-'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message || 'Erreur lors du chargement des utilisateurs');
      }
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Utilisateur créé avec succès !');
        setShowAddModal(false);
        setFormData({ email: '', password: '', name: '', role: 'admin' });
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Erreur lors de la création de l\'utilisateur');
      }
    } catch (err) {
      setError('Erreur lors de la création de l\'utilisateur');
      console.error('Error creating user:', err);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/auth/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Utilisateur modifié avec succès !');
        setShowEditModal(false);
        setSelectedUser(null);
        setFormData({ email: '', password: '', name: '', role: 'admin' });
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Erreur lors de la modification de l\'utilisateur');
      }
    } catch (err) {
      setError('Erreur lors de la modification de l\'utilisateur');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Utilisateur supprimé avec succès !');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (err) {
      setError('Erreur lors de la suppression de l\'utilisateur');
      console.error('Error deleting user:', err);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      name: user.name,
      role: user.role
    });
    setShowEditModal(true);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-[#253F60] text-white';
      case 'editor':
        return 'bg-[#B99066] text-white';
      case 'viewer':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-cairo font-bold mb-2">Gestion des utilisateurs</h1>
                <p className="text-gray-200 font-inter">Gérer les utilisateurs admin et leurs permissions</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFormData({ email: '', password: '', name: '', role: 'admin' });
                setShowAddModal(true);
              }}
              className="bg-[#B99066] hover:bg-[#A67C52] text-white px-6 py-3 rounded-lg font-cairo font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un utilisateur
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-inter">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-inter">{success}</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-[#253F60]/20 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60] mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Chargement des utilisateurs...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-cairo font-bold">Nom</th>
                    <th className="px-6 py-4 text-left font-cairo font-bold">Email</th>
                    <th className="px-6 py-4 text-left font-cairo font-bold">Rôle</th>
                    <th className="px-6 py-4 text-left font-cairo font-bold">Date de création</th>
                    <th className="px-6 py-4 text-right font-cairo font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-inter">{user.name}</td>
                      <td className="px-6 py-4 font-inter text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-inter text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-[#253F60] hover:bg-[#253F60]/10 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">Ajouter un utilisateur</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ email: '', password: '', name: '', role: 'admin' });
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Éditeur</option>
                    <option value="viewer">Visualiseur</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white px-6 py-3 rounded-lg font-cairo font-semibold hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setFormData({ email: '', password: '', name: '', role: 'admin' });
                      setError('');
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-cairo font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">Modifier l'utilisateur</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                    setFormData({ email: '', password: '', name: '', role: 'admin' });
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleEditUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Nouveau mot de passe (laisser vide pour ne pas changer)
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#253F60]/30 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Éditeur</option>
                    <option value="viewer">Visualiseur</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white px-6 py-3 rounded-lg font-cairo font-semibold hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                      setFormData({ email: '', password: '', name: '', role: 'admin' });
                      setError('');
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-cairo font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


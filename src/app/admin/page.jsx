'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ChatbotStatsCard() {
  const [chatbotStats, setChatbotStats] = useState({
    totalSessions: 0,
    leadsQualifies: 0,
    tauxConversion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatbotStats();
  }, []);

  const fetchChatbotStats = async () => {
    try {
      const response = await fetch('/api/chatbot/stats');
      const data = await response.json();
      if (data.success) {
        setChatbotStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching chatbot stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#B99066]/20 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Chatbot SARA</p>
          <p className="text-2xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">
            {loading ? (
              <span className="inline-block w-8 h-8 border-4 border-[#B99066] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {chatbotStats.totalSessions} sessions
                <span className="block text-lg text-gray-500 dark:text-gray-400 mt-1">
                  {chatbotStats.leadsQualifies} leads
                </span>
              </>
            )}
          </p>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPages: 0,
    totalContentItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section with Logo */}
        <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-8 text-white dark:text-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <img 
                  src="/images/azalee-patrimoine3.png" 
                  alt="Azalée Patrimoine Logo" 
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex items-center justify-center text-white font-cairo font-bold text-2xl hidden">
                  A
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-cairo font-bold mb-2 flex items-center gap-3">
                  Tableau de bord Admin
                  <span className="text-sm font-normal text-gray-200 bg-[#B99066]/20 px-3 py-1 rounded-full">
                    Azalée Patrimoine
                  </span>
                </h1>
                <p className="text-gray-200 font-inter">
                  {user ? `Connecté en tant que ${user.name || user.email}` : 'Chargement...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <p className="text-xs text-gray-200 font-inter mb-1">Système</p>
                <p className="text-sm font-cairo font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Opérationnel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Utilisateurs totaux</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">
                  {loading ? (
                    <span className="inline-block w-8 h-8 border-4 border-[#253F60] border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    stats.totalUsers
                  )}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#B99066]/20 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Pages</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">
                  {loading ? (
                    <span className="inline-block w-8 h-8 border-4 border-[#B99066] border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    stats.totalPages
                  )}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-cairo font-semibold text-gray-600 dark:text-gray-300 mb-1">Éléments de contenu</p>
                <p className="text-3xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">
                  {loading ? (
                    <span className="inline-block w-8 h-8 border-4 border-[#253F60] border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    stats.totalContentItems
                  )}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#B99066] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </div>
          </div>

          <ChatbotStatsCard />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-[#253F60]/20 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#B99066]/30 dark:border-gray-700">
            <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-xl font-cairo font-bold text-[#253F60] dark:text-[#B99066]">
              Actions rapides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push('/admin/cms')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gérer le contenu</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Modifier et gérer le contenu des pages</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/cms?path=header')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gérer le Header</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Modifier le menu de navigation et le header</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/cms?path=footer')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gérer le Footer</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Modifier les informations du footer</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/seo')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gérer le SEO</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Modifier les meta descriptions et titres SEO</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/users')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gestion des utilisateurs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Gérer les utilisateurs admin et permissions</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/chatbot')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-lg flex items-center justify-center group-hover:from-[#253F60] group-hover:to-[#1a2d47] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Gérer le Chatbot SARA</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Voir les sessions et leads du chatbot</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/admin/contacts')}
              className="p-6 border-2 border-[#253F60]/20 dark:border-gray-700 rounded-xl hover:border-[#B99066] dark:hover:border-[#B99066] hover:bg-gradient-to-br hover:from-[#253F60]/5 hover:to-[#B99066]/5 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-left group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center group-hover:from-[#B99066] group-hover:to-[#A67C52] transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-[#253F60] dark:text-[#B99066] mb-1 group-hover:text-[#B99066] transition-colors">Demandes de contact</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Voir et gérer les demandes de contact</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



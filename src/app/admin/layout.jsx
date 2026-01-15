'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [newContactsCount, setNewContactsCount] = useState(0);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [newContacts, setNewContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if we're on CMS page
  const isCMSPage = pathname === '/admin/cms';

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('adminDarkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('adminDarkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Handle 401 as expected (no token or invalid token)
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          // Token invalid or expired - redirect to login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
        }
      } catch (error) {
        // Only log non-401 errors (network issues, etc.)
        if (!error.message?.includes('401') && !error.message?.includes('Unauthorized')) {
          console.error('Auth check error:', error);
        }
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Fetch new contacts count
  useEffect(() => {
    if (!isAuthenticated || pathname === '/admin/login') return;

    const fetchNewContactsCount = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const response = await fetch('/api/contact/count', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setNewContactsCount(data.count || 0);
        }
      } catch (error) {
        console.error('Error fetching new contacts count:', error);
      }
    };

    // Fetch immediately
    fetchNewContactsCount();

    // Poll every 30 seconds for new contacts
    const interval = setInterval(fetchNewContactsCount, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, pathname]);

  // Fetch new contacts list when dropdown opens (only on CMS page)
  useEffect(() => {
    if (!isAuthenticated || pathname === '/admin/login' || !isCMSPage) return;
    
    if (showNotificationsDropdown && newContactsCount > 0) {
      fetchNewContacts();
    }
  }, [showNotificationsDropdown, isAuthenticated, pathname, isCMSPage, newContactsCount]);

  const fetchNewContacts = async () => {
    try {
      setLoadingContacts(true);
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch('/api/contact/list?status=new&limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setNewContacts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching new contacts:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleNotificationClick = () => {
    if (isCMSPage) {
      // Toggle dropdown on CMS page
      setShowNotificationsDropdown(!showNotificationsDropdown);
    } else {
      // Redirect to contacts page on other pages
      router.push('/admin/contacts?filter=new');
    }
  };

  const markAsRead = async (contactId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetch('/api/contact/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: contactId, status: 'read' })
      });

      const data = await response.json();
      if (data.success) {
        // Remove from list and update count
        setNewContacts(prev => prev.filter(c => c._id !== contactId));
        setNewContactsCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationsDropdown && !event.target.closest('.notifications-dropdown')) {
        setShowNotificationsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotificationsDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show protected content
  if (isAuthenticated) {
    const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const userName = userData.name || userData.email || 'Administrator';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Admin Header */}
        <nav className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 shadow-xl border-b-2 border-[#B99066]/30 dark:border-gray-700">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="bg-white rounded-xl p-2 shadow-lg">
                  <img 
                    src="/images/azalee-patrimoine3.webp" 
                    alt="Azalée Patrimoine Logo" 
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex items-center justify-center text-white font-cairo font-bold text-lg hidden">
                    A
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-cairo font-bold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-xs text-gray-200 font-inter">
                    Azalée Patrimoine
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Notifications Icon with Dropdown */}
                <div className="relative notifications-dropdown">
                  <button
                    onClick={handleNotificationClick}
                    className="relative flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
                    title="Nouvelles demandes de contact"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {newContactsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {newContactsCount > 9 ? '9+' : newContactsCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Dropdown (only on CMS page) */}
                  {isCMSPage && showNotificationsDropdown && (
                    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-[#253F60]/20 dark:border-gray-700 z-50 max-h-[600px] flex flex-col">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-cairo font-bold text-white">
                            Nouvelles demandes ({newContactsCount})
                          </h3>
                          <button
                            onClick={() => setShowNotificationsDropdown(false)}
                            className="text-white hover:text-gray-300 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="overflow-y-auto flex-1">
                        {loadingContacts ? (
                          <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#253F60] mx-auto mb-4"></div>
                            <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
                          </div>
                        ) : newContacts.length === 0 ? (
                          <div className="p-8 text-center">
                            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 font-inter">Aucune nouvelle demande</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {newContacts.map((contact) => (
                              <div
                                key={contact._id}
                                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-1 truncate">
                                      {contact.nom}
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 truncate">
                                      📧 {contact.email}
                                    </p>
                                    {contact.telephone && (
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        📞 {contact.telephone}
                                      </p>
                                    )}
                                    {contact.message && (
                                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 line-clamp-2">
                                        {contact.message}
                                      </p>
                                    )}
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                      {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => markAsRead(contact._id)}
                                    className="px-3 py-1 bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white text-xs font-semibold rounded-lg hover:from-[#A67C52] hover:to-[#8F6B42] transition-all duration-300 flex-shrink-0"
                                    title="Marquer comme lu"
                                  >
                                    Lu
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Footer */}
                      {newContacts.length > 0 && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
                          <button
                            onClick={() => {
                              setShowNotificationsDropdown(false);
                              router.push('/admin/contacts?filter=new');
                            }}
                            className="w-full px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 font-cairo font-semibold text-sm"
                          >
                            Voir toutes les demandes →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
                  title={darkMode ? "Mode clair" : "Mode sombre"}
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-cairo font-semibold text-white">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-200 font-inter">
                      Administrateur
                    </p>
                  </div>
                </div>
                {/* Settings Button */}
                <button
                  onClick={() => router.push('/admin/settings')}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-white"
                  title="Paramètres"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-cairo font-semibold text-white bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-lg hover:from-[#A67C52] hover:to-[#8F6B42] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    );
  }

  return null;
}



'use client';
import { usePathname } from 'next/navigation';
import SaraChatbot from './SaraChatbot';

export default function ChatbotWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/dashboard');

  // Ne pas afficher le chatbot sur les pages admin
  if (isAdminPage) {
    return null;
  }

  // Afficher le chatbot SARA sur toutes les autres pages
  return <SaraChatbot />;
}

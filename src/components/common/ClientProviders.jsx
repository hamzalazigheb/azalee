'use client';
import ScrollRestoration from './ScrollRestoration';
import ChatbotWrapper from '../chatbot/ChatbotWrapper';

export default function ClientProviders() {
  return (
    <>
      <ScrollRestoration />
      <ChatbotWrapper />
    </>
  );
}



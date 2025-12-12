'use client';
import { Suspense } from 'react';
import ScrollRestoration from './ScrollRestoration';
import ChatbotWrapper from '../chatbot/ChatbotWrapper';

export default function ClientProviders() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollRestoration />
      </Suspense>
      <ChatbotWrapper />
    </>
  );
}



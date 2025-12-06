'use client';
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function ContactFormPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    profession: '',
    patrimoine: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || 'Votre demande a été envoyée avec succès !' });
        // Reset form
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          ville: '',
          profession: '',
          patrimoine: '',
          message: ''
        });
      } else {
        setSubmitMessage({ type: 'error', text: data.message || 'Une erreur est survenue. Veuillez réessayer.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ type: 'error', text: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#F8FAFB] to-[#F1F5F9] min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-cairo font-semibold text-[#112033] mb-6">
              📩 Formulaire de contact
            </h1>
            <p className="text-xl font-inter text-[#4A5568] italic">
              👉 <em>Parlons de votre patrimoine en toute confidentialité</em>
            </p>
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#4EBBBD] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Champs essentiels */}
                <div>
                  <h2 className="text-2xl font-cairo font-semibold text-[#112033] mb-6">
                    Champs essentiels (obligatoires)
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#112033] mb-2">
                        Nom et prénom *
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4EBBBD] focus:border-transparent transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#112033] mb-2">
                        Adresse e-mail professionnelle *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4EBBBD] focus:border-transparent transition-all"
                        placeholder="votre.email@entreprise.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#112033] mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4EBBBD] focus:border-transparent transition-all"
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#112033] mb-2">
                        Ville / Région *
                      </label>
                      <input
                        type="text"
                        name="ville"
                        value={formData.ville}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4EBBBD] focus:border-transparent transition-all"
                        placeholder="Paris, Lyon, Marseille..."
                      />
                    </div>
                  </div>
                </div>

                {/* Qualification */}
                <div>
                  <h2 className="text-2xl font-cairo font-semibold text-[#112033] mb-6">
                    Qualification
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#112033] mb-3">Vous êtes :</h3>
                      <div className="space-y-2">
                        {['Dirigeant d\'entreprise', 'Profession libérale', 'Cadre supérieur / Top manager', 'Héritier ou membre d\'une famille fortunée', 'Autre (précisez)'].map((option) => (
                          <label key={option} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="profession"
                              value={option}
                              checked={formData.profession === option}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-[#4EBBBD] focus:ring-[#4EBBBD]"
                            />
                            <span className="text-[#4A5568]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-[#112033] mb-3">Votre patrimoine estimé :</h3>
                      <div className="space-y-2">
                        {['moins de 500K€', '500 k€ – 1 M€', '1 M€ – 5 M€', 'plus de 5 M€'].map((option) => (
                          <label key={option} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="patrimoine"
                              value={option}
                              checked={formData.patrimoine === option}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-[#4EBBBD] focus:ring-[#4EBBBD]"
                            />
                            <span className="text-[#4A5568]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h2 className="text-2xl font-cairo font-semibold text-[#112033] mb-6">
                    <em>Parlez-nous de vos projets ou de vos questions patrimoniales</em>
                  </h2>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4EBBBD] focus:border-transparent transition-all resize-none"
                    placeholder="Décrivez vos objectifs patrimoniaux, vos questions fiscales, vos projets d'investissement..."
                  />
                </div>

                {/* CTA */}
                <div className="text-center">
                  {submitMessage.text && (
                    <div className={`mb-4 p-4 rounded-lg ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white px-12 py-4 rounded-lg font-inter font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                  
                  <p className="text-sm text-[#4A5568] mt-4 italic">
                    ⚖️ <em>Vos informations resteront strictement confidentielles. Azalée Patrimoine ne les partage jamais avec des tiers.</em>
                  </p>
                </div>
              </form>
            </div>

            {/* QR Code et informations */}
            <div className="space-y-8">
              {/* QR Code Calendly */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
                <h3 className="text-xl font-cairo font-semibold text-[#112033] mb-4">
                  📅 Prise de rendez-vous immédiate
                </h3>
                <p className="text-[#4A5568] mb-6">
                  Scannez le QR code pour accéder directement à notre calendrier de rendez-vous
                </p>
                
                {/* QR Code Calendly */}
                <div className="mb-4 mx-auto w-48 h-48 flex items-center justify-center">
                  <img 
                    src="/images/qr.jpg" 
                    alt="QR Code Calendly" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                
                <button
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A67C52] transition-colors duration-200"
                >
                  Ouvrir Calendly
                </button>
              </div>

              {/* Informations de contact */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#112033] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-cairo font-semibold mb-6">
                  📞 Contactez-nous directement
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[#4EBBBD] text-xl">📞</span>
                    <span>01 53 45 85 00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#4EBBBD] text-xl">📧</span>
                    <span>contact@azalee-patrimoine.fr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#4EBBBD] text-xl">🕒</span>
                    <span>Lun-Ven 9h-18h</span>
                  </div>
                </div>
              </div>

              {/* Retour */}
              <div className="text-center">
                <button
                  onClick={() => window.location.href = 'http://localhost:4028'}
                  className="bg-transparent border-2 border-[#B99066] text-[#B99066] px-8 py-3 rounded-lg font-semibold hover:bg-[#B99066] hover:text-white transition-all duration-200"
                >
                  ← Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

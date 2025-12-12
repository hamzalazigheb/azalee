"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";

export default function DonationGratuitePage() {
  const chartData = [
    { label: "Abattement par enfant", value: "€100,000" },
    { label: "Don Sarkozy supplémentaire", value: "€31,865" },
    { label: "Taux fiscal après abattement", value: "5-45%" },
    { label: "Renouvelable tous les", value: "15 ans" },
    { label: "Nue-propriété à 70 ans", value: "60%" }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
                Donation à titre gratuit
              </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Une <strong>donation à titre gratuit</strong> est un transfert de patrimoine effectué <strong>sans contrepartie</strong>.
              </p>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Elle permet de <strong>transmettre de son vivant</strong>, d'anticiper sa succession et de réduire la facture fiscale grâce aux <strong>abattements renouvelables tous les 15 ans</strong>.
              </p>
              <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  Anticiper, c'est transmettre plus et payer moins.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67C52] transition-colors duration-200"
                >
                  Simuler ma donation
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
                >
                  Consulter un notaire
                </button>
              </div>
            </div>
            
            {/* Right: Key Benefits Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67C52] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-2xl font-bold relative z-10">1</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Abattement</h3>
                  <p className="text-[#686868] text-sm mb-2">Par enfant</p>
                  <p className="text-[#B99066] text-xl font-bold">€100,000</p>
                  <p className="text-[#686868] text-xs">Tous les 15 ans</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#1A2F4A] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-2xl font-bold relative z-10">2</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Don Sarkozy</h3>
                  <p className="text-[#686868] text-sm mb-2">Abattement supplémentaire</p>
                  <p className="text-[#B99066] text-xl font-bold">€31,865</p>
                  <p className="text-[#686868] text-xs">En numéraire</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67C52] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-2xl font-bold relative z-10">3</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Renouvelable</h3>
                  <p className="text-[#686868] text-sm mb-2">Tous les</p>
                  <p className="text-[#B99066] text-xl font-bold">15 ans</p>
                  <p className="text-[#686868] text-xs">Anticipation fiscale</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#1A2F4A] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-2xl font-bold relative z-10">4</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Taux fiscal</h3>
                  <p className="text-[#686868] text-sm mb-2">Après abattement</p>
                  <p className="text-[#B99066] text-xl font-bold">5-45%</p>
                  <p className="text-[#686868] text-xs">Barème progressif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Caractéristiques des donations à titre gratuit"
            subtitle="Visualisez les paramètres clés des donations à titre gratuit"
          />
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
            <PlacementChart 
              title="Caractéristiques des donations à titre gratuit"
              data={chartData}
              chartImage="/images/donation.png"
            />
          </div>
        </div>
      </section>

      {/* Les différentes formes de donation Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les différentes formes de donation à titre gratuit"
            subtitle="Découvrez les 4 principales formes de donations à titre gratuit"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Don manuel */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#253F60] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">Le don manuel</h3>
                  <p className="text-[#B99066] font-bold">Transmission directe</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Transmission directe d'une somme d'argent, de bijoux, de titres financiers ou d'objets de valeur.
                </p>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Déclaration obligatoire au fisc via le formulaire n°2735.
                </p>
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 p-3 rounded-lg border-l-2 border-[#253F60]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    Fiscalité : application des abattements (100 000 € par enfant, tous les 15 ans).
                  </p>
                </div>
              </div>
            </div>

            {/* Don familial d'argent */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#B99066] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">Le don familial d'argent</h3>
                  <p className="text-[#B99066] font-bold">"Don Sarkozy"</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Spécifique aux dons en numéraire (argent).
                </p>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Conditions : donateur &lt; 80 ans, donataire majeur.
                </p>
                <div className="bg-gradient-to-br from-[#B99066]/10 to-[#253F60]/10 p-3 rounded-lg border-l-2 border-[#B99066]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    Abattement supplémentaire de <strong>31 865 €</strong>, en plus des abattements classiques.
                  </p>
                </div>
              </div>
            </div>

            {/* Présents d'usage */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#253F60] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">Les présents d'usage</h3>
                  <p className="text-[#B99066] font-bold">Cadeaux d'occasion</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Cadeaux offerts à l'occasion d'événements particuliers (mariage, anniversaire, Noël…).
                </p>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Ils ne sont pas taxés <strong>s'ils restent proportionnés</strong> au patrimoine et aux revenus du donateur.
                </p>
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 p-3 rounded-lg border-l-2 border-[#253F60]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    Exemple : un chèque de 2 000 € pour un mariage peut être considéré comme présent d'usage pour un patrimoine de 500 000 €.
                  </p>
                </div>
              </div>
            </div>

            {/* Donation-partage */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#B99066] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">La donation-partage</h3>
                  <p className="text-[#B99066] font-bold">Répartition équitable</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Permet de <strong>répartir équitablement</strong> son patrimoine entre ses héritiers.
                </p>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Avantage : fige la valeur des biens au jour de la donation, évitant les contestations futures.
                </p>
                <div className="bg-gradient-to-br from-[#B99066]/10 to-[#253F60]/10 p-3 rounded-lg border-l-2 border-[#B99066]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    Fiscalité : application immédiate des abattements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barème fiscal des donations Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Barème fiscal des donations (après abattement)"
            subtitle="En ligne directe (parents ↔ enfants)"
          />

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#253F60] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Part taxable</th>
                    <th className="px-6 py-4 text-center font-semibold">Taux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">Jusqu'à 8 072 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">5 %</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">8 072 € – 12 109 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">10 %</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">12 109 € – 15 932 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">15 %</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">15 932 € – 552 324 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">20 %</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">552 324 € – 902 838 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">30 %</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">902 838 € – 1 805 677 €</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">40 %</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Au-delà</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">45 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            <h3 className="text-xl font-semibold mb-6 text-center relative z-10">
              Exemple : un parent donne 200 000 € à son enfant
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <h4 className="font-semibold mb-2">Donation totale</h4>
                <p className="text-2xl font-bold">200 000 €</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <h4 className="font-semibold mb-2">Abattement</h4>
                <p className="text-2xl font-bold">100 000 €</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <h4 className="font-semibold mb-2">Base taxable</h4>
                <p className="text-2xl font-bold">100 000 €</p>
              </div>
            </div>
            
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 relative z-10">
              <p className="text-lg">
                <strong>Droits à payer ≈ 20 000 €</strong> (taux de 20 %)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation de la nue-propriété Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Donation de la nue-propriété : optimiser la transmission"
            subtitle="Le démembrement de propriété permet de transmettre la nue-propriété d'un bien en conservant l'usufruit (droit d'usage et perception des loyers)"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Barème fiscal */}
            <div>
              <h3 className="text-[#112033] text-xl font-semibold mb-8">
                Barème fiscal (usufruit / nue-propriété) – Article 669 CGI :
              </h3>
              
              <div className="space-y-6">
                {[
                  { age: "Moins de 51 ans", rate: "50% / 50%", desc: "usufruit = 50 % / nue-propriété = 50 %", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]", border: "border-[#253F60]" },
                  { age: "61-70 ans", rate: "40% / 60%", desc: "usufruit = 40 % / nue-propriété = 60 %", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]", border: "border-[#B99066]" },
                  { age: "71-80 ans", rate: "30% / 70%", desc: "usufruit = 30 % / nue-propriété = 70 %", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]", border: "border-[#253F60]" },
                  { age: "Plus de 81 ans", rate: "20% / 80%", desc: "usufruit = 20 % / nue-propriété = 80 %", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]", border: "border-[#B99066]" }
                ].map((item, index) => (
                  <div key={index} className={`relative bg-gradient-to-br ${item.color} rounded-2xl shadow-xl hover:shadow-2xl p-6 border-l-4 ${item.border} transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-white`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="flex justify-between items-center mb-2 relative z-10">
                      <span className="font-semibold">{item.age}</span>
                      <span className="font-bold text-xl">{item.rate}</span>
                    </div>
                    <p className="text-white/90 text-sm relative z-10">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Exemple concret */}
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#253F60]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-tr-full"></div>
              <h3 className="text-xl font-semibold mb-6 text-center relative z-10">
                Exemple concret
              </h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20 relative z-10">
                <h4 className="font-semibold mb-4 text-center">Un bien immobilier de 500 000 € transmis en nue-propriété à 70 ans</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Valeur du bien :</span>
                    <span className="font-bold">500 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Usufruit (40%) :</span>
                    <span className="font-bold">200 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Nue-propriété (60%) :</span>
                    <span className="font-bold">300 000 €</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 relative z-10">
                <p className="text-lg">
                  <strong>Valeur taxable = 300 000 €</strong> (60 %)
                </p>
                <p className="text-sm mt-2 text-white/90">
                  Résultat : baisse significative des droits de donation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intérêt de payer la tranche à 5% Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Intérêt de payer la tranche à 5 %"
            subtitle="Un conseil souvent méconnu : payer volontairement une petite tranche taxable à 5 % peut permettre de gonfler la donation et de transmettre davantage en net"
          />

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Explanation */}
              <div>
                <h3 className="text-[#112033] text-xl font-semibold mb-6">
                  La stratégie de la tranche à 5%
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-[#112033] font-semibold mb-2">
                        Optimisation fiscale intelligente
                      </h4>
                      <p className="text-[#686868] text-sm">
                        Au lieu de s'arrêter exactement à l'abattement, il peut être avantageux de dépasser légèrement pour utiliser la tranche à 5%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-[#112033] font-semibold mb-2">
                        Coût marginal faible
                      </h4>
                      <p className="text-[#686868] text-sm">
                        Le coût fiscal supplémentaire est très faible comparé au patrimoine transmis en plus.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-[#112033] font-semibold mb-2">
                        Maximisation du patrimoine transmis
                      </h4>
                      <p className="text-[#686868] text-sm">
                        Cette stratégie permet de transmettre plus de patrimoine net aux bénéficiaires.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Example */}
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
                <h3 className="text-xl font-semibold mb-6 text-center relative z-10">
                  Exemple concret
                </h3>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20 relative z-10">
                  <h4 className="font-semibold mb-4 text-center">Ajouter 20 000 € de donation au-delà de l'abattement</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Donation supplémentaire :</span>
                      <span className="font-bold">20 000 €</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Taux d'imposition :</span>
                      <span className="font-bold">5%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Droits à payer :</span>
                      <span className="font-bold">1 000 €</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 relative z-10">
                  <p className="text-lg">
                    <strong>Résultat :</strong> 1 000 € de droits génèrent 20 000 € de patrimoine transmis
                  </p>
                  <p className="text-sm mt-2 text-white/90">
                    Soit un coût fiscal de seulement 5% pour transmettre 20 000 € supplémentaires
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La vision Azalée Patrimoine Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="La vision Azalée Patrimoine"
            subtitle="Chez Azalée Patrimoine, nous analysons votre situation familiale et fiscale pour optimiser votre transmission"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { num: "1", title: "Déterminer la meilleure forme", desc: "Nous analysons votre situation pour choisir la forme de donation la plus adaptée à vos objectifs patrimoniaux.", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" },
              { num: "2", title: "Optimiser le timing", desc: "Nous planifions le calendrier optimal : avant 70 ans, tous les 15 ans, en fonction de votre situation.", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]" },
              { num: "3", title: "Solutions fiscales intelligentes", desc: "Démembrement, assurance-vie, donation-partage : nous combinons les outils pour maximiser votre transmission.", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" }
            ].map((item, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${item.color} rounded-2xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border border-white/30">
                  <span className="text-white text-2xl font-bold">{item.num}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{item.title}</h3>
                <p className="text-sm text-white/90 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            <h3 className="text-xl font-semibold mb-6 text-center relative z-10">
              Notre rôle : vous aider à <strong>transmettre plus, en payant moins</strong>, dans un cadre familial sécurisé.
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <h4 className="font-semibold mb-2">Transmettre plus</h4>
                <p className="text-sm text-white/90">Optimisation fiscale et stratégies patrimoniales</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <h4 className="font-semibold mb-2">Payer moins</h4>
                <p className="text-sm text-white/90">Minimisation des droits de donation et de succession</p>
              </div>
            </div>
          </div>

          <div className="mt-8 relative bg-white border-l-4 border-[#253F60] p-6 rounded-r-lg shadow-lg">
            <p className="text-[#253F60] text-center font-semibold leading-relaxed">
              <strong>Prenez rendez-vous dès aujourd'hui</strong> : Azalée Patrimoine, le chef d'orchestre de votre transmission patrimoniale.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            Prêt à optimiser votre transmission patrimoniale ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Nos experts vous accompagnent pour mettre en place la stratégie de donation la plus adaptée à votre situation familiale et fiscale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Simuler ma donation
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";

export default function DonationOnereusePage() {
  const chartData = [
    { label: "Nue-propriété à 70 ans", value: "60%" },
    { label: "Abattement par enfant", value: "€100,000" },
    { label: "Taux fiscal après abattement", value: "5-45%" },
    { label: "Renouvelable tous les", value: "15 ans" },
    { label: "Donation avec charges", value: "Déductible" }
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
                Donation à titre onéreux & donation de la nue-propriété
              </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Une <strong>donation à titre onéreux</strong> est une donation assortie de <strong>charges ou contreparties</strong> pour le bénéficiaire.
              </p>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Contrairement à la donation à titre gratuit (sans aucune obligation), le donataire doit respecter certaines conditions fixées par le donateur : entretien du bien, prise en charge de dettes, obligation de conserver ou d'exploiter un actif transmis, etc.
              </p>
              <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  Ce mécanisme permet de <strong>transmettre</strong> tout en <strong>conservant un contrôle</strong> ou en <strong>fixant des conditions</strong> adaptées à la situation familiale et patrimoniale.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67C52] transition-colors duration-200"
                >
                  Évaluer ma donation
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
                >
                  Consulter un expert
                </button>
              </div>
            </div>
            
            {/* Right: Key Features Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Avec charges</h3>
                  <p className="text-[#686868] text-sm mb-2">Obligations pour le bénéficiaire</p>
                  <p className="text-[#B99066] text-xl font-bold">Contrôle</p>
                  <p className="text-[#686868] text-xs">Conservation du pouvoir</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Nue-propriété</h3>
                  <p className="text-[#686868] text-sm mb-2">Conservation de l'usufruit</p>
                  <p className="text-[#B99066] text-xl font-bold">Loyers</p>
                  <p className="text-[#686868] text-xs">Droit d'usage</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Optimisation fiscale</h3>
                  <p className="text-[#686868] text-sm mb-2">Démembrement</p>
                  <p className="text-[#B99066] text-xl font-bold">60-90%</p>
                  <p className="text-[#686868] text-xs">Selon l'âge</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Transmission progressive</h3>
                  <p className="text-[#686868] text-sm mb-2">Anticipation</p>
                  <p className="text-[#B99066] text-xl font-bold">Sécurisée</p>
                  <p className="text-[#686868] text-xs">Évite les conflits</p>
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
            title="Caractéristiques des donations à titre onéreux"
            subtitle="Visualisez les paramètres clés des donations à titre onéreux"
          />
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
            <PlacementChart 
              title="Caractéristiques des donations à titre onéreux"
              data={chartData}
              chartImage="/images/onereuse.png"
            />
          </div>
        </div>
      </section>

      {/* Les formes de donations à titre onéreux Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les formes de donations à titre onéreux"
            subtitle="Découvrez les 2 principales formes de donations à titre onéreux"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation avec charges */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#253F60] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">Donation avec charges</h3>
                  <p className="text-[#B99066] font-bold">Obligations pour le bénéficiaire</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Le donateur transmet un bien mais impose au bénéficiaire des obligations (par exemple : prendre en charge un parent, assumer une dette, entretenir le bien).
                </p>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Juridiquement, la donation reste valable, mais la <strong>valeur des charges est déduite de la base taxable</strong>.
                </p>
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 p-3 rounded-lg border-l-2 border-[#253F60]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    Exemple : un parent donne un bien immobilier de 400 000 € avec obligation pour l'enfant de rembourser un emprunt de 100 000 € lié au bien → base taxable = 300 000 €.
                  </p>
                </div>
              </div>
            </div>

            {/* Donation de la nue-propriété */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#B99066] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold">Donation de la nue-propriété avec conservation de l'usufruit</h3>
                  <p className="text-[#B99066] font-bold">Démembrement de propriété</p>
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <p className="text-[#686868] text-sm leading-relaxed">
                  Le donateur transmet uniquement la <strong>nue-propriété</strong> d'un bien, mais conserve :
                </p>
                <ul className="text-[#686868] text-sm ml-4 space-y-1">
                  <li>• le <strong>droit de percevoir les loyers</strong> (usufruit),</li>
                  <li>• le <strong>pouvoir de décision</strong> sur la gestion du bien.</li>
                </ul>
                <p className="text-[#686868] text-sm leading-relaxed">
                  À son décès, l'usufruit s'éteint, et le nu-propriétaire devient plein propriétaire <strong>sans droits supplémentaires</strong>.
                </p>
                <div className="bg-gradient-to-br from-[#B99066]/10 to-[#253F60]/10 p-3 rounded-lg border-l-2 border-[#B99066]">
                  <p className="text-[#253F60] text-xs font-semibold">
                    C'est l'un des mécanismes les plus utilisés pour <strong>anticiper la transmission immobilière</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barème fiscal Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Barème fiscal (article 669 CGI)"
            subtitle="La valeur de la nue-propriété dépend de l'âge du donateur"
          />

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#253F60] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Âge du donateur</th>
                    <th className="px-6 py-4 text-center font-semibold">Usufruit</th>
                    <th className="px-6 py-4 text-center font-semibold">Nue-propriété</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">Moins de 51 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">50 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">50 %</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">51 à 60 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">50 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">50 %</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">61 à 70 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">40 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">60 %</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">71 à 80 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">30 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">70 %</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">81 à 90 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">20 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">80 %</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Plus de 91 ans</td>
                    <td className="px-6 py-4 text-center text-[#253F60] font-bold">10 %</td>
                    <td className="px-6 py-4 text-center text-[#B99066] font-bold">90 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            <h3 className="text-xl font-semibold mb-6 text-center relative z-10 leading-relaxed">
              Exemple : à 70 ans, une donation de la nue-propriété d'un appartement de 500 000 € est taxée sur 300 000 € (60 %), réduisant considérablement les droits.
            </h3>
          </div>
        </div>
      </section>

      {/* Coût fiscal d'une donation Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Coût fiscal d'une donation"
            subtitle="Les droits de donation sont calculés par tranches après application des abattements (100 000 € par enfant tous les 15 ans)"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Exemple de base */}
            <div>
              <h3 className="text-[#112033] text-xl font-semibold mb-8">
                Exemple de base
              </h3>
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white mb-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <h4 className="text-lg font-semibold mb-6 text-center relative z-10">
                  Donation de 200 000 € à un enfant, parent âgé de 70 ans
                </h4>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span>Donation totale :</span>
                    <span className="font-bold">200 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span>Abattement :</span>
                    <span className="font-bold">100 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span>Base taxable :</span>
                    <span className="font-bold">100 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span>Droits dus :</span>
                    <span className="font-bold">≈ 20 000 €</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span>Taux :</span>
                    <span className="font-bold">20 %</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Astuce patrimoniale */}
            <div>
              <h3 className="text-[#112033] text-xl font-semibold mb-8">
                Astuce patrimoniale
              </h3>
              
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/5 rounded-bl-full"></div>
                <p className="text-[#686868] text-sm mb-6 leading-relaxed relative z-10">
                  Il peut être pertinent de <strong>dépasser volontairement l'abattement</strong> et de payer la tranche basse (5 % ou 10 %).
                </p>
                
                <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-xl shadow-lg p-6 text-white mb-6 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                  <h4 className="font-semibold mb-4 text-center relative z-10">Exemple : donner 120 000 € au lieu de 100 000 €</h4>
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <span>Donation supplémentaire :</span>
                      <span className="font-bold">20 000 €</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <span>Taux d'imposition :</span>
                      <span className="font-bold">5%</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <span>Droits supplémentaires :</span>
                      <span className="font-bold">1 000 €</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 p-4 rounded-lg border-l-2 border-[#B99066] relative z-10">
                  <p className="text-[#253F60] text-sm text-center font-semibold">
                    Cela permet de <strong>gonfler la donation nette</strong> pour un coût fiscal très limité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intérêts de la donation à titre onéreux Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Intérêts de la donation à titre onéreux"
            subtitle="Découvrez les 4 principaux avantages de la donation à titre onéreux"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transmission progressive", desc: "Permet de transmettre progressivement son patrimoine sans tout donner d'un coup.", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" },
              { title: "Optimisation fiscale", desc: "Optimise la fiscalité grâce au démembrement de propriété.", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]" },
              { title: "Maîtrise du bien", desc: "Conserve une maîtrise du bien (loyers, usage, décisions).", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" },
              { title: "Sécurise la transmission", desc: "Sécurise la transmission en évitant les conflits ultérieurs.", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]" }
            ].map((item, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${item.color} rounded-2xl shadow-xl hover:shadow-2xl p-8 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* La vision Azalée Patrimoine Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="La vision Azalée Patrimoine"
            subtitle="Chez Azalée Patrimoine, nous analysons chaque situation pour optimiser votre transmission patrimoniale"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { title: "Déterminer la bonne forme", desc: "Gratuite, avec charges, nue-propriété : nous choisissons la forme la plus adaptée à votre situation.", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" },
              { title: "Chiffrer précisément", desc: "Impact fiscal par tranches et par abattements pour optimiser votre stratégie.", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]" },
              { title: "Optimiser le transfert", desc: "Avec vos notaires et experts-comptables pour une approche coordonnée.", color: "from-[#253F60] via-[#1a2d47] to-[#253F60]" },
              { title: "Stratégie globale", desc: "Assurance-vie, immobilier, transmission d'entreprise : vision patrimoniale complète.", color: "from-[#B99066] via-[#A67A5A] to-[#B99066]" }
            ].map((item, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${item.color} rounded-2xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{item.title}</h3>
                <p className="text-sm text-white/90 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            <h3 className="text-xl font-semibold mb-6 text-center relative z-10">
              La donation à titre onéreux est un outil puissant quand elle est <strong>anticipée et bien structurée</strong>.
            </h3>
            
            <div className="mt-8 bg-white/10 backdrop-blur-sm border-l-4 border-white/30 p-6 rounded-r-lg relative z-10">
              <p className="text-white text-center font-semibold leading-relaxed">
                <strong>Contactez Azalée Patrimoine</strong> pour évaluer vos options et construire une stratégie de transmission adaptée à votre famille et à votre patrimoine.
              </p>
            </div>
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
            Nos experts vous accompagnent pour mettre en place la stratégie de donation la plus adaptée à votre situation familiale et patrimoniale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Évaluer ma donation
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
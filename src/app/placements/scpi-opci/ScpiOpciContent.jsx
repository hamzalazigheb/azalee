"use client";
import React, { useState, useEffect } from "react";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";

export default function ScpiOpciContent({ content }) {
  const [activeTab, setActiveTab] = useState("introduction");

  const scrollToAzalee = () => {
    setActiveTab("azalee");
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const element = document.getElementById("azalee-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  // Exposer la fonction pour le bouton hero
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollToAzalee = scrollToAzalee;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.scrollToAzalee;
      }
    };
  }, []);

  return (
    <>
      {/* Chart Section */}
      {content.chart && (
        <PlacementChart 
          title={content.chart.title}
          data={content.chart.data}
          chartImage={content.chart.image}
        />
      )}

      {/* Navigation Tabs */}
      <section className="w-full bg-white py-8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {(content.tabs || []).map((tab) => (
              <button 
                key={tab.id}
                onClick={() => {
                  if (tab.id === "azalee") {
                    scrollToAzalee();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#253F60] text-white" 
                    : "bg-gray-100 text-[#686868] hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "introduction" && content.tabContent?.introduction && (
            <div className="space-y-8">
              <SectionHeader 
                title={content.tabContent.introduction.title}
                subtitle={content.tabContent.introduction.subtitle}
              />
              
              {content.tabContent.introduction.role && (
                <div className="relative bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-2xl p-8 border-l-4 border-[#253F60] shadow-lg">
                  <h3 className="text-[#253F60] text-xl font-semibold mb-4">{content.tabContent.introduction.role.title}</h3>
                  <p className="text-[#686868] leading-relaxed" dangerouslySetInnerHTML={{ __html: content.tabContent.introduction.role.description }} />
                </div>
              )}
            </div>
          )}

          {activeTab === "fiscalite" && content.tabContent?.fiscalite && (
            <div className="space-y-8">
              <SectionHeader 
                title={content.tabContent.fiscalite.title}
                subtitle={content.tabContent.fiscalite.subtitle}
              />
              
              {content.tabContent.fiscalite.modes && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.tabContent.fiscalite.modes.map((mode, index) => (
                    <div key={index} className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 sm:p-8 border-l-4 ${index === 0 ? 'border-[#253F60]' : index === 1 ? 'border-[#B99066]' : 'border-[#253F60]'} transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group`}>
                      <div className={`absolute top-0 right-0 w-24 h-24 ${index === 0 ? 'bg-[#253F60]/5' : index === 1 ? 'bg-[#B99066]/5' : 'bg-[#253F60]/5'} rounded-bl-full`}></div>
                      <h3 className="text-[#253F60] text-lg font-semibold mb-3 relative z-10">{mode.title}</h3>
                      <p className="text-[#686868] text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: mode.description }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "avantages" && content.tabContent?.avantages && (
            <div className="space-y-8">
              <SectionHeader 
                title={content.tabContent.avantages.title}
                subtitle={content.tabContent.avantages.subtitle}
              />
              
              {content.tabContent.avantages.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.tabContent.avantages.items.map((item, index) => (
                    <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-white`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-white/90">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "inconvenients" && content.tabContent?.inconvenients && (
            <div className="space-y-8">
              <SectionHeader 
                title={content.tabContent.inconvenients.title}
                subtitle={content.tabContent.inconvenients.subtitle}
              />
              
              {content.tabContent.inconvenients.items && (
                <div className="space-y-6">
                  {content.tabContent.inconvenients.items.map((item, index) => {
                    const colors = [
                      { bg: "from-red-50 via-red-100/50 to-red-50", border: "border-red-500", accent: "bg-red-200/20" },
                      { bg: "from-amber-50 via-amber-100/50 to-amber-50", border: "border-amber-500", accent: "bg-amber-200/20" },
                      { bg: "from-yellow-50 via-yellow-100/50 to-yellow-50", border: "border-yellow-500", accent: "bg-yellow-200/20" },
                      { bg: "from-blue-50 via-blue-100/50 to-blue-50", border: "border-blue-500", accent: "bg-blue-200/20" }
                    ];
                    const color = colors[index % colors.length];
                    
                    return (
                      <div key={index} className={`relative bg-gradient-to-br ${color.bg} border-l-4 ${color.border} p-6 sm:p-8 rounded-2xl shadow-lg overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 ${color.accent} rounded-bl-full`}></div>
                        <h3 className="text-[#253F60] text-lg font-semibold mb-3 relative z-10">{item.title}</h3>
                        {item.description && <p className="text-[#686868] text-sm mb-2 leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: item.description }} />}
                        {item.details && <p className="text-[#686868] text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: item.details }} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "types" && content.tabContent?.types && (
            <div className="space-y-8">
              <SectionHeader 
                title={content.tabContent.types.title}
                subtitle={content.tabContent.types.subtitle}
              />
              
              {content.tabContent.types.list && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.tabContent.types.list.map((type, index) => {
                    const gradients = [
                      "from-[#253F60] via-[#1a2d47] to-[#253F60]",
                      "from-[#B99066] via-[#A67A5A] to-[#B99066]",
                      "from-[#253F60] via-[#1a2d47] to-[#253F60]",
                      "from-[#B99066] via-[#A67A5A] to-[#253F60]"
                    ];
                    const gradient = gradients[index % gradients.length];
                    
                    return (
                      <div key={index} className={`relative bg-gradient-to-br ${gradient} rounded-2xl shadow-xl hover:shadow-2xl p-8 text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                        <h3 className="text-2xl font-semibold mb-4 relative z-10">{type.title}</h3>
                        {type.objective && <p className="text-sm mb-4 relative z-10" dangerouslySetInnerHTML={{ __html: type.objective }} />}
                        {type.points && (
                          <ul className="space-y-2 text-sm relative z-10">
                            {type.points.map((point, i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "azalee" && content.tabContent?.azalee && (
            <div id="azalee-section" className="space-y-8">
              <SectionHeader 
                title={content.tabContent.azalee.title}
                subtitle={content.tabContent.azalee.subtitle}
              />
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 sm:p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  {content.tabContent.azalee.intro && (
                    <div className="mb-6">
                      {content.tabContent.azalee.intro.paragraphs?.map((p, i) => (
                        <p key={i} className={`${i === 0 ? 'text-lg mb-4' : 'text-sm mb-4'}`} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                      {content.tabContent.azalee.intro.list && (
                        <ul className="list-disc list-inside text-sm space-y-1 mb-6">
                          {content.tabContent.azalee.intro.list.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  
                  {content.tabContent.azalee.solution && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4">{content.tabContent.azalee.solution.title}</h3>
                      {content.tabContent.azalee.solution.steps && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {content.tabContent.azalee.solution.steps.map((step, index) => (
                            <div key={index} className="text-center">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
                                <span className="text-white text-sm font-bold">{step.number}</span>
                              </div>
                              <h4 className="font-semibold mb-2">{step.title}</h4>
                              <p className="text-sm text-white/90">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {content.tabContent.azalee.objective && (
                    <div className="mt-6 text-center">
                      <p className="text-lg font-semibold mb-2">{content.tabContent.azalee.objective.title}</p>
                      <p className="text-sm text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.tabContent.azalee.objective.description }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Classement SCPI Section */}
      {content.ranking && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                {content.ranking.title}
              </h2>
              {content.ranking.subtitle && (
                <p className="text-[#686868] text-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.ranking.subtitle }} />
              )}
            </div>

            {content.ranking.table && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#253F60] text-white">
                      <tr>
                        {content.ranking.table.headers.map((header, i) => (
                          <th key={i} className="px-4 py-3 text-left text-sm font-semibold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {content.ranking.table.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {row.cells.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? 'font-semibold text-[#253F60]' : j === 3 ? 'font-bold text-green-600' : ''}`} dangerouslySetInnerHTML={{ __html: cell }} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {content.ranking.warning && (
              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h3 className="text-[#112033] text-lg font-semibold mb-3">{content.ranking.warning.title}</h3>
                {content.ranking.warning.items && (
                  <ul className="space-y-2 text-sm text-[#686868]">
                    {content.ranking.warning.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Comparatif Section */}
      {content.comparison && (
        <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                {content.comparison.title}
              </h2>
            </div>

            {content.comparison.table && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#B99066] text-white">
                      <tr>
                        {content.comparison.table.headers.map((header, i) => (
                          <th key={i} className="px-4 py-3 text-left text-sm font-semibold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {content.comparison.table.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {row.cells.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? 'font-semibold' : ''}`} dangerouslySetInnerHTML={{ __html: cell }} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* OPCI Section */}
      {content.opci && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="bg-[#253F60] rounded-lg p-6 mb-6">
                <h2 className="text-white text-2xl sm:text-3xl font-cairo font-semibold">
                  {content.opci.title}
                </h2>
              </div>
            </div>

            {content.opci.content && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {content.opci.content.map((block, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-[#112033] text-xl font-semibold mb-4">{block.title}</h3>
                    {block.description && <p className="text-[#686868] mb-4" dangerouslySetInnerHTML={{ __html: block.description }} />}
                    {block.items && (
                      <ul className="space-y-2 text-[#686868] text-sm">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`font-bold ${i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'}`}>•</span>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {content.cta && (
        <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
              {content.cta.title}
            </h2>
            {content.cta.summary && (
              <div className="text-white text-lg mb-8 max-w-4xl mx-auto space-y-4">
                {content.cta.summary.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToAzalee}
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-lg font-cairo font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                {content.cta.primaryButton}
              </button>
              <CTAButton 
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                variant="secondary"
              >
                {content.cta.secondaryButton}
              </CTAButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
}


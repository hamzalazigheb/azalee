"use client";
import React, { useState, useEffect } from "react";
import CTAButton from "@/components/ui/CTAButton";

export default function BourseActionsContent({ content }) {
  const [activeTab, setActiveTab] = useState("introduction");
  const [marketData, setMarketData] = useState({
    cac40: { value: 0, change: 0, loading: true, isMarketOpen: false, marketState: 'UNKNOWN' },
    sp500: { value: 0, change: 0, loading: true, isMarketOpen: false, marketState: 'UNKNOWN' },
    msciWorld: { value: 0, change: 0, loading: true, isMarketOpen: false, marketState: 'UNKNOWN' },
    averageReturn: 7.0,
    loading: true
  });

  // Fetch real market data from API
  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market-data', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setMarketData({
            cac40: { 
              ...result.data.cac40, 
              loading: false,
              isMarketOpen: result.data.cac40?.isMarketOpen ?? false,
              marketState: result.data.cac40?.marketState ?? 'UNKNOWN'
            },
            sp500: { 
              ...result.data.sp500, 
              loading: false,
              isMarketOpen: result.data.sp500?.isMarketOpen ?? false,
              marketState: result.data.sp500?.marketState ?? 'UNKNOWN'
            },
            msciWorld: { 
              ...result.data.msciWorld, 
              loading: false,
              isMarketOpen: result.data.msciWorld?.isMarketOpen ?? false,
              marketState: result.data.msciWorld?.marketState ?? 'UNKNOWN'
            },
            averageReturn: result.data.averageReturn,
            loading: false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  useEffect(() => {
    // Charger immédiatement
    fetchMarketData();
    // ✅ Mise à jour toutes les 20 secondes pour données quasi temps réel
    const interval = setInterval(() => {
      fetchMarketData();
    }, 20000); // 20 secondes au lieu de 60

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Market Data Section */}
      <section className="w-full bg-gradient-to-br from-[#F9FAFB] to-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* CAC 40 Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#253F60] text-sm font-cairo font-semibold uppercase tracking-wide">CAC 40</h3>
                {!marketData.cac40.loading && marketData.cac40.isMarketOpen !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      marketData.cac40.isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-xs text-gray-500 font-medium">
                      {marketData.cac40.isMarketOpen ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                )}
              </div>
              {marketData.cac40.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.cac40.value > 0 ? marketData.cac40.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.cac40.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.cac40.change >= 0 ? '+' : ''}{marketData.cac40.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">{content.marketData?.cac40?.description || "40 plus grandes entreprises françaises"}</p>
            </div>

            {/* S&P 500 Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#253F60] text-sm font-cairo font-semibold uppercase tracking-wide">S&P 500</h3>
                {!marketData.sp500.loading && marketData.sp500.isMarketOpen !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      marketData.sp500.isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-xs text-gray-500 font-medium">
                      {marketData.sp500.isMarketOpen ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                )}
              </div>
              {marketData.sp500.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.sp500.value > 0 ? marketData.sp500.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.sp500.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.sp500.change >= 0 ? '+' : ''}{marketData.sp500.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">{content.marketData?.sp500?.description || "500 plus grandes sociétés américaines"}</p>
            </div>

            {/* MSCI World Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#253F60] text-sm font-cairo font-semibold uppercase tracking-wide">MSCI World</h3>
                {!marketData.msciWorld.loading && marketData.msciWorld.isMarketOpen !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      marketData.msciWorld.isMarketOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-xs text-gray-500 font-medium">
                      {marketData.msciWorld.isMarketOpen ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                )}
              </div>
              {marketData.msciWorld.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.msciWorld.value > 0 ? marketData.msciWorld.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.msciWorld.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.msciWorld.change >= 0 ? '+' : ''}{marketData.msciWorld.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">{content.marketData?.msciWorld?.description || "1 500 actions dans 23 pays développés"}</p>
            </div>

            {/* Rendement moyen Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#B99066]/20">
              <h3 className="text-[#253F60] text-sm font-cairo font-semibold mb-3 uppercase tracking-wide">Rendement moyen</h3>
              <p className="text-[#B99066] text-3xl font-cairo font-bold mb-2">{marketData.averageReturn.toFixed(1)}%</p>
              <p className="text-[#686868] text-sm font-inter mb-4">par an</p>
              <p className="text-[#686868] text-xs font-inter leading-relaxed">{content.marketData?.averageReturn?.description || "Performance historique S&P 500"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-white py-8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {(content.tabs || []).map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
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
            <div className="space-y-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  {content.tabContent.introduction.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: content.tabContent.introduction.subtitle }} />
              </div>
              
              {content.tabContent.introduction.whyInvest && (
                <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 shadow-xl border-2 border-[#E5E7EB] overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#253F60] to-[#1a2d47] rounded-full"></div>
                      <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold">{content.tabContent.introduction.whyInvest.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {content.tabContent.introduction.whyInvest.items?.map((item, index) => (
                        <div key={index} className={`group relative rounded-xl p-6 text-white overflow-hidden ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                          <div className="relative z-10">
                            <h4 className="text-white font-cairo font-bold mb-2 text-lg">{item.title}</h4>
                            <p className="text-white/90 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "definition" && content.tabContent?.definition && (
            <div className="space-y-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  {content.tabContent.definition.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: content.tabContent.definition.subtitle }} />
              </div>
              
              {content.tabContent.definition.types && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {content.tabContent.definition.types.map((item, index) => (
                    <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 4 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 4 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : index % 4 === 2 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h3 className="text-white text-xl font-cairo font-bold mb-3">{item.title}</h3>
                        <p className="text-white/90 text-base leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {content.tabContent.definition.role && (
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">{content.tabContent.definition.role.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.tabContent.definition.role.items?.map((item, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "actions" && content.tabContent?.actions && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  {content.tabContent.actions.title}
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.tabContent.actions.subtitle }} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {content.tabContent.actions.rights && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-[#112033] text-xl font-semibold mb-6">{content.tabContent.actions.rights.title}</h3>
                    <div className="space-y-4">
                      {content.tabContent.actions.rights.items?.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div>
                            <h4 className="text-[#112033] font-semibold mb-1">{item.title}</h4>
                            <p className="text-[#686868] text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {content.tabContent.actions.example && (
                  <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6">{content.tabContent.actions.example.title}</h3>
                    <div className="space-y-4">
                      {content.tabContent.actions.example.scenarios?.map((scenario, index) => (
                        <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{scenario.title}</h4>
                          <p className="text-sm" dangerouslySetInnerHTML={{ __html: scenario.description }} />
                        </div>
                      ))}
                    </div>
                    {content.tabContent.actions.example.conclusion && (
                      <div className="mt-6 text-center">
                        <p className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: content.tabContent.actions.example.conclusion }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "indices" && content.tabContent?.indices && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  {content.tabContent.indices.title}
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.tabContent.indices.subtitle }} />
              </div>
              
              {content.tabContent.indices.list && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.tabContent.indices.list.map((index, idx) => (
                    <div key={idx} className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold mb-2">{index.name}</h3>
                        <p className="text-xl font-bold">{index.value}</p>
                      </div>
                      <p className="text-sm mb-4">{index.description}</p>
                      {index.companies && (
                        <ul className="space-y-2 text-sm">
                          {index.companies.map((company, i) => (
                            <li key={i}>• {company}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {content.tabContent.indices.role && (
                <div className="bg-[#F8F9FA] rounded-lg p-8 text-center">
                  <h3 className="text-[#112033] text-xl font-semibold mb-4">{content.tabContent.indices.role.title}</h3>
                  <p className="text-[#686868] text-lg" dangerouslySetInnerHTML={{ __html: content.tabContent.indices.role.description }} />
                </div>
              )}
            </div>
          )}

          {activeTab === "investir" && content.tabContent?.investir && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  {content.tabContent.investir.title}
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.tabContent.investir.subtitle }} />
              </div>
              
              {content.tabContent.investir.methods && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {content.tabContent.investir.methods.map((method, index) => (
                    <div key={index} className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold mb-2">{method.title}</h3>
                      </div>
                      <p className="text-sm mb-4">{method.description}</p>
                      {method.points && (
                        <ul className="space-y-2 text-sm">
                          {method.points.map((point, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "enveloppes" && content.tabContent?.enveloppes && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  {content.tabContent.enveloppes.title}
                </h2>
              </div>
              
              {content.tabContent.enveloppes.list && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {content.tabContent.enveloppes.list.map((enveloppe, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-lg p-8 border-l-4 ${index === 0 ? 'border-[#253F60]' : index === 1 ? 'border-[#B99066]' : 'border-[#253F60]'}`}>
                      <h3 className="text-[#112033] text-xl font-semibold mb-4">{enveloppe.name}</h3>
                      <p className="text-[#686868] mb-4">{enveloppe.description}</p>
                      {enveloppe.points && (
                        <ul className="space-y-2 text-sm text-[#686868]">
                          {enveloppe.points.map((point, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {content.tabContent.enveloppes.conclusion && (
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">{content.tabContent.enveloppes.conclusion.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.tabContent.enveloppes.conclusion.items?.map((item, index) => (
                      <div key={index} className="text-center">
                        <h4 className="font-semibold mb-2">{item.name}</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "faq" && content.tabContent?.faq && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  {content.tabContent.faq.title}
                </h2>
              </div>
              
              <div className="space-y-6">
                {content.tabContent.faq.items?.map((item, index) => (
                  <div key={index} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${index % 2 === 0 ? 'border-[#253F60]' : 'border-[#B99066]'}`}>
                    <h3 className="text-[#112033] text-lg font-semibold mb-3">{item.question}</h3>
                    {item.answer && <p className="text-[#686868] mb-2" dangerouslySetInnerHTML={{ __html: item.answer }} />}
                    {item.details && <p className="text-[#686868] text-sm" dangerouslySetInnerHTML={{ __html: item.details }} />}
                    {item.note && (
                      <div className={`mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 ${index % 2 === 0 ? 'border-[#253F60]' : 'border-[#B99066]'} p-3 rounded-r-lg`}>
                        <p className="text-[#112033] text-sm" dangerouslySetInnerHTML={{ __html: item.note }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {content.tabContent.faq.conclusion && (
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white text-center">
                  <p className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: content.tabContent.faq.conclusion }} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Avantages et Inconvénients Section */}
      {content.advantagesInconvenients && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Avantages */}
              {content.advantagesInconvenients.advantages && (
                <div>
                  <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8">
                    {content.advantagesInconvenients.advantages.title}
                  </h2>
                  <div className="space-y-6">
                    {content.advantagesInconvenients.advantages.items?.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className={`w-12 h-12 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] to-[#1a2d47]' : 'from-[#B99066] to-[#A67A5A]'} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[#112033] font-semibold mb-2 text-lg">{item.title}</h3>
                          <p className="text-[#686868] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inconvénients */}
              {content.advantagesInconvenients.inconvenients && (
                <div>
                  <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8">
                    {content.advantagesInconvenients.inconvenients.title}
                  </h2>
                  <div className="space-y-6">
                    {content.advantagesInconvenients.inconvenients.items?.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className={`w-12 h-12 bg-gradient-to-br ${index === 0 ? 'from-red-500 to-red-600' : index === 1 ? 'from-orange-500 to-orange-600' : index === 2 ? 'from-amber-500 to-amber-600' : 'from-yellow-500 to-yellow-600'} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[#112033] font-semibold mb-2 text-lg">{item.title}</h3>
                          <p className="text-[#686868] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Approche Azalée Section */}
      {content.approach && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                {content.approach.title}
              </h2>
              <p className="text-[#686868] text-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.approach.subtitle }} />
            </div>

            {content.approach.items && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {content.approach.items.map((item, index) => (
                  <div key={index} className={`bg-gradient-to-br ${index === 0 ? 'from-[#253F60] to-[#1a2d47]' : index === 1 ? 'from-[#B99066] to-[#A67A5A]' : 'from-[#253F60] to-[#B99066]'} rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300`}>
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <svg className={`w-10 h-10 ${index === 0 ? 'text-[#253F60]' : index === 1 ? 'text-[#B99066]' : 'text-[#253F60]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {content.approach.objective && (
              <div className="mt-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 text-white text-center border-2 border-[#B99066]/30">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{content.approach.objective.title}</h3>
                <p className="text-lg leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: content.approach.objective.description }} />
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
            <div className="text-white text-lg mb-8 max-w-4xl mx-auto space-y-4">
              {content.cta.summary?.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
            
            {content.cta.services && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {content.cta.services.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20">
                    <div className={`w-20 h-20 bg-gradient-to-br ${index === 0 ? 'from-[#253F60] to-[#1a2d47]' : index === 1 ? 'from-[#B99066] to-[#A67A5A]' : 'from-[#253F60] to-[#B99066]'} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center text-[#112033]">{service.title}</h3>
                    <p className="text-base text-center leading-relaxed text-[#686868] font-medium">{service.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {content.cta.primaryButton && (
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  variant="primary"
                >
                  {content.cta.primaryButton}
                </CTAButton>
              )}
              {content.cta.secondaryButton && (
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  variant="secondary"
                >
                  {content.cta.secondaryButton}
                </CTAButton>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}



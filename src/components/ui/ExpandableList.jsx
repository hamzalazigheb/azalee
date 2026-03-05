'use client';
import React, { useState } from 'react';

const ExpandableList = () => {
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const items = [
    {
      title: "Investir efficacement",
      content: "Découvrez les meilleures stratégies d'investissement adaptées à votre profil et vos objectifs financiers."
    },
    {
      title: "Organize the transmission of your assets",
      content: "Planifiez la transmission de votre patrimoine de manière optimale pour vos héritiers."
    },
    {
      title: "Alléger votre fiscalité",
      content: "Optimisez votre situation fiscale grâce à nos conseils personnalisés et solutions légales."
    },
    {
      title: "Prévoir sa retraite",
      content: "Préparez votre retraite avec des solutions d\'épargne et de placement adaptées."
    },
    {
      title: "Construire votre patrimoine",
      content: "Développez votre patrimoine grâce à des stratégies d'investissement diversifiées."
    },
    {
      title: "Protéger vos proches",
      content: "Assurez la sécurité financière de votre famille avec nos solutions de protection."
    }
  ];

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-0 mt-12 lg:mt-20">
      <div className="space-y-0 shadow-lg">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-300 last:border-b-0">
            {/* Header */}
            <button
              onClick={() => toggleExpand(index)}
              className={`w-full flex justify-between items-center p-4 text-left transition-all duration-300 ${
                index === 0 && expandedItems[0]
                  ? 'bg-global-6 text-global-7 shadow-lg'
                  : 'bg-global-7 text-global-2 hover:bg-gray-50'
              }`}
              role="button"
              aria-expanded={expandedItems[index] || false}
            >
              <span className="text-sm sm:text-base font-source-sans font-normal">
                {item.title}
              </span>
              <img 
                src={index === 0 && expandedItems[0] 
                  ? "/images/azalee-patrimoine-img-vector-white-a700.svg" :"/images/azalee-patrimoine-img-svg-gray-900-01.svg"
                } 
                className={`w-3 h-3 transition-transform duration-300 ${
                  expandedItems[index] ? 'rotate-180' : ''
                }`}
                alt="expand icon" 
              />
            </button>

            {/* Content */}
            {expandedItems[index] && (
              <div className="bg-global-7 px-4 py-6 border-t border-gray-200">
                <p className="text-sm font-source-sans text-global-2 leading-relaxed">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableList;
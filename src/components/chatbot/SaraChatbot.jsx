'use client';
import { useState, useEffect, useRef } from 'react';
import { getApiPath } from '@/lib/paths';

// Générer un ID de session unique
const generateSessionId = () => {
  return `sara_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default function SaraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [sessionId, setSessionId] = useState(null);
  const [profile, setProfile] = useState({});
  const [intention, setIntention] = useState(null);
  const [thematique, setThematique] = useState(null);
  const [rdvData, setRdvData] = useState({ date: '', heure: '', canal: '' });
  const [rdvStep, setRdvStep] = useState('date'); // date, heure, canal
  const [rappelData, setRappelData] = useState({ nom: '', prenom: '', telephone: '', email: '' });
  const [rappelStep, setRappelStep] = useState('nom'); // nom, prenom, telephone, email
  const [pdfData, setPdfData] = useState({ email: '' });
  const [pdfStep, setPdfStep] = useState('email'); // email
  const messagesEndRef = useRef(null);

  const [saraContent, setSaraContent] = useState(null);

  useEffect(() => {
    // Générer un sessionId au montage
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Charger le contenu de Sara depuis le CMS
    fetch(getApiPath('/cms/content?path=sara&t=' + Date.now()))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSaraContent(data.data);
        }
      })
      .catch(err => {
        console.error('Error loading Sara content from CMS:', err);
      });
  }, []);

  // Initialiser les messages quand le chatbot s'ouvre
  useEffect(() => {
    if (isOpen && messages.length === 0 && sessionId) {
      const welcomeMsg = getWelcomeMessage();
      const welcomeMessage = { role: 'sara', content: welcomeMsg, timestamp: new Date() };
      setMessages([welcomeMessage]);
      saveSession({ message: welcomeMessage });
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (role, content) => {
    const newMessage = { role, content, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    
    // Sauvegarder le message
    if (sessionId) {
      saveSession({ message: newMessage });
    }
  };

  const saveSession = async (data) => {
    try {
      await fetch('/api/chatbot/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          currentStep,
          profile,
          intention,
          thematique,
          ...data
        })
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const getWelcomeMessage = () => {
    // Si le contenu CMS est disponible, l'utiliser, sinon utiliser le message par défaut
    if (saraContent?.welcome) {
      return {
        type: 'message',
        text: saraContent.welcome.text || "Bonjour et bienvenue sur azalee-patrimoine.fr ! Je suis votre conseiller patrimonial virtuel. Vous souhaitez optimiser vos finances, investir, ou anticiper l'avenir ? Je peux vous aider à y voir clair.",
        options: saraContent.welcome.options || [
          { text: '💬 Obtenir une réponse rapide à une question patrimoniale', value: 'question' },
          { text: '📞 Être rappelé(e) par un conseiller', value: 'rappel' },
          { text: '📅 Prendre un rendez-vous directement', value: 'rdv_direct' }
        ]
      };
    }
    
    // Message par défaut (fallback)
    return {
      type: 'message',
      text: "Bonjour et bienvenue sur azalee-patrimoine.fr ! Je suis votre conseiller patrimonial virtuel. Vous souhaitez optimiser vos finances, investir, ou anticiper l'avenir ? Je peux vous aider à y voir clair.",
      options: [
        { text: '💬 Obtenir une réponse rapide à une question patrimoniale', value: 'question' },
        { text: '📞 Être rappelé(e) par un conseiller', value: 'rappel' },
        { text: '📅 Prendre un rendez-vous directement', value: 'rdv_direct' }
      ]
    };
  };

  const getIntentionMessage = () => {
    return {
      type: 'message',
      text: "Pour vous orienter efficacement, que souhaitez-vous explorer aujourd'hui ?",
      options: [
        { text: 'Optimiser mes placements financiers', value: 'placements' },
        { text: 'Réduire mes impôts', value: 'fiscalite' },
        { text: 'Préparer ma retraite', value: 'retraite' },
        { text: 'Transmettre mon patrimoine', value: 'transmission' },
        { text: 'Investir dans l\'immobilier', value: 'immobilier' },
        { text: 'Diversifier mon patrimoine', value: 'diversification' },
        { text: 'Gérer une situation spécifique (divorce, succession, expatriation…)', value: 'situation_specifique' }
      ]
    };
  };

  const getThematiqueMessage = (intentionValue) => {
    const thematiques = {
      placements: {
        text: "Pour vous faire une préconisation, j'ai besoin d'éléments sur votre situation patrimoniale actuelle. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      },
      fiscalite: {
        text: "Il existe de multiples moyens de réduire ses impôts mais cela dépend de combien de réduction on parle car les niches fiscales sont plafonnées. Toutefois, il existe des dispositifs malins à mettre en place mais qui dépendent de votre situation personnelle. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      },
      retraite: {
        text: "Il existe plusieurs dispositifs à mettre en œuvre pour optimiser votre retraite. Pour vous faire une préconisation, j'ai besoin d'éléments sur votre situation patrimoniale actuelle. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      },
      transmission: {
        text: "L'optimisation de votre transmission dépend de multiples critères. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      },
      immobilier: {
        text: "Il existe plusieurs dispositifs et plusieurs spécificités fiscales ou comptables qui permettent de rentabiliser un investissement immobilier. Souhaitez-vous bénéficier d'un entretien avec notre expert afin d'évaluer la solution idéale par rapport à votre situation personnelle ? Pour vous faire une préconisation, j'ai besoin d'éléments sur votre situation patrimoniale actuelle. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      },
      diversification: {
        text: "Votre question est pertinente car un patrimoine bien géré est un patrimoine bien diversifié. Pour répondre à votre question, j'ai besoin d'éléments sur votre portefeuille actuel. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['taillePortefeuille', 'secteursInvestissement', 'objectifRendement', 'profilRisque', 'nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'patrimoineImmo']
      },
      situation_specifique: {
        text: "Pour vous faire une préconisation adaptée à votre situation spécifique, j'ai besoin d'éléments sur votre situation patrimoniale actuelle. Êtes-vous d'accord pour répondre à quelques questions sous couvert de la confidentialité ?",
        questions: ['nom', 'prenom', 'age', 'situationMatrimoniale', 'enfants', 'tmi', 'placementsFinanciers', 'placementsImmobiliers']
      }
    };

    return thematiques[intentionValue] || thematiques.placements;
  };

  const handleOptionClick = async (value, optionText) => {
    // Ajouter le message utilisateur seulement si ce n'est pas une question de profil
    // (car handleProfileAnswer le fera pour les questions de profil)
    if (currentStep !== 'profile') {
      addMessage('user', optionText);
    }

    // Traiter selon l'étape
    if (currentStep === 'welcome') {
      if (value === 'question') {
        setCurrentStep('intention');
        setTimeout(() => {
          addMessage('sara', getIntentionMessage());
        }, 500);
      } else if (value === 'rappel') {
        setCurrentStep('rappel');
        setRappelStep('nom');
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! Un conseiller Azalée vous contactera prochainement. Pourriez-vous me donner vos coordonnées ?",
          options: null
        });
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "Quel est votre nom ?",
            inputType: 'text'
          });
        }, 500);
        await saveSession({ actionFinale: 'rappel' });
      } else if (value === 'rdv_direct') {
        setCurrentStep('rdv');
        setRdvStep('date');
        addMessage('sara', {
          type: 'message',
          text: "Merci pour votre confiance. Quel moment vous conviendrait le mieux ?",
          options: null
        });
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "Quelle date vous conviendrait le mieux ?",
            inputType: 'date'
          });
        }, 500);
        await saveSession({ actionFinale: 'rdv' });
      }
    } else if (currentStep === 'intention') {
      setIntention(value);
      setThematique(value);
      setCurrentStep('thematique');
      const thematiqueData = getThematiqueMessage(value);
      
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: thematiqueData.text,
          options: [
            { text: 'Oui', value: 'oui_questions' },
            { text: 'Non', value: 'non_questions' }
          ]
        });
      }, 500);
    } else if (currentStep === 'rdv' && rdvStep === 'canal') {
      // Le message utilisateur a déjà été ajouté dans handleOptionClick
      await handleRdvCanal(value, optionText);
    } else if (currentStep === 'thematique') {
      if (value === 'oui_questions') {
        setCurrentStep('profile');
        const thematiqueData = getThematiqueMessage(thematique);
        startProfileCollection(thematiqueData.questions);
      } else if (value === 'non_questions') {
        setCurrentStep('engagement');
        addMessage('sara', {
          type: 'message',
          text: "Souhaitez-vous être contacté(e) par un conseiller ou prendre un rendez-vous directement ?",
          options: [
            { text: 'Être contacté(e) par un conseiller', value: 'rappel' },
            { text: 'Prendre un rendez-vous', value: 'rdv' }
          ]
        });
      }
    } else if (currentStep === 'profile') {
      // Pour les boutons, utiliser le texte du bouton comme displayText
      await handleProfileAnswer(value, optionText);
    } else if (currentStep === 'engagement') {
      if (value === 'pdf') {
        setCurrentStep('pdf');
        setPdfStep('email');
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! Pour vous envoyer votre mini-bilan PDF, j'ai besoin de votre adresse email.",
          options: null
        });
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "Quelle est votre adresse email ?",
            inputType: 'email'
          });
        }, 500);
        await saveSession({ actionFinale: 'pdf' });
      } else if (value === 'rdv') {
        setCurrentStep('rdv');
        setRdvStep('date');
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! Pour fixer votre rendez-vous, j'ai besoin de quelques informations. Quelle date vous conviendrait le mieux ?",
          inputType: 'date'
        });
        await saveSession({ actionFinale: 'rdv' });
      } else if (value === 'rappel') {
        setCurrentStep('rappel');
        setRappelStep('nom');
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! Un conseiller Azalée vous contactera prochainement. Pourriez-vous me donner vos coordonnées ?",
          options: null
        });
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "Quel est votre nom ?",
            inputType: 'text'
          });
        }, 500);
        await saveSession({ actionFinale: 'rappel' });
      }
    }
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [profileQuestions, setProfileQuestions] = useState([]);

  const startProfileCollection = (questions) => {
    setProfileQuestions(questions);
    setCurrentQuestionIndex(0);
    askNextProfileQuestion(questions, 0);
  };

  const askNextProfileQuestion = (questions, index) => {
    if (index >= questions.length) {
      // Toutes les questions sont posées
      setCurrentStep('engagement');
      
      // Message spécial pour la diversification
      const engagementMessage = thematique === 'diversification' 
        ? "Merci pour ces réponses, il me faut un moment pour vous proposer une préconisation. À quel moment peut-on se rencontrer pour vous apporter des réponses ?"
        : "Merci pour ces informations ! Je dispose maintenant des éléments essentiels pour vous apporter une préconisation personnalisée. Souhaitez-vous :";
      
      addMessage('sara', {
        type: 'message',
        text: engagementMessage,
        options: thematique === 'diversification' 
          ? [
              { text: '📅 Fixer un rendez-vous avec un conseiller patrimonial agréé Azalée', value: 'rdv' },
              { text: '📞 Être recontacté(e) ultérieurement', value: 'rappel' }
            ]
          : [
              { text: '📄 Recevoir un mini-bilan PDF gratuit', value: 'pdf' },
              { text: '📅 Fixer un rendez-vous avec un conseiller patrimonial agréé Azalée', value: 'rdv' },
              { text: '📞 Être recontacté(e) ultérieurement', value: 'rappel' }
            ]
      });
      return;
    }

    const question = questions[index];
    const questionText = getProfileQuestionText(question);
    
    setTimeout(() => {
      let options = null;
      let inputType = null;
      
      if (question === 'enfants') {
        options = [
          { text: 'Oui', value: 'enfants_oui' },
          { text: 'Non', value: 'enfants_non' }
        ];
      } else if (question === 'situationMatrimoniale') {
        options = [
          { text: 'Marié(e)', value: 'marie' },
          { text: 'Pacsé(e)', value: 'pacse' },
          { text: 'Célibataire', value: 'celibataire' }
        ];
      } else if (question === 'situationProfessionnelle') {
        options = [
          { text: 'Salarié', value: 'salarie' },
          { text: 'Entrepreneur', value: 'entrepreneur' },
          { text: 'Retraité', value: 'retraite' },
          { text: 'Autre', value: 'autre' }
        ];
      } else if (question === 'tmi') {
        options = [
          { text: 'Oui, je connais mon TMI', value: 'tmi_oui' },
          { text: 'Non, j\'ai besoin d\'aide', value: 'tmi_non' }
        ];
      } else if (question === 'profilRisque') {
        options = [
          { text: 'Conservateur', value: 'conservateur' },
          { text: 'Équilibré', value: 'equilibre' },
          { text: 'Dynamique', value: 'dynamique' }
        ];
      } else if (question === 'age' || question === 'nombreEnfants' || question === 'montantProjet' || question === 'taillePortefeuille') {
        inputType = 'number';
      } else {
        inputType = 'text';
      }
      
      addMessage('sara', {
        type: 'message',
        text: questionText,
        options: options,
        inputType: inputType
      });
    }, 500);
  };

  const getProfileQuestionText = (question) => {
    const questions = {
      nom: "Quel est votre nom ?",
      prenom: "Quel est votre prénom ?",
      age: "1. Quel est votre âge ?",
      situationMatrimoniale: "2. Êtes-vous marié(e), pacsé(e) ou célibataire ?",
      enfants: "3. Avez-vous des enfants ?",
      nombreEnfants: "Combien d'enfants avez-vous ?",
      situationProfessionnelle: "4. Quelle est votre situation professionnelle ? (Salarié, entrepreneur, retraité, etc.)",
      tmi: "5. Connaissez-vous votre TMI (Tranche Marginale d'Imposition) ? Si vous ne la connaissez pas, je peux vous aider à l'estimer.",
      placementsFinanciers: "6. Disposez-vous de placements financiers ou immobiliers ? Lesquels ?",
      placementsImmobiliers: "Disposez-vous de placements immobiliers ? Lesquels ?",
      montantProjet: "7. Quel montant envisagez-vous pour un futur projet ?",
      taillePortefeuille: "Quelle est la taille de votre portefeuille actuel ?",
      secteursInvestissement: "Dans quels secteurs d'investissement êtes-vous actuellement ?",
      objectifRendement: "Quel est votre objectif de rendement ?",
      profilRisque: "Quel est votre profil de risque ? (Conservateur, Équilibré, Dynamique)",
      patrimoineImmo: "Quel est votre patrimoine immobilier actuel ? (Résidence principale, résidence secondaire, investissement locatif, etc.)"
    };
    return questions[question] || question;
  };

  const handleProfileAnswer = async (value, displayText = null) => {
    const currentQuestion = profileQuestions[currentQuestionIndex];
    
    // Afficher la réponse de l'utilisateur
    const questionText = getProfileQuestionText(currentQuestion);
    const displayValue = displayText || value;
    addMessage('user', displayValue);
    
    if (currentQuestion === 'enfants') {
      if (value === 'enfants_oui') {
        setProfile(prev => ({ ...prev, enfants: true }));
        setCurrentQuestionIndex(prev => prev + 1);
        askNextProfileQuestion(profileQuestions, currentQuestionIndex + 1);
      } else {
        setProfile(prev => ({ ...prev, enfants: false }));
        // Passer à la question suivante (sauter nombreEnfants)
        const nextIndex = currentQuestionIndex + 1;
        if (profileQuestions[nextIndex] === 'nombreEnfants') {
          setCurrentQuestionIndex(prev => prev + 2);
          askNextProfileQuestion(profileQuestions, currentQuestionIndex + 2);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          askNextProfileQuestion(profileQuestions, currentQuestionIndex + 1);
        }
      }
    } else if (currentQuestion === 'situationMatrimoniale') {
      // Mapper les valeurs des boutons vers les textes
      const situationMap = {
        'marie': 'Marié(e)',
        'pacse': 'Pacsé(e)',
        'celibataire': 'Célibataire'
      };
      const situationText = situationMap[value] || value;
      setProfile(prev => ({ ...prev, [currentQuestion]: situationText }));
      
      // Passer à la question suivante
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      askNextProfileQuestion(profileQuestions, nextIndex);
    } else if (currentQuestion === 'situationProfessionnelle') {
      const professionMap = {
        'salarie': 'Salarié',
        'entrepreneur': 'Entrepreneur',
        'retraite': 'Retraité',
        'autre': 'Autre'
      };
      const professionText = professionMap[value] || value;
      setProfile(prev => ({ ...prev, [currentQuestion]: professionText }));
      
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      askNextProfileQuestion(profileQuestions, nextIndex);
    } else if (currentQuestion === 'tmi') {
      if (value === 'tmi_oui') {
        setProfile(prev => ({ ...prev, tmi: 'connu' }));
        // Demander la valeur du TMI
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "Quelle est votre TMI ? (ex: 14%, 30%, 41%, 45%)",
            inputType: 'text'
          });
        }, 500);
        // Ne pas passer à la question suivante, attendre la réponse TMI
      } else {
        setProfile(prev => ({ ...prev, tmi: 'non_connu' }));
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        askNextProfileQuestion(profileQuestions, nextIndex);
      }
    } else if (currentQuestion === 'profilRisque') {
      const risqueMap = {
        'conservateur': 'Conservateur',
        'equilibre': 'Équilibré',
        'dynamique': 'Dynamique'
      };
      const risqueText = risqueMap[value] || value;
      setProfile(prev => ({ ...prev, [currentQuestion]: risqueText }));
      
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      askNextProfileQuestion(profileQuestions, nextIndex);
    } else {
      // Stocker la réponse dans le profil
      setProfile(prev => ({ ...prev, [currentQuestion]: value }));
      
      // Passer à la question suivante
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      askNextProfileQuestion(profileQuestions, nextIndex);
    }

    // Sauvegarder le profil
    await saveSession({ profile: { ...profile, [currentQuestion]: value } });
  };

  const handleTextInput = async (text) => {
    if (currentStep === 'profile') {
      // Pour les champs texte, afficher directement la valeur
      await handleProfileAnswer(text, text);
    } else if (currentStep === 'rdv') {
      await handleRdvInput(text);
    } else if (currentStep === 'rappel') {
      await handleRappelInput(text);
    } else if (currentStep === 'pdf') {
      await handlePdfInput(text);
    }
  };

  const handlePdfInput = async (value) => {
    if (pdfStep === 'email') {
      // Validation basique de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        addMessage('user', value);
        setTimeout(() => {
          addMessage('sara', {
            type: 'message',
            text: "L'adresse email que vous avez saisie ne semble pas valide. Pouvez-vous la ressaisir ?",
            inputType: 'email'
          });
        }, 500);
        return;
      }
      
      setPdfData(prev => ({ ...prev, email: value }));
      addMessage('user', value);
      
      // Sauvegarder l'email avec la session
      await saveSession({ 
        pdfData: { email: value },
        actionFinale: 'pdf',
        status: 'completed'
      });
      
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: `Parfait ! Votre mini-bilan PDF sera généré et vous sera envoyé par email à ${value}. Merci pour votre confiance !`,
          options: null
        });
        setCurrentStep('completed');
      }, 500);
    }
  };

  const handleRappelInput = async (value) => {
    if (rappelStep === 'nom') {
      setRappelData(prev => ({ ...prev, nom: value }));
      setRappelStep('prenom');
      addMessage('user', `Nom: ${value}`);
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Quel est votre prénom ?",
          inputType: 'text'
        });
      }, 500);
    } else if (rappelStep === 'prenom') {
      setRappelData(prev => ({ ...prev, prenom: value }));
      setRappelStep('telephone');
      addMessage('user', `Prénom: ${value}`);
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Quel est votre numéro de téléphone ?",
          inputType: 'tel'
        });
      }, 500);
    } else if (rappelStep === 'telephone') {
      setRappelData(prev => ({ ...prev, telephone: value }));
      setRappelStep('email');
      addMessage('user', `Téléphone: ${value}`);
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Quel est votre adresse email ?",
          inputType: 'email'
        });
      }, 500);
    } else if (rappelStep === 'email') {
      setRappelData(prev => ({ ...prev, email: value }));
      addMessage('user', `Email: ${value}`);
      
      // Sauvegarder les coordonnées dans le profil
      await saveSession({ 
        profile: {
          ...profile,
          nom: rappelData.nom,
          prenom: rappelData.prenom,
          telephone: rappelData.telephone,
          email: value
        },
        actionFinale: 'rappel',
        status: 'completed'
      });
      
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! Un conseiller Azalée vous contactera prochainement au numéro que vous avez indiqué. Merci pour votre confiance !",
          options: null
        });
        setCurrentStep('completed');
      }, 500);
    }
  };

  const handleRdvInput = async (value) => {
    if (rdvStep === 'date') {
      setRdvData(prev => ({ ...prev, date: value }));
      setRdvStep('heure');
      addMessage('user', `Date: ${value}`);
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Parfait ! À quelle heure souhaitez-vous ce rendez-vous ?",
          inputType: 'time'
        });
      }, 500);
    } else if (rdvStep === 'heure') {
      setRdvData(prev => ({ ...prev, heure: value }));
      setRdvStep('canal');
      addMessage('user', `Heure: ${value}`);
      setTimeout(() => {
        addMessage('sara', {
          type: 'message',
          text: "Excellent ! Quel canal préférez-vous pour ce rendez-vous ?",
          options: [
            { text: '📞 Téléphone', value: 'telephone' },
            { text: '💻 Visio', value: 'visio' },
            { text: '🏢 Agence', value: 'agence' }
          ]
        });
      }, 500);
    }
  };

  const handleRdvCanal = async (canal, displayText = null) => {
    const canalText = {
      telephone: 'Téléphone',
      visio: 'Visio',
      agence: 'Agence'
    };
    
    setRdvData(prev => ({ ...prev, canal }));
    
    // Le message utilisateur a déjà été ajouté dans handleOptionClick avec optionText
    // Pas besoin de l'ajouter à nouveau ici
    
    // Sauvegarder le rendez-vous complet
    const rendezVous = {
      date: new Date(rdvData.date),
      heure: rdvData.heure,
      canal
    };
    
    await saveSession({ 
      rendezVous,
      actionFinale: 'rdv',
      status: 'completed'
    });
    
    setTimeout(() => {
      addMessage('sara', {
        type: 'message',
        text: "Parfait, c'est noté ! Un conseiller Azalée vous contactera pour confirmer votre rendez-vous. Merci pour votre confiance !",
        options: null
      });
      setCurrentStep('completed');
    }, 500);
  };

  const renderMessage = (message, index) => {
    if (typeof message.content === 'object' && message.content.type === 'message') {
      const content = message.content;
      return (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-[#253F60] text-white' : 'bg-white text-gray-800'} rounded-lg p-4 shadow-md`}>
            <p className="mb-2">{content.text}</p>
            {content.options && (
              <div className="space-y-2 mt-3">
                {content.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleOptionClick(option.value, option.text)}
                    className="w-full text-left px-4 py-2 bg-[#B99066] hover:bg-[#A67C52] text-white rounded-lg transition-colors text-sm"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
            {content.inputType && (
              <div className="mt-2">
                {content.inputType === 'date' || content.inputType === 'time' ? (
                  <input
                    type={content.inputType}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleTextInput(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                  />
                ) : (
                  <input
                    type={content.inputType}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        handleTextInput(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    onChange={(e) => {
                      // Pour les champs email et tel, on peut aussi valider au blur
                      if (content.inputType === 'email' || content.inputType === 'tel') {
                        // Optionnel: validation en temps réel
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066]"
                    placeholder={
                      content.inputType === 'email' ? 'votre@email.com' :
                      content.inputType === 'tel' ? '06 12 34 56 78' :
                      'Tapez votre réponse...'
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-[#253F60] text-white' : 'bg-white text-gray-800'} rounded-lg p-4 shadow-md`}>
            <p>{message.content}</p>
          </div>
        </div>
      );
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-[9999]"
        aria-label="Ouvrir le chatbot SARAH"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] sm:w-96 max-w-full h-[80vh] sm:h-[600px] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-[9999] border-2 border-[#253F60]/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">S</span>
          </div>
          <div>
            <h3 className="font-cairo font-bold">SARAH</h3>
            <p className="text-xs text-gray-200">Conseiller virtuel</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            // Réinitialiser l'état quand on ferme (optionnel - garder l'historique)
            // setMessages([]);
            // setCurrentStep('welcome');
          }}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}


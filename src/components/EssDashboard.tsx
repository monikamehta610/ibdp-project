import { useState, useEffect } from 'react';
import styles from './EssDashboard.module.css';

interface EssDashboardProps {
  onAskTutor: (text: string) => void;
}

// EVS Quiz questions
const EVS_QUESTIONS = [
  {
    id: 1,
    question: "Who should have the primary authority when making decisions about resource conservation?",
    options: [
      { text: "Local communities, individuals, and indigenous groups working with nature.", type: "eco" },
      { text: "Democratic governments, consensus treaties, and societal regulations.", type: "anthro" },
      { text: "Market forces, scientific councils, and industry innovators.", type: "techno" }
    ]
  },
  {
    id: 2,
    question: "How do you view the role of technology in solving environmental crises?",
    options: [
      { text: "It often creates new unforeseen crises; we must focus on changing our lifestyles.", type: "eco" },
      { text: "It is helpful, but must be heavily regulated by policies prioritizing human welfare.", type: "anthro" },
      { text: "It is our best tool; green tech (fusion, carbon capture) will overcome resource limits.", type: "techno" }
    ]
  },
  {
    id: 3,
    question: "What is the primary value of a tropical rainforest?",
    options: [
      { text: "It has an intrinsic right to exist, regardless of any value to human beings.", type: "eco" },
      { text: "It is a vital resource providing ecosystems services and oxygen for humanity.", type: "anthro" },
      { text: "It holds genetic codes and materials that we can harvest or synthesize for tech.", type: "techno" }
    ]
  },
  {
    id: 4,
    question: "How should our global economic systems be structured?",
    options: [
      { text: "Small-scale, localized economies focused on sufficiency, reduction, and de-growth.", type: "eco" },
      { text: "Mixed economies with carbon taxes, sustainable growth limits, and green subsidies.", type: "anthro" },
      { text: "Free market systems that incentivize innovation and resource substitution.", type: "techno" }
    ]
  },
  {
    id: 5,
    question: "What is the best way to address the global water crisis?",
    options: [
      { text: "Strictly limit personal consumption, restore wetlands, and live within natural cycles.", type: "eco" },
      { text: "Implement state-mandated water quotas, equitable public distribution, and usage fees.", type: "anthro" },
      { text: "Build desalination plants, cloud seeding tech, and smart-grid plumbing systems.", type: "techno" }
    ]
  },
  {
    id: 6,
    question: "Which statement best describes humanity's relationship with the biosphere?",
    options: [
      { text: "We are equal members of the global ecosystem, subject to its ecological laws.", type: "eco" },
      { text: "We are stewards of the Earth, responsible for managing resources for future generations.", type: "anthro" },
      { text: "We are the pioneers who can control, optimize, and engineer the global environment.", type: "techno" }
    ]
  }
];

export interface PracticeQuestion {
  id: number;
  topicId: string;
  topicName: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // Topic 1.1: EVS & Perspectives
  {
    id: 1,
    topicId: "1.1",
    topicName: "Topic 1.1: EVS & Perspectives",
    question: "Which historical event directly led to the establishment of the Minamata Convention on Mercury?",
    options: [
      "The publication of Silent Spring by Rachel Carson (1962)",
      "Bioaccumulation of methylmercury in a Japanese coastal city's food chain (1950s)",
      "The Bhopal chemical gas leak disaster in India (1984)",
      "The Chernobyl nuclear power plant meltdown in Ukraine (1986)"
    ],
    correctAnswer: 1,
    explanation: "The Minamata disaster in the 1950s was caused by the discharge of methylmercury in industrial wastewater, which bioaccumulated in marine life and poisoned local communities, leading to the global treaty on mercury."
  },
  {
    id: 2,
    topicId: "1.1",
    topicName: "Topic 1.1: EVS & Perspectives",
    question: "A person who believes that all living things have intrinsic moral value and that human development should be limited to ecological carrying capacities is best classified as:",
    options: [
      "Deep Ecologist",
      "Soft Technologist",
      "Cornucopian",
      "Environmental Manager"
    ],
    correctAnswer: 0,
    explanation: "Deep Ecologists (extreme ecocentrists) believe in the intrinsic value of nature, the necessity of de-growth/lifestyle limits, and that humans have no right to reduce this richness except for vital needs."
  },
  {
    id: 3,
    topicId: "1.1",
    topicName: "Topic 1.1: EVS & Perspectives",
    question: "How does a cornucopian perspective differ from an environmental manager perspective?",
    options: [
      "Cornucopians advocate for local self-reliance, while environmental managers advocate for global treaties.",
      "Cornucopians believe infinite scientific progress can solve all resource limits, while environmental managers advocate using taxes and legislation to guide growth.",
      "Cornucopians believe in the intrinsic rights of animals, while environmental managers prioritize economic growth.",
      "Cornucopians seek immediate de-growth, while environmental managers seek to engineer global feedback loops."
    ],
    correctAnswer: 1,
    explanation: "Cornucopians (extreme technocentrics) believe the Earth has infinite resources due to human technology and substitution, whereas environmental managers (anthropocentrics) emphasize that growth must be regulated through carbon taxes, legislation, and public policies."
  },
  {
    id: 4,
    topicId: "1.1",
    topicName: "Topic 1.1: EVS & Perspectives",
    question: "Which of the following books is credited with initiating the modern environmental movement by exposing the dangers of chemical pesticides like DDT?",
    options: [
      "The Limits to Growth (Club of Rome)",
      "Gaia (James Lovelock)",
      "Silent Spring (Rachel Carson)",
      "Our Common Future (Brundtland Report)"
    ],
    correctAnswer: 2,
    explanation: "Rachel Carson's 'Silent Spring' (1962) documented the bioaccumulation of DDT and other synthetic pesticides in the food chain, sparking widespread public awareness and the ban of DDT."
  },
  {
    id: 5,
    topicId: "1.1",
    topicName: "Topic 1.1: EVS & Perspectives",
    question: "Which combination represents a technocentric response to greenhouse gas emissions?",
    options: [
      "Implementing carbon taxation and public transportation subsidies.",
      "Implementing carbon capture and storage (CCS) and researching stratospheric aerosol injection.",
      "Encouraging community-scale permaculture and transitioning to low-energy voluntary simplicity.",
      "Enforcing strict mandatory quotas on flight travels."
    ],
    correctAnswer: 1,
    explanation: "Using technology to capture carbon or engineer the climate represents a technocentric worldview, seeking to solve the issue through technological solutions rather than changing lifestyle (ecocentrism) or law (anthropocentrism)."
  },
  // Topic 1.2: Systems & Models
  {
    id: 6,
    topicId: "1.2",
    topicName: "Topic 1.2: Systems & Models",
    question: "A sealed, glass terrarium containing soil, plants, water, and air, placed on a sunny windowsill, represents what type of system?",
    options: [
      "An open system",
      "A closed system",
      "An isolated system",
      "A static system"
    ],
    correctAnswer: 1,
    explanation: "A closed system exchanges energy (solar radiation in, heat radiating out) but does not exchange matter with its surroundings, which matches a sealed glass terrarium."
  },
  {
    id: 7,
    topicId: "1.2",
    topicName: "Topic 1.2: Systems & Models",
    question: "In systems diagrams, what do boxes and arrows represent, respectively?",
    options: [
      "Boxes represent flows; arrows represent boundary limits.",
      "Boxes represent inputs; arrows represent outputs.",
      "Boxes represent storages; arrows represent flows (transfers or transformations).",
      "Boxes represent feedback loops; arrows represent thermodynamic entropy."
    ],
    correctAnswer: 2,
    explanation: "In systems thinking, boxes/rectangles symbolize storages (where matter/energy is held) and arrows represent the flows (transfers or transformations) moving matter or energy."
  },
  {
    id: 8,
    topicId: "1.2",
    topicName: "Topic 1.2: Systems & Models",
    question: "What is the difference between a transfer and a transformation in a system's flows?",
    options: [
      "Transfers exchange matter; transformations exchange only energy.",
      "Transfers involve a change of state or chemical composition; transformations only change location.",
      "Transfers only change location without changing chemical state; transformations involve a change of state, chemistry, or energy form.",
      "Transfers represent negative feedback; transformations represent positive feedback."
    ],
    correctAnswer: 2,
    explanation: "A transfer is a flow that changes location (e.g., wind blowing dust, river water flowing). A transformation is a flow that changes state or chemistry (e.g., evaporation of water, photosynthesis converting solar energy to chemical energy)."
  },
  {
    id: 9,
    topicId: "1.2",
    topicName: "Topic 1.2: Systems & Models",
    question: "Why are models in environmental science considered both essential and inherently limited?",
    options: [
      "They can predict future trends with 100% accuracy but are too expensive to build.",
      "They simplify complex real-world variables for easier analysis, but this simplification means they lose detail and rely on assumptions.",
      "They only work for closed systems and cannot model open ecosystems.",
      "They are governed by subjective opinions rather than empirical mathematical equations."
    ],
    correctAnswer: 1,
    explanation: "Models are simplified representations of reality. While they help us visualize, simulate, and predict complex systems, their main limitation is that they make assumptions and omit many micro-variables to remain computable."
  },
  {
    id: 10,
    topicId: "1.2",
    topicName: "Topic 1.2: Systems & Models",
    question: "An ecosystem that remains in a steady-state equilibrium despite fluctuations is exhibiting what system characteristic?",
    options: [
      "Positive feedback dominance",
      "Thermodynamic instability",
      "Resilience governed by negative feedback",
      "High entropy collapse"
    ],
    correctAnswer: 2,
    explanation: "Resilience is the capacity of a system to withstand disturbance and return to its stable equilibrium. This self-regulation is driven by negative feedback loops that counteract changes."
  },
  // Topic 1.3: Energy & Equilibria
  {
    id: 11,
    topicId: "1.3",
    topicName: "Topic 1.3: Energy & Equilibria",
    question: "Which law of thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another?",
    options: [
      "The First Law of Thermodynamics",
      "The Second Law of Thermodynamics",
      "The Third Law of Thermodynamics",
      "The Law of Conservation of Matter"
    ],
    correctAnswer: 0,
    explanation: "The First Law of Thermodynamics (Law of Conservation of Energy) states that the total energy in an isolated system remains constant; it can change forms (e.g., light to heat) but cannot be created or destroyed."
  },
  {
    id: 12,
    topicId: "1.3",
    topicName: "Topic 1.3: Energy & Equilibria",
    question: "What is the ecological consequence of the Second Law of Thermodynamics?",
    options: [
      "High trophic levels have more energy than primary producers.",
      "Energy is lost as heat in food chains, resulting in only about 10% efficiency of energy transfer between trophic levels.",
      "Matter accumulates at higher trophic levels (bioaccumulation).",
      "Nutrients recycle continuously without any losses to space."
    ],
    correctAnswer: 1,
    explanation: "The Second Law states that in any energy transfer, entropy increases, meaning energy is dispersed into lower-quality forms (heat). In ecosystems, this explains why only ~10% of energy is passed to the next trophic level, creating a pyramid of energy."
  },
  {
    id: 13,
    topicId: "1.3",
    topicName: "Topic 1.3: Energy & Equilibria",
    question: "How does a positive feedback loop affect a system's stability?",
    options: [
      "It stabilizes the system around a steady-state setpoint.",
      "It decreases entropy and prevents any change.",
      "It amplifies deviation from the starting state, potentially driving the system past a tipping point.",
      "It ensures that inputs always equal outputs."
    ],
    correctAnswer: 2,
    explanation: "Positive feedback loops amplify or reinforce change, driving the system further away from its original equilibrium. This can destabilize the system and push it past a critical threshold or tipping point."
  },
  {
    id: 14,
    topicId: "1.3",
    topicName: "Topic 1.3: Energy & Equilibria",
    question: "In systems science, what is a 'tipping point'?",
    options: [
      "The exact center of gravity in a ternary EVS plot.",
      "The moment a predator-prey relationship achieves stable homeostasis.",
      "A critical threshold where a small change pushes the system into a completely new stable state.",
      "The point where energy inputs equal the rate of primary production."
    ],
    correctAnswer: 2,
    explanation: "A tipping point is a threshold where even a small additional disturbance will trigger a runaway shift (driven by positive feedback) into a completely different stable equilibrium or state, which is often difficult or impossible to reverse."
  },
  {
    id: 15,
    topicId: "1.3",
    topicName: "Topic 1.3: Energy & Equilibria",
    question: "Which of the following is a classic example of a positive feedback loop in global climate systems?",
    options: [
      "Increased temperature -> more evaporation -> more low clouds -> more solar reflection -> cooling.",
      "Higher atmospheric CO2 -> increased plant growth -> higher carbon absorption -> cooling.",
      "Rising temperature -> melting permafrost -> release of methane gas -> enhanced greenhouse effect -> higher temperature.",
      "Ocean acidification -> dissolution of shells -> buffering of marine pH -> stable pH."
    ],
    correctAnswer: 2,
    explanation: "Rising temperatures melt permafrost, which releases trapped greenhouse gases (methane and CO2), which traps more heat, leading to even higher temperatures. This is a reinforcing loop."
  },
  // Topic 1.4: Sustainability
  {
    id: 16,
    topicId: "1.4",
    topicName: "Topic 1.4: Sustainability",
    question: "What is the relation between natural capital and natural income?",
    options: [
      "Natural capital is the annual harvest; natural income is the total soil volume.",
      "Natural capital is the standing stock of natural resources; natural income is the sustainable yield or interest generated by that capital.",
      "Natural capital represents technocentric assets; natural income represents ecocentric values.",
      "Natural capital is measured in carbon footprints; natural income is measured in GDP."
    ],
    correctAnswer: 1,
    explanation: "Natural capital represents the resource stock (e.g., a lake or forest), while natural income is the flow of valuable services or yield (e.g., fish caught sustainably, wood harvested) that can be generated annually without depleting the capital."
  },
  {
    id: 17,
    topicId: "1.4",
    topicName: "Topic 1.4: Sustainability",
    question: "An Environmental Impact Assessment (EIA) is prepared before a major development project. What is its main purpose?",
    options: [
      "To guarantee that a project will cause zero environmental impact.",
      "To establish a baseline study of the existing environment, assess potential environmental consequences, and suggest mitigation strategies.",
      "To calculate the exact financial cost of ecological damage.",
      "To legally enforce ecocentric values on private developers."
    ],
    correctAnswer: 1,
    explanation: "An EIA is a decision-making tool. It establishes a baseline study of the current ecosystem, predicts the potential impacts of a proposed development, proposes options to mitigate or reduce harm, and outlines a monitoring plan."
  },
  {
    id: 18,
    topicId: "1.4",
    topicName: "Topic 1.4: Sustainability",
    question: "The term 'ecological footprint' is best defined as:",
    options: [
      "The physical weight of humans pressing down on agricultural soil.",
      "The total land and water area required to sustainably provide all resources consumed and assimilate all waste produced by a population.",
      "The percentage of a nation's energy derived from fossil fuels.",
      "The total distance a consumer's food travels from farm to plate."
    ],
    correctAnswer: 1,
    explanation: "Ecological footprint measures the biocapacity required (in global hectares) to sustain a person's or population's consumption habits and absorb their carbon waste."
  },
  {
    id: 19,
    topicId: "1.4",
    topicName: "Topic 1.4: Sustainability",
    question: "What does a country's 'overshoot day' indicate?",
    options: [
      "The day when the country's population exceeds its total housing capacity.",
      "The day of the year when the nation's resource consumption exceeds the Earth's biological capacity to regenerate those resources in that year.",
      "The day when industrial factories emit more carbon than the state carbon quota allows.",
      "The date when a country imports more natural income than it exports."
    ],
    correctAnswer: 1,
    explanation: "Overshoot Day marks the date when humanity's (or a specific nation's) demand for ecological resources and services in that year exceeds what Earth can regenerate in that entire year."
  },
  {
    id: 20,
    topicId: "1.4",
    topicName: "Topic 1.4: Sustainability",
    question: "Why is 'sustainable development' defined by the Brundtland Commission as meeting the needs of the present without compromising the ability of future generations to meet their own needs?",
    options: [
      "Because it prioritizes complete conservation and bans any resource harvesting.",
      "Because it balances ecological, economic, and social needs to prevent long-term natural capital depletion.",
      "Because it relies entirely on technocentric geoengineering solutions.",
      "Because it seeks to maximize short-term capital returns for developing nations."
    ],
    correctAnswer: 1,
    explanation: "The Brundtland definition emphasizes intergenerational equity and the integration of social, economic, and environmental pillars, aiming to manage resources so they are not degraded or depleted for the future."
  }
];

export default function EssDashboard({ onAskTutor }: EssDashboardProps) {
  const [activeTab, setActiveTab] = useState<'evs' | 'practice' | 'systems' | 'sustainability' | 'guide'>('evs');

  // --- EVS State ---
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [evsScores, setEvsScores] = useState({ eco: 33, anthro: 33, techno: 34 });

  // --- Practice Quiz State ---
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // '1.1' | '1.2' | '1.3' | '1.4' | 'mixed' | null
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [practiceQuizFinished, setPracticeQuizFinished] = useState<boolean>(false);

  const startPracticeQuiz = (topicId: string) => {
    setSelectedTopic(topicId);
    let questionsPool: PracticeQuestion[] = [];
    if (topicId === 'mixed') {
      const shuffled = [...PRACTICE_QUESTIONS].sort(() => 0.5 - Math.random());
      questionsPool = shuffled.slice(0, 10);
    } else {
      questionsPool = PRACTICE_QUESTIONS.filter(q => q.topicId === topicId);
    }
    setPracticeQuestions(questionsPool);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizSubmitted(false);
    setCorrectAnswersCount(0);
    setPracticeQuizFinished(false);
  };

  const handlePracticeAnswerSelect = (optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIdx(optionIdx);
  };

  const submitPracticeAnswer = () => {
    if (selectedOptionIdx === null || quizSubmitted) return;
    const currentQ = practiceQuestions[currentQuestionIdx];
    const isCorrect = selectedOptionIdx === currentQ.correctAnswer;
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const nextPracticeQuestion = () => {
    if (currentQuestionIdx + 1 < practiceQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setQuizSubmitted(false);
    } else {
      setPracticeQuizFinished(true);
    }
  };

  const resetPracticeQuiz = () => {
    setSelectedTopic(null);
    setPracticeQuestions([]);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizSubmitted(false);
    setCorrectAnswersCount(0);
    setPracticeQuizFinished(false);
  };

  // Handle option click
  const handleQuizAnswer = (qId: number, type: string) => {
    const nextAnswers = { ...quizAnswers, [qId]: type };
    setQuizAnswers(nextAnswers);

    // If completed all questions
    if (Object.keys(nextAnswers).length === EVS_QUESTIONS.length) {
      calculateEvsScores(nextAnswers);
    }
  };

  const calculateEvsScores = (answers: Record<number, string>) => {
    let eco = 0, anthro = 0, techno = 0;
    Object.values(answers).forEach(val => {
      if (val === 'eco') eco++;
      else if (val === 'anthro') anthro++;
      else if (val === 'techno') techno++;
    });
    const total = eco + anthro + techno;
    setEvsScores({
      eco: Math.round((eco / total) * 100),
      anthro: Math.round((anthro / total) * 100),
      techno: Math.round((techno / total) * 100),
    });
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizFinished(false);
  };

  // Convert EVS scores to barycentric coordinates for Ternary plot
  // Vertices of triangle: Eco (top: 150, 20), Anthro (bottom-left: 30, 230), Techno (bottom-right: 270, 230)
  const getTernaryCoords = () => {
    const Ax = 150, Ay = 25;  // Eco
    const Bx = 30,  By = 225; // Anthro
    const Cx = 270, Cy = 225; // Techno

    const e = evsScores.eco / 100;
    const a = evsScores.anthro / 100;
    const t = evsScores.techno / 100;

    const x = e * Ax + a * Bx + t * Cx;
    const y = e * Ay + a * By + t * Cy;
    return { x, y };
  };

  const ternaryPoint = getTernaryCoords();

  // --- Systems Simulator State ---
  const [simPreset, setSimPreset] = useState<'albedo' | 'thermostat' | 'eutrophication'>('albedo');
  const [inflow, setInflow] = useState(5);
  const [feedbackStrength, setFeedbackStrength] = useState(5);
  const [initialStorage, setInitialStorage] = useState(15);
  const [simData, setSimData] = useState<{ x: number; y: number }[]>([]);

  // Auto run when parameters change or preset changes
  useEffect(() => {
    runSimulation();
  }, [simPreset, inflow, feedbackStrength, initialStorage]);

  const runSimulation = () => {
    const data = [];
    let current = initialStorage;

    if (simPreset === 'albedo') {
      // Positive feedback loop
      // S_t+1 = S_t + [absorbed solar - radiative cooling]
      // absorbed = Solar(inflow) * (1 - albedo). albedo drops as temperature rises.
      for (let t = 0; t <= 40; t++) {
        data.push({ x: t, y: current });
        const albedo = Math.max(0.1, Math.min(0.8, 0.7 - (feedbackStrength * 0.04) * (current / 20)));
        const energyIn = inflow * 4 * (1 - albedo);
        const cooling = current * 0.6;
        current = current + (energyIn - cooling) * 0.2;
        current = Math.max(0, Math.min(80, current));
      }
    } else if (simPreset === 'thermostat') {
      // Negative feedback loop
      // Standard homeostasis simulation
      const setpoint = 20;
      for (let t = 0; t <= 40; t++) {
        data.push({ x: t, y: current });
        const error = setpoint - current;
        // heater outputs relative to error and feedback strength
        const heater = error > 0 ? error * (feedbackStrength * 0.15) : 0;
        // environmental loss
        const loss = (current - (inflow * 2)) * 0.15;
        current = current + (heater - loss);
        current = Math.max(0, current);
      }
    } else {
      // Eutrophication / Tipping Point
      // S = Algae concentration
      // Inflow = Nutrient load (inflow)
      // Feedback = Grazing capacity failure
      // Under threshold, grazing controls algae. Over threshold, algae runs away.
      const tippingPoint = 30;
      for (let t = 0; t <= 40; t++) {
        data.push({ x: t, y: current });
        const growth = current * (inflow * 0.05);
        const maxGrazing = feedbackStrength * 1.5;
        const grazing = Math.min(current * 0.25, maxGrazing);
        
        let collapseEffect = 0;
        if (current > tippingPoint) {
          // positive feedback of anoxic decomposition: algae blooms, dies, creates more nutrient cycling
          collapseEffect = (current - tippingPoint) * 0.08;
        }

        current = current + (growth + collapseEffect - grazing);
        current = Math.max(1, Math.min(100, current));
      }
    }
    setSimData(data);
  };

  // Preset configuration setups
  const handlePresetSelect = (preset: 'albedo' | 'thermostat' | 'eutrophication') => {
    setSimPreset(preset);
    if (preset === 'albedo') {
      setInflow(6); // Solar constant
      setFeedbackStrength(5); // Albedo feedback
      setInitialStorage(12); // Initial Temp
    } else if (preset === 'thermostat') {
      setInflow(5); // Outside Temp (base heating)
      setFeedbackStrength(6); // Thermostat sensitivity
      setInitialStorage(8); // Room Temp starts cold
    } else {
      setInflow(4); // Nutrient inflow
      setFeedbackStrength(5); // Grazing strength
      setInitialStorage(8); // Initial algae
    }
  };

  // --- Sustainability State ---
  const [diet, setDiet] = useState<'vegan' | 'vegetarian' | 'average' | 'meatHeavy'>('average');
  const [energy, setEnergy] = useState<'clean' | 'mixed' | 'coalGas'>('mixed');
  const [transport, setTransport] = useState<'active' | 'public' | 'electric' | 'gasCar'>('public');
  const [consumption, setConsumption] = useState<'low' | 'avg' | 'high'>('avg');

  const calculateFootprint = () => {
    // Math to compute global hectares
    let footprint = 0;
    
    // Diet component
    if (diet === 'vegan') footprint += 1.2;
    else if (diet === 'vegetarian') footprint += 1.8;
    else if (diet === 'average') footprint += 3.2;
    else footprint += 5.2;

    // Energy component
    if (energy === 'clean') footprint += 0.3;
    else if (energy === 'mixed') footprint += 1.2;
    else footprint += 2.5;

    // Transport component
    if (transport === 'active') footprint += 0.1;
    else if (transport === 'electric') footprint += 0.6;
    else if (transport === 'public') footprint += 0.9;
    else footprint += 2.8;

    // Consumption component
    if (consumption === 'low') footprint += 0.6;
    else if (consumption === 'avg') footprint += 1.4;
    else footprint += 2.8;

    const earths = footprint / 1.7; // 1.7 gha is global carrying capacity per person
    
    // Overshoot day (day of year)
    const overshootDayIdx = Math.round(365 / Math.max(1, earths));
    const overshootDate = getOvershootDateString(overshootDayIdx);

    return {
      gha: footprint.toFixed(1),
      earths: earths.toFixed(2),
      overshootDate,
    };
  };

  const getOvershootDateString = (dayIdx: number) => {
    if (dayIdx >= 365) return "No overshoot (Sustainable!)";
    const date = new Date(2026, 0, dayIdx);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const footprintResult = calculateFootprint();

  // --- Helpers for graph SVGs ---
  const getSvgPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    // SVG width: 300, height: 140
    // X goes from 0 to 40, Y goes from 0 to max depending on preset
    const maxX = 40;
    const maxY = simPreset === 'eutrophication' ? 100 : simPreset === 'albedo' ? 80 : 30;

    return points.reduce((path, p, i) => {
      const sx = (p.x / maxX) * 280 + 10;
      const sy = 140 - (p.y / maxY) * 120 - 10;
      return path + `${i === 0 ? 'M' : 'L'} ${sx} ${sy}`;
    }, '');
  };

  // Guide accordion buttons helper
  const handleGuideAsk = (topic: string, question: string) => {
    onAskTutor(`Let's discuss ${topic}. Specifically: ${question}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.tabsHeader}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'evs' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('evs')}
        >
          ☯️ EVS Quiz
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'practice' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          📝 Practice Quiz
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'systems' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('systems')}
        >
          🔄 Systems Sim
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'sustainability' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('sustainability')}
        >
          🌍 Footprint
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'guide' ? styles.activeTabBtn : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          📖 Guide
        </button>
      </header>

      <main className={styles.contentArea}>
        {/* --- EVS TAB --- */}
        {activeTab === 'evs' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 className={styles.sectionTitle}>Environmental Value Systems</h3>
            <p className={styles.sectionSubtitle}>
              An EVS shapes how we perceive and evaluate environmental issues. It is influenced by cultural, economic, and political contexts.
            </p>

            {!quizFinished ? (
              <div>
                {EVS_QUESTIONS.map((q) => {
                  const currentAnswer = quizAnswers[q.id];
                  // Only show current unanswered question, or show all? Let's show one by one for clean layout
                  const answeredCount = Object.keys(quizAnswers).length;
                  if (q.id !== answeredCount + 1) return null;

                  return (
                    <div key={q.id} className={styles.quizCard}>
                      <span className={styles.questionNum}>Question {q.id} of {EVS_QUESTIONS.length}</span>
                      <h4 className={styles.questionText}>{q.question}</h4>
                      <div className={styles.optionsList}>
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            className={`${styles.optionBtn} ${currentAnswer === opt.type ? styles.selectedOption : ''}`}
                            onClick={() => handleQuizAnswer(q.id, opt.type)}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.resultsContainer}>
                <h4 className={styles.questionText} style={{ textAlign: 'center', marginBottom: 5 }}>Your EVS Profile</h4>

                <div className={styles.ternaryWrapper}>
                  <svg className={styles.ternaryPlot} viewBox="0 0 300 250">
                    <defs>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    {/* Background Triangle */}
                    <polygon points="150,25 30,225 270,225" fill="rgba(255,255,255,0.01)" stroke="var(--bg-border)" strokeWidth="2" />
                    
                    {/* Gridlines */}
                    <line x1="150" y1="25" x2="150" y2="225" stroke="var(--bg-border)" strokeDasharray="3,3" />
                    <line x1="30" y1="225" x2="210" y2="125" stroke="var(--bg-border)" strokeDasharray="3,3" />
                    <line x1="270" y1="225" x2="90" y2="125" stroke="var(--bg-border)" strokeDasharray="3,3" />

                    {/* Vertices Labels */}
                    <text x="150" y="15" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">ECOCENTRIC</text>
                    <text x="25" y="240" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">ANTHROPOCENTRIC</text>
                    <text x="275" y="240" fill="#3b82f6" fontSize="10" textAnchor="middle" fontWeight="bold">TECHNOCENTRIC</text>

                    {/* Result Point */}
                    <circle cx={ternaryPoint.x} cy={ternaryPoint.y} r="7" fill="var(--accent-gold)" stroke="#fff" strokeWidth="2" filter="url(#glow)" />
                  </svg>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Ecocentrism</span>
                    <span className={`${styles.statVal} ${styles.ecoColor}`}>{evsScores.eco}%</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Anthropos</span>
                    <span className={`${styles.statVal} ${styles.anthroColor}`}>{evsScores.anthro}%</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Techno</span>
                    <span className={`${styles.statVal} ${styles.technoColor}`}>{evsScores.techno}%</span>
                  </div>
                </div>

                <p className={styles.guideDesc} style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: 5 }}>
                  You lean towards an <strong>
                    {evsScores.eco >= Math.max(evsScores.anthro, evsScores.techno) && 'Ecocentric'}
                    {evsScores.anthro >= Math.max(evsScores.eco, evsScores.techno) && 'Anthropocentric'}
                    {evsScores.techno >= Math.max(evsScores.eco, evsScores.anthro) && 'Technocentric'}
                  </strong> perspective. Discuss this output with the AI Tutor to understand how this shapes your solutions to environmental issues.
                </p>

                <button
                  className={styles.askTutorBtn}
                  onClick={() => onAskTutor(`Here is my EVS Profile: Ecocentrism: ${evsScores.eco}%, Anthropocentrism: ${evsScores.anthro}%, Technocentrism: ${evsScores.techno}%. What does this suggest about my view on global resource management and climate action?`)}
                  style={{ width: '100%', padding: '10px' }}
                >
                  💬 Discuss Profile with AI Tutor
                </button>

                <button className={styles.resetBtn} onClick={resetQuiz}>
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- PRACTICE QUIZ TAB --- */}
        {activeTab === 'practice' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {selectedTopic === null ? (
              <div>
                <h3 className={styles.sectionTitle}>📝 Topic 1 Practice Quizzes</h3>
                <p className={styles.sectionSubtitle}>
                  Select a topic to test your knowledge with focused 5-question quizzes, or challenge yourself with a 10-question randomized mock exam.
                </p>
                
                <div className={styles.topicSelectionGrid}>
                  <div className={styles.topicCard} onClick={() => startPracticeQuiz('1.1')}>
                    <div className={styles.topicCardIcon}>☯️</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Topic 1.1: EVS & Perspectives</h4>
                      <p className={styles.topicCardDesc}>Environmental Value Systems, historical influences (Silent Spring, Minamata), and ecocentric/anthropocentric/technocentric worldviews.</p>
                      <span className={styles.topicCardCount}>5 Questions</span>
                    </div>
                  </div>

                  <div className={styles.topicCard} onClick={() => startPracticeQuiz('1.2')}>
                    <div className={styles.topicCardIcon}>🔄</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Topic 1.2: Systems & Models</h4>
                      <p className={styles.topicCardDesc}>Open, closed, and isolated systems, storages and flows, transfers and transformations, and limits of models.</p>
                      <span className={styles.topicCardCount}>5 Questions</span>
                    </div>
                  </div>

                  <div className={styles.topicCard} onClick={() => startPracticeQuiz('1.3')}>
                    <div className={styles.topicCardIcon}>🌡️</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Topic 1.3: Energy & Equilibria</h4>
                      <p className={styles.topicCardDesc}>Laws of Thermodynamics in ecosystems, positive and negative feedback loops, homeostasis, resilience, and tipping points.</p>
                      <span className={styles.topicCardCount}>5 Questions</span>
                    </div>
                  </div>

                  <div className={styles.topicCard} onClick={() => startPracticeQuiz('1.4')}>
                    <div className={styles.topicCardIcon}>🌍</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Topic 1.4: Sustainability & Capital</h4>
                      <p className={styles.topicCardDesc}>Natural capital and natural income, ecological footprint, overshoot day, Environmental Impact Assessments (EIAs), and sustainable yields.</p>
                      <span className={styles.topicCardCount}>5 Questions</span>
                    </div>
                  </div>

                  <div className={`${styles.topicCard} ${styles.mixedTopicCard}`} onClick={() => startPracticeQuiz('mixed')}>
                    <div className={styles.topicCardIcon}>🎓</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Mixed Topic 1 Mock Exam</h4>
                      <p className={styles.topicCardDesc}>A randomized, comprehensive evaluation featuring 10 questions drawn from all Topic 1 Foundation subtopics.</p>
                      <span className={styles.topicCardCount}>10 Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : !practiceQuizFinished ? (
              <div className={styles.quizSessionContainer}>
                <div className={styles.quizSessionHeader}>
                  <button className={styles.backBtn} onClick={resetPracticeQuiz}>
                    ⬅️ Exit Quiz
                  </button>
                  <span className={styles.quizProgress}>
                    Question {currentQuestionIdx + 1} of {practiceQuestions.length}
                  </span>
                </div>

                {practiceQuestions[currentQuestionIdx] && (() => {
                  const q = practiceQuestions[currentQuestionIdx];
                  return (
                    <div className={styles.practiceQuizCard}>
                      <span className={styles.practiceQuestionTopic}>{q.topicName}</span>
                      <h4 className={styles.practiceQuestionText}>{q.question}</h4>
                      
                      <div className={styles.practiceOptionsList}>
                        {q.options.map((opt, idx) => {
                          let btnClass = styles.practiceOptionBtn;
                          if (selectedOptionIdx === idx) {
                            btnClass += ` ${styles.practiceSelectedOption}`;
                          }
                          if (quizSubmitted) {
                            if (idx === q.correctAnswer) {
                              btnClass += ` ${styles.practiceCorrectOption}`;
                            } else if (selectedOptionIdx === idx) {
                              btnClass += ` ${styles.practiceIncorrectOption}`;
                            } else {
                              btnClass += ` ${styles.practiceDisabledOption}`;
                            }
                          }
                          return (
                            <button
                              key={idx}
                              className={btnClass}
                              disabled={quizSubmitted}
                              onClick={() => handlePracticeAnswerSelect(idx)}
                            >
                              <span className={styles.optionLetter}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className={styles.optionTextContent}>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={styles.explanationBox} style={{ animation: 'fadeIn 0.3s ease' }}>
                          <h5 className={styles.explanationTitle} style={{ color: selectedOptionIdx === q.correctAnswer ? '#10b981' : '#ef4444' }}>
                            {selectedOptionIdx === q.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
                          </h5>
                          <p className={styles.explanationText}>{q.explanation}</p>
                          
                          <div className={styles.explanationActions}>
                            <button
                              className={styles.askTutorBtn}
                              onClick={() => onAskTutor(`Let's discuss this IBDP ESS question on "${q.topicName}":\n\n"${q.question}"\n\nOptions:\n- A: ${q.options[0]}\n- B: ${q.options[1]}\n- C: ${q.options[2]}\n- D: ${q.options[3]}\n\nCorrect Answer: ${q.options[q.correctAnswer]}\n\nYour explanation states: "${q.explanation}". Can you expand on the core concepts here?`)}
                            >
                              💬 Discuss Question with AI Tutor
                            </button>
                          </div>
                        </div>
                      )}

                      <div className={styles.quizControlsRow}>
                        {!quizSubmitted ? (
                          <button
                            className={styles.simActionBtn}
                            disabled={selectedOptionIdx === null}
                            onClick={submitPracticeAnswer}
                            style={{ opacity: selectedOptionIdx === null ? 0.5 : 1, cursor: selectedOptionIdx === null ? 'not-allowed' : 'pointer' }}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <button
                            className={styles.simActionBtn}
                            onClick={nextPracticeQuestion}
                          >
                            {currentQuestionIdx + 1 === practiceQuestions.length ? "Finish Quiz" : "Next Question ➡️"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className={styles.resultsContainer} style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 className={styles.sectionTitle}>🏆 Quiz Results</h3>
                <p className={styles.sectionSubtitle}>
                  Here is a summary of your performance on {selectedTopic === 'mixed' ? 'Mixed Topic 1 Mock Exam' : `Topic ${selectedTopic}`}.
                </p>

                <div className={styles.scoreCircle}>
                  <span className={styles.scoreNum}>{correctAnswersCount} / {practiceQuestions.length}</span>
                  <span className={styles.scorePercent}>{Math.round((correctAnswersCount / practiceQuestions.length) * 100)}%</span>
                </div>

                <div className={styles.resultFeedbackBox}>
                  {(() => {
                    const pct = Math.round((correctAnswersCount / practiceQuestions.length) * 100);
                    if (pct >= 85) {
                      return (
                        <>
                          <h4 className={styles.feedbackTitle} style={{ color: '#10b981' }}>🎓 Excellent Mastery!</h4>
                          <p className={styles.feedbackText}>
                            You have demonstrated excellent understanding of these Topic 1 foundations. Ask the AI Tutor to challenge you with Paper 2 short-answer questions!
                          </p>
                        </>
                      );
                    } else if (pct >= 60) {
                      return (
                        <>
                          <h4 className={styles.feedbackTitle} style={{ color: '#f59e0b' }}>📚 Solid Progress</h4>
                          <p className={styles.feedbackText}>
                            You have a good grasp of the basic concepts, but there is room for improvement. Ask the AI Tutor to review the questions you got wrong.
                          </p>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <h4 className={styles.feedbackTitle} style={{ color: '#ef4444' }}>📖 Study Focus Required</h4>
                          <p className={styles.feedbackText}>
                            It looks like you need to spend more time studying this subtopic. Click below to start an interactive study session with the AI Tutor!
                          </p>
                        </>
                      );
                    }
                  })()}
                </div>

                <div className={styles.resultActionsRow}>
                  <button className={styles.resetBtn} onClick={resetPracticeQuiz} style={{ flex: 1, margin: 0, padding: '12px' }}>
                    🔄 Try Another Quiz
                  </button>
                  <button
                    className={styles.askTutorBtn}
                    style={{ flex: 1, padding: '12px' }}
                    onClick={() => {
                      const topicText = selectedTopic === 'mixed' ? "Topic 1 Foundations" : `Topic ${selectedTopic}`;
                      onAskTutor(`I just finished a practice quiz on ${topicText} and scored ${correctAnswersCount}/${practiceQuestions.length} (${Math.round((correctAnswersCount / practiceQuestions.length) * 100)}%). Let's start a focused review session on the questions I struggled with.`);
                    }}
                  >
                    💬 Start Tutor Review
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- SYSTEMS SIMULATOR TAB --- */}
        {activeTab === 'systems' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 className={styles.sectionTitle}>Systems & Feedbacks</h3>
            <p className={styles.sectionSubtitle}>
              Systems thinking models inputs, storages, flows, and feedback loops. Run numerical simulations to see system behaviors.
            </p>

            <div className={styles.presetsRow}>
              <button
                className={`${styles.presetBtn} ${simPreset === 'albedo' ? styles.activePresetBtn : ''}`}
                onClick={() => handlePresetSelect('albedo')}
              >
                🌞 Ice-Albedo (+)
              </button>
              <button
                className={`${styles.presetBtn} ${simPreset === 'thermostat' ? styles.activePresetBtn : ''}`}
                onClick={() => handlePresetSelect('thermostat')}
              >
                🌡️ Homeostasis (-)
              </button>
              <button
                className={`${styles.presetBtn} ${simPreset === 'eutrophication' ? styles.activePresetBtn : ''}`}
                onClick={() => handlePresetSelect('eutrophication')}
              >
                ☣️ Tipping Point
              </button>
            </div>

            <div className={styles.simulatorBox}>
              <div className={styles.chartContainer}>
                <svg className={styles.chartSvg} viewBox="0 0 300 140">
                  {/* Grid Lines */}
                  <line x1="10" y1="10" x2="10" y2="130" stroke="var(--bg-border)" />
                  <line x1="10" y1="130" x2="290" y2="130" stroke="var(--bg-border)" />
                  <line x1="10" y1="70" x2="290" y2="70" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
                  
                  {/* Threshold Line for Tipping point */}
                  {simPreset === 'eutrophication' && (
                    <>
                      <line x1="10" y1="94" x2="290" y2="94" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="4,4" />
                      <text x="15" y="90" fill="#ef4444" fontSize="6" fontFamily="monospace">TIPPING THRESHOLD</text>
                    </>
                  )}

                  {/* Curve Path */}
                  <path
                    d={getSvgPath(simData)}
                    fill="none"
                    stroke={simPreset === 'albedo' ? '#ef4444' : simPreset === 'thermostat' ? '#10b981' : '#a855f7'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Labels */}
                  <text x="12" y="18" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace">
                    {simPreset === 'albedo' && 'Temp (°C)'}
                    {simPreset === 'thermostat' && 'Room Temp (°C)'}
                    {simPreset === 'eutrophication' && 'Algae level (%)'}
                  </text>
                  <text x="280" y="125" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="end">Time</text>
                </svg>
              </div>

              <div className={styles.controlsGrid}>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>
                      {simPreset === 'albedo' && 'Solar Intensity'}
                      {simPreset === 'thermostat' && 'Outside Temp'}
                      {simPreset === 'eutrophication' && 'Nutrient Runoff'}
                    </span>
                    <span className={styles.sliderVal}>{inflow}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={inflow}
                    onChange={(e) => setInflow(Number(e.target.value))}
                    className={styles.sliderInput}
                  />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Feedback Strength</span>
                    <span className={styles.sliderVal}>{feedbackStrength}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={feedbackStrength}
                    onChange={(e) => setFeedbackStrength(Number(e.target.value))}
                    className={styles.sliderInput}
                  />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.sliderHeader}>
                    <span>Initial State</span>
                    <span className={styles.sliderVal}>{initialStorage}</span>
                  </div>
                  <input
                    type="range"
                    min={simPreset === 'eutrophication' ? 1 : 5}
                    max={simPreset === 'eutrophication' ? 50 : 25}
                    value={initialStorage}
                    onChange={(e) => setInitialStorage(Number(e.target.value))}
                    className={styles.sliderInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.explanationAlert}>
              {simPreset === 'albedo' && (
                <strong>Positive Feedback (Albedo Loop):</strong>
              )}
              {simPreset === 'thermostat' && (
                <strong>Negative Feedback (Homeostasis):</strong>
              )}
              {simPreset === 'eutrophication' && (
                <strong>Tipping Point / Hysteresis:</strong>
              )}
              {" "}
              {simPreset === 'albedo' && "Increasing temperature reduces ice cover, lowering Earth's albedo. Lower albedo means more radiation absorption, leading to higher temperatures and runaway heating. Notice how the temperature speeds away from the starting value."}
              {simPreset === 'thermostat' && "Negative feedbacks act to counteract disturbances and bring systems back to a steady-state equilibrium. Adjusting room temperature starts a heating correction cycle that stabilizes at 20 degrees."}
              {simPreset === 'eutrophication' && "An influx of nutrient pollution increases algal growth. If nutrients cross the tipping threshold, the system crosses a tipping point into a state of high algae and anoxia. Reducing nutrients will not easily return the lake to its original state."}
            </div>

            <button
              className={styles.askTutorBtn}
              onClick={() => onAskTutor(`Let's discuss the ${simPreset === 'albedo' ? 'Ice-Albedo Positive Feedback' : simPreset === 'thermostat' ? 'Homeostatic Negative Feedback' : 'Eutrophication Tipping Point'} simulation I ran. My parameters were: Inflow=${inflow}, Feedback Strength=${feedbackStrength}, Initial Storage=${initialStorage}. Can you explain how this relates to thermodynamic entropy or ecosystem resilience?`)}
              style={{ width: '100%', padding: '10px', marginTop: 14 }}
            >
              💬 Discuss Simulation with Tutor
            </button>
          </div>
        )}

        {/* --- SUSTAINABILITY TAB --- */}
        {activeTab === 'sustainability' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h3 className={styles.sectionTitle}>Sustainability & Capital</h3>
            <p className={styles.sectionSubtitle}>
              Sustainability means living within the interest (natural income) generated by the Earth's natural capital.
            </p>

            <div className={styles.calculatorGrid}>
              <div className={styles.calcSelectRow}>
                <span className={styles.calcLabel}>Primary Diet</span>
                <select className={styles.calcSelect} value={diet} onChange={(e: any) => setDiet(e.target.value)}>
                  <option value="vegan">Vegan (Mostly plant-based)</option>
                  <option value="vegetarian">Vegetarian (No meat, some dairy)</option>
                  <option value="average">Omnivore (Balanced meat & plants)</option>
                  <option value="meatHeavy">Meat-Heavy (Daily red meat/poultry)</option>
                </select>
              </div>

              <div className={styles.calcSelectRow}>
                <span className={styles.calcLabel}>Electricity Source</span>
                <select className={styles.calcSelect} value={energy} onChange={(e: any) => setEnergy(e.target.value)}>
                  <option value="clean">100% Renewables (Solar, Wind, Hydro)</option>
                  <option value="mixed">Grid Mix (Some renewables, fossil fuels)</option>
                  <option value="coalGas">Fossil Fuels (Coal/Natural Gas)</option>
                </select>
              </div>

              <div className={styles.calcSelectRow}>
                <span className={styles.calcLabel}>Primary Transportation</span>
                <select className={styles.calcSelect} value={transport} onChange={(e: any) => setTransport(e.target.value)}>
                  <option value="active">Active Transit (Biking, Walking)</option>
                  <option value="public">Public Transport (Train, Bus)</option>
                  <option value="electric">Electric Vehicle (EV)</option>
                  <option value="gasCar">Gasoline Car (Solo Commute)</option>
                </select>
              </div>

              <div className={styles.calcSelectRow}>
                <span className={styles.calcLabel}>Shopping & Waste Habits</span>
                <select className={styles.calcSelect} value={consumption} onChange={(e: any) => setConsumption(e.target.value)}>
                  <option value="low">Minimalist (Zero waste, reuse, vintage)</option>
                  <option value="avg">Average (Typical consumer, some recycling)</option>
                  <option value="high">High Consumer (Fast fashion, frequent packaging)</option>
                </select>
              </div>
            </div>

            <div className={styles.footprintOutput}>
              <div className={styles.earthsGauge}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-border)" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={Number(footprintResult.earths) <= 1.0 ? '#10b981' : Number(footprintResult.earths) <= 2.5 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="6"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (Math.min(4.0, Number(footprintResult.earths)) / 4.0) * 264}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                  />
                </svg>
                <div className={styles.earthsText}>
                  <span className={styles.earthsNum} style={{
                    color: Number(footprintResult.earths) <= 1.0 ? '#10b981' : Number(footprintResult.earths) <= 2.5 ? '#f59e0b' : '#ef4444'
                  }}>
                    {footprintResult.earths}
                  </span>
                  <span className={styles.earthsLabel}>Earths</span>
                </div>
              </div>

              <div className={styles.footprintDetail}>
                <p>Ecological Footprint: <strong>{footprintResult.gha} gha</strong></p>
                <p style={{ marginTop: 4 }}>
                  Personal Overshoot Day: <strong style={{ color: '#ef4444' }}>{footprintResult.overshootDate}</strong>
                </p>
              </div>

              <button
                className={styles.askTutorBtn}
                onClick={() => onAskTutor(`I computed my Ecological Footprint: it requires ${footprintResult.earths} Earths (${footprintResult.gha} gha) and my personal overshoot date is ${footprintResult.overshootDate}. Can you connect this to natural capital preservation, carrying capacity, and resource replenishment rates?`)}
                style={{ width: '100%', padding: '8px' }}
              >
                💬 Ask Tutor to Analyze Footprint
              </button>
            </div>
          </div>
        )}

        {/* --- STUDY GUIDE TAB --- */}
        {activeTab === 'guide' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }} className={styles.guideList}>
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.1: EVS & Perspectives</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.1", "How did Minamata disease and Silent Spring prompt the rise of ecocentrism and modern environmental systems thinking?")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                Environmental Value Systems (EVS) dictate how we see the biosphere. Ecocentrists prioritize nature's intrinsic value, anthropocentrists value human stewardship/management, and technocentrics view technological engineering as the answer.
              </p>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Ecocentrism</span>
                <span className={styles.conceptPill}>Anthropocentrism</span>
                <span className={styles.conceptPill}>Technocentrism</span>
                <span className={styles.conceptPill}>Minamata</span>
                <span className={styles.conceptPill}>Silent Spring</span>
              </div>
            </div>

            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.2: Systems & Models</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.2", "Explain the difference between transfers and transformations of matter/energy, and how positive feedback loops relate to tipping points and stable states.")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                A system is defined by storages and flows (flows can be transfers of position or transformations of state). Open systems exchange both energy and matter; closed systems exchange energy only. Feedback loops govern system stability.
              </p>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Open vs Closed</span>
                <span className={styles.conceptPill}>Transfers</span>
                <span className={styles.conceptPill}>Transformations</span>
                <span className={styles.conceptPill}>Negative Feedback</span>
                <span className={styles.conceptPill}>Resilience</span>
              </div>
            </div>

            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.3: Sustainability</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.3", "How do we define natural capital and natural income? What role do Environmental Impact Assessments (EIAs) play in sustainable resource audits?")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                Sustainability means harvesting resources at a rate that allows natural replenishment. Natural capital is the resource stock (e.g. a forest), while natural income is the yield (e.g. annual timber growth). Overshoot is consuming more than the income.
              </p>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Natural Capital</span>
                <span className={styles.conceptPill}>Natural Income</span>
                <span className={styles.conceptPill}>EIA</span>
                <span className={styles.conceptPill}>Overshoot</span>
                <span className={styles.conceptPill}>SDGs</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

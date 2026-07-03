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

export interface IBQuestion {
  id: string;
  text: string;
  marks: number;
  markscheme: string;
}

export interface Paper1CaseStudy {
  title: string;
  context: string;
  diagram: string;
  questions: IBQuestion[];
}

export interface Paper2SectionA {
  title: string;
  context: string;
  diagram: string;
  questions: IBQuestion[];
}

export interface Paper2EssayPrompt {
  id: string;
  prompt: string;
  marks: number;
  guidance: string[];
  rubric: { criterion: string; marks: string; description: string }[];
}

export const PAPER_1_CASE_STUDY: Paper1CaseStudy = {
  title: "Paper 1 Case Study: The Salton Sea System Collapse",
  context: "The Salton Sea is a shallow, saline endorheic rift lake located in the California desert. It was created in 1905 when the Colorado River breached an irrigation canal. Over the last century, agricultural runoff containing fertilizers (nitrogen, phosphorus), toxic metals (selenium), and salts drained into the basin. Lacking any natural outflow, water evaporates rapidly under the desert sun, concentrating minerals and pollutants. This has triggered toxic algal blooms, severe eutrophication, anoxia, and catastrophic wildlife die-offs. As water levels recede, the dry lakebed exposes toxic dust, triggering respiratory health crises in nearby agricultural communities.",
  diagram: `
+-----------------------------------------------------------------------+
|  Colorado River & agricultural runoff (Inflow of Water & Matter)      |
|                                |                                      |
|                                v                                      |
|                     [ SALTON SEA WATER STORAGE ]                      |
|                                |                                      |
|                                +----(Evaporation: Pure Water Only)--> |
|                                |                                      |
|                                v                                      |
|               (Storage of Concentrated Salts & Toxic Minerals)        |
+-----------------------------------------------------------------------+
  `,
  questions: [
    {
      id: "p1_a",
      text: "a) Outline why the Salton Sea is classified as an open system rather than a closed or isolated system.",
      marks: 2,
      markscheme: "Award 1 mark for stating that it exchanges both matter and energy with its surroundings.\nAward 1 mark for providing examples from the case study (e.g., matter inflows: agricultural runoff water, fertilizers, salts; energy inflows/outflows: solar radiation, heat evaporation)."
    },
    {
      id: "p1_b",
      text: "b) Distinguish between one transfer and one transformation process occurring in the Salton Sea system.",
      marks: 2,
      markscheme: "Award 1 mark for identifying a transfer (movement of matter/energy without changing state, e.g., runoff water carrying salt into the lake, wind blowing dust off the dry lakebed).\nAward 1 mark for identifying a transformation (change of chemical/physical state or energy form, e.g., liquid water evaporating into water vapor, biological photosynthesis converting solar energy into chemical energy in algae)."
    },
    {
      id: "p1_c",
      text: "c) Discuss the ecological consequences of eutrophication in this endorheic lake system.",
      marks: 3,
      markscheme: "Award 1 mark for explaining that agricultural fertilizer runoff increases nutrient levels, causing rapid algal blooms.\nAward 1 mark for explaining that high algae density blocks light (killing submerged plants), and that bacterial decomposition of dead algae consumes dissolved oxygen.\nAward 1 mark for linking the resulting anoxic condition (lack of oxygen) to massive die-offs of fish and bird populations (ecosystem collapse)."
    }
  ]
};

export const PAPER_2_SECTION_A: Paper2SectionA = {
  title: "Paper 2 Section A: Systems Feedback & Energy",
  context: "Analyze the diagram below illustrating the Permafrost Feedback Loop and answer the questions that follow.",
  diagram: `
                   Global Temperature Rises
                             |
                             v
                     Permafrost Melts
                             |
                             v
          Methane & CO2 Released (Decomposition)
                             |
                             v
                 Enhanced Greenhouse Effect
                             |
                             +----(Amplifies Temperature Rise)
  `,
  questions: [
    {
      id: "p2a_a",
      text: "a) State, with a reason, whether the permafrost feedback loop illustrated above represents a positive or negative feedback mechanism.",
      marks: 2,
      markscheme: "Award 1 mark for stating it is a positive feedback loop.\nAward 1 mark for explaining that the loop amplifies or reinforces the initial change (temperature rise leads to more warming, driving the system further from its starting state)."
    },
    {
      id: "p2a_b",
      text: "b) Outline how the First and Second Laws of Thermodynamics apply to the flow of energy through global climate systems.",
      marks: 3,
      markscheme: "First Law (1 mark): Energy enters the system as solar radiation and is conserved, changing forms (e.g., absorbed as thermal energy or stored as chemical energy) without being created or destroyed.\nSecond Law (1 mark): Energy transfers are inefficient; as heat is radiated or decomposed, energy becomes dispersed and degraded, increasing the overall entropy of the system.\nTrophic application (1 mark): Energy is lost as respiratory heat at each step, explaining the downward trend in available energy."
    }
  ]
};

export const PAPER_2_ESSAY: Paper2EssayPrompt = {
  id: "p2b_essay",
  prompt: "Evaluate the claim that technocentric solutions are more effective than ecocentric solutions in addressing global climate change.",
  marks: 9,
  guidance: [
    "Introduction: Define technocentrism and ecocentrism. State your thesis clearly.",
    "Technocentric Arguments: Discuss 2 technology-driven solutions (e.g., geoengineering, carbon capture) with their advantages (rapid, scalable) and limitations (cost, moral hazard).",
    "Ecocentric Arguments: Discuss 2 lifestyle/value-driven solutions (e.g., carbon rationing, community transition to renewable energy, voluntary simplicity) with advantages (addresses root cause, sustainable) and limitations (difficult to change human behavior globally).",
    "Evaluation & Conclusion: Provide a balanced, evaluative judgment and outline a personal/reasoned perspective."
  ],
  rubric: [
    {
      criterion: "7-9 Marks",
      marks: "7-9",
      description: "Balanced, detailed evaluation with specific case studies/examples; clear identification of EVS concepts; structured and coherent argument."
    },
    {
      criterion: "4-6 Marks",
      marks: "4-6",
      description: "Some evaluation but lacks balance or specific examples; EVS terms are mentioned but not fully integrated."
    },
    {
      criterion: "1-3 Marks",
      marks: "1-3",
      description: "Descriptive response with minimal EVS reference; lacks structure and coherent evaluation."
    }
  ]
};

export default function EssDashboard({ onAskTutor }: EssDashboardProps) {
  const [activeTab, setActiveTab] = useState<'evs' | 'practice' | 'systems' | 'sustainability' | 'guide'>('evs');

  // --- EVS State ---
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [evsScores, setEvsScores] = useState({ eco: 33, anthro: 33, techno: 34 });

  // --- Exam Practice State ---
  const [examMode, setExamMode] = useState<'paper1' | 'paper2a' | 'paper2b' | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // keyed by question ID
  const [showMarkschemes, setShowMarkschemes] = useState<Record<string, boolean>>({}); // keyed by question ID
  const [isGrading, setIsGrading] = useState<Record<string, boolean>>({}); // keyed by question ID

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const toggleMarkscheme = (qId: string) => {
    setShowMarkschemes(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const submitToTutor = (qType: 'p1' | 'p2a' | 'p2b', qId: string, questionText: string, markscheme: string, marks: number) => {
    const studentAnswer = answers[qId] || '';
    if (!studentAnswer.trim()) {
      alert("Please write your answer before submitting to the AI Tutor.");
      return;
    }

    setIsGrading(prev => ({ ...prev, [qId]: true }));

    let promptText = "";
    if (qType === 'p1') {
      promptText = `[IB Exam Practice Arena - Paper 1 Question]\n` +
        `Question: ${questionText}\n` +
        `Marks Allocated: ${marks}\n\n` +
        `My Answer:\n"${studentAnswer}"\n\n` +
        `Official Markscheme Criteria:\n"${markscheme}"\n\n` +
        `Please evaluate my response strictly against the IB DP ESS criteria. Provide:\n` +
        `1. A suggested score out of ${marks} marks.\n` +
        `2. A bulleted breakdown of which specific marking points were awarded or missed.\n` +
        `3. Clear, constructive advice on how to improve the response for full marks.`;
    } else if (qType === 'p2a') {
      promptText = `[IB Exam Practice Arena - Paper 2 Section A Question]\n` +
        `Question: ${questionText}\n` +
        `Marks Allocated: ${marks}\n\n` +
        `My Answer:\n"${studentAnswer}"\n\n` +
        `Official Markscheme Criteria:\n"${markscheme}"\n\n` +
        `Please grade my response against the IB DP ESS Paper 2 Section A expectations. Provide:\n` +
        `1. A score out of ${marks} marks.\n` +
        `2. Analysis of the explanation's scientific accuracy.\n` +
        `3. Feedback on what needs to be added for a complete answer.`;
    } else {
      promptText = `[IB Exam Practice Arena - Paper 2 Section B 9-Mark Essay]\n` +
        `Essay Prompt: ${questionText}\n` +
        `Marks Allocated: ${marks}\n\n` +
        `My Essay:\n"${studentAnswer}"\n\n` +
        `Please grade my essay using the IB DP ESS 9-mark essay rubric (focusing on Criterion A: Structure, Criterion B: Environmental Concepts, Criterion C: Synthesis/Evaluation). Provide:\n` +
        `1. An overall score out of 9 marks.\n` +
        `2. Detailed feedback on each of the three criteria.\n` +
        `3. Suggested revisions or missing key examples (e.g. technocentric/ecocentric details) to achieve full marks.`;
    }

    onAskTutor(promptText);

    // Reset grading animation shortly
    setTimeout(() => {
      setIsGrading(prev => ({ ...prev, [qId]: false }));
    }, 2000);
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
          📝 Exam Practice
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

        {/* --- PRACTICE QUIZ (IB EXAM PRACTICE ARENA) TAB --- */}
        {activeTab === 'practice' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {examMode === null ? (
              <div>
                <h3 className={styles.sectionTitle}>📝 IB DP ESS Exam Practice Arena</h3>
                <p className={styles.sectionSubtitle}>
                  Select an exam format to practice structured response and essay writing. Submit your written answers directly to the AI Tutor for grading based on the official IB DP ESS markschemes.
                </p>
                
                <div className={styles.topicSelectionGrid}>
                  <div className={styles.topicCard} onClick={() => setExamMode('paper1')}>
                    <div className={styles.topicCardIcon}>📄</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Paper 1: Case Study Data Response</h4>
                      <p className={styles.topicCardDesc}>Analyze the Salton Sea ecological collapse. Answer structured questions focusing on system classification, flows, and eutrophication.</p>
                      <span className={styles.topicCardCount}>Paper 1 (Case Study)</span>
                    </div>
                  </div>

                  <div className={styles.topicCard} onClick={() => setExamMode('paper2a')}>
                    <div className={styles.topicCardIcon}>🔄</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Paper 2 Section A: Systems & Feedbacks</h4>
                      <p className={styles.topicCardDesc}>Study the permafrost-methane positive feedback loop. Practice thermodynamics and feedback loop exam questions.</p>
                      <span className={styles.topicCardCount}>Paper 2 Section A</span>
                    </div>
                  </div>

                  <div className={`${styles.topicCard} ${styles.mixedTopicCard}`} onClick={() => setExamMode('paper2b')}>
                    <div className={styles.topicCardIcon}>✍️</div>
                    <div className={styles.topicCardBody}>
                      <h4 className={styles.topicCardTitle}>Paper 2 Section B: 9-Mark Evaluative Essay</h4>
                      <p className={styles.topicCardDesc}>Write a full-length 9-mark essay evaluating ecocentric vs. technocentric climate change solutions, with grading rubrics.</p>
                      <span className={styles.topicCardCount}>Paper 2 Section B (Essay)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.quizSessionContainer}>
                <div className={styles.quizSessionHeader}>
                  <button className={styles.backBtn} onClick={() => setExamMode(null)}>
                    ⬅️ Back to Exam Arena
                  </button>
                  <span className={styles.quizProgress} style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                    {examMode === 'paper1' && "Paper 1: Case Study Response"}
                    {examMode === 'paper2a' && "Paper 2 Section A: Structured"}
                    {examMode === 'paper2b' && "Paper 2 Section B: 9-Mark Essay"}
                  </span>
                </div>

                {/* --- PAPER 1 VIEW --- */}
                {examMode === 'paper1' && (
                  <div className={styles.practiceQuizCard} style={{ animation: 'fadeIn 0.3s ease' }}>
                    <h3 className={styles.examTitle}>{PAPER_1_CASE_STUDY.title}</h3>
                    <p className={styles.examIntro}>{PAPER_1_CASE_STUDY.context}</p>
                    
                    <div className={styles.diagramBox}>
                      <span className={styles.diagramLabel}>System Diagram:</span>
                      <pre className={styles.diagramPre}>{PAPER_1_CASE_STUDY.diagram}</pre>
                    </div>

                    <div className={styles.questionsList}>
                      {PAPER_1_CASE_STUDY.questions.map((q) => (
                        <div key={q.id} className={styles.examQuestionBox}>
                          <div className={styles.questionHeaderRow}>
                            <h4 className={styles.examQuestionText}>{q.text}</h4>
                            <span className={styles.examMarksLabel}>[{q.marks} marks]</span>
                          </div>
                          
                          <textarea
                            className={styles.examTextarea}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder="Type your structured answer here (incorporate specific terms and flows from the case study)..."
                            rows={4}
                          />

                          <div className={styles.examActionRow}>
                            <button
                              className={styles.resetBtn}
                              style={{ margin: 0, padding: '6px 12px', fontSize: '0.65rem' }}
                              onClick={() => toggleMarkscheme(q.id)}
                            >
                              {showMarkschemes[q.id] ? "Hide Markscheme 👁️" : "Show Markscheme 👁️"}
                            </button>
                            
                            <button
                              className={styles.askTutorBtn}
                              style={{ padding: '6px 12px' }}
                              onClick={() => submitToTutor('p1', q.id, q.text, q.markscheme, q.marks)}
                              disabled={isGrading[q.id]}
                            >
                              {isGrading[q.id] ? "Submitting..." : "💬 Submit to AI Tutor for Grading"}
                            </button>
                          </div>

                          {showMarkschemes[q.id] && (
                            <div className={styles.markschemeBox} style={{ animation: 'fadeIn 0.2s ease' }}>
                              <h5 className={styles.markschemeTitle}>IB DP ESS Markscheme Guidelines:</h5>
                              <pre className={styles.markschemeContent}>{q.markscheme}</pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- PAPER 2 SECTION A VIEW --- */}
                {examMode === 'paper2a' && (
                  <div className={styles.practiceQuizCard} style={{ animation: 'fadeIn 0.3s ease' }}>
                    <h3 className={styles.examTitle}>{PAPER_2_SECTION_A.title}</h3>
                    <p className={styles.examIntro}>{PAPER_2_SECTION_A.context}</p>
                    
                    <div className={styles.diagramBox}>
                      <span className={styles.diagramLabel}>Feedback Cycle:</span>
                      <pre className={styles.diagramPre}>{PAPER_2_SECTION_A.diagram}</pre>
                    </div>

                    <div className={styles.questionsList}>
                      {PAPER_2_SECTION_A.questions.map((q) => (
                        <div key={q.id} className={styles.examQuestionBox}>
                          <div className={styles.questionHeaderRow}>
                            <h4 className={styles.examQuestionText}>{q.text}</h4>
                            <span className={styles.examMarksLabel}>[{q.marks} marks]</span>
                          </div>
                          
                          <textarea
                            className={styles.examTextarea}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder="Type your scientific explanation here..."
                            rows={4}
                          />

                          <div className={styles.examActionRow}>
                            <button
                              className={styles.resetBtn}
                              style={{ margin: 0, padding: '6px 12px', fontSize: '0.65rem' }}
                              onClick={() => toggleMarkscheme(q.id)}
                            >
                              {showMarkschemes[q.id] ? "Hide Markscheme 👁️" : "Show Markscheme 👁️"}
                            </button>
                            
                            <button
                              className={styles.askTutorBtn}
                              style={{ padding: '6px 12px' }}
                              onClick={() => submitToTutor('p2a', q.id, q.text, q.markscheme, q.marks)}
                              disabled={isGrading[q.id]}
                            >
                              {isGrading[q.id] ? "Submitting..." : "💬 Submit to AI Tutor for Grading"}
                            </button>
                          </div>

                          {showMarkschemes[q.id] && (
                            <div className={styles.markschemeBox} style={{ animation: 'fadeIn 0.2s ease' }}>
                              <h5 className={styles.markschemeTitle}>IB DP ESS Markscheme Guidelines:</h5>
                              <pre className={styles.markschemeContent}>{q.markscheme}</pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- PAPER 2 SECTION B (ESSAY) VIEW --- */}
                {examMode === 'paper2b' && (
                  <div className={styles.practiceQuizCard} style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div className={styles.essayPromptHeader}>
                      <span className={styles.practiceQuestionTopic}>Paper 2 Section B [9 Marks]</span>
                      <h3 className={styles.essayPromptText}>"{PAPER_2_ESSAY.prompt}"</h3>
                    </div>

                    <div className={styles.essayGuidelinesBox}>
                      <h5 className={styles.guidelinesTitle}>📋 Essay Construction Guidance</h5>
                      <ul className={styles.guidanceList}>
                        {PAPER_2_ESSAY.guidance.map((g, idx) => (
                          <li key={idx} className={styles.guidanceItem}>{g}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.examQuestionBox} style={{ border: 'none', padding: 0, background: 'transparent' }}>
                      <textarea
                        className={styles.examTextarea}
                        style={{ fontFamily: 'inherit', fontSize: '0.85rem' }}
                        value={answers[PAPER_2_ESSAY.id] || ''}
                        onChange={(e) => handleAnswerChange(PAPER_2_ESSAY.id, e.target.value)}
                        placeholder="Write your comprehensive evaluative essay here. Make sure to define your EVS terms in the introduction, provide balanced arguments with specific examples (e.g. CCS vs permaculture/lifestyle shift), and conclude with an evaluation..."
                        rows={12}
                      />

                      <div className={styles.examActionRow} style={{ marginTop: 14 }}>
                        <button
                          className={styles.resetBtn}
                          style={{ margin: 0, padding: '8px 14px', fontSize: '0.7rem' }}
                          onClick={() => toggleMarkscheme(PAPER_2_ESSAY.id)}
                        >
                          {showMarkschemes[PAPER_2_ESSAY.id] ? "Hide IB Rubric 👁️" : "Show IB Rubric 👁️"}
                        </button>
                        
                        <button
                          className={styles.askTutorBtn}
                          style={{ padding: '8px 14px', fontSize: '0.7rem' }}
                          onClick={() => submitToTutor('p2b', PAPER_2_ESSAY.id, PAPER_2_ESSAY.prompt, "Grade against Criterion A, B, C rubrics", PAPER_2_ESSAY.marks)}
                          disabled={isGrading[PAPER_2_ESSAY.id]}
                        >
                          {isGrading[PAPER_2_ESSAY.id] ? "Submitting..." : "💬 Submit Essay to AI Tutor for Grading"}
                        </button>
                      </div>

                      {showMarkschemes[PAPER_2_ESSAY.id] && (
                        <div className={styles.markschemeBox} style={{ animation: 'fadeIn 0.2s ease' }}>
                          <h5 className={styles.markschemeTitle} style={{ marginBottom: 10 }}>IB DP ESS 9-Mark Essay Rubric</h5>
                          <table className={styles.rubricTable}>
                            <thead>
                              <tr>
                                <th>Band</th>
                                <th>Assessment Criteria Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {PAPER_2_ESSAY.rubric.map((r, idx) => (
                                <tr key={idx}>
                                  <td style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>{r.criterion}</td>
                                  <td>{r.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
            {/* Core Revision Mindmap */}
            <div className={`${styles.guideCard} ${styles.mixedTopicCard}`} style={{ borderStyle: 'solid' }}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle} style={{ color: 'var(--accent-gold)' }}>🧠 Topic 1: Foundations Revision Mindmap</h4>
              </div>
              <p className={styles.guideDesc}>
                Use this comprehensive structural mindmap as a quick revision guide to connect the foundational elements of Environmental Systems and Societies.
              </p>
              <div className={styles.diagramBox} style={{ marginTop: 10 }}>
                <pre className={styles.diagramPre}>{`
                      +---------------------------------------+
                      |   TOPIC 1: FOUNDATIONS OF ESS         |
                      +-------------------+-------------------+
                                          |
     +--------------------+---------------+----------------+--------------------+
     |                    |                                |                    |
+----+-----+         +----+-----+                     +----+-----+         +----+-----+
| 1.1 EVS  |         |1.2 SYS   |                     |1.3 ENERGY|         |1.4 SUST. |
+----+-----+         +----+-----+                     +----+-----+         +----+-----+
     |                    |                                |                    |
     v- Paradigms:        v- Flows (matter/energy)         v- 1st Law: Energy   v- Capital:
        Eco/Anthro/          & Storages (stock)               is conserved         Standing stock
        Technocentric     v- Transfers: change loc.        v- 2nd Law: Heat     v- Income:
     v- History:             (e.g., river flow)               loss & entropy       Sustainable
        Silent Spring,    v- Transformations: state        v- Feedbacks:           interest/yield
        Minamata, etc.       (e.g., evaporation)              - Negative: stable   v- EIA: Baseline
     v- System:           v- Boundaries:                      - Positive: runaway  v- Footprints:
        Inputs -> Filter     - Open (matter & energy)      v- Tipping Points &        Earth carrying
        -> Outputs           - Closed (energy only)           resilience shifts       capacity (gha)
                             - Isolated (neither)
`}</pre>
              </div>
            </div>

            {/* Topic 1.1 */}
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.1: Environmental Value Systems</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.1", "How do ecocentrism, anthropocentrism, and technocentrism differ, and how does the EVS model act as a system?")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                An EVS is a worldview that shapes how individuals or societies perceive and evaluate environmental issues. It behaves as a system with inputs, processing filters, and outputs.
              </p>
              <div className={styles.diagramBox}>
                <span className={styles.diagramLabel}>EVS System Flow Diagram:</span>
                <pre className={styles.diagramPre}>{`
[INPUTS: Education, Culture, Media, Religion, Science]
                         |
                         v
              { EVS PROCESSING FILTER } 
   (Appraisal, evaluation, and cognitive filtering)
                         |
                         v
[OUTPUTS: Decisions, Actions, Beliefs, Environmental Policies]
`}</pre>
              </div>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Ecocentrism</span>
                <span className={styles.conceptPill}>Anthropocentrism</span>
                <span className={styles.conceptPill}>Technocentrism</span>
                <span className={styles.conceptPill}>Minamata</span>
                <span className={styles.conceptPill}>Silent Spring</span>
              </div>
            </div>

            {/* Topic 1.2 */}
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.2: Systems & Models</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.2", "Explain the boundaries of open, closed, and isolated systems, and explain the difference between transfers and transformations.")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                A system is defined by boundaries, storages (reservoirs of matter/energy), and flows. Open systems exchange both energy and matter; closed systems exchange energy only; isolated systems exchange neither.
              </p>
              <div className={styles.diagramBox}>
                <span className={styles.diagramLabel}>System Boundary Comparisons:</span>
                <pre className={styles.diagramPre}>{`
1. OPEN SYSTEM (e.g., Lake, Ecosystem, Human)
   Input: Matter & Energy ---> [ SYSTEM STORAGE ] ---> Output: Matter & Energy

2. CLOSED SYSTEM (e.g., Earth, Sealed Terrarium)
   Input: Energy ONLY --------> [ SYSTEM STORAGE ] --------> Output: Energy ONLY

3. ISOLATED SYSTEM (e.g., The Universe)
   [ No Energy/Matter Inflow ] -> [ STORAGE ] -> [ No Energy/Matter Outflow ]
`}</pre>
              </div>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Open vs Closed</span>
                <span className={styles.conceptPill}>Transfers</span>
                <span className={styles.conceptPill}>Transformations</span>
                <span className={styles.conceptPill}>Models Limits</span>
                <span className={styles.conceptPill}>Boundary Limits</span>
              </div>
            </div>

            {/* Topic 1.3 */}
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.3: Energy & Equilibria</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.3", "Explain the First and Second Laws of Thermodynamics, and distinguish between positive and negative feedback loops.")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                Energy flows through systems governed by the laws of thermodynamics. Negative feedback loops stabilize systems around an equilibrium, while positive feedback loops amplify deviations and drive systems past tipping points.
              </p>
              <div className={styles.diagramBox}>
                <span className={styles.diagramLabel}>Feedback Loop Systems:</span>
                <pre className={styles.diagramPre}>{`
1. NEGATIVE FEEDBACK (Stabilizing / Homeostatic)
   [Disturbance/Increase] --> (Negative Correction) --> [Return to Steady State]

2. POSITIVE FEEDBACK (Amplifying / Destabilizing)
   [Disturbance/Increase] --> (Amplification) --> [Runaway Shift] --> (Tipping Point)
`}</pre>
              </div>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>First Law</span>
                <span className={styles.conceptPill}>Second Law</span>
                <span className={styles.conceptPill}>Entropy</span>
                <span className={styles.conceptPill}>Homeostasis</span>
                <span className={styles.conceptPill}>Tipping Point</span>
              </div>
            </div>

            {/* Topic 1.4 */}
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <h4 className={styles.guideTitle}>Topic 1.4: Sustainability</h4>
                <button
                  className={styles.askTutorBtn}
                  onClick={() => handleGuideAsk("Topic 1.4", "How do we distinguish natural capital from natural income, and what indicators measure sustainability?")}
                >
                  Ask Tutor
                </button>
              </div>
              <p className={styles.guideDesc}>
                Sustainability means harvesting resources at a rate that allows natural replenishment. Natural capital is the resource stock (e.g. a forest), while natural income is the yield (e.g. annual timber growth).
              </p>
              <div className={styles.diagramBox}>
                <span className={styles.diagramLabel}>Natural Capital Stock & Flow:</span>
                <pre className={styles.diagramPre}>{`
[ NATURAL CAPITAL STOCK (e.g., Lake water, Fish stock, Forest biomass) ]
                                |
                                v (Natural replenishment rate)
[ NATURAL INCOME FLOW (e.g., Water inflow, annual reproduction, wood growth) ]
                                |
                                v (Harvest / Consumption)
   * Sustainable: Harvest Rate <= Natural Income Replenishment Rate
   * Unsustainable: Harvest Rate > Natural Income (depletes the Capital Stock)
`}</pre>
              </div>
              <div className={styles.conceptPills}>
                <span className={styles.conceptPill}>Natural Capital</span>
                <span className={styles.conceptPill}>Natural Income</span>
                <span className={styles.conceptPill}>EIA Audit</span>
                <span className={styles.conceptPill}>Footprints (gha)</span>
                <span className={styles.conceptPill}>Overshoot</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

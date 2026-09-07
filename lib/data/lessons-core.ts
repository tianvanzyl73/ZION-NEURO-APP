import { Category, Lesson } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'intro', title: 'Introduction to Neuroscience', icon: 'school-outline', level: 'Beginner', blurb: 'What neuroscience is, how the nervous system is organized, and the myths to leave behind.' },
  { id: 'anatomy', title: 'Brain Anatomy', icon: 'git-network-outline', level: 'Beginner', blurb: 'Lobes, deep structures, cerebellum and brainstem — a guided tour.' },
  { id: 'neurons', title: 'Neurons & Synapses', icon: 'flash-outline', level: 'Intermediate', blurb: 'How neurons are built, how they fire, and how they talk to each other.' },
  { id: 'plasticity', title: 'Learning & Neuroplasticity', icon: 'sparkles-outline', level: 'Intermediate', blurb: 'How experience rewires the brain, and how memory really works.' },
  { id: 'health', title: 'Brain Health & Lifestyle', icon: 'heart-outline', level: 'Beginner', blurb: 'Sleep, exercise and stress — the evidence-based pillars of brain care.' },
  { id: 'attention', title: 'Attention & Focus', icon: 'eye-outline', level: 'Intermediate', blurb: 'The neuroscience of attention, distraction, multitasking and flow.' },
  { id: 'emotion', title: 'Emotions & the Brain', icon: 'flame-outline', level: 'Intermediate', blurb: 'The emotional circuits of the brain and the science of regulation.' },
  { id: 'personality', title: 'Personality & Individual Differences', icon: 'people-outline', level: 'Intermediate', blurb: 'The Big Five traits and the history of temperament models.' },
  { id: 'sports', title: 'Sports & Performance Neuroscience', icon: 'barbell-outline', level: 'Advanced', blurb: 'Reaction time, motor learning, pressure and flow in athletes.' },
  { id: 'methods', title: 'Methods & Frontiers', icon: 'telescope-outline', level: 'Advanced', blurb: 'How we study the brain, and where the field is heading.' },
];

export const CORE_LESSONS: Lesson[] = [
  // ============ INTRO ============
  {
    id: 'intro-1',
    categoryId: 'intro',
    title: 'What Is Neuroscience?',
    level: 'Beginner',
    minutes: 5,
    summary: 'Meet the science of the nervous system — the organ that makes you, you.',
    sections: [
      {
        heading: 'The science of the nervous system',
        text: 'Neuroscience is the scientific study of the nervous system: how it is built, how it works, how it develops, and how it sometimes goes wrong. It spans levels of explanation, from single ion channels opening in a fraction of a millisecond, to circuits of millions of cells, to whole-brain imaging, to behavior, thoughts and feelings.',
      },
      {
        heading: 'Why it matters to you',
        text: 'Everything you experience — every thought, skill, habit, emotion and decision — is produced by your nervous system. Understanding the basics helps you make better choices about learning, sleep, stress and training, and makes you a smarter consumer of brain-related claims you see in media.',
      },
      {
        heading: 'A young, fast-moving field',
        text: 'Modern neuroscience blends biology, medicine, psychology, engineering and computer science. Key tools like fMRI (1990s) and optogenetics (2000s) are younger than the internet, and the field is still rewriting textbooks regularly. Healthy skepticism about oversimplified claims is part of being neuro-literate.',
      },
    ],
    keyFacts: [
      'Neuroscience studies the nervous system across levels: molecules, cells, circuits, systems and behavior.',
      'The human brain contains roughly 86 billion neurons.',
      'Neuroscience is interdisciplinary, spanning biology, psychology, medicine and engineering.',
    ],
    example: 'When you practice a free throw, motor circuits fire, sensory feedback refines the movement, and sleep afterwards helps consolidate the skill. One simple action involves nearly every level neuroscience studies.',
    quiz: [
      { q: 'Neuroscience is best described as the study of…', options: ['Only the brain', 'The nervous system across all its levels', 'Mental illness only', 'Computer simulation of minds'], correct: 1, explain: 'Neuroscience covers molecules, cells, circuits, systems and behavior, in health and disease.' },
      { q: 'Approximately how many neurons does the human brain contain?', options: ['860 thousand', '8.6 million', '86 billion', '86 trillion'], correct: 2, explain: 'Modern cell-counting estimates about 86 billion neurons.' },
      { q: 'Which statement about neuroscience is TRUE?', options: ['It is a finished science', 'It only uses microscopes', 'It blends multiple disciplines', 'It began with fMRI'], correct: 2, explain: 'Neuroscience integrates biology, psychology, medicine, engineering and computation.' },
    ],
  },
  {
    id: 'intro-2',
    categoryId: 'intro',
    title: 'Tour of the Nervous System',
    level: 'Beginner',
    minutes: 6,
    summary: 'Central vs peripheral, somatic vs autonomic — the map of your wiring.',
    diagram: 'cns',
    sections: [
      {
        heading: 'Two great divisions',
        text: 'The nervous system divides into the central nervous system (CNS), the brain and spinal cord, and the peripheral nervous system (PNS), all the nerves connecting the CNS to the body. The CNS integrates information and makes decisions; the PNS carries sensory information in and motor commands out.',
      },
      {
        heading: 'Voluntary and automatic',
        text: 'The peripheral motor system splits into the somatic system, which controls voluntary skeletal muscles, and the autonomic system, which runs organs automatically. The autonomic system has sympathetic ("fight-or-flight") and parasympathetic ("rest-and-digest") branches that balance arousal and recovery.',
      },
      {
        heading: 'Support cells matter too',
        text: 'Neurons get massive support from glial cells: astrocytes regulate the chemical environment, oligodendrocytes and Schwann cells produce myelin insulation, and microglia act as immune defenders. Glia outnumber neurons in many regions and are active players in brain function.',
      },
    ],
    keyFacts: [
      'CNS = brain + spinal cord; PNS = all other nerves.',
      'The autonomic nervous system balances sympathetic arousal with parasympathetic recovery.',
      'Glial cells support, insulate and protect neurons.',
    ],
    example: 'Touching a hot pan: sensory nerves carry the signal to the spinal cord, a reflex arc pulls your hand back before the brain even registers pain, then the autonomic system ramps your heart rate in alarm.',
    quiz: [
      { q: 'The central nervous system consists of…', options: ['Brain and spinal cord', 'All nerves in the limbs', 'Brain and heart', 'Spinal cord and muscles'], correct: 0 },
      { q: 'The "rest-and-digest" branch is the…', options: ['Sympathetic system', 'Somatic system', 'Parasympathetic system', 'Sensory system'], correct: 2, explain: 'The parasympathetic branch promotes recovery, digestion and calm.' },
      { q: 'Which cells produce myelin in the CNS?', options: ['Microglia', 'Oligodendrocytes', 'Neurons', 'Red blood cells'], correct: 1, explain: 'Oligodendrocytes myelinate CNS axons; Schwann cells do it in the PNS.' },
    ],
  },
  {
    id: 'intro-3',
    categoryId: 'intro',
    title: 'Brain Myths, Debunked',
    level: 'Beginner',
    minutes: 5,
    summary: 'Separating pop-neuroscience from evidence: the 10% myth, left/right brains and more.',
    sections: [
      {
        heading: 'The 10% myth',
        text: 'You have probably heard that we use only 10% of our brains. Imaging studies show this is false: over the course of a normal day virtually all brain regions show activity, and most regions are active much of the time. Damage to almost any area produces measurable deficits.',
      },
      {
        heading: 'Left-brain vs right-brain',
        text: 'Some functions are lateralized (language is left-dominant in most right-handed people), but the idea of "left-brained" or "right-brained" personalities is not supported. Healthy brains work as integrated networks; both hemispheres are active in nearly every complex task, communicating constantly via the corpus callosum.',
      },
      {
        heading: 'Why myths persist',
        text: 'Brain myths survive because they are simple, flattering and seem to explain everyday experience. A good rule: if a brain claim promises effortless transformation or uses a single scan image as proof, slow down and check the evidence. That critical habit is the real superpower of neuroscience literacy.',
      },
    ],
    keyFacts: [
      'The "we use only 10% of our brain" claim is contradicted by imaging and lesion studies.',
      'Hemispheric lateralization is real for some functions, but "left/right-brained people" are a myth.',
      'Extraordinary claims about the brain deserve ordinary evidence.',
    ],
    example: 'A headline says "brain scan proves this trick boosts intelligence 40%." A neuro-literate reader asks: How many participants? Was there a control group? Has anyone replicated it?',
    quiz: [
      { q: 'The "10% of the brain" claim is…', options: ['Confirmed by fMRI', 'A myth contradicted by evidence', 'True during sleep', 'True for children only'], correct: 1 },
      { q: 'Which statement is scientifically supported?', options: ['People are either left- or right-brained', 'Language is left-hemisphere dominant for most right-handers', 'The right hemisphere controls logic', 'Hemispheres work independently'], correct: 1, explain: 'Specific lateralization exists, but personalities are not hemispheric.' },
      { q: 'The two hemispheres communicate mainly through the…', options: ['Cerebellum', 'Corpus callosum', 'Spinal cord', 'Amygdala'], correct: 1 },
    ],
  },

  // ============ ANATOMY ============
  {
    id: 'anat-1',
    categoryId: 'anatomy',
    title: 'The Four Lobes of the Cortex',
    level: 'Beginner',
    minutes: 7,
    summary: 'Frontal, parietal, temporal, occipital — what each lobe contributes.',
    diagram: 'lobes',
    sections: [
      {
        heading: 'The cortical sheet',
        text: 'The cerebral cortex is a folded sheet of neural tissue 2–4 mm thick, containing roughly 16 billion neurons. Its folds (gyri and sulci) pack a large surface area into the skull. Each hemisphere is conventionally divided into four lobes, each with characteristic jobs, though real tasks always involve networks across lobes.',
      },
      {
        heading: 'Frontal and parietal',
        text: 'The frontal lobe houses the motor cortex and the prefrontal cortex, supporting voluntary movement, planning, working memory and impulse control. The parietal lobe processes touch, body position and spatial attention, integrating senses into a coherent picture of where you are in space.',
      },
      {
        heading: 'Temporal and occipital',
        text: 'The temporal lobes handle hearing, language comprehension and aspects of memory (the hippocampus sits deep inside). The occipital lobe at the back is devoted almost entirely to vision. Interestingly, "higher" functions like decision-making arise from these regions working together, not from any single lobe.',
      },
    ],
    keyFacts: [
      'The cortex is a 2–4 mm folded sheet with four lobes per hemisphere.',
      'Frontal: movement and executive control. Parietal: touch and space. Temporal: sound, language, memory. Occipital: vision.',
      'Complex functions arise from networks across lobes, not single regions.',
    ],
    example: 'Reading this sentence: occipital cortex decodes the letters, temporal language areas extract meaning, frontal areas keep the sentence in working memory, and parietal circuits guide your eye movements.',
    quiz: [
      { q: 'Which lobe is primarily devoted to vision?', options: ['Frontal', 'Parietal', 'Temporal', 'Occipital'], correct: 3 },
      { q: 'Planning and impulse control are most associated with the…', options: ['Prefrontal cortex', 'Occipital lobe', 'Cerebellum', 'Brainstem'], correct: 0 },
      { q: 'The hippocampus lies deep within which lobe?', options: ['Occipital', 'Temporal', 'Parietal', 'Frontal'], correct: 1 },
    ],
  },
  {
    id: 'anat-2',
    categoryId: 'anatomy',
    title: 'Deep Structures: The Limbic System',
    level: 'Beginner',
    minutes: 6,
    summary: 'The hippocampus, amygdala, thalamus and hypothalamus — the brain\'s inner ring.',
    diagram: 'limbic',
    sections: [
      {
        heading: 'Beneath the cortex',
        text: 'Under the cortical surface lies a set of interconnected structures often called the limbic system. They sit at the crossroads of emotion, motivation and memory, linking thinking with feeling and bodily state.',
      },
      {
        heading: 'The key players',
        text: 'The hippocampus is essential for forming new episodic and spatial memories. The amygdala flags emotional significance, especially threats, and modulates how strongly memories are stored. The thalamus relays nearly all sensory information to the cortex, and the hypothalamus regulates hunger, thirst, temperature, sleep and hormones.',
      },
      {
        heading: 'Emotion meets memory',
        text: 'Because the amygdala and hippocampus are neighbors and heavily connected, emotionally charged events are often remembered more vividly. This made evolutionary sense, remembering dangers kept ancestors alive, but it also explains why stressful memories can intrude.',
      },
    ],
    keyFacts: [
      'The hippocampus is critical for forming new memories.',
      'The amygdala detects emotional significance, especially threats.',
      'The hypothalamus is the body\'s thermostat and hormone coordinator.',
    ],
    example: 'Patient H.M. had his hippocampi removed to treat epilepsy; afterwards he could not form new long-term memories, proving the hippocampus is a gateway for memory formation.',
    quiz: [
      { q: 'Which structure is most important for forming new memories?', options: ['Amygdala', 'Hippocampus', 'Thalamus', 'Cerebellum'], correct: 1 },
      { q: 'The amygdala is most associated with…', options: ['Balance', 'Emotional significance and threat detection', 'Hearing', 'Digestion'], correct: 1 },
      { q: 'Which structure relays most sensory information to the cortex?', options: ['Hypothalamus', 'Thalamus', 'Pons', 'Basal ganglia'], correct: 1 },
    ],
  },
  {
    id: 'anat-3',
    categoryId: 'anatomy',
    title: 'Cerebellum & Brainstem',
    level: 'Beginner',
    minutes: 5,
    summary: 'The "little brain" of coordination and the ancient core that keeps you alive.',
    sections: [
      {
        heading: 'The brainstem: life support',
        text: 'The brainstem (midbrain, pons, medulla) connects the brain to the spinal cord and runs essential functions: breathing, heart rate, blood pressure, swallowing and sleep-wake cycling. It also hosts nuclei that broadcast dopamine, serotonin and norepinephrine across the brain, setting mood and arousal.',
      },
      {
        heading: 'The cerebellum: precision engine',
        text: 'The cerebellum ("little brain") at the back of the head contains more than half of the brain\'s neurons. It fine-tunes movement, balance and timing, and contributes to motor learning and some cognitive timing tasks. Damage produces clumsy, uncoordinated movement rather than paralysis.',
      },
      {
        heading: 'Basal ganglia: the habit hub',
        text: 'Nearby, the basal ganglia help select and initiate actions and are central to habit formation. With practice, behaviors shift from effortful prefrontal control to streamlined basal-ganglia circuits, which is why well-learned skills feel automatic.',
      },
    ],
    keyFacts: [
      'The brainstem controls breathing, heart rate and sleep-wake cycles.',
      'The cerebellum holds over half the brain\'s neurons and fine-tunes movement.',
      'The basal ganglia support action selection and habits.',
    ],
    example: 'A pianist playing a memorized piece relies on the cerebellum for millisecond timing and the basal ganglia for automatic sequences, while barely thinking about individual fingers.',
    quiz: [
      { q: 'Breathing and heart rate are regulated mainly by the…', options: ['Cerebellum', 'Brainstem', 'Frontal lobe', 'Hippocampus'], correct: 1 },
      { q: 'The cerebellum is best known for…', options: ['Language grammar', 'Movement coordination and timing', 'Emotion generation', 'Hunger'], correct: 1 },
      { q: 'Habits are most closely linked to the…', options: ['Basal ganglia', 'Occipital lobe', 'Thalamus', 'Corpus callosum'], correct: 0 },
    ],
  },

  // ============ NEURONS ============
  {
    id: 'neur-1',
    categoryId: 'neurons',
    title: 'Anatomy of a Neuron',
    level: 'Intermediate',
    minutes: 6,
    summary: 'Dendrites, soma, axon, terminals — the parts of the brain\'s signaling cell.',
    diagram: 'neuron',
    sections: [
      {
        heading: 'A cell built for signaling',
        text: 'A typical neuron has three functional zones. Dendrites are branchy antennae that receive signals from thousands of other neurons. The soma (cell body) contains the nucleus and integrates incoming input. If input crosses a threshold at the axon hillock, an all-or-nothing electrical impulse, the action potential, is launched down the axon.',
      },
      {
        heading: 'The axon highway',
        text: 'Axons can be microscopic or over a meter long. Many are wrapped in myelin, fatty insulation from glial cells, which speeds conduction dramatically. At the end, the axon branches into terminals that contact other neurons at synapses.',
      },
      {
        heading: 'Diversity of shapes',
        text: 'Neurons come in many shapes: pyramidal cells in the cortex, Purkinje cells with fan-like dendrites in the cerebellum, and tiny interneurons that connect local circuits. Form follows function: a neuron\'s shape determines what it listens to and where it speaks.',
      },
    ],
    keyFacts: [
      'Neurons integrate input in dendrites and soma, and output via axons.',
      'Myelin insulation speeds signal conduction up to ~120 m/s.',
      'A single neuron can receive input from thousands of others.',
    ],
    example: 'A motor neuron in your spinal cord receives thousands of synaptic inputs, sums them, and if the total passes threshold, fires one clean pulse down a meter-long axon to contract a toe muscle.',
    quiz: [
      { q: 'Which part of the neuron receives input from other neurons?', options: ['Axon', 'Dendrites', 'Myelin', 'Terminals'], correct: 1 },
      { q: 'Myelin\'s main job is to…', options: ['Store memories', 'Speed up signal conduction', 'Produce neurotransmitters', 'Feed blood vessels'], correct: 1 },
      { q: 'The action potential is launched when…', options: ['Input crosses threshold', 'The neuron rests', 'Myelin dissolves', 'Dendrites shrink'], correct: 0 },
    ],
  },
  {
    id: 'neur-2',
    categoryId: 'neurons',
    title: 'The Action Potential',
    level: 'Intermediate',
    minutes: 7,
    summary: 'How a one-millisecond electrical spike carries information down an axon.',
    diagram: 'actionPotential',
    sections: [
      {
        heading: 'A battery with gates',
        text: 'A resting neuron keeps its inside about -70 millivolts relative to outside, using ion pumps and selective membrane channels. This voltage difference is stored energy, like a charged battery, ready to be released.',
      },
      {
        heading: 'The spike',
        text: 'When input pushes the membrane past threshold (~-55 mV), voltage-gated sodium channels burst open and sodium floods in, flipping the voltage to about +30 mV in half a millisecond. Then sodium channels close and potassium channels open, potassium exits, and the voltage resets, briefly dipping below rest (the refractory period) before stabilizing.',
      },
      {
        heading: 'All-or-nothing signaling',
        text: 'Action potentials are all-or-nothing: once triggered, each spike is essentially the same size. Information is coded in firing rate and timing, not spike height. The spike regenerates itself along the axon, so signals travel long distances without fading.',
      },
    ],
    keyFacts: [
      'Resting membrane potential is about -70 mV.',
      'The action potential lasts about 1 millisecond and is all-or-nothing.',
      'Information is encoded in firing rate and timing patterns.',
    ],
    example: 'A neuron signaling a loud sound may fire hundreds of spikes per second; the same neuron at rest fires a few. The brain reads intensity from the rate.',
    quiz: [
      { q: 'A neuron\'s resting potential is approximately…', options: ['-70 mV', '+30 mV', '0 mV', '-700 mV'], correct: 0 },
      { q: 'During the rising phase of the spike, which ions rush in?', options: ['Potassium', 'Sodium', 'Calcium', 'Chloride'], correct: 1 },
      { q: 'How do neurons encode stronger stimuli?', options: ['Bigger spikes', 'Higher firing rates', 'Longer axons', 'More myelin'], correct: 1, explain: 'Spikes are all-or-nothing; intensity is coded by rate and timing.' },
    ],
  },
  {
    id: 'neur-3',
    categoryId: 'neurons',
    title: 'Synapses & Neurotransmitters',
    level: 'Intermediate',
    minutes: 7,
    summary: 'The chemical handshake between neurons, and the messengers that shape mind.',
    diagram: 'synapse',
    sections: [
      {
        heading: 'Across the gap',
        text: 'Neurons do not touch; they communicate across a ~20 nanometer synaptic cleft. When a spike arrives at the terminal, calcium floods in, vesicles fuse with the membrane and release neurotransmitter molecules. These diffuse across the cleft and bind receptors on the receiving neuron, opening ion channels that nudge its voltage up (excitatory) or down (inhibitory).',
      },
      {
        heading: 'The chemical cast',
        text: 'Glutamate is the main excitatory transmitter; GABA the main inhibitory one. Dopamine carries reward-prediction and motivation signals, serotonin modulates mood and sleep, acetylcholine supports attention and memory, and norepinephrine drives arousal. Calling any of them "the happiness chemical" oversimplifies, each acts through many receptor systems.',
      },
      {
        heading: 'Synapses that learn',
        text: 'Synapse strength is not fixed. Repeated co-activation can strengthen a connection (long-term potentiation), while disuse weakens it (long-term depression). This activity-dependent tuning, summarized as "neurons that fire together, wire together," is a leading cellular model of how learning is stored.',
      },
    ],
    keyFacts: [
      'Synaptic transmission is chemical: vesicles release neurotransmitters across a ~20 nm cleft.',
      'Glutamate excites; GABA inhibits; dopamine, serotonin, acetylcholine and norepinephrine modulate.',
      'Synaptic strength changes with use, a cellular basis of learning.',
    ],
    example: 'When you rehearse a phone number, circuits linking temporal and frontal cortex fire together repeatedly, transiently strengthening those synapses so the pattern reactivates more easily.',
    quiz: [
      { q: 'The main excitatory neurotransmitter is…', options: ['GABA', 'Glutamate', 'Serotonin', 'Dopamine'], correct: 1 },
      { q: 'At the synapse, neurotransmitters are released from…', options: ['The nucleus', 'Vesicles in the axon terminal', 'Dendritic spines', 'Myelin'], correct: 1 },
      { q: '"Neurons that fire together, wire together" refers to…', options: ['Myelin growth', 'Activity-dependent synaptic strengthening', 'Neuron death', 'Hormone release'], correct: 1 },
    ],
  },

  // ============ PLASTICITY ============
  {
    id: 'plast-1',
    categoryId: 'plasticity',
    title: 'Neuroplasticity: The Changing Brain',
    level: 'Intermediate',
    minutes: 6,
    summary: 'Your brain is sculpted by experience, at every age.',
    sections: [
      {
        heading: 'The adaptable brain',
        text: 'Neuroplasticity is the brain\'s capacity to change structure and function in response to experience. Synapses strengthen or weaken, dendrites grow or retract, and cortical maps expand for what you practice. Plasticity is strongest in childhood, when the brain is wiring its basics, but persists throughout life.',
      },
      {
        heading: 'Evidence that convinces',
        text: 'London taxi drivers showed larger posterior hippocampi correlated with navigation experience. Musicians show enlarged auditory and motor representations for their instruments. After stroke, neighboring regions can partially take over lost functions through retraining. Experience measurably reshapes the organ.',
      },
      {
        heading: 'Plasticity cuts both ways',
        text: 'The same machinery that builds skills can entrench habits, anxieties and addictions. Repetition plus emotional charge is the recipe for durable change, for better or worse. The practical takeaway: choose deliberately what you repeat, because your brain will faithfully optimize for it.',
      },
    ],
    keyFacts: [
      'Plasticity means experience changes synaptic strength, structure and cortical maps.',
      'It is strongest in childhood but continues across the lifespan.',
      'Plasticity supports both healthy learning and maladaptive habits.',
    ],
    example: 'Juggling studies found that three months of practice increased gray matter in visual-motion areas, and the gains partially faded when practice stopped. Use it or lose it.',
    quiz: [
      { q: 'Neuroplasticity refers to…', options: ['Brain stiffness with age', 'Experience-driven change in brain structure and function', 'Neuron death', 'Skull flexibility'], correct: 1 },
      { q: 'The London taxi driver study found larger…', options: ['Amygdalae', 'Posterior hippocampi', 'Occipital lobes', 'Corpus callosums'], correct: 1 },
      { q: 'Plasticity can be harmful when it…', options: ['Never happens', 'Entrenches addictions or anxieties', 'Improves memory', 'Supports recovery'], correct: 1 },
    ],
  },
  {
    id: 'plast-2',
    categoryId: 'plasticity',
    title: 'Memory Systems',
    level: 'Intermediate',
    minutes: 7,
    summary: 'Working, episodic, semantic, procedural — memory is not one thing.',
    diagram: 'memory',
    sections: [
      {
        heading: 'Working memory: the mental workspace',
        text: 'Working memory holds a few items (typically around 4 chunks) for seconds while you manipulate them. It depends heavily on prefrontal and parietal circuits and is a strong predictor of complex reasoning. Chunking, grouping items into meaningful units, stretches its effective capacity.',
      },
      {
        heading: 'Long-term families',
        text: 'Long-term memory divides into explicit (declarative) memory, facts (semantic) and events (episodic), which depend on the hippocampus and medial temporal lobes, and implicit memory, including skills and habits (procedural), which rely on basal ganglia, cerebellum and motor cortex. This is why you can ride a bike you have not touched in years.',
      },
      {
        heading: 'Consolidation: from fragile to durable',
        text: 'New memories are fragile. Over hours and days, and especially during sleep, hippocampus-dependent memories are gradually reorganized and integrated into cortical networks, becoming more stable. Retrieval is reconstructive: each recall rebuilds the memory, which is why memories can drift and why retrieval practice strengthens them.',
      },
    ],
    keyFacts: [
      'Working memory holds roughly 4 chunks of information for seconds.',
      'Explicit memory (facts, events) depends on the hippocampus; procedural memory on basal ganglia and cerebellum.',
      'Sleep-dependent consolidation stabilizes new memories.',
    ],
    example: 'Learning a language uses all systems: working memory holds new words while you parse grammar, semantic memory stores meanings, episodic memory keeps the classroom moment, and procedural memory automates pronunciation.',
    quiz: [
      { q: 'Working memory typically holds about how many chunks?', options: ['1', '4', '12', 'Unlimited'], correct: 1 },
      { q: 'Riding a bicycle is mainly…', options: ['Episodic memory', 'Procedural memory', 'Working memory', 'Semantic memory'], correct: 1 },
      { q: 'Memory consolidation is strongly supported by…', options: ['Sleep', 'Multitasking', 'Stress', 'Caffeine'], correct: 0 },
    ],
  },
  {
    id: 'plast-3',
    categoryId: 'plasticity',
    title: 'Study Smarter: Science-Backed Techniques',
    level: 'Intermediate',
    minutes: 7,
    summary: 'Spaced repetition, retrieval practice and friends, what actually works.',
    sections: [
      {
        heading: 'Retrieve, don\'t re-read',
        text: 'Testing yourself (retrieval practice) produces far stronger learning than re-reading or highlighting, which feel fluent but leave shallow traces. Flashcards, practice questions and blank-page recall force the brain to reconstruct knowledge, which strengthens the very pathways used at exam time.',
      },
      {
        heading: 'Space it out',
        text: 'Spaced repetition schedules reviews at expanding intervals, catching memories just before they fade. Each successful retrieval flattens the forgetting curve. Cramming can pass tomorrow\'s quiz, but spaced material survives the final, and next year.',
      },
      {
        heading: 'Sleep, interleave, explain',
        text: 'Sleep after learning consolidates material. Interleaving (mixing topics) feels harder but improves discrimination between concepts. Explaining ideas in your own words exposes gaps instantly. These techniques feel less comfortable than passive review, and that desirable difficulty is the signal they are working.',
      },
    ],
    keyFacts: [
      'Retrieval practice beats re-reading for durable learning.',
      'Spaced repetition exploits the forgetting curve for efficient review.',
      'Sleep, interleaving and self-explanation measurably boost retention.',
    ],
    example: 'Instead of re-reading a chapter three times (90 minutes), spend 30 minutes quizzing yourself, 30 minutes explaining the core ideas aloud, and schedule two short recall sessions over the following week.',
    quiz: [
      { q: 'Which technique has the strongest evidence for durable learning?', options: ['Highlighting', 'Re-reading', 'Retrieval practice', 'Listening passively'], correct: 2 },
      { q: 'Spaced repetition works by…', options: ['Cramming harder', 'Reviewing at expanding intervals', 'Studying only at night', 'Avoiding tests'], correct: 1 },
      { q: '"Desirable difficulty" means…', options: ['Learning should be painful', 'Effortful practice often yields stronger learning', 'Easy study is best', 'Difficulty should be avoided'], correct: 1 },
    ],
  },

  // ============ HEALTH ============
  {
    id: 'health-1',
    categoryId: 'health',
    title: 'Sleep & the Brain',
    level: 'Beginner',
    minutes: 6,
    summary: 'Why sleep is the ultimate cognitive enhancer, and how to protect it.',
    diagram: 'sleep',
    sections: [
      {
        heading: 'What sleep does for the brain',
        text: 'During sleep the brain consolidates memories, prunes irrelevant synapses, and flushes metabolic waste through the glymphatic system. Deep slow-wave sleep favors factual memory consolidation; REM sleep supports emotional processing and creative recombination. Cutting sleep short taxes attention, mood and judgment first.',
      },
      {
        heading: 'The two-process model',
        text: 'Sleep pressure builds the longer you are awake (adenosine accumulates), while the circadian clock, entrained mainly by light, sets your timing window. Jet lag and late screens misalign these two systems. Caffeine works by blocking adenosine receptors, masking pressure rather than removing it.',
      },
      {
        heading: 'Protecting your sleep',
        text: 'Evidence-based habits: keep a consistent wake time, get bright light early in the day, finish caffeine 8+ hours before bed, keep the bedroom cool and dark, and wind down screens (they are stimulating and often delay bedtime). Most adults need 7–9 hours; consistency beats occasional marathons.',
      },
    ],
    keyFacts: [
      'Sleep consolidates memories and clears metabolic waste via the glymphatic system.',
      'Adenosine pressure plus the circadian clock govern sleep timing.',
      'Most adults need 7–9 hours; regularity matters as much as duration.',
    ],
    example: 'Students who sleep after studying show better recall than those who stay up cramming the same hours, consolidation works while you rest.',
    quiz: [
      { q: 'Which sleep stage is most linked to factual memory consolidation?', options: ['REM', 'Deep slow-wave sleep', 'Awake drowsiness', 'Microsleeps'], correct: 1, explain: 'Both matter, but slow-wave sleep is strongly tied to declarative consolidation.' },
      { q: 'Caffeine keeps you awake mainly by…', options: ['Adding energy', 'Blocking adenosine receptors', 'Raising melatonin', 'Stopping the circadian clock'], correct: 1 },
      { q: 'The glymphatic system is most active during…', options: ['Sprints', 'Sleep', 'Meals', 'Meetings'], correct: 1 },
    ],
  },
  {
    id: 'health-2',
    categoryId: 'health',
    title: 'Exercise & Cognition',
    level: 'Beginner',
    minutes: 5,
    summary: 'How moving your body upgrades your brain, acutely and long-term.',
    sections: [
      {
        heading: 'The acute boost',
        text: 'A single bout of moderate aerobic exercise increases blood flow, arousal and catecholamines, transiently sharpening attention, processing speed and mood for one to two hours afterwards. Many people find a short walk before demanding mental work genuinely helps.',
      },
      {
        heading: 'The long-term remodel',
        text: 'Regular aerobic exercise raises BDNF, a growth factor that supports synaptic plasticity, and is associated with better hippocampal function and memory performance, particularly in older adults. Resistance training also shows cognitive benefits. The consistent finding: active bodies correlate with healthier brains across the lifespan.',
      },
      {
        heading: 'Dose and realism',
        text: 'Guidelines of ~150 minutes of moderate activity per week are a solid target, but benefits start with far less, any movement beats none. Exercise also improves sleep and reduces stress, multiplying its cognitive returns. Think of it as infrastructure investment for your brain.',
      },
    ],
    keyFacts: [
      'One exercise session can boost attention and mood for 1–2 hours.',
      'Regular aerobic activity raises BDNF and supports hippocampal health.',
      'Cognitive benefits are mediated partly through better sleep and lower stress.',
    ],
    example: 'A 20-minute brisk walk before an exam or presentation can measurably sharpen focus compared with sitting, one of the cheapest cognitive enhancers known.',
    quiz: [
      { q: 'BDNF is best described as…', options: ['A stress hormone', 'A growth factor supporting plasticity', 'A neurotransmitter for pain', 'A sleep chemical'], correct: 1 },
      { q: 'Acute aerobic exercise typically…', options: ['Impairs attention', 'Transiently boosts attention and mood', 'Has no cognitive effect', 'Only helps muscles'], correct: 1 },
      { q: 'The standard weekly moderate-activity guideline is about…', options: ['30 minutes', '150 minutes', '500 minutes', '1000 minutes'], correct: 1 },
    ],
  },
  {
    id: 'health-3',
    categoryId: 'health',
    title: 'Stress & the Brain',
    level: 'Beginner',
    minutes: 6,
    summary: 'Acute stress sharpens; chronic stress erodes. Learn the difference and the antidotes.',
    sections: [
      {
        heading: 'The stress response',
        text: 'Perceived threat activates the amygdala, hypothalamus and the HPA axis, releasing adrenaline and cortisol. Acutely this is adaptive: attention narrows, energy mobilizes, memory for the event strengthens. The system evolved for short bursts, deadlines, sprints, escapes.',
      },
      {
        heading: 'When stress becomes chronic',
        text: 'Sustained high cortisol can shrink dendrites in the hippocampus and prefrontal cortex while strengthening amygdala circuits, biasing the brain toward threat detection and weakening memory and self-control. Chronic stress is one of the most modifiable risk factors for cognitive complaints.',
      },
      {
        heading: 'Evidence-based recovery',
        text: 'Proven countermeasures: regular aerobic exercise, sufficient sleep, social connection, and slow breathing with extended exhales, which stimulates the parasympathetic "rest-and-digest" system. Cognitive reframing (reappraising a threat as a challenge) measurably changes the physiological response. You are not stuck with your stress profile.',
      },
    ],
    keyFacts: [
      'The HPA axis releases cortisol; short bursts are adaptive, chronic elevation is costly.',
      'Chronic stress impairs hippocampal and prefrontal function while sensitizing the amygdala.',
      'Exercise, sleep, connection and slow breathing are proven buffers.',
    ],
    example: 'Before a big talk, reframing racing heart as excitement rather than fear changes performance, studies show arousal reappraisal improves outcomes versus trying to calm down.',
    quiz: [
      { q: 'The hormone most associated with the stress response is…', options: ['Insulin', 'Cortisol', 'Melatonin', 'Testosterone'], correct: 1 },
      { q: 'Chronic stress tends to…', options: ['Grow the hippocampus', 'Impair hippocampal and prefrontal function', 'Improve memory', 'Have no brain effects'], correct: 1 },
      { q: 'Slow breathing with long exhales helps because it…', options: ['Raises adrenaline', 'Activates parasympathetic calming', 'Blocks oxygen', 'Speeds the heart'], correct: 1 },
    ],
  },
];

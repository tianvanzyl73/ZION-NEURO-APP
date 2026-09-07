import { Lesson } from '../types';

export const ADVANCED_LESSONS: Lesson[] = [
  // ============ ATTENTION ============
  {
    id: 'att-1',
    categoryId: 'attention',
    title: 'How Attention Works',
    level: 'Intermediate',
    minutes: 6,
    summary: 'Spotlights, filters and bottlenecks: the brain\'s resource manager.',
    diagram: 'attention',
    sections: [
      {
        heading: 'Attention is a bottleneck',
        text: 'Your senses deliver far more data than the brain can fully process, so attention selects what gets priority. Classic experiments (like dichotic listening) show unattended information is mostly lost, though salient stimuli, like your own name, can still break through. Attention is less a floodlight and more a spotlight with a filter.',
      },
      {
        heading: 'The control network',
        text: 'A frontoparietal network, including the prefrontal cortex and posterior parietal cortex, directs attention, suppresses distractions and switches between targets. The anterior cingulate monitors conflict, like in the Stroop task, where you must name ink colors while ignoring word meanings.',
      },
      {
        heading: 'Training the system',
        text: 'Attention fluctuates naturally in cycles of a few seconds. What you can train: reducing environmental distractions, single-tasking blocks, mindfulness-style practice of noticing mind-wandering and returning, and conflict drills like the Stroop. The goal is not perfect focus forever, but faster, cheaper re-focusing.',
      },
    ],
    keyFacts: [
      'Attention selects a fraction of sensory input for deep processing.',
      'Frontoparietal and cingulate circuits implement attentional control.',
      'Distraction management beats raw willpower.',
    ],
    example: 'In the Stroop task, naming the ink color of the word "RED" printed in blue is slow and error-prone, a direct window into how automatic reading competes with your goal.',
    quiz: [
      { q: 'Attention is best described as…', options: ['Unlimited processing', 'A selection mechanism over limited capacity', 'A sensory organ', 'A memory store'], correct: 1 },
      { q: 'The Stroop task measures…', options: ['Hearing acuity', 'Conflict between automatic and goal-driven responses', 'Color blindness', 'Reading speed only'], correct: 1 },
      { q: 'Mind-wandering practice helps by…', options: ['Preventing all distraction', 'Speeding up noticing and returning to task', 'Eliminating thoughts', 'Replacing sleep'], correct: 1 },
    ],
  },
  {
    id: 'att-2',
    categoryId: 'attention',
    title: 'Distraction, Multitasking & Flow',
    level: 'Intermediate',
    minutes: 6,
    summary: 'Why multitasking is a myth, what phones do to focus, and how flow happens.',
    sections: [
      {
        heading: 'The multitasking myth',
        text: 'The brain cannot truly parallel-process two attention-demanding tasks; it rapidly switches, paying a cost each time: slower performance, more errors, and shallow encoding into memory. Studies of heavy media multitaskers find worse filtering and task-switching, not better.',
      },
      {
        heading: 'The economy of interruptions',
        text: 'After an interruption, refocusing can take many seconds to minutes of full-depth return. Notifications exploit novelty circuits, each ping is a small dopamine-linked orienting event. Practical defenses: batch communication, keep the phone out of sight (mere presence drains attention), and protect 60–90 minute deep-work blocks.',
      },
      {
        heading: 'Flow states',
        text: 'Flow is deep absorption where action and awareness merge. Conditions: clear goals, immediate feedback, and challenge slightly above skill. Neurologically it involves focused frontoparietal engagement with reduced self-referential chatter. Flow is trainable by designing tasks, not by waiting for inspiration.',
      },
    ],
    keyFacts: [
      'Multitasking is rapid task-switching with measurable costs.',
      'Interruptions carry a refocusing cost that compounds through the day.',
      'Flow requires clear goals, fast feedback and matched challenge.',
    ],
    example: 'A student who checks their phone every 10 minutes during study may feel productive, but each switch degrades encoding; the same hours in two protected blocks typically yield more retention.',
    quiz: [
      { q: 'True multitasking on two cognitive tasks is…', options: ['Efficient', 'Rapid switching with costs', 'Improved by practice alone', 'Only possible during flow'], correct: 1 },
      { q: 'A key condition for flow is…', options: ['Very easy tasks', 'Challenge slightly above skill', 'No feedback', 'Multitasking'], correct: 1 },
      { q: 'The mere presence of a phone can…', options: ['Boost memory', 'Drain attentional resources', 'Improve sleep', 'Increase BDNF'], correct: 1, explain: 'Ward et al. found visible phones reduced available cognitive capacity.' },
    ],
  },

  // ============ EMOTION ============
  {
    id: 'emo-1',
    categoryId: 'emotion',
    title: 'The Emotional Brain',
    level: 'Intermediate',
    minutes: 6,
    summary: 'How fear, reward and feelings are built from circuits.',
    sections: [
      {
        heading: 'Fast and slow routes',
        text: 'Threat signals reach the amygdala via a fast, coarse subcortical route and a slower, detailed cortical route. The fast path lets you flinch from a snake-like shape before you know what it is; the cortical path then confirms or corrects. Emotion is not the opposite of thinking, it is a parallel evaluation system.',
      },
      {
        heading: 'Reward and motivation',
        text: 'Midbrain dopamine circuits (ventral tegmental area to striatum and prefrontal cortex) encode reward prediction: not pleasure itself, but learning what is worth pursuing. Unexpected rewards spike dopamine; predicted ones barely register. This is the engine of habit formation, and of the pull of variable-reward apps.',
      },
      {
        heading: 'Feelings as body readouts',
        text: 'Emotions involve bodily states, heart rate, gut, muscle tension, mapped in the insula and related cortex. Theories from James-Lange to modern interoception suggest we partly feel our body\'s response as emotion. This is why breathing and posture changes can genuinely shift mood.',
      },
    ],
    keyFacts: [
      'The amygdala gets a fast, coarse threat signal before full cortical analysis.',
      'Dopamine encodes reward prediction and wanting, more than pleasure itself.',
      'Emotions incorporate bodily states read out by the insula and related regions.',
    ],
    example: 'Jumping at a coiled shape on a path, then realizing it is a rope, is the fast amygdala route firing first and the cortical route correcting a second later.',
    quiz: [
      { q: 'Dopamine circuits most directly encode…', options: ['Pure pleasure', 'Reward prediction and motivation', 'Sadness', 'Sleep depth'], correct: 1 },
      { q: 'The fast threat route reaches which structure first?', options: ['Prefrontal cortex', 'Amygdala', 'Hippocampus', 'Cerebellum'], correct: 1 },
      { q: 'The insula is involved in…', options: ['Sensing body states (interoception)', 'Balance only', 'Hearing pitch', 'Eye movement'], correct: 0 },
    ],
  },
  {
    id: 'emo-2',
    categoryId: 'emotion',
    title: 'Regulating Emotions',
    level: 'Intermediate',
    minutes: 6,
    summary: 'From reaction to response: the science of cognitive reappraisal and calming.',
    sections: [
      {
        heading: 'Top-down meets bottom-up',
        text: 'Emotion regulation works in two directions. Top-down: prefrontal regions reinterpret a situation (cognitive reappraisal), which measurably reduces amygdala reactivity. Bottom-up: changing the body, slow exhale breathing, movement, cold exposure, shifts the physiological state that the brain reads as emotion.',
      },
      {
        heading: 'Name it to tame it',
        text: 'Labeling an emotion ("I am feeling anxious") engages prefrontal language and control circuits and is associated with reduced amygdala activation. Distancing helps too: describing feelings in precise words, or adopting a third-person view, lowers emotional intensity in studies.',
      },
      {
        heading: 'Habits of regulation',
        text: 'Regulation is a skill, not a trait. Practices with evidence: reappraisal training, mindfulness (noticing without reacting), sleep protection (sleep loss amplifies amygdala reactivity), exercise, and social connection. The aim is not to suppress emotion but to widen the gap between stimulus and response.',
      },
    ],
    keyFacts: [
      'Cognitive reappraisal reduces amygdala reactivity via prefrontal circuits.',
      'Affect labeling ("name it to tame it") dampens emotional intensity.',
      'Sleep loss amplifies emotional reactivity.',
    ],
    example: 'Before public speaking, reappraising "I am nervous" as "I am energized and ready" changes cardiovascular response patterns and improves performance in experiments.',
    quiz: [
      { q: 'Cognitive reappraisal means…', options: ['Suppressing feelings', 'Reinterpreting a situation\'s meaning', 'Avoiding triggers', 'Venting'], correct: 1 },
      { q: '"Name it to tame it" refers to…', options: ['Naming pets', 'Labeling emotions to reduce their intensity', 'Naming goals', 'Journaling fiction'], correct: 1 },
      { q: 'Sleep loss tends to…', options: ['Calm the amygdala', 'Amplify emotional reactivity', 'Improve regulation', 'Have no effect'], correct: 1 },
    ],
  },

  // ============ PERSONALITY ============
  {
    id: 'pers-1',
    categoryId: 'personality',
    title: 'The Big Five Personality Traits',
    level: 'Intermediate',
    minutes: 7,
    summary: 'The most empirically supported map of human personality differences.',
    sections: [
      {
        heading: 'Five robust dimensions',
        text: 'Across languages and cultures, personality ratings consistently cluster into five spectrums: Openness (curiosity, creativity), Conscientiousness (order, diligence), Extraversion (sociability, positive energy), Agreeableness (cooperation, trust), and Neuroticism (emotional reactivity). Everyone sits somewhere on each spectrum; there are no "types."',
      },
      {
        heading: 'Where traits come from',
        text: 'Twin studies estimate heritability of the Big Five around 40–60%, with the rest shaped by environment and experience. Traits are fairly stable in adulthood yet gradually shift with age, people typically become more conscientious and agreeable over decades. Traits predict meaningful life outcomes, like academic performance (conscientiousness), but they are tendencies, not destinies.',
      },
      {
        heading: 'Brains and traits',
        text: 'Neuroimaging links traits to differences in brain structure and connectivity, for example, conscientiousness with lateral prefrontal regions involved in planning. These are group-level correlations with small effects, useful for understanding, not for judging individuals.',
      },
    ],
    keyFacts: [
      'The Big Five are spectrums, not boxes: O, C, E, A, N.',
      'Traits are moderately heritable and slowly change across life.',
      'Conscientiousness is a reliable predictor of academic and work performance.',
    ],
    example: 'Two students with equal ability can diverge in grades because conscientiousness shapes study consistency, deadline management and distraction resistance.',
    quiz: [
      { q: 'The Big Five are best understood as…', options: ['Five personality types', 'Five spectrums everyone falls along', 'Five disorders', 'Five brain lobes'], correct: 1 },
      { q: 'Which trait best predicts consistent study habits?', options: ['Openness', 'Conscientiousness', 'Extraversion', 'Neuroticism'], correct: 1 },
      { q: 'Twin studies suggest Big Five heritability is roughly…', options: ['0%', '40–60%', '95%', '100%'], correct: 1 },
    ],
  },
  {
    id: 'pers-2',
    categoryId: 'personality',
    title: 'Temperament: Ancient Roots, Modern Science',
    level: 'Intermediate',
    minutes: 6,
    summary: 'From the four humors to infant reactivity: how temperament ideas evolved.',
    sections: [
      {
        heading: 'The four temperaments',
        text: 'The sanguine, choleric, melancholic and phlegmatic categories descend from ancient Greek medicine and its four humors. They are not a modern scientific model, but they survive because they roughly capture two real dimensions: energy/approach and emotional reactivity. Treat them as a historical lens and vocabulary, not diagnosis.',
      },
      {
        heading: 'Modern temperament research',
        text: 'Developmental psychology studies infant temperament: reactivity, self-regulation, approach/withdrawal. Kagan\'s work showed highly reactive infants often grow into more cautious children, while low-reactive infants tend toward boldness. These early biases are real but malleable; parenting and experience shape their expression.',
      },
      {
        heading: 'From temperament to personality',
        text: 'Temperament is the biological starting set; personality is what emerges as temperament meets experience, culture and deliberate choices. Knowing your tendencies helps you design environments that fit, an anxious temperament may thrive with structure and preparation, a high-energy one with outlets and variety.',
      },
    ],
    keyFacts: [
      'The four temperaments are a historical framework, not modern science.',
      'Infant temperament (reactivity, regulation) is measurable and partly biological.',
      'Personality = temperament + experience + choices over time.',
    ],
    example: 'A "choleric" athlete and a "phlegmatic" teammate may both excel: one thrives on competition pressure, the other on steady routines. Good coaches design for both.',
    quiz: [
      { q: 'The four temperaments model originates from…', options: ['Modern fMRI studies', 'Ancient Greek medicine', 'Behavioral genetics', 'AI research'], correct: 1 },
      { q: 'Kagan found that highly reactive infants often become…', options: ['More cautious children', 'Less emotional adults', 'Identical to peers', 'More aggressive'], correct: 0 },
      { q: 'Temperament is best described as…', options: ['Fixed destiny', 'A biological starting set shaped by experience', 'A clinical diagnosis', 'A myth with no basis'], correct: 1 },
    ],
  },

  // ============ SPORTS ============
  {
    id: 'sport-1',
    categoryId: 'sports',
    title: 'Reaction Time & the Brain',
    level: 'Advanced',
    minutes: 7,
    summary: 'What 200 milliseconds are made of, and how athletes win the race.',
    diagram: 'reaction',
    sections: [
      {
        heading: 'Anatomy of a reaction',
        text: 'Simple visual reaction time averages ~200–250 ms in healthy adults. The chain: retina transduction (~30–50 ms), visual cortex processing, decision circuits (basal ganglia and prefrontal), motor cortex command, spinal transmission and muscle activation. Auditory reactions are faster (~150 ms) because transduction is quicker.',
      },
      {
        heading: 'What training actually improves',
        text: 'Raw neural speed has biological limits, but athletes gain through anticipation: reading body language, spin and context to predict events before they happen. Elite interceptors (batters, goalkeepers) show superior pattern recognition in sport-specific scenes, not faster general reflexes. Decision training under realistic pressure beats pure reflex drills.',
      },
      {
        heading: 'Factors that move your numbers',
        text: 'Reaction time worsens with fatigue, sleep loss, alcohol and distraction; it improves with alertness, warm-up, practice on the specific stimulus-response mapping, and moderate arousal. If you track your reaction time, measure under consistent conditions and compare trends, not single trials.',
      },
    ],
    keyFacts: [
      'Typical simple visual reaction time: ~200–250 ms; auditory ~150 ms.',
      'Elite athletes win mostly via anticipation and pattern recognition.',
      'Fatigue, sleep loss and alcohol measurably slow reactions.',
    ],
    example: 'A baseball batter has ~400 ms from pitch release to contact, too short to react from scratch. Batters track the pitcher\'s release point and predict trajectory.',
    quiz: [
      { q: 'Typical simple visual reaction time is about…', options: ['50 ms', '200–250 ms', '600 ms', '1 second'], correct: 1 },
      { q: 'Elite athletes\' faster responses mostly reflect…', options: ['Faster nerves', 'Better anticipation and pattern recognition', 'Bigger muscles', 'Younger brains'], correct: 1 },
      { q: 'Which factor typically slows reaction time?', options: ['Warm-up', 'Sleep deprivation', 'Practice', 'Moderate arousal'], correct: 1 },
    ],
  },
  {
    id: 'sport-2',
    categoryId: 'sports',
    title: 'Motor Learning & Skill Acquisition',
    level: 'Advanced',
    minutes: 7,
    summary: 'How practice becomes automatic: stages, schedules and the myth of muscle memory.',
    sections: [
      {
        heading: 'Three stages of skill',
        text: 'Fitts and Posner described motor learning in stages: the cognitive stage (understanding what to do, high errors), the associative stage (refining, fewer errors), and the autonomous stage (automatic execution, free attention). Progress is fastest early and plateaus later as circuits consolidate.',
      },
      {
        heading: 'Where skills live',
        text: '"Muscle memory" is brain memory: motor cortex, cerebellum, basal ganglia and their connections are reshaped by practice. Myelination of practiced circuits increases conduction reliability. The cerebellum fine-tunes timing through error signals, each miss updates an internal model.',
      },
      {
        heading: 'Practice that sticks',
        text: 'Evidence-based principles: distributed practice beats massed cramming; variable practice (changing parameters) builds flexible skills; mental rehearsal activates overlapping circuits and measurably helps; and sleep consolidates motor gains, overnight improvement after practice is a real, studied phenomenon.',
      },
    ],
    keyFacts: [
      'Skill learning passes through cognitive, associative and autonomous stages.',
      'Motor memory lives in cortex, cerebellum and basal ganglia, not muscles.',
      'Distributed, variable practice plus sleep maximizes retention.',
    ],
    example: 'A basketball player shooting 50 varied shots (different spots) daily with full sleep will typically retain more than one massing 200 identical shots in a single exhausted session.',
    quiz: [
      { q: 'The final stage of Fitts & Posner\'s model is…', options: ['Cognitive', 'Associative', 'Autonomous', 'Reactive'], correct: 2 },
      { q: '"Muscle memory" actually reflects changes in…', options: ['Muscle fibers', 'Brain circuits (cortex, cerebellum, basal ganglia)', 'Bones', 'Hormones'], correct: 1 },
      { q: 'Which practice schedule best supports retention?', options: ['Massed cramming', 'Distributed practice', 'No practice', 'Observation only'], correct: 1 },
    ],
  },
  {
    id: 'sport-3',
    categoryId: 'sports',
    title: 'Arousal, Pressure & Performance',
    level: 'Advanced',
    minutes: 6,
    summary: 'The Yerkes-Dodson law, choking under pressure, and staying clutch.',
    diagram: 'yerkes',
    sections: [
      {
        heading: 'The inverted-U',
        text: 'The Yerkes-Dodson law describes an inverted-U relationship between arousal and performance: too little activation feels flat and slow; moderate arousal optimizes focus and energy; too much produces tension, tunnel attention and errors. The ideal point is lower for complex, fine-motor tasks and higher for simple, powerful efforts.',
      },
      {
        heading: 'Why athletes choke',
        text: 'Under high pressure, attention can flip inward, monitoring movements that are best run automatically ("explicit monitoring theory"), disrupting smooth execution. Working memory also fills with worry, leaving less capacity for the task. Both mechanisms are measurable and common even in elites.',
      },
      {
        heading: 'Training the pressure response',
        text: 'Tools with evidence: pre-performance routines (anchor attention externally), arousal reappraisal (excitement vs threat), quiet-eye training (longer final fixation on targets), and practicing under simulated pressure so competition feels familiar. Pressure tolerance is a trainable skill, not a personality gift.',
      },
    ],
    keyFacts: [
      'Performance follows an inverted-U with arousal (Yerkes-Dodson).',
      'Choking often comes from over-monitoring automatic skills.',
      'Routines, reappraisal and pressure exposure are trainable countermeasures.',
    ],
    example: 'A golfer missing a short putt often does so because attention shifted to the mechanics of the stroke, a skill that runs best when trusted and externally focused.',
    quiz: [
      { q: 'The Yerkes-Dodson law describes…', options: ['Linear arousal gains', 'An inverted-U arousal-performance curve', 'Sleep cycles', 'Muscle fatigue'], correct: 1 },
      { q: 'Complex fine-motor tasks perform best at…', options: ['Very high arousal', 'Moderate-to-lower arousal', 'Zero arousal', 'Maximum adrenaline'], correct: 1 },
      { q: 'Choking under pressure is often caused by…', options: ['Too little practice', 'Monitoring automatic skills consciously', 'Low motivation', 'Poor diet'], correct: 1 },
    ],
  },
  {
    id: 'sport-4',
    categoryId: 'sports',
    title: 'Flow: Peak Performance States',
    level: 'Advanced',
    minutes: 6,
    summary: 'The neuroscience of being "in the zone" and how to engineer more of it.',
    diagram: 'flow',
    sections: [
      {
        heading: 'What flow feels like, and is',
        text: 'Flow, described by Csikszentmihalyi, is complete absorption in an activity: action and awareness merge, time distorts, and performance feels effortless. Research links it to focused frontoparietal engagement, reduced self-referential processing (quiet inner critic), and dopaminergic reward signaling.',
      },
      {
        heading: 'The conditions',
        text: 'Flow reliably appears when: challenge slightly exceeds skill (roughly at the edge of ability), goals are crystal clear, feedback is immediate, and distractions are absent. Mismatch in either direction kills it: too easy breeds boredom, too hard breeds anxiety.',
      },
      {
        heading: 'Engineering flow in training',
        text: 'Design sessions with explicit micro-goals, instant feedback (video, timers, coach cues), and difficulty tuned to the edge of current ability. Protect deep blocks from interruptions, flow takes minutes to enter and seconds to break. Athletes who structure practice this way report more flow and faster improvement.',
      },
    ],
    keyFacts: [
      'Flow requires matched challenge, clear goals and immediate feedback.',
      'It involves focused attention networks with reduced self-monitoring.',
      'Flow is designable through practice structure, not luck.',
    ],
    example: 'A climber on a route just beyond their level, with instant feedback from each hold, hits the classic flow recipe: full attention, no room for self-doubt.',
    quiz: [
      { q: 'Flow is most likely when…', options: ['Tasks are very easy', 'Challenge slightly exceeds skill', 'Feedback is absent', 'Multitasking'], correct: 1 },
      { q: 'During flow, self-referential processing tends to…', options: ['Increase', 'Decrease', 'Spike randomly', 'Replace attention'], correct: 1 },
      { q: 'Who popularized the flow concept in research?', options: ['Freud', 'Csikszentmihalyi', 'Pavlov', 'Skinner'], correct: 1 },
    ],
  },

  // ============ METHODS ============
  {
    id: 'meth-1',
    categoryId: 'methods',
    title: 'How We Image the Brain',
    level: 'Advanced',
    minutes: 7,
    summary: 'EEG, fMRI and friends: what each tool can and cannot tell us.',
    diagram: 'eeg',
    sections: [
      {
        heading: 'EEG: fast but fuzzy',
        text: 'Electroencephalography records electrical activity from the scalp with millisecond precision, ideal for tracking rhythms (delta to gamma) and event-related responses. Its spatial resolution is poor: signals blur through the skull, so pinpointing sources is hard. EEG shines in sleep staging, attention research and brain-computer interfaces.',
      },
      {
        heading: 'fMRI: detailed but slow',
        text: 'Functional MRI measures the BOLD signal, blood-oxygen changes that follow neural activity by seconds. It offers millimeter-scale maps of active regions but is sluggish and indirect. A colorful brain image shows statistical contrasts, not "activity" per se, and famous dead-salmon studies remind us to respect statistics.',
      },
      {
        heading: 'Reading brain images critically',
        text: 'Good questions to ask of any scan claim: How many participants? What contrast was used? Was it corrected for multiple comparisons? Is the effect replicated? Neuroimaging is powerful but probabilistic. Literacy here protects you from neuromarketing and overblown headlines.',
      },
    ],
    keyFacts: [
      'EEG has excellent temporal but poor spatial resolution; fMRI the reverse.',
      'fMRI measures blood-oxygen (BOLD) changes, an indirect proxy for neural activity.',
      'Brain images show statistical maps, not literal "glowing" regions.',
    ],
    example: 'Studying the timing of word recognition? EEG. Mapping which regions handle grammar vs meaning? fMRI. Each tool answers different questions.',
    quiz: [
      { q: 'EEG\'s main strength is…', options: ['Spatial detail', 'Millisecond timing', 'Chemical imaging', 'Deep structure access'], correct: 1 },
      { q: 'fMRI\'s BOLD signal reflects…', options: ['Direct neuron firing', 'Blood oxygenation changes', 'Neurotransmitter levels', 'Skull thickness'], correct: 1 },
      { q: 'A colorful fMRI blob means…', options: ['That region is "on"', 'A statistical contrast survived correction', 'The person is smart', 'Nothing useful'], correct: 1 },
    ],
  },
  {
    id: 'meth-2',
    categoryId: 'methods',
    title: 'Brain-Computer Interfaces & the Future',
    level: 'Advanced',
    minutes: 6,
    summary: 'Where neuroscience is heading: BCIs, neurofeedback and responsible hype-filtering.',
    sections: [
      {
        heading: 'Brain-computer interfaces',
        text: 'BCIs read neural signals to control external devices. Clinical successes include cursor control and text decoding for people with paralysis, and deep brain stimulation for Parkinson\'s tremor. Consumer EEG headsets offer coarser signals, useful for attention games and sleep tracking, not mind-reading.',
      },
      {
        heading: 'Neurofeedback and stimulation',
        text: 'Neurofeedback trains people to modulate their own brain rhythms using real-time EEG; evidence supports some applications (e.g., certain protocols in ADHD research) while other claims outrun the data. Non-invasive stimulation (tDCS/TMS) can modulate cortical excitability; TMS is an approved depression treatment, DIY claims deserve caution.',
      },
      {
        heading: 'The responsible future',
        text: 'The frontier raises real questions: neural data privacy, cognitive enhancement ethics, and equitable access. A scientifically literate public, people who can tell replicated findings from press-release hype, shapes how these technologies get governed. That literacy is what this course builds.',
      },
    ],
    keyFacts: [
      'Clinical BCIs already restore communication for some people with paralysis.',
      'Deep brain stimulation is an established treatment for Parkinson\'s symptoms.',
      'Neural data privacy and enhancement ethics are active policy questions.',
    ],
    example: 'A person with ALS can now type by imagined handwriting decoded from motor cortex implants, a real clinical milestone, not science fiction.',
    quiz: [
      { q: 'Deep brain stimulation is an established treatment for…', options: ['Parkinson\'s symptoms', 'Broken bones', 'Myopia', 'Common cold'], correct: 0 },
      { q: 'Consumer EEG headsets can…', options: ['Read thoughts', 'Provide coarse rhythm data for games/tracking', 'Replace MRI', 'Cure insomnia'], correct: 1 },
      { q: 'An ethical frontier issue in neuroscience is…', options: ['Neural data privacy', 'Color of lab coats', 'Textbook pricing', 'Font choice'], correct: 0 },
    ],
  },
];

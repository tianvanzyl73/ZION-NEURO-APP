interface KBEntry {
  keys: string[];
  reply: string;
}

const KB: KBEntry[] = [
  {
    keys: ['hello', 'hi ', 'hey', 'who are you', 'what are you'],
    reply:
      'Hello! I am ZION NEURO AI, your neuroscience study companion. I can explain brain concepts, suggest lessons and quizzes, share study strategies, and discuss brain-healthy habits. What would you like to explore?',
  },
  {
    keys: ['neuron', 'neurons', 'nerve cell'],
    reply:
      'A neuron is a nerve cell specialized for signaling. It has dendrites that receive input, a soma (cell body) that integrates it, and an axon that transmits an electrical impulse called an action potential. At the axon terminals, the signal is passed to the next cell across a synapse, usually with chemical messengers called neurotransmitters. Your brain contains roughly 86 billion of them. Try the lesson "Anatomy of a Neuron" in the Learn tab.',
  },
  {
    keys: ['synapse', 'synapses', 'synaptic'],
    reply:
      'A synapse is the junction where one neuron communicates with another. When an action potential reaches the terminal, vesicles release neurotransmitters into the synaptic cleft; these bind to receptors on the receiving cell and change its likelihood of firing. Synapses that are used together become more efficient over time, a principle often summarized as "neurons that fire together, wire together."',
  },
  {
    keys: ['neurotransmitter', 'dopamine', 'serotonin', 'gaba', 'glutamate', 'acetylcholine'],
    reply:
      'Neurotransmitters are chemical messengers. Key examples: glutamate (main excitatory transmitter), GABA (main inhibitory), dopamine (learning signals, motivation and movement), serotonin (mood and sleep regulation), acetylcholine (attention and memory), and norepinephrine (arousal and alertness). Each acts on specific receptor types, which is why their effects are nuanced rather than simple "happy chemicals."',
  },
  {
    keys: ['amygdala', 'fear'],
    reply:
      'The amygdala is an almond-shaped structure deep in the temporal lobe that is central to threat detection and emotional learning, especially fear conditioning. It can trigger fast responses before the cortex fully analyzes a situation, which is why you can jump at a sudden sound before realizing what it is. Emotion regulation involves prefrontal regions modulating this response. See the lesson "The Emotional Brain".',
  },
  {
    keys: ['hippocampus', 'memory formation'],
    reply:
      'The hippocampus, part of the limbic system, is crucial for forming new episodic and spatial memories and for consolidating them during sleep. The famous patient H.M. showed that without a functioning hippocampus, new long-term memories could not be formed, while older memories remained. Lesson tip: "Memory Systems" in the Learn tab.',
  },
  {
    keys: ['prefrontal', 'frontal lobe', 'decision'],
    reply:
      'The prefrontal cortex supports planning, working memory, impulse control and decision-making. It is one of the last regions to fully mature, continuing development into the mid-twenties. It acts like an executive, coordinating other brain systems rather than working alone.',
  },
  {
    keys: ['neuroplasticity', 'plasticity', 'brain change'],
    reply:
      'Neuroplasticity is the brain\u2019s ability to change its structure and function in response to experience: strengthening synapses that are used, pruning those that are not, and even reorganizing maps after injury. It is the biological basis of learning. A classic example: London taxi drivers were found to have larger posterior hippocampi, correlated with navigation experience.',
  },
  {
    keys: ['sleep', 'insomnia', 'rest'],
    reply:
      'Sleep is when the brain consolidates memories, clears metabolic waste via the glymphatic system, and restores attention networks. Most adults need 7\u20139 hours. Tips backed by research: keep a consistent schedule, get morning daylight, cut caffeine late in the day, and keep screens dim before bed. Full lesson: "Sleep & the Brain".',
  },
  {
    keys: ['exercise', 'workout', 'sport', 'training', 'bdnf'],
    reply:
      'Aerobic exercise boosts blood flow to the brain and raises BDNF, a protein that supports synaptic plasticity and hippocampal function. Regular activity is associated with better attention, processing speed and memory consolidation. Even a 20-minute brisk walk can transiently sharpen focus. See "Exercise & Cognition" and the Sports & Performance section.',
  },
  {
    keys: ['stress', 'cortisol', 'anxiety', 'pressure'],
    reply:
      'Acute stress releases cortisol and adrenaline, sharpening attention briefly. Chronic stress, however, can impair the hippocampus and prefrontal function, hurting memory and self-control. Evidence-based countermeasures: regular exercise, sufficient sleep, slow breathing (longer exhales), and cognitive reframing. The Yerkes-Dodson lesson explains how arousal affects performance.',
  },
  {
    keys: ['study', 'learn faster', 'memorize', 'exam', 'revision', 'spaced repetition'],
    reply:
      'Science-backed study techniques: (1) Spaced repetition, reviewing material at expanding intervals. (2) Retrieval practice, testing yourself instead of re-reading. (3) Interleaving, mixing topics. (4) Sleep after learning to consolidate. (5) Explaining concepts in your own words. Avoid passive highlighting; they feel productive but score poorly in research. Full lesson: "Study Smarter".',
  },
  {
    keys: ['attention', 'focus', 'concentrate', 'distract', 'multitask'],
    reply:
      'Attention is a limited resource managed by frontoparietal networks. True multitasking is mostly rapid task-switching, which carries a cognitive cost. To focus better: remove phone notifications, work in single-task blocks, and practice the Stroop drill in the Train tab to strengthen selective attention.',
  },
  {
    keys: ['left brain', 'right brain', 'hemisphere'],
    reply:
      'The popular "left-brained vs right-brained" idea is a myth: neuroimaging shows healthy people use both hemispheres together for nearly all tasks. What is real is lateralization of some functions (e.g., language is left-dominant for most people). Our Left/Right quiz explores your self-reported cognitive preferences, useful for reflection, not for locating abilities in one hemisphere.',
  },
  {
    keys: ['personality', 'big five', 'big 5', 'traits'],
    reply:
      'The Big Five (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) is the most empirically supported framework for describing personality differences. Traits are spectrums, moderately heritable, and fairly stable in adulthood while still capable of gradual change. Take the Personality Assessment in the Assess tab to see your profile.',
  },
  {
    keys: ['temperament', 'sanguine', 'choleric', 'melancholic', 'phlegmatic'],
    reply:
      'The four temperaments (sanguine, choleric, melancholic, phlegmatic) come from ancient medicine and are not a modern scientific model. They remain interesting as a historical framework and as rough descriptions of energy and reactivity styles. Modern research uses trait models like the Big Five instead. Our app presents them transparently as traditional categories.',
  },
  {
    keys: ['reaction time', 'reflex', 'reaction'],
    reply:
      'Simple visual reaction time in healthy adults is typically around 200\u2013250 ms. It depends on sensory processing, decision circuits, and motor output, and improves with practice, alertness and sport-specific anticipation. Test yours with the Reaction Drill in the Train tab, and read "Reaction Time & the Brain" in Sports & Performance.',
  },
  {
    keys: ['motor learning', 'skill', 'practice', 'muscle memory'],
    reply:
      '"Muscle memory" actually lives in the brain: motor learning reshapes circuits in the motor cortex, cerebellum and basal ganglia. Early gains are fast (strategy changes), later gains are slow (structural refinement). Distributed practice, sleep, and mental rehearsal all measurably improve skill consolidation. Lesson: "Motor Learning & Skill Acquisition".',
  },
  {
    keys: ['flow', 'zone', 'peak performance'],
    reply:
      'Flow is a state of deep absorption where challenge slightly exceeds skill, goals are clear and feedback is immediate. Research associates it with focused frontoparietal activity and reduced self-referential processing. Build it: pick tasks ~4% beyond comfort, remove distractions, and define clear micro-goals. Full lesson in Sports & Performance.',
  },
  {
    keys: ['myelin', 'myelination'],
    reply:
      'Myelin is a fatty insulation wrapped around axons by oligodendrocytes (glial cells). It allows action potentials to jump between gaps (nodes of Ranvier), speeding conduction up to ~120 m/s. Skill practice promotes myelination of the relevant circuits, one reason consistent practice feels like "upgrading bandwidth."',
  },
  {
    keys: ['action potential', 'electrical', 'firing', 'impulse'],
    reply:
      'An action potential is a brief (~1 ms) reversal of a neuron\u2019s membrane voltage: sodium channels open and the inside jumps from about -70 mV to +30 mV, then potassium channels restore the charge. It travels down the axon like a wave and obeys an all-or-nothing principle. See the diagram in "The Action Potential" lesson.',
  },
  {
    keys: ['10%', 'ten percent', '10 percent'],
    reply:
      'The idea that we use only 10% of our brain is a myth. Brain imaging shows that over a normal day, virtually all regions show activity, and most regions are active much of the time. Damage to almost any area produces measurable deficits. This myth is covered in "Brain Myths, Debunked".',
  },
  {
    keys: ['quiz', 'assessment', 'test me', 'recommend'],
    reply:
      'Head to the Assess tab. Start with the Memory Quiz and Attention Quiz to benchmark your cognitive habits, then try the Big Five Personality Assessment and the Left/Right cognitive-preference quiz. Afterwards, open your Brain Profile to see personalized training recommendations.',
  },
  {
    keys: ['premium', 'subscription', 'upgrade', 'member'],
    reply:
      'ZION NEURO Free includes beginner and intermediate lessons, all core assessments, and daily brain challenges. ZION NEURO Premium unlocks advanced lessons, the full Methods & Frontiers track, unlimited AI conversations, and deeper progress insights. You can view plans from the gold crown banner on your dashboard.',
  },
  {
    keys: ['privacy', 'data', 'secure'],
    reply:
      'Your data stays on your device. Profiles, scores and progress are stored locally, your PIN is kept in secure device storage, and nothing is uploaded to a server. You can export or erase all your data anytime in Settings \u2192 Privacy.',
  },
  {
    keys: ['thank', 'thanks'],
    reply: 'You are welcome! Keep exploring, and remember: every time you practice, your brain physically adapts. That is neuroplasticity working for you.' },
];

const FALLBACKS = [
  'Interesting question. I am a focused educational assistant, so I shine on neuroscience topics. Try asking about neurons, synapses, memory, sleep, attention, personality, or sports performance, or ask me to recommend a lesson.',
  'I do not have a confident answer for that. For reliable neuroscience, ask me about brain anatomy, neurotransmitters, learning techniques, brain health, or cognitive assessments, or browse the Learn tab.',
];

export function generateReply(raw: string): string {
  const input = ` ${raw.toLowerCase()} `;
  let best: { score: number; reply: string } | null = null;
  for (const e of KB) {
    let s = 0;
    for (const k of e.keys) {
      if (input.includes(k)) s += k.length;
    }
    if (s > 0 && (!best || s > best.score)) best = { score: s, reply: e.reply };
  }
  if (best) return best.reply;
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

export const AI_SUGGESTIONS = [
  'Explain neuroplasticity',
  'How do I study smarter?',
  'What is the left/right brain myth?',
  'Tips for better sleep',
  'How does reaction time work?',
  'Recommend an assessment',
];

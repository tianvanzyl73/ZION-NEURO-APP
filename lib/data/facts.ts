export interface DailyFact {
  title: string;
  text: string;
  source: string;
}

export const DAILY_FACTS: DailyFact[] = [
  {
    title: 'An Expensive Organ',
    text: 'Your brain is about 2% of your body weight, yet it consumes roughly 20% of your body\u2019s energy budget at rest.',
    source: 'Metabolic neuroscience literature',
  },
  {
    title: '86 Billion',
    text: 'Modern cell-counting studies estimate the human brain contains about 86 billion neurons, roughly as many as the number of stars in the Milky Way.',
    source: 'Herculano-Houzel, 2009',
  },
  {
    title: 'Speed of Thought',
    text: 'Signals in heavily myelinated neurons can travel up to around 120 meters per second, faster than a Formula 1 car.',
    source: 'Neurophysiology textbooks',
  },
  {
    title: 'The Cerebellum\u2019s Secret',
    text: 'Although the cerebellum is only about 10% of brain volume, it contains more than half of all the brain\u2019s neurons, supporting motor coordination and learning.',
    source: 'Herculano-Houzel, 2010',
  },
  {
    title: 'Taxi Drivers\u2019 Brains',
    text: 'London taxi drivers were found to have larger posterior hippocampi, a region for spatial memory, with size correlating with years of navigation experience.',
    source: 'Maguire et al., 2000',
  },
  {
    title: 'Sleep Cleans House',
    text: 'During sleep, the glymphatic system flushes cerebrospinal fluid through brain tissue, helping clear metabolic waste products that build up while awake.',
    source: 'Xie et al., 2013',
  },
  {
    title: 'No Pain in the Brain',
    text: 'The brain itself has no pain receptors. The headache you feel comes from pain-sensitive structures around it, like blood vessels and meninges.',
    source: 'Clinical neurology',
  },
  {
    title: 'Pruning for Precision',
    text: 'During adolescence the brain prunes unused synapses and strengthens used ones, making circuits more efficient. Experience literally sculpts the teenage brain.',
    source: 'Developmental neuroscience',
  },
  {
    title: 'Still Building at 25',
    text: 'The prefrontal cortex, key for planning and impulse control, continues maturing into the mid-twenties, one reason risk-taking peaks in adolescence.',
    source: 'Gogtay et al., 2004',
  },
  {
    title: 'Exercise Grows Support',
    text: 'Aerobic exercise raises levels of BDNF, a protein that supports synaptic plasticity, and is associated with improved memory performance.',
    source: 'Erickson et al., 2011',
  },
  {
    title: 'A Visual Brain',
    text: 'Roughly one quarter to one third of the human cortex is involved in vision in some way, making it our most cortex-hungry sense.',
    source: 'Van Essen, 2004',
  },
  {
    title: 'The 10% Myth',
    text: 'We do not use only 10% of our brain. Imaging shows that over a normal day, virtually every region shows activity, and most regions are active much of the time.',
    source: 'Neuroimaging reviews',
  },
  {
    title: 'Wireless-Like Bandwidth',
    text: 'Neurons synchronize into rhythmic oscillations (delta to gamma bands). Different rhythms are linked to sleep stages, attention and memory processing.',
    source: 'EEG research',
  },
  {
    title: 'Memory Is Reconstructive',
    text: 'Recalling a memory makes it temporarily flexible before being stored again. Memories are reconstructions, not perfect recordings, which is why they can drift over time.',
    source: 'Nader et al., 2000',
  },
];

export function factOfTheDay(): DailyFact {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / 86400000);
  return DAILY_FACTS[day % DAILY_FACTS.length];
}

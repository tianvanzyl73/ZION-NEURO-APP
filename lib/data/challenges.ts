import { GameId } from '../types';

export interface DailyChallenge {
  title: string;
  prompt: string;
  answer: string;
  insight: string;
  gameId: GameId;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    title: 'Stroop Sprint',
    prompt: 'Name the INK COLOR (not the word) as fast as you can: the word "BLUE" printed in red ink. Why does this feel hard?',
    answer: 'Reading is automatic; naming the conflicting ink color requires the anterior cingulate and prefrontal regions to override the habitual response. That conflict cost is the Stroop effect.',
    insight: 'This interference is a classic measure of selective attention and cognitive control.',
    gameId: 'stroop',
  },
  {
    title: 'Digit Span Push',
    prompt: 'Have someone read a string of numbers at one per second, then repeat them back. Most adults can hold about how many items in working memory?',
    answer: 'About 4\u20137 items. Chunking (grouping digits into meaningful units) can stretch your effective span.',
    insight: 'Working memory capacity is one of the best-studied predictors of complex cognitive performance.',
    gameId: 'sequence',
  },
  {
    title: 'Mental Rotation',
    prompt: 'Imagine the letter "R" rotated 180 degrees. Now: does it face left or right? (Take your time and visualize.)',
    answer: 'Rotated 180\u00b0, a normal right-facing R ends up upside down and facing left. Mental rotation time increases with the angle of rotation, as if you really "turn" the image.',
    insight: 'Shepard & Metzler\u2019s classic experiments showed mental rotation is analog and takes measurable time.',
    gameId: 'grid',
  },
  {
    title: 'Reaction Readiness',
    prompt: 'A sprinter hears the starting gun. Roughly how long before the first muscle response: 50 ms, 150 ms, or 500 ms?',
    answer: 'Around 150 ms for an auditory start. Sound reaches the ear faster to process than vision, which is why starters use a gun sound.',
    insight: 'Reaction time = sensory transduction + neural processing + motor command. Training mostly improves anticipation.',
    gameId: 'reaction',
  },
  {
    title: 'The Forgetting Curve',
    prompt: 'Without review, roughly what fraction of new information is typically forgotten within a day, according to Ebbinghaus\u2019s classic curve?',
    answer: 'A large majority, often over half, fades within 24 hours unless reviewed. Spaced repetition flattens this curve dramatically.',
    insight: 'Timing your reviews just before forgetting is the most efficient known study schedule.',
    gameId: 'sequence',
  },
  {
    title: 'Attention Blink',
    prompt: 'In a rapid stream of items, if you spot one target, you often miss a second one appearing within ~300 ms. What is this called?',
    answer: 'The attentional blink. Your attention system briefly refracts after processing the first target.',
    insight: 'Attention is not a camera; it is a bottleneck that serializes perception.',
    gameId: 'stroop',
  },
  {
    title: 'Habit Loop Hunt',
    prompt: 'Identify one of your habits and name its three loop components: cue, routine, reward.',
    answer: 'Example: cue = phone buzz, routine = checking notifications, reward = novelty/dopamine hit. To change a habit, keep the cue and reward but swap the routine.',
    insight: 'Habits shift control from goal-directed prefrontal circuits to automatic basal-ganglia circuits.',
    gameId: 'grid',
  },
  {
    title: 'Two-Ear Test',
    prompt: 'If different words are played in each ear simultaneously, which ear\u2019s words do most right-handed people report slightly better, and why?',
    answer: 'The right ear, slightly. Each ear projects mainly to the opposite hemisphere, and language is left-hemisphere dominant for most right-handers.',
    insight: 'This is the classic dichotic listening finding from Kimura\u2019s work.',
    gameId: 'sequence',
  },
  {
    title: 'Sleep on It',
    prompt: 'True or false: reviewing material right before sleep tends to improve next-day recall compared with reviewing in the morning.',
    answer: 'True, on average. Post-learning sleep protects new memories from interference and supports consolidation, especially for declarative material.',
    insight: 'Sleep is not downtime for the brain; it is an active consolidation window.',
    gameId: 'reaction',
  },
  {
    title: 'Spot the Set',
    prompt: 'Quickly: which does not belong, and why? Dog, Cat, Dolphin, Shark, Seal.',
    answer: 'Shark: it is a fish; the others are mammals. (Or Dolphin/Seal arguments work if you reasoned differently, the point is your categorization strategy.)',
    insight: 'Category reasoning recruits temporal and frontal networks; noticing your strategy is metacognition in action.',
    gameId: 'grid',
  },
];

export function challengeOfTheDay(): DailyChallenge {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / 86400000);
  return DAILY_CHALLENGES[day % DAILY_CHALLENGES.length];
}

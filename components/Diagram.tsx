import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Rect, Ellipse, Text as SvgText } from 'react-native-svg';
import { DiagramKind } from '../lib/types';
import { C, R } from '../lib/theme';

const GOLD = C.gold;
const DIM = 'rgba(212,175,55,0.45)';
const FAINT = 'rgba(242,239,230,0.55)';

function Lbl({ x, y, children, anchor = 'middle', size = 9 }: { x: number; y: number; children: string; anchor?: 'middle' | 'start' | 'end'; size?: number }) {
  return (
    <SvgText
      x={x}
      y={y}
      fill={FAINT}
      fontSize={size}
      fontWeight="600"
      textAnchor={anchor}
      letterSpacing={0.5}
    >
      {children}
    </SvgText>
  );
}

function Frame({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <View style={styles.frame}>
      <Svg width="100%" height={172} viewBox="0 0 320 172">
        {children}
      </Svg>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

function NeuronDiagram() {
  return (
    <Frame caption="Structure of a typical neuron">
      <Line x1={18} y1={70} x2={52} y2={86} stroke={DIM} strokeWidth={2} />
      <Line x1={16} y1={96} x2={52} y2={92} stroke={DIM} strokeWidth={2} />
      <Line x1={24} y1={120} x2={54} y2={98} stroke={DIM} strokeWidth={2} />
      <Line x1={30} y1={58} x2={54} y2={82} stroke={DIM} strokeWidth={2} />
      <Circle cx={66} cy={90} r={15} stroke={GOLD} strokeWidth={2.5} fill="rgba(212,175,55,0.08)" />
      <Circle cx={66} cy={90} r={5} fill={DIM} />
      <Line x1={81} y1={90} x2={240} y2={90} stroke={GOLD} strokeWidth={2.5} />
      {[100, 138, 176, 214].map((x) => (
        <Rect key={x} x={x - 14} y={84} width={28} height={12} rx={6} fill="none" stroke={DIM} strokeWidth={1.8} />
      ))}
      <Line x1={240} y1={90} x2={272} y2={72} stroke={GOLD} strokeWidth={2} />
      <Line x1={240} y1={90} x2={276} y2={90} stroke={GOLD} strokeWidth={2} />
      <Line x1={240} y1={90} x2={272} y2={108} stroke={GOLD} strokeWidth={2} />
      <Circle cx={276} cy={70} r={3.5} fill={GOLD} />
      <Circle cx={280} cy={90} r={3.5} fill={GOLD} />
      <Circle cx={276} cy={110} r={3.5} fill={GOLD} />
      <Lbl x={34} y={42}>Dendrites</Lbl>
      <Lbl x={66} y={128}>Soma</Lbl>
      <Lbl x={158} y={64}>Myelin sheath</Lbl>
      <Lbl x={158} y={124}>Axon</Lbl>
      <Lbl x={272} y={134}>Terminals</Lbl>
    </Frame>
  );
}

function ActionPotentialDiagram() {
  return (
    <Frame caption="The action potential: voltage across time">
      <Line x1={36} y1={16} x2={36} y2={150} stroke={FAINT} strokeWidth={1} />
      <Line x1={36} y1={150} x2={304} y2={150} stroke={FAINT} strokeWidth={1} />
      <Line x1={36} y1={118} x2={304} y2={118} stroke="rgba(242,239,230,0.15)" strokeWidth={1} strokeDasharray="4 4" />
      <Path
        d="M36 118 L92 118 C100 118 104 34 114 30 C124 26 126 138 134 148 C142 156 152 138 162 128 C170 122 178 118 190 118 L304 118"
        stroke={GOLD}
        strokeWidth={2.6}
        fill="none"
        strokeLinecap="round"
      />
      <Lbl x={22} y={112} anchor="start" size={8}>-70mV</Lbl>
      <Lbl x={22} y={36} anchor="start" size={8}>+30mV</Lbl>
      <Lbl x={114} y={20}>Depolarization</Lbl>
      <Lbl x={140} y={166}>Repolarization</Lbl>
      <Lbl x={230} y={108}>Resting potential</Lbl>
    </Frame>
  );
}

function SynapseDiagram() {
  return (
    <Frame caption="Neurotransmitters crossing the synaptic cleft">
      <Path d="M96 14 C76 20 66 44 74 66 C80 82 96 92 118 92 C140 92 156 80 158 60 C160 38 146 18 124 14 Z" fill="rgba(212,175,55,0.08)" stroke={GOLD} strokeWidth={2.2} />
      <Circle cx={100} cy={52} r={6} stroke={DIM} strokeWidth={1.8} fill="none" />
      <Circle cx={122} cy={42} r={6} stroke={DIM} strokeWidth={1.8} fill="none" />
      <Circle cx={134} cy={62} r={6} stroke={DIM} strokeWidth={1.8} fill="none" />
      <Circle cx={112} cy={72} r={6} stroke={DIM} strokeWidth={1.8} fill="none" />
      <Circle cx={104} cy={102} r={2.6} fill={GOLD} />
      <Circle cx={120} cy={106} r={2.6} fill={GOLD} />
      <Circle cx={136} cy={100} r={2.6} fill={GOLD} />
      <Circle cx={112} cy={112} r={2.6} fill={GOLD} />
      <Path d="M60 126 C80 118 100 134 120 126 C140 118 160 134 180 126 C200 118 220 134 240 126" stroke={GOLD} strokeWidth={2.4} fill="none" />
      <Rect x={98} y={120} width={8} height={10} rx={2} fill="none" stroke={DIM} strokeWidth={1.6} />
      <Rect x={132} y={120} width={8} height={10} rx={2} fill="none" stroke={DIM} strokeWidth={1.6} />
      <Rect x={166} y={122} width={8} height={10} rx={2} fill="none" stroke={DIM} strokeWidth={1.6} />
      <Lbl x={230} y={52} anchor="start">Axon terminal</Lbl>
      <Line x1={162} y1={50} x2={226} y2={50} stroke={DIM} strokeWidth={1} />
      <Lbl x={230} y={106} anchor="start">Transmitters</Lbl>
      <Lbl x={230} y={140} anchor="start">Receptors</Lbl>
      <Lbl x={40} y={108} anchor="end">Cleft</Lbl>
    </Frame>
  );
}

function BrainOutline() {
  return (
    <>
      <Path
        d="M56 96 C42 88 44 58 66 48 C70 30 96 22 116 32 C132 18 166 20 178 38 C204 34 226 52 220 74 C236 82 232 104 212 110 C206 124 184 130 168 122 C154 134 128 134 116 122 C94 130 66 120 62 106 Z"
        stroke={GOLD}
        strokeWidth={2.2}
        fill="rgba(212,175,55,0.05)"
      />
      <Path d="M196 118 C206 122 210 132 202 138 C192 142 184 136 186 126" stroke={DIM} strokeWidth={2} fill="none" />
      <Line x1={206} y1={138} x2={212} y2={152} stroke={DIM} strokeWidth={2} />
    </>
  );
}

function LobesDiagram() {
  return (
    <Frame caption="The four lobes of the cerebral cortex">
      <BrainOutline />
      <Ellipse cx={92} cy={78} rx={26} ry={24} fill="rgba(212,175,55,0.16)" stroke={GOLD} strokeWidth={1.4} />
      <Ellipse cx={150} cy={52} rx={26} ry={18} fill="rgba(106,167,255,0.14)" stroke={C.info} strokeWidth={1.4} />
      <Ellipse cx={136} cy={102} rx={28} ry={14} fill="rgba(62,207,142,0.12)" stroke={C.success} strokeWidth={1.4} />
      <Ellipse cx={198} cy={86} rx={18} ry={18} fill="rgba(167,139,250,0.14)" stroke={C.violet} strokeWidth={1.4} />
      <Lbl x={92} y={150} size={8}>FRONTAL</Lbl>
      <Lbl x={150} y={16} size={8}>PARIETAL</Lbl>
      <Lbl x={136} y={166} size={8}>TEMPORAL</Lbl>
      <Lbl x={252} y={60} size={8}>OCCIPITAL</Lbl>
      <Line x1={212} y1={78} x2={244} y2={64} stroke={DIM} strokeWidth={1} />
    </Frame>
  );
}

function LimbicDiagram() {
  return (
    <Frame caption="Key structures of the limbic system">
      <BrainOutline />
      <Ellipse cx={146} cy={72} rx={14} ry={10} fill="rgba(212,175,55,0.2)" stroke={GOLD} strokeWidth={1.6} />
      <Ellipse cx={136} cy={92} rx={9} ry={6} fill="rgba(240,97,109,0.2)" stroke={C.danger} strokeWidth={1.6} />
      <Circle cx={108} cy={96} r={7} fill="rgba(167,139,250,0.2)" stroke={C.violet} strokeWidth={1.6} />
      <Path d="M150 96 C162 92 172 98 174 108 C175 116 166 120 158 116" stroke={C.success} strokeWidth={1.8} fill="none" />
      <Lbl x={146} y={52} size={8}>Thalamus</Lbl>
      <Lbl x={136} y={112} size={8}>Hypothalamus</Lbl>
      <Lbl x={84} y={112} size={8}>Amygdala</Lbl>
      <Lbl x={196} y={126} size={8}>Hippocampus</Lbl>
      <Line x1={112} y1={102} x2={92} y2={108} stroke={DIM} strokeWidth={1} />
      <Line x1={172} y1={112} x2={190} y2={120} stroke={DIM} strokeWidth={1} />
    </Frame>
  );
}

function Box({ x, y, w, h, label, gold }: { x: number; y: number; w: number; h: number; label: string; gold?: boolean }) {
  return (
    <>
      <Rect x={x} y={y} width={w} height={h} rx={7} fill={gold ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)'} stroke={gold ? GOLD : DIM} strokeWidth={1.6} />
      <Lbl x={x + w / 2} y={y + h / 2 + 3} size={8.5}>{label}</Lbl>
    </>
  );
}

function CnsDiagram() {
  return (
    <Frame caption="Organization of the nervous system">
      <Box x={100} y={10} w={120} h={26} label="Nervous System" gold />
      <Line x1={160} y1={36} x2={90} y2={58} stroke={DIM} strokeWidth={1.2} />
      <Line x1={160} y1={36} x2={230} y2={58} stroke={DIM} strokeWidth={1.2} />
      <Box x={40} y={58} w={100} h={24} label="Central (CNS)" gold />
      <Box x={180} y={58} w={100} h={24} label="Peripheral (PNS)" gold />
      <Line x1={90} y1={82} x2={62} y2={102} stroke={DIM} strokeWidth={1.2} />
      <Line x1={90} y1={82} x2={118} y2={102} stroke={DIM} strokeWidth={1.2} />
      <Box x={16} y={102} w={92} h={22} label="Brain" />
      <Box x={72} y={130} w={110} h={22} label="Spinal Cord" />
      <Line x1={118} y1={113} x2={127} y2={130} stroke={DIM} strokeWidth={1} />
      <Line x1={230} y1={82} x2={206} y2={102} stroke={DIM} strokeWidth={1.2} />
      <Line x1={230} y1={82} x2={258} y2={102} stroke={DIM} strokeWidth={1.2} />
      <Box x={160} y={102} w={92} h={22} label="Somatic" />
      <Box x={214} y={130} w={96} h={22} label="Autonomic" />
      <Line x1={258} y1={113} x2={262} y2={130} stroke={DIM} strokeWidth={1} />
    </Frame>
  );
}

function MemoryDiagram() {
  return (
    <Frame caption="From sensory input to durable long-term memory">
      <Box x={12} y={64} w={78} h={30} label="Sensory" />
      <Box x={118} y={64} w={84} h={30} label="Working" gold />
      <Box x={230} y={64} w={78} h={30} label="Long-term" gold />
      <Line x1={90} y1={79} x2={114} y2={79} stroke={GOLD} strokeWidth={1.6} />
      <Path d="M110 75 L116 79 L110 83" stroke={GOLD} strokeWidth={1.6} fill="none" />
      <Line x1={202} y1={79} x2={226} y2={79} stroke={GOLD} strokeWidth={1.6} />
      <Path d="M222 75 L228 79 L222 83" stroke={GOLD} strokeWidth={1.6} fill="none" />
      <Lbl x={51} y={112} size={8}>~seconds</Lbl>
      <Lbl x={160} y={112} size={8}>~4 chunks</Lbl>
      <Lbl x={269} y={112} size={8}>unlimited</Lbl>
      <Box x={150} y={126} w={54} h={20} label="Episodic" />
      <Box x={208} y={126} w={54} h={20} label="Semantic" />
      <Box x={266} y={126} w={50} h={20} label="Skills" />
      <Line x1={269} y1={94} x2={269} y2={122} stroke={DIM} strokeWidth={1} />
      <Line x1={269} y1={118} x2={177} y2={118} stroke={DIM} strokeWidth={1} />
      <Line x1={177} y1={118} x2={177} y2={126} stroke={DIM} strokeWidth={1} />
      <Line x1={235} y1={118} x2={235} y2={126} stroke={DIM} strokeWidth={1} />
    </Frame>
  );
}

function YerkesDiagram() {
  return (
    <Frame caption="The Yerkes-Dodson inverted-U: arousal vs performance">
      <Line x1={30} y1={140} x2={300} y2={140} stroke={FAINT} strokeWidth={1} />
      <Line x1={30} y1={140} x2={30} y2={20} stroke={FAINT} strokeWidth={1} />
      <Path d="M34 132 C80 128 108 40 164 40 C220 40 248 128 296 132" stroke={GOLD} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <Line x1={112} y1={140} x2={112} y2={78} stroke="rgba(242,239,230,0.2)" strokeWidth={1} strokeDasharray="3 3" />
      <Line x1={216} y1={140} x2={216} y2={78} stroke="rgba(242,239,230,0.2)" strokeWidth={1} strokeDasharray="3 3" />
      <Lbl x={72} y={158} size={8}>Under-aroused</Lbl>
      <Lbl x={164} y={26}>Optimal zone</Lbl>
      <Lbl x={258} y={158} size={8}>Overload</Lbl>
      <Lbl x={18} y={30} anchor="start" size={8}>Performance</Lbl>
      <Lbl x={298} y={158} anchor="end" size={8}>Arousal</Lbl>
    </Frame>
  );
}

function FlowDiagram() {
  return (
    <Frame caption="The flow channel: challenge matched to skill">
      <Line x1={36} y1={140} x2={300} y2={140} stroke={FAINT} strokeWidth={1} />
      <Line x1={36} y1={140} x2={36} y2={20} stroke={FAINT} strokeWidth={1} />
      <Path d="M36 140 L280 30" stroke="rgba(240,97,109,0.5)" strokeWidth={1.4} strokeDasharray="5 4" />
      <Path d="M36 140 L200 132 L280 110" stroke="rgba(106,167,255,0.5)" strokeWidth={1.4} strokeDasharray="5 4" />
      <Path d="M36 140 C110 120 190 80 280 58 L280 86 C200 104 120 132 36 140 Z" fill="rgba(212,175,55,0.14)" stroke={GOLD} strokeWidth={1.6} />
      <Lbl x={250} y={24} size={8}>Anxiety</Lbl>
      <Lbl x={260} y={126} size={8}>Boredom</Lbl>
      <Lbl x={180} y={96}>FLOW</Lbl>
      <Lbl x={168} y={158} size={8}>Skill</Lbl>
      <Lbl x={20} y={30} anchor="start" size={8}>Challenge</Lbl>
    </Frame>
  );
}

function EegDiagram() {
  const wave = (y: number, amp: number, freq: number) => {
    let d = `M36 ${y}`;
    for (let x = 36; x <= 210; x += 3) {
      d += ` L${x} ${y + Math.sin((x - 36) / freq) * amp}`;
    }
    return d;
  };
  return (
    <Frame caption="Brainwave bands recorded by EEG">
      <Path d={wave(34, 10, 22)} stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d={wave(68, 8, 14)} stroke={C.info} strokeWidth={1.8} fill="none" />
      <Path d={wave(102, 6, 8)} stroke={C.success} strokeWidth={1.8} fill="none" />
      <Path d={wave(136, 5, 5)} stroke={C.violet} strokeWidth={1.8} fill="none" />
      <Lbl x={250} y={38} size={9}>Beta (focus)</Lbl>
      <Lbl x={250} y={72} size={9}>Alpha (calm)</Lbl>
      <Lbl x={250} y={106} size={9}>Theta (drowsy)</Lbl>
      <Lbl x={250} y={140} size={9}>Delta (deep sleep)</Lbl>
    </Frame>
  );
}

function AttentionDiagram() {
  return (
    <Frame caption="Attention as a spotlight over competing input">
      <Path d="M160 16 L96 130 L224 130 Z" fill="rgba(212,175,55,0.10)" stroke={DIM} strokeWidth={1.4} />
      <Circle cx={160} cy={20} r={8} fill={GOLD} opacity={0.8} />
      <Circle cx={160} cy={112} r={12} fill="rgba(212,175,55,0.3)" stroke={GOLD} strokeWidth={2} />
      <Circle cx={104} cy={118} r={9} fill="none" stroke="rgba(242,239,230,0.25)" strokeWidth={1.6} />
      <Circle cx={216} cy={118} r={9} fill="none" stroke="rgba(242,239,230,0.25)" strokeWidth={1.6} />
      <Circle cx={70} cy={126} r={7} fill="none" stroke="rgba(242,239,230,0.15)" strokeWidth={1.4} />
      <Circle cx={250} cy={126} r={7} fill="none" stroke="rgba(242,239,230,0.15)" strokeWidth={1.4} />
      <Lbl x={160} y={152}>Selected target</Lbl>
      <Lbl x={70} y={152} size={8}>Ignored</Lbl>
      <Lbl x={250} y={152} size={8}>Ignored</Lbl>
    </Frame>
  );
}

function SleepDiagram() {
  return (
    <Frame caption="A night of sleep cycles (hypnogram)">
      <Line x1={30} y1={140} x2={300} y2={140} stroke={FAINT} strokeWidth={1} />
      <Path
        d="M30 40 L58 40 L58 70 L86 70 L86 110 L110 110 L110 78 L134 78 L134 46 L150 46 L150 70 L174 70 L174 110 L196 110 L196 74 L220 74 L220 46 L238 46 L238 70 L262 70 L262 96 L300 96"
        stroke={GOLD}
        strokeWidth={2.2}
        fill="none"
        strokeLinejoin="round"
      />
      <Lbl x={22} y={44} anchor="end" size={8}>Awake</Lbl>
      <Lbl x={22} y={74} anchor="end" size={8}>Light</Lbl>
      <Lbl x={22} y={114} anchor="end" size={8}>Deep</Lbl>
      <Lbl x={142} y={34} size={8}>REM</Lbl>
      <Lbl x={165} y={158} size={8}>Hours of sleep →</Lbl>
    </Frame>
  );
}

function ReactionDiagram() {
  return (
    <Frame caption="The reaction-time chain: stimulus to movement">
      <Box x={10} y={66} w={62} h={30} label="Stimulus" />
      <Box x={86} y={66} w={62} h={30} label="Senses" />
      <Box x={162} y={66} w={66} h={30} label="Decide" gold />
      <Box x={242} y={66} w={66} h={30} label="Move" />
      <Line x1={72} y1={81} x2={84} y2={81} stroke={GOLD} strokeWidth={1.6} />
      <Line x1={148} y1={81} x2={160} y2={81} stroke={GOLD} strokeWidth={1.6} />
      <Line x1={228} y1={81} x2={240} y2={81} stroke={GOLD} strokeWidth={1.6} />
      <Lbl x={41} y={116} size={8}>0 ms</Lbl>
      <Lbl x={117} y={116} size={8}>~50 ms</Lbl>
      <Lbl x={195} y={116} size={8}>~120 ms</Lbl>
      <Lbl x={275} y={116} size={8}>~200 ms</Lbl>
      <Lbl x={160} y={146}>Typical visual reaction: ~200–250 ms total</Lbl>
    </Frame>
  );
}

function HabitDiagram() {
  return (
    <Frame caption="The habit loop: cue, routine, reward">
      <Circle cx={160} cy={86} r={54} fill="none" stroke={DIM} strokeWidth={1.4} strokeDasharray="5 5" />
      <Box x={130} y={16} w={60} h={24} label="Cue" gold />
      <Box x={222} y={104} w={66} h={24} label="Routine" />
      <Box x={34} y={104} w={66} h={24} label="Reward" />
      <Path d="M196 34 C226 44 240 66 240 96" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d="M236 88 L240 98 L246 90" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d="M222 122 C190 142 130 142 100 122" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d="M108 128 L98 120 L106 114" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d="M56 98 C60 66 84 42 122 30" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <Path d="M114 28 L124 28 L118 38" stroke={GOLD} strokeWidth={1.8} fill="none" />
    </Frame>
  );
}

export function Diagram({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case 'neuron': return <NeuronDiagram />;
    case 'actionPotential': return <ActionPotentialDiagram />;
    case 'synapse': return <SynapseDiagram />;
    case 'lobes': return <LobesDiagram />;
    case 'limbic': return <LimbicDiagram />;
    case 'cns': return <CnsDiagram />;
    case 'memory': return <MemoryDiagram />;
    case 'yerkes': return <YerkesDiagram />;
    case 'flow': return <FlowDiagram />;
    case 'eeg': return <EegDiagram />;
    case 'attention': return <AttentionDiagram />;
    case 'sleep': return <SleepDiagram />;
    case 'reaction': return <ReactionDiagram />;
    case 'habit': return <HabitDiagram />;
    default: return null;
  }
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#0C0B08',
    borderRadius: R.md,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  caption: {
    color: C.muted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.4,
  },
});

import React, { useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { C } from '../lib/theme';

const { width } = Dimensions.get('window');

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function NeuronBackdrop({ opacity = 0.5, height = 900 }: { opacity?: number; height?: number }) {
  const { nodes, links } = useMemo(() => {
    const rnd = seeded(42);
    const nodes: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < 26; i++) {
      nodes.push({ x: rnd() * width, y: rnd() * height, r: 1.2 + rnd() * 2.2 });
    }
    const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 130 && links.length < 40) {
          links.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
        }
      }
    }
    return { nodes, links };
  }, [height]);

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
      <Svg width={width} height={height}>
        {links.map((l, i) => (
          <Line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={C.gold} strokeWidth={0.5} opacity={0.16} />
        ))}
        {nodes.map((n, i) => (
          <Circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r} fill={C.gold} opacity={0.35} />
        ))}
      </Svg>
    </View>
  );
}

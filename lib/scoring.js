"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPERAMENT_NAMES = exports.BIGFIVE_NAMES = void 0;
exports.scoreAssessment = scoreAssessment;
exports.latestByKind = latestByKind;
exports.buildBrainProfile = buildBrainProfile;
exports.BIGFIVE_NAMES = {
    O: 'Openness',
    C: 'Conscientiousness',
    E: 'Extraversion',
    A: 'Agreeableness',
    N: 'Neuroticism',
};
exports.TEMPERAMENT_NAMES = {
    S: { name: 'Sanguine', desc: 'Enthusiastic, social, energetic and idea-driven.' },
    C: { name: 'Choleric', desc: 'Decisive, goal-oriented, competitive and direct.' },
    M: { name: 'Melancholic', desc: 'Analytical, detail-focused, reflective and deep-feeling.' },
    P: { name: 'Phlegmatic', desc: 'Calm, steady, cooperative and conflict-averse.' },
};
function scoreAssessment(a, answers) {
    switch (a.kind) {
        case 'lr': {
            let L = 0;
            let R = 0;
            a.items.forEach((item, i) => {
                if (item.type === 'tagged') {
                    const opt = item.options[answers[i]];
                    if (!opt)
                        return;
                    if (opt.tag === 'L')
                        L++;
                    else
                        R++;
                }
            });
            const total = L + R || 1;
            const rPct = Math.round((R / total) * 100);
            let label = 'Integrated Thinker';
            if (rPct <= 35)
                label = 'Analytical-Leaning';
            else if (rPct >= 65)
                label = 'Holistic-Leaning';
            const summary = label === 'Analytical-Leaning'
                ? 'You report a preference for structured, sequential, detail-focused thinking.'
                : label === 'Holistic-Leaning'
                    ? 'You report a preference for big-picture, intuitive, visual thinking.'
                    : 'You flex between analytical and holistic styles depending on the situation.';
            return { score: rPct, label, summary, detail: { L, R } };
        }
        case 'temperament': {
            const counts = { S: 0, C: 0, M: 0, P: 0 };
            a.items.forEach((item, i) => {
                if (item.type === 'tagged') {
                    const opt = item.options[answers[i]];
                    if (opt && counts[opt.tag] !== undefined)
                        counts[opt.tag]++;
                }
            });
            const sorted = Object.entries(counts).sort((x, y) => y[1] - x[1]);
            const dom = sorted[0][0];
            const sec = sorted[1][1] > 0 ? sorted[1][0] : '';
            const label = `${exports.TEMPERAMENT_NAMES[dom].name}${sec ? ` / ${exports.TEMPERAMENT_NAMES[sec].name}` : ''}`;
            const total = a.items.length || 1;
            return {
                score: Math.round((sorted[0][1] / total) * 100),
                label,
                summary: exports.TEMPERAMENT_NAMES[dom].desc,
                detail: counts,
            };
        }
        case 'bigfive': {
            const sums = { O: 0, C: 0, E: 0, A: 0, N: 0 };
            const cnt = { O: 0, C: 0, E: 0, A: 0, N: 0 };
            a.items.forEach((item, i) => {
                if (item.type === 'likert') {
                    let v = answers[i] || 3;
                    if (item.reverse)
                        v = 6 - v;
                    sums[item.trait] += v;
                    cnt[item.trait] += 1;
                }
            });
            const detail = {};
            Object.keys(sums).forEach((t) => {
                detail[t] = cnt[t] ? Math.round(((sums[t] / cnt[t] - 1) / 4) * 100) : 50;
            });
            const top = Object.entries(detail).sort((x, y) => y[1] - x[1])[0];
            const label = `${exports.BIGFIVE_NAMES[top[0]]}-Dominant Profile`;
            return {
                score: Math.round(Object.values(detail).reduce((s, v) => s + v, 0) / 5),
                label,
                summary: `Your most pronounced trait is ${exports.BIGFIVE_NAMES[top[0]]} (${top[1]}/100).`,
                detail,
            };
        }
        case 'index': {
            let sum = 0;
            let max = 0;
            a.items.forEach((item, i) => {
                if (item.type === 'tagged') {
                    const opt = item.options[answers[i]];
                    sum += opt ? parseInt(opt.tag, 10) || 0 : 0;
                    max += Math.max(...item.options.map((o) => parseInt(o.tag, 10) || 0));
                }
            });
            const pct = max ? Math.round((sum / max) * 100) : 0;
            const label = pct >= 75 ? 'Strong' : pct >= 50 ? 'Moderate' : 'Developing';
            return {
                score: pct,
                label: `${label} Self-Rated Index`,
                summary: pct >= 75
                    ? 'You report strong everyday habits supporting this cognitive domain.'
                    : pct >= 50
                        ? 'You report moderate habits in this domain, with room for targeted training.'
                        : 'You report this domain as an area of difficulty. Training and habits can help.',
            };
        }
    }
}
function latestByKind(quizzes, kind) {
    for (let i = quizzes.length - 1; i >= 0; i--) {
        if (quizzes[i].kind === kind)
            return quizzes[i];
    }
    return undefined;
}
function buildBrainProfile(state) {
    const lr = latestByKind(state.quizzes, 'lr');
    const temperament = latestByKind(state.quizzes, 'temperament');
    const bigfive = latestByKind(state.quizzes, 'bigfive');
    const memory = latestByKind(state.quizzes, 'memory');
    const attention = latestByKind(state.quizzes, 'attention');
    const completed = [lr, temperament, bigfive, memory, attention].filter(Boolean).length;
    const strengths = [];
    if (lr)
        strengths.push(lr.label === 'Integrated Thinker' ? 'Balanced cognitive style' : `${lr.label} cognitive style`);
    if (memory && memory.score >= 65)
        strengths.push('Self-reported strong memory habits');
    if (attention && attention.score >= 65)
        strengths.push('Self-reported strong focus habits');
    if (bigfive === null || bigfive === void 0 ? void 0 : bigfive.detail) {
        const top = Object.entries(bigfive.detail).sort((a, b) => b[1] - a[1])[0];
        if (top && top[1] >= 60)
            strengths.push(`High ${exports.BIGFIVE_NAMES[top[0]]}`);
    }
    if (temperament === null || temperament === void 0 ? void 0 : temperament.label)
        strengths.push(`${temperament.label} temperament blend`);
    const recs = [];
    if (!memory || memory.score < 65)
        recs.push({ gameId: 'sequence', reason: 'Build working-memory capacity with pattern sequences.' });
    if (!attention || attention.score < 65)
        recs.push({ gameId: 'stroop', reason: 'Sharpen selective attention and impulse control.' });
    recs.push({ gameId: 'reaction', reason: 'Train processing speed and reaction time.' });
    // Always present a full plan of three distinct drills.
    const fillers = [
        { gameId: 'grid', reason: 'Expand visuospatial memory span.' },
        { gameId: 'sequence', reason: 'Build working-memory capacity with pattern sequences.' },
        { gameId: 'stroop', reason: 'Sharpen selective attention and impulse control.' },
    ];
    for (const f of fillers) {
        if (recs.length >= 3)
            break;
        if (!recs.some((r) => r.gameId === f.gameId))
            recs.push(f);
    }
    return { ready: completed > 0, completed, lr, temperament, bigfive, memory, attention, strengths, recs: recs.slice(0, 3) };
}

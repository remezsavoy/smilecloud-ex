// Basic helpers
const toDeg = (rad) => (rad * 180) / Math.PI;
const clamp = (x) => Math.max(-1, Math.min(1, x));

// Distance between two points
export function dist(P, Q) {
    return Math.hypot(Q.x - P.x, Q.y - P.y);
}

// Angles via Law of Cosines (degrees)
// a = |BC| (opposite A), b = |AC| (opposite B), c = |AB| (opposite C)
export function anglesByDistances(A, B, C) {
    const a = dist(B, C);
    const b = dist(A, C);
    const c = dist(A, B);

    const Adeg = toDeg(Math.acos(clamp((b*b + c*c - a*a) / (2*b*c))));
    const Bdeg = toDeg(Math.acos(clamp((a*a + c*c - b*b) / (2*a*c))));
    const Cdeg = toDeg(Math.acos(clamp((a*a + b*b - c*c) / (2*a*b))));

    return { A: Adeg, B: Bdeg, C: Cdeg };
}

// Small angle arc path around vertex v between arms to p1 and p2 at radius r
export function angleArcPath(v, p1, p2, r) {
    const a = Math.atan2(p1.y - v.y, p1.x - v.x);
    const b = Math.atan2(p2.y - v.y, p2.x - v.x);
    let start = a, end = b;
    let delta = ((end - start + Math.PI) % (2 * Math.PI)) - Math.PI;
    if (delta < 0) { const t = start; start = end; end = t; delta = -delta; }

    const sx = v.x + Math.cos(start) * r, sy = v.y + Math.sin(start) * r;
    const ex = v.x + Math.cos(end)   * r, ey = v.y + Math.sin(end)   * r;
    const large = delta > Math.PI ? 1 : 0, sweep = 1;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} ${sweep} ${ex} ${ey}`;
}

// Label position: simple angle bisector using normalized rays, at distance 'dist'
function len(v){ return Math.hypot(v.x, v.y); }
function sub(a,b){ return { x:a.x-b.x, y:a.y-b.y }; }

export function angleLabelPoint(v, p1, p2, d) {
    const u = sub(p1, v), w = sub(p2, v);
    const lu = len(u) || 1, lw = len(w) || 1;
    const bx = u.x/lu + w.x/lw;
    const by = u.y/lu + w.y/lw;
    const L  = Math.hypot(bx, by) || 1;
    return { x: v.x + (bx/L) * d, y: v.y + (by/L) * d };
}
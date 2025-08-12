import React from "react";
import { anglesByDistances, angleArcPath, angleLabelPoint } from "./geometry";

// Flip SVG Y-axis to match math convention (up is positive)
function flipY(p) { return { x: p.x, y: -p.y }; }

// Convert raw text inputs to numbers
function toNum(p) {
    return { x: Number(p.x), y: Number(p.y) };
}

// Format numbers for display
function format(n) { return Number.isFinite(n) ? n.toFixed(2) : "–"; }

// Compute bounding box for three points
function bbox(A, B, C) {
    const xs = [A.x, B.x, C.x], ys = [A.y, B.y, C.y];
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const w = Math.max(1, maxX - minX);
    const h = Math.max(1, maxY - minY);
    return { minX, minY, w, h, unit: Math.max(w, h) };
}

// Build viewBox with relative padding
function makeViewBox(bb) {
    const pad = bb.unit * 0.2;
    return `${bb.minX - pad} ${bb.minY - pad} ${bb.w + pad * 2} ${bb.h + pad * 2}`;
}

export default function ViewPage({ points, onBack }) {
    // 1) Parse inputs as numbers (original coordinates)
    const A = toNum(points.A);
    const B = toNum(points.B);
    const C = toNum(points.C);

    // 2) Angles via distances (Law of Cosines). Flip doesn't affect angles.
    const { A: angA, B: angB, C: angC } = anglesByDistances(A, B, C);

    // 3) For drawing, flip Y so that higher Y is visually "up" (math-style)
    const Af = flipY(A), Bf = flipY(B), Cf = flipY(C);

    // 4) Size everything relative to the triangle's bounds (prevents giant strokes/fonts)
    const bb = bbox(Af, Bf, Cf);
    const viewBox = makeViewBox(bb);

    const strokeW   = bb.unit * 0.04;   // stroke width for edges
    const pointR    = bb.unit * 0.05;   // vertex dot radius
    const arcR      = bb.unit * 0.22;   // angle arc radius
    const labelDist = bb.unit * 0.32;   // distance of angle labels from vertex
    const fontSize  = bb.unit * 0.06;   // angle label font size (kept small)

    // 5) Paths/labels computed on flipped points (for correct visual orientation)
    const trianglePath = `M ${Af.x} ${Af.y} L ${Bf.x} ${Bf.y} L ${Cf.x} ${Cf.y} Z`;
    const arcA = angleArcPath(Af, Bf, Cf, arcR);
    const arcB = angleArcPath(Bf, Af, Cf, arcR);
    const arcC = angleArcPath(Cf, Af, Bf, arcR);
    const LA = angleLabelPoint(Af, Bf, Cf, labelDist);
    const LB = angleLabelPoint(Bf, Af, Cf, labelDist);
    const LC = angleLabelPoint(Cf, Af, Bf, labelDist);

    return (
        <section className="card">
            <div className="row-between">
                <button className="btn" onClick={onBack}>Back</button>
            </div>

            <div className="view-grid">
                <div className="canvas">
                    <svg viewBox={viewBox} className="svg">
                        {/* Triangle */}
                        <path d={trianglePath} fill="#dbeafe" stroke="#1e293b" strokeWidth={strokeW} />

                        {/* Angle arcs */}
                        <path d={arcA} fill="none" stroke="#0f172a" strokeWidth={strokeW * 0.7} />
                        <path d={arcB} fill="none" stroke="#0f172a" strokeWidth={strokeW * 0.7} />
                        <path d={arcC} fill="none" stroke="#0f172a" strokeWidth={strokeW * 0.7} />

                        {/* Vertices */}
                        <circle cx={Af.x} cy={Af.y} r={pointR} fill="#1e293b" />
                        <circle cx={Bf.x} cy={Bf.y} r={pointR} fill="#1e293b" />
                        <circle cx={Cf.x} cy={Cf.y} r={pointR} fill="#1e293b" />

                        {/* Angle labels */}
                        <text x={LA.x} y={LA.y} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle">
                            {format(angA)}°
                        </text>
                        <text x={LB.x} y={LB.y} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle">
                            {format(angB)}°
                        </text>
                        <text x={LC.x} y={LC.y} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle">
                            {format(angC)}°
                        </text>
                    </svg>
                </div>

                <div className="side">
                    <div className="panel">
                        <div className="panel-title">Angles</div>
                        <ul className="list">
                            <li>∠A = <b>{format(angA)}</b>°</li>
                            <li>∠B = <b>{format(angB)}</b>°</li>
                            <li>∠C = <b>{format(angC)}</b>°</li>
                        </ul>
                    </div>

                    <div className="panel">
                        <div className="panel-title">Input Points</div>
                        <ul className="list">
                            <li>A = ({String(points.A.x)}, {String(points.A.y)})</li>
                            <li>B = ({String(points.B.x)}, {String(points.B.y)})</li>
                            <li>C = ({String(points.C.x)}, {String(points.C.y)})</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
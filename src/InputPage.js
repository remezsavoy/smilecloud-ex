import React from "react";

export default function InputPage({ points, onChange, onShow }) {
    const handle = (k, axis, val) => {
        onChange(prev => ({ ...prev, [k]: { ...prev[k], [axis]: val } }));
    };

    const isReady =
        ["A", "B", "C"].every(k => points[k].x !== "" && points[k].y !== "");

    const handleShow = () => {
        if (isReady) {
            onShow();
        } else {
            alert("Please enter X and Y values for points A, B, and C before proceeding.");
        }
    };

    return (
        <section className="card">
            <h2 className="title">Input Page</h2>
            <div className="muted">
                Enter three points (X, Y). Per the instructions, no input validation is required.
            </div>

            <div className="grid">
                {["A", "B", "C"].map(k => (
                    <div key={k} className="box">
                        <div className="box-title">Point {k}</div>

                        <div className="row">
                            <label className="lbl">X</label>
                            <input
                                type="text"
                                value={points[k].x}
                                onChange={e => handle(k, "x", e.target.value)}
                                className="inp"
                            />
                        </div>

                        <div className="row">
                            <label className="lbl">Y</label>
                            <input
                                type="text"
                                value={points[k].y}
                                onChange={e => handle(k, "y", e.target.value)}
                                className="inp"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="actions">
                <button className="btn primary" onClick={handleShow}>
                    Show Triangle
                </button>
            </div>
        </section>
    );
}
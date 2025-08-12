import React, { useState } from "react";
import InputPage from "./InputPage";
import ViewPage from "./ViewPage";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [points, setPoints] = useState({
    A: { x: "", y: "" },
    B: { x: "", y: "" },
    C: { x: "", y: "" },
  });

  return (
      <div className="app" dir="rtl">
        <div className="container">
          <header className="header">
            <h1>Draw a triangle</h1>
            <div className="sub">SmileCloud-ex</div>
          </header>

          {step === 1 && (
              <InputPage
                  points={points}
                  onChange={setPoints}
                  onShow={() => setStep(2)}
              />
          )}

          {step === 2 && (
              <ViewPage
                  points={points}
                  onBack={() => setStep(1)}
              />
          )}
        </div>
      </div>
  );
}
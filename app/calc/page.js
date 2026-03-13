"use client"; // needed for client-side interactivity
import { useState } from "react";

export default function CalculatorPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = async () => {
    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          a: Number(a),
          b: Number(b),
          operator,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setResult(null);
      } else {
        setResult(data.result);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong");
      setResult(null);
    }
  };

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">     
            <h2 className="text-primary">Next.js API route /api/calc that accepts two numbers (a, b) and an operator (+, -, *, /). Return the result or an error message.</h2>
        </div>
        <div className="box shadow p-4 mt-3">
            <div className="row d-flex">
                <div className="col-12 mb-3">
                    <input
                        type="number"
                        placeholder="a"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    <input
                        type="number"
                        placeholder="b"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-12 mb-3">
                    <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="form-control"
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                    </select>
                </div>
                <div className="col-12 mb-3">
                    <button onClick={calculate} className="btn btn-primary">
                        Calculate
                    </button>

                    {error && <h3 className="text-red">{error}</h3>}
                    {result !== null && <h3 className="mt-4 text-green">Result: {result}</h3>}
                </div>
            </div>
        </div>
    </div>
    
  );
}
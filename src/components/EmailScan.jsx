import { useState } from "react";
import axios from "axios";

export default function EmailScan({ goBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://vulfi-backend.onrender.com/docs",
        { email }
      );
      setResult(response.data);
    }catch (err) {
  console.error("EMAIL SCAN ERROR 👉", err);
  setError(
    err.response?.data?.detail ||
    err.message ||
    "Email scan failed"
  );
}
  finally {
      setLoading(false);
    }
  };

  const getColor = (rating) => {
    if (rating <= 2) return "text-red-600";
    if (rating === 3) return "text-yellow-500";
    return "text-green-600";
  };

  return (
   <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        {/* Back */}
        <button
          onClick={goBack}
          className="text-blue-600 underline mb-4"
        >
          ← Back to Home
        </button>

        <h1 className="text-2xl font-bold text-center mb-2">
          Email Security Scan
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Analyze email risk, exposure, and domain security
        </p>

        {/* Input */}
        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-lg font-semibold text-white
            ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
          `}
        >
          {loading ? "Scanning..." : "Analyze Email"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 border-t pt-4">

            <h2 className="text-lg font-semibold mb-1">
              {result.email}
            </h2>

            <p className={`text-lg font-bold ${getColor(result.rating)}`}>
              Rating: {result.rating}/5 – {result.risk}
            </p>

            {/* Findings */}
            <div className="mt-3">
              <h3 className="font-semibold mb-1">Findings</h3>
              {result.findings.length === 0 ? (
                <p className="text-sm text-gray-600">
                  No major issues detected.
                </p>
              ) : (
                <ul className="space-y-2">
                  {result.findings.map((f, index) => (
                    <li key={index} className="border rounded-lg p-3 text-sm">
                      <p className="font-medium">
                        {f.title} ({f.severity})
                      </p>
                      <p className="text-gray-600">
                        {f.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recommendations */}
            <div className="mt-3">
              <h3 className="font-semibold mb-1">Recommendations</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {result.recommendations.map((r, index) => (
                  <li key={index}>{r}</li>
                ))}
              </ul>
            </div>

          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          We do not access inboxes or passwords. Analysis is privacy-safe.
        </p>
      </div>
    </div>
  );
}



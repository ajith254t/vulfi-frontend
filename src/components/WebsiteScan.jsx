import { useState } from "react";
import axios from "axios";

export default function WebsiteScan({ goBack }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!url) {
      setError("Please enter a website URL");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
        const response = await axios.post("https://vulfi-backend.onrender.com/scan",
        {url}
      );

      setResult(response.data);
    } catch (err) {
      setError("Scan failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (rating) => {
    if (rating <= 2) return "text-red-600";
    if (rating === 3) return "text-yellow-500";
    return "text-green-600";
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-600 bg-red-50";
      case "High":
        return "text-orange-600 bg-orange-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  const getSSLStatus = (vulnerabilities) => {
    const sslIssues = vulnerabilities.filter(
      (v) =>
        v.name.toLowerCase().includes("ssl") ||
        v.name.toLowerCase().includes("https")
    );

    if (sslIssues.length === 0) {
      return {
        status: "Secure",
        color: "text-green-600",
        message: "HTTPS enabled and SSL certificate is valid",
      };
    }

    const critical = sslIssues.find((v) => v.severity === "Critical");
    if (critical) {
      return {
        status: "Critical",
        color: "text-red-600",
        message: critical.name,
      };
    }

    const high = sslIssues.find((v) => v.severity === "High");
    if (high) {
      return {
        status: "Warning",
        color: "text-orange-600",
        message: high.name,
      };
    }

    return {
      status: "Notice",
      color: "text-yellow-600",
      message: sslIssues[0].name,
    };
  };

  return (
   <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        {/* Back Button */}
        <button
          onClick={goBack}
          className="text-blue-600 underline mb-4"
        >
          ← Back to Home
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Website Security Scan
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Analyze HTTPS, SSL, and web configuration
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition
            ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
          `}
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* Results */}
        {result && (
          <div className="mt-6 border-t pt-4">

            {/* SSL / HTTPS Status */}
            {(() => {
              const ssl = getSSLStatus(result.vulnerabilities);
              return (
                <div className="mb-4 p-4 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-1">
                    SSL / HTTPS Status
                  </h3>
                  <p className={`font-medium ${ssl.color}`}>
                    {ssl.status}
                  </p>
                  <p className="text-sm text-gray-600">
                    {ssl.message}
                  </p>
                </div>
              );
            })()}

            <h2 className="text-xl font-semibold mb-2">
              Scan Result
            </h2>

            <p className="text-sm text-gray-700">
              Target: <span className="font-medium">{result.target}</span>
            </p>

            <p className={`text-lg font-bold mt-2 ${getColor(result.rating)}`}>
              Rating: {result.rating}/5 – {result.status}
            </p>

            <p className="mt-2 text-sm">
              Total Vulnerabilities: {result.total_vulnerabilities}
            </p>

            <ul className="mt-3 space-y-2">
              {result.vulnerabilities.map((v, index) => (
                <li
                  key={index}
                  className={`rounded-lg p-3 text-sm border ${getSeverityColor(v.severity)}`}
                >
                  <p className="font-semibold">
                    {v.name} ({v.severity})
                  </p>
                  <p className="text-gray-700">
                    {v.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          Only scan websites you own or have permission to test.
        </p>
      </div>
    </div>
  );
}


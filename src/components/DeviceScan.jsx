import { useState } from "react";
import axios from "axios";

export default function DeviceScan({ goBack }) {
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!deviceType || !osVersion) {
      setError("Please select device type and OS version");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://vulfi-backend.onrender.com/device-scan",
        {
          device_type: deviceType,
          os_version: osVersion,
          extra: JSON.stringify({
            patch: extra || null,
            brand: brand || "unknown",
          }),
        }
      );

      setResult(response.data);
    } catch (err) {
      setError("Device scan failed. Is backend running?");
    } finally {
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
        <button onClick={goBack} className="text-blue-600 underline mb-4">
          ← Back to Home
        </button>

        <h1 className="text-2xl font-bold text-center mb-2">
          Device Security Scan
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Analyze OS safety, support status, and risks
        </p>

        {/* Device Type */}
        <label className="block text-sm font-medium mb-1">Device Type</label>
        <select
          value={deviceType}
          onChange={(e) => {
            setDeviceType(e.target.value);
            setOsVersion("");
            setExtra("");
            setBrand("");
            setResult(null);
          }}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="">Select device</option>
          <option value="android">Android</option>
          <option value="windows">Windows</option>
          <option value="mac">macOS / iPhone</option>
        </select>

        {/* ================= ANDROID ================= */}
        {deviceType === "android" && (
          <>
            <label className="block text-sm font-medium mb-1">
              Android Version
            </label>
            <select
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option value="">Select version</option>
              <option value="android10">Android 10</option>
              <option value="android11">Android 11</option>
              <option value="android12">Android 12</option>
              <option value="android13">Android 13</option>
              <option value="android14">Android 14</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Device Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option value="">Select brand</option>
              <option value="samsung">Samsung</option>
              <option value="xiaomi">Xiaomi</option>
              <option value="oppo">Oppo</option>
              <option value="vivo">Vivo</option>
              <option value="iqoo">iQOO</option>
              <option value="oneplus">OnePlus</option>
              <option value="realme">Realme</option>
              <option value="huawei">Huawei</option>
              <option value="google">Google (Pixel)</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Security Patch Level (optional)
            </label>
            <input
              type="month"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            />
          </>
        )}

        {/* ================= WINDOWS ================= */}
        {deviceType === "windows" && (
          <>
            <label className="block text-sm font-medium mb-1">
              Windows Version
            </label>
            <select
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option value="">Select version</option>
              <option value="win10-21H2">Windows 10 (21H2)</option>
              <option value="win10-22H2">Windows 10 (22H2)</option>
              <option value="win11-22H2">Windows 11 (22H2)</option>
              <option value="win11-23H2">Windows 11 (23H2)</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Device Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option value="">Select brand</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="lenovo">Lenovo</option>
              <option value="asus">ASUS</option>
              <option value="acer">Acer</option>
              <option value="msi">MSI</option>
              <option value="microsoft">Microsoft (Surface)</option>
            </select>
          </>
        )}

        {/* ================= MAC / IPHONE ================= */}
        {deviceType === "mac" && (
          <>
            <label className="block text-sm font-medium mb-1">
              Apple OS Version
            </label>
            <select
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option value="">Select version</option>
              <option value="monterey">macOS Monterey (12)</option>
              <option value="ventura">macOS Ventura (13)</option>
              <option value="sonoma">macOS Sonoma (14)</option>
              <option value="ios16">iOS 16</option>
              <option value="ios17">iOS 17</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Device Brand
            </label>
            <select
              value="apple"
              disabled
              className="w-full border px-3 py-2 rounded-lg mb-4 bg-gray-100"
            >
              <option value="apple">Apple</option>
            </select>
          </>
        )}

        {/* Analyze */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full mt-2 py-2 rounded-lg font-semibold text-white
            ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}
          `}
        >
          {loading ? "Analyzing..." : "Analyze Device"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-1">{result.device}</h2>

            <p className={`text-lg font-bold ${getColor(result.rating)}`}>
              Rating: {result.rating}/5 – {result.risk}
            </p>

            <div className="mt-3">
              <h3 className="font-semibold mb-1">Findings</h3>
              <ul className="space-y-2">
                {result.findings.map((f, index) => (
                  <li key={index} className="border rounded-lg p-3 text-sm">
                    <p className="font-medium">
                      {f.title} ({f.severity})
                    </p>
                    <p className="text-gray-600">{f.description}</p>
                  </li>
                ))}
              </ul>
            </div>

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
          No device identifiers are collected. Analysis is privacy-safe.
        </p>
      </div>
    </div>
  );
}

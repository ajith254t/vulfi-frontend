export default function Home({ setMode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* WHITE CARD */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          VULFI
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Vulnerability Finding Platform
        </p>

        <div className="space-y-4">

          <button
            onClick={() => setMode("website")}
            className="w-full p-4 rounded-lg border hover:bg-gray-50 text-left"
          >
            <p className="font-semibold">🌐 Website Security</p>
            <p className="text-sm text-gray-600">
              Check HTTPS, SSL, redirects, and web configuration
            </p>
          </button>

          <button
            onClick={() => setMode("device")}
            className="w-full p-4 rounded-lg border hover:bg-gray-50 text-left"
          >
            <p className="font-semibold">🖥️ Device Security</p>
            <p className="text-sm text-gray-600">
              Analyze OS safety, support status, and device risks
            </p>
          </button>

          <button
            onClick={() => setMode("email")}
            className="w-full p-4 rounded-lg border hover:bg-gray-50 text-left"
          >
            <p className="font-semibold">📧 Email Security</p>
            <p className="text-sm text-gray-600">
              Check breach exposure and email domain security
            </p>
          </button>

        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Analyze only systems or identities you own or have permission to assess.
        </p>

      </div>
    </div>
  );
}

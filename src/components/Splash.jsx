export default function Splash() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">

      {/* Center Logo */}
      <div className="text-center fade-in-scale">
        <h1 className="text-white text-6xl font-extrabold tracking-widest glow">
          VULFI
        </h1>

        {/* Loading dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="absolute bottom-8 text-gray-400 text-sm tracking-wide fade-in-scale">
        Developed by <span className="text-white font-medium">AJITH T</span>
      </p>

    </div>
  );
}

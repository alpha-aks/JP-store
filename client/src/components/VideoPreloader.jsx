import { useEffect, useRef, useState } from "react";

export default function VideoPreloader({ onComplete }) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState("video"); // "video" | "splash"

  const triggerSplash = () => {
    if (phase === "splash") return;
    setPhase("splash");

    // Splash animation sweeps across screen, then directly finishes
    setTimeout(() => {
      onComplete();
    }, 720);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsReady(true))
        .catch((err) => {
          console.warn("Autoplay error:", err);
          setIsReady(true);
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto">
      {/* Video Phase */}
      {phase === "video" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl px-4 flex flex-col items-center justify-center">
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            )}

            <video
              ref={videoRef}
              src="/use_this_exact_logo_to_make_vi_gwr_video_mvp.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={() => setIsReady(true)}
              onEnded={triggerSplash}
              className={`w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.7)] transition-all duration-500 ${
                isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />

            {/* Skip Control */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={triggerSplash}
                className="text-xs uppercase tracking-widest text-white/70 hover:text-white px-5 py-1.5 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                Skip Intro &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Splash Phase (Orange, White, Blue, White Color Burst) */}
      {phase === "splash" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Wave 1: JP Store Orange */}
          <div className="absolute w-[120vmax] h-[120vmax] rounded-full bg-[#f37023] animate-splash-orange"></div>

          {/* Wave 2: Crisp White */}
          <div className="absolute w-[120vmax] h-[120vmax] rounded-full bg-white animate-splash-white-1"></div>

          {/* Wave 3: Royal Blue */}
          <div className="absolute w-[120vmax] h-[120vmax] rounded-full bg-[#0c286e] animate-splash-blue"></div>

          {/* Wave 4: White Reveal Flash */}
          <div className="absolute w-[120vmax] h-[120vmax] rounded-full bg-white animate-splash-white-2"></div>

          {/* Center Brand Burst Icon */}
          <div className="relative z-10 animate-splash-pop flex items-center justify-center">
            <img
              src="/Jp store logo.png"
              alt="JP Store"
              className="w-36 h-36 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

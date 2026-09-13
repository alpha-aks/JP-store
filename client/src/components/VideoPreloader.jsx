import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

export default function VideoPreloader({ onComplete }) {
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState("video"); // "video" | "splash"

  const triggerSplash = useCallback(() => {
    if (phase === "splash") return;
    setPhase("splash");

    // Splash animation sweeps across screen, then smoothly finishes
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [phase, onComplete]);

  // Once GIF is ready/loaded, play full animation (~9.5s) then transition to splash
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerSplash();
    }, 9500);

    return () => clearTimeout(timer);
  }, [triggerSplash]);

  const content = (
    <div 
      onClick={triggerSplash}
      className="fixed inset-0 z-[9999999] overflow-hidden select-none cursor-pointer"
      style={{ isolation: "isolate" }}
    >
      {/* Visual Phase with Warm Gujarati Saffron Background Matching the Logo Animation */}
      {phase === "video" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ec6312] transition-colors duration-300">
          <div className="relative w-full max-w-4xl px-4 flex flex-col items-center justify-center">
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}

            {/* Seamless Animated GIF - Autoplays 100% on all browsers without media permissions */}
            <img
              src="/use_this_exact_logo_to_make_vi_gwr_video_mvp.gif"
              alt="JP Store Loading Animation"
              onLoad={() => setIsReady(true)}
              className={`w-full max-h-[82vh] object-contain rounded-2xl transition-opacity duration-300 ${
                isReady ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Skip Control */}
            <div className="mt-4 flex justify-center z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerSplash();
                }}
                className="text-xs uppercase tracking-widest text-white px-5 py-2 rounded-full border border-white/30 hover:border-white bg-black/25 hover:bg-black/45 backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
              >
                Skip Intro &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Splash Phase (Orange, White, Blue, White Color Burst) */}
      {phase === "splash" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-white">
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

  return typeof document !== "undefined" ? createPortal(content, document.body) : content;
}

import { useEffect, useState } from "react";

export default function Splash({ onFinish }) {
  useEffect(() => {
    // Wait 3 seconds, then call onFinish to hide splash
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 animate-fadeOut">
      <h1 className="text-6xl font-bold animate-spin-slow">Navink</h1>
    </div>
  );
}

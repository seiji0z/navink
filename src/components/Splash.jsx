import { useEffect, useRef } from "react";
import SplitText from "./SplitText";
import "../styles/index.css";

export default function Splash({ onFinish }) {
  const splashRef = useRef(null);

  useEffect(() => {
    // start fade-out after 2.5s
    const fadeOutTimer = setTimeout(() => {
      if (splashRef.current) {
        splashRef.current.classList.add("animate-fadeOut");
      }
    }, 2500);

    // end intro after 3s
    const removeTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      ref={splashRef} //variable to reference the whole div here
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 animate-fadeOut"
    >
      <div className="flex relative -translate-y-[2%]">
        <SplitText
          text="Nav"
          className="text-[18rem] font-bold text-center"
          fontFamily="Urbanist-Bold, sans-serif"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
        <SplitText
          text="ink"
          className="text-[18rem] font-bold text-center text-[#1F6D8B]"
          fontFamily="Urbanist-Bold, sans-serif"
          delay={200}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
      </div>
    </div>
  );
}

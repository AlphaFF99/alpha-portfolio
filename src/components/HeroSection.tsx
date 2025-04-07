import SocialLinks from "./SocialLinks";
import { MoveDown, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [showCursor, setShowCursor] = useState(true);
  const [text, setText] = useState("");
  const fullText = "ALPHA FF";
  
  useEffect(() => {
    // Typing effect
    if (text.length < fullText.length) {
      const typing = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 150);
      return () => clearTimeout(typing);
    }
  }, [text]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 crt-effect grid-bg"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-accent"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1 + 0.5}rem`,
              opacity: Math.random() * 0.7 + 0.3,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {Math.random() > 0.7 ? "1" : "0"}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 mb-8">
        <span className="inline-block px-4 py-2 mb-4 bg-primary/30 rounded border border-accent/50 text-accent">
          <Zap className="h-4 w-4 inline-block mr-2" />
          SYSTEM ONLINE
        </span>
      </div>
      
      <h2 className="text-xl md:text-2xl font-light mb-2 text-green-400">IDENTIFYING_</h2>
      
      <div className="mb-4 relative">
        <h1 className="text-4xl md:text-6xl font-bold glitch-text">
          {text}
          <span className={`${showCursor ? "opacity-100" : "opacity-0"} ml-1`}>_</span>
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-[scanline_2s_linear_infinite] opacity-30 pointer-events-none"></div>
      </div>
      
      <h2 className="text-xl md:text-2xl font-light mb-12 text-cyan-400">[APP_DEVELOPER]</h2>

      <div className="neon-border p-2 mb-8 rounded-md">
        <SocialLinks />
      </div>

      <div className="mt-12">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
              window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: "smooth",
              });
            }
          }}
          className="inline-block animate-pulse"
        >
          <div className="text-center text-sm text-muted-foreground">SCROLL_DOWN</div>
          <MoveDown className="h-10 w-10 text-accent mt-2" />
        </a>
      </div>
    </section>
  );
}

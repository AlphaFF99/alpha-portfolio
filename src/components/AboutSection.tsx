import { useState, useEffect } from "react";
import { ShieldCheck, Command, Cog, Zap, Shield } from "lucide-react";

export default function AboutSection() {
  const [animatedSkills, setAnimatedSkills] = useState<{ name: string; percentage: number; current: number; icon: React.ReactNode }[]>([]);
  const [visibleBio, setVisibleBio] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  
  const skills = [
    { name: "REALITY_INTERFACE.ARCHITECT", percentage: 90, icon: <Command className="h-4 w-4" /> },
    { name: "QUANTUM_DATA.MANIPULATOR", percentage: 85, icon: <ShieldCheck className="h-4 w-4" /> },
    { name: "POCKET_DIMENSION.ENGINEER", percentage: 80, icon: <Zap className="h-4 w-4" /> },
  ];
  
  const bioText = "SYSTEM SCAN INITIATED...\n\n> Subject identified as ALPHA_FF\n> Classification: Digital Architect\n> Status: ACTIVE\n\nSubject = entity.create(\"digital_weaver\");\nSubject.mind.pattern = \"non_conformist\";\nSubject.skills.include(\"reality_bending\");\n\nEntity demonstrates abnormal capability to transmute chaotic requirements into crystalline code structures. Dimensional analysis reveals subject exists simultaneously in user-experience plane and logic-execution realms.\n\nWarning: Subject known to collapse wave-functions of impossible problems into elegant solutions.\n\nSubject's core protocol: craft.digital.worlds(quality=maximum, scale=infinite);\n\nSYSTEM SCAN COMPLETE";
  
  // Typing animation for bio
  useEffect(() => {
    if (visibleBio.length < bioText.length) {
      const typingTimer = setTimeout(() => {
        setVisibleBio(bioText.substring(0, visibleBio.length + 1));
      }, 10);
      return () => clearTimeout(typingTimer);
    } else {
      setTypingComplete(true);
    }
  }, [visibleBio, bioText]);
  
  // Skill level animation
  useEffect(() => {
    if (typingComplete) {
      // Initialize with zero values
      if (animatedSkills.length === 0) {
        setAnimatedSkills(skills.map(skill => ({ ...skill, current: 0 })));
        return;
      }
      
      // Animate skill bars
      const timer = setTimeout(() => {
        setAnimatedSkills(prev => 
          prev.map(skill => ({
            ...skill,
            current: skill.current < skill.percentage ? skill.current + 1 : skill.percentage
          }))
        );
      }, 15);
      
      return () => clearTimeout(timer);
    }
  }, [animatedSkills, typingComplete]);

  return (
    <section
      id="about"
      className="min-h-screen grid-bg py-20 px-4 crt-effect"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-accent/50 w-16 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center inline-block glitch-text">
            SYSTEM PROFILE
          </h2>
          <div className="h-px bg-accent/50 w-16 ml-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-black/40 border border-accent/30 p-6 rounded">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>
              <h3 className="text-xl font-mono text-cyan-400">PROFILE.DAT</h3>
            </div>
            <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
              {visibleBio}
              {visibleBio.length < bioText.length && <span className="animate-pulse">_</span>}
            </pre>
          </div>

          <div className="bg-black/40 border border-accent/30 p-6 rounded">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 rounded-full bg-accent mr-2 animate-pulse"></div>
              <h3 className="text-xl font-mono text-accent">SKILL.MATRIX</h3>
            </div>
            
            <div className="space-y-6">
              {animatedSkills.map((skill, index) => (
                <div key={index} className="neon-border p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono flex items-center">
                      <span className="inline-block mr-2 text-cyan-400">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-accent font-mono">{skill.current}%</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-2 transition-all duration-300 relative"
                      style={{ width: `${skill.current}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

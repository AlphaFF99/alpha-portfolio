import { Send, Youtube, Terminal } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";

export default function SocialLinks() {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  
  const links = [
    { 
      name: "Discord", 
      url: "https://discord.gg/alphaxsigmaa", 
      icon: <FaDiscord className="h-6 w-6" />,
      code: "SOCIAL://DISC.CONNECT"
    },
    { 
      name: "Telegram", 
      url: "https://t.me/AlphaFF", 
      icon: <Send className="h-6 w-6" />,
      code: "MSG://TG.SECURE"
    },
    { 
      name: "YouTube", 
      url: "https://youtube.com/@AlphaFF", 
      icon: <Youtube className="h-6 w-6" />,
      code: "MEDIA://YT.STREAM"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex flex-col items-center p-4 bg-black/30 border border-accent/30 hover:border-accent transition-all duration-300 hover:bg-black/50 ${hoveredLink === index ? 'glitch-text' : ''}`}
          onMouseEnter={() => setHoveredLink(index)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-accent to-transparent transform origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent transform origin-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-accent to-transparent transform origin-bottom transition-transform duration-300 scale-y-0 group-hover:scale-y-100"></div>
          
          <div className={`mb-2 text-accent ${hoveredLink === index ? 'animate-pulse' : ''}`}>
            {link.icon}
          </div>
          
          <span className="text-sm text-center font-mono">
            {link.name}
          </span>
          
          <div className="mt-2 text-xs text-cyan-400 font-mono opacity-70">
            <Terminal className="h-3 w-3 inline-block mr-1" />
            <span>{link.code}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

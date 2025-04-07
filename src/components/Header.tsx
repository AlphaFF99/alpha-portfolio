import { useState, useEffect } from "react";
import { Menu, X, Cpu, Layers, Activity, TerminalSquare } from "lucide-react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [showConsole, setShowConsole] = useState(false);
  const [consoleText, setConsoleText] = useState("");
  
  // Update console text when active section changes
  useEffect(() => {
    setConsoleText(`> NAVIGATING TO ${activeSection.toUpperCase()}_SECTOR\n> LOADING...\n> READY`);
  }, [activeSection]);
  
  // Update time display
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "HOME", icon: <Cpu className="h-4 w-4 mr-2" /> },
    { id: "about", label: "ABOUT", icon: <Layers className="h-4 w-4 mr-2" /> },
    { id: "projects", label: "PROJECTS", icon: <Activity className="h-4 w-4 mr-2" /> },
    { id: "contact", label: "CONTACT", icon: <TerminalSquare className="h-4 w-4 mr-2" /> }
  ];

  return (
    <header className="fixed w-full top-0 bg-black/90 backdrop-blur-sm z-50 border-b border-accent/40 crt-effect">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-accent glitch-text">ALPHA_FF:~$</span>
          <div className="ml-4 hidden md:flex items-center text-xs text-green-400">
            <span className="px-2 py-1 border border-green-500/30 bg-black/50 font-mono">
              SYS.TIME: {timeString}
            </span>
          </div>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`
                    flex items-center px-3 py-2 font-mono text-sm border-2 transition-all
                    ${activeSection === item.id
                      ? "border-accent text-accent bg-black/80"
                      : "border-accent/20 text-muted-foreground hover:border-accent/60 hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={toggleConsole}
                className="flex items-center px-3 py-2 font-mono text-sm border-2 border-cyan-500/40 text-cyan-400 hover:border-cyan-400 transition-all"
              >
                <TerminalSquare className="h-4 w-4 mr-2" />
                CONSOLE
              </button>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden text-accent"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Console display */}
      {showConsole && (
        <div className="hidden md:block border-t border-cyan-500/40 bg-black/90 text-cyan-400 font-mono text-xs p-3">
          <pre className="whitespace-pre-wrap">{consoleText}</pre>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-accent/20">
          <ul className="py-2 px-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`
                    flex items-center py-3 font-mono text-sm border-b border-accent/10
                    ${activeSection === item.id
                      ? "text-accent"
                      : "text-muted-foreground"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

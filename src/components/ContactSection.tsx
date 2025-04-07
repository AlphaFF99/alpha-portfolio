import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Terminal, Shield, Zap, Cpu, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    code: "",
    server: "",
    uid: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  
  const [connectionStatus, setConnectionStatus] = useState("OFFLINE");
  const [loadingDots, setLoadingDots] = useState("");
  
  const { toast } = useToast();

  // Simulating connection status animation
  useEffect(() => {
    const statusSequence = ["CONNECTING", "CONNECTING.", "CONNECTING..", "CONNECTING...", "ONLINE"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length - 1) {
        setConnectionStatus(statusSequence[currentIndex]);
        currentIndex++;
      } else {
        setConnectionStatus(statusSequence[currentIndex]);
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Loading animation dots for the submit button
  useEffect(() => {
    if (status.type === "loading") {
      const dots = [".  ", ".. ", "..."];
      let index = 0;
      
      const interval = setInterval(() => {
        setLoadingDots(dots[index % dots.length]);
        index++;
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [status.type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.code || !formData.server || !formData.uid) {
      setStatus({
        type: "error",
        message: "ERROR: CRITICAL DATA FIELDS MISSING. TRANSMISSION ABORTED.",
      });
      return;
    }
    
    // Show loading state
    setStatus({
      type: "loading",
      message: "TRANSMITTING REQUEST TO REMOTE SERVER...",
    });
    
    try {
      const response = await fetch(
        `/api/friend/send?code=${formData.code}&server=${formData.server}&uid=${formData.uid}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setStatus({
          type: "success",
          message: "CONNECTION ESTABLISHED. FRIEND REQUEST ID:" + data.id + " TRANSMITTED SUCCESSFULLY.",
        });
        toast({
          title: "TRANSMISSION COMPLETE",
          description: "Friend request sent successfully!",
        });
        setFormData({ code: "", server: "", uid: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || "CONNECTION ERROR: FRIEND REQUEST TRANSMISSION FAILED.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "FATAL ERROR: COMMUNICATION PROTOCOL FAILURE.",
      });
    }
  };

  const statusClasses = {
    idle: "hidden",
    loading: "bg-blue-500/20 border border-blue-500/50",
    success: "bg-green-500/20 border border-green-500/50",
    error: "bg-red-500/20 border border-red-500/50",
  };

  const serverOptions = [
    { value: "", label: "SELECT REGION", disabled: true },
    { value: "asia", label: "ASIA-PACIFIC [AP-01]" },
    { value: "europe", label: "EUROPE [EU-03]" },
    { value: "na", label: "NORTH AMERICA [NA-02]" },
    { value: "sa", label: "SOUTH AMERICA [SA-01]" }
  ];

  return (
    <section id="contact" className="py-20 px-4 crt-effect grid-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-accent/50 w-16 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center inline-block glitch-text">
            ESTABLISH CONNECTION
          </h2>
          <div className="h-px bg-accent/50 w-16 ml-4"></div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          {/* Contact Information Panel */}
          <div className="md:col-span-5 bg-black/40 border border-accent/30 p-6 rounded">
            <div className="flex items-center mb-6">
              <Database className="h-5 w-5 mr-2 text-cyan-400" />
              <h3 className="text-lg font-mono text-cyan-400">CONTACT.DATA</h3>
            </div>
            
            <div className="relative mb-6 p-4 bg-black/60 border border-green-500/30 rounded">
              <div className="absolute top-0 right-0 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-bl">
                {connectionStatus}
                <span className={connectionStatus !== "ONLINE" ? "animate-pulse" : ""}>●</span>
              </div>
              
              <div className="font-mono text-sm mb-4 mt-4">
                <span className="text-green-400">// COMMUNICATION PROTOCOLS</span>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded mr-3">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-green-400 font-mono">EMAIL_PROTOCOL</div>
                    <div className="font-mono">contact@alphaff.dev</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded mr-3">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-green-400 font-mono">VOICE_PROTOCOL</div>
                    <div className="font-mono">+1 (555) 123-4567</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded mr-3">
                    <MapPin className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-green-400 font-mono">GEOLOCATION</div>
                    <div className="font-mono">San Francisco, CA</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/60 border border-accent/30 rounded">
              <div className="flex items-center mb-2">
                <Terminal className="h-4 w-4 mr-2 text-accent" />
                <span className="text-accent font-mono text-sm">SYSTEM.LOG</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                <p>{'>'} Secure channel ready</p>
                <p>{'>'} Awaiting connection parameters</p>
                <p>{'>'} All systems nominal</p>
              </div>
            </div>
          </div>
          
          {/* Friend Request Form Panel */}
          <div className="md:col-span-7 bg-black/40 border border-accent/30 p-6 rounded">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 mr-2 text-accent" />
              <h3 className="text-lg font-mono text-accent">FRIEND.REQUEST</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-black/60 p-4 border border-accent/20 rounded">
                <label htmlFor="code" className="block mb-2 text-xs font-mono text-cyan-400">
                  AUTHORIZATION_CODE
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Cpu className="h-4 w-4 text-accent/70" />
                  </div>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="ENTER SECRET KEY"
                    className="w-full p-2 pl-10 rounded bg-black font-mono text-sm text-green-400 border border-accent/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
              </div>
              
              <div className="bg-black/60 p-4 border border-accent/20 rounded">
                <label htmlFor="server" className="block mb-2 text-xs font-mono text-cyan-400">
                  SERVER_REGION
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Zap className="h-4 w-4 text-accent/70" />
                  </div>
                  <select
                    id="server"
                    name="server"
                    value={formData.server}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 rounded bg-black font-mono text-sm text-green-400 border border-accent/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 appearance-none"
                  >
                    {serverOptions.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="border-t-2 border-r-2 border-accent/50 w-2 h-2 transform rotate-45 translate-y-[-4px]"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/60 p-4 border border-accent/20 rounded">
                <label htmlFor="uid" className="block mb-2 text-xs font-mono text-cyan-400">
                  USER_IDENTIFIER
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Database className="h-4 w-4 text-accent/70" />
                  </div>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    placeholder="ENTER TARGET ID"
                    className="w-full p-2 pl-10 rounded bg-black font-mono text-sm text-green-400 border border-accent/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full p-3 font-mono text-sm rounded neon-border transition-all 
                  ${status.type === "loading" 
                  ? "bg-black/60 text-accent animate-pulse" 
                  : "bg-black/80 text-accent hover:bg-black"}`}
                disabled={status.type === "loading"}
              >
                {status.type === "loading" 
                  ? <span>TRANSMITTING{loadingDots}</span> 
                  : "INITIATE CONNECTION"}
              </button>
              
              {status.type !== "idle" && (
                <div className={`mt-4 p-3 rounded font-mono text-sm ${statusClasses[status.type]}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

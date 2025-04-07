import { useState } from "react";
import { Code, Eye, ExternalLink, Terminal, Monitor, Server, Database } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "P7-0J3C7 4LPH4",
    description: "A feature-rich application with seamless user experience and modern design patterns.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tags: ["React", "Node.js", "Express"],
    link: "#",
    codeSnippet: "function initialize() {\n  return new Promise((resolve) => {\n    const system = require('./core');\n    system.boot(process.env.KEY);\n    resolve(true);\n  });\n}",
    status: "ACTIVE"
  },
  {
    id: 2,
    title: "P7-0J3C7 B374",
    description: "A mobile application designed for performance and cross-platform compatibility.",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb",
    tags: ["React Native", "Firebase", "Redux"],
    link: "#",
    codeSnippet: "export default class AppCore extends Component {\n  constructor() {\n    super();\n    this.state = { initialized: false };\n    this.connectToAPI();\n  }\n  \n  render() { /* ... */ }\n}",
    status: "STABLE"
  },
  {
    id: 3,
    title: "P7-0J3C7 G4MM4",
    description: "An enterprise-level web solution with advanced analytics and reporting features.",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5",
    tags: ["Angular", "Express", "MongoDB"],
    link: "#",
    codeSnippet: "async function processData(input) {\n  const results = await dataService.analyze(input);\n  return results.filter(item => {\n    return item.confidence > 0.85;\n  });\n}",
    status: "BETA"
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);
  
  const toggleProjectDetails = (id: number | null) => {
    setActiveProject(id);
    setShowCode(false);
  };
  
  const toggleCodeView = () => {
    setShowCode(!showCode);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400';
      case 'STABLE': return 'text-cyan-400';
      case 'BETA': return 'text-amber-400';
      default: return 'text-muted-foreground';
    }
  };
  
  return (
    <section id="projects" className="py-20 px-4 crt-effect grid-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-accent/50 w-16 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center inline-block glitch-text">
            PROJECT DATABASE
          </h2>
          <div className="h-px bg-accent/50 w-16 ml-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project selection panel */}
          <div className="lg:col-span-5 bg-black/50 border border-accent/30 p-4 rounded">
            <div className="flex items-center mb-6">
              <Monitor className="h-5 w-5 mr-2 text-accent" />
              <h3 className="text-lg font-mono text-accent">AVAILABLE.PROJECTS</h3>
            </div>
            <div className="space-y-2">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  className={`border ${activeProject === project.id ? 'border-accent' : 'border-accent/30'} p-3 rounded cursor-pointer transition-all hover:bg-black/60`}
                  onClick={() => toggleProjectDetails(project.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-mono text-md">{project.title}</h3>
                    <span className={`text-xs font-mono ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    [SELECT TO VIEW DETAILS]
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Project details panel */}
          <div className="lg:col-span-7">
            {activeProject ? (
              <div className="bg-black/50 border border-accent/30 rounded p-4 h-full">
                {/* Project detail header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 mr-2 text-cyan-400" />
                    <h3 className="text-lg font-mono text-cyan-400">
                      PROJECT.DETAILS
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1.5 bg-black/60 border border-accent/30 rounded hover:border-accent transition-all"
                      onClick={toggleCodeView}
                    >
                      <Code className="h-4 w-4 text-accent" />
                    </button>
                    <a 
                      href={projects.find(p => p.id === activeProject)?.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 bg-black/60 border border-accent/30 rounded hover:border-accent transition-all"
                    >
                      <ExternalLink className="h-4 w-4 text-accent" />
                    </a>
                  </div>
                </div>
                
                {/* Project content */}
                {showCode ? (
                  <div className="bg-black/80 rounded border border-accent/30 p-4 h-56 overflow-auto">
                    <div className="flex items-center mb-2">
                      <Terminal className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-xs font-mono text-green-400">source.code</span>
                    </div>
                    <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">
                      {projects.find(p => p.id === activeProject)?.codeSnippet}
                    </pre>
                  </div>
                ) : (
                  <>
                    <div className="relative mb-4 overflow-hidden rounded border border-accent/30 group">
                      <img 
                        src={projects.find(p => p.id === activeProject)?.image} 
                        alt={projects.find(p => p.id === activeProject)?.title} 
                        className="w-full h-48 object-cover object-center transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-xl font-mono text-white mb-1">
                            {projects.find(p => p.id === activeProject)?.title}
                          </h3>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1 text-accent" />
                            <span className="text-xs font-mono text-accent">PRESS VIEW BUTTON TO ACCESS</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 border-4 border-transparent hover:border-accent/50 transition-all"></div>
                    </div>
                    
                    <div className="bg-black/80 rounded border border-accent/30 p-4">
                      <div className="flex items-center mb-2">
                        <Database className="h-4 w-4 mr-2 text-green-400" />
                        <span className="text-xs font-mono text-green-400">project.description</span>
                      </div>
                      <p className="text-sm mb-4 font-mono">
                        {projects.find(p => p.id === activeProject)?.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-black/50 border border-accent/30 rounded p-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block p-4 border-2 border-dotted border-accent/40 rounded-full mb-4">
                    <Terminal className="h-8 w-8 text-accent/60" />
                  </div>
                  <p className="text-muted-foreground font-mono">
                    SELECT A PROJECT TO VIEW DETAILS
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

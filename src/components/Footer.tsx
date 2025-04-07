import { Facebook, Send, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary/80 text-muted-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-white">ALPHA FF</span>
            <p className="mt-2">Building the future, one app at a time.</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Send className="h-6 w-6" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-primary text-center">
          <p>© {new Date().getFullYear()} Alpha FF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

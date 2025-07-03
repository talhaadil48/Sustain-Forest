export default function Footer() {
    return (
      <footer className="relative py-6 px-4 text-white overflow-hidden">
        {/* Overlay + Blur */}
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60 backdrop-blur-md z-0" />
  
        {/* Layout Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          
          {/* Left Section: Logo or Name */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">Eco Centric</h2>
            <p className="text-sm">Urban Forestry Initiative</p>
          </div>
  
          {/* Center Section: Copyright */}
          <div className="text-center text-xs text-gray-300">
            © {new Date().getFullYear()} Eco Centric. All rights reserved.
          </div>
  
          {/* Right Section: Contact Info */}
          <div className="text-center md:text-right text-sm space-y-1">
            <p>
              📧{" "}
              <a
                href="mailto:ecocentric@example.com"
                className="hover:text-green-400 transition-colors"
              >
                ecocentric@example.com
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href="tel:+921234567890"
                className="hover:text-green-400 transition-colors"
              >
                +92 123 4567890
              </a>
            </p>
            <p>📍 NED University, Karachi</p>
          </div>
        </div>
      </footer>
    );
  }
  
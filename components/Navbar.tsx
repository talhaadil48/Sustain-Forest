import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 flex items-center justify-between bg-transparent">
      {/* Left Section — You can put your logo or leave empty */}
      <div className="text-white text-2xl font-bold flex gap-2">
        {/* Optional Left Logo */}
        {/* <img src="/eco-logo.png" alt="Logo" className="h-10 w-auto" /> */}
      </div>

      {/* Right Section — Logo + Language Switcher aligned to right */}
      <div className="flex items-center gap-3 ml-auto">
        <img src="/LOGONED.png" alt="NED Logo" className="h-12 w-auto" />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

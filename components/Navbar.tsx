import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 flex items-center justify-between bg-transparent  ">
      {/* Logo */}
      <div className="text-white text-2xl font-bold flex gap-2">
      
        {/* <img src="/eco-logo.png" alt="Logo" className="h-10 w-auto" /> */}
      </div>

      {/* Language Switcher */}
      <div className='flex gap-3'>
      <img src="/nedlogo.png" alt="Logo" className="h-12 w-auto" />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
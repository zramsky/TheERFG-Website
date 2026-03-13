import { useState, useEffect, useRef } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#industries', label: 'Who We Serve' },
    { href: '#methodology', label: 'How We Work' },
    { href: '#results', label: 'Results' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-[22px] h-[2px] bg-white rounded-sm transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[998]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-[76px] left-0 right-0 bg-[#1e1e1e] border-b border-white/[0.08] p-6 z-[999] flex flex-col gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-base font-medium text-white/70 py-2.5 border-b border-white/[0.08] no-underline hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="inline-block text-center mt-2 px-8 py-3.5 bg-accent text-[#141414] rounded-lg font-semibold text-[0.95rem] border-2 border-accent hover:bg-accent-hover hover:border-accent-hover no-underline transition-all duration-250"
          >
            Schedule a Call
          </a>
        </div>
      )}
    </>
  );
}

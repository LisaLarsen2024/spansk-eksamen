'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Hjem', emoji: '🏠' },
  { href: '/lytt', label: 'Lytt', emoji: '🎧' },
  { href: '/drill', label: 'Drill', emoji: '🃏' },
  { href: '/trening', label: 'Trening', emoji: '🎤' },
  { href: '/sensor', label: 'AI-Sensor', emoji: '🤖' },
  { href: '/min-versjon', label: 'Min', emoji: '✨' },
  { href: '/plan', label: 'Plan', emoji: '📋' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex justify-around py-1">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center py-1.5 px-1 rounded-lg transition-all ${
                isActive
                  ? 'text-coral scale-110'
                  : 'text-gray-400 hover:text-deep'
              }`}
            >
              <span className="text-lg">{link.emoji}</span>
              <span className="text-[9px] font-semibold mt-0.5">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

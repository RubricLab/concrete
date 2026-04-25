import type { ReactNode } from 'react';

import './globals.css';

const nav = [
  { href: '/', label: 'Concrete' },
  { href: '/foundations', label: 'Foundations' },
  { href: '/primitives', label: 'Primitives' },
  { href: '/components', label: 'Components' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <nav className="nav">
            {nav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}

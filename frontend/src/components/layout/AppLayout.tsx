import { ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, FolderOpen, BookOpen, Menu, X, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portfolio', label: 'Portfolio', icon: FolderOpen },
  { to: '/resources', label: 'Resources', icon: BookOpen },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-navy-border bg-navy-deep/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/assets/generated/patentforge-logo.dim_256x256.png"
                  alt="PatentForge AI"
                  className="h-10 w-10 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="h-10 w-10 rounded-lg bg-gold/20 border border-gold/40 items-center justify-center"
                >
                  <Lightbulb className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-gold-bright tracking-tight">PatentForge</span>
                <span className="font-display font-bold text-lg text-foreground tracking-tight"> AI</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const isActive = currentPath === to || currentPath.startsWith(to + '/');
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-navy-light'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* New Invention CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/new-project">
                <Button
                  size="sm"
                  className="bg-gold text-navy-deep hover:bg-gold-bright font-semibold shadow-gold transition-all duration-200"
                >
                  + New Invention
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-navy-light transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-navy-border bg-navy-deep">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const isActive = currentPath === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-navy-light'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link to="/new-project" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-gold text-navy-deep hover:bg-gold-bright font-semibold">
                    + New Invention
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-border bg-navy-deep py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-gold" />
              <span className="font-display font-semibold text-gold">PatentForge AI</span>
              <span>— Universal Invention to Patent Platform</span>
            </div>
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} Built with</span>
              <span className="text-gold">♥</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'patentforge-ai')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-bright transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

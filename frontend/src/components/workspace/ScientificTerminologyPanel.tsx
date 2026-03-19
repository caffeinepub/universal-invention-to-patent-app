import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { scientificTerminology, ScientificTerm } from '@/data/scientificTerminology';

interface ScientificTerminologyPanelProps {
  onInsertTerm?: (text: string) => void;
}

export function ScientificTerminologyPanel({ onInsertTerm }: ScientificTerminologyPanelProps) {
  const [search, setSearch] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return scientificTerminology;
    const q = search.toLowerCase();
    return scientificTerminology.filter(
      t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [search]);

  const handleCopy = (term: ScientificTerm) => {
    navigator.clipboard.writeText(term.patentPhrasing);
    setCopiedTerm(term.term);
    setTimeout(() => setCopiedTerm(null), 2000);
    if (onInsertTerm) onInsertTerm(term.patentPhrasing);
  };

  const categoryColors: Record<string, string> = {
    'Mechanical': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'General': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Patent Language': 'bg-gold/20 text-gold border-gold/30',
    'Materials': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Computing/Electronics': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Electronics': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Chemistry': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Physics': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'Advanced Materials': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    'Energy': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Biomedical': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'Analytical': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    'Manufacturing': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-navy-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm bg-navy-mid border-navy-border focus:border-gold/50"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{filtered.length} terms found</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filtered.map(term => (
            <div
              key={term.term}
              className="rounded-md border border-navy-border bg-navy-mid/50 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-2.5 text-left hover:bg-navy-light/50 transition-colors"
                onClick={() => setExpandedTerm(expandedTerm === term.term ? null : term.term)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{term.term}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded border shrink-0 ${categoryColors[term.category] || 'bg-muted text-muted-foreground border-border'}`}>
                    {term.category}
                  </span>
                </div>
                {expandedTerm === term.term ? (
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />
                )}
              </button>

              {expandedTerm === term.term && (
                <div className="px-2.5 pb-2.5 space-y-2 border-t border-navy-border">
                  <p className="text-xs text-muted-foreground mt-2">{term.definition}</p>
                  <div className="bg-navy-deep/50 rounded p-2 border border-gold/20">
                    <p className="text-xs text-gold/80 font-medium mb-1">Patent Phrasing:</p>
                    <p className="text-xs text-foreground/80 italic">{term.patentPhrasing}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(term)}
                    className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-bright transition-colors"
                  >
                    {copiedTerm === term.term ? (
                      <><Check className="h-3 w-3" /> Copied!</>
                    ) : (
                      <><Copy className="h-3 w-3" /> Copy phrasing</>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

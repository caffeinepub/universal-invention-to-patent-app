import { useState } from 'react';
import { LegalPhrase, legalPhrases } from '@/data/legalPhrases';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalPhrasesPanelProps {
  onInsertPhrase: (phrase: string) => void;
}

const categoryLabels: Record<LegalPhrase['category'], string> = {
  'claim-structure': 'Claim Structure',
  'transition': 'Transition',
  'qualifier': 'Qualifier',
  'relationship': 'Relationship',
  'action': 'Action',
};

const categoryColors: Record<LegalPhrase['category'], string> = {
  'claim-structure': 'bg-gold/15 text-gold border-gold/30 hover:bg-gold/25',
  'transition': 'bg-blue-500/15 text-blue-300 border-blue-500/30 hover:bg-blue-500/25',
  'qualifier': 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25',
  'relationship': 'bg-green-500/15 text-green-300 border-green-500/30 hover:bg-green-500/25',
  'action': 'bg-orange-500/15 text-orange-300 border-orange-500/30 hover:bg-orange-500/25',
};

const categories: LegalPhrase['category'][] = ['claim-structure', 'transition', 'qualifier', 'relationship', 'action'];

export function LegalPhrasesPanel({ onInsertPhrase }: LegalPhrasesPanelProps) {
  const [activeCategory, setActiveCategory] = useState<LegalPhrase['category'] | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? legalPhrases
    : legalPhrases.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-navy-border">
        <p className="text-xs text-muted-foreground mb-2">Click a phrase to insert into Claims</p>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              activeCategory === 'all'
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-navy-mid text-muted-foreground border-navy-border hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                activeCategory === cat
                  ? categoryColors[cat]
                  : 'bg-navy-mid text-muted-foreground border-navy-border hover:text-foreground'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filtered.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => onInsertPhrase(phrase.phrase)}
              className={`w-full text-left p-2 rounded border transition-all duration-150 group ${categoryColors[phrase.category]}`}
            >
              <div className="font-mono text-xs font-semibold">{phrase.phrase}</div>
              <div className="text-xs opacity-70 mt-0.5 group-hover:opacity-90">{phrase.description}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

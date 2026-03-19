import { useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClaimsPreviewProps {
  claims: string;
}

export function ClaimsPreview({ claims }: ClaimsPreviewProps) {
  const formattedClaims = useMemo(() => {
    if (!claims.trim()) return null;

    const lines = claims.split('\n').filter(l => l.trim());
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      const isNumbered = /^\d+\./.test(trimmed);
      const isDependent = /^(the|said)\s/i.test(trimmed) || /claim\s+\d+/i.test(trimmed);

      // Highlight patent terms
      const highlighted = trimmed
        .replace(/\b(comprising|wherein|whereby|consisting of|consisting essentially of|including|having)\b/gi,
          '<span class="text-gold font-semibold">$1</span>')
        .replace(/\b(at least one|a plurality of|substantially|approximately|configured to|adapted to|operably coupled to)\b/gi,
          '<span class="text-blue-300">$1</span>');

      return { line: highlighted, isNumbered, isDependent, idx };
    });
  }, [claims]);

  if (!formattedClaims) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm italic p-4">
        Claims preview will appear here as you type...
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-3 font-mono text-xs space-y-1.5">
        {formattedClaims.map(({ line, isNumbered, isDependent, idx }) => (
          <div
            key={idx}
            className={`leading-relaxed ${
              isDependent && !isNumbered ? 'pl-4 text-foreground/80' : 'text-foreground'
            } ${isNumbered ? 'font-semibold' : ''}`}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

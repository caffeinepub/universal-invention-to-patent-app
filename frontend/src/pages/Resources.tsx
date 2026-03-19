import { BookOpen, ExternalLink, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { learningResources } from '@/data/learningResources';

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-gold" />
          <h1 className="font-display text-3xl font-bold text-foreground">Learning Resources</h1>
        </div>
        <p className="text-muted-foreground">
          Self-learning guides to help you navigate the patent process from idea to submission.
        </p>
      </div>

      {/* Resource Categories */}
      <Accordion type="multiple" defaultValue={[learningResources[0]?.category]} className="space-y-3">
        {learningResources.map((categoryGroup) => (
          <AccordionItem
            key={categoryGroup.category}
            value={categoryGroup.category}
            className="bg-navy-mid border border-navy-border rounded-lg overflow-hidden px-0"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-navy-light/30 transition-colors [&[data-state=open]]:bg-navy-light/20">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{categoryGroup.icon}</span>
                <div>
                  <p className="font-display font-semibold text-foreground text-base">
                    {categoryGroup.category}
                  </p>
                  <p className="text-xs text-muted-foreground font-normal mt-0.5">
                    {categoryGroup.description}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              <div className="space-y-3 pt-2">
                {categoryGroup.resources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-md border border-navy-border bg-navy-deep/40 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-foreground">{resource.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed pl-3.5">
                          {resource.summary}
                        </p>
                      </div>
                      {resource.externalUrl && (
                        <a
                          href={resource.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-1 rounded text-muted-foreground hover:text-gold transition-colors"
                          aria-label={`Open ${resource.title}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Footer note */}
      <div className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-lg">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-gold font-semibold">Disclaimer:</span> The resources provided here are for educational purposes only and do not constitute legal advice.
          Always consult a registered patent attorney or agent for professional guidance on your specific invention and patent strategy.
        </p>
      </div>
    </div>
  );
}

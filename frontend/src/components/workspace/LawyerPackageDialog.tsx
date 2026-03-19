import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InventionProject } from '@/backend';
import { downloadLawyerPackage } from '@/utils/lawyerPackageExport';

interface LawyerPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: InventionProject;
}

const DEFAULT_COVER_NOTE = `Dear Patent Attorney,

Please find enclosed the invention disclosure for the above-referenced invention. I am seeking your professional assistance in evaluating the patentability of this invention and preparing a complete patent application.

I believe this invention represents a novel and non-obvious solution to the problem described herein. I would appreciate your expert review of the attached technical disclosure and draft claims.

Please contact me at your earliest convenience to discuss next steps.

Sincerely,
[Your Name]`;

export function LawyerPackageDialog({ open, onOpenChange, project }: LawyerPackageDialogProps) {
  const [coverNote, setCoverNote] = useState(DEFAULT_COVER_NOTE);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    downloadLawyerPackage(project, coverNote);
    setIsGenerating(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-navy-mid border-navy-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-foreground">
            <FileText className="h-5 w-5 text-gold" />
            Generate Lawyer Package
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a formatted patent attorney submission package for <strong className="text-foreground">"{project.title}"</strong>.
            Add a custom cover note below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Cover Note</Label>
          <Textarea
            value={coverNote}
            onChange={e => setCoverNote(e.target.value)}
            rows={10}
            className="bg-navy-deep border-navy-border focus:border-gold/50 text-sm font-mono resize-none"
            placeholder="Write your cover note to the patent attorney..."
          />
          <p className="text-xs text-muted-foreground">
            The package will include: cover note, invention disclosure, technical description, draft claims, and AI analysis summary.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-navy-border text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gold text-navy-deep hover:bg-gold-bright font-semibold"
          >
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
            ) : (
              <><Download className="h-4 w-4 mr-2" /> Download Package</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

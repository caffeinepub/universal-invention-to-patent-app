import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, Loader2, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useCreateProject } from '@/hooks/useQueries';
import { InventionStatus } from '@/backend';
import { parseImportedText } from '@/utils/projectImport';
import { VoiceInputButton } from '@/components/VoiceInputButton';

export default function NewProject() {
  const navigate = useNavigate();
  const createProject = useCreateProject();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    problem: '',
    solution: '',
    features: '',
    claims: '',
    status: InventionStatus.draft as InventionStatus,
  });
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const appendVoice = (field: keyof typeof form) => (text: string) => {
    setForm(prev => ({ ...prev, [field]: prev[field] + (prev[field] ? ' ' : '') + text.trim() }));
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseImportedText(text);
      if (!parsed.title) {
        setImportError('Could not parse the file. Make sure it is a valid PatentForge AI export.');
        return;
      }
      setForm(prev => ({
        ...prev,
        title: parsed.title || prev.title,
        problem: parsed.problem || prev.problem,
        solution: parsed.solution || prev.solution,
        features: parsed.features || prev.features,
        claims: parsed.claims || prev.claims,
        status: parsed.status || prev.status,
      }));
      setImportSuccess(true);
    };
    reader.onerror = () => setImportError('Failed to read file.');
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const id = await createProject.mutateAsync({
      title: form.title.trim(),
      problem: form.problem.trim(),
      solution: form.solution.trim(),
      features: form.features.trim(),
      claims: form.claims.trim(),
      status: form.status,
      ownerId: 'user',
      aiAnalysis: undefined,
    });

    navigate({ to: '/workspace/$projectId', params: { projectId: id.toString() } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/dashboard' })}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">New Invention</h1>
          <p className="text-sm text-muted-foreground">Document your invention idea to get started</p>
        </div>
      </div>

      {/* Import */}
      <Card className="bg-navy-mid border-navy-border mb-6">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Import from file</p>
              <p className="text-xs text-muted-foreground">Upload a previously exported PatentForge AI project</p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-gold/40 text-gold hover:bg-gold/10"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" /> Import .txt
              </Button>
            </div>
          </div>
          {importError && (
            <div className="flex items-center gap-2 mt-2 text-destructive text-xs">
              <AlertCircle className="h-3.5 w-3.5" /> {importError}
            </div>
          )}
          {importSuccess && (
            <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
              <FileText className="h-3.5 w-3.5" /> File imported successfully! Fields have been pre-populated.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">
              Invention Title <span className="text-destructive">*</span>
            </Label>
            <VoiceInputButton onTranscript={appendVoice('title')} fieldName="title" />
          </div>
          <Input
            value={form.title}
            onChange={e => updateField('title', e.target.value)}
            placeholder="e.g., Self-Cleaning Solar Panel with Electrostatic Dust Removal"
            required
            className="bg-navy-deep border-navy-border focus:border-gold/50"
          />
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Status</Label>
          <Select value={form.status} onValueChange={v => updateField('status', v)}>
            <SelectTrigger className="bg-navy-deep border-navy-border focus:border-gold/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-navy-mid border-navy-border">
              <SelectItem value={InventionStatus.draft}>Draft</SelectItem>
              <SelectItem value={InventionStatus.inReview}>In Review</SelectItem>
              <SelectItem value={InventionStatus.readyToSubmit}>Ready to Submit</SelectItem>
              <SelectItem value={InventionStatus.submitted}>Submitted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problem */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Problem Being Solved</Label>
            <VoiceInputButton onTranscript={appendVoice('problem')} fieldName="problem" />
          </div>
          <Textarea
            value={form.problem}
            onChange={e => updateField('problem', e.target.value)}
            placeholder="Describe the problem your invention solves..."
            rows={3}
            className="bg-navy-deep border-navy-border focus:border-gold/50 resize-none"
          />
        </div>

        {/* Solution */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Proposed Solution</Label>
            <VoiceInputButton onTranscript={appendVoice('solution')} fieldName="solution" />
          </div>
          <Textarea
            value={form.solution}
            onChange={e => updateField('solution', e.target.value)}
            placeholder="Describe how your invention solves the problem..."
            rows={3}
            className="bg-navy-deep border-navy-border focus:border-gold/50 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex-1 border-navy-border text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!form.title.trim() || createProject.isPending}
            className="flex-1 bg-gold text-navy-deep hover:bg-gold-bright font-semibold"
          >
            {createProject.isPending ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</>
            ) : (
              'Create & Open Workspace'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

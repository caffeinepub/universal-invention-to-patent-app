import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft, Save, Download, FileText, Brain, BookOpen, Scale,
  CheckCircle, AlertCircle, Loader2, Eye, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProject, useUpdateProject } from '@/hooks/useQueries';
import { useAutoSave } from '@/hooks/useAutoSave';
import { InventionStatus, InventionProjectInput, AIAnalysis } from '@/backend';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { ScientificTerminologyPanel } from '@/components/workspace/ScientificTerminologyPanel';
import { LegalPhrasesPanel } from '@/components/workspace/LegalPhrasesPanel';
import { ClaimsPreview } from '@/components/workspace/ClaimsPreview';
import { AICollaborationPanel } from '@/components/workspace/AICollaborationPanel';
import { LawyerPackageDialog } from '@/components/workspace/LawyerPackageDialog';
import { exportProjectAsText, downloadTextFile } from '@/utils/projectExport';

function SaveIndicator({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;
  return (
    <div className={`flex items-center gap-1.5 text-xs ${
      status === 'saving' ? 'text-muted-foreground' :
      status === 'saved' ? 'text-green-400' : 'text-destructive'
    }`}>
      {status === 'saving' && <Loader2 className="h-3 w-3 animate-spin" />}
      {status === 'saved' && <CheckCircle className="h-3 w-3" />}
      {status === 'error' && <AlertCircle className="h-3 w-3" />}
      <span>
        {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : 'Save failed'}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: InventionStatus }) {
  const config = {
    [InventionStatus.draft]: { label: 'Draft', className: 'bg-muted/50 text-muted-foreground border-border' },
    [InventionStatus.inReview]: { label: 'In Review', className: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    [InventionStatus.readyToSubmit]: { label: 'Ready to Submit', className: 'bg-gold/15 text-gold border-gold/30' },
    [InventionStatus.submitted]: { label: 'Submitted', className: 'bg-green-500/15 text-green-300 border-green-500/30' },
  };
  const { label, className } = config[status] || config[InventionStatus.draft];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${className}`}>
      {label}
    </span>
  );
}

export default function InventionWorkspace() {
  const { projectId } = useParams({ from: '/workspace/$projectId' });
  const navigate = useNavigate();
  const projectIdBigInt = BigInt(projectId);

  const { data: project, isLoading, error } = useGetProject(projectIdBigInt);
  const updateProject = useUpdateProject();

  const [form, setForm] = useState({
    title: '',
    problem: '',
    solution: '',
    features: '',
    claims: '',
    status: InventionStatus.draft as InventionStatus,
  });
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | undefined>(undefined);
  const [lawyerDialogOpen, setLawyerDialogOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize form from loaded project
  useEffect(() => {
    if (project && !initialized) {
      setForm({
        title: project.title,
        problem: project.problem,
        solution: project.solution,
        features: project.features,
        claims: project.claims,
        status: project.status,
      });
      setAiAnalysis(project.aiAnalysis ?? undefined);
      setInitialized(true);
    }
  }, [project, initialized]);

  const buildInput = useCallback((): InventionProjectInput => ({
    title: form.title,
    problem: form.problem,
    solution: form.solution,
    features: form.features,
    claims: form.claims,
    status: form.status,
    ownerId: project?.ownerId || 'user',
    aiAnalysis,
  }), [form, aiAnalysis, project]);

  const handleSave = useCallback(async () => {
    await updateProject.mutateAsync({
      projectId: projectIdBigInt,
      input: buildInput(),
    });
  }, [updateProject, projectIdBigInt, buildInput]);

  const { saveStatus, saveNow } = useAutoSave({
    data: { form, aiAnalysis },
    onSave: handleSave,
    delay: 2000,
    enabled: initialized,
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const appendVoice = (field: keyof typeof form) => (text: string) => {
    setForm(prev => ({ ...prev, [field]: prev[field] + (prev[field] ? ' ' : '') + text.trim() }));
  };

  const handleAnalysisComplete = useCallback((analysis: AIAnalysis) => {
    setAiAnalysis(analysis);
  }, []);

  const handleExport = () => {
    if (!project) return;
    const updatedProject = { ...project, ...form, aiAnalysis };
    const text = exportProjectAsText(updatedProject);
    const safeTitle = form.title.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadTextFile(text, `PatentForge-${safeTitle}-${dateStr}.txt`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <Skeleton className="h-8 w-64 bg-navy-mid" />
        <Skeleton className="h-4 w-48 bg-navy-mid" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-full bg-navy-mid" />
            <Skeleton className="h-32 w-full bg-navy-mid" />
            <Skeleton className="h-32 w-full bg-navy-mid" />
          </div>
          <Skeleton className="h-96 w-full bg-navy-mid" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Project not found</p>
            <p className="text-sm opacity-80">This project may have been deleted or the ID is invalid.</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/dashboard' })}
          className="mt-4 border-navy-border text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-16 z-40 border-b border-navy-border bg-navy-deep/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/dashboard' })}
                className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 min-w-0">
                <Lightbulb className="h-4 w-4 text-gold shrink-0" />
                <span className="font-display font-semibold text-sm text-foreground truncate">{form.title || 'Untitled Invention'}</span>
                <StatusBadge status={form.status} />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <SaveIndicator status={saveStatus} />
              <Button
                variant="ghost"
                size="sm"
                onClick={saveNow}
                disabled={updateProject.isPending}
                className="h-8 text-muted-foreground hover:text-foreground hidden sm:flex"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" /> Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="h-8 border-navy-border text-muted-foreground hover:text-foreground hidden sm:flex"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
              <Button
                size="sm"
                onClick={() => setLawyerDialogOpen(true)}
                className="h-8 bg-gold text-navy-deep hover:bg-gold-bright font-semibold text-xs"
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden sm:inline">Lawyer Package</span>
                <span className="sm:hidden">Package</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main editing area */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">Invention Title</Label>
                <VoiceInputButton onTranscript={appendVoice('title')} fieldName="title" />
              </div>
              <Input
                value={form.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="Enter your invention title..."
                className="bg-navy-mid border-navy-border focus:border-gold/50 font-display font-semibold text-base"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">Status</Label>
              <Select value={form.status} onValueChange={v => updateField('status', v)}>
                <SelectTrigger className="bg-navy-mid border-navy-border focus:border-gold/50 w-48">
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
                placeholder="Describe the technical problem or gap your invention addresses..."
                rows={4}
                className="bg-navy-mid border-navy-border focus:border-gold/50 resize-none"
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
                placeholder="Describe how your invention solves the problem in technical detail..."
                rows={4}
                className="bg-navy-mid border-navy-border focus:border-gold/50 resize-none"
              />
            </div>

            {/* Key Features */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">Key Features</Label>
                <VoiceInputButton onTranscript={appendVoice('features')} fieldName="features" />
              </div>
              <Textarea
                value={form.features}
                onChange={e => updateField('features', e.target.value)}
                placeholder="List the key novel features and aspects of your invention..."
                rows={4}
                className="bg-navy-mid border-navy-border focus:border-gold/50 resize-none"
              />
            </div>

            {/* Claims */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">Claims</Label>
                <VoiceInputButton onTranscript={appendVoice('claims')} fieldName="claims" />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                <Textarea
                  value={form.claims}
                  onChange={e => updateField('claims', e.target.value)}
                  placeholder="1. An apparatus comprising...&#10;&#10;2. The apparatus of claim 1, wherein..."
                  rows={8}
                  className="bg-navy-mid border-navy-border focus:border-gold/50 resize-none font-mono text-sm"
                />
                <div className="bg-navy-mid border border-navy-border rounded-md overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-navy-border bg-navy-deep/50">
                    <Eye className="h-3.5 w-3.5 text-gold" />
                    <span className="text-xs font-medium text-muted-foreground">Claims Preview</span>
                  </div>
                  <div className="h-[calc(100%-37px)]">
                    <ClaimsPreview claims={form.claims} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="w-full bg-navy-mid border border-navy-border grid grid-cols-3">
                <TabsTrigger value="ai" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-navy-deep">
                  <Brain className="h-3.5 w-3.5 mr-1" />
                  AI
                </TabsTrigger>
                <TabsTrigger value="legal" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-navy-deep">
                  <Scale className="h-3.5 w-3.5 mr-1" />
                  Legal
                </TabsTrigger>
                <TabsTrigger value="science" className="text-xs data-[state=active]:bg-gold data-[state=active]:text-navy-deep">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  Terms
                </TabsTrigger>
              </TabsList>

              <div className="mt-3 bg-navy-mid border border-navy-border rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <TabsContent value="ai" className="h-full m-0">
                  <AICollaborationPanel
                    projectData={buildInput()}
                    savedAnalysis={aiAnalysis}
                    onAnalysisComplete={handleAnalysisComplete}
                  />
                </TabsContent>

                <TabsContent value="legal" className="h-full m-0">
                  <LegalPhrasesPanel
                    onInsertPhrase={(phrase) => {
                      setForm(prev => ({
                        ...prev,
                        claims: prev.claims + (prev.claims ? '\n' : '') + phrase,
                      }));
                    }}
                  />
                </TabsContent>

                <TabsContent value="science" className="h-full m-0">
                  <ScientificTerminologyPanel
                    onInsertTerm={(text) => {
                      setForm(prev => ({
                        ...prev,
                        features: prev.features + (prev.features ? '\n' : '') + text,
                      }));
                    }}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Lawyer Package Dialog */}
      {lawyerDialogOpen && (
        <LawyerPackageDialog
          open={lawyerDialogOpen}
          onOpenChange={setLawyerDialogOpen}
          project={{ ...project, ...form, aiAnalysis }}
        />
      )}
    </div>
  );
}

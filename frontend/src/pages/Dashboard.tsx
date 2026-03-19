import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Plus, Clock, Trash2, Loader2, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetAllProjects, useDeleteProject } from '@/hooks/useQueries';
import { InventionProject, InventionStatus } from '@/backend';

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
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

function ProjectCard({ project, onDelete }: { project: InventionProject; onDelete: (id: bigint) => void }) {
  const navigate = useNavigate();
  return (
    <Card
      className="bg-navy-mid border-navy-border hover:border-gold/40 transition-all duration-200 cursor-pointer group hover:shadow-gold"
      onClick={() => navigate({ to: '/workspace/$projectId', params: { projectId: project.id.toString() } })}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-display font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2">
            {project.title}
          </CardTitle>
          <button
            onClick={e => { e.stopPropagation(); onDelete(project.id); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive shrink-0"
            aria-label="Delete project"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <StatusBadge status={project.status} />
      </CardHeader>
      <CardContent className="pt-0">
        {project.problem && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.problem}</p>
        )}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatDate(project.createdAt)}</span>
        </div>
        {project.aiAnalysis && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex-1 bg-navy-deep rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${Number(project.aiAnalysis.readinessScore)}%` }}
              />
            </div>
            <span className="text-xs text-gold font-medium">{Number(project.aiAnalysis.readinessScore)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: projects, isLoading, error } = useGetAllProjects();
  const deleteProject = useDeleteProject();
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);

  const handleDelete = async () => {
    if (deleteTarget !== null) {
      await deleteProject.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    }
  };

  const stats = {
    total: projects?.length || 0,
    draft: projects?.filter(p => p.status === InventionStatus.draft).length || 0,
    inReview: projects?.filter(p => p.status === InventionStatus.inReview).length || 0,
    ready: projects?.filter(p => p.status === InventionStatus.readyToSubmit).length || 0,
    submitted: projects?.filter(p => p.status === InventionStatus.submitted).length || 0,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/patentforge-hero-banner.dim_1200x400.png"
            alt="PatentForge AI Hero"
            className="w-full h-full object-cover opacity-40"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wide uppercase">PatentForge AI</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-3">
              Your Invention Portfolio
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Transform your ideas into patent-ready submissions with AI-powered guidance, voice input, and professional legal tools.
            </p>
            <Link to="/new-project">
              <Button className="bg-gold text-navy-deep hover:bg-gold-bright font-semibold shadow-gold px-6">
                <Plus className="h-4 w-4 mr-2" />
                New Invention
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-foreground' },
            { label: 'Draft', value: stats.draft, color: 'text-muted-foreground' },
            { label: 'In Review', value: stats.inReview, color: 'text-blue-300' },
            { label: 'Submitted', value: stats.submitted, color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-navy-mid border border-navy-border rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Your Inventions</h2>
          <Link to="/new-project">
            <Button size="sm" variant="outline" className="border-gold/40 text-gold hover:bg-gold/10">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> New
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-navy-mid border border-navy-border rounded-lg p-4 space-y-3">
                <Skeleton className="h-5 w-3/4 bg-navy-light" />
                <Skeleton className="h-4 w-1/3 bg-navy-light" />
                <Skeleton className="h-3 w-full bg-navy-light" />
                <Skeleton className="h-3 w-2/3 bg-navy-light" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">Failed to load projects. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && projects && projects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-navy-border rounded-xl">
            <Lightbulb className="h-12 w-12 text-gold/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">No inventions yet</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Start documenting your first invention idea. PatentForge AI will guide you through the patent process.
            </p>
            <Link to="/new-project">
              <Button className="bg-gold text-navy-deep hover:bg-gold-bright font-semibold">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Invention
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !error && projects && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...projects]
              .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
              .map(project => (
                <ProjectCard key={project.id.toString()} project={project} onDelete={setDeleteTarget} />
              ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteTarget !== null} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-navy-mid border-navy-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Invention?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. The invention project will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-navy-border text-muted-foreground hover:text-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProject.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { useNavigate } from '@tanstack/react-router';
import { FolderOpen, Clock, TrendingUp, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllProjects, useGetMostRecentProject } from '@/hooks/useQueries';
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

function ProjectRow({ project }: { project: InventionProject }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg border border-navy-border bg-navy-mid/50 hover:border-gold/40 hover:bg-navy-mid transition-all cursor-pointer group"
      onClick={() => navigate({ to: '/workspace/$projectId', params: { projectId: project.id.toString() } })}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Lightbulb className="h-4 w-4 text-gold/60 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate">
            {project.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{formatDate(project.createdAt)}</span>
            {project.aiAnalysis && (
              <>
                <span className="text-muted-foreground">·</span>
                <TrendingUp className="h-3 w-3 text-gold" />
                <span className="text-xs text-gold">{Number(project.aiAnalysis.readinessScore)}%</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={project.status} />
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
      </div>
    </div>
  );
}

const statusGroups: { status: InventionStatus; label: string; tabValue: string }[] = [
  { status: InventionStatus.draft, label: 'Draft', tabValue: 'draft' },
  { status: InventionStatus.inReview, label: 'In Review', tabValue: 'inReview' },
  { status: InventionStatus.readyToSubmit, label: 'Ready to Submit', tabValue: 'readyToSubmit' },
  { status: InventionStatus.submitted, label: 'Submitted', tabValue: 'submitted' },
];

export default function Portfolio() {
  const { data: projects, isLoading, error } = useGetAllProjects();
  const { data: mostRecent } = useGetMostRecentProject();

  const stats = {
    total: projects?.length || 0,
    draft: projects?.filter(p => p.status === InventionStatus.draft).length || 0,
    inReview: projects?.filter(p => p.status === InventionStatus.inReview).length || 0,
    readyToSubmit: projects?.filter(p => p.status === InventionStatus.readyToSubmit).length || 0,
    submitted: projects?.filter(p => p.status === InventionStatus.submitted).length || 0,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen className="h-6 w-6 text-gold" />
          <h1 className="font-display text-3xl font-bold text-foreground">Portfolio</h1>
        </div>
        <p className="text-muted-foreground">All your invention projects organized by status</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Inventions', value: stats.total, color: 'text-foreground', border: 'border-navy-border' },
          { label: 'Draft', value: stats.draft, color: 'text-muted-foreground', border: 'border-navy-border' },
          { label: 'In Review', value: stats.inReview, color: 'text-blue-300', border: 'border-blue-500/20' },
          { label: 'Submitted', value: stats.submitted, color: 'text-green-400', border: 'border-green-500/20' },
        ].map(stat => (
          <div key={stat.label} className={`bg-navy-mid border ${stat.border} rounded-lg p-4 text-center`}>
            <div className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Most Recently Updated */}
      {mostRecent && (
        <Card className="bg-navy-mid border-gold/20 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              Most Recently Updated
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-foreground">{mostRecent.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Updated {formatDate(mostRecent.updatedAt)}
                </p>
              </div>
              <StatusBadge status={mostRecent.status} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive mb-6">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">Failed to load projects. Please try again.</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-16 w-full bg-navy-mid" />
          ))}
        </div>
      )}

      {/* Projects by Status */}
      {!isLoading && !error && projects && (
        projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-navy-border rounded-xl">
            <FolderOpen className="h-12 w-12 text-gold/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">No inventions yet</h3>
            <p className="text-muted-foreground text-sm">
              Create your first invention to start building your portfolio.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="draft" className="w-full">
            <TabsList className="w-full bg-navy-mid border border-navy-border grid grid-cols-4 mb-4">
              {statusGroups.map(({ label, tabValue, status }) => {
                const count = projects.filter(p => p.status === status).length;
                return (
                  <TabsTrigger
                    key={tabValue}
                    value={tabValue}
                    className="text-xs data-[state=active]:bg-gold data-[state=active]:text-navy-deep"
                  >
                    {label}
                    {count > 0 && (
                      <span className="ml-1.5 bg-current/20 rounded-full px-1.5 py-0.5 text-xs leading-none">
                        {count}
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {statusGroups.map(({ status, tabValue }) => {
              const filtered = projects.filter(p => p.status === status);
              return (
                <TabsContent key={tabValue} value={tabValue}>
                  {filtered.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-navy-border rounded-lg">
                      <p className="text-muted-foreground text-sm">No inventions in this status</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filtered
                        .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
                        .map(project => (
                          <ProjectRow key={project.id.toString()} project={project} />
                        ))}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )
      )}
    </div>
  );
}

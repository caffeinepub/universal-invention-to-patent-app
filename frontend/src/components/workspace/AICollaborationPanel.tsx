import { useState } from 'react';
import { Brain, CheckCircle, Lightbulb, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { InventionProjectInput, AIAnalysis } from '@/backend';
import { analyzeInvention } from '@/utils/aiAnalysis';

interface AICollaborationPanelProps {
  projectData: InventionProjectInput;
  savedAnalysis?: AIAnalysis;
  onAnalysisComplete: (analysis: AIAnalysis) => void;
}

export function AICollaborationPanel({ projectData, savedAnalysis, onAnalysisComplete }: AICollaborationPanelProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(savedAnalysis || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1200));
    const result = analyzeInvention(projectData);
    setAnalysis(result);
    onAnalysisComplete(result);
    setIsAnalyzing(false);
  };

  const score = analysis ? Number(analysis.readinessScore) : 0;
  const scoreColor = score >= 80 ? 'text-green-400' : score >= 50 ? 'text-gold' : 'text-orange-400';
  const progressColor = score >= 80 ? 'bg-green-400' : score >= 50 ? 'bg-gold' : 'bg-orange-400';

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-navy-border">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-gold text-navy-deep hover:bg-gold-bright font-semibold"
        >
          {isAnalyzing ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
          ) : (
            <><Brain className="h-4 w-4 mr-2" /> {analysis ? 'Re-Analyze Idea' : 'Analyze Idea'}</>
          )}
        </Button>
        {!analysis && !isAnalyzing && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI will evaluate your invention's completeness and patentability
          </p>
        )}
      </div>

      {isAnalyzing && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className="relative">
            <Brain className="h-12 w-12 text-gold animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Analyzing your invention...</p>
            <p className="text-xs text-muted-foreground mt-1">Evaluating novelty, completeness, and claim structure</p>
          </div>
          <div className="w-full max-w-xs">
            <Progress value={undefined} className="h-1.5" />
          </div>
        </div>
      )}

      {analysis && !isAnalyzing && (
        <div className="flex-1 overflow-y-auto">
          {/* Readiness Score */}
          <div className="p-4 border-b border-navy-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gold" />
                <span className="text-sm font-semibold text-foreground">Readiness Score</span>
              </div>
              <span className={`text-2xl font-bold font-display ${scoreColor}`}>{score}%</span>
            </div>
            <div className="w-full bg-navy-mid rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {score >= 80 ? '✅ Strong submission candidate' : score >= 50 ? '⚠️ Needs some refinement' : '🔧 Significant work needed'}
            </p>
          </div>

          {/* Novelty Checklist */}
          <div className="p-4 border-b border-navy-border">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Novelty Checklist</span>
            </div>
            <ul className="space-y-2">
              {analysis.noveltyChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded border border-gold/40 bg-gold/10 shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-gold text-xs">?</span>
                  </div>
                  <span className="text-xs text-foreground/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Suggested Improvements</span>
            </div>
            <ul className="space-y-2">
              {analysis.suggestions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold text-xs font-bold shrink-0 mt-0.5">→</span>
                  <span className="text-xs text-foreground/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

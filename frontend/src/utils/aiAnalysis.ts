import { InventionProjectInput, AIAnalysis } from '../backend';

export function analyzeInvention(input: InventionProjectInput): AIAnalysis {
  const { title, problem, solution, features, claims } = input;

  // Calculate field completeness
  const fieldScores = {
    title: title.trim().length > 10 ? 20 : title.trim().length > 0 ? 10 : 0,
    problem: problem.trim().length > 50 ? 20 : problem.trim().length > 10 ? 10 : 0,
    solution: solution.trim().length > 50 ? 20 : solution.trim().length > 10 ? 10 : 0,
    features: features.trim().length > 30 ? 20 : features.trim().length > 0 ? 10 : 0,
    claims: claims.trim().length > 50 ? 20 : claims.trim().length > 0 ? 10 : 0,
  };

  // Check for patent terminology in claims
  const patentTerms = ['comprising', 'wherein', 'configured to', 'at least one', 'a plurality', 'adapted to', 'consisting of'];
  const claimsLower = claims.toLowerCase();
  const termCount = patentTerms.filter(t => claimsLower.includes(t)).length;
  const terminologyBonus = Math.min(termCount * 3, 15);

  // Check for technical specificity
  const technicalWords = ['method', 'apparatus', 'system', 'device', 'process', 'mechanism', 'component', 'element', 'structure'];
  const allText = `${title} ${problem} ${solution} ${features} ${claims}`.toLowerCase();
  const techCount = technicalWords.filter(w => allText.includes(w)).length;
  const techBonus = Math.min(techCount * 2, 10);

  const baseScore = Object.values(fieldScores).reduce((a, b) => a + b, 0);
  const totalScore = Math.min(baseScore + terminologyBonus + techBonus, 100);

  // Generate novelty checklist
  const noveltyChecklist: string[] = [
    `Is the core concept of "${title || 'this invention'}" distinct from existing solutions?`,
    'Have you conducted a prior art search in USPTO, Google Patents, or similar databases?',
    'Does the invention solve the stated problem in a non-obvious way?',
    'Are the key features described in sufficient technical detail to distinguish from prior art?',
    'Does the invention have at least one novel element not found in existing patents?',
    problem.trim().length > 0
      ? `Is the problem "${problem.substring(0, 60)}..." clearly unsolved by current technology?`
      : 'Is the problem being solved clearly defined and not addressed by existing solutions?',
    solution.trim().length > 0
      ? 'Does the proposed solution represent a non-obvious improvement over existing approaches?'
      : 'Is the proposed solution technically feasible and clearly described?',
    'Can the invention be reproduced by someone skilled in the relevant field based on the description?',
  ];

  // Generate suggestions
  const suggestions: string[] = [];

  if (title.trim().length < 10) {
    suggestions.push('Expand the invention title to be more descriptive and specific (aim for 10-20 words).');
  }
  if (problem.trim().length < 50) {
    suggestions.push('Elaborate on the problem being solved — describe the technical gap, limitations of existing solutions, and the need for your invention.');
  }
  if (solution.trim().length < 50) {
    suggestions.push('Provide a more detailed technical description of your solution, including how it works and its key components.');
  }
  if (features.trim().length < 30) {
    suggestions.push('List at least 3-5 specific key features or novel aspects of your invention that distinguish it from prior art.');
  }
  if (claims.trim().length < 50) {
    suggestions.push('Draft at least one independent claim using proper patent language (e.g., "An apparatus comprising..."). Use the Legal Phrases panel for guidance.');
  }
  if (termCount < 2) {
    suggestions.push('Incorporate standard patent claim language in your claims section (e.g., "comprising", "wherein", "configured to") for stronger legal protection.');
  }
  if (!claimsLower.includes('claim 1') && !claimsLower.includes('independent')) {
    suggestions.push('Consider structuring your claims with at least one independent claim followed by dependent claims that add specific limitations.');
  }
  if (suggestions.length === 0) {
    suggestions.push('Your invention description is comprehensive. Consider adding drawings or diagrams to further support your claims.');
    suggestions.push('Review your claims for potential broadening — ensure the broadest reasonable interpretation is captured in your independent claim.');
    suggestions.push('Consider filing a provisional patent application to establish an early priority date while you refine your invention.');
  }

  return {
    noveltyChecklist,
    suggestions,
    readinessScore: BigInt(totalScore),
  };
}

import { InventionProjectInput, InventionStatus } from '../backend';

function extractSection(text: string, sectionName: string, nextSectionNames: string[]): string {
  const sectionPattern = new RegExp(
    `${sectionName}\\s*[-─═]+\\s*([\\s\\S]*?)(?=${nextSectionNames.map(n => `${n}\\s*[-─═]+`).join('|')}|═══|$)`,
    'i'
  );
  const match = text.match(sectionPattern);
  if (match && match[1]) {
    return match[1].trim().replace(/^\(Not provided\)$/, '');
  }
  return '';
}

export function parseImportedText(text: string): Partial<InventionProjectInput> {
  const result: Partial<InventionProjectInput> = {};

  // Extract title
  const titleMatch = text.match(/TITLE:\s*(.+)/i);
  if (titleMatch) {
    result.title = titleMatch[1].trim();
  }

  // Extract status
  const statusMatch = text.match(/STATUS:\s*(.+)/i);
  if (statusMatch) {
    const statusText = statusMatch[1].trim().toLowerCase();
    if (statusText.includes('review')) result.status = InventionStatus.inReview;
    else if (statusText.includes('ready')) result.status = InventionStatus.readyToSubmit;
    else if (statusText.includes('submitted')) result.status = InventionStatus.submitted;
    else result.status = InventionStatus.draft;
  }

  // Extract sections
  const sections = ['PROBLEM BEING SOLVED', 'PROPOSED SOLUTION', 'KEY FEATURES', 'CLAIMS', 'AI ANALYSIS'];

  result.problem = extractSection(text, 'PROBLEM BEING SOLVED', ['PROPOSED SOLUTION', 'KEY FEATURES', 'CLAIMS', 'AI ANALYSIS']);
  result.solution = extractSection(text, 'PROPOSED SOLUTION', ['KEY FEATURES', 'CLAIMS', 'AI ANALYSIS']);
  result.features = extractSection(text, 'KEY FEATURES', ['CLAIMS', 'AI ANALYSIS']);
  result.claims = extractSection(text, 'CLAIMS', ['AI ANALYSIS']);

  // Set defaults
  if (!result.status) result.status = InventionStatus.draft;
  if (!result.ownerId) result.ownerId = 'user';

  return result;
}

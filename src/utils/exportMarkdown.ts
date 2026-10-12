import { WorkshopState } from '../context/WorkshopContext';
import { HAT_DEFINITIONS } from '../data/hatDefinitions';
import { HatType } from '../types';

export function generateSessionMarkdown(state: WorkshopState): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const hats: HatType[] = ['white', 'red', 'yellow', 'black', 'green', 'blue'];

  let md = `# Six Thinking Hats Workshop Summary\n\n`;
  md += `**Date:** ${dateStr}\n`;
  md += `**Topic:** ${state.topic || 'Untitled Topic'}\n`;
  if (state.expectedOutcome) {
    md += `**Expected Outcome:** ${state.expectedOutcome}\n`;
  }
  md += `\n---\n\n`;

  // 6 Hat Sections
  md += `## 1. Multi-Angle Perspectives\n\n`;
  hats.forEach((hatKey) => {
    const hat = HAT_DEFINITIONS[hatKey];
    const cards = state.cards[hatKey] || [];
    md += `### ${hat.name} (${hat.title})\n`;
    md += `*${hat.summary}*\n\n`;

    if (cards.length === 0) {
      md += `*No items recorded under this hat.*\n\n`;
    } else {
      cards.forEach((card) => {
        let meta = '';
        if (card.metadata?.riskSeverity) {
          meta += ` [${card.metadata.riskSeverity.toUpperCase()} risk]`;
        }
        if (card.metadata?.sentimentTone) {
          meta += ` [Sentiment: ${card.metadata.sentimentTone}]`;
        }
        const voteStr = card.votes > 0 ? ` (+${card.votes} votes)` : '';
        md += `- ${card.content}${meta}${voteStr}\n`;
      });
      md += `\n`;
    }
  });

  // Action Items Section
  md += `---\n\n## 2. Agreed Action Items (Blue Hat Synthesis)\n\n`;
  if (state.actionItems.length === 0) {
    md += `*No action items assigned.*\n\n`;
  } else {
    md += `| Task | Owner | Due Date | Status |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    state.actionItems.forEach((item) => {
      md += `| ${item.task} | ${item.owner || 'Unassigned'} | ${item.dueDate || 'TBD'} | ${item.status.toUpperCase()} |\n`;
    });
    md += `\n`;
  }

  return md;
}

export function downloadMarkdownFile(content: string, filename = 'six-thinking-hats-summary.md') {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

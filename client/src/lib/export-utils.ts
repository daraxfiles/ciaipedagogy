export function exportToMarkdown(policyText: string, courseName: string = '', instructorName: string = ''): void {
  const finalPolicy = policyText
    .replace('[COURSE NAME]', courseName || '[COURSE NAME]')
    .replace('[INSTRUCTOR NAME]', instructorName || '[INSTRUCTOR NAME]')
    .replace('[DATE]', new Date().toLocaleDateString());

  const blob = new Blob([finalPolicy], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-policy-${courseName ? courseName.toLowerCase().replace(/\s+/g, '-') : 'generated'}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToText(policyText: string, courseName: string = '', instructorName: string = ''): void {
  const finalPolicy = policyText
    .replace('[COURSE NAME]', courseName || '[COURSE NAME]')
    .replace('[INSTRUCTOR NAME]', instructorName || '[INSTRUCTOR NAME]')
    .replace('[DATE]', new Date().toLocaleDateString());

  const blob = new Blob([finalPolicy], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-policy-${courseName ? courseName.toLowerCase().replace(/\s+/g, '-') : 'generated'}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyFormattedPolicy(policyText: string, courseName: string = '', instructorName: string = ''): string {
  return policyText
    .replace('[COURSE NAME]', courseName || '[COURSE NAME]')
    .replace('[INSTRUCTOR NAME]', instructorName || '[INSTRUCTOR NAME]')
    .replace('[DATE]', new Date().toLocaleDateString());
}

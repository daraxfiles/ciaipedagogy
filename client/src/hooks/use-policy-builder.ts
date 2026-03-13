import { useState, useCallback } from 'react';
import { PolicySelections, generatePolicy } from '@/lib/policy-templates';
import { useToast } from '@/hooks/use-toast';

export function usePolicyBuilder() {
  const [selections, setSelections] = useState<PolicySelections>({
    purpose: [],
    tools: [],
    integrity: [],
    privacy: [],
    consequences: []
  });

  const { toast } = useToast();

  const updateSelection = useCallback((section: keyof PolicySelections, value: string, checked: boolean = true) => {
    setSelections(prev => {
      const newSelections = { ...prev };
      const arrayField = newSelections[section] as string[];
      if (checked) {
        if (!arrayField.includes(value)) {
          newSelections[section] = [...arrayField, value];
        }
      } else {
        newSelections[section] = arrayField.filter(v => v !== value);
      }
      return newSelections;
    });
  }, []);

  const getProgress = useCallback(() => {
    const sections = ['purpose', 'tools', 'integrity', 'privacy', 'consequences'] as const;
    let completed = 0;
    sections.forEach(section => {
      if (selections[section].length > 0) completed++;
    });
    return { completed, total: sections.length, percentage: (completed / sections.length) * 100 };
  }, [selections]);

  const generatePolicyText = useCallback(() => {
    return generatePolicy(selections);
  }, [selections]);

  const copyPolicy = useCallback(async () => {
    const policyText = generatePolicyText();
    try {
      await navigator.clipboard.writeText(policyText);
      toast({ title: 'Policy copied!', description: 'The AI policy has been copied to your clipboard.' });
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = policyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({ title: 'Policy copied!', description: 'The AI policy has been copied to your clipboard.' });
    }
  }, [generatePolicyText, toast]);

  const progress = getProgress();
  const isComplete = progress.completed === progress.total;

  return { selections, updateSelection, progress, isComplete, generatePolicyText, copyPolicy };
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, LucideIcon } from "lucide-react";
import { tooltips } from "@/lib/policy-templates";

interface PolicyOption {
  value: string;
  label: string;
}

interface PolicySectionProps {
  title: string;
  icon: LucideIcon;
  options: PolicyOption[];
  selectedValues: string[];
  onSelectionChange: (value: string, checked: boolean) => void;
  sectionKey: keyof typeof tooltips;
}

const sectionColors = {
  purpose: {
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    hover: 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40',
    accent: 'bg-blue-100 dark:bg-blue-900/40',
  },
  tools: {
    gradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-600 dark:text-emerald-400',
    hover: 'hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
    accent: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  integrity: {
    gradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-400',
    hover: 'hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40',
    accent: 'bg-amber-100 dark:bg-amber-900/40',
  },
  privacy: {
    gradient: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    hover: 'hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40',
    accent: 'bg-purple-100 dark:bg-purple-900/40',
  },
  consequences: {
    gradient: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    hover: 'hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/40',
    accent: 'bg-red-100 dark:bg-red-900/40',
  },
} as const;

export default function PolicySection({
  title,
  icon: Icon,
  options,
  selectedValues,
  onSelectionChange,
  sectionKey,
}: PolicySectionProps) {
  const colors = sectionColors[sectionKey as keyof typeof sectionColors] || sectionColors.purpose;

  return (
    <Card className={`${colors.gradient} ${colors.border} border-2`} data-testid={`card-section-${sectionKey}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-semibold">
          <Icon className={`h-5 w-5 ${colors.icon} mr-2 shrink-0`} />
          {title}
          <span className="ml-auto text-xs text-muted-foreground font-normal">Select one or more</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center p-2.5 border ${colors.border} rounded-lg ${colors.hover} cursor-pointer transition-all duration-150 ${selectedValues.includes(option.value) ? colors.accent : 'bg-background/60'}`}
          >
            <Checkbox
              id={`${sectionKey}-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => onSelectionChange(option.value, !!checked)}
              className="mr-3 shrink-0"
              data-testid={`checkbox-${sectionKey}-${option.value}`}
            />
            <Label
              htmlFor={`${sectionKey}-${option.value}`}
              className="flex-grow cursor-pointer text-sm leading-snug"
              data-testid={`label-${sectionKey}-${option.value}`}
            >
              {option.label}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className={`h-3.5 w-3.5 ${colors.icon} opacity-60 ml-2 shrink-0 hover:opacity-100 transition-opacity`} data-testid={`tooltip-${sectionKey}-${option.value}`} />
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-56">
                <p className="text-xs">{tooltips[sectionKey][option.value as keyof typeof tooltips[typeof sectionKey]]}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

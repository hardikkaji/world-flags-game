import { useIntl } from "react-intl";
import { PillButton } from "../ui/Button";

export type FilterMode = "all" | "alpha" | "continent";

interface FilterBarProps {
  mode: FilterMode;
  onModeChange: (mode: FilterMode) => void;
}

export function FilterBar({ mode, onModeChange }: FilterBarProps) {
  const intl = useIntl();
  const chips: { id: FilterMode; labelKey: string }[] = [
    { id: "all",       labelKey: "filter.all" },
    { id: "alpha",     labelKey: "filter.az" },
    { id: "continent", labelKey: "filter.continents" },
  ];

  return (
    <div className="sticky top-[64px] z-30 bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2">
        {chips.map(({ id, labelKey }) => (
          <PillButton key={id} active={mode === id} onClick={() => onModeChange(id)}>
            {intl.formatMessage({ id: labelKey })}
          </PillButton>
        ))}
      </div>
    </div>
  );
}

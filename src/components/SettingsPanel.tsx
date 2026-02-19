import { useIntl } from "react-intl";
import type { AppLocale } from "../i18n/messages";
import { Modal } from "../ui/Modal";
import { OptionButton, GradientButton } from "../ui/Button";

interface SettingsPanelProps {
  speechRate: number;
  onRateChange: (rate: number) => void;
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
  onClose: () => void;
}

const RATES = [
  { labelKey: "settings.slow",   value: 0.75 },
  { labelKey: "settings.normal", value: 0.9  },
  { labelKey: "settings.fast",   value: 1.4  },
];

const LANGS: { locale: AppLocale; labelKey: string }[] = [
  { locale: "en", labelKey: "lang.en" },
  { locale: "sv", labelKey: "lang.sv" },
];

export function SettingsPanel({ speechRate, onRateChange, locale, onLocaleChange, onClose }: SettingsPanelProps) {
  const intl = useIntl();

  return (
    <Modal open onClose={onClose} ariaLabel="Settings">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-800">
          {intl.formatMessage({ id: "settings.title" })}
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Speaking Speed */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-black text-gray-600 uppercase tracking-wider">
          {intl.formatMessage({ id: "settings.speed" })}
        </p>
        <div className="flex gap-2">
          {RATES.map((r) => (
            <OptionButton key={r.value} active={speechRate === r.value} onClick={() => onRateChange(r.value)}>
              {intl.formatMessage({ id: r.labelKey })}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-black text-gray-600 uppercase tracking-wider">
          {intl.formatMessage({ id: "settings.language" })}
        </p>
        <div className="flex gap-2">
          {LANGS.map((l) => (
            <OptionButton key={l.locale} active={locale === l.locale} onClick={() => onLocaleChange(l.locale)}>
              {intl.formatMessage({ id: l.labelKey })}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Done */}
      <GradientButton onClick={onClose}>
        {intl.formatMessage({ id: "settings.done" })}
      </GradientButton>
    </Modal>
  );
}

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

type NetworkMismatchCardProps = {
  networkMismatch: boolean;
};

export default function NetworkMismatchCard({ networkMismatch }: NetworkMismatchCardProps) {
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!networkMismatch || isDismissed) {
    return null;
  }

  return (
    <div
      className="hidden md:flex flex-col items-start gap-2 text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded"
      role="status"
    >
      <div className="flex items-center gap-1">
        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
        <span>Switch to Testnet in Freighter</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="underline underline-offset-2"
          aria-expanded={isHelpVisible}
          aria-controls="network-mismatch-help"
          onClick={() => setIsHelpVisible((visible) => !visible)}
        >
          {isHelpVisible ? 'Hide help' : 'Why am I seeing this?'}
        </button>
        <button
          type="button"
          className="underline underline-offset-2"
          aria-label="Dismiss network warning"
          onClick={() => setIsDismissed(true)}
        >
          Dismiss
        </button>
      </div>
      {isHelpVisible && (
        <p id="network-mismatch-help" className="font-normal">
          This app uses Stellar Testnet. Open Freighter’s network selector and choose Testnet to
          continue.
        </p>
      )}
    </div>
  );
}

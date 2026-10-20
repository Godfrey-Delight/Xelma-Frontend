import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const commands = [
  { label: 'Terminal', description: 'Open the trading terminal', to: '/dashboard' },
  { label: 'Learn', description: 'Browse learning resources', to: '/learn' },
  { label: 'Connect', description: 'Connect a Stellar address', to: '/connect' },
  { label: 'Profile', description: 'View your profile', to: '/profile' },
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setQuery('');
        setIsOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCommands = commands.filter(({ label, description }) =>
    `${label} ${description}`.toLowerCase().includes(normalizedQuery)
  );

  const runCommand = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[#BEC7FE]/20 bg-[#111827] shadow-2xl"
      >
        <h2 id="command-palette-title" className="sr-only">
          Command palette
        </h2>
        <input
          ref={inputRef}
          type="search"
          aria-label="Search commands"
          placeholder="Search pages and actions..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-gray-500"
        />
        <ul className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command) => (
              <li key={command.to}>
                <button
                  type="button"
                  onClick={() => runCommand(command.to)}
                  className="flex w-full flex-col rounded-lg px-4 py-3 text-left transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                >
                  <span className="text-sm font-medium text-white">{command.label}</span>
                  <span className="mt-1 text-xs text-gray-400">{command.description}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-gray-400">No matching commands</li>
          )}
        </ul>
      </section>
    </div>
  );
}

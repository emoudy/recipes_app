interface ChatInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChatInput({ value, onChange }: ChatInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Ask something..."
      className="flex-grow p-2.5 rounded-md border-2 border-[var(--input-border-light)] bg-[var(--input-light)] text-[var(--foreground-light)] outline-none dark:bg-[var(--input-dark)] dark:text-[var(--foreground-dark)]"
    />
  );
}

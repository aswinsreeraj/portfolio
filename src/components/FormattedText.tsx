import React from 'react';

interface FormattedTextProps {
  text: string;
}

/**
 * Renders inline backtick segments (`code`) as monospace code badges
 * instead of literal backtick characters in plain UI text.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={idx}
              className="px-1 py-0.5 rounded bg-[#E1F6FB]/80 dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8] font-mono text-[0.9em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

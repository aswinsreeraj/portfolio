import React from 'react';

interface ChatMessageRendererProps {
  content: string;
  isStreaming?: boolean;
}

/**
 * Parses inline Markdown formatting:
 * - Links: [label](url)
 * - Bold: **bold** (supports nested `code` inside bold)
 * - Inline code: `code`
 * - Italics: *italic*
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  if (!text) return [];

  // Match: code (`...`), bold (**...**), italic (*...*), link ([...](...))
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    if (!part) return null;

    // Inline Code
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={key}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#E1F6FB] dark:bg-[#16303B] font-mono text-[13px] text-[#00536A] dark:text-[#7FDCF3] border border-[#BFD8E1]/60 dark:border-[#203D4B]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold (may contain inline code inside, e.g. **`arda` (Go Engine)**)
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={key} className="font-semibold text-[#101820] dark:text-white">
          {renderInline(inner, `${key}-inner`)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Link: [title](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={key}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ADD8] hover:underline font-medium inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <span aria-hidden="true" className="text-[10px]">↗</span>
          </a>
        );
      }
    }

    // Plain text
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

interface BlockItem {
  type: 'code_block' | 'heading' | 'ul' | 'ol' | 'p';
  lang?: string;
  code?: string;
  items?: string[];
  text?: string;
}

export const ChatMessageRenderer: React.FC<ChatMessageRendererProps> = ({
  content,
  isStreaming = false,
}) => {
  if (!content) {
    return isStreaming ? (
      <span className="inline-block w-1.5 h-4 bg-[#00ADD8] animate-pulse align-middle rounded-xs" />
    ) : null;
  }

  // 1. Separate fenced code blocks (``` ... ```)
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g;
  const sections: { isCode: boolean; lang?: string; code?: string; text?: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      sections.push({
        isCode: false,
        text: content.slice(lastIndex, match.index),
      });
    }
    sections.push({
      isCode: true,
      lang: match[1] || '',
      code: match[2],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    sections.push({
      isCode: false,
      text: content.slice(lastIndex),
    });
  }

  // 2. Parse non-code sections into structured blocks (lists, paragraphs, headings)
  const blocks: BlockItem[] = [];

  for (const sec of sections) {
    if (sec.isCode) {
      blocks.push({
        type: 'code_block',
        lang: sec.lang,
        code: sec.code,
      });
      continue;
    }

    const rawBlocks = (sec.text || '')
      .split(/\n{2,}/)
      .map((b) => b.trim())
      .filter(Boolean);

    for (const raw of rawBlocks) {
      const lines = raw.split('\n');
      let currentList: BlockItem | null = null;

      for (const line of lines) {
        const lineTrimmed = line.trim();
        if (!lineTrimmed) continue;

        // Heading: ### Heading
        const headingMatch = lineTrimmed.match(/^#{1,4}\s+(.*)$/);
        if (headingMatch) {
          if (currentList) {
            blocks.push(currentList);
            currentList = null;
          }
          blocks.push({
            type: 'heading',
            text: headingMatch[1],
          });
          continue;
        }

        // Unordered list: - item or * item or • item
        const ulMatch = lineTrimmed.match(/^[-*•]\s+(.*)$/);
        if (ulMatch) {
          if (!currentList || currentList.type !== 'ul') {
            if (currentList) blocks.push(currentList);
            currentList = { type: 'ul', items: [] };
          }
          currentList.items?.push(ulMatch[1]);
          continue;
        }

        // Ordered list: 1. item
        const olMatch = lineTrimmed.match(/^(\d+)\.\s+(.*)$/);
        if (olMatch) {
          if (!currentList || currentList.type !== 'ol') {
            if (currentList) blocks.push(currentList);
            currentList = { type: 'ol', items: [] };
          }
          currentList.items?.push(olMatch[2]);
          continue;
        }

        // Normal text line
        if (currentList) {
          blocks.push(currentList);
          currentList = null;
        }
        blocks.push({
          type: 'p',
          text: lineTrimmed,
        });
      }

      if (currentList) {
        blocks.push(currentList);
      }
    }
  }

  return (
    <div className="space-y-2 text-[14.5px] leading-relaxed text-[#101820] dark:text-[#E6F4F8]">
      {blocks.map((block, idx) => {
        const isLastBlock = idx === blocks.length - 1;

        if (block.type === 'code_block') {
          return (
            <div key={`block-${idx}`} className="my-2.5">
              {block.lang && (
                <div className="text-[11px] font-mono px-3 py-1 bg-[#050D11] text-[#7FDCF3] rounded-t-md border-t border-x border-[#1E3A47] inline-block uppercase tracking-wider">
                  {block.lang}
                </div>
              )}
              <pre className={`p-3 rounded-b-md ${!block.lang ? 'rounded-t-md' : ''} bg-[#081318] border border-[#1E3A47] overflow-x-auto font-mono text-[12.5px] text-[#A5DDF0] leading-relaxed`}>
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === 'heading') {
          return (
            <h4
              key={`block-${idx}`}
              className="font-bold text-[15px] pt-1 text-[#00708C] dark:text-[#00ADD8]"
            >
              {renderInline(block.text || '', `heading-${idx}`)}
            </h4>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul
              key={`block-${idx}`}
              className="my-1.5 space-y-1.5 pl-4 list-disc marker:text-[#00ADD8] text-[14px]"
            >
              {block.items?.map((item, itemIdx) => {
                const isLastItem = isLastBlock && itemIdx === (block.items?.length || 1) - 1;
                return (
                  <li key={`ul-${idx}-${itemIdx}`} className="leading-relaxed">
                    {renderInline(item, `ul-${idx}-${itemIdx}`)}
                    {isLastItem && isStreaming && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-[#00ADD8] animate-pulse align-middle rounded-xs" />
                    )}
                  </li>
                );
              })}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol
              key={`block-${idx}`}
              className="my-1.5 space-y-1.5 pl-5 list-decimal marker:text-[#00ADD8] marker:font-semibold text-[14px]"
            >
              {block.items?.map((item, itemIdx) => {
                const isLastItem = isLastBlock && itemIdx === (block.items?.length || 1) - 1;
                return (
                  <li key={`ol-${idx}-${itemIdx}`} className="leading-relaxed">
                    {renderInline(item, `ol-${idx}-${itemIdx}`)}
                    {isLastItem && isStreaming && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-[#00ADD8] animate-pulse align-middle rounded-xs" />
                    )}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Paragraph
        return (
          <p key={`block-${idx}`} className="leading-relaxed m-0">
            {renderInline(block.text || '', `p-${idx}`)}
            {isLastBlock && isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#00ADD8] animate-pulse align-middle rounded-xs" />
            )}
          </p>
        );
      })}

      {blocks.length === 0 && isStreaming && (
        <span className="inline-block w-1.5 h-4 bg-[#00ADD8] animate-pulse align-middle rounded-xs" />
      )}
    </div>
  );
};

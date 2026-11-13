import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, ChatMode, ChatSource } from '../services/chatApi';
import { ChatMessageRenderer } from './ChatMessageRenderer';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  sources?: ChatSource[];
  isStreaming?: boolean;
}

interface AskAboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialMode?: ChatMode;
}

const MODES: { id: ChatMode; label: string; icon: string; starterQuestions: string[] }[] = [
  {
    id: 'ask-about-me',
    label: 'Ask me anything',
    icon: '👋',
    starterQuestions: [
      'Tell me about yourself',
      'What makes you suitable for a Backend Developer role?',
      'What did you build?',
      'How do you handle concurrency, failures & production bugs?',
    ],
  },
  {
    id: 'explore-projects',
    label: 'Explore projects',
    icon: '🚀',
    starterQuestions: [
      'Show me a project where you implemented Kafka',
      'What problem does ARDA solve?',
      'How did you build EVNTX and prevent overselling?',
      'Tell me about Tenome search engine architecture',
    ],
  },
  {
    id: 'technical-deep-dive',
    label: 'Technical deep dive',
    icon: '⚙️',
    starterQuestions: [
      'How did you handle expired-hold Razorpay refunds & reserve balances in EVNTX?',
      'Why did you choose pgvector HNSW over Pinecone for ARDA?',
      'How does Tenome Micro handle Kafka claim-check tracing & DLTs?',
      'How do optimistic CAS and FOR UPDATE work together in EVNTX?',
    ],
  },
  {
    id: 'interview-mode',
    label: 'Interview mode',
    icon: '🎯',
    starterQuestions: [
      'How do you handle concurrency, failures & production bugs?',
      'How do you handle context cancellation across goroutines?',
      'How do you enforce write idempotency and split-fee refunds?',
      'What makes you suitable for a Backend Developer role?',
    ],
  },
  {
    id: 'recruiter-mode',
    label: 'Recruiter mode',
    icon: '📋',
    starterQuestions: [
      'Tell me about yourself',
      'What makes you suitable for a Backend Developer role?',
      'How do you collaborate with teams & what is your availability?',
      'Summarize your core tech stack & achievements',
    ],
  },
];

export const AskAboutMeModal: React.FC<AskAboutMeModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
  initialMode = 'ask-about-me',
}) => {
  const [activeMode, setActiveMode] = useState<ChatMode>(initialMode);
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi, I'm Aswin! Ask me anything about my projects (ARDA, EVNTX, Tenome), my Go backend experience, architecture decisions, or my engineering background. Pick a question below or ask me directly!",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<number | null>(null);

  const activeModeConfig = MODES.find((m) => m.id === activeMode) || MODES[0];

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Initial query trigger
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSend(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Smooth scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isStreaming]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  // Realtime typewriter word-by-word streaming effect
  const streamBotResponse = (fullText: string, sources: ChatSource[]) => {
    const msgId = `bot-${Date.now()}`;
    const words = fullText.split(' ');
    let wordIndex = 0;

    // Start with empty message
    setMessages((prev) => [
      ...prev,
      {
        id: msgId,
        sender: 'bot',
        text: '',
        sources,
        isStreaming: true,
      },
    ]);
    setIsStreaming(true);

    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }

    streamIntervalRef.current = window.setInterval(() => {
      wordIndex += 2; // Stream 2 words per tick for snappy, natural pacing
      if (wordIndex >= words.length) {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: fullText, isStreaming: false } : m))
        );
        setIsStreaming(false);
      } else {
        const partialText = words.slice(0, wordIndex).join(' ');
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: partialText } : m))
        );
      }
    }, 28);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping || isStreaming) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: (m.sender === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.text,
      }));

      const res = await sendChatMessage(history, activeMode, conversationId);
      if (res.conversation_id) {
        setConversationId(res.conversation_id);
      }

      setIsTyping(false);
      streamBotResponse(res.response, res.sources || []);
    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I ran into a temporary issue retrieving that answer. Please ask me again or choose one of the questions below!",
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setIsStreaming(false);
    setIsTyping(false);
    setConversationId('');
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Switched to ${activeModeConfig.label}. Ask me anything, or try one of the suggestions below!`,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Chat Panel */}
      <div className="relative w-full max-w-[700px] h-[820px] max-h-[94vh] flex flex-col bg-white dark:bg-[#0E1F27] text-[#101820] dark:text-[#E6F4F8] border border-[#C9DCE4] dark:border-[#1E3A47] rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[#D6E7EE] dark:border-[#1E3A47] bg-[#F3FAFD] dark:bg-[#0A171D]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 rounded-md bg-[#00ADD8] text-white font-mono font-bold text-[15px] shadow-xs"
            >
              AS
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[16px] text-[#101820] dark:text-white leading-tight">
                  Chat with Aswin
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <span className="text-[12px] text-[#3C4C57] dark:text-[#8DB1BE]">
                Direct answers from my verified projects & notes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="Restart conversation"
              aria-label="Restart conversation"
              className="flex items-center justify-center w-8 h-8 rounded-md text-[#4A5B66] dark:text-[#8DB1BE] hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-mono"
            >
              ↺
            </button>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="flex items-center justify-center w-8 h-8 rounded-md text-[#101820] dark:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Capability Modes Selector */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto border-b border-[#D6E7EE] dark:border-[#1E3A47] bg-[#F8FCFD] dark:bg-[#0c1c24] no-scrollbar">
          {MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveMode(mode.id);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: `mode-switch-${Date.now()}`,
                      sender: 'bot',
                      text: `Switched mode to "${mode.label}". Ask me anything or select a question below.`,
                    },
                  ]);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#00ADD8] text-white shadow-xs font-semibold scale-102'
                    : 'bg-white dark:bg-[#12242D] text-[#3C4C57] dark:text-[#8DB1BE] border border-[#BFD8E1] dark:border-[#203D4B] hover:border-[#00ADD8]'
                }`}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-2 group">
              {msg.sender === 'user' ? (
                <div className="self-end max-w-[85%] px-4 py-2.5 bg-[#00ADD8] text-white rounded-[12px] rounded-tr-xs text-[14.5px] leading-relaxed font-medium shadow-xs">
                  {msg.text}
                </div>
              ) : (
                <div className="self-start max-w-[92%] flex flex-col gap-2.5 px-4 py-3 bg-[#F3FAFD] dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] rounded-[12px] rounded-tl-xs text-[14.5px] leading-relaxed text-[#101820] dark:text-[#E6F4F8] shadow-xs">
                  <ChatMessageRenderer content={msg.text} isStreaming={msg.isStreaming} />

                  {/* Sources Badges */}
                  {msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#D6E7EE]/70 dark:border-[#1E3A47]">
                      {msg.sources.map((src, idx) => (
                        <span
                          key={idx}
                          title={src.heading}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#12242D] text-[#00536A] dark:text-[#7FDCF3] flex items-center gap-1 hover:border-[#00ADD8] transition-colors"
                        >
                          <span className="opacity-70">[{src.source_type}]</span>
                          <span className="font-medium truncate max-w-[170px]">{src.title}</span>
                          {src.url && (
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#00ADD8] hover:underline"
                              aria-label={`Open reference for ${src.title}`}
                            >
                              ↗
                            </a>
                          )}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Message Action Bar (Copy) */}
                  {!msg.isStreaming && msg.text && (
                    <div className="flex justify-end pt-0.5 opacity-60 hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="text-[11px] text-[#4A5B66] dark:text-[#8DB1BE] hover:text-[#00ADD8] flex items-center gap-1 cursor-pointer font-mono"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-emerald-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <span>📋</span>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="self-start max-w-[88%] px-4 py-3 bg-[#F3FAFD] dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] rounded-[10px] font-mono text-xs text-[#3C4C57] dark:text-[#8DB1BE] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] animate-bounce delay-300" />
              <span>Aswin is formulating an answer from verified notes...</span>
            </div>
          )}

          {/* Mode Starter Prompts */}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <span className="font-mono text-[11px] tracking-wider text-[#4A5B66] dark:text-[#8DB1BE] uppercase">
              SUGGESTED QUESTIONS ({activeModeConfig.label.toUpperCase()})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeModeConfig.starterQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isTyping || isStreaming}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 bg-white dark:bg-[#0A171D] text-[#00536A] dark:text-[#00ADD8] border border-[#00ADD8] hover:bg-[#E1F6FB] dark:hover:bg-[#16303B] rounded-full font-medium text-[12.5px] cursor-pointer transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="flex flex-col gap-2 p-3 sm:p-4 border-t border-[#D6E7EE] dark:border-[#1E3A47] bg-white dark:bg-[#0A171D]">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping || isStreaming}
              placeholder={`Ask me anything (${activeModeConfig.label.toLowerCase()})...`}
              aria-label="Ask a question"
              className="flex-1 min-w-0 min-h-[44px] px-3.5 border border-[#BFD8E1] dark:border-[#2B4E5E] rounded-md text-[14.5px] bg-white dark:bg-[#0E1F27] text-[#101820] dark:text-white outline-none focus:border-[#00ADD8] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isTyping || isStreaming || !inputValue.trim()}
              aria-label="Send question"
              className="w-[44px] h-[44px] flex-shrink-0 flex items-center justify-center bg-[#FDDD00] hover:bg-[#ebd000] border border-[#101820] rounded-md cursor-pointer transition-transform active:scale-95 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101820" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-[#4A5B66] dark:text-[#8DB1BE]">
            <span>I answer directly from my documented codebases & background.</span>
            <span className="font-mono text-[10.5px]">Press Enter ↵</span>
          </div>
        </div>
      </div>
    </div>
  );
};

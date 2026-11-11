import { queryAssistant } from '../data/knowledgeBase';

export type ChatMode =
  | 'ask-about-me'
  | 'explore-projects'
  | 'technical-deep-dive'
  | 'interview-mode'
  | 'recruiter-mode';

export interface ChatSource {
  title: string;
  source_type: string;
  heading: string;
  url?: string;
  score?: number;
}

export interface ChatMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatApiResponse {
  response: string;
  sources: ChatSource[];
  conversation_id: string;
  mode: ChatMode;
  isFallback?: boolean;
}

export async function sendChatMessage(
  messages: ChatMessagePayload[],
  mode: ChatMode = 'ask-about-me',
  conversationId?: string
): Promise<ChatApiResponse> {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

  try {
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const res = await fetch(`${apiBase}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        mode,
        conversation_id: conversationId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      response: data.response,
      sources: data.sources || [],
      conversation_id: data.conversation_id || conversationId || '',
      mode: (data.mode as ChatMode) || mode,
    };
  } catch (err) {
    console.warn('Backend chat API unavailable, falling back to local client KB:', err);

    // Graceful client fallback
    const local = queryAssistant(lastUserMsg);
    return {
      response: local.answer,
      sources: (local.citations || []).map((c) => ({
        title: c,
        source_type: 'local-kb',
        heading: c,
      })),
      conversation_id: conversationId || `local-${Date.now()}`,
      mode,
      isFallback: true,
    };
  }
}


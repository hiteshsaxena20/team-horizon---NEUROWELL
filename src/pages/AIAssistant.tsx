import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Send, Sparkles, FileText, ChevronRight, Bot,
  User, Lightbulb, BookOpen
} from 'lucide-react';
import type { ChatMessage } from '../data/mockData';
import { aiResponses } from '../data/mockData';

const suggestedQuestions = [
  "What drilling problems occurred in nearby wells?",
  "Which nearby well is most similar to my target well?",
  "What risks should I expect at 2500m depth?",
  "Show wells with lost circulation problems.",
  "What lessons can be learned from WELL-A02?",
  "Which historical wells should I consider before drilling?",
];

function matchQuestion(input: string): { answer: string; sources: string[] } {
  const lower = input.toLowerCase();
  if (lower.includes('problem') || lower.includes('issue') || lower.includes('incident')) return aiResponses.problems;
  if (lower.includes('similar') || lower.includes('most similar')) return aiResponses.similar;
  if (lower.includes('depth') || lower.includes('2500') || lower.includes('risk') && lower.includes('expect')) return aiResponses.depth;
  if (lower.includes('lost circulation') || lower.includes('circulation')) return aiResponses.lost_circulation;
  if (lower.includes('lesson') || lower.includes('well-a02') || lower.includes('a02')) return aiResponses.lessons;
  if (lower.includes('historical') || lower.includes('consider') || lower.includes('before drilling')) return aiResponses.historical;
  return aiResponses.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the eRTMAC AI Drilling Assistant. I have access to data from 18 nearby wells, including geological information, drilling parameters, and historical incident reports.\n\nHow can I help you make better drilling decisions today?",
      sources: ['System Knowledge Base', 'Field Alpha Database', 'Regional Well Registry'],
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const question = text || input;
    if (!question.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = matchQuestion(question);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in flex flex-col space-y-5 h-[calc(100vh-12rem)] min-h-[660px]">
      {/* Header */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Bot size={22} className="text-navy-950" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">eRTMAC AI Drilling Assistant</h1>
            <p className="text-xs text-navy-300 mt-0.5">Retrieval-Augmented Generation (RAG) assistant for offset wells and drilling events</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">RAG Engine Live</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 glass-card flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/15 text-white rounded-tr-md'
                      : 'bg-navy-800/70 text-navy-100 rounded-tl-md'
                  }`}>
                    {msg.content.split('\n').map((line, i) => {
                      if (line.startsWith('|')) {
                        return <span key={i} className="font-mono text-xs">{line}<br /></span>;
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-semibold text-white mt-1">{line.replace(/\*\*/g, '')}</p>;
                      }
                      // Handle bold within lines
                      const parts = line.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={i} className={i > 0 ? 'mt-1' : ''}>
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-white">{part.replace(/\*\*/g, '')}</strong>;
                            }
                            return <span key={j}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 p-3 bg-navy-900/50 rounded-xl border border-navy-700/30">
                      <p className="text-[10px] text-navy-400 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1">
                        <BookOpen size={10} />
                        Sources / Evidence
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-navy-800 border border-navy-700/50 rounded-md text-cyan-400/80">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-600 to-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} className="text-navy-200" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-navy-800/70 rounded-2xl rounded-tl-md px-5 py-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-navy-700/50">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about nearby wells, drilling risks, or historical data..."
                className="flex-1 px-4 py-3 bg-navy-900/80 border border-navy-600/50 rounded-xl text-sm text-white placeholder-navy-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                rows={1}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Questions Sidebar */}
        <div className="hidden xl:block w-72 glass-card p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Lightbulb size={12} className="text-cyan-400" />
            Suggested Questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="w-full text-left p-3 bg-navy-800/50 hover:bg-navy-700/50 rounded-xl text-xs text-navy-200 transition-colors leading-relaxed group disabled:opacity-50"
              >
                <span className="group-hover:text-cyan-400 transition-colors">{q}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-navy-800/30 rounded-xl border border-navy-700/30">
            <h4 className="text-[10px] font-semibold text-navy-400 uppercase tracking-wider mb-2">AI Capabilities</h4>
            <div className="space-y-1.5">
              {['Well comparison', 'Risk assessment', 'Historical analysis', 'Offset well recommendations', 'Drilling parameter optimization'].map((cap, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span className="text-[10px] text-navy-400">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

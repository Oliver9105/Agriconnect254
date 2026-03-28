import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip, 
  Smile,
  CheckCheck,
  Circle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchMessages, sendMessage } from '../services/apiService';

const CHATS = [
  {
    id: 1,
    name: 'Samuel Koech',
    lastMessage: 'The tea harvest is ready for pickup.',
    time: '2m ago',
    unread: 2,
    online: true,
    image: 'https://picsum.photos/seed/farmer1/100/100',
    isGroup: false
  },
  {
    id: 2,
    name: 'Mary Chepkorir',
    lastMessage: 'What is the current price for Grade A maize?',
    time: '1h ago',
    unread: 0,
    online: false,
    image: 'https://picsum.photos/seed/farmer2/100/100',
    isGroup: false
  },
  {
    id: 3,
    name: 'David Langat',
    lastMessage: 'Logistics confirmed for tomorrow morning.',
    time: '3h ago',
    unread: 0,
    online: true,
    image: 'https://picsum.photos/seed/farmer3/100/100',
    isGroup: false
  },
  {
    id: 4,
    name: 'Kericho Hub Logistics',
    lastMessage: 'New route optimization available.',
    time: '5h ago',
    unread: 5,
    online: true,
    image: 'https://picsum.photos/seed/group1/100/100',
    isGroup: true
  }
];

const MESSAGES = [
  { id: 1, text: 'Hello Samuel, how is the harvest looking?', sender: 'me', time: '10:30 AM' },
  { id: 2, text: 'It looks exceptional this season! High altitude tea is showing great quality.', sender: 'them', time: '10:32 AM' },
  { id: 3, text: 'Great. Is it ready for pickup at the Kericho Hub?', sender: 'me', time: '10:35 AM' },
  { id: 4, text: 'Yes, the tea harvest is ready for pickup.', sender: 'them', time: '10:40 AM' },
];

export const Messaging = () => {
  const [selectedChat, setSelectedChat] = useState<typeof CHATS[0] | null>(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = async (chatId: string) => {
    setLoadingMessages(true);
    try {
      const data = await fetchMessages(String(chatId));
      // Merge with seed messages if empty
      if (data.length === 0) {
        setChatMessages(MESSAGES.map(m => ({ ...m, read: true, createdAt: new Date().toISOString() })));
      } else {
        setChatMessages(data);
      }
    } catch {
      setChatMessages(MESSAGES.map(m => ({ ...m, read: true, createdAt: new Date().toISOString() })));
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedChat) loadMessages(String(selectedChat.id));
    else setChatMessages([]);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;
    const optimistic = {
      id: Date.now(),
      text: message,
      sender: 'me',
      createdAt: new Date().toISOString(),
      read: false
    };
    setChatMessages(prev => [...prev, optimistic]);
    setMessage('');
    try {
      await sendMessage(String(selectedChat.id), optimistic.text, 'me');
    } catch (e) {
      console.error('Failed to send message', e);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-slate-950 border border-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden animate-in fade-in duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.6)] font-sans selection:bg-emerald-500/30">
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-3">
        <div className="p-5 sm:p-10 border-b border-white/5">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-8 opacity-80">Communications</h3>
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search encrypted nodes..." 
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-[11px] font-black uppercase tracking-[0.1em] focus:outline-none focus:border-emerald-500/50 transition-all shadow-neumorphic-inset-sm text-white placeholder:text-slate-800"
            />
          </div>
        </div>
        
        {CHATS.map((chat) => (
          <React.Fragment key={chat.id}>
            <motion.div 
              onClick={() => setSelectedChat(selectedChat?.id === chat.id ? null : chat)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "p-5 flex items-center gap-5 cursor-pointer transition-all duration-500 rounded-[2rem] border",
                selectedChat?.id === chat.id 
                  ? "bg-emerald-500/5 border-emerald-500/20 shadow-glow-emerald" 
                  : "border-transparent hover:bg-slate-900/40 hover:border-white/5"
              )}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden border border-white/5 shadow-tactile p-0.5">
                  <div className="w-full h-full rounded-xl overflow-hidden border border-white/5">
                    <img src={chat.image} alt={chat.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                {chat.online && !chat.isGroup && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-950 shadow-glow-emerald" />
                )}
                {chat.isGroup && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950 shadow-glow-cyan" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-black text-white tracking-tighter truncate">{chat.name}</h4>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{chat.time}</span>
                </div>
                <p className="text-[11px] font-black text-slate-500 truncate">
                  {chat.isGroup && chat.lastMessage.split(': ')[0] + ': '}
                  {chat.lastMessage.split(': ')[1] || chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-6 h-6 bg-emerald-500 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-glow-emerald border border-emerald-400/30">
                  {chat.unread}
                </div>
              )}
            </motion.div>
            
            <AnimatePresence>
              {selectedChat?.id === chat.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 mt-2 mb-6 shadow-neumorphic">
                    {/* Chat Window Content (moved from right pane) */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 flex-none rounded-xl bg-slate-900 overflow-hidden border border-white/5 shadow-tactile p-0.5">
                          <div className="w-full h-full rounded-lg overflow-hidden">
                            <img src={selectedChat.image} alt={selectedChat.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-base font-black text-white tracking-tighter truncate">{selectedChat.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={cn("w-2 h-2 flex-none rounded-full", selectedChat.online ? "bg-emerald-500" : "bg-slate-700")} />
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] truncate">
                              {selectedChat.online ? 'Active' : 'Offline'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-none">
                        <button className="p-3 bg-slate-950 border border-white/5 rounded-xl text-slate-600 hover:text-emerald-400 transition-all shadow-neumorphic active:shadow-neumorphic-inset">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-slate-950 border border-white/5 rounded-xl text-slate-600 hover:text-emerald-400 transition-all shadow-neumorphic active:shadow-neumorphic-inset">
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-64 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent">
                      {loadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        </div>
                      ) : chatMessages.map((msg) => (
                        <motion.div 
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={cn(
                            "flex flex-col max-w-[65%]",
                            msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                          )}
                        >
                          <div className={cn(
                            "px-6 py-3 rounded-[1.5rem] text-[12px] font-black leading-relaxed shadow-[0_20px_50px_rgba(0,0,0,0.3)] border tracking-wide",
                            msg.sender === 'me' 
                              ? "bg-emerald-600 text-white rounded-tr-none border-emerald-400/30 shadow-glow-emerald" 
                              : "bg-slate-950/80 backdrop-blur-2xl border-white/5 text-slate-200 rounded-tl-none shadow-neumorphic-sm"
                          )}>
                            {msg.text}
                          </div>
                          <div className="flex items-center gap-3 mt-2 px-2">
                            <span className="text-[8px] text-slate-700 font-black font-mono uppercase tracking-[0.2em]">
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.sender === 'me' && (
                              <CheckCheck className={cn("w-3 h-3", msg.read ? "text-emerald-500" : "text-slate-600")} />
                            )}
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="mt-6 flex items-center gap-4 bg-slate-950 border border-white/5 rounded-[2rem] px-6 py-3 shadow-neumorphic-inset">
                      <button className="text-slate-600 hover:text-emerald-500 transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Secure terminal input..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-[12px] text-white placeholder:text-slate-800 font-black uppercase tracking-[0.1em]"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-500 transition-all shadow-glow-emerald active:scale-90 border border-emerald-400/30 group"
                      >
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

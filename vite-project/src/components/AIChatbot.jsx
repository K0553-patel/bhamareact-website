import { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Namaste! 🙏 I'm your Bhama AI Assistant. How can I help you with our Industrial Machinery today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customMsg = null) => {
    const userMsg = customMsg || input;
    if (!userMsg.trim()) return;

    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "I'm having trouble connecting right now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Service temporarily unavailable. Please call +91 95584 83100." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: "Filling Machines", msg: "Tell me about Filling Machines" },
    { label: "Washing Systems", msg: "What washing machines do you have?" },
    { label: "Spare Parts", msg: "Do you provide spare parts?" },
    { label: "Contact Us", msg: "How can I contact sales?" }
  ];

  return (
    <>
      {/* Chat Trigger Button with Pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-trigger"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #002b5b 0%, #004b8d 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,43,91,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5000,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontSize: '1.8rem',
          transform: isOpen ? 'rotate(90deg) scale(0.9)' : 'none'
        }}
      >
        {isOpen ? '✕' : <span className="pulse-icon">💬</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" style={{
          position: 'fixed',
          bottom: '110px',
          right: '30px',
          width: '400px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '28px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          zIndex: 5000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.3)',
          animation: 'chatSlideIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(90deg, #002b5b 0%, #004b8d 100%)',
            color: 'white',
            padding: '1.8rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>⚙️</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.5px' }}>Bhama AI Expert</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <div className="online-dot"></div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 500 }}>AI Powered • Specialized</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', opacity: 0.7, cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            background: 'linear-gradient(to bottom, #fcfdfe, #f1f5f9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? '#002b5b' : 'white',
                color: m.role === 'user' ? 'white' : '#1e293b',
                padding: '1rem 1.25rem',
                borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                fontSize: '0.95rem',
                maxWidth: '85%',
                lineHeight: '1.6',
                border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}>
                {m.text.split('\n').map((line, idx) => (
                  <span key={idx}>{line}<br /></span>
                ))}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem', borderRadius: '20px 20px 20px 4px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            padding: '0.5rem 1rem',
            background: '#f8fafc',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            borderTop: '1px solid #f1f5f9'
          }} className="no-scrollbar">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action.msg)}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
                onMouseOver={(e) => { e.target.style.borderColor = '#002b5b'; e.target.style.color = '#002b5b'; }}
                onMouseOut={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ padding: '1.5rem', background: 'white', display: 'flex', gap: '1rem', alignItems: 'center' }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  border: '2px solid #f1f5f9',
                  outline: 'none',
                  fontSize: '0.95rem',
                  background: '#f8fafc',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#002b5b'}
                onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                background: '#002b5b',
                color: 'white',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: input.trim() ? 1 : 0.5,
                boxShadow: input.trim() ? '0 5px 15px rgba(0,43,91,0.3)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>➤</span>
            </button>
          </form>

          <style>{`
            @keyframes chatSlideIn {
                from { opacity: 0; transform: translateY(40px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .online-dot { 
                width: 8px; 
                height: 8px; 
                background: #10b981; 
                borderRadius: 50%; 
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
            .typing-indicator { display: flex; gap: 4px; padding: 4px; }
            .typing-indicator span { width: 6px; height: 6px; background: #cbd5e1; borderRadius: 50%; animation: dots 1.4s infinite; }
            .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes dots {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-6px); }
            }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .chat-trigger:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 35px rgba(0,43,91,0.5); }
          `}</style>
        </div>
      )}
    </>
  );
}

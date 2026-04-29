import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [persona, setPersona] = useState("anshuman");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const res = await fetch("https://chat-persona.onrender.com/chat",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input,
        persona
      })
    });

    const data = await res.json();

    setMessages([...messages, { text: data.reply }]);
    setInput("");
    setLoading(false);
  };

  const switchPersona = (p) => {
    setPersona(p);
    setMessages([]); // 🔥 important (reset chat)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Persona Chatbot</h2>

      {/* Persona Buttons */}
      <div style={styles.personaContainer}>
        {["anshuman", "abhimanyu", "kshitij"].map((p) => (
          <button
            key={p}
            onClick={() => switchPersona(p)}
            style={{
              ...styles.button,
              backgroundColor: persona === p ? "#4f46e5" : "#e5e7eb",
              color: persona === p ? "white" : "black"
            }}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      <p style={styles.active}>Active Persona: {persona}</p>

      {/* Suggestion Chips */}
      <div style={styles.chips}>
        <button onClick={() => setInput("How to learn coding?")}>
          Learn Coding
        </button>
        <button onClick={() => setInput("How to stay consistent?")}>
          Consistency
        </button>
      </div>

      {/* Chat Box */}
      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p style={{ color: "gray" }}>Start a conversation...</p>
        )}

        {messages.map((m, i) => (
          <div key={i} style={styles.message}>
            {m.text}
          </div>
        ))}

        {loading && <p style={styles.loading}>Typing...</p>}
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button style={styles.send} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  personaContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  active: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "gray"
  },
  chips: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  chatBox: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
    background: "#f9fafb"
  },
  message: {
    background: "#e0e7ff",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "8px",
    textAlign: "left"
  },
  loading: {
    fontStyle: "italic",
    color: "gray"
  },
  inputContainer: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  send: {
    padding: "8px 12px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default App;
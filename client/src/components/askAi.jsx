import { useState, useRef } from "react";
import axios from "axios";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const PHASE = {
  IDLE: "idle",
  LISTENING: "listening",
  WAITING: "waiting",
  SPEAKING: "speaking",
};

export default function Ask_Ai({blogtitle}) {

  const [phase, setPhase] = useState(PHASE.IDLE);
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);

  const initRecognition = () => {
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onstart = () => console.log("🎧 Recognition started");

    recog.onend = () => {
      if (phase === PHASE.LISTENING) {
        recog.start();
      }
    };

    recog.onerror = () => {
      if (phase === PHASE.LISTENING) {
        setTimeout(() => recog.start(), 500);
      }
    };

    recog.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (last.isFinal) {
        const userText = last[0].transcript.trim();
        if (userText) {
          setMessages((msgs) => [...msgs, { speaker: "user", text: userText  }]);
          recog.stop();
          setPhase(PHASE.WAITING);
          handleQuery(userText);
        }
      }
    };

    recognitionRef.current = recog;
  };

  const playMessage = async (text, resumeListening = true) => {
    setMessages((msgs) => [...msgs, { speaker: "ai", text }]);
    try {
      const ttsRes = await axios.post(
        "http://localhost:3000/api/tts",
        { text },
        {
    withCredentials: true,
    responseType: "blob",
        }
      );
      const url = URL.createObjectURL(ttsRes.data);
      const audio = new Audio(url);
      setPhase(PHASE.SPEAKING);
      audio.onended = () => {
        if (resumeListening) {
          setPhase(PHASE.LISTENING);
          recognitionRef.current && recognitionRef.current.start();
        } else {
          setPhase(PHASE.IDLE);
        }
      };
      audio.play();
    } catch {
      if (resumeListening) {
        setPhase(PHASE.LISTENING);
        recognitionRef.current && recognitionRef.current.start();
      } else {
        setPhase(PHASE.IDLE);
      }
    }
  };

  const startSession = () => {
    if (!SpeechRecognition) {
      alert("SpeechRecognition not supported");
      return;
    }
    initRecognition();
    setMessages([]);
    playMessage(
      "Hello! I'm Èpsilon ai assistant of Jayanth's blog. You can ask me anything about the blog and details of my admin Jayanth"
    );
  };

  const endSession = () => {
    playMessage("Goodbye! Have a great day!", false);
    recognitionRef.current && recognitionRef.current.stop();
  };

const handleQuery = (text) => {
  // 1. Construct the payload: the server expects { text: string }
  const payload = {
    text: `${text} and if user mentions this that means blogtitle is ${blogtitle}`
  };

  // 2. Send the POST
  axios
    .post("http://localhost:3000/api/complete",  payload , { withCredentials: true } )
    .then(({ data }) => {
      // playMessage comes from your speech‐synthesis logic
      playMessage(data.reply);
    })
    .catch((err) => {
      console.error("API call failed:", err);
      // restart listening on error
      setPhase(PHASE.LISTENING);
      if (recognitionRef.current) recognitionRef.current.start();
    });
};


  return (
    <div
      style={{
        width: "90%",
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div className="text-center mb-4">
                      {phase === PHASE.SPEAKING && (
        <img
          src={'https://raw.githubusercontent.com/jayanth119/JayanthBlog/refs/heads/main/assets/tenor.gif'}
          alt="AI speaking"
          style={{
            position: "absolute",
            // top: -1,
            // right: -1,
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            background: "rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
        />
      )}
        {phase === PHASE.IDLE ? (
          <button
            onClick={startSession}
            className="relative px-6 py-3 rounded-lg bg-red-500 text-black shadow-md hover:shadow-yellow-500 transition-all duration-300 animate-[glow_2s_ease-in-out_infinite] overflow-hidden font-bold text-lg"
          >
             🤖 Ask Ai
            {/* Sparkles */}
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[20%] top-[10%] [animation-delay:0s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[70%] top-[40%] [animation-delay:0.3s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[30%] top-[80%] [animation-delay:0.6s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[80%] top-[20%] [animation-delay:0.9s]" />
          </button>
        ) : (
          <button
            onClick={endSession}
            className="relative px-6 py-3 rounded-lg bg-yellow-400 text-black shadow-md hover:shadow-yellow-500 transition-all duration-300 animate-[glow_2s_ease-in-out_infinite] overflow-hidden font-bold text-lg"
          >
            ✖️ Stop
            {/* Sparkles */}
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[20%] top-[10%] [animation-delay:0s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[70%] top-[40%] [animation-delay:0.3s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[30%] top-[80%] [animation-delay:0.6s]" />
            <span className="absolute w-2 h-2 bg-white rounded-full opacity-0 pointer-events-none animate-[sparkle_1.5s_ease-in-out_infinite] left-[80%] top-[20%] [animation-delay:0.9s]" />
          </button>
        )}

      </div>

      {(phase === PHASE.WAITING || phase === PHASE.SPEAKING) && (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          …Assistant is {phase === PHASE.WAITING ? "thinking" : "speaking"}…
        </p>
      )}

      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 300,
            overflowY: "auto",
            background: "#000",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
          }}
        >
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong
                style={{ color: msg.speaker === "user" ? "#0af" : "#0f0" }}
              >
                {msg.speaker === "user" ? "You:" : "AI:"}
              </strong>
              <span style={{ marginLeft: 8 }}>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

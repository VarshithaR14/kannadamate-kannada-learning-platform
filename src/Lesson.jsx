
import { useState } from "react";
import "./Lesson.css";

const lessonWords = {
  "Basic Greetings": [
    { kannada: "ನಮಸ್ಕಾರ", english: "Hello", pronunciation: "Namaskara" },
    { kannada: "ಧನ್ಯವಾದಗಳು", english: "Thank you", pronunciation: "Dhanyavadagalu" },
    { kannada: "ಶುಭೋದಯ", english: "Good morning", pronunciation: "Shubhodaya" },
    { kannada: "ಹೇಗಿದ್ದೀರಾ?", english: "How are you?", pronunciation: "Hegiddira?" },
    { kannada: "ಚೆನ್ನಾಗಿದ್ದೇನೆ", english: "I am fine", pronunciation: "Chennagiddene" },
  ],

  "Everyday Conversations": [
    { kannada: "ನಿಮ್ಮ ಹೆಸರೇನು?", english: "What is your name?", pronunciation: "Nimma hesarenu?" },
    { kannada: "ನನ್ನ ಹೆಸರು...", english: "My name is...", pronunciation: "Nanna hesaru..." },
    { kannada: "ನೀವು ಎಲ್ಲಿದ್ದೀರಿ?", english: "Where are you?", pronunciation: "Neevu elliddiri?" },
    { kannada: "ಹೌದು", english: "Yes", pronunciation: "Howdu" },
    { kannada: "ಇಲ್ಲ", english: "No", pronunciation: "Illa" },
  ],

  "Food & Shopping": [
    { kannada: "ನೀರು", english: "Water", pronunciation: "Neeru" },
    { kannada: "ಊಟ", english: "Food / Meal", pronunciation: "Oota" },
    { kannada: "ಎಷ್ಟು?", english: "How much?", pronunciation: "Eshtu?" },
    { kannada: "ಬೇಕು", english: "I want", pronunciation: "Bekku" },
    { kannada: "ಬೇಡ", english: "I don't want", pronunciation: "Beda" },
  ],

  "Travel & Directions": [
    { kannada: "ಬಸ್ ನಿಲ್ದಾಣ", english: "Bus station", pronunciation: "Bus nildana" },
    { kannada: "ಎಲ್ಲಿದೆ?", english: "Where is it?", pronunciation: "Ellide?" },
    { kannada: "ಎಡಕ್ಕೆ", english: "Left", pronunciation: "Edakke" },
    { kannada: "ಬಲಕ್ಕೆ", english: "Right", pronunciation: "Balakke" },
    { kannada: "ಮುಂದೆ", english: "Straight / Ahead", pronunciation: "Munde" },
  ],
};

export default function Lesson({ lesson, onClose, onComplete }) {
  const words = lessonWords[lesson.title] || lessonWords["Basic Greetings"];

  const [current, setCurrent] = useState(0);
  const [learned, setLearned] = useState([]);

  const word = words[current];
  const finished = current === words.length - 1;

  function toggleLearned() {
    setLearned((previous) =>
      previous.includes(current)
        ? previous.filter((item) => item !== current)
        : [...previous, current]
    );
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      alert("Speech is not supported in this browser.");
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) =>
      v.lang.toLowerCase().startsWith("kn")
    );

    if (!voice) {
      alert("Kannada voice is unavailable. Try reading the pronunciation guide.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  function nextWord() {
    if (finished) {
      onComplete();
      return;
    }
    setCurrent((previous) => previous + 1);
  }

  return (
    <section className="lesson-page">
      <button className="back-button" onClick={onClose}>
        ← Back to lessons
      </button>

      <div className="lesson-container">
        <span className="eyebrow">KANNADA LEARNING JOURNEY</span>
        <h1>{lesson.title}</h1>
        <p>Learn useful Kannada words one step at a time.</p>

        <div className="lesson-progress">
          <div>
            <span>Word {current + 1} of {words.length}</span>
            <span>{learned.length} learned</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((current + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="word-card">
          <span className="eyebrow">KANNADA WORD</span>

          <h2 lang="kn">{word.kannada}</h2>
          <h3>{word.english}</h3>
          <p>Pronunciation: {word.pronunciation}</p>

          <button
            className="primary-button"
            onClick={() => speak(word.kannada)}
          >
            🔊 Listen to pronunciation
          </button>

          <button
            className="learned-button"
            onClick={toggleLearned}
          >
            {learned.includes(current) ? "✓ Learned" : "Mark as learned"}
          </button>
        </div>

        <div className="lesson-navigation">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((previous) => previous - 1)}
          >
            ← Previous
          </button>

          <button className="next-button" onClick={nextWord}>
            {finished ? "Complete lesson ✓" : "Next word →"}
          </button>
        </div>
      </div>
    </section>
  );
}

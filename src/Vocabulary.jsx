
import { useState } from "react";
import "./Vocabulary.css";

const vocabulary = {
  Greetings: [
    { kannada: "ನಮಸ್ಕಾರ", english: "Hello", pronunciation: "Namaskara" },
    { kannada: "ಧನ್ಯವಾದಗಳು", english: "Thank you", pronunciation: "Dhanyavadagalu" },
    { kannada: "ಕ್ಷಮಿಸಿ", english: "Sorry / Excuse me", pronunciation: "Kshamisi" },
    { kannada: "ಹೋಗಿ ಬನ್ನಿ", english: "Goodbye", pronunciation: "Hogi Banni" },
  ],
  "Food & Drinks": [
    { kannada: "ನೀರು", english: "Water", pronunciation: "Neeru" },
    { kannada: "ಊಟ", english: "Meal", pronunciation: "Oota" },
    { kannada: "ಹಾಲು", english: "Milk", pronunciation: "Haalu" },
    { kannada: "ಕಾಫಿ", english: "Coffee", pronunciation: "Kaapi" },
  ],
  Travel: [
    { kannada: "ಬಸ್", english: "Bus", pronunciation: "Bus" },
    { kannada: "ರೈಲು", english: "Train", pronunciation: "Railu" },
    { kannada: "ನಿಲ್ದಾಣ", english: "Station", pronunciation: "Nildana" },
    { kannada: "ಎಲ್ಲಿ", english: "Where", pronunciation: "Elli" },
  ],
  "Everyday Words": [
    { kannada: "ಮನೆ", english: "House", pronunciation: "Mane" },
    { kannada: "ಪುಸ್ತಕ", english: "Book", pronunciation: "Pustaka" },
    { kannada: "ಶಾಲೆ", english: "School", pronunciation: "Shaale" },
    { kannada: "ಸ್ನೇಹಿತ", english: "Friend", pronunciation: "Snehita" },
  ],
};

function Vocabulary() {
  const [category, setCategory] = useState("Greetings");

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support speech.");
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(
      (voice) => voice.lang.toLowerCase().startsWith("kn")
    );

    if (!kannadaVoice) {
      alert("A Kannada voice is not available on this device.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = kannadaVoice;
    utterance.lang = "kn-IN";
    utterance.rate = 0.8;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className="vocabulary-section" id="vocabulary">
      <div className="vocabulary-container">
        <p className="vocabulary-tag">BUILD YOUR VOCABULARY</p>
        <h2>Learn Useful Kannada Words</h2>
        <p className="vocabulary-description">
          Explore common Kannada words used in everyday situations.
        </p>

        <div className="category-buttons">
          {Object.keys(vocabulary).map((item) => (
            <button
              key={item}
              className={category === item ? "active-category" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="vocabulary-grid">
          {vocabulary[category].map((word) => (
            <div className="vocabulary-card" key={word.kannada}>
              <h3>{word.kannada}</h3>
              <p className="word-english">{word.english}</p>
              <p className="word-pronunciation">
                Pronunciation: {word.pronunciation}
              </p>
              <button
                className="word-audio"
                onClick={() => speak(word.kannada)}
              >
                🔊 Listen
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vocabulary;

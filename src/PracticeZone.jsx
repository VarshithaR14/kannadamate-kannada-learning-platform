
import { useState } from "react";
import "./PracticeZone.css";

const flashcards = [
  { kn: "ನಮಸ್ಕಾರ", en: "Hello", pronunciation: "Namaskara" },
  { kn: "ಧನ್ಯವಾದಗಳು", en: "Thank you", pronunciation: "Dhanyavadagalu" },
  { kn: "ನೀರು", en: "Water", pronunciation: "Neeru" },
  { kn: "ಊಟ", en: "Food / Meal", pronunciation: "Oota" },
  { kn: "ಮನೆ", en: "House", pronunciation: "Mane" },
  { kn: "ಪುಸ್ತಕ", en: "Book", pronunciation: "Pustaka" },
  { kn: "ಅಮ್ಮ", en: "Mother", pronunciation: "Amma" },
  { kn: "ಸ್ನೇಹಿತ", en: "Friend", pronunciation: "Snehita" },
  { kn: "ಶಾಲೆ", en: "School", pronunciation: "Shaale" },
  { kn: "ನಾಳೆ", en: "Tomorrow", pronunciation: "Naale" },
];

const matchQuestions = [
  { kn: "ನಮಸ್ಕಾರ", en: "Hello" },
  { kn: "ನೀರು", en: "Water" },
  { kn: "ಮನೆ", en: "House" },
  { kn: "ಪುಸ್ತಕ", en: "Book" },
  { kn: "ಅಮ್ಮ", en: "Mother" },
];

function speak(text) {
  if (!("speechSynthesis" in window)) {
    alert("Speech is not supported in this browser.");
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((item) =>
    item.lang.toLowerCase().startsWith("kn")
  );

  if (!voice) {
    alert("A Kannada voice is not available on this device.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.8;

  window.speechSynthesis.speak(utterance);
}

export default function PracticeZone() {
  const [mode, setMode] = useState("flashcards");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [matchIndex, setMatchIndex] = useState(0);
  const [selectedKannada, setSelectedKannada] = useState("");
  const [selectedEnglish, setSelectedEnglish] = useState("");
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(false);

  const card = flashcards[cardIndex];

  const shuffledEnglish = [...matchQuestions]
    .map((item) => item.en)
    .sort((a, b) => a.localeCompare(b));

  function nextCard() {
    setCardIndex((previous) => (previous + 1) % flashcards.length);
    setFlipped(false);
  }

  function previousCard() {
    setCardIndex((previous) =>
      (previous - 1 + flashcards.length) % flashcards.length
    );
    setFlipped(false);
  }

  function selectKannada(word) {
    if (matched.includes(word)) return;
    setSelectedKannada(word);
    checkMatch(word, selectedEnglish);
  }

  function selectEnglish(word) {
    if (matched.includes(
      matchQuestions.find((item) => item.en === word)?.kn
    )) return;

    setSelectedEnglish(word);
    checkMatch(selectedKannada, word);
  }

  function checkMatch(kn, en) {
    if (!kn || !en) return;

    const correct = matchQuestions.find((item) => item.kn === kn);

    if (correct?.en === en) {
      const updated = [...matched, kn];
      setMatched(updated);
      setSelectedKannada("");
      setSelectedEnglish("");
      setWrong(false);
      setMatchIndex(updated.length);
    } else {
      setWrong(true);
      setTimeout(() => {
        setSelectedKannada("");
        setSelectedEnglish("");
        setWrong(false);
      }, 800);
    }
  }

  function restartMatching() {
    setMatched([]);
    setSelectedKannada("");
    setSelectedEnglish("");
    setMatchIndex(0);
    setWrong(false);
  }

  return (
    <section className="practice-section" id="practice">
      <div className="practice-container">
        <span className="practice-tag">LEARN BY PRACTISING</span>

        <h2>Kannada Practice Zone</h2>

        <p className="practice-description">
          Make learning fun with interactive activities.
        </p>

        <div className="practice-tabs">
          <button
            className={mode === "flashcards" ? "active-practice" : ""}
            onClick={() => setMode("flashcards")}
          >
            🃏 Flashcards
          </button>

          <button
            className={mode === "matching" ? "active-practice" : ""}
            onClick={() => setMode("matching")}
          >
            🔗 Match the Pairs
          </button>
        </div>

        {mode === "flashcards" && (
          <div className="flashcard-area">
            <p className="practice-counter">
              Card {cardIndex + 1} of {flashcards.length}
            </p>

            <button
              className={`flashcard ${flipped ? "flipped" : ""}`}
              onClick={() => setFlipped(!flipped)}
              aria-label="Flip flashcard"
            >
              {!flipped ? (
                <>
                  <span className="flashcard-label">KANNADA WORD</span>
                  <strong lang="kn">{card.kn}</strong>
                  <span className="flashcard-hint">
                    Click to reveal the meaning
                  </span>
                </>
              ) : (
                <>
                  <span className="flashcard-label">ENGLISH MEANING</span>
                  <strong>{card.en}</strong>
                  <span className="flashcard-hint">
                    Pronunciation: {card.pronunciation}
                  </span>
                </>
              )}
            </button>

            <button
              className="practice-listen"
              onClick={() => speak(card.kn)}
            >
              🔊 Listen
            </button>

            <div className="flashcard-navigation">
              <button onClick={previousCard}>← Previous</button>
              <button onClick={nextCard}>Next →</button>
            </div>
          </div>
        )}

        {mode === "matching" && (
          <div className="matching-area">
            <h3>Match the Kannada words with their meanings</h3>

            <p className="matching-instruction">
              Select one Kannada word and its correct English meaning.
            </p>

            <div className="matching-score">
              Matched: {matched.length} / {matchQuestions.length}
            </div>

            {matched.length === matchQuestions.length ? (
              <div className="matching-complete">
                <h3>Excellent! 🎉</h3>
                <p>You matched all the Kannada words correctly.</p>
                <button onClick={restartMatching}>
                  Play Again
                </button>
              </div>
            ) : (
              <>
                <div className="matching-grid">
                  <div>
                    <h4>Kannada</h4>
                    {matchQuestions.map((item) => (
                      <button
                        key={item.kn}
                        disabled={matched.includes(item.kn)}
                        className={`match-option ${
                          selectedKannada === item.kn ? "match-selected" : ""
                        } ${matched.includes(item.kn) ? "match-done" : ""}`}
                        onClick={() => selectKannada(item.kn)}
                      >
                        {matched.includes(item.kn) ? "✓ Matched" : item.kn}
                      </button>
                    ))}
                  </div>

                  <div>
                    <h4>English</h4>
                    {shuffledEnglish.map((word) => {
                      const matchedItem = matchQuestions.find(
                        (item) => item.en === word
                      );

                      const isMatched = matched.includes(matchedItem.kn);

                      return (
                        <button
                          key={word}
                          disabled={isMatched}
                          className={`match-option ${
                            selectedEnglish === word ? "match-selected" : ""
                          } ${isMatched ? "match-done" : ""}`}
                          onClick={() => selectEnglish(word)}
                        >
                          {isMatched ? "✓ Matched" : word}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {wrong && (
                  <p className="match-feedback">
                    Not quite! Try another pair.
                  </p>
                )}

                <button
                  className="restart-matching"
                  onClick={restartMatching}
                >
                  Restart Activity
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

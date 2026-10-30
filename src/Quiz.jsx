
import { useState } from "react";
import "./Quiz.css";

const quizData = {
  Beginner: [
    {
      question: "What does ನಮಸ್ಕಾರ mean?",
      options: ["Hello", "Goodbye", "Sorry", "Welcome"],
      answer: "Hello",
      explanation: "ನಮಸ್ಕಾರ (Namaskara) is a polite Kannada greeting."
    },
    {
      question: "What is the Kannada word for Water?",
      options: ["ಹಾಲು", "ನೀರು", "ಊಟ", "ಕಾಫಿ"],
      answer: "ನೀರು",
      explanation: "ನೀರು (Neeru) means water."
    },
    {
      question: "What does ಧನ್ಯವಾದಗಳು mean?",
      options: ["Please", "Sorry", "Thank you", "Good morning"],
      answer: "Thank you",
      explanation: "ಧನ್ಯವಾದಗಳು (Dhanyavadagalu) means thank you."
    },
    {
      question: "How do you say Yes in Kannada?",
      options: ["ಇಲ್ಲ", "ಹೌದು", "ಬೇಡ", "ಬನ್ನಿ"],
      answer: "ಹೌದು",
      explanation: "ಹೌದು (Howdu) means yes."
    },
    {
      question: "What does ಮನೆ mean?",
      options: ["School", "Book", "House", "Road"],
      answer: "House",
      explanation: "ಮನೆ (Mane) means house or home."
    },
    {
      question: "What is the Kannada word for Mother?",
      options: ["ಅಪ್ಪ", "ಅಮ್ಮ", "ಅಣ್ಣ", "ಅಕ್ಕ"],
      answer: "ಅಮ್ಮ",
      explanation: "ಅಮ್ಮ (Amma) means mother."
    },
    {
      question: "What does ಊಟ mean?",
      options: ["Water", "Food / Meal", "Milk", "Fruit"],
      answer: "Food / Meal",
      explanation: "ಊಟ (Oota) means a meal or food."
    },
    {
      question: "What does ಶುಭೋದಯ mean?",
      options: ["Good night", "Good evening", "Good morning", "Goodbye"],
      answer: "Good morning",
      explanation: "ಶುಭೋದಯ (Shubhodaya) means good morning."
    },
    {
      question: "How do you say No in Kannada?",
      options: ["ಹೌದು", "ಇಲ್ಲ", "ಬನ್ನಿ", "ಸರಿ"],
      answer: "ಇಲ್ಲ",
      explanation: "ಇಲ್ಲ (Illa) means no or not."
    },
    {
      question: "What does ಪುಸ್ತಕ mean?",
      options: ["Pen", "Book", "Bag", "Table"],
      answer: "Book",
      explanation: "ಪುಸ್ತಕ (Pustaka) means book."
    }
  ],

  Intermediate: [
    {
      question: "What does ನಿಮ್ಮ ಹೆಸರೇನು? mean?",
      options: ["Where are you?", "What is your name?", "How old are you?", "Where do you live?"],
      answer: "What is your name?",
      explanation: "ನಿಮ್ಮ ಹೆಸರೇನು? (Nimma hesarenu?) is used to ask someone's name."
    },
    {
      question: "How do you say 'How are you?' in Kannada?",
      options: ["ನೀವು ಎಲ್ಲಿದ್ದೀರಿ?", "ಹೇಗಿದ್ದೀರಾ?", "ಏನು ಬೇಕು?", "ಎಲ್ಲಿ ಹೋಗುತ್ತೀರಿ?"],
      answer: "ಹೇಗಿದ್ದೀರಾ?",
      explanation: "ಹೇಗಿದ್ದೀರಾ? (Hegiddira?) is a polite way to ask how someone is."
    },
    {
      question: "What does ಎಷ್ಟು? mean?",
      options: ["Where?", "When?", "How much?", "Who?"],
      answer: "How much?",
      explanation: "ಎಷ್ಟು? (Eshtu?) is commonly used when asking prices or quantities."
    },
    {
      question: "What does ಬಲಕ್ಕೆ mean?",
      options: ["Left", "Right", "Straight", "Behind"],
      answer: "Right",
      explanation: "ಬಲಕ್ಕೆ (Balakke) means to the right."
    },
    {
      question: "How do you say 'I want water'?",
      options: ["ನನಗೆ ನೀರು ಬೇಕು", "ನನಗೆ ಊಟ ಬೇಡ", "ನೀವು ಬನ್ನಿ", "ನಾನು ಹೋಗುತ್ತೇನೆ"],
      answer: "ನನಗೆ ನೀರು ಬೇಕು",
      explanation: "ನನಗೆ ನೀರು ಬೇಕು (Nanage neeru beku) means I want water."
    },
    {
      question: "What does ನಾಳೆ mean?",
      options: ["Yesterday", "Today", "Tomorrow", "Now"],
      answer: "Tomorrow",
      explanation: "ನಾಳೆ (Naale) means tomorrow."
    },
    {
      question: "What does ನಾನು ವಿದ್ಯಾರ್ಥಿ mean?",
      options: ["I am a teacher", "I am a student", "I am a doctor", "I am a driver"],
      answer: "I am a student",
      explanation: "ನಾನು ವಿದ್ಯಾರ್ಥಿ (Naanu vidyarthi) means I am a student."
    },
    {
      question: "What does ರೈಲು ನಿಲ್ದಾಣ mean?",
      options: ["Bus stop", "Airport", "Railway station", "Hospital"],
      answer: "Railway station",
      explanation: "ರೈಲು ನಿಲ್ದಾಣ (Railu nildana) means railway station."
    },
    {
      question: "How do you say 'Please come' politely?",
      options: ["ದಯವಿಟ್ಟು ಬನ್ನಿ", "ಹೋಗಿ ಬನ್ನಿ", "ನನಗೆ ಬೇಡ", "ನಾನು ಬರುತ್ತೇನೆ"],
      answer: "ದಯವಿಟ್ಟು ಬನ್ನಿ",
      explanation: "ದಯವಿಟ್ಟು ಬನ್ನಿ (Dayavittu banni) means please come."
    },
    {
      question: "What does ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ mean?",
      options: ["I understood", "I did not understand", "I am happy", "I am hungry"],
      answer: "I did not understand",
      explanation: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ (Nanage arthavaagalilla) means I did not understand."
    }
  ],

  Advanced: [
    {
      question: "What does ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? mean?",
      options: ["Where are you going?", "Where did you come from?", "What are you doing?", "When will you return?"],
      answer: "Where are you going?",
      explanation: "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? asks someone about their destination."
    },
    {
      question: "What does ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು mean?",
      options: ["I can speak Kannada", "I want to learn Kannada", "I forgot Kannada", "I teach Kannada"],
      answer: "I want to learn Kannada",
      explanation: "ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು means I want or need to learn Kannada."
    },
    {
      question: "How do you say 'Could you please help me?'",
      options: ["ನನಗೆ ಸಹಾಯ ಮಾಡುತ್ತೀರಾ?", "ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತೇನೆ", "ನನಗೆ ಗೊತ್ತಿಲ್ಲ", "ನೀವು ಯಾರು?"],
      answer: "ನನಗೆ ಸಹಾಯ ಮಾಡುತ್ತೀರಾ?",
      explanation: "ನನಗೆ ಸಹಾಯ ಮಾಡುತ್ತೀರಾ? is a polite request for help."
    },
    {
      question: "What does ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ mean?",
      options: ["Please speak loudly", "Please speak slowly", "Please stop speaking", "Please speak in English"],
      answer: "Please speak slowly",
      explanation: "ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ asks someone to speak a little slowly."
    },
    {
      question: "What does ನನಗೆ ಕನ್ನಡ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ mean?",
      options: ["I don't know Kannada", "I speak Kannada fluently", "I know a little Kannada", "I am learning English"],
      answer: "I know a little Kannada",
      explanation: "ನನಗೆ ಕನ್ನಡ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ means I know a little Kannada."
    },
    {
      question: "How do you say 'I will come tomorrow'?",
      options: ["ನಾನು ನಿನ್ನೆ ಬಂದೆ", "ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ", "ನಾನು ಈಗ ಹೋಗುತ್ತೇನೆ", "ನಾನು ಮನೆಗೆ ಬಂದೆ"],
      answer: "ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ",
      explanation: "ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ (Naanu naale baruttene) means I will come tomorrow."
    },
    {
      question: "What does ದಯವಿಟ್ಟು ನನಗೆ ವಿಳಾಸ ತಿಳಿಸಿ mean?",
      options: ["Please tell me the address", "Please show me the bill", "Please call my friend", "Please open the door"],
      answer: "Please tell me the address",
      explanation: "ವಿಳಾಸ (Vilaasa) means address."
    },
    {
      question: "What does ನೀವು ಹೇಳಿದ್ದು ನನಗೆ ಅರ್ಥವಾಯಿತು mean?",
      options: ["I did not hear you", "I understood what you said", "I want to ask something", "I cannot speak"],
      answer: "I understood what you said",
      explanation: "ಅರ್ಥವಾಯಿತು (Arthavaayitu) means understood."
    },
    {
      question: "How do you say 'I am looking for a hospital'?",
      options: ["ನಾನು ಆಸ್ಪತ್ರೆಯನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇನೆ", "ನಾನು ಮನೆಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ", "ನಾನು ಊಟ ಮಾಡುತ್ತಿದ್ದೇನೆ", "ನಾನು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ"],
      answer: "ನಾನು ಆಸ್ಪತ್ರೆಯನ್ನು ಹುಡುಕುತ್ತಿದ್ದೇನೆ",
      explanation: "ಆಸ್ಪತ್ರೆ (Aaspatre) means hospital, and ಹುಡುಕುತ್ತಿದ್ದೇನೆ means I am searching."
    },
    {
      question: "What does ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ ಸಂತೋಷವಾಯಿತು mean?",
      options: ["I am angry with you", "It was nice talking to you", "I will meet you tomorrow", "I don't know you"],
      answer: "It was nice talking to you",
      explanation: "ಸಂತೋಷವಾಯಿತು expresses that something was pleasant or made you happy."
    }
  ]
};

export default function Quiz() {
  const [level, setLevel] = useState("Beginner");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = quizData[level];
  const question = questions[current];

  function chooseAnswer(option) {
    if (selected) return;

    setSelected(option);

    if (option === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((previous) => previous + 1);
      setSelected("");
    }
  }

  function changeLevel(newLevel) {
    setLevel(newLevel);
    setCurrent(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-container">
        <span className="quiz-tag">PRACTICE AND IMPROVE</span>
        <h2>Test Your Kannada Skills</h2>
        <p className="quiz-description">
          Choose your level and challenge yourself with Kannada questions.
        </p>

        <div className="quiz-levels">
          {Object.keys(quizData).map((item) => (
            <button
              key={item}
              className={level === item ? "selected-level" : ""}
              onClick={() => changeLevel(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {finished ? (
          <div className="quiz-result">
            <div className="quiz-result-icon">
              {percentage >= 80 ? "🏆" : percentage >= 50 ? "👏" : "📚"}
            </div>
            <h3>Quiz Completed!</h3>
            <p className="quiz-score">{score}/{questions.length}</p>
            <p className="quiz-percentage">{percentage}% Score</p>
            <p>
              {percentage >= 80
                ? "Excellent! You have a strong understanding of this level."
                : percentage >= 50
                ? "Good effort! Keep practising to improve."
                : "Keep learning! Review the lessons and try again."}
            </p>
            <button className="quiz-next" onClick={restartQuiz}>
              Try Again
            </button>
            <button className="quiz-secondary" onClick={() => changeLevel("Beginner")}>
              Change Level
            </button>
          </div>
        ) : (
          <div className="quiz-card">
            <div className="quiz-top">
              <span>{level} Level</span>
              <span>Question {current + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>

            <div className="quiz-progress">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3>{question.question}</h3>

            <div className="quiz-options">
              {question.options.map((option) => {
                let className = "quiz-option";

                if (selected && option === question.answer) {
                  className += " correct";
                } else if (selected === option) {
                  className += " incorrect";
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => chooseAnswer(option)}
                    disabled={Boolean(selected)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="quiz-explanation">
                <strong>
                  {selected === question.answer ? "✓ Correct!" : "✗ Not quite!"}
                </strong>
                <p>{question.explanation}</p>
              </div>
            )}

            <button
              className="quiz-next"
              onClick={nextQuestion}
              disabled={!selected}
            >
              {current === questions.length - 1 ? "View My Result" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

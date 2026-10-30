import { useEffect, useMemo, useState } from "react";
import Quiz from "./Quiz";
import Vocabulary from "./Vocabulary";
import "./App.css";
import PracticeZone from "./PracticeZone";

// Each lesson contains practical Kannada, an English meaning, pronunciation,
// and a short example that learners can use in real conversations.
const lessons = [
  {
    id: "greetings", title: "Greetings & Polite Expressions", icon: "👋", level: "Beginner",
    description: "Start conversations politely and make a good first impression.",
    words: [
      ["ನಮಸ್ಕಾರ", "Hello / Greetings", "Namaskara", "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಾ?", "Hello, how are you?"],
      ["ಶುಭೋದಯ", "Good morning", "Shubhodaya", "ಶುಭೋದಯ!", "Good morning!"],
      ["ಶುಭ ಸಂಜೆ", "Good evening", "Shubha sanje", "ಶುಭ ಸಂಜೆ, ಸರ್.", "Good evening, sir."],
      ["ಧನ್ಯವಾದಗಳು", "Thank you", "Dhanyavadagalu", "ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು.", "Thank you for your help."],
      ["ದಯವಿಟ್ಟು", "Please", "Dayavittu", "ದಯವಿಟ್ಟು ಇಲ್ಲಿ ಬನ್ನಿ.", "Please come here."],
      ["ಕ್ಷಮಿಸಿ", "Sorry / Excuse me", "Kshamisi", "ಕ್ಷಮಿಸಿ, ನನಗೆ ತಡವಾಯಿತು.", "Sorry, I am late."],
      ["ಪರವಾಗಿಲ್ಲ", "It's okay / No problem", "Paravagilla", "ಪರವಾಗಿಲ್ಲ, ಚಿಂತಿಸಬೇಡಿ.", "It's okay, don't worry."],
      ["ಮತ್ತೆ ಸಿಗೋಣ", "See you again", "Matte sigona", "ನಾಳೆ ಮತ್ತೆ ಸಿಗೋಣ.", "See you again tomorrow."],
    ],
  },
  {
    id: "introductions", title: "Introducing Yourself", icon: "🙋", level: "Beginner",
    description: "Share your name, hometown, language and basic information.",
    words: [
      ["ನಿಮ್ಮ ಹೆಸರೇನು?", "What is your name?", "Nimma hesarenu?", "ನಿಮ್ಮ ಹೆಸರೇನು?", "What is your name?"],
      ["ನನ್ನ ಹೆಸರು ...", "My name is ...", "Nanna hesaru ...", "ನನ್ನ ಹೆಸರು ರವಿ.", "My name is Ravi."],
      ["ನಾನು ... ನಿಂದ ಬಂದಿದ್ದೇನೆ.", "I am from ...", "Naanu ... ninda bandiddene", "ನಾನು ಬೆಂಗಳೂರಿನಿಂದ ಬಂದಿದ್ದೇನೆ.", "I am from Bengaluru."],
      ["ನಾನು ವಿದ್ಯಾರ್ಥಿ.", "I am a student.", "Naanu vidyarthi", "ನಾನು ವಿದ್ಯಾರ್ಥಿ.", "I am a student."],
      ["ನಾನು ಕೆಲಸ ಮಾಡುತ್ತೇನೆ.", "I work.", "Naanu kelasa maaduttene", "ನಾನು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತೇನೆ.", "I work in Bengaluru."],
      ["ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು.", "I want to learn Kannada.", "Nanage Kannada kaliyabeku", "ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು.", "I want to learn Kannada."],
      ["ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಬರುತ್ತದೆ.", "I know a little Kannada.", "Nanage swalpa Kannada barutte", "ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಬರುತ್ತದೆ.", "I know a little Kannada."],
      ["ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು.", "Nice to meet you.", "Nimmannu bhetiyaagi santoshavaayitu", "ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು.", "Nice to meet you."],
    ],
  },
  {
    id: "daily", title: "Everyday Conversations", icon: "💬", level: "Beginner",
    description: "Use simple, useful phrases in daily conversations.",
    words: [
      ["ನೀವು ಹೇಗಿದ್ದೀರಾ?", "How are you?", "Neevu hegiddira?", "ನೀವು ಹೇಗಿದ್ದೀರಾ?", "How are you?"],
      ["ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ.", "I am fine.", "Naanu chennagiddene", "ಧನ್ಯವಾದಗಳು, ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ.", "Thank you, I am fine."],
      ["ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ?", "What are you doing?", "Enu maaduttiddiri?", "ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ?", "What are you doing?"],
      ["ನನಗೆ ಗೊತ್ತಿಲ್ಲ.", "I don't know.", "Nanage gottilla", "ಅದರ ಬಗ್ಗೆ ನನಗೆ ಗೊತ್ತಿಲ್ಲ.", "I don't know about that."],
      ["ನನಗೆ ಅರ್ಥವಾಯಿತು.", "I understood.", "Nanage arthavaayitu", "ಹೌದು, ನನಗೆ ಅರ್ಥವಾಯಿತು.", "Yes, I understood."],
      ["ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.", "I didn't understand.", "Nanage arthavaagalilla", "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.", "Sorry, I didn't understand."],
      ["ಸ್ವಲ್ಪ ಕಾಯಿರಿ.", "Please wait a moment.", "Swalpa kaayiri", "ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಕಾಯಿರಿ.", "Please wait a moment."],
      ["ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.", "Please speak slowly.", "Nidhaanavaagi maataadi", "ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.", "Please speak slowly."],
    ],
  },
  {
    id: "food", title: "Food, Drinks & Restaurants", icon: "🍲", level: "Beginner",
    description: "Order food, ask for water and talk about meals.",
    words: [
      ["ನೀರು", "Water", "Neeru", "ನನಗೆ ನೀರು ಬೇಕು.", "I need water."],
      ["ಊಟ", "Meal / Food", "Oota", "ಊಟ ಆಯಿತಾ?", "Have you eaten?"],
      ["ತಿಂಡಿ", "Snack / Breakfast", "Tindi", "ನಾನು ತಿಂಡಿ ತಿನ್ನುತ್ತೇನೆ.", "I will have a snack."],
      ["ಕಾಫಿ", "Coffee", "Kaapi", "ಒಂದು ಕಾಫಿ ಕೊಡಿ.", "Please give me one coffee."],
      ["ಚಹಾ", "Tea", "Chaha", "ನನಗೆ ಚಹಾ ಬೇಕು.", "I would like tea."],
      ["ತುಂಬಾ ಖಾರ", "Very spicy", "Tumba khaara", "ಇದು ತುಂಬಾ ಖಾರವಾಗಿದೆ.", "This is very spicy."],
      ["ಸಕ್ಕರೆ ಬೇಡ.", "No sugar, please.", "Sakkare beda", "ನನಗೆ ಸಕ್ಕರೆ ಬೇಡ.", "I don't want sugar."],
      ["ಬಿಲ್ ಕೊಡಿ.", "Please bring the bill.", "Bill kodi", "ದಯವಿಟ್ಟು ಬಿಲ್ ಕೊಡಿ.", "Please bring the bill."],
    ],
  },
  {
    id: "shopping", title: "Shopping & Money", icon: "🛍️", level: "Beginner",
    description: "Ask prices, choose items and pay at local shops.",
    words: [
      ["ಇದು ಎಷ್ಟು?", "How much is this?", "Idu eshtu?", "ಈ ಹಣ್ಣು ಎಷ್ಟು?", "How much is this fruit?"],
      ["ಇದು ತುಂಬಾ ದುಬಾರಿ.", "This is very expensive.", "Idu tumba dubaari", "ಇದು ತುಂಬಾ ದುಬಾರಿ.", "This is very expensive."],
      ["ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", "Please reduce the price.", "Swalpa kadime maadi", "ಬೆಲೆಯನ್ನು ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", "Please reduce the price a little."],
      ["ನನಗೆ ಇದು ಬೇಕು.", "I want this.", "Nanage idu beku", "ನನಗೆ ಈ ಪುಸ್ತಕ ಬೇಕು.", "I want this book."],
      ["ಬೇಡ", "I don't want it.", "Beda", "ಬೇಡ, ಧನ್ಯವಾದಗಳು.", "No, thank you."],
      ["ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?", "Is another colour available?", "Bere banna ideya?", "ಕೆಂಪು ಬಣ್ಣ ಇದೆಯಾ?", "Is red colour available?"],
      ["ಚೀಲ ಕೊಡಿ.", "Please give me a bag.", "Cheela kodi", "ದಯವಿಟ್ಟು ಒಂದು ಚೀಲ ಕೊಡಿ.", "Please give me a bag."],
      ["ನಗದು ಅಥವಾ UPI?", "Cash or UPI?", "Nagadu athava UPI?", "ನಾನು UPI ಮೂಲಕ ಪಾವತಿಸುತ್ತೇನೆ.", "I will pay through UPI."],
    ],
  },
  {
    id: "transport", title: "Transport & Travel", icon: "🚌", level: "Beginner",
    description: "Communicate with bus conductors, drivers and travellers.",
    words: [
      ["ಬಸ್ ನಿಲ್ದಾಣ", "Bus station", "Bus nildana", "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?", "Where is the bus station?"],
      ["ರೈಲು ನಿಲ್ದಾಣ", "Railway station", "Railu nildana", "ರೈಲು ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗಬೇಕು.", "I need to go to the railway station."],
      ["ಟಿಕೆಟ್ ಕೊಡಿ.", "Please give me a ticket.", "Ticket kodi", "ಮೈಸೂರಿಗೆ ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ.", "Please give me one ticket to Mysuru."],
      ["ಮುಂದಿನ ನಿಲ್ದಾಣ ಯಾವುದು?", "What is the next stop?", "Mundina nildana yavudu?", "ಮುಂದಿನ ನಿಲ್ದಾಣ ಯಾವುದು?", "What is the next stop?"],
      ["ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Stop here, please.", "Illi nillisiri", "ದಯವಿಟ್ಟು ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Please stop here."],
      ["ಎಷ್ಟು ಸಮಯ ಬೇಕು?", "How much time will it take?", "Eshtu samaya beku?", "ಅಲ್ಲಿಗೆ ಹೋಗಲು ಎಷ್ಟು ಸಮಯ ಬೇಕು?", "How long will it take to get there?"],
      ["ನೇರವಾಗಿ ಹೋಗಿ.", "Go straight.", "Neravaagi hogi", "ನೇರವಾಗಿ ಹೋಗಿ, ನಂತರ ಎಡಕ್ಕೆ ತಿರುಗಿ.", "Go straight, then turn left."],
      ["ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.", "Please help me.", "Dayavittu sahaaya maadi", "ನನಗೆ ದಾರಿ ಹುಡುಕಲು ಸಹಾಯ ಮಾಡಿ.", "Please help me find the way."],
    ],
  },
  {
    id: "directions", title: "Places & Directions", icon: "🧭", level: "Beginner",
    description: "Find places and understand simple directions.",
    words: [
      ["ಎಲ್ಲಿದೆ?", "Where is it?", "Ellide?", "ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?", "Where is the restroom?"],
      ["ಎಡಕ್ಕೆ", "To the left", "Edakke", "ಮುಂದೆ ಎಡಕ್ಕೆ ತಿರುಗಿ.", "Turn left ahead."],
      ["ಬಲಕ್ಕೆ", "To the right", "Balakke", "ಬಲಕ್ಕೆ ತಿರುಗಿ.", "Turn right."],
      ["ಹತ್ತಿರ", "Near", "Hattira", "ಇಲ್ಲಿ ಹತ್ತಿರ ಬ್ಯಾಂಕ್ ಇದೆಯಾ?", "Is there a bank nearby?"],
      ["ದೂರ", "Far", "Doora", "ಅದು ತುಂಬಾ ದೂರ ಇದೆಯಾ?", "Is it very far?"],
      ["ಆಸ್ಪತ್ರೆ", "Hospital", "Aaspatre", "ಹತ್ತಿರದಲ್ಲಿ ಆಸ್ಪತ್ರೆ ಇದೆಯಾ?", "Is there a hospital nearby?"],
      ["ಶೌಚಾಲಯ", "Restroom / Toilet", "Shauchalaya", "ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?", "Where is the restroom?"],
      ["ನಕ್ಷೆ ತೋರಿಸಿ.", "Please show me the map.", "Nakshe torisi", "ದಯವಿಟ್ಟು ನಕ್ಷೆ ತೋರಿಸಿ.", "Please show me the map."],
    ],
  },
  {
    id: "emergency", title: "Health, Help & Emergencies", icon: "🆘", level: "Beginner",
    description: "Important phrases for asking for help and explaining problems.",
    words: [
      ["ಸಹಾಯ ಮಾಡಿ!", "Help me!", "Sahaaya maadi!", "ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ!", "Please help me!"],
      ["ನನಗೆ ಆರೋಗ್ಯ ಸರಿಯಿಲ್ಲ.", "I am not feeling well.", "Nanage aarogya sariyilla", "ನನಗೆ ಆರೋಗ್ಯ ಸರಿಯಿಲ್ಲ.", "I am not feeling well."],
      ["ನನಗೆ ವೈದ್ಯರು ಬೇಕು.", "I need a doctor.", "Nanage vaidyaru beku", "ದಯವಿಟ್ಟು ನನಗೆ ವೈದ್ಯರನ್ನು ಕರೆಸಿ.", "Please call a doctor for me."],
      ["ಆಸ್ಪತ್ರೆಗೆ ಕರೆದುಕೊಂಡು ಹೋಗಿ.", "Please take me to the hospital.", "Aaspatrige karedukondu hogi", "ನನ್ನನ್ನು ಆಸ್ಪತ್ರೆಗೆ ಕರೆದುಕೊಂಡು ಹೋಗಿ.", "Please take me to the hospital."],
      ["ಪೊಲೀಸರಿಗೆ ಕರೆ ಮಾಡಿ.", "Call the police.", "Police-ge kare maadi", "ದಯವಿಟ್ಟು ಪೊಲೀಸರಿಗೆ ಕರೆ ಮಾಡಿ.", "Please call the police."],
      ["ನನಗೆ ಸಹಾಯ ಬೇಕು.", "I need help.", "Nanage sahaaya beku", "ನನಗೆ ತಕ್ಷಣ ಸಹಾಯ ಬೇಕು.", "I need help immediately."],
      ["ನನಗೆ ಅಲರ್ಜಿ ಇದೆ.", "I have an allergy.", "Nanage allergy ide", "ನನಗೆ ಔಷಧಿಗೆ ಅಲರ್ಜಿ ಇದೆ.", "I have a medicine allergy."],
      ["ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.", "Please speak slowly.", "Nidhaanavaagi maataadi", "ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.", "Please speak slowly."],
    ],
  },
  {
    id: "family", title: "Family & Relationships", icon: "👨‍👩‍👧", level: "Beginner",
    description: "Learn the words used for family members and friends.",
    words: [
      ["ಅಮ್ಮ", "Mother", "Amma", "ನನ್ನ ಅಮ್ಮ ಮನೆಯಲ್ಲಿದ್ದಾರೆ.", "My mother is at home."],
      ["ಅಪ್ಪ", "Father", "Appa", "ನನ್ನ ಅಪ್ಪ ಕೆಲಸಕ್ಕೆ ಹೋಗಿದ್ದಾರೆ.", "My father has gone to work."],
      ["ಅಣ್ಣ", "Elder brother", "Anna", "ನನ್ನ ಅಣ್ಣ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇದ್ದಾನೆ.", "My elder brother is in Bengaluru."],
      ["ತಮ್ಮ", "Younger brother", "Tamma", "ನನ್ನ ತಮ್ಮ ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ.", "My younger brother goes to school."],
      ["ಅಕ್ಕ", "Elder sister", "Akka", "ನನ್ನ ಅಕ್ಕ ಚೆನ್ನಾಗಿ ಹಾಡುತ್ತಾಳೆ.", "My elder sister sings well."],
      ["ತಂಗಿ", "Younger sister", "Tangi", "ನನ್ನ ತಂಗಿ ಓದುತ್ತಿದ್ದಾಳೆ.", "My younger sister is studying."],
      ["ಸ್ನೇಹಿತ", "Friend (male)", "Snehita", "ಅವನು ನನ್ನ ಸ್ನೇಹಿತ.", "He is my friend."],
      ["ಸ್ನೇಹಿತೆ", "Friend (female)", "Snehite", "ಅವಳು ನನ್ನ ಸ್ನೇಹಿತೆ.", "She is my friend."],
    ],
  },
  {
    id: "numbers", title: "Numbers & Counting", icon: "🔢", level: "Beginner",
    description: "Count, ask quantities and understand basic numbers.",
    words: [
      ["ಒಂದು", "One", "Ondu", "ನನಗೆ ಒಂದು ಟಿಕೆಟ್ ಬೇಕು.", "I need one ticket."],
      ["ಎರಡು", "Two", "Eradu", "ಎರಡು ಕಾಫಿ ಕೊಡಿ.", "Please give me two coffees."],
      ["ಮೂರು", "Three", "Mooru", "ನಾವು ಮೂರು ಜನ ಇದ್ದೇವೆ.", "There are three of us."],
      ["ನಾಲ್ಕು", "Four", "Naalku", "ನಾಲ್ಕು ಪುಸ್ತಕಗಳಿವೆ.", "There are four books."],
      ["ಐದು", "Five", "Aidu", "ಐದು ನಿಮಿಷ ಕಾಯಿರಿ.", "Wait for five minutes."],
      ["ಹತ್ತು", "Ten", "Hattu", "ಹತ್ತು ರೂಪಾಯಿ ಕೊಡಿ.", "Please give ten rupees."],
      ["ಎಷ್ಟು?", "How many / How much?", "Eshtu?", "ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?", "How many rupees is this?"],
      ["ಸ್ವಲ್ಪ", "A little / Some", "Swalpa", "ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ.", "Please give me some water."],
    ],
  },
  {
    id: "time", title: "Time, Days & Routine", icon: "🕒", level: "Beginner",
    description: "Talk about today, tomorrow, time and daily routines.",
    words: [
      ["ಇಂದು", "Today", "Indu", "ನಾನು ಇಂದು ಬರುತ್ತೇನೆ.", "I will come today."],
      ["ನಾಳೆ", "Tomorrow", "Naale", "ನಾಳೆ ಭೇಟಿಯಾಗೋಣ.", "Let's meet tomorrow."],
      ["ನಿನ್ನೆ", "Yesterday", "Ninne", "ನಾನು ನಿನ್ನೆ ಬಂದೆ.", "I came yesterday."],
      ["ಈಗ", "Now", "Eega", "ನಾನು ಈಗ ಬರುತ್ತೇನೆ.", "I am coming now."],
      ["ಬೆಳಗ್ಗೆ", "Morning", "Belagge", "ನಾನು ಬೆಳಗ್ಗೆ ಓದುತ್ತೇನೆ.", "I study in the morning."],
      ["ಮಧ್ಯಾಹ್ನ", "Afternoon", "Madhyahna", "ಮಧ್ಯಾಹ್ನ ಊಟ ಮಾಡೋಣ.", "Let's have lunch in the afternoon."],
      ["ರಾತ್ರಿ", "Night", "Raatri", "ಶುಭ ರಾತ್ರಿ.", "Good night."],
      ["ಸಮಯ ಎಷ್ಟು?", "What time is it?", "Samaya eshtu?", "ಈಗ ಸಮಯ ಎಷ್ಟು?", "What time is it now?"],
    ],
  },
  {
    id: "work", title: "Work, Study & Communication", icon: "💼", level: "Beginner",
    description: "Useful expressions for classrooms, offices and meetings.",
    words: [
      ["ನಾನು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ.", "I am working.", "Naanu kelasa maaduttiddene", "ನಾನು ಈಗ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ.", "I am working now."],
      ["ನನಗೆ ಒಂದು ಪ್ರಶ್ನೆ ಇದೆ.", "I have a question.", "Nanage ondu prashne ide", "ಸರ್, ನನಗೆ ಒಂದು ಪ್ರಶ್ನೆ ಇದೆ.", "Sir, I have a question."],
      ["ದಯವಿಟ್ಟು ವಿವರಿಸಿ.", "Please explain.", "Dayavittu vivarisi", "ಇದನ್ನು ದಯವಿಟ್ಟು ವಿವರಿಸಿ.", "Please explain this."],
      ["ನಾನು ಕಲಿಯುತ್ತಿದ್ದೇನೆ.", "I am learning.", "Naanu kaliyuttiddene", "ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.", "I am learning Kannada."],
      ["ಸಭೆ ಯಾವಾಗ?", "When is the meeting?", "Sabhe yaavaga?", "ನಮ್ಮ ಸಭೆ ಯಾವಾಗ?", "When is our meeting?"],
      ["ನನಗೆ ಇಮೇಲ್ ಕಳುಹಿಸಿ.", "Please send me an email.", "Nanage email kaluhisi", "ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಇಮೇಲ್ ಮಾಡಿ.", "Please email me the details."],
      ["ನಾನು ಒಪ್ಪುತ್ತೇನೆ.", "I agree.", "Naanu opputtene", "ನಿಮ್ಮ ಮಾತಿಗೆ ನಾನು ಒಪ್ಪುತ್ತೇನೆ.", "I agree with you."],
      ["ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.", "Please say that again.", "Mattomme heli", "ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.", "Please say that again."],
    ],
  },
];

const dailyPhrases = [
  ["ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ, ದಯವಿಟ್ಟು.", "Please speak slowly.", "Nidhaanavaagi maataadi, dayavittu."],
  ["ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು.", "I want to learn Kannada.", "Nanage Kannada kaliyabeku."],
  ["ಇದು ಎಷ್ಟು?", "How much is this?", "Idu eshtu?"],
  ["ನೀವು ಹೇಗಿದ್ದೀರಾ?", "How are you?", "Neevu hegiddira?"],
  ["ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.", "Please help me.", "Dayavittu sahaaya maadi."],
  ["ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.", "I didn't understand.", "Nanage arthavaagalilla."],
  ["ಮತ್ತೆ ಸಿಗೋಣ.", "See you again.", "Matte sigona."],
];

function speakKannada(text) {
  if (!("speechSynthesis" in window)) {
    window.alert("Speech playback is not supported by this browser. You can still use the pronunciation guide.");
    return;
  }
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const kannadaVoice = voices.find((voice) => voice.lang.toLowerCase() === "kn-in") ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("kn"));
  if (!kannadaVoice) {
    window.alert("A Kannada speech voice is not installed on this device. Please use the pronunciation guide shown on the screen.");
    return;
  }
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = kannadaVoice;
  utterance.lang = kannadaVoice.lang;
  utterance.rate = 0.82;
  synth.speak(utterance);
}

function ProgressDashboard({ progress }) {
  const completed = progress.completedLessons.length;
  const learnedCount = Object.values(progress.words).reduce((sum, list) => sum + list.length, 0);
  const totalWords = lessons.reduce((sum, lesson) => sum + lesson.words.length, 0);
  const percent = Math.round((completed / lessons.length) * 100);
  return (
    <section className="dashboard-section" id="progress">
      <div className="section-heading centered-heading">
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h2>Your Learning Dashboard</h2>
        <p>Keep track of the lessons you complete and the words you learn.</p>
      </div>
      <div className="dashboard-grid">
        <article className="dashboard-card"><span>📚</span><strong>{completed}/{lessons.length}</strong><p>Lessons completed</p></article>
        <article className="dashboard-card"><span>📝</span><strong>{learnedCount}/{totalWords}</strong><p>Words and phrases learned</p></article>
        <article className="dashboard-card"><span>🏆</span><strong>{percent}%</strong><p>Lesson completion</p></article>
      </div>
      <div className="dashboard-progress">
        <div className="progress-label"><strong>Overall lesson progress</strong><strong>{percent}%</strong></div>
        <div className="dashboard-track"><div className="dashboard-fill" style={{ width: `${percent}%` }} /></div>
      </div>
      <p className="dashboard-note">Your progress is saved in this browser on this device.</p>
    </section>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [current, setCurrent] = useState(0);
  const [dailyIndex, setDailyIndex] = useState(() => new Date().getDate() % dailyPhrases.length);
  const [progress, setProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kannadaMateProgress"));
      return saved && typeof saved === "object"
        ? { words: saved.words || {}, completedLessons: saved.completedLessons || [] }
        : { words: {}, completedLessons: [] };
    } catch {
      return { words: {}, completedLessons: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem("kannadaMateProgress", JSON.stringify(progress));
  }, [progress]);

  const filteredLessons = useMemo(() => lessons.filter((lesson) => {
    const searchable = `${lesson.title} ${lesson.description} ${lesson.words.flat().join(" ")}`;
    return searchable.toLowerCase().includes(search.toLowerCase());
  }), [search]);

  const learned = selectedLesson ? progress.words[selectedLesson.id] || [] : [];
  const dailyPhrase = dailyPhrases[dailyIndex];

  function openLesson(lesson) {
    setSelectedLesson(lesson);
    setCurrent(0);
    window.speechSynthesis?.cancel();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeLesson() {
    setSelectedLesson(null);
    window.speechSynthesis?.cancel();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLearned() {
    const id = selectedLesson.id;
    setProgress((previous) => {
      const existing = previous.words[id] || [];
      const updated = existing.includes(current)
        ? existing.filter((index) => index !== current)
        : [...existing, current];
      return { ...previous, words: { ...previous.words, [id]: updated } };
    });
  }

  function nextWord() {
    if (current === selectedLesson.words.length - 1) {
      setProgress((previous) => ({
        ...previous,
        completedLessons: previous.completedLessons.includes(selectedLesson.id)
          ? previous.completedLessons
          : [...previous.completedLessons, selectedLesson.id],
      }));
      window.alert("Congratulations! You completed this lesson.");
      closeLesson();
    } else {
      setCurrent((value) => value + 1);
    }
  }

  if (selectedLesson) {
    const word = selectedLesson.words[current];
    const isLast = current === selectedLesson.words.length - 1;
    return (
      <div className="app">
        <header className="navbar lesson-navbar">
          <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); closeLesson(); }}><span className="brand-icon">ಕ</span> Kannada<span className="brand-accent">Mate</span></a>
          <button className="nav-button" onClick={closeLesson}>← Back to lessons</button>
        </header>
        <main className="lesson-page">
          <div className="lesson-container">
            <span className="eyebrow">YOUR KANNADA LEARNING JOURNEY</span>
            <h1>{selectedLesson.title}</h1>
            <p className="lesson-intro">Read the phrase, learn its meaning, listen to the pronunciation and mark it as learned.</p>
            <div className="lesson-progress">
              <div className="progress-label"><span>Item {current + 1} of {selectedLesson.words.length}</span><span>{learned.length} learned</span></div>
              <div className="dashboard-track"><div className="dashboard-fill" style={{ width: `${((current + 1) / selectedLesson.words.length) * 100}%` }} /></div>
            </div>
            <article className="word-card">
              <span className="eyebrow">SAY IT IN KANNADA</span>
              <h2 lang="kn">{word[0]}</h2>
              <h3>{word[1]}</h3>
              <p className="word-pronunciation">Pronunciation: <strong>{word[2]}</strong></p>
              <div className="example-box">
                <span className="example-label">EXAMPLE IN A CONVERSATION</span>
                <strong lang="kn">{word[3]}</strong>
                <span>{word[4]}</span>
              </div>
              <button className="button button-red" onClick={() => speakKannada(word[0])}>🔊 Listen to pronunciation</button>
              <button className={`button ${learned.includes(current) ? "button-learned" : "button-outline"}`} onClick={toggleLearned}>{learned.includes(current) ? "✓ Learned" : "Mark as learned"}</button>
            </article>
            <div className="lesson-navigation">
              <button className="button button-outline" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>← Previous</button>
              <button className="button button-red" onClick={nextWord}>{isLast ? "Complete lesson ✓" : "Next item →"}</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app" id="home">
      <header className="navbar">
        <a className="brand" href="#home"><span className="brand-icon">ಕ</span> Kannada<span className="brand-accent">Mate</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#lessons">Lessons</a>
          <a href="#progress">My Progress</a>
          <a href="#practice">Practice</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-button" href="#lessons">Start Learning →</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">🌼 KANNADA FOR EVERYONE</span>
            <h1>Discover Kannada.<br /><span>Connect with Karnataka.</span></h1>
            <p>Learn practical Kannada from the very beginning. Explore useful words, everyday conversations and real-life phrases with clear English meanings and easy pronunciation guides.</p>
            <div className="hero-actions"><a className="button button-red" href="#lessons">Explore Lessons →</a><a className="button button-outline" href="#daily-phrase">Learn Today's Phrase</a></div>
            <div className="hero-stats"><div><strong>12 Topics</strong><span>Everyday situations</span></div><div><strong>96 Items</strong><span>Words and phrases</span></div><div><strong>Beginner Friendly</strong><span>Learn at your pace</span></div></div>
          </div>
          <div className="hero-art" aria-label="Kannada learning illustration"><div className="art-circle"><span className="floating-note note-one">ನಮಸ್ಕಾರ!</span><div className="kannada-symbol">ಕನ್ನಡ</div><span className="floating-note note-two">Let's learn!</span><span className="art-star star-one">✦</span><span className="art-star star-two">✳</span></div></div>
        </section>

        <section className="daily-section" id="daily-phrase">
          <div className="daily-card">
            <div><span className="eyebrow">PHRASE OF THE DAY</span><h2 lang="kn">{dailyPhrase[0]}</h2><p>{dailyPhrase[1]}</p><span className="pronunciation">Pronunciation: {dailyPhrase[2]}</span></div>
            <div className="daily-actions"><button className="button button-yellow" onClick={() => speakKannada(dailyPhrase[0])}>🔊 Listen</button><button className="button button-outline" onClick={() => setDailyIndex((value) => (value + 1) % dailyPhrases.length)}>Next phrase →</button></div>
          </div>
        </section>

        <section className="lessons-section" id="lessons">
          <div className="section-heading"><div><span className="eyebrow">LEARN STEP BY STEP</span><h2>Explore Kannada Lessons</h2><p>Choose a topic and start learning phrases you can use in real life.</p></div><span className="lesson-count">{filteredLessons.length} of {lessons.length} topics</span></div>
          <input className="search-box" type="search" placeholder="Search in English or Kannada..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search lessons" />
          <div className="lesson-grid">
            {filteredLessons.map((lesson) => (
              <article className="lesson-card" key={lesson.id}>
                <div className="lesson-card-top"><span className="lesson-icon">{lesson.icon}</span><span className="level-tag">{lesson.level}</span></div>
                <h3>{lesson.title}</h3><p>{lesson.description}</p>
                <div className="phrase"><strong lang="kn">{lesson.words[0][0]}</strong><span>{lesson.words[0][1]}</span><small>Pronunciation: {lesson.words[0][2]}</small></div>
                <span className="word-total">{lesson.words.length} words and phrases</span>
                <button className="button button-outline full-button" onClick={() => speakKannada(lesson.words[0][0])}>🔊 Listen to sample</button>
                <button className="button button-red full-button" onClick={() => openLesson(lesson)}>Start Lesson →</button>
              </article>
            ))}
          </div>
          {filteredLessons.length === 0 && <p className="empty-message">No lessons found. Try another English or Kannada keyword.</p>}
        </section>

        <ProgressDashboard progress={progress} />

{/* QUIZ SECTION */}
<section className="practice-section" id="quiz">
  <div className="section-heading centered-heading">
    <span className="eyebrow">PRACTICE MAKES PROGRESS</span>
    <h2>Test What You Have Learned</h2>
    <p>Answer simple questions and strengthen your Kannada vocabulary.</p>
  </div>

  <Quiz />
</section>

{/* VOCABULARY SECTION */}
<Vocabulary />

{/* INTERACTIVE PRACTICE ZONE */}
<PracticeZone />

        <section className="about-section" id="about"><span className="eyebrow">LEARN AT YOUR OWN PACE</span><h2>A Little Kannada Goes a Long Way.</h2><p>From saying hello to asking for directions, build your confidence through useful words and everyday conversations. KannadaMate helps you take one practical step at a time.</p><a className="button button-yellow" href="#lessons">Choose Your First Lesson →</a></section>
      </main>
      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-icon">ಕ</span> Kannada<span className="brand-accent">Mate</span></a>
        <p className="footer-message">Made with ♥ for everyone learning Kannada.</p>
        <div className="footer-taglines" aria-label="Kannada cultural taglines"><p>ಜೈ ಭುವನೇಶ್ವರಿ!</p><p>ಕನ್ನಡವೇ ಸತ್ಯ, ಕನ್ನಡವೇ ನಿತ್ಯ!</p></div>
      </footer>
    </div>
  );
}

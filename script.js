"use strict";

const questions = [
  {
    answer: "Buongiorno",
    it: "“Buongiorno” è un saluto adatto a una situazione formale. “Ciao” si usa soprattutto in situazioni informali.",
    zh: "“Buongiorno”适合正式场合；“Ciao”主要用于非正式场合。"
  },
  {
    answer: "Avrei",
    it: "“Avrei bisogno di” è più gentile e adatto a una situazione formale. “Ho bisogno di” è corretto, ma più diretto.<br><br>La forma “avrei bisogno di” usa il condizionale di cortesia. Lo studierai più avanti, quindi non preoccuparti se non lo conosci ancora.",
    zh: "“Avrei bisogno di”更礼貌，更适合正式场合。“Ho bisogno di”在语法上没有错，但语气更直接。<br><br>这里的“avrei bisogno di”使用了礼貌条件式 condizionale di cortesia。这个语法以后会学到，现在还不认识也不用担心。"
  },
  {
    answer: "dice",
    it: "Con il Lei di cortesia si usa il verbo alla terza persona singolare: “Lei dice”.",
    zh: "使用尊称 Lei 时，动词要用第三人称单数形式，所以说“Lei dice”。"
  },
  {
    answer: "suo",
    it: "Con il Lei di cortesia si usa il possessivo di terza persona: “il suo nome”.",
    zh: "使用尊称 Lei 时，物主形容词要用第三人称形式，所以说“il suo nome”。"
  },
  {
    answer: "è",
    it: "Con il Lei di cortesia si usa la terza persona singolare: “Quando è nato?”",
    zh: "使用尊称 Lei 时，动词要用第三人称单数，因此要说“Quando è nato?”。"
  },
  {
    answer: "dà",
    it: "Con il Lei di cortesia si dice: “Mi dà un documento?”",
    zh: "使用尊称 Lei 时，要说“Mi dà un documento?”，而不是“Mi dai…?”。"
  },
  {
    answer: "a Lei",
    it: "“Ecco a Lei” si usa in una situazione formale quando si porge qualcosa a una persona. “Ecco a te” si usa con una persona a cui diamo del tu.",
    zh: "把东西递给对方时，正式场合说“Ecco a Lei”；非正式关系中说“Ecco a te”。"
  },
  {
    answer: "Senta",
    it: "“Senta” è la forma dell’imperativo di cortesia. “Senti” si usa con tu.",
    zh: "“Senta”是尊称命令式，用于 Lei；“Senti”用于 tu。"
  },
  {
    answer: "La ringrazio",
    it: "“La ringrazio” è la forma formale. “ti ringrazio” si usa con una persona a cui diamo del tu.",
    zh: "“La ringrazio”是正式表达；“ti ringrazio”用于使用 tu 的非正式关系。"
  },
  {
    answer: "Arrivederla",
    it: "“Arrivederla” è una formula di saluto formale. “Ciao” è informale.",
    zh: "“Arrivederla”是正式的告别语；“Ciao”是非正式表达。"
  }
];

const form = document.querySelector("#quiz-form");
const checkButton = document.querySelector("#check-button");
const retryButton = document.querySelector("#retry-button");
const results = document.querySelector("#results");

function getSelectedAnswer(questionNumber) {
  const selected = form.querySelector(`input[name="q${questionNumber}"]:checked`);
  return selected ? selected.value : null;
}

function feedbackMarkup(question, selected) {
  let state = "unanswered";
  let status = "✗ Non hai risposto";
  let answerDetails = `<p class="answer-detail"><strong>Risposta corretta:</strong> ${question.answer}</p>`;

  if (selected === question.answer) {
    state = "correct";
    status = "✓ Corretto";
    answerDetails = "";
  } else if (selected !== null) {
    state = "wrong";
    status = "✗ Risposta errata";
    answerDetails =
      `<p class="answer-detail"><strong>La tua risposta:</strong> ${selected}</p>` +
      `<p class="answer-detail"><strong>Risposta corretta:</strong> ${question.answer}</p>`;
  }

  return {
    state,
    html:
      `<div class="feedback-card ${state}">` +
      `<p class="feedback-status">${status}</p>` +
      answerDetails +
      `<div class="explanation">` +
      `<p lang="it">${question.it}</p>` +
      `<p class="explanation-cn" lang="zh-CN">${question.zh}</p>` +
      `</div>` +
      `</div>`
  };
}

function gradeQuiz() {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((question, index) => {
    const number = index + 1;
    const selected = getSelectedAnswer(number);
    const feedback = feedbackMarkup(question, selected);
    const slot = document.querySelector(`#feedback-${number}`);
    const turn = slot.closest(".turn");

    slot.innerHTML = feedback.html;

    if (feedback.state === "correct") {
      correct += 1;
      turn.classList.add("is-correct");
      turn.classList.remove("is-wrong");
    } else {
      turn.classList.add("is-wrong");
      turn.classList.remove("is-correct");
      if (feedback.state === "wrong") {
        wrong += 1;
      } else {
        unanswered += 1;
      }
    }
  });

  document.querySelector("#score").textContent = `Punteggio: ${correct} / 10`;
  document.querySelector("#correct-count").textContent = correct;
  document.querySelector("#wrong-count").textContent = wrong;
  document.querySelector("#unanswered-count").textContent = unanswered;
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetQuiz() {
  form.reset();
  document.querySelectorAll(".feedback-slot").forEach((slot) => {
    slot.replaceChildren();
  });
  document.querySelectorAll(".turn").forEach((turn) => {
    turn.classList.remove("is-correct", "is-wrong");
  });
  results.hidden = true;
  window.scrollTo({ top: 0, left: 0 });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

checkButton.addEventListener("click", gradeQuiz);
retryButton.addEventListener("click", resetQuiz);

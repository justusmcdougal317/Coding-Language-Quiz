document.addEventListener("DOMContentLoaded", function () {
  const loadQuizButton = document.getElementById("load-quiz");
  const quizContainer = document.getElementById("quiz-container");
  const quizResultsContainer = document.getElementById("quiz-results");
  const totalScoreElement = document.getElementById("total-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit-results");
  let score = 0;
  let quizLoaded = false;
  let currentQuestion = 0;
  let countdown;
  let timeRemaining = 300; 

  function startCountdown() {
    countdown = setInterval(function () {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(countdown);
        alert("Time's up! Your quiz is finished.");
        
      }
      updateTimerDisplay();
    }, 1000); 
  }

  

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}





  updateTimerDisplay(); 
  loadQuizButton.addEventListener("click", function () {
    if (quizLoaded) {
      if (currentQuestion < 10) {
        quizContainer.removeChild(quizContainer.lastChild);
        displayQuestion(questions, currentQuestion);
        currentQuestion++;
      } else {
        loadQuizButton.textContent = "Finish Quiz";
      }
    } else {
      fetch("https://quizapi.io/api/v1/questions?apiKey=VpYpm0pkFSwY5XI1Abv4aaUWBAGRP5iq9iThDo7q&limit=10")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            displayQuestion(data, currentQuestion);
            quizResultsContainer.style.display = "block";
            quizLoaded = true;
            startCountdown(); 
          } else {
            quizContainer.innerHTML = "<p>No questions available.</p>";
          }
        });
    }
  });

  function displayQuestion(questions, index) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    const question = questions[index];

    if (Array.isArray(question.answers)) {
      questionDiv.innerHTML = `
        <h2>Question ${index + 1}:</h2>
        <p>${question.question}</p>
        ${question.answers.map((answer, answerIndex) => `
          <input type="radio" name="q${index + 1}" value="${answer}" id="q${index + 1}-${answerIndex}">
          <label for="q${index + 1}-${answerIndex}">${answer}</label><br>
        `).join('')}
      `;
    } else {
      questionDiv.innerHTML = `
        <h2>Question ${index + 1}:</h2>
        <p>${question.question}</p>
        <p>Answers not available</p>
      `;
    }

    if (index < questions.length - 1) {
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next Question";
      nextButton.addEventListener("click", function () {
        quizContainer.removeChild(quizContainer.lastChild);
        displayQuestion(questions, index + 1);
        currentQuestion++;
      });
      questionDiv.appendChild(nextButton);
    } else {
      const submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.addEventListener("click", function () {
        const initials = initialsInput.value;
        totalScoreElement.textContent = score;
      });
      questionDiv.appendChild(submitButton);
    }

    quizContainer.appendChild(questionDiv);
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const loadQuizButton = document.getElementById("load-quiz");
    const quizContainer = document.getElementById("quiz-container");
    const quizResultsContainer = document.getElementById("quiz-results");
    const totalScoreElement = document.getElementById("total-score");
    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit-results");
    let score = 0;
    let quizLoaded = false; // Track if the quiz is loaded
    let currentQuestion = 0; // Track the current question
  
    loadQuizButton.addEventListener("click", function () {
      // Check if the quiz is already loaded
      if (quizLoaded) {
        if (currentQuestion < 10) {
          // Clear the quiz container
          quizContainer.removeChild(quizContainer.lastChild);
          // Display the next question
          displayQuestion(questions, currentQuestion);
          currentQuestion++;
        } else {
          // Quiz finished, change the button text
          loadQuizButton.textContent = "Finish Quiz";
        }
      } else {
        // Make an HTTP request to the Quiz API
        fetch("https://quizapi.io/api/v1/questions?apiKey=VpYpm0pkFSwY5XI1Abv4aaUWBAGRP5iq9iThDo7q&limit=10")
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              // Display the first question
              displayQuestion(data, currentQuestion);
              quizResultsContainer.style.display = "block"; // Show the results container
              quizLoaded = true; // Mark the quiz as loaded
            } else {
              quizContainer.innerHTML = "<p>No questions available.</p>";
            }
            console.log(data);
          });
      }
    });
  
    function displayQuestion(questions, index) {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      const question = questions[index];
  
      // Check if answers are available
      if (Array.isArray(question.answers)) {
        // Create radio buttons for each answer
        questionDiv.innerHTML = `
          <h2>Question ${index + 1}:</h2>
          <p>${question.question}</p>
          ${question.answers.map((answer, answerIndex) => `
            <input type="radio" name="q${index + 1}" value="${answer}" id="q${index + 1}-${answerIndex}">
            <label for="q${index + 1}-${answerIndex}">${answer}</label><br>
          `).join('')}
        `;
      } else {
        // Handle case when answers are not available
        questionDiv.innerHTML = `
          <h2>Question ${index + 1}:</h2>
          <p>${question.question}</p>
          <p>Answers not available</p>
        `;
      }
  
      // Add navigation buttons to move between questions
      if (index < questions.length - 1) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next Question";
        nextButton.addEventListener("click", function () {
          quizContainer.removeChild(quizContainer.lastChild);
          // Display the next question
          displayQuestion(questions, index + 1);
          currentQuestion++;
        });
        questionDiv.appendChild(nextButton);
      } else {
        // Last question, show the Submit button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.addEventListener("click", function () {
          const initials = initialsInput.value;
          // You can send the score and initials to a server or store it in localStorage, etc.
          // For now, we'll just update the displayed score.
          totalScoreElement.textContent = score;
        });
        questionDiv.appendChild(submitButton);
      }
  
      quizContainer.appendChild(questionDiv);
    }
  });
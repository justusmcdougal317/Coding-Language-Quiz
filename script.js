document.addEventListener("DOMContentLoaded", function () {
    const loadQuizButton = document.getElementById("load-quiz");
    const quizContainer = document.getElementById("quiz-container");
  
    loadQuizButton.addEventListener("click", function () {
      // Make an HTTP request to the Quiz API
      fetch("https://quizapi.io/api/v1/questions?apiKey=VpYpm0pkFSwY5XI1Abv4aaUWBAGRP5iq9iThDo7q&limit=10")
        .then((response) => response.json())
        .then((data) => {
          // Clear the quiz container
          quizContainer.innerHTML = "";
  
          // Loop through the questions and add them to the container
          data.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
  
            questionDiv.innerHTML = `
              <h2>Question ${index + 1}:</h2>
              <p>${question.question}</p>
              <input type="radio" name="q${index + 1}" value="${question.correct_answer}"> ${question.correct_answer}<br>
              <input type="radio" name="q${index + 1}" value="${question.answers[0]}"> ${question.answers[0]}<br>
              <input type="radio" name="q${index + 1}" value="${question.answers[1]}"> ${question.answers[1]}<br>
            `;
  
            quizContainer.appendChild(questionDiv);
          });
        })
        .catch((error) => {
          console.error("Error fetching quiz questions:", error);
        });
    });
  });

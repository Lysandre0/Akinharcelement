document.addEventListener("DOMContentLoaded", function () {
    let currentQuestionIndex = 0;
    let questions = [];
    let result = {};
    let question = questions[currentQuestionIndex];
    // Fonction pour charger les questions depuis l'API
    function loadQuestions() {
        fetch("https://data.lysandrelebigot.com/questions")
            .then(response => response.json())
            .then(data => {
                questions = questions = data.slice().sort(() => Math.random() - 0.5);;
                showCurrentQuestion();
            })
            .catch(error => console.error("Erreur lors du chargement des questions : ", error))
    }

  
    // Fonction pour afficher la question actuelle
    function showCurrentQuestion() {
        if (currentQuestionIndex < questions.length) {
            question = questions[currentQuestionIndex];
            let questionTitle = document.querySelector(".questionTitle");
            let questionText = document.querySelector(".questionText");

            questionTitle.textContent = "Question " + (currentQuestionIndex + 1);
            questionText.textContent = question.question;
        } else {
            window.location.href = "resultat.html?resultats=" + encodeURIComponent(JSON.stringify(result));
        }
    }

    // Gestionnaire d'événement pour le bouton "OUI"
    const buttonOui = document.querySelector(".boutonQuestion.oui");
    buttonOui.addEventListener("click", function () {
        result[question.type] !== undefined ? result[question.type] += question.score : result[question.type] = question.score;
        console.log(result);
        console.log(typeof(question.score))
        currentQuestionIndex++;
        showCurrentQuestion();
    });

    // Gestionnaire d'événement pour le bouton "NON"
    const buttonNon = document.querySelector(".boutonQuestion.non");
    buttonNon.addEventListener("click", function () {
        currentQuestionIndex++;
        showCurrentQuestion();
    });

    // Chargez les questions lorsque la page est chargée
    loadQuestions();
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Vérifier si le POST a déjà été envoyé en utilisant le stockage local
    const postSent = localStorage.getItem("postSent") === "true";

    if (urlParams.has("resultats") && !postSent) {
        const resultatsJSON = urlParams.get("resultats");
        const resultats = JSON.parse(resultatsJSON);
        let typeAvecLePlusDeReponses = "";
        let nombreDeReponsesMax = 0;

        for (const type in resultats) {
            if (resultats[type] > nombreDeReponsesMax) {
                typeAvecLePlusDeReponses = type;
                nombreDeReponsesMax = resultats[type];
            }
        }

        const questionTitle = document.querySelector(".questionTitle");
        const questionText = document.querySelector(".questionText");

        questionTitle.textContent = "Résultat";
        if (typeAvecLePlusDeReponses) {
            questionText.innerHTML = `Selon vos réponses vous êtes témoin de <br>HARCELEMENT ${typeAvecLePlusDeReponses.toUpperCase()}<br><br>Cela représente  % des résultats`;

            const data = { type: typeAvecLePlusDeReponses };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const url = 'https://data.lysandrelebigot.com/answers';
            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Échec de la requête POST');
                    }
                })
                .then(data => {
                    console.log(data);
                    // Marquer le POST comme déjà envoyé dans le stockage local
                    localStorage.setItem("postSent", "true");
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            questionText.innerHTML = `Selon vos réponses vous n'êtes pas témoin de harcèlement`;
        }
    } else {
        // Rediriger vers index.html en cas d'actualisation
        window.location.href = 'index.html';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("resultats")) {
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
        questionText.innerHTML = `Selon vos réponses vous êtes témoin de <br>HARCELEMENT ${typeAvecLePlusDeReponses}<br><br>Cela représente  % des résultats`;
   } else {
        console.log("Aucun résultat n'a été transmis.");
    }
});

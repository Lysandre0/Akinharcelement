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
        if(typeAvecLePlusDeReponses){
            questionText.innerHTML = `Selon vos réponses vous êtes témoin de <br>HARCELEMENT ${typeAvecLePlusDeReponses}<br><br>Cela représente  % des résultats`;
        
            const data = { type: typeAvecLePlusDeReponses };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            };
            const url = 'http://172.168.1.120:3000/answers';
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
                })
                .catch(error => {
                    console.error(error);
                });
        }else{
            questionText.innerHTML = `Selon vos réponses vous n'êtes pas témoin de harcelement`;
        }  
   
   
    } else {
        console.log("Aucun résultat n'a été transmis.");
    }
});

// Récupérez les paramètres de requête de l'URL
const urlParams = new URLSearchParams(window.location.search);

// Vérifiez si le paramètre "resultats" existe dans l'URL
if (urlParams.has("resultats")) {
    // Récupérez la valeur du paramètre "resultats"
    const resultatsJSON = urlParams.get("resultats");

    // Convertissez la chaîne JSON en objet JavaScript
    const resultats = JSON.parse(resultatsJSON);

    // Maintenant, vous pouvez utiliser "resultats" sur la page "resultat.html"
    console.log(resultats);
} else {
    // Le paramètre "resultats" n'a pas été fourni dans l'URL
    console.log("Aucun résultat n'a été transmis.");
}
let lignes = 50;
let phrase = "Je ne recopierai pas l'exemple de Valentin";

document.addEventListener('DOMContentLoaded', function () {
    let tableau = document.getElementById('tableau');

    for (let index = 0; index < lignes; index++) {
        tableau.insertAdjacentHTML("beforeend", `${phrase}<br />`);
    }
});
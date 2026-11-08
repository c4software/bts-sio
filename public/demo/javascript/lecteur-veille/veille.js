function afficherArticles(texte) {
  // On transforme le texte reçu en document XML que l'on peut parcourir
  const xml = new DOMParser().parseFromString(texte, "text/xml");
  const liste = document.getElementById("articles");
  liste.innerHTML = "";

  xml.querySelectorAll("item").forEach((item) => {
    const titre = item.querySelector("title").textContent;
    const lien = item.querySelector("link").textContent;
    const date = new Date(item.querySelector("pubDate").textContent);

    const a = document.createElement("a");
    a.href = lien;
    a.target = "_blank";
    a.textContent = titre;

    const quand = document.createElement("small");
    quand.textContent = " " + date.toLocaleDateString("fr-FR");

    const li = document.createElement("li");
    li.append(a, quand);
    liste.append(li);
  });
}

function chargerSource() {
  const id = document.getElementById("source").value;
  document.getElementById("articles").innerHTML = "<li>Chargement…</li>";

  // On ne demande plus le flux au site distant, mais à notre relais
  fetch("relais.php?source=" + id)
    .then((response) => response.text())
    .then((texte) => afficherArticles(texte));
}

document.getElementById("source").addEventListener("change", chargerSource);
chargerSource();

// Vérifie si un jeton d'accès est présent dans le stockage local.
const token = localStorage.getItem("token");
if (token) {
  // Redirige l'utilisateur vers la page index.html s'il a déjà un jeton d'accès.
  window.location.href = "index.html";
}

// Sélectionne l'élément du formulaire ayant l'ID "formLogin".
const formLogin = document.querySelector("#formLogin");

// Ajoute un écouteur d'événements pour le formulaire lorsqu'il est soumis.
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  // Récupère la valeur de l'email et du mot de passe saisis dans le formulaire.
  const email = formLogin.email.value;
  const password = formLogin.password.value;

  // Effectue une requête POST à l'API pour se connecter, en spécifiant l'URL de l'API et les options de la requête.
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Convertit l'email et le mot de passe en JSON et les inclut dans le corps de la requête.
    body: JSON.stringify({ email, password }),
  })
    // Convertit la réponse HTTP en objet JSON pour une manipulation plus facile.
    .then((response) => response.json())
    .then((data) => {
      // Vérifie si la réponse de l'API contient un jeton d'accès.
      if (data.token) {
        // Enregistre le jeton d'accès dans le stockage local du navigateur.
        localStorage.setItem("token", data.token);
        // Redirige l'utilisateur vers la page index.html.
        window.location.href = "index.html";
      } else {
        // Affiche une alerte en cas d'erreur d'identification.
        alert("Erreur dans l'identifiant ou le mot de passe");
      }
    });
});
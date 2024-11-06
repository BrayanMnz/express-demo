document
  .getElementById("classSignupForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const body = JSON.stringify({
      name: form.elements.name.value,
      email: form.elements.email.value,
    });

    const headers = { "Content-Type": "application/json" };
    const container = document.getElementById("classSignupFormContainer");

    fetch("api/class-signup/process", { method: "post", body, headers })
      .then((resp) => {
        if (resp.status < 200 || resp.status >= 300)
          throw new Error(`Request failed with status ${resp.status}`);
        return resp.json();
      })
      .then((json) => {
        container.innerHTML =
          "<b>Gracias por registrarte!</b>" +
          '<p><a href="/">Volver a inicio</a></p>';
      })
      .catch((err) => {
        container.innerHTML =
          `<b>Lo sentimos, tuvimos un problema al registrarte. ` +
          `Por favor <a href="/class">intenta nuevamente</a>`;
      });
  });
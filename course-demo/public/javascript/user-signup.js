document.getElementById('user-signup-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const form = event.target;
        const body = JSON.stringify({
            name: form.elements.fullName.value,
            email: form.elements.email.value,
            password: form.elements.password.value,
            address: form.elements.address.value,
            phoneNumber: form.elements.phoneNumber.value,
            terms: form.elements.termsandconditions.value
        });

        const headers = { 'Content-Type': 'application/json' };
        const container = document.getElementById('user-form-div');

        fetch('api/user-signup/process', { method: 'post', body, headers })
            .then((resp) => {
                if (resp.status < 200 || resp.status >= 300)
                    throw new Error(`Request failed with status ${resp.status}`);
                return resp.json();
            })
            .then((json) => {
                container.innerHTML =
                    `<h2>Gracias por registrarte!</h2>` +
                    `<p><a href='/'>Volver a inicio</a></p>`;
            })
            .catch((err) => {
                container.innerHTML =
                    `<b>Lo sentimos, tuvimos un problema al registrarte. ` +
                    `Por favor <a href='/users/signup'>intenta nuevamente</a>`;
            });
    });
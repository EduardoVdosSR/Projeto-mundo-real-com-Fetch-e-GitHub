const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                        <img src=${user.avatarUrl} alt="Foto de perfil do usuário">
                        <div class="data">
                            <h1>${user.name ?? "não possui nome cadastrado 😢"}</h1>
                            <p>${user.bio ?? "não possui bio cadastrada 😢"}</p>
                            <h3>Seguidores: ${user.followers}</h3>
                            <h3>Seguindo: ${user.following}</h3>
                        </div>
                    </div>`

        // REPOSITORIES

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li>
                <a href="${repo.html_url}" target="_blank">
                    <h3>${repo.name}</h3>
                    <div class="informations">
                        <p>🍴 ${repo.forks}</p>
                        <p>⭐ ${repo.stargazers_count}</p>
                        <p>👀 ${repo.watchers}</p>
                        <p>👩‍💻 ${repo.language ?? "Sem linguagem"}</p>
                    </div>
                </a>
            </li>`
        );

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                               <h2>Repositórios</h2>
                                               <ul class="repo-list">${repositoriesItens}</ul>
                                           </div>`
        };

        // EVENTS 

        let eventsItens = ""
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                const commitMessage = event.payload.commits[0].message

                eventsItens += `<li>
                                    <h3>${event.repo.name}</h3>
                                    <p>- ${commitMessage}<p>
                                </li>`
            } else {
                eventsItens += `<li>
                                    <h3>${event.repo.name}</h3>
                                    <p>- Sem mensagem de commit<p>
                                </li>`
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                               <h2>Eventos</h2>
                                               <ul class="event-list">${eventsItens}</ul>
                                           </div>`
        };
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
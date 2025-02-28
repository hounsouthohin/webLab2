
    
        document.addEventListener('DOMContentLoaded', () => {
            // Récupérer l'identifiant de la publication depuis l'URL
            const urlParams = new URLSearchParams(window.location.search);
            const publicationId = urlParams.get('id');
            
            if (publicationId) {
                // Chargement de la publication
                fetch(`http://localhost:5501/posts/${publicationId}`)
                    .then(response => response.json())
                    .then(data => {
                        const contentContainer = document.getElementById('publication-content');
                        contentContainer.innerHTML = `
                            <div class="col ">
                                <div class="card carte m-auto w-50">
                                    <img src="img/blog.jpg" class="card-img-top" alt="card">
                                    <div class="card-body text-center">
                                        <h5 class="card-title text-white title fw-bold shadow-lg p-2 rounded">${data.title}</h5>
                                        <p class="card-text text-dark">${data.content}</p>
                                        <p class="card-meta  text-center text-dark">
                                            <small>
                                                <strong>Auteur :</strong> ${data.author} | 
                                                <strong>Date :</strong> ${data.date}
                                            </small>
                                        </p>
                                    </div>
                                </div>     
                            </div>
                        `;
                    })
                    .catch(error => console.error('Erreur lors du chargement de la publication :', error));
                
                // Chargement des commentaires
                fetch(`http://localhost:5501/comments?postId=${publicationId}`)
                    .then(response => response.json())  
                    .then(comments => { 
                        const commentsContainer = document.getElementById('comments-container');
                        commentsContainer.innerHTML = comments.map(comment => `
                            <div class="d-flex align-items-start mb-5">
                                <i class="bi bi-person-circle text-white" style="font-size: 40px;"></i>
                                <div class="ms-3 text-light">
                                    <p>${comment.content}</p>
                                </div>
                            </div>
                        `).join('');
                    })
                    .catch(error => console.error('Erreur lors du chargement des commentaires :', error));
            } else {
                document.getElementById('publication-content').innerHTML = `<p>Publication non trouvée.</p>`;
            }
        
            // Récupération des éléments du DOM
const commentForm = document.getElementById('comment-form');
const submitButton = document.getElementById('submit-comment');
const commentInput = document.getElementById('comment');

// Gestion du clic sur le bouton "Envoyer"
submitButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Empêche tout comportement par défaut

    const commentText = commentInput.value.trim();

    if (!commentText) {
        alert("Veuillez entrer un commentaire.");
        return;
    }

    try {
        // Envoi du commentaire à l'API
        const response = await fetch('http://localhost:5501/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentText,
                postId: publicationId // Assure-toi que publicationId est bien défini !
            })
        });

        if (response.ok) {
            const newComment = await response.json();
            afficherCommentaire(newComment);
            commentInput.value = ''; // Réinitialiser le champ de commentaire
        } else {
            alert("Erreur lors de l'envoi du commentaire.");
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire :", error);
    }
});

// Fonction pour afficher un commentaire sans recharger la page
function afficherCommentaire(comment) {
    const commentsContainer = document.getElementById('comments-container');
    const commentElement = document.createElement('div');
    commentElement.classList.add('d-flex', 'align-items-start', 'mb-5');
    commentElement.innerHTML = `
        <i class="bi bi-person-circle text-white" style="font-size: 40px;"></i>
        <div class="ms-3 text-light">
            <p>${comment.content}</p>
        </div>
    `;
    commentsContainer.prepend(commentElement);
}

        });
        
    

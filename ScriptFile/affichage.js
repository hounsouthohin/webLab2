
      //document.addEventListener est un evenement qui  se déclenche 
      // lorsque tout le HTML a été chargé et analysé, 
      // mais avant que les ressources externes (images, styles, etc.) 
      // ne soient complètement chargées.

      //document.querySelector('.posts-container') : 
      // Sélectionne le premier élément HTML avec la classe .posts-container.
      document.addEventListener('DOMContentLoaded', () => {
          const postsContainer = document.querySelector('.posts-container');
          
          // Fonction pour récupérer les posts depuis JSON Server
          async function fetchPosts() {
              try {
                  const postsResponse = await fetch('http://localhost:5501/posts');
                  //postsResponse.json() : 
                  // Transforme la réponse brute en un objet JavaScript en la convertissant depuis le format JSON.
                  const posts = await postsResponse.json();
                  postsContainer.innerHTML = ''; // Nettoie le conteneur avant d'ajouter les nouveaux posts
                  
                  // Parcours des posts pour les afficher dynamiquement
                  for (const post of posts) {
                      const postElement = document.createElement('div');
                      postElement.className = 'card mb-4 border-0 carde';
                      postElement.innerHTML = `
              
                        <!-- Carte 1 -->
    <div class="col">
        <a href="blog_post.html?id=${post.id}" class="text-decoration-none publication-link">
            <div class="card carte m-auto h-100 w-100">
                <img src="img/blog.jpg" class="card-img-top" alt="card">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title text-white title fw-bold shadow-lg p-2 rounded">${post.title}</h5>
                    
                    <!-- Texte défilant dans un conteneur Bootstrap -->
                    <div class="card-text card-text-scroll overflow-auto text-dark">
                        ${post.content}
                    </div>
                    
                    <p class="card-meta mt-auto text-center text-dark">
                        <small>
                            <strong>Auteur :</strong> ${post.author} | 
                            <strong>Date :</strong> ${new Date(post.date).toLocaleDateString('fr-FR')}
                        </small>
                    </p>
                </div>
            </div>
        </a>         
    </div>

                      `;
                      postsContainer.appendChild(postElement);
      
                      // Récupère et affiche les commentaires pour chaque post
                      //fetchComments(post.id);
                  }
              } catch (error) {
                  console.error('Erreur lors de la récupération des posts :', error);
              }
          }
      
          // Fonction pour récupérer les commentaires liés à un post
         
      
          // Charge les posts et les commentaires au chargement de la page
          fetchPosts();
      });
      
// Fonction pour générer les articles
    function generateArticle(nomProduit, prix, image, description) {
      const article = document.createElement('div');
      article.classList.add('article');
      article.onclick = function() {
        openArticle(nomProduit, prix, image, description);
      };
      article.innerHTML = `
        <img src="${image}" alt="${nomProduit}">
        <div class="article-info">
          <h2>${nomProduit}</h2>
          <p>Prix: ${prix}</p>
        </div>
      `;
      return article;
    }
    
    const articlesContainer = document.getElementById("articlesContainer");
    articlesContainer.appendChild(generateArticle("Lightsaber with multi color", "44.99€", "lightsaber_image_1.jpeg", "You want to become a jedi or a sith, here is a lightsaber with more than ten blade colors (RGB) <br> Vous souhaitez devenir un jedi ou un sith, voici un sabre laser avec plus de dix couleurs de lame (RVB) <br> Size: full length 80CM/handle 25CM (diameter 30MM)/sword body about 60CM <br>Taille : pleine longueur 80CM/poignée 25CM (diamètre 30MM)/corps de l'épée environ 60CM"));
    articlesContainer.appendChild(generateArticle("The most powerful water gun", "54.99€", "the_most_powerful_water_gun_image_1.jpeg", "Here is one of the most powerful water guns in the world,<br> with its futuristic shape and incredible power. Perfect for water fights <br> Voici l'un des pistolets à eau les plus puissants au monde, <br>avec sa forme futuriste et sa puissance incroyable. Parfait pour les batailles d'eau <br> The battery and its charger are included <br> La batterie et son chargeur sont inclus"));
    articlesContainer.appendChild(generateArticle("Super balle à effet", "24.99€", "super_effect_ball_image_2.jpeg", "You want to make shots with superb effects like your favorite footballers, here is a ball that produces very fun effects <br>Vous souhaitez réaliser des clichés avec de superbes effets comme vos footballeurs préférés, <br>voici un ballon qui produit des effets très amusants "));
    articlesContainer.appendChild(generateArticle("Glock water gun", "24.99€", "Glock_water_gun_image_1.png", "Here is an easy to carry water gun with superb power. Very funny <br> Voici un pistolet à eau facile à transporter et doté d'une superbe puissance. Très drôle <br> The battery and its charger are included <br> La batterie et son chargeur sont inclus"));
    articlesContainer.appendChild(generateArticle("Spiderman Webshooter", "49.99€", "spiderman_webshooter_image1.jpeg", "Do you like Spiderman? Here is his Webshooter which launches real projectiles <br> Aimez-vous Spiderman? Voici son Webshooter qui lance de vrais projectiles <br> Color : black / couleur : noir"));
    articlesContainer.appendChild(generateArticle("Submachine water gun", "49.99€", "submachine_water_gun.jpeg", "Here is an assault rifle for the best water fights between friends <br> Voici un fusil d'assaut pour les meilleurs batailles d'eau entre amis <br> The battery and its charger are included <br> La batterie et son chargeur sont inclus"));
    articlesContainer.appendChild(generateArticle("Balle météore rebondissante ", "4.99€", "Balle_météore_rebondissante.png", ""));
    
    // Fonction pour ouvrir les détails de l'article
    function openArticle(nomProduit, prix, image, description) {
      const mainTitle = document.getElementById("mainTitle");
      const articlesContainer = document.getElementById("articlesContainer");
      const articleDetails = document.getElementById("articleDetails");
      
      mainTitle.style.display = "none"; // Cache le titre "Articles"
      articlesContainer.style.display = "none"; // Cache les articles
      
      articleDetails.innerHTML = `
        <div class="article-details">
          <img src="${image}" alt="${nomProduit}">
          <div class="article-details-info">
            <h2>${nomProduit}</h2>
            <p><b>Prix:</b> ${prix}</p>
            <p>${description}</p>
            <!-- Bouton de commande et de paiement -->
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" onsubmit="return validateAndSendOrder(event)">
              <input type="hidden" name="cmd" value="_xclick">
              <input type="hidden" name="business" value="oliel.lenny@gmail.com">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="item_name" value="${nomProduit}">
              <input type="hidden" name="amount" value="${prix.replace('€', '')}">
              <label for="customerName">Nom et prénom :</label><br>
              <input type="text" id="customerName" name="name" required><br>
              <label for="customerAddress">Adresse de livraison :</label><br>
              <input type="text" id="customerAddress" name="address" required><br>
              <label for="customerEmail">Adresse e-mail :</label><br>
              <input type="email" id="customerEmail" name="email" required><br>
              <p class="warning"> ATTENTION : Veuillez envoyez le mail de commande puis retourner sur cette page pour payer </p>
              <br>
              <button type="submit" class="order-button">Commander et payer</button>
            </form>
          </div>
        </div>
      `;
      
      articleDetails.style.display = "block"; // Affiche les détails de l'article
    }
    
    // Fonction pour valider le formulaire et envoyer les emails de commande
    function validateAndSendOrder(event) {
      event.preventDefault(); // Empêche la soumission du formulaire
      
      const customerName = document.getElementById('customerName').value.trim();
      const customerAddress = document.getElementById('customerAddress').value.trim();
      const customerEmail = document.getElementById('customerEmail').value.trim();
      
      let isValid = true;
      let orderDetails = '';
      
      // Nom et prénom sont toujours valables car les champs sont obligatoires
      orderDetails += `Nom: ${customerName}\n`;
      
      if (!customerAddress) {
        isValid = false;
        orderDetails += 'Adresse de livraison non valable (champ obligatoire)\n';
      } else {
        orderDetails += `Adresse: ${customerAddress}\n`;
      }
      
      if (!isValidEmail(customerEmail)) {
        isValid = false;
        orderDetails += 'Adresse e-mail non valable (format incorrect ou inexistante)\n';
      } else {
        orderDetails += `E-mail: ${customerEmail}\n`;
      }
      
      const nomProduit = document.querySelector('input[name="item_name"]').value;
      const prix = document.querySelector('input[name="amount"]').value;
      orderDetails += `Produit: ${nomProduit}\nPrix: ${prix}€`;
      
      if (!isValid) {
        // Envoyer les détails de la commande aux adresses e-mail avec les champs non valables
        const mailtoLink = `mailto:thedshopbuy@gmail.com?subject=Nouvelle commande (champs non valables)&body=${encodeURIComponent(orderDetails)}`;
        window.open(mailtoLink);
        return false;
      }
      
      // Envoyer les détails de la commande aux adresses e-mail avec tous les champs valables
      const mailtoLink = `mailto:thedshopbuy@gmail.com?subject=Nouvelle commande (champs valables)&body=${encodeURIComponent(orderDetails)}`;
      window.open(mailtoLink);
      
      // Soumettre le formulaire PayPal avec le prix non modifiable
      document.querySelector('input[name="amount"]').value = prix.replace('€', '');
      
      // Rediriger vers PayPal
      document.querySelector('form').submit();
      
      return true;
    }
    
    // Fonction pour valider l'adresse e-mail
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

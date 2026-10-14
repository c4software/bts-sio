# Laravel et cybersécurité (OWASP)

Nom : ______________________  Prénom : ______________________

**Question 1 — Les secrets d'une application**

Une application utilise des secrets : mot de passe de la base de données, clés d'API, clé de chiffrement. Quelles pratiques sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Les encoder en Base64 dans le code pour les rendre illisibles
- ☐ **b.** Les écrire en dur dans le code pour que toute l'équipe en dispose
- ☐ **c.** Exclure le fichier qui les contient du dépôt Git (.gitignore), car un secret commité reste dans l'historique même après suppression
- ☐ **d.** Les stocker dans des variables d'environnement (un fichier .env en local), en dehors du code source
- ☐ **e.** Les placer dans un commentaire HTML de la page d'administration

**Question 2 — La falsification de requête intersite (CSRF)**

À propos des attaques CSRF et de leur protection, quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Le jeton CSRF protège aussi contre l'injection SQL
- ☐ **b.** La protection consiste à placer dans chaque formulaire un jeton unique, que le serveur compare à celui stocké en session
- ☐ **c.** Un site malveillant fait envoyer une requête à votre application par le navigateur d'un utilisateur connecté, à son insu
- ☐ **d.** Le jeton CSRF chiffre les données du formulaire avant leur envoi
- ☐ **e.** Envoyer le formulaire en POST plutôt qu'en GET suffit à se protéger

**Question 3 — L'aléatoire en sécurité**

Pour générer un mot de passe ou un jeton de sécurité, n'importe quel générateur aléatoire convient, du moment que le résultat a l'air aléatoire.

☐ Vrai  ☐ Faux

**Question 4 — Un hachage volontairement lent**

Les algorithmes de hachage de mots de passe comme bcrypt ou Argon2 sont volontairement lents. Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** La lenteur rend chaque tentative d'un attaquant (force brute, dictionnaire) beaucoup plus coûteuse
- ☐ **b.** Le coût est paramétrable, ce qui permet de l'augmenter quand les machines deviennent plus puissantes
- ☐ **c.** Un algorithme rapide comme MD5 est préférable, car l'utilisateur attend moins longtemps
- ☐ **d.** Le hash produit contient l'algorithme, le coût et le sel, ce qui suffit pour vérifier un mot de passe
- ☐ **e.** Ils sont lents parce qu'ils permettent de retrouver le mot de passe d'origine avec la bonne clé

**Question 5 — Les entrées utilisateur**

À propos du contrôle des données envoyées par un utilisateur, quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** La validation sert uniquement à afficher de jolis messages d'erreur
- ☐ **b.** Les valeurs doivent être bornées (taille, nombre maximum), sinon un utilisateur peut surcharger le serveur pour tout le monde
- ☐ **c.** Les contrôles du navigateur (attributs required, max, maxlength) suffisent, la validation serveur est donc inutile
- ☐ **d.** Toute donnée reçue doit être validée côté serveur, car une requête peut être envoyée sans passer par votre formulaire
- ☐ **e.** Seuls les champs texte doivent être validés, les nombres et les listes déroulantes sont sûrs

**Question 6 — Se protéger de l'injection SQL**

Qu'est-ce qui protège réellement une application contre l'injection SQL ?

*Plusieurs réponses possibles.*

- ☐ **a.** Utiliser un framework, même en concaténant la saisie dans une requête écrite à la main
- ☐ **b.** Utiliser une base SQLite plutôt que MySQL
- ☐ **c.** Les requêtes préparées, qui transmettent les données séparément de la requête SQL
- ☐ **d.** Retirer les espaces de la saisie avec trim()
- ☐ **e.** Un ORM comme Eloquent, tant qu'on passe par ses méthodes plutôt que de concaténer du SQL à la main

**Question 7 — L'affectation en masse**

Remplir un enregistrement directement avec toutes les données reçues d'un formulaire est sans risque, puisque l'utilisateur ne peut envoyer que les champs présents dans ce formulaire.

☐ Vrai  ☐ Faux

**Question 8 — L'interface et le serveur**

Masquer un bouton, désactiver un champ ou cacher un formulaire n'empêche personne d'envoyer la requête correspondante, ni de modifier un identifiant dans l'URL. Retenez la règle : l'interface cache, le serveur ______ .

(a) interdit / (b) affiche / (c) chiffre / (d) redirige / (e) fait confiance au navigateur

**Question 9 — Une ressource introuvable**

Une application reçoit une requête vers une ressource qui n'existe pas (un identifiant inconnu dans l'URL) et plante en affichant une page d'erreur. Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Il faut prévoir ce cas et répondre avec un message neutre, sans détail technique
- ☐ **b.** Ce n'est pas un problème de sécurité, seulement un bug d'affichage
- ☐ **c.** Il suffit de créer automatiquement la ressource quand elle n'existe pas
- ☐ **d.** C'est une exception non traitée, ce qui relève de la mauvaise gestion des conditions exceptionnelles
- ☐ **e.** Il vaut mieux afficher l'erreur complète (fichier, ligne, requête SQL) pour aider l'utilisateur

**Question 10 — Hacher ou chiffrer ?**

Pour stocker les mots de passe des utilisateurs, quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Pour vérifier un mot de passe, on hache la saisie et on compare au hash stocké
- ☐ **b.** L'administrateur doit pouvoir relire les mots de passe en cas d'oubli
- ☐ **c.** Un simple md5() suffit, c'est également un hash
- ☐ **d.** On les chiffre, pour pouvoir les déchiffrer à la connexion et les comparer
- ☐ **e.** On les hache : un hash est à sens unique, on ne peut pas retrouver le mot de passe d'origine

**Question 11 — Le salage**

Hacher deux fois le même mot de passe avec un algorithme moderne donne deux résultats différents. C'est normal : l'algorithme ajoute à chaque fois un ______ aléatoire, si bien que deux utilisateurs ayant le même mot de passe n'auront pas le même hash.

(a) jeton CSRF / (b) sel / (c) poivre / (d) coût / (e) mot de passe en clair

**Question 12 — Le message d'erreur de connexion**

Sur un formulaire de connexion, pourquoi afficher le même message « Identifiants incorrects », que le compte existe ou non ?

*Plusieurs réponses possibles.*

- ☐ **a.** Un message unique ne donne aucune information exploitable sur la partie qui est fausse (identifiant ou mot de passe)
- ☐ **b.** Des messages différents permettraient à un attaquant de savoir quels comptes existent
- ☐ **c.** Le message n'a aucune importance tant que les mots de passe sont hachés
- ☐ **d.** Un message précis (« Ce compte n'existe pas ») améliore la sécurité, car l'utilisateur corrige plus vite
- ☐ **e.** Il faut renvoyer le mot de passe saisi dans le formulaire pour que l'utilisateur voie son erreur

**Question 13 — Régénérer la session**

Changer l'identifiant de session au moment de la connexion est inutile si les mots de passe sont correctement hachés.

☐ Vrai  ☐ Faux

**Question 14 — Les étapes d'une connexion**

Classez les étapes d'une connexion sécurisée dans l'ordre où elles doivent s'exécuter côté serveur. Une des actions proposées ne doit jamais être faite.

| | À relier à… |
|---|---|
| Retrouver le compte à partir de l'identifiant saisi → ______ | • Étape 6 |
| Si le compte n'existe pas, répondre avec un message générique → ______ | • Étape 2 |
| Comparer le mot de passe saisi au hash stocké → ______ | • Étape 5 |
| Ouvrir la session (identifiant de l'utilisateur en session, nouvel identifiant de session) → ______ | • Avant toute autre étape |
| Rediriger vers la page protégée → ______ | • Étape 3 |
| Enregistrer le mot de passe saisi dans la session pour le revérifier plus tard → ______ | • Étape 4 |
|  | • À ne jamais faire |
|  | • Étape 1 |

**Question 15 — Reconnaître un utilisateur connecté**

Comment un serveur reconnaît-il un utilisateur connecté d'une requête à l'autre ? Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** La comparaison du mot de passe peut se faire en JavaScript dans le navigateur, pour soulager le serveur
- ☐ **b.** Le cookie contient l'objet utilisateur complet, avec son hash de mot de passe
- ☐ **c.** Voler ce cookie de session permet d'usurper l'utilisateur sans connaître son mot de passe
- ☐ **d.** La session, côté serveur, ne contient que le minimum (l'identifiant de l'utilisateur), les données sont rechargées depuis la base
- ☐ **e.** Le navigateur conserve un cookie contenant l'identifiant de session, pas le mot de passe

**Question 16 — Réserver une fonctionnalité**

Une application laisse tout le monde consulter son contenu, mais réserve l'ajout et la suppression aux utilisateurs connectés. Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Afficher le formulaire uniquement aux utilisateurs connectés suffit
- ☐ **b.** Chaque route qui modifie des données doit vérifier côté serveur que l'utilisateur est connecté (un middleware dans Laravel)
- ☐ **c.** Le contrôle s'exécute dans le navigateur, avant l'envoi du formulaire
- ☐ **d.** Un formulaire resté ouvert après une déconnexion peut encore envoyer sa requête
- ☐ **e.** Il faut aussi protéger les pages de consultation, sinon la protection ne fonctionne pas

**Question 17 — Confidentialité, intégrité, disponibilité**

Les risques se classent en trois grandes catégories. Quelles associations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Un rançongiciel qui chiffre le serveur : aucune des trois catégories
- ☐ **b.** Une injection SQL qui modifie les montants des commandes : atteinte à l'intégrité
- ☐ **c.** Une sauvegarde quotidienne de la base : atteinte à l'intégrité
- ☐ **d.** Une attaque DDoS qui rend le site inaccessible : atteinte à la disponibilité
- ☐ **e.** Une fuite de la table utilisateurs : atteinte à la confidentialité

**Question 18 — La surface d'attaque**

Un serveur avec des ports ouverts inutiles, des services non sécurisés et une console d'administration en ligne offre de nombreux points d'entrée à un attaquant. Réduire la ______ consiste à minimiser ces points d'entrée.

(a) charge du serveur / (b) surface d'attaque / (c) bande passante / (d) journalisation / (e) disponibilité

**Question 19 — Une attaque de la chaîne d'approvisionnement**

Une Supply Chain Attack ne vise pas directement votre code, mais une dépendance que vous utilisez (Composer, npm, pip, images Docker…). Classez les étapes d'une telle attaque dans l'ordre.

| | À relier à… |
|---|---|
| Une dépendance est compromise, par un attaquant ou un développeur malveillant → ______ | • Étape 3 |
| Du code malveillant est injecté dans la dépendance → ______ | • Étape 4 |
| Le code malveillant est distribué avec une mise à jour de la dépendance → ______ | • Étape 2 |
| Le code malveillant s'exécute sur les serveurs et les postes qui installent la dépendance → ______ | • Étape 5 |
|  | • Étape 1 |
|  | • Aucune, l'attaque est bloquée par le gestionnaire de paquets |

**Question 20 — L'IA et les dépendances**

Un assistant IA vous propose d'ajouter une dépendance au nom plausible pour gagner du temps. Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** L'IA peut inventer un nom de paquet, qu'un attaquant peut ensuite publier avec du code malveillant (slopsquatting)
- ☐ **b.** Le gestionnaire de paquets (Composer, npm…) vérifie la sécurité de tous les paquets, on peut donc installer sans regarder
- ☐ **c.** Si le code a été écrit par l'IA, c'est elle qui est responsable en cas de faille
- ☐ **d.** Il faut vérifier chaque dépendance ajoutée (existence, auteur, popularité, mises à jour) avant de l'installer
- ☐ **e.** Un fichier AGENTS.md avec des consignes de sécurité remplace la revue de code

**Question 21 — Une vraie double authentification**

Le SSO est un risque potentiel : un seul compte à pirater donne accès à plusieurs services. Parmi ces combinaisons, lesquelles constituent une vraie authentification à deux facteurs ?

*Plusieurs réponses possibles.*

- ☐ **a.** Un mot de passe très long (plus de 30 caractères)
- ☐ **b.** Un mot de passe et une empreinte digitale
- ☐ **c.** Un mot de passe et un code OTP généré par une application sur le téléphone
- ☐ **d.** Un mot de passe et une question secrète (« Quelle est votre couleur préférée ? »)
- ☐ **e.** Deux mots de passe différents

**Question 22 — Le « fail open »**

Un collègue écrit ce contrôle d'accès :
public function handle(Request $request, Closure $next)
{
    try {
        if (!Auth::check()) { return redirect('/login'); }
    } catch (Exception $e) {
        return $next($request);
    }
    return $next($request);
}
Quelles affirmations sont correctes ?

*Plusieurs réponses possibles.*

- ☐ **a.** Ce code est correct puisque Auth::check() est bien appelé
- ☐ **b.** En cas d'erreur, un contrôle de sécurité doit bloquer (« fail closed »), par exemple en redirigeant vers /login
- ☐ **c.** En cas d'erreur (session illisible, base indisponible), la requête passe comme si l'utilisateur était connecté
- ☐ **d.** Le problème est uniquement de performance, le try / catch ralentit l'application
- ☐ **e.** Ce code est plus sûr qu'une version sans try / catch, puisque l'application ne plante jamais

**Question 23 — Analyse d'une connexion**

Voici la méthode de connexion d'une application Laravel (la colonne password de la table utilisateurs contient les mots de passe saisis à l'inscription) :
public function traitementLogin(Request $request)
{
    $utilisateur = Utilisateur::where('email', $request-&gt;email)-&gt;first();
    if ($utilisateur == null) {
        return redirect('/login')-&gt;with('error', "Aucun compte avec l'email " . $request-&gt;email);
    }
    if ($request-&gt;password == $utilisateur-&gt;password) {
        Auth::login($utilisateur);
        return redirect('/todo');
    }
    return redirect('/login')-&gt;with('error', 'Mot de passe incorrect');
}
Identifiez au moins trois failles de sécurité. Pour chacune, expliquez ce qu'un attaquant pourrait faire, nommez la catégorie de faille correspondante (le numéro dans le Top 10 OWASP n'est pas demandé) et proposez une correction.

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________



<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Exclure le fichier qui les contient du dépôt Git (.gitignore), car un secret commité reste dans l'historique même après suppression ; (d) Les stocker dans des variables d'environnement (un fichier .env en local), en dehors du code source — *Exact, un secret commité est un secret exposé : il faut alors le changer (rotation). / Exact, la configuration et les secrets dépendent de l'environnement, pas du code.*

**2.** (b) La protection consiste à placer dans chaque formulaire un jeton unique, que le serveur compare à celui stocké en session ; (c) Un site malveillant fait envoyer une requête à votre application par le navigateur d'un utilisateur connecté, à son insu — *Exact, un site tiers ne connaît pas ce jeton : c'est ce que fait @csrf dans Laravel. / Exact, le navigateur joint automatiquement le cookie de session : la requête semble légitime.*

**3.** Faux — *Exact, c'est faux : il faut un générateur cryptographiquement sûr (random_int en PHP). Un générateur classique comme rand() peut être prédit par un attaquant.*

**4.** (a) La lenteur rend chaque tentative d'un attaquant (force brute, dictionnaire) beaucoup plus coûteuse ; (b) Le coût est paramétrable, ce qui permet de l'augmenter quand les machines deviennent plus puissantes ; (d) Le hash produit contient l'algorithme, le coût et le sel, ce qui suffit pour vérifier un mot de passe — *Exact, quelques millisecondes pour un utilisateur, des années pour des milliards d'essais. / Exact, avec bcrypt chaque +1 sur le coût double le temps de calcul. / Exact, la fonction de vérification n'a besoin que du mot de passe saisi et du hash stocké.*

**5.** (b) Les valeurs doivent être bornées (taille, nombre maximum), sinon un utilisateur peut surcharger le serveur pour tout le monde ; (d) Toute donnée reçue doit être validée côté serveur, car une requête peut être envoyée sans passer par votre formulaire — *Exact, c'est un risque sur la disponibilité. / Exact, un outil comme Postman ou une page écrite par un attaquant ignore vos contrôles HTML et JavaScript.*

**6.** (c) Les requêtes préparées, qui transmettent les données séparément de la requête SQL ; (e) Un ORM comme Eloquent, tant qu'on passe par ses méthodes plutôt que de concaténer du SQL à la main — *Exact, la valeur saisie n'est jamais interprétée comme du SQL. / Exact, l'ORM génère des requêtes préparées pour vous.*

**7.** Faux — *Exact, c'est faux : un utilisateur peut ajouter n'importe quel champ à sa requête (par exemple est_admin=1). D'où la liste blanche des champs autorisés, le $fillable d'Eloquent.*

**8.** (a) interdit

**9.** (a) Il faut prévoir ce cas et répondre avec un message neutre, sans détail technique ; (d) C'est une exception non traitée, ce qui relève de la mauvaise gestion des conditions exceptionnelles — *Exact, l'utilisateur est informé, l'attaquant n'apprend rien. / Exact, le code ne prévoit pas le cas où la ressource n'existe pas (catégorie A10 du Top 10 OWASP 2025).*

**10.** (a) Pour vérifier un mot de passe, on hache la saisie et on compare au hash stocké ; (e) On les hache : un hash est à sens unique, on ne peut pas retrouver le mot de passe d'origine — *Exact, on ne « déchiffre » jamais un hash, on compare (password_verify en PHP). / Exact, hacher est non réversible, chiffrer est réversible avec la clé.*

**11.** (b) sel

**12.** (a) Un message unique ne donne aucune information exploitable sur la partie qui est fausse (identifiant ou mot de passe) ; (b) Des messages différents permettraient à un attaquant de savoir quels comptes existent — *Exact, l'attaquant ne sait pas ce qu'il doit corriger. / Exact, c'est l'énumération de comptes : l'attaquant n'a plus qu'à cibler les comptes existants.*

**13.** Faux — *Exact, c'est faux : le hachage protège le mot de passe stocké, la régénération protège la session contre la fixation de session (A07:2025). Ce sont deux protections différentes.*

**14.** Retrouver le compte à partir de l'identifiant saisi → Étape 1 ; Si le compte n'existe pas, répondre avec un message générique → Étape 2 ; Comparer le mot de passe saisi au hash stocké → Étape 3 ; Ouvrir la session (identifiant de l'utilisateur en session, nouvel identifiant de session) → Étape 4 ; Rediriger vers la page protégée → Étape 5 ; Enregistrer le mot de passe saisi dans la session pour le revérifier plus tard → À ne jamais faire

**15.** (c) Voler ce cookie de session permet d'usurper l'utilisateur sans connaître son mot de passe ; (d) La session, côté serveur, ne contient que le minimum (l'identifiant de l'utilisateur), les données sont rechargées depuis la base ; (e) Le navigateur conserve un cookie contenant l'identifiant de session, pas le mot de passe — *Exact, c'est le vol de session : d'où l'importance de HTTPS et des cookies sécurisés. / Exact, le hash du mot de passe ne s'y promène pas. / Exact, le mot de passe ne circule qu'à l'inscription et à la connexion.*

**16.** (b) Chaque route qui modifie des données doit vérifier côté serveur que l'utilisateur est connecté (un middleware dans Laravel) ; (d) Un formulaire resté ouvert après une déconnexion peut encore envoyer sa requête — *Exact, c'est le contrôle d'accès (A01:2025). / Exact, seul le serveur peut refuser cette requête.*

**17.** (b) Une injection SQL qui modifie les montants des commandes : atteinte à l'intégrité ; (d) Une attaque DDoS qui rend le site inaccessible : atteinte à la disponibilité ; (e) Une fuite de la table utilisateurs : atteinte à la confidentialité — *Exact, des données sont modifiées sans autorisation. / Exact, le service n'est plus rendu. / Exact, des informations sensibles sont divulguées.*

**18.** (b) surface d'attaque

**19.** Une dépendance est compromise, par un attaquant ou un développeur malveillant → Étape 1 ; Du code malveillant est injecté dans la dépendance → Étape 2 ; Le code malveillant est distribué avec une mise à jour de la dépendance → Étape 3 ; Le code malveillant s'exécute sur les serveurs et les postes qui installent la dépendance → Étape 4

**20.** (a) L'IA peut inventer un nom de paquet, qu'un attaquant peut ensuite publier avec du code malveillant (slopsquatting) ; (d) Il faut vérifier chaque dépendance ajoutée (existence, auteur, popularité, mises à jour) avant de l'installer — *Exact, c'est une forme de Supply Chain Attack. / Exact, relisez le code de l'IA comme celui d'un développeur débutant.*

**21.** (b) Un mot de passe et une empreinte digitale ; (c) Un mot de passe et un code OTP généré par une application sur le téléphone — *Exact, un secret (mémoriel) et une biométrie (corporel). / Exact, un secret que l'on connaît (mémoriel) et un objet que l'on possède (matériel).*

**22.** (b) En cas d'erreur, un contrôle de sécurité doit bloquer (« fail closed »), par exemple en redirigeant vers /login ; (c) En cas d'erreur (session illisible, base indisponible), la requête passe comme si l'utilisateur était connecté — *Exact, dans le doute, on refuse. / Exact, c'est un comportement « fail open » : le système laisse passer en cas d'erreur.*

**23.** Question libre (correction manuelle). Éléments attendus (3 failles correctement expliquées, rattachées et corrigées suffisent pour la note maximale) : 1) Mots de passe stockés et comparés en clair : une fuite de la base expose tous les mots de passe (réutilisés ailleurs). A04 Défaillances cryptographiques. Correction : password_hash à l'inscription, password_verify à la connexion. 2) Messages d'erreur différents (« Aucun compte… » / « Mot de passe incorrect ») : énumération des comptes existants. A07 Défaillances d'authentification. Correction : un message unique « Identifiants incorrects ». 3) Pas de régénération de l'identifiant de session après la connexion : fixation de session. A07. Correction : $request-&gt;session()-&gt;regenerate(). 4) Aucune limite de tentatives : force brute possible. A07 ou A06 (anti-bot). Correction : limiter les essais, captcha. 5) Accepté aussi : l'email saisi est réaffiché dans le message, à échapper (XSS si affiché sans échappement), et l'absence de MFA (A07).

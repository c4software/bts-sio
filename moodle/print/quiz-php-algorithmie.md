# PHP : Algorithmie

Nom : ______________________  Prénom : ______________________

**Question 1 — Affectation**

Que va afficher ce code ? $x = 5; $x = $x + 3; echo $x;

Réponse : ________________________________________

**Question 2 — Priorité des opérateurs**

Que va afficher echo 2 + 3 * 4; ?

Réponse : ________________________________________

**Question 3 — Le modulo**

Que permet de calculer l'opérateur % (modulo) ?

- ☐ **a.** La division avec des décimales
- ☐ **b.** La puissance d'un nombre
- ☐ **c.** Le reste de la division entière
- ☐ **d.** Le pourcentage d'une valeur

**Question 4 — Calcul de modulo**

Que va afficher echo 17 % 5; ?

Réponse : ________________________________________

**Question 5 — Copie de variable**

Que va afficher ce code ? $a = 5; $b = $a; $a = 10; echo $b;

- ☐ **a.** 10
- ☐ **b.** 15
- ☐ **c.** 5
- ☐ **d.** Une erreur

**Question 6 — Échanger deux variables**

Quel code échange correctement le contenu des variables $a et $b ?

- ☐ **a.** $a = $tmp; $b = $a; $tmp = $b;
- ☐ **b.** echange($a, $b);
- ☐ **c.** $a = $b; $b = $a;
- ☐ **d.** $tmp = $a; $a = $b; $b = $tmp;

**Question 7 — Vrai ou Faux - Incrément**

L'instruction $x++ est équivalente à $x = $x + 1.

☐ Vrai  ☐ Faux

**Question 8 — Division**

Que va afficher echo 7 / 2; ?

- ☐ **a.** 4
- ☐ **b.** 3
- ☐ **c.** Une erreur
- ☐ **d.** 3.5

**Question 9 — Lire une condition**

Que va afficher ce code ? $age = 17; if ($age &gt;= 18) { echo "majeur"; } else { echo "mineur"; }

- ☐ **a.** Rien du tout
- ☐ **b.** mineur
- ☐ **c.** majeurmineur
- ☐ **d.** majeur

**Question 10 — Le ET logique**

Quel opérateur écrit-on en PHP pour le « ET » logique (les deux conditions doivent être vraies) ?

Réponse : ________________________________________

**Question 11 — Évaluer un ET**

$a = 5; $b = 10; Que vaut l'expression ($a &gt; 3 && $b &gt; 20) ?

- ☐ **a.** 5
- ☐ **b.** false
- ☐ **c.** true
- ☐ **d.** Une erreur

**Question 12 — Évaluer un OU**

$a = 5; $b = 10; Que vaut l'expression ($a &gt; 3 || $b &gt; 20) ?

- ☐ **a.** 10
- ☐ **b.** false
- ☐ **c.** true
- ☐ **d.** Une erreur

**Question 13 — La négation**

$x = 5; Que vaut l'expression !($x == 5) ?

- ☐ **a.** 5
- ☐ **b.** false
- ☐ **c.** true
- ☐ **d.** 0

**Question 14 — Les conditions en cascade**

$note = 12; if ($note &gt;= 16) { echo "très bien"; } elseif ($note &gt;= 10) { echo "admis"; } else { echo "insuffisant"; } Qu'affiche ce code ?

- ☐ **a.** insuffisant
- ☐ **b.** admisinsuffisant
- ☐ **c.** très bien
- ☐ **d.** admis

**Question 15 — Compter les itérations**

Combien de fois s'exécute le corps de la boucle for ($i = 0; $i &lt; 5; $i++) ?

Réponse : ________________________________________

**Question 16 — Pas de deux**

Combien de fois s'exécute le corps de la boucle for ($i = 1; $i &lt;= 10; $i += 2) ?

Réponse : ________________________________________

**Question 17 — Bien choisir sa boucle**

Lesquelles de ces boucles affichent 01234 ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** $i = 0; while ($i &lt; 5) { echo $i; $i++; }
- ☐ **b.** for ($i = 0; $i &lt;= 5; $i++) { echo $i; }
- ☐ **c.** for ($i = 0; $i &lt; 5; $i++) { echo $i; }
- ☐ **d.** foreach ([0, 1, 2, 3, 4] as $v) { echo $v; }

**Question 18 — Boucle infinie**

$i = 0; while ($i &lt; 10) { echo $i; } Quel est le problème de ce code ?

- ☐ **a.** Aucun, ce code affiche les nombres de 0 à 9
- ☐ **b.** La condition est mal écrite, il faut == à la place de &lt;
- ☐ **c.** La boucle est infinie : $i n'est jamais incrémenté, la condition reste toujours vraie
- ☐ **d.** On ne peut pas utiliser echo dans un while

**Question 19 — L'accumulateur**

Que va afficher ce code ? $s = 0; for ($i = 1; $i &lt;= 4; $i++) { $s = $s + $i; } echo $s;

Réponse : ________________________________________

**Question 20 — Le produit**

Que va afficher ce code ? $p = 1; for ($i = 1; $i &lt;= 4; $i++) { $p = $p * $i; } echo $p;

Réponse : ________________________________________

**Question 21 — Sortir d'une boucle**

Pour interrompre immédiatement une boucle et passer à la suite du programme, on utilise l'instruction ______ .

(a) exit / (b) stop / (c) continue / (d) break

**Question 22 — Le continue**

Que fait l'instruction continue dans une boucle ?

- ☐ **a.** Elle met la boucle en pause une seconde
- ☐ **b.** Elle sort complètement de la boucle
- ☐ **c.** Elle abandonne l'itération en cours et passe directement à la suivante
- ☐ **d.** Elle recommence la boucle depuis le début

**Question 23 — Compte à rebours**

Que va afficher ce code ? for ($i = 3; $i &gt; 0; $i--) { echo $i; }

- ☐ **a.** 123
- ☐ **b.** 321
- ☐ **c.** Une boucle infinie
- ☐ **d.** 3210

**Question 24 — Vrai ou Faux - do…while**

Une boucle do…while exécute toujours son corps au moins une fois, même si la condition est fausse dès le départ.

☐ Vrai  ☐ Faux

**Question 25 — Doubler jusqu'au seuil**

Que va afficher ce code ? $x = 1; while ($x &lt; 20) { $x = $x * 2; } echo $x;

Réponse : ________________________________________

**Question 26 — Taille d'un tableau**

$t = [4, 8, 15]; Que va afficher echo count($t); ?

Réponse : ________________________________________

**Question 27 — Les indices**

$t = [4, 8, 15]; Que vaut $t[0] ?

- ☐ **a.** 8
- ☐ **b.** 15
- ☐ **c.** Une erreur, les indices commencent à 1
- ☐ **d.** 4

**Question 28 — Le dernier élément**

Comment accéder au dernier élément d'un tableau $t sans connaître sa taille à l'avance ?

- ☐ **a.** $t[-0]
- ☐ **b.** $t[count($t)]
- ☐ **c.** $t[count($t) - 1]
- ☐ **d.** $t[dernier]

**Question 29 — Somme d'un tableau**

$t = [2, 4, 6]; $s = 0; foreach ($t as $v) { $s += $v; } echo $s; Qu'affiche ce code ?

Réponse : ________________________________________

**Question 30 — Recherche du maximum**

Pour chercher la plus grande valeur d'un tableau $t non vide, quelle est la bonne initialisation de $max avant la boucle ?

- ☐ **a.** $max = 1000000;
- ☐ **b.** $max = $t[0];
- ☐ **c.** $max = 0;
- ☐ **d.** $max = null; sans autre traitement

**Question 31 — Reconnaître un algorithme**

foreach ($t as $v) { if ($v == $cherche) { return true; } } return false; Que fait cet algorithme ?

- ☐ **a.** Il supprime $cherche du tableau
- ☐ **b.** Il trie le tableau
- ☐ **c.** Il compte combien de fois $cherche apparaît
- ☐ **d.** Il teste si la valeur $cherche est présente dans le tableau

**Question 32 — Fonction toute prête**

Quelle fonction PHP native permet de tester si une valeur est présente dans un tableau, comme le code de la question précédente ? La fonction ______ fait exactement cela.

(a) array_find / (b) contains / (c) in_array / (d) has_value

**Question 33 — Compter sous condition**

$cpt = 0; foreach ([3, 8, 5, 12, 7, 6] as $v) { if ($v % 2 == 0) { $cpt++; } } echo $cpt; Qu'affiche ce code ?

Réponse : ________________________________________

**Question 34 — Retour de fonction**

function double($x) { return $x * 2; } echo double(4); Qu'affiche ce code ?

Réponse : ________________________________________

**Question 35 — Le return**

Que fait l'instruction return dans une fonction ?

- ☐ **a.** Elle relance la fonction depuis le début
- ☐ **b.** Elle sauvegarde la valeur dans la session
- ☐ **c.** Elle renvoie une valeur à l'appelant et termine immédiatement l'exécution de la fonction
- ☐ **d.** Elle affiche la valeur à l'écran

**Question 36 — Portée des variables**

Une variable déclarée à l'intérieur d'une fonction PHP est…

- ☐ **a.** Automatiquement sauvegardée entre deux appels
- ☐ **b.** Globale : elle est accessible partout dans le programme
- ☐ **c.** Partagée avec toutes les autres fonctions
- ☐ **d.** Locale : elle n'existe que dans la fonction et disparaît à la fin de son exécution

**Question 37 — Paramètre par défaut**

function f($a, $b = 3) { return $a + $b; } echo f(2); Qu'affiche ce code ?

Réponse : ________________________________________

**Question 38 — Appels imbriqués**

function double($x) { return $x * 2; } echo double(double(3)); Qu'affiche ce code ?

- ☐ **a.** 6
- ☐ **b.** 36
- ☐ **c.** 9
- ☐ **d.** 12

**Question 39 — Les motifs classiques**

Associez chaque motif d'algorithme à son usage.

| | À relier à… |
|---|---|
| Compteur ($cpt++ sous condition) → ______ | • Trouver la plus grande valeur |
| Accumulateur ($s += $v) → ______ | • Retenir qu'un évènement s'est produit pendant le parcours |
| Maximum ($max = $v si $v &gt; $max) → ______ | • Calculer une somme ou un total |
| Drapeau booléen ($trouve = true) → ______ | • Compter les éléments qui respectent un critère |

**Question 40 — Multiple de 3 et de 5**

Quelle condition teste qu'un nombre $n est à la fois multiple de 3 et multiple de 5 ?

- ☐ **a.** $n == 3 && $n == 5
- ☐ **b.** $n % 3 == 0 && $n % 5 == 0
- ☐ **c.** $n % 3 == 0 || $n % 5 == 0
- ☐ **d.** $n / 3 == 0 && $n / 5 == 0


<div style="page-break-before: always;"></div>

## Corrigé

**1.** 8 — *Exact : $x prend la valeur 5, puis 5 + 3.*

**2.** 14 — *Exact : la multiplication est prioritaire, 2 + 12 = 14.*

**3.** (c) Le reste de la division entière — *Exact : 17 % 5 vaut 2, car 17 = 3 × 5 + 2.*

**4.** 2 — *Exact : 17 = 3 × 5 + 2, le reste est 2.*

**5.** (c) 5 — *Exact : $b a reçu une copie de la valeur de $a au moment de l'affectation, il n'est pas lié à $a.*

**6.** (d) $tmp = $a; $a = $b; $b = $tmp; — *Exact, la variable temporaire évite d'écraser une des deux valeurs.*

**7.** Vrai — *Exact, c'est l'incrémentation, très utilisée dans les boucles.*

**8.** (d) 3.5 — *Exact : en PHP la division renvoie un nombre à virgule si nécessaire.*

**9.** (b) mineur — *Exact : 17 &gt;= 18 est faux, c'est donc le bloc else qui s'exécute.*

**10.** && (accepté aussi : and)

**11.** (b) false — *Exact : $a &gt; 3 est vrai, mais $b &gt; 20 est faux. Avec un ET, il suffit d'une condition fausse pour que le tout soit faux.*

**12.** (c) true — *Exact : avec un OU, une seule condition vraie suffit, et $a &gt; 3 est vrai.*

**13.** (b) false — *Exact : $x == 5 est vrai, et l'opérateur ! inverse le résultat.*

**14.** (d) admis — *Exact : 12 &gt;= 16 est faux, on teste la suite : 12 &gt;= 10 est vrai.*

**15.** 5 — *Exact : $i prend les valeurs 0, 1, 2, 3 et 4.*

**16.** 5 — *Exact : $i prend les valeurs 1, 3, 5, 7 et 9.*

**17.** (a) $i = 0; while ($i &lt; 5) { echo $i; $i++; } ; (c) for ($i = 0; $i &lt; 5; $i++) { echo $i; } ; (d) foreach ([0, 1, 2, 3, 4] as $v) { echo $v; } — *Exact, c'est l'équivalent en while. / Exact. / Exact, on parcourt directement les valeurs.*

**18.** (c) La boucle est infinie : $i n'est jamais incrémenté, la condition reste toujours vraie — *Exact, il manque $i++ dans le corps de la boucle.*

**19.** 10 — *Exact : on accumule 1 + 2 + 3 + 4 = 10. C'est le motif de l'accumulateur (somme).*

**20.** 24 — *Exact : 1 × 2 × 3 × 4 = 24 (c'est la factorielle de 4). Notez que $p démarre à 1 et non à 0.*

**21.** (d) break

**22.** (c) Elle abandonne l'itération en cours et passe directement à la suivante — *Exact, contrairement à break qui sort complètement de la boucle.*

**23.** (b) 321 — *Exact : $i démarre à 3 et décroît tant qu'il est supérieur à 0.*

**24.** Vrai — *Exact : la condition est testée après le corps, contrairement au while classique.*

**25.** 32 — *Exact : $x vaut successivement 2, 4, 8, 16 puis 32. À 16 la condition est encore vraie, on double une dernière fois.*

**26.** 3 — *Exact : count() retourne le nombre d'éléments.*

**27.** (d) 4 — *Exact : les indices d'un tableau commencent à 0.*

**28.** (c) $t[count($t) - 1] — *Exact : le dernier indice vaut la taille moins 1, puisque les indices commencent à 0.*

**29.** 12 — *Exact : 2 + 4 + 6 = 12, encore le motif de l'accumulateur.*

**30.** (b) $max = $t[0]; — *Exact : on part du premier élément. Initialiser à 0 échouerait avec un tableau de valeurs toutes négatives.*

**31.** (d) Il teste si la valeur $cherche est présente dans le tableau — *Exact, c'est une recherche séquentielle : on sort dès qu'on trouve.*

**32.** (c) in_array

**33.** 3 — *Exact : les valeurs paires sont 8, 12 et 6. C'est le motif du compteur conditionnel.*

**34.** 8 — *Exact : la fonction retourne 4 × 2.*

**35.** (c) Elle renvoie une valeur à l'appelant et termine immédiatement l'exécution de la fonction — *Exact : tout code placé après le return ne sera jamais exécuté.*

**36.** (d) Locale : elle n'existe que dans la fonction et disparaît à la fin de son exécution — *Exact, c'est la portée (scope) des variables.*

**37.** 5 — *Exact : $b n'est pas fourni, il prend sa valeur par défaut 3, donc 2 + 3.*

**38.** (d) 12 — *Exact : double(3) vaut 6, puis double(6) vaut 12. L'appel intérieur est évalué en premier.*

**39.** Compteur ($cpt++ sous condition) → Compter les éléments qui respectent un critère ; Accumulateur ($s += $v) → Calculer une somme ou un total ; Maximum ($max = $v si $v &gt; $max) → Trouver la plus grande valeur ; Drapeau booléen ($trouve = true) → Retenir qu'un évènement s'est produit pendant le parcours

**40.** (b) $n % 3 == 0 && $n % 5 == 0 — *Exact : un nombre est multiple de 3 si le reste de sa division par 3 vaut 0. Les deux conditions doivent être vraies.*

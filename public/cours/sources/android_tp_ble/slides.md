# Android et le BLE

## Dialoguer avec un objet connecté

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le périphérique

Un ESP32 qui simule une **lampe connectée**.

- Allumer et éteindre la LED.
- Être prévenu quand son état change.
- Changer le nom de la carte.

---

## Question

Comment une application parle-t-elle à un objet posé sur la table ?

---

## Le BLE

Bluetooth **Low Energy** : sans fil, et basse consommation.

Montres, capteurs, serrures, thermostats…

---

## Client et serveur

- Le **serveur** : le périphérique (l'ESP32), qui expose ses données.
- Le **client** : l'application Android, qui s'y connecte.

---

## GATT

```text
Périphérique
└── Service
    ├── Caractéristique (lire)
    ├── Caractéristique (écrire)
    └── Caractéristique (notifier)
```

Chaque service et chaque caractéristique a son **UUID**.

---

## Trois actions

- **Lire** une valeur.
- **Écrire** une valeur.
- **Notifier** : le périphérique prévient, sans qu'on lui demande.

---

## D'abord, observer

**nRF Connect** : explorer les services et les caractéristiques du périphérique.

Avant d'écrire la moindre ligne de code.

---

## Les étapes

1. Vérifier que le BLE est disponible.
2. Demander les permissions.
3. Scanner.
4. Se connecter.
5. Lire et écrire.

---

## Question

Vous demandez la connexion.

La réponse arrive… quand ?

---

## Plus tard

Le BLE est **asynchrone** : on demande, puis on attend la réponse.

Il faut donc gérer l'attente : un loader, au bon moment.

---

## Une boîte à états

Scan, connexion, connecté, déconnecté…

À chaque état son affichage : la liste, un loader, les actions.

---

## Le MVVM, encore

- Le **ViewModel** : le scan, la connexion, les échanges.
- La **vue** : elle affiche ce que les `Flow` lui envoient.

---

## L'état de la LED

```kotlin
// Dans le ViewModel
val connectedDeviceLedStateFlow = MutableStateFlow(false)

// Dans le composant
val ledState by viewModel.connectedDeviceLedStateFlow.collectAsStateWithLifecycle()
```

Le périphérique notifie, le flow change, l'écran suit.

---

## Et quand ça se passe mal ?

Erreurs, déconnexions, timeouts…

Le BLE est simple dans ses actions, exigeant dans sa mise en œuvre : structurez votre code.

---

## Récapitulatif

- **BLE** : un serveur (l'objet), un client (l'application).
- **GATT** : des services, des caractéristiques, des UUID.
- Lire, écrire, notifier.
- Tout est **asynchrone** : des états, des loaders.
- Le ViewModel pilote, la vue observe.

---

## Des questions ?

Place au TP 🚀

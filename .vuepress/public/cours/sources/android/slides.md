# Android

Par [Valentin Brosseau](https://github.com/c4software) / [Playmoweb](https://www.playmoweb.com)

---

## Introduction à Android

---

- Développé par Google
- Créé en 2008
- Actuellement en version 11 (Android R)

---

## Pourquoi Android ?

- Multi marques (Google, Samsung, Xiaomi, Microsoft, …)
- Part de marché
- Ouvert
- Personnalisable
- Le prix

---

## Les défauts d'Android

- La fragmentation
- Un Android ? Non… des Android!

---

## L'architecture

![Architecture](./img/android_architecture.jpg)

---

![Linux ?](./img/linux.gif)

Linux ?

---

## Android is not Linux

Construis autour du noyau Linux mais … c'est tout

- Noyau Linux : Drivers, Batterie, Ram.
- Runtime Android : Fais tourner les applications Android.
- App Framework : Android Framework (Android API).

---

## La sécurité

- Chaque application a son propre utilisateur Linux.
- Les applications sont sandboxées.
- Chaque application tourne dans sa propre « VM ».
- Chaque application a son cycle de vie.

---

## Les API

Deux types :

- SDK Android : Évolue lors des mises à jour de système. (Intégré)
- Play Service : Évolue automatiquement indépendamment de la version de l'OS (En plus… Mais…)

---

## Les langages

---

### Le Code

- Java (Historique)
- Kotlin (_Nouveau_ à privilégier maintenant)

---

### Les Ressources

- xml (Drawables, Layout, Settings, Color, String)
- png / jpeg / 9.png (Images)

---

## Android Studio

- l'IDE
- Java + Kotlin
- Version spéciale de Intellij

---

![Interface](./img/interface.png)

---

## Toolbar

![Interface](./img/toolbar.png)

---

## Créer un émulateur

- Intégré dans Android Studio.
- Performances suffisantes pour tester.
- BLE / Bluetooth non disponible.

---

# Première application

---

- File > New > New Project
- Configurer le projet
- Lancer l'application sans aucune modification (dans un émulateur)

---

## C'est à vous

---

## Structure du projet

---

![Structure dossiers](./img/folders_projects.png)

---

- **src** : Vos sources Kotlin (ou Java).
- **res** : XML, fichiers de configurations, images
  - layout
  - strings
  - drawable…

---

### **R.java.class**

- Généré automatiquement.
- Contiens les références de tous les id.
- Permets l'accès aux ressources depuis votre code :
  - `getString(R.string.title)`
  - `setContentView(R.layout.activity_main)`
  - …

---

## Debugger

- Points d'arrêts.
  - Avec arrêt.
  - Sans arrêt.
  - Conditionnés
- Logs.
- Logs affichés dans le Logcat.

---

## Logcat

![Interface](./img/logcat.png)

---

## Que se passe-t-il lors de la compilation ?

### Avez-vous regardé ?

---

## Un logiciel a été lancé « Gradle »

- Compilation
- Test
- Packaging
- Configurable via un fichier

---

## Gradle

- Open-source.
- Règles / scripts de compilation de votre projet.
- Complètement intégré dans Android Studio (complétion, etc.)

---

## Votre première application

- Activity
- Un Layout associé
- Déclaré dans le « Manifest »

---

## L'activity

- Représente un seul écran.
- Gère tout ce qu'il y a dans l'écran.
- Gère la logique des interactions utilisateurs.
- Possède son propre **cycle de vie**.

---

![Lifecycle](./img/lifecycle.png)

---

![Lifecycle 2](./img/lifecycle2.png)

---

- L'ensemble de vos activity hérite d'une super **Activity**.
- « Override » surcharge des méthodes de base (au début uniquement onCreate).

---

## Un détail qui compte… les layout

- Constraint Layout
- Linear Layout
- Relative Layout
- Grid Layout

---

## Constraint Layout

- Contraint par rapport au « TOP, BOTTOM, START, END » des autres éléments.
- La nouvelle façon de faire.

---

## Les éléments du Layout

- TextView
- Button
- RecyclerView
- ImageView
- …

---

## C'est à vous

Ajouter un bouton dans l'interface et une ImageView.

---

## Et maintenant ?

---

## Le fichier Manifest

- Déclare le nom de l'application.
- Déclare les activités.
- Déclare le thème de l'application.
- L'icône de l'application.
- Configuration de l'application (package…).
- Déclare les permissions.

---

## Permissions ?

![Permissions](./img/permissions.gif)

---

## « Exemple » contenu d'un Manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.playmoweb.demo.dmocourseseo">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

---

## Le dossier `res` en détail

- **anim** : Définition des propriétés d'animation (`R.anim.…`)
- **drawable** : Vos images (png, xml, 9.png…) (`R.drawable.…`)
- **layout** : Vos interfaces un fichier par vue (`R.layout.…`)
- **menu** : Contenu de vos menus (Options Menu, Sub Menu…)
- **values** : « Constantes » de votre application (String, Int, Color, etc)
- **mipmap** : Icônes de votre application.

---

## Le dossier `res` en détail 2

### AKA les ressources alternative

Chaque dossier peut-être redéfini en fonction de la résolution. (`-hdpi`, `-mdpi`, `-xxhdpi`…)

---

![Wow](./img/wow.gif)

---

## Mais ce n’est pas tout !

Chaque dossier peut-être redéfini en fonction… De la langue, de la configuration du « mobile », du thème sombre…

---

![Wow 2](./img/wow2.gif)

---

## Afficher un message à l'utilisateur

---

### Les toasts

![Toast](./img/toast.png)

---

## C'est à vous

Ajouter un Toast dans votre interface

```java
Toast.makeText(this, "Bonjour à tous", Toast.LENGTH_SHORT).show();
```

⚠️ Avec la complétion d'Android Studio

---

### Les Dialog

Interaction « complexe » avec l'utilisateur (Choix…)

![dialog.png](./img/dialog.png)

---

## C'est à vous

Ajouter une Dialog dans votre interface. Nous allons utiliser une library.

[Material Dialog](https://github.com/afollestad/material-dialogs)

---

## Sans librairie

Grâce à [`Material.io`](https://material.io/develop/android/docs/getting-started)

---

## Material ?

Ensemble « de règles » / de bonne pratique pour avoir des interfaces de qualités _ou_ cohérentes.

---

## Ajouter la librairie.

### C'est à vous !

---

## Créer une Dialog avec la proposition de Google

[La documentation](https://material.io/develop/android/components/dialogs)

---

## Interagir avec l'utilisateur

### 3 étapes

- Le layout (ajouter un `id`)
- La méthode `findViewById` (dans le code)
- Le `setOnClickListener(…)`

---

## Version Java

---

## Le listener

```java
tvHello.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(MainActivity.this, "Bonus point", Toast.LENGTH_SHORT).show();
    }
});
```

---

## Le Listener en version « courte »

Android supporte Java 1.8 (dont les lambdas)

---

## Les lambda's

```java
tvHello.setOnClickListener(l -> {
    Toast.makeText(this, "Bonus Point", Toast.LENGTH_LONG).show();
});
```

---

![Migration](./img/migrate_java_1_8.png)

---

## Version Kotlin

Beaucoup moins « verbeux ».

---

### 3 étapes

- Le layout (Ajouter un `id`)
- La méthode `findViewById` (dans le code)
- Le `setOnClickListener(…)`

---

```kotlin
tvHello.setOnClickListener {
    Toast.makeText(this, "Bonus Point", Toast.LENGTH_LONG).show();
};
```

---

Pas de déclaration de `tvHello` ? Bien sur que si, mais ça sera automatique avec `kotlin-android-extension`

---

## Paramètre et le Scope `{ … }`

Petite subtilité du Kotlin. Dans un Scope :

```kotlin
monBtn.setOnClickListener {
    // ICI une variable « it » est accessible. Elle contient la vue.
}
```

Où encore :

```kotlin
listOf<Device>().forEach {
    // « it » dans le cas présent est la valeur _courante_ de l'itération
 }
```

---

Dans votre `Build.gradle` ajouter

---

```gradle
plugins {
    id 'com.android.application' // Déjà présente.
    id 'kotlin-android' // Vous devez déjà l'avoir.
    id 'kotlin-android-extensions' // <- Cette ligne.
}
```

---

## Les ListView (AdapterView)

---

![Adater](./img/adapter.jpg)

---

- **adapter** : gère les données pour les afficher dans la vue.
- L'adapter est associé à la liste.
- Un Datasource est attaché à l'Adapter.
- Les données sont ajoutées dans la Datasource.

---

- [En 3 fichiers version Java](https://gist.github.com/c4software/6687dc4bb1d858bb81a79313f0e81fd9)
- [En 3 fichiers version Kotlin](https://gist.github.com/c4software/95e51417890c68078c14555b2f1d9a03)

---

- [Guide complet](https://guides.codepath.com/android/Using-an-ArrayAdapter-with-ListView)

---

## C'est à vous !

### Ajoutons une RecyclerView « Simple de type String »

---

## C'est complexe… mais des librairies existent

- [FlexibleAdapter](https://github.com/davideas/FlexibleAdapter)
- [Recyclical](https://github.com/afollestad/recyclical) (Kotlin)

---

## C'est à vous !

### Utilisons ensemble la librairie Recyclical

---

## Réorganisons notre code

---

## Organisation du code

- MVP
- ViewModel

---

## Plus simplement …

### Au minimum quelques packages

---

Android c'est très ouvert… Il faut s'imposer une organisation

---

## Quelques packages

- `ui/` (pour l'interface)
- `data/` (pour les données)
- `remote/` (pour la partie accès au API http)

---

Bien évidemment c'est un exemple

(Vous pouvez faire autrement…)

---

### Zoom sur le package ui

- Organisation par « vue » / « activity ».
- On regroupe les fonctionnalités par « vue » (exemple les `Adapters`)

---

### C'est à vous

Réorganisation de votre projet initial.

---

![Package](./img/packages.png)

---

## Pourquoi est-ce important

- Partage de code
- Reprise du code
- Maintenance
- …

---

## Ajout d'une seconde `activity`

---

## Démarrer une autre `activity`

Une astuce…

---

### Dans l'activity à démarrer ajouter

```java
public static Intent getStartIntent(final Context ctx) {
    return new Intent(ctx, MaClass.class);
}
```

```kotlin
companion object {
    fun getStartIntent(context: Context): Intent {
        return Intent(context, MaClass::class.java)
    }
}
```

---

### Et quand on souhaite afficher la vue

```java
startActivity(MaClass.getStartIntent(this));
```

---

## La home

- Design du layout.
- Les contraintes :
  - Le bouton « actions » ne doit pas être actif si pas de périphérique sélectionné.
  - Afficher le logo de L'ESEO.

---

## Exemple

![Layout](./img/layout.png)

---

## Le scan

- Design du layout
- Contrainte
  - Avoir une liste (`listView`)

---

## C'est à vous

- Créer deux Activity :
  - Celle existante qui sera notre page de home.
  - Une nouvelle qui sera la page de scan.

---

## Rappel sur le BLE

- Des Services
- Des Characteristics

---

## Le Bluetooth et Android

- Les permissions
- Différent en fonction d'Android ( > Lolipop et Kotlin )

---

## Deux solutions

- Le coder.
- Utiliser une librairie.

---

## La librairie

- Plus simple (beaucoup moins de question à se poser, version, permissions… )

---

## La librairie (suite)

- [RxAndroidBLE](https://github.com/Polidea/RxAndroidBle)
- Gère le Bluetooth
- Les permissions (presque)
- L'état du Bluetooth
- …

---

## Rx ?

![what](./img/what2.gif)

---

- Multi-thread
- Asynchrone

---

## Asynchrone is hard

(non pas de gif)

---

- Les données sont des streams
- Les traitements sont faits dans d'autres thread que l'UI
- Simplifie le multithread

---

![RxJava](./img/reactivex.png)
[Le site](http://reactivex.io/)

---

## La librairie (suite)

- [Android-Ble-Librairie](https://github.com/NordicSemiconductor/Android-BLE-Library)
- Proposé par … Nordic.
- Assez mal-docummentée.
- Très rapide « simple d'utilisation ».
- Un entredeux « Code / Librairie ».

---

## La version code

- Demander les permissions (Manifest + Code)
- Vérifier si le BLE est disponible
- Filtrer les résultats (ou pas)
- Démarrer le Scan
- Connexion au `BluetoothDevice`

---

## Les permissions

- Localisation ?
- Est-ce que le Bluetooth est actif ?
- Le Manifest
- [Exemple](https://gitlab.com/vbrosseau/eseo-course-2020-kotlin/-/blob/master/app/src/main/java/com/eseo/kotlineseo/ui/scan/ScanActivity.kt)

---

## Les permissions : Le manifest

```xml
<uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

---

## BLE

### Le Scan

---

(Je ne présenterai pas la version Java, mais si vous le souhaitez je vous montrerai)

---

## Vérifier si le BLE est disponible / compatible

```kotlin
private fun isLECompatible(): Boolean {
    return packageManager.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)
}
```

---

## Vérifier les permissions

```kotlin
private fun hasPermission(): Boolean {
    return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
}

private fun askForPermission() {
    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), PERMISSION_REQUEST_LOCATION)
}
```

---

## Après l'acceptation de l'utilisateur

On en parle ?

```kotlin
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    if (requestCode == PERMISSION_REQUEST_LOCATION && grantResults.size == 1) {
        if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // Permission OK => Lancer SCAN
            setupBLE()
        } else {
            // Permission KO => Gérer le cas.
            // Vous devez ici modifier le code pour gérer le cas d'erreur (permission refusée)
            // Avec par exemple une Dialog
        }
    }
}
```

---

## Vérifier si la localisation est active

```kotlin
private fun locationServiceEnabled(): Boolean {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        // This is new method provided in API 28
        val lm = this.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        lm.isLocationEnabled
    } else {
        // This is Deprecated in API 28
        val mode = Settings.Secure.getInt(this.contentResolver, Settings.Secure.LOCATION_MODE, Settings.Secure.LOCATION_MODE_OFF)
        mode != Settings.Secure.LOCATION_MODE_OFF
    }
}
```

---

## Et finalement …

---

## Le Bluetooth

```kotlin
private fun setupBLE() {
    (getSystemService(BLUETOOTH_SERVICE) as BluetoothManager?)?.let { bluetoothManager ->
        bluetoothAdapter = bluetoothManager.adapter
        if (bluetoothAdapter != null && bluetoothManager.adapter.isEnabled) {
            startActivityForResult(Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE), REQUEST_ENABLE_BLE)
        } else {
            scanLeDevice()
        }
    }
}
```

---

## Le BLE : Le scan

```kotlin
private fun scanLeDevice(scanPeriod: Long = 10000) {
    if (!mScanning) {
        bluetoothLeScanner = bluetoothAdapter?.bluetoothLeScanner

        // On vide la liste qui contient les devices actuellement trouvées
        bleDevicesFoundList.clear()

        mScanning = true

        // On lance une tache qui durera « scanPeriod » à savoir donc de base
        // 10 secondes
        handler.postDelayed({
            mScanning = false
            bluetoothLeScanner?.stopScan(leScanCallback)
            Toast.makeText(this, getString(R.string.scan_ended), Toast.LENGTH_SHORT).show()
        }, scanPeriod)

        // On lance le scan
        bluetoothLeScanner?.startScan(scanFilters, scanSettings, leScanCallback)
    }
}
```

---

## Le BLE : Le Scan Gestion des résultats

```kotlin
private val leScanCallback: ScanCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        super.onScanResult(callbackType, result)

        // Ajout dans la liste du nouveau périphérique trouvé (si celui-ci est pas déjà présent)
        val device = Device(result.device.name, result.device.address, result.device)
        if (!bleDevicesFoundList.contains(device)) {
            bleDevicesFoundList.add(device)
        }
    }
}
```

---

## Quelques variables en plus

Dans la class ScanActivity

```kotlin
// REQUEST Code de gestion
companion object {
    const val PERMISSION_REQUEST_LOCATION = 9999
    const val REQUEST_ENABLE_BLE = 9997
}
// L'Adapter permettant de se connecter
private var bluetoothAdapter: BluetoothAdapter? = null

// La connexion actuellement établie
private var currentBluetoothGatt: BluetoothGatt? = null

// « Interface système nous permettant de scanner »
private var bluetoothLeScanner: BluetoothLeScanner? = null

/**
* Gestion du SCAN, recherche des device BLE à proximité
*/

// Parametrage du scan BLE
private val scanSettings = ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY).build()

// On ne retourne que les « Devices » proposant le bon UUID
private var scanFilters: List<ScanFilter> = arrayListOf()

// Variable de fonctionnement
private var mScanning = false
private val handler = Handler()

// La liste des résultats
private val bleDevicesFoundList = emptyDataSourceTyped<Device>()
```

---

## Le RecyclerView

- Un DeviceViewHolder
- Un « modèle Device » (représente l'élément trouvé)

---

## Le layout (item_device.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="20dp"
        android:text="@string/app_name"
        android:textSize="16sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

---

## Le modele

```kotlin
// Représente les données
data class Device (
    var name: String?,
    var mac: String?,
    var device: BluetoothDevice
) {
    override fun equals(other: Any?): Boolean {
        return other is Device && other.mac == this.mac
    }
}
```

- Pouvez-vous m'en dire plus ?

---

## Le ViewHolder

```kotlin
// Représente la vue
class DeviceViewHolder(itemView: View) : ViewHolder(itemView) {
    val name: TextView = itemView.findViewById(R.id.title)
}
```

---

## Initialisation

```kotlin
// On initialise le RecyclerView (Version Recyclycal)
rvDevices.setup {
    withDataSource(bleDevicesFoundList)
    withItem<Device, DeviceViewHolder>(R.layout.item_device) {
        onBind(::DeviceViewHolder) { _, item ->
            // Si nous avons un nom, sinon la MAC sera utilisée
            name.text = item.name.takeIf { !it.isNullOrEmpty() } ?: run { item.mac }
        }
        onClick {
            // Item représente votre « BluetoothDevice »
            // Ici l'action au click (connexion etc)
        }
    }
}
```

---

## Quelle est la méthode à appeler

### Pour lancer le scan

---

### Beaucoup de périphériques non ?

---

## Activer le filtre par Service UUID

Oui, car c'est vrai on détecte trop de périphériques incompatibles !

Remplacer dans votre code `scanFilters` par :

```kotlin
private var scanFilters: List<ScanFilter> = arrayListOf(
    ScanFilter.Builder().setServiceUuid(ParcelUuid(BluetoothLEManager.DEVICE_UUID)).build()
)
```

---

## C'est à vous !

### Implémenter le scan et mettre les résultats dans le RecyclerView

---

## Maintenant que l'on a la liste…

---

## Sélectionner un périphérique…

- Implémenter la méthode `onClick` de votre « RecyclerView ».
- Sauvegarder (de manière `static`) le périphérique dans le `BluetoothLEManager`.
- Changer la vue d'état.

---

```kotlin
onClick {
    Toast.makeText(this@ScanActivity, getString(R.string.trying_connection_to, item.name), Toast.LENGTH_SHORT).show()
    BluetoothLEManager.currentDevice = item.device
    connectToCurrentDevice()
}
```

---

## Le BluetoothLEManager

```kotlin
class BluetoothLEManager {

    companion object {
        var currentDevice: BluetoothDevice? = null

        val DEVICE_UUID: UUID = UUID.fromString("795090c7-420d-4048-a24e-18e60180e23c")
        val CHARACTERISTIC_LED_PIN_UUID: UUID = UUID.fromString("31517c58-66bf-470c-b662-e352a6c80cba")
        val CHARACTERISTIC_BUTTON_PIN_UUID: UUID = UUID.fromString("0b89d2d4-0ea6-4141-86bb-0c5fb91ab14a")
        val CHARACTERISTIC_TOGGLE_LED_UUID: UUID = UUID.fromString("59b6bf7f-44de-4184-81bd-a0e3b30c919b")
        val CHARACTERISTIC_NOTIFY_STATE: UUID = UUID.fromString("d75167c8-e6f9-4f0b-b688-09d96e195f00")
    }
}
```

---

## Organisation

- « Ranger » le `BluetoothLEManager` dans le package `….data.manager`

---

## LocalPreferences

- Sauvegarde d'information dans les préférences de l'application

---

```kotlin
import android.content.Context
import android.content.SharedPreferences

class LocalPreferences private constructor(context: Context) {
    private val sharedPreferences: SharedPreferences = context.getSharedPreferences("MyPref", Context.MODE_PRIVATE)

    fun lastConnectedDeviceName(deviceName: String?) {
        sharedPreferences.edit().putString("selectedDevice", deviceName).apply()
    }

    fun lastConnectedDeviceName(): String? {
        return sharedPreferences.getString("selectedDevice", null)
    }

    companion object {
        private var INSTANCE: LocalPreferences? = null

        fun getInstance(context: Context): LocalPreferences {
            return INSTANCE?.let {
                INSTANCE
            } ?: run {
                INSTANCE = LocalPreferences(context)
                return INSTANCE!!
            }
        }
    }
}
```

---

- « Ranger » le `LocalPreferences` dans le package `….data.local`

---

### Selected Device && LocalPreferences

```kotlin
LocalPreferences.getInstance(this).saveCurrentSelectedDevice("MON_DEVICE_SELECTED");
```

---

## Connexion à un périphérique

---

```kotlin
private fun connectToCurrentDevice() {
    BluetoothLEManager.currentDevice?.let { device ->
        Toast.makeText(this, "Connexion en cours … $device", Toast.LENGTH_SHORT).show()

        currentBluetoothGatt = device.connectGatt(
            this,
            false,
            gattCallback)
    }
}
```

---

## gattCallBack

![what](./img/what.gif)

---

### Le GattCallback gère la connexion à votre périphérique

- Fourni par le SDK (mais vide).
- Méthodes à implémenter :
  - onServicesDiscovered
  - onConnectionStateChange
  - onCharacteristicChanged

---

## Un exemple à implémenter

### À ajouter dans votre class `BluetoothLEManager`

---

```kotlin
open class GattCallback(
        val onConnect: () -> Unit,
        val onNotify: (characteristic: BluetoothGattCharacteristic) -> Unit,
        val onDisconnect: () -> Unit
    ) : BluetoothGattCallback() {

        /**
         * Méthode appelée au moment où les « services » ont été découverts
         */
        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            super.onServicesDiscovered(gatt, status)
            if (status == BluetoothGatt.GATT_SUCCESS) {
                onConnect()
            } else {
                onDisconnect()
            }
        }

        /**
         * Méthode appelée au moment du changement d'état de la stack BLE
         */
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            super.onConnectionStateChange(gatt, status, newState)
            when (newState) {
                BluetoothGatt.STATE_CONNECTED -> gatt.discoverServices()
                BluetoothProfile.STATE_DISCONNECTED -> onDisconnect()
            }
        }

        /**
         * Méthodes appelées à chaque notification BLE (en cas de changement de la led)
         */
        override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
            super.onCharacteristicChanged(gatt, characteristic)
            if (characteristic.uuid == CHARACTERISTIC_NOTIFY_STATE) {
                onNotify(characteristic)
            }
        }
    }
```

---

## Comment ça fonctionne ?

- Callback a implémenté dans votre code:
  - onConnect
  - onDisconnect
  - onNotify

---

## Les CallBacks ça vous parle ?

---

```kotlin
device.connectGatt(
    this,
    false,
    BluetoothLEManager.GattCallback(
        onConnect = {
            // On indique à l'utilisateur que nous sommes correctement connecté
            runOnUiThread {
                // Nous sommes connecté au device, on active les notifications pour être notifié si la LED change d'état
                enableListenBleNotify()

                // On change la vue « pour être en mode connecté »
                setUiMode(true)

                // On sauvegarde dans les « LocalPreference » de l'application le nom du dernier préphérique
                // sur lequel nous nous sommes connecté avec BluetoothLEManager.currentDevice?.name

                // JE VOUS LAISSE APPELER LE LocalPreferences COMME VU PLUS HAUT

            }
        },
        onNotify = { runOnUiThread { handleToggleLedNotificationUpdate(it) } },
        onDisconnect = { runOnUiThread { disconnectFromCurrentDevice() } })
)
```

---

## runOnUiThread ?

- Nous permet de lancer une action sur le bon Thread

---

## Attend quoi ?

- Quelques explications !

---

## Déconnexion du périphérique

```kotlin
    currentBluetoothGatt?.disconnect()
    BluetoothLEManager.currentDevice = null
    setUiMode(false)
```

---

## Réagir aux notifications BLE

```kotlin
/**
* Méthode appelée à chaque notification du Device, la notification contient le nouvel
* état de la led
*/
private fun handleToggleLedNotificationUpdate(characteristic: BluetoothGattCharacteristic) {
    if (characteristic.getStringValue(0).equals("on", ignoreCase = true)) {
        ledStatus.setImageResource(R.drawable.led_on)
    } else {
        ledStatus.setImageResource(R.drawable.led_off)
    }
}
```

---

## SetUiMode

Méthode permettant de changer l'état de l'interface en fonction de la connexion.

---

```kotlin
private fun setUiMode(isConnected: Boolean) {
    if (isConnected) {
        // Connecté à un périphérique
        bleDevicesFoundList.clear()
        rvDevices.visibility = View.GONE
        startScan.visibility = View.GONE
        currentConnexion.visibility = View.VISIBLE
        currentConnexion.text = getString(R.string.connected_to, BluetoothLEManager.currentDevice?.name)
        disconnect.visibility = View.VISIBLE
        toggleLed.visibility = View.VISIBLE
    } else {
        // Non connecté, reset de la vue.
        rvDevices.visibility = View.VISIBLE
        startScan.visibility = View.VISIBLE
        ledStatus.visibility = View.GONE
        currentConnexion.visibility = View.GONE
        disconnect.visibility = View.GONE
        toggleLed.visibility = View.GONE
    }
}
```

---

## À votre avis… Une autre façon de faire ?

---

## Et allumer / éteindre la led ?

### L'interaction va fonctionner avec un Service (déclarer via un UUID)

---

## Récupérer le service « commande »

Récupération de « service » BLE (via UUID) qui nous permettra d'envoyer / recevoir des commandes

```kotlin
private fun getMainDeviceService(): BluetoothGattService? {
    return currentBluetoothGatt?.let { bleGatt ->
        val service = bleGatt.getService(BluetoothLEManager.DEVICE_UUID)
        service?.let {
            return it
        } ?: run {
            Toast.makeText(this, getString(R.string.uuid_not_found), Toast.LENGTH_SHORT).show()
            return null;
        }
    } ?: run {
        Toast.makeText(this, getString(R.string.not_connected), Toast.LENGTH_SHORT).show()
        return null
    }
}
```

---

## Changer l'état de la LED

En écrivant sur la bonne Characteristics

```kotlin
private fun toggleLed() {
    getMainDeviceService()?.let { service ->
        val toggleLed = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_TOGGLE_LED_UUID)
        toggleLed.setValue("1")
        currentBluetoothGatt?.writeCharacteristic(toggleLed)
    }
}
```

---

## C'est à vous !

---

## Exemple de Layout

![scan layout](./img/scan_layout.png)

---

## Interagir avec le RaspberryPi via Internet

---

## Android et le réseau

---

## La permission

- `<uses-permission android:name="android.permission.INTERNET"/>`

---

Depuis Android > 6, c'est **automatique** (plus nécessaire)

---

## Les appels réseau

---

### Mais avant…

## Les Threads

---

- Les appels ne doivent **pas** être fait dans le Thread UI.
- Le traitement de l'affichage doit être fait sur le Thread UI.

---

![what](./img/what2.gif)

---

## Les librairies

- OkHttp
- GSON
- Retrofit
- CoRoutines Kotlin

---

## Les CoRoutines Kotlin

- Quelques explications…
- Asynchrone, vous connaissez ?
- Un mot magique… `suspend`

```apacheconf
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.8'
```

---

## OkHttp (3)

- RestClient
- Http2
- Gestion du cache
- Intercepteur de requête

---

```apacheconf
implementation 'com.squareup.okhttp3:okhttp:4.7.2'
implementation 'com.squareup.okhttp3:logging-interceptor:4.7.2'
```

---

## GSON

- Sérialisation / Deserialisation automatique entre un JSON et un Objet Java / Kotlin

---

```apacheconf
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

---

## Retrofit

- Une API Http qui s'utilise comme une « Interface Java ».
- Conversion de données (mapping automatique des objets 🚀).
- Utilise des annotations (@GET, @POST, @PUT, @DELETE, @HEAD, …)
- Compatible CoRoutine (mais également sans)

---

```apacheconf
implementation 'com.squareup.okhttp3:okhttp:4.7.2'
implementation 'com.squareup.okhttp3:logging-interceptor:4.7.2'
```

---

## Les annotations

```kotlin
@GET("/status")
suspend fun readStatus(@Query("identifier") identifier: String): LedStatus

@POST("/status")
suspend fun writeStatus(@Body status: LedStatus): LedStatus
```

---

## Bon… Et maintenant !

---

## Deux fichiers

- Le `ApiService.kt` (l'interface et le builder pour la partie HTTP)
- La classe / un modèle `LedStatus`

---

## L'interface (et le builder)

### Deux méthodes

- ReadStatus
- WriteStatus

---

## L'objet de retour et d'action

`LedStatus`

---

## Le model : LedStatus

---

- Construit par vous pour interagir.
- Construit automatiquement par GSON pour avoir le Status.

---

[Télécharger le fichier LedStatus.java](https://gist.github.com/c4software/11c170fde7c1f93b0ae9e562856c56a8)
(À ranger dans le package `….data.modele`.

---

## Le ApiService

---

- Définition du « connecteur » HTTP.
- Définition des méthodes.

---

[Télécharge le fichier ApiService.kt](https://gist.github.com/c4software/b3eb79cc5649d12e497dbf6d35649dcd)
(À ranger dans le package `….data.service`)

---

BuildConfig.URI_REMOTE_SERVER ?

---

## Externaliser la conf c'est bien !

![Niiice](./img/nice.gif)

---

```apacheconf
defaultConfig {
    buildConfigField "String", "URI_REMOTE_SERVER", "\"https://us-central1-eseo-course.cloudfunctions.net\""
…
}
```

---

## C'est à vous

### Configurer votre projet

---

## Faire un appel réseau

---

### 1 - Obtenir l'APIService

```kotlin
ApiService.Builder.getInstance();
```

---

### 2 - L'appel réseau

```kotlin
CoroutineScope(Dispatchers.IO).launch {
    runCatching {
        val readStatus = ApiService.instance.readStatus(ledStatus.identifier)
        ledStatus.setStatus(readStatus.status)
        setVisualState()
    }
}
```

On en parle non ?

---

### 3 - Profit !

---

## C'est à vous !

- Création d'une nouvelle activity (`ActionActivity.kt`)
- Création du Layout `activity_action.xml`
- Implémentation des méthodes sur les boutons.

---

## ActionActivity

Ne pas oublier la méthode static !

```kotlin
companion object {
    private const val IDENTIFIANT_ID = "IDENTIFIANT_ID"

    fun getStartIntent(context: Context, identifiant: String?): Intent {
        return Intent(context, RemoteActivity::class.java).apply {
            putExtra(IDENTIFIANT_ID, identifiant)
        }
    }
}
```

⚠️ Utiliser la méthode depuis la `MainActivity.kt`

---

## Hey ?! Mais c'est pas le même non ?

Oui… On passe des paramètres… Parlons-en des paramètres justement…

---

## Récupérer le paramètre

```kotlin
private fun getIdentifiant(): String? {
    return intent.extras?.getString(IDENTIFIANT_ID, null)
}
```

---

## Exemple de Layout

![Action Layout](./img/action_layout.png)

---

## L'ActionActivity

### En quelques mots…

- Vous devez obtenir l'état de la led en arrivant dans la Vue (OnResume).
- Vous devez modifier l'état de la led avec le bouton.
- Vous devez pouvoir obtenir l'état de la led aux cliques sur le symbole « refresh ».

---

## C'est à vous

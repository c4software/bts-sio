# Télécommande Bluetooth & Réseau

::: details Sommaire
[[toc]]
:::

## Objectif

Concevoir une application qui va :

- Avoir 3 activités.
- Scanner les périphériques Bluetooth.
- Connexion à notre « Équipement ».
- Commander la LED / afficher l'état.

::: tip Rappels

L'application que vous réaliserez doit respecter les bonnes pratiques vues en cours. Et cela doit être le reflet de votre travail personnel.

:::

## Rappels des fonctionnalités de l'équipement

L'équipement dispose des caractéristiques suivantes :

- Allumer / Éteindre la LED.
- Récupérer l'état de la LED (via une notification BLE).
- Récupérer le nombre de fois que la LED a été allumée et éteinte.
- Récupérer la liste des réseaux WiFi disponibles environnants.
- Changer le nom de l'équipement.
- Allumer ou éteindre la LED en suivant un paterne (1 étant allumé, 0 étant éteint. Alors S.O.S = `1010100011101110111000101010`).
- Définir les informations de connexion au réseau WiFi.
- **Si un réseau Wifi est défini**, lancement d'un serveur sur le port 80 permettant :
  - D'afficher l'état de la LED (`/status`).
  - D'allumer / éteindre la LED (`/toggle`).

## Projet final

- Gérer correctement les messages d'erreurs (permissions, liste périphérique vide, etc.).
- Ranger / organiser « correctement le code source » dans des packages comme vus précédemment.
- Ne scanner que les équipements compatibles.
- Vider la liste après une connexion (et ne pas avoir de doublons dans la liste).
- Personnaliser l'icône de l'application (mettre le logo de l'école + ampoule).
- L'ensemble des textes **doivent-être** dans le `strings.xml`.
- Empêcher la rotation de l'ensemble des activity (`manifest.xml`).
- Permettre l'allumage / l'extinction de la LED.
- Afficher le nombre de fois que la LED a été allumée / éteinte.
- Implémenter la partie notification BLE.
- Implémenter l'animation de la LED en envoyant une chaîne de caractères du type `1010100011101110111000101010`.
- Bonus: Afficher la liste des réseaux WiFi disponibles.
- Bonus: Changer le nom de l'équipement.
- Bonus: Proposer à l'utilisateur une liste de pattern (S.O.S, etc.) pour animer la LED.
- Bonus: Le réseau WiFi est défini, il est possible d'allumer / éteindre la LED via un accès HTTP.

## Les activités

![Home](./ressources/main.png)
![Scan](./ressources/scan.png)
![Réseau et LED](./ressources/led.png)

## Représentation UML

![UML](./ressources/uml.png)

## Le scan

- Création d'un Adapter pour les résultats du scan.
- Création d'un objet représentant « Un Device ».
- Création du layout permettant de l'afficher.
- Ajout des permissions.
- Ajout du code « de scan Bluetooth ».
- Pour chaque périphérique « Ajout d'un device » dans la `Datasource`.

### Les permissions

```xml
<!-- Nouvelles permissions permettant de scanner en BLE Android après 11 -->    
<uses-permission android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation"
    tools:targetApi="s" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<!-- Ancienne permission pour permettre l'usage du BLE  Android avant 11 inclus -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Vérifier les permissions

```kotlin
/**
    * Gère l'action après la demande de permission.
    * 2 cas possibles :
    * - Réussite 🎉.
    * - Échec (refus utilisateur).
    */
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)

    if (requestCode == PERMISSION_REQUEST_LOCATION) {
        if (grantResults[0] == PackageManager.PERMISSION_GRANTED && locationServiceEnabled()) {
            // Permission OK & service de localisation actif => Nous pouvons lancer l'initialisation du BLE.
            // En appelant la méthode setupBLE(), La méthode setupBLE() va initialiser le BluetoothAdapter et lancera le scan.
        } else if (!locationServiceEnabled()) {
            // Inviter à activer la localisation
            startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS))
        } else {
            // Permission KO => Gérer le cas.
            // Vous devez ici modifier le code pour gérer le cas d'erreur (permission refusé)
            // Avec par exemple une Dialog
        }
    }
}

/**
 * Permet de vérifier si l'application possede la permission « Localisation ». OBLIGATOIRE pour scanner en BLE
 * Sur Android 11, il faut la permission « BLUETOOTH_CONNECT » et « BLUETOOTH_SCAN »
 * Sur Android 10 et inférieur, il faut la permission « ACCESS_FINE_LOCATION » qui permet de scanner en BLE
 */
private fun hasPermission(): Boolean {
    return if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
        ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
    } else {
        ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_SCAN) == PackageManager.PERMISSION_GRANTED
    }
}

/**
 * Demande de la permission (ou des permissions) à l'utilisateur.
 * Sur Android 11, il faut la permission « BLUETOOTH_CONNECT » et « BLUETOOTH_SCAN »
 * Sur Android 10 et inférieur, il faut la permission « ACCESS_FINE_LOCATION » qui permet de scanner en BLE
 */
private fun askForPermission() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
        ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), PERMISSION_REQUEST_LOCATION)
    } else {
        ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.BLUETOOTH_CONNECT, Manifest.permission.BLUETOOTH_SCAN), PERMISSION_REQUEST_LOCATION)
    }
}
```

### Vérifier si la localisation est active

Permets de vérifier que l'utilisateur a bien activé la localisation.

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

### Le code du scan

Permet de lancer le scan à l'aide de l'adapter Bluetooth.

```kotlin
/**
 * La méthode « registerForActivityResult » permet de gérer le résultat d'une activité.
 * Ce code est appelé à chaque fois que l'utilisateur répond à la demande d'activation du Bluetooth (visible ou non)
 * Si l'utilisateur accepte et donc que le BLE devient disponible, on lance le scan.
 * Si l'utilisateur refuse, on affiche un message d'erreur (Toast).
 */
val registerForResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
    if (it.resultCode == Activity.RESULT_OK) {
        // Le Bluetooth est activé, on lance le scan
        scanLeDevice()
    } else {
        // Bluetooth non activé, vous DEVEZ gérer ce cas autrement qu'avec un Toast.
        Toast.makeText(this, "Bluetooth non activé", Toast.LENGTH_SHORT).show()
    }
}

 /**
  * Récupération de l'adapter Bluetooth & vérification si celui-ci est actif.
  * Si il n'est pas actif, on demande à l'utilisateur de l'activer. Dans ce cas, au résultat le code présent dans « registerForResult » sera appelé.
  * Si il est déjà actif, on lance le scan.
  */
@SuppressLint("MissingPermission")
private fun setupBLE() {
    (getSystemService(BLUETOOTH_SERVICE) as BluetoothManager?)?.let { bluetoothManager ->
        bluetoothAdapter = bluetoothManager.adapter
        if (bluetoothAdapter != null && !bluetoothManager.adapter.isEnabled) {
            registerForResult.launch(Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE))
        } else {
            scanLeDevice()
        }
    }
}
```

::: tip SetupBLE
Cette méthode va vérifier si l'adapter Bluetooth est disponible et si il est activé. Si il n'est pas activé, on va demander à l'utilisateur de l'activer. S’il est activé, on lance le scan.
:::

Place à présent au code permettant de lancer le scan. Pour cela, nous allons utiliser l'adapter Bluetooth. Nous allons donc utiliser la méthode `startScan` de l'adapter Bluetooth.

Afin de ne pas scanner de manière infinie, nous allons utiliser une tache qui va s'arrêter au bout de 10 secondes. Cette tache va appeler la méthode `stopScan` de l'adapter Bluetooth.

⚠️ Si vous oubliez d'arrêter le scan, le système vous bloquera et vous ne pourrez plus scanner. Il faudra alors redémarrer LE TÉLÉPHONE pour pouvoir scanner à nouveau. De même, si vous scannez trop souvent, le système vous bloquera également. ⚠️

```kotlin
// Le scan va durer 10 secondes seulement, sauf si vous passez une autre valeur comme paramètre.
private fun scanLeDevice(scanPeriod: Long = 10000) {
    if (!mScanning) {
        bluetoothLeScanner = bluetoothAdapter?.bluetoothLeScanner

        // On vide la liste qui contient les devices actuellement trouvés
        bleDevicesFoundList.clear()

        // Évite de scanner en double
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

::: tip ScanLeDevice
Cette méthode va lancer le scan pendant 10 secondes. Si vous passez une autre valeur en paramètre, le scan durera cette valeur en millisecondes. Elle va aussi lancer une tache qui va s'arrêter au bout de 10 secondes. Cette tache va appeler la méthode « stopScan » de l'adapter Bluetooth.

- `scanFilters` : Permet de filtrer les résultats du scan (UUID, etc.).
- `scanSettings` : Permet de configurer le scan. Comme par exemple la puissance du scan.
- `leScanCallback` : Callback appelé à chaque périphérique trouvé. Nous allons voir comment le gérer dans la suite.

:::

### Gestions des résultats

```kotlin
// Callback appelé à chaque périphérique trouvé.
private val leScanCallback: ScanCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        super.onScanResult(callbackType, result)

        // C'est ici que nous allons créer notre « Device » et l'ajouter dans la dataSource de notre RecyclerView

        // val device = Device(result.device.name, result.device.address, result.device)
        // if (!device.name.isNullOrBlank() && !bleDevicesFoundList.contains(device)) {
        //     bleDevicesFoundList.add(device)
        //     Indique à l'adapter que nous avons ajouté un élément, il va donc se mettre à jour
        //     findViewById<RecyclerView>(R.id.rvDevices).adapter?.notifyItemInserted(bleDevicesFoundList.size - 1)
        // }
    }
}
```

::: tip Rappel sur les callbacks

Le principe du Callback est simple, il permet de définir une méthode qui sera appelée à un moment précis. Par exemple, lorsque le scan a trouvé un périphérique, lorsque le scan est terminé, etc.

Le Scan BLE est un processus asynchrone, c'est-à-dire que le scan se fait en arrière-plan. C'est pour cela que nous devons utiliser des callbacks, notre interface utilisateur ne doit pas être bloquée pendant le scan et sera mis à jour à chaque fois que nous recevons un résultat.

:::

### Quelques variables

Sans ces variables, votre activité ne fonctionnera pas.

```kotlin
// Gestion du Bluetooth
// L'Adapter permettant de se connecter
private var bluetoothAdapter: BluetoothAdapter? = null

// La connexion actuellement établie
private var currentBluetoothGatt: BluetoothGatt? = null

// « Interface système nous permettant de scanner »
private var bluetoothLeScanner: BluetoothLeScanner? = null

// Parametrage du scan BLE
private val scanSettings = ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY).build()

// On ne retourne que les « Devices » proposant le bon UUID
private var scanFilters: List<ScanFilter> = arrayListOf(
//  ScanFilter.Builder().setServiceUuid(ParcelUuid(BluetoothLEManager.DEVICE_UUID)).build()
)

// Variable de fonctionnement
private var mScanning = false
private val handler = Handler(Looper.getMainLooper())

// DataSource de notre adapter.
private val bleDevicesFoundList = arrayListOf<Device>()

```

### Le RecyclerView

Rappels sur le RecyclerView :

- Il permet d'afficher une liste d'éléments.
- Il est composé d'un `LayoutManager` et d'un `Adapter`.
- Il est plus performant qu'un `ListView`.
- Il nécessite un `ViewHolder` pour fonctionner.

### Le Model

Représente les données que nous allons afficher dans notre RecyclerView. Ici nous allons créer un objet « Device » qui va contenir le nom, l'adresse MAC et l'objet « BluetoothDevice ». Nous allons aussi redéfinir la méthode `equals` pour pouvoir comparer deux objets « Device ». Nous allons utiliser cette méthode pour ne pas ajouter deux fois le même périphérique dans la liste.

```kotlin
import android.bluetooth.BluetoothDevice

// Représente les données
data class Device (
    var name: String?,
    var mac: String?,
    var device: BluetoothDevice
) {
    override fun equals(other: Any?): Boolean {
        // On compare les MAC, pour ne pas ajouté deux fois le même device dans la liste.
        return other is Device && other.mac == this.mac
    }
}
```

### L'adapter

L'adapter permet de gérer la liste des devices trouvés. Il va donc nous permettre de créer une vue pour chaque élément de la liste. Il va aussi nous permettre de gérer les interactions avec les éléments de la liste. Par exemple, si l'utilisateur clique sur un élément de la liste, on va pouvoir récupérer l'objet « Device » correspondant et l'utiliser pour se connecter.

```kotlin
class DeviceAdapter(private val deviceList: ArrayList<Device>, private val onClick: ((selectedDevice: Device) -> Unit)? = null) : RecyclerView.Adapter<DeviceAdapter.ViewHolder>() {

    // Comment s'affiche ma vue
    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        /**
         * Méthode appelée par la vue pour afficher les données
         * Ici nous faisons le lien entre les données et la vue (itemView)
         */
        fun showItem(device: Device, onClick: ((selectedDevice: Device) -> Unit)? = null) {
            itemView.findViewById<TextView>(R.id.title).text = device.name

            // Action au clique sur un élément de la liste
            if (onClick != null) {
                itemView.setOnClickListener {
                    onClick(device)
                }
            }
        }
    }

    // Retourne une « vue » / « layout » pour chaque élément de la liste
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.list_item_device, parent, false)
        return ViewHolder(view)
    }

    // Connect la vue ET la données, cette méthode est appelée à chaque fois que l'élément devient visible à l'écran
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.showItem(deviceList[position], onClick)
    }

    // Retourne le nombre d'éléments dans la liste
    override fun getItemCount(): Int {
        return deviceList.size
    }

}
```

### Initialisation du RecyclerView

Pour fonctionner correctement, le RecyclerView doit être initialisé. Pour cela, nous allons utiliser une méthode qui va nous permettre de définir un « LayoutManager » et un « Adapter » à votre RecyclerView.

Dans mon Layout, j'ai un RecyclerView avec l'id `rvDevices`.

```kotlin
/*
 * Méthode qui initialise le recycler view.
 */
private fun setupRecycler() {
    val rvDevice = findViewById<RecyclerView>(R.id.rvDevices) // Récupération du RecyclerView présent dans le layout
    rvDevice.layoutManager = LinearLayoutManager(this) // Définition du LayoutManager, Comment vont être affichés les éléments, ici en liste
    rvDevice.adapter = DeviceAdapter(bleDevicesFoundList) { device ->
        // Le code écrit ici sera appelé lorsque l'utilisateur cliquera sur un élément de la liste.
        // C'est un « callback », c'est-à-dire une méthode qui sera appelée à un moment précis.
        // Évidemment, vous pouvez faire ce que vous voulez. Nous nous connecterons plus tard à notre périphérique

        // Pour la démo, nous allons afficher un Toast avec le nom du périphérique choisi par l'utilisateur.
        Toast.makeText(this@ScanActivity, "Clique sur $device", Toast.LENGTH_SHORT).show()
    }
}
```

::: tip Où appeler cette méthode ?
Nous allons appeler cette méthode dans la méthode `onCreate` de notre activité. En effet, nous voulons que le RecyclerView soit initialisé dès le démarrage de l'activité. Et nous voulons que le RecyclerView soit initialisé une seule fois.
:::

### Gérer la compatibilité du mobile

Dans le code de **l'activity BLE**, si vous souhaitez gérer l'ensemble des cas d'erreurs :

- Équipement non compatible BLE.
- Vérifications des permissions.
- Vérification du service de localisation.

```kotlin
override fun onResume() {
    super.onResume()

    if (!packageManager.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
        // Test si le téléphone est compatible BLE, si c'est pas le cas, on finish() l'activity
        Toast.makeText(this, getString(R.string.not_compatible), Toast.LENGTH_SHORT).show()
        finish()
    } else if (hasPermission() && locationServiceEnabled()) {
        // Lancer suite => Activation BLE + Lancer Scan
        setupBLE()
    } else if(!hasPermission()) {
        // On demande la permission
        askForPermission()
    } else {
        // On demande d'activer la localisation
        // Idéalement on demande avec un activité.
        // À vous de me proposer mieux (Une activité, une dialog, etc)
        startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS));
    }
}
```

::: tip Pourquoi `onResume()` ?

C'est une méthode qui est appelée à chaque fois que l'activité est visible à l'écran. C'est donc le meilleur endroit pour vérifier si l'équipement est compatible BLE, si les permissions sont accordées, etc.

:::

### La classe LocalPreferences ?

Cette classe va nous permettre de sauvegarder de manière « persistant » des paramètres.

Pour l'instant nous allons sauvegarder le nom de L'ESP 32, ça nous sera utile pour la suite.

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

### Connexion à un périphérique

```kotlin
private fun connectToCurrentDevice() {
    BluetoothLEManager.currentDevice?.let { device ->
        Toast.makeText(this, "Connexion en cours … $device", Toast.LENGTH_SHORT).show()

        currentBluetoothGatt = device.connectGatt(
            this,
            false,
            BluetoothLEManager.GattCallback(
                onConnect = {
                    // On indique à l'utilisateur que nous sommes correctement connecté
                    runOnUiThread {
                        // Nous sommes connecté au device, on active les notifications pour être notifié si la LED change d'état.

                        // À IMPLÉMENTER
                        // Vous devez appeler la méthode qui active les notifications BLE
                        // enableListenBleNotify()

                        // On change la vue « pour être en mode connecté »
                        setUiMode(true)

                        // On sauvegarde dans les « LocalPréférence » de l'application le nom du dernier préphérique
                        // sur lequel nous nous sommes connecté

                        // À IMPLÉMENTER EN FONCTION DE CE QUE NOUS AVONS DIT ENSEMBLE
                    }
                },
                onNotify = { runOnUiThread {
                    // VOUS DEVEZ APPELER ICI LA MÉTHODE QUI VA GÉRER LE CHANGEMENT D'ÉTAT DE LA LED DANS L'INTERFACE
                    // Si it (BluetoothGattCharacteristic) est pour l'UUID CHARACTERISTIC_NOTIFY_STATE
                    // Alors vous devez appeler la méthode qui va gérer le changement d'état de la LED
                    /* if(it.getUuid() == BluetoothLEManager.CHARACTERISTIC_NOTIFY_STATE) {
                        // À IMPLÉMENTER
                    } else if (it.getUuid() == BluetoothLEManager.CHARACTERISTIC_GET_COUNT) {
                        // À IMPLÉMENTER
                    } else if (it.getUuid() == BluetoothLEManager.CHARACTERISTIC_GET_WIFI_SCAN) {
                        // À IMPLÉMENTER
                    } */
                 } },
                onDisconnect = { runOnUiThread { disconnectFromCurrentDevice() } })
        )
    }
}
```

Un peu de détails sur le code :

- `BluetoothLEManager.currentDevice?.let { device ->` : Permet de vérifier que le périphérique est bien défini. S’il est défini, on peut continuer.
- `device.connectGatt` : Permet de se connecter au périphérique. Cette méthode prend en paramètre un contexte, un booléen et un callback. Le contexte est l'activité dans laquelle nous sommes. Le booléen permet de savoir si nous voulons nous connecter automatiquement au périphérique. Le callback est une classe que nous allons définir un peu plus tard.
- `BluetoothLEManager.GattCallback` : Cette classe va nous permettre de gérer les différents événements qui vont se produire lors de la connexion. Par exemple, lorsque nous sommes connectés, lorsque nous sommes déconnectés, lorsque nous recevons une notification, etc. (Encore un callback).
- `onConnect` : Méthode appelée lorsque nous sommes connectés au périphérique.
- `onNotify` : Méthode appelée lorsque nous recevons une notification de la part de la carte ESP32.
- `onDisconnect` : Méthode appelée lors de la déconnexion du périphérique.

Ici nous avons donc un système de « boîte à état », notre téléphone en fonction du moment de la connexion va appeler les bonnes méthodes afin d'ajuster l'interface en fonction du moment où nous nous trouvons.

### Déconnexion

Cette méthode va nous permettre de déconnecter le périphérique. Elle est appelée dans le cas où nous avons cliqué sur le bouton « Déconnexion ».

```kotlin
/**
* On demande la déconnexion du device
*/
private fun disconnectFromCurrentDevice() {
    currentBluetoothGatt?.disconnect()
    BluetoothLEManager.currentDevice = null
    setUiMode(false)
}
```

La méthode `setUiMode` va nous permettre de changer l'interface en fonction de si nous sommes connectés ou non. Nous l'écrirons un peu plus tard.

### BluetothLEManager

Cette classe va nous permettre de gérer les différentes méthodes de connexion, déconnexion, etc. Elle va aussi nous permettre de gérer les différents UUIDs, vous devez la placer dans un fichier à part. Par exemple `BluetoothLEManager.kt`, évidemment, vous le rangerez dans le bon package.

Ce code est relativement générique, il est complètement possible de le réutiliser dans d'autres projets.

```kotlin
class BluetoothLEManager {

    companion object {
        var currentDevice: BluetoothDevice? = null

        /**
         * Les UUIDS sont des identifiants uniques qui permettent d'identifier les services et les caractéristiques.
         * Ces UUIDs sont définis dans le code de l'ESP32.
         */
        val DEVICE_UUID: UUID = UUID.fromString("795090c7-420d-4048-a24e-18e60180e23c")
        val CHARACTERISTIC_TOGGLE_LED_UUID: UUID = UUID.fromString("59b6bf7f-44de-4184-81bd-a0e3b30c919b")
        val CHARACTERISTIC_NOTIFY_STATE: UUID = UUID.fromString("d75167c8-e6f9-4f0b-b688-09d96e195f00")
        val CHARACTERISTIC_GET_COUNT: UUID = UUID.fromString("a877d87f-60bf-4ad5-ba61-56133b2cd9d4")
        val CHARACTERISTIC_GET_WIFI_SCAN: UUID = UUID.fromString("10f83060-64f8-11ee-8c99-0242ac120002")
        val CHARACTERISTIC_SET_DEVICE_NAME: UUID = UUID.fromString("1497b8a8-64f8-11ee-8c99-0242ac120002")
        val CHARACTERISTIC_SET_WIFI_CREDENTIALS: UUID = UUID.fromString("1a0f3c0c-64f8-11ee-8c99-0242ac120002")
    }

    /**
     * Définitionn de la classe GattCallback qui va nous permettre de gérer les différents événements BLE
     * Elle implémente la classe BluetoothGattCallback fournie par Android
     */
    open class GattCallback(
        val onConnect: () -> Unit,
        val onNotify: (characteristic: BluetoothGattCharacteristic) -> Unit,
        val onDisconnect: () -> Unit
    ) : BluetoothGattCallback() {

        /**
         * Méthode appelé au moment ou les « services » ont été découvert
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
         * Méthode appelé au moment du changement d'état de la stack BLE
         */
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            super.onConnectionStateChange(gatt, status, newState)
            when (newState) {
                BluetoothGatt.STATE_CONNECTED -> gatt.discoverServices()
                BluetoothProfile.STATE_DISCONNECTED -> onDisconnect()
            }
        }

        /**
         * Méthodes appelée à chaque notifications BLE
         */
        override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
            super.onCharacteristicChanged(gatt, characteristic)
            onNotify(characteristic)
        }
    }
}
```

### setUiMode ?

Cette méthode permet de changer l'état de l'interface en fonction de la connexion. Si nous sommes connectés, nous allons afficher le nom du périphérique, le bouton de déconnexion, etc. Si nous ne sommes pas connectés, nous allons afficher la liste des périphériques, le bouton de scan, etc.

::: tip Un instant 👋
Le code proposé en exemple ne fonctionnera que si vous avez utilisé les mêmes identifiants que moi **évidemment**.
:::

Je vous laisse écrire la méthode, mais voici **un exemple de code** :

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

::: tip Un instant 👋

D'où vienne les variables `bleDevicesFoundList`, `rvDevices`, `startScan`, `currentConnexion`, `disconnect`, `toggleLed`, `ledStatus` ?

Ces variables sont des variables de classe, elles sont définies dans le fichier `ScanActivity.kt` et sont initialisées dans la méthode `onCreate`. Pour les initialiser, vous devrez utiliser le `findViewById` comme vous le faites habituellement.

Dans mon cas, j'ai défini ces variables comme ceci :

```kotlin

private var rvDevices: RecyclerView? = null
private var startScan: Button? = null
private var currentConnexion: TextView? = null
private var disconnect: Button? = null
private var toggleLed: Button? = null
private var ledStatus: TextView? = null

override fun onCreate() {
    // ... Reste du code

    rvDevices = findViewById<RecyclerView>(R.id.rvDevices)
    startScan = findViewById<Button>(R.id.startScan)
    currentConnexion = findViewById<View>(R.id.currentConnexion)
    disconnect = findViewById<View>(R.id.disconnect)
    toggleLed = findViewById<View>(R.id.toggleLed)
    ledStatus = findViewById<View>(R.id.ledStatus)
}
```

:::

### Le layout

L'idée est que vous puissiez écrire vous-même votre **propre layout** (en respectant les contraintes de base). Je vous propose donc de vous aider avec un exemple de layout.

::: details Je pense que vous êtes capable de le faire sans aide… mais si vous le souhaitez voilà un layout possible

Je ne souhaite pas retrouver ce layout dans vos projets, je souhaite que vous le fassiez vous-même. Cependant, si vous êtes bloqué, voici un exemple de layout :

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:animateLayoutChanges="true"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvDevices"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@id/startScan"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:listitem="@layout/item_device" />

    <ImageView
        android:id="@+id/ledStatus"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:src="@drawable/led_off"
        android:visibility="gone"
        app:layout_constraintBottom_toTopOf="@id/currentConnexion"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/currentConnexion"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20sp"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/ledStatus"
        app:layout_constraintVertical_chainStyle="packed"
        tools:text="Connecté à XXXXXX"
        tools:visibility="visible" />

    <Button
        android:id="@+id/startScan"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:text="@string/start_scan"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@id/disconnect"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/toggleLed"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:text="@string/toggleLed"
        android:visibility="gone"
        app:layout_constraintBottom_toTopOf="@id/disconnect"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        tools:visibility="visible" />

    <Button
        android:id="@+id/disconnect"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:text="@string/deconnection"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@id/startScan"
        tools:visibility="visible" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

:::

### Interagir avec la LED

Maintenant que nous sommes connectés, nous allons pouvoir interagir avec la LED. Pour cela, nous allons utiliser les UUIDs que nous avons définis dans la classe `BluetoothLEManager`. Nous allons donc récupérer le service qui nous intéresse, puis nous allons récupérer la caractéristique qui nous intéresse. Enfin, nous allons envoyer la valeur `1` pour toggle la LED (c'est-à-dire l'allumer ou l'éteindre).

```kotlin
/**
 * Récupération de « service » BLE (via UUID) qui nous permettra d'envoyer / recevoir des commandes
 */
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

/**
 * On change l'état de la LED (via l'UUID de toggle)
 */
private fun toggleLed() {
    getMainDeviceService()?.let { service ->
        val toggleLed = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_TOGGLE_LED_UUID)
        toggleLed.setValue("1")
        currentBluetoothGatt?.writeCharacteristic(toggleLed)
    }
}
```

### Ajout des actions aux cliques sur l'interface

Actuellement votre Scan fonctionne, mais vous le lancez au démarrage de l'activité. C'est une solution, mais pas la plus propre. Nous allons donc faire évoluer le code pour que le scan ne se lance que si l'utilisateur clique sur le bouton « Scan ».

Pour vous guider dans la mission, vous devez dans le `onCreate` ajouter des lignes de code similaire à :

```kotlin
startScan.setOnClickListener { 
    askForPermission()
}

disconnect.setOnClickListener {
    // Appeler la bonne méthode
}

toggleLed.setOnClickListener {
    // Appeler la bonne méthode
}
```

## Partie 2 : Les notifications BLE

Si votre code fonctionne, un simple copier-coller devrait suffire pour faire fonctionner la partie 3.

### Notification BLE

L'ESP 32 dispose également de différents services de « Notification ». Les services sont les suivants :

- `CHARACTERISTIC_NOTIFY_STATE` : Permet de savoir si la LED est allumée ou éteinte.
- `CHARACTERISTIC_GET_COUNT` : Permet de récupérer le nombre de fois que la LED a été allumée.
- `CHARACTERISTIC_GET_WIFI_SCAN` : Permet de récupérer la liste des réseaux WiFi disponibles.

Nous allons donc devoir l'écouter et changer l'état de notre interface.

```kotlin
private fun enableListenBleNotify() {
    getMainDeviceService()?.let { service ->
        Toast.makeText(this, getString(R.string.enable_ble_notifications), Toast.LENGTH_SHORT).show()
        // Indique que le GATT Client va écouter les notifications sur le charactérisque
        val notificationStatus = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_NOTIFY_STATE)
        val notificationLedCount = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_GET_COUNT)
        val wifiScan = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_GET_WIFI_SCAN)

        currentBluetoothGatt?.setCharacteristicNotification(notificationStatus, true)
        currentBluetoothGatt?.setCharacteristicNotification(notificationLedCount, true)
        currentBluetoothGatt?.setCharacteristicNotification(wifiScan, true)
    }
}

private fun handleToggleLedNotificationUpdate(characteristic: BluetoothGattCharacteristic) {
    if (characteristic.getStringValue(0).equals("on", ignoreCase = true)) {
        ledStatus.setImageResource(R.drawable.led_on)
    } else {
        ledStatus.setImageResource(R.drawable.led_off)
    }
}

private fun handleCountLedChangeNotificationUpdate(characteristic: BluetoothGattCharacteristic) {
    characteristic.getStringValue(0).toIntOrNull()?.let {
        ledCount.text = getString(R.string.led_count, it)
    }
}

private fun handleOnNotifyNotificationReceived(characteristic: BluetoothGattCharacteristic) {
    // TODO : Vous devez ici récupérer la liste des réseaux WiFi disponibles et les afficher dans une liste.
    // Vous pouvez utiliser un RecyclerView pour afficher la liste des réseaux WiFi disponibles.
}
```

## Partie 3 : Les animations sauvegardées

Une fois connectés au périphérique, nous pouvons lui envoyer une trame plus longue (de type 0 et 1) pour lui indiquer de jouer une animation. Cette trame est envoyée sur l'UUID `59b6bf7f-44de-4184-81bd-a0e3b30c919b`.

En fonction de la trame envoyée, la LED va jouer une animation. Vous devez donc créer une interface qui permet de choisir une animation et de l'envoyer au périphérique.

Bonus : Vous pouvez créer une interface qui permet de sauvegarder une animation (dans le LocalPreferences) et de la jouer.

Exemple d'envoi d'une animation :

```kotlin
private fun sendAnimation() {
    getMainDeviceService()?.let { service ->
        val toggleLed = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_TOGGLE_LED_UUID)
        toggleLed.setValue("101010101111011111000010101010")
        currentBluetoothGatt?.writeCharacteristic(toggleLed)
    }
}
```

## Partie 4 : Récupérer la liste des réseaux WiFi

L'ESP32 dispose d'un service qui permet de récupérer la liste des réseaux WiFi disponibles. Ce service est disponible sur l'UUID `10f83060-64f8-11ee-8c99-0242ac120002`. Une fois connecté au périphérique, vous pouvez observer les notifications sur l'UUID `10f83060-64f8-11ee-8c99-0242ac120002` il émettra une notification toutes les 30 secondes avec la liste des réseaux WiFi disponibles et leur force de signal.

## Partie 5 : Changer le nom du périphérique

En utilisant l'UUID `1497b8a8-64f8-11ee-8c99-0242ac120002` vous pouvez changer le nom du périphérique. Vous devez donc créer une interface qui permet de changer le nom du périphérique.

```kotlin
private fun sendDeviceName() {
    getMainDeviceService()?.let { service ->
        val setDeviceName = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_SET_DEVICE_NAME)
        setDeviceName.setValue("LeNomDuDevice") // Le ESEO- est ajouté automatiquement
        currentBluetoothGatt?.writeCharacteristic(setDeviceName)
    }
}
```

### Bonus : Le HTTP

La carte ESP32 dispose d'un serveur HTTP. Celui-ci ne sera actif que si vous envoyez une trame de configuration WiFi.

```kotlin
private fun sendWifiConfig() {
    getMainDeviceService()?.let { service ->
        val setCredential = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_SET_WIFI_CREDENTIALS)
        setCredential.setValue("SSID|PASSWORD")
        currentBluetoothGatt?.writeCharacteristic(setCredential)
    }
}
```

Une fois connecté au réseau WiFi, votre ESP32 expose 2 endpoints :

- `/status` : Permet de récupérer l'état de la LED (`{state: "ON", count: 0}` ou `{state: "OFF", count: 0}`).
- `/toggle` : Permet de changer l'état de la LED (`{state: "ON", count: 0}` ou `{state: "OFF", count: 0}`).

Pour appeler ces endpoints, vous pouvez utiliser la librairie `OkHttp` ou `Retrofit`. Nous pouvons en discuter ensemble si vous avez des questions, vous avez à votre disposition [la documentation ici](./network.md)

### Fourniture des sources

Votre code doit être disponible sur un dépôt Git (GitHub, GitLab, Bitbucket, etc.). Vous devez fournir l'URL de votre dépôt dans le formulaire ci-dessous. 

[Partage du projet](https://docs.google.com/forms/d/e/1FAIpQLScZ5WflYVlnNzQlwYwdJsCc9izqthZJT9zVQK6HWsypgb06Bg/viewform)

⚠️ N'oubliez pas de mettre votre nom et prénom dans le formulaire.

Bravo, vous avez terminé le projet ! 🎉

::: tip Rappel

L'intégration de Git dans Android Studio est très simple. Celle-ci est disponible dans le menu `VCS` de la barre de menu, elle vous permettra de réaliser l'ensemble des opérations de base sur votre dépôt Git.

Vous avez un doute ? N'hésitez pas à me demander de l'aide :).

:::
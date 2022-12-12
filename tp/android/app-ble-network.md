# Télécommande Bluetooth & Réseau

## Objectif

Concevoir une application qui va :

- Avoir 3 activités.
- Scanner les périphériques Bluetooth.
- Connexion à notre « Équipement ».
- Commander la LED / afficher l'état.

## Projet final

- Gérer correctement les messages d'erreurs (permissions, liste périphérique vide, etc.).
- Gérer correctement le non-accès au réseau (pour la partie, télécommande via Internet).
- Ranger / organiser « correctement le code source » dans des packages comme vus précédemment.
- Ne scanner que les Raspberry Pi.
- Vider la liste après une connexion (et ne pas avoir de doublons dans la liste).
- Personnaliser l'icône de l'application (mettre le logo de l'école + ampoule).
- L'ensemble des textes **doivent-être** dans le `strings.xml`.
- Empêcher la rotation de l'ensemble des activity (`manifest.xml`).
- Empêcher l'accès à la partie HTTP si le téléphone est en mode avion ou n'a pas accès à Internet.
- Bonus : Implémenter la partie notification BLE.
- Bonus : Commander en HTTP un équipement sur lequel nous ne nous sommes jamais connectés (intégrer un scan Bluetooth dans un dialog de type liste, en ne dupliquant pas le code).

## Les activités

![Home](./ressources/main.png)
![Scan](./ressources/scan.png)
![Réseau et LED](./ressources/led.png)

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
            // Permission OK => Nous pouvons lancer l'initialisation du BLE.
            // En appelant la méthode setupBLE()
            // La méthode setupBLE() va initialiser le BluetoothAdapter et lancera le scan.
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

```kotlin
 /**
  * Récupération de l'adapter Bluetooth & vérification si celui-ci est actif
  */
@SuppressLint("MissingPermission")
private fun setupBLE() {
    (getSystemService(BLUETOOTH_SERVICE) as BluetoothManager?)?.let { bluetoothManager ->
        bluetoothAdapter = bluetoothManager.adapter
        if (bluetoothAdapter != null && !bluetoothManager.adapter.isEnabled) {
            registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
                if (it.resultCode == Activity.RESULT_OK) {
                    // Le Bluetooth est activé, on lance le scan
                    scanLeDevice()
                } else {
                    // Bluetooth non activé
                    Toast.makeText(this, "Bluetooth non activé", Toast.LENGTH_SHORT).show()
                }
            }.launch(Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE))
        } else {
            scanLeDevice()
        }
    }
}
```

::: tip SetupBLE
Cette méthode va vérifier si l'adapter Bluetooth est disponible et si il est activé. Si il n'est pas activé, on va demander à l'utilisateur de l'activer. Si il est activé, on lance le scan.
:::

```kotlin
// Le scan va durer 10 secondes seulement, sauf si vous passez une autre valeur comme paramètre.
private fun scanLeDevice(scanPeriod: Long = 10000) {
    if (!mScanning) {
        bluetoothLeScanner = bluetoothAdapter?.bluetoothLeScanner

        // On vide la liste qui contient les devices actuellement trouvés
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

::: tip ScanLeDevice
Cette méthode va lancer le scan pendant 10 secondes. Si vous passez une autre valeur en paramètre, le scan durera cette valeur en millisecondes. Elle va aussi lancer une tache qui va s'arrêter au bout de 10 secondes. Cette tache va appeler la méthode « stopScan » de l'adapter Bluetooth.

- `scanFilters` : Permet de filtrer les résultats du scan.
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
//        ScanFilter.Builder().setServiceUuid(ParcelUuid(BluetoothLEManager.DEVICE_UUID)).build()
)

// Variable de fonctionnement
private var mScanning = false
private val handler = Handler(Looper.getMainLooper())

// DataSource de notre adapter.
private val bleDevicesFoundList = arrayListOf<Device>()

```

### Le RecyclerView

### Le Model

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

### L'adatper

L'adapter permet de gérer la liste des devices trouvés. Il va donc nous permettre de créer une vue pour chaque élément de la liste. Il va aussi nous permettre de gérer les interactions avec les éléments de la liste. Par exemple, si l'utilisateur clique sur un élément de la liste, on va pouvoir récupérer l'objet « Device » correspondant et l'utiliser pour se connecter.

```kotlin
class DeviceAdapter(private val deviceList: ArrayList<Device>, private val onClick: ((selectedDevice: Device) -> Unit)? = null) : RecyclerView.Adapter<DeviceAdapter.ViewHolder>() {

    // Comment s'affiche ma vue
    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun showItem(device: Device, onClick: ((selectedDevice: Device) -> Unit)? = null) {
            itemView.findViewById<TextView>(R.id.title).text = device.name

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

    // Connect la vue ET la données
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.showItem(deviceList[position], onClick)
    }

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
 * Alternativement, vous pouvez utiliser une librairie comme Recyclical.
 */
private fun setupRecycler() {
    val rvDevice = findViewById<RecyclerView>(R.id.rvDevices)
    rvDevice.layoutManager = LinearLayoutManager(this)
    rvDevice.adapter = DeviceAdapter(bleDevicesFoundList) { device ->
        // Évidemment, ici, vous pouvez faire ce que vous voulez. Nous nous connecterons plus tard à notre périphérique
        Toast.makeText(this@ScanActivity, "Clique sur $device", Toast.LENGTH_SHORT).show()
    }
}
```

::: tip Où appeler cette méthode ?

Nous allons appeler cette méthode dans la méthode `onCreate` de notre activité.

:::

### Gérer la compatibilité du mobile

Dans le code de **l'activity BLE**, si vous souhaitez gérer l'ensembles des cas d'erreurs :

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

On va appeler cette méthode dans la méthode `onResume` de notre activité. C'est une méthode qui est appelée à chaque fois que l'activité est visible à l'écran. C'est donc le meilleur endroit pour vérifier si l'équipement est compatible BLE, si les permissions sont accordées, etc.

:::

### La classe LocalPreferences ?

Cette classe va nous permettre de sauvegarder de manière « persistant » des paramètres.

Pour l'instant nous allons sauvegarder le nom raspberryPi, ça nous sera utile lors de la prochaine étape (connexion HTTP)

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
                    // Exemple, handleToggleLedNotificationUpdate(it)
                 } },
                onDisconnect = { runOnUiThread { disconnectFromCurrentDevice() } })
        )
    }
}
```

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

### BluetothLEManager

Cette classe va nous permettre de gérer les différentes méthodes de connexion, déconnexion, etc. Elle va aussi nous permettre de gérer les différents UUIDs, vous devez la placer dans un fichier à part. Par exemple `BluetoothLEManager.kt`, évidemment vous le rangerez dans le bon package.

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
         * Méthodes appelée à chaque notifications BLE (en cas de changement de la led)
         */
        override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
            super.onCharacteristicChanged(gatt, characteristic)
            if (characteristic.uuid == CHARACTERISTIC_NOTIFY_STATE) {
                onNotify(characteristic)
            }
        }
    }
}
```

### setUiMode ?

Cette méthode permet de changer l'état de l'interface en fonction de la connexion.

Je vous laisse écrire la méthode mais petite aide :

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

### Interagir avec la LED

Maintenant que nous sommes connecté, nous allons pouvoir interagir avec la LED. Pour cela, nous allons utiliser les UUIDs que nous avons défini dans la classe `BluetoothLEManager`. Nous allons donc récupérer le service qui nous intéresse, puis nous allons récupérer la caractéristique qui nous intéresse. Enfin, nous allons envoyer la valeur `1` pour toggle la LED (c'est à dire l'allumer ou l'éteindre).

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

Nous avons nos méthodes, mais elles ne sont actuellement pas appelées par une action utilisateur. Pour vous guider dans la mission, vous devez dans le `OnCreate` ajouter des lignes de code similaire à :

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

::: danger Vous lanciez le scan au démarrage de l'activité

Pour rendre votre application plus « propre », vous devez lancer le scan uniquement si l'utilisateur clique sur le bouton « Scan ». Pour cela, vous allez devoir modifier la méthode `onResume` pour qu'elle ne lance pas le scan.

:::

## Télécommande via Internet

Nécessite le « nom » du périphérique (donc d'un scan précédent).

- Modifier la vue de la home pour que nous ne puissions pas cliquer sur le bouton.
- L'activité ne doit pas être accessible. (elle doit `finish()` si pas de `getCurrentSelectedDevice() == null`)
- Créer un nouveau model `LedStatus`

### La classe LedStatus

```kotlin
/**
 * LedStatus model
 */
data class LedStatus(var identifier: String = "", var status: Boolean = false) {
    fun setIdentifier(identifier: String): LedStatus {
        this.identifier = identifier
        return this
    }

    fun setStatus(status: Boolean): LedStatus {
        this.status = status
        return this
    }

    fun reverseStatus(): LedStatus {
        return setStatus(!status)
    }

    fun clone(): LedStatus {
        return LedStatus(identifier, status)
    }
}
```

### Nouvelles dépendances Gradle

```groovy
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.4'

implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation 'com.squareup.okhttp3:okhttp:4.9.3'
implementation 'com.squareup.okhttp3:logging-interceptor:4.9.3'
```

### la classe APIService

```kotlin

/**
 * ApiService
 */
interface ApiService {

    @GET("/status")
    suspend fun readStatus(@Query("identifier") identifier: String): LedStatus

    @POST("/status")
    suspend fun writeStatus(@Body status: LedStatus): LedStatus

    companion object {
        /**
         * Création d'un singleton pour la simplicité, mais normalement nous utilisons plutôt un
         * injecteur de dépendances.
         */
        val instance = build()

        /**
         * Création de l'objet qui nous permettra de faire les appels d'API
         */
        private fun build(): ApiService {
            val gson = GsonBuilder().create() // JSON deserializer/serializer

            // Create the OkHttp Instance
            val okHttpClient = OkHttpClient.Builder()
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .addInterceptor(HttpLoggingInterceptor().setLevel(if (BuildConfig.DEBUG) HttpLoggingInterceptor.Level.BODY else HttpLoggingInterceptor.Level.NONE))
                .addInterceptor(Interceptor { chain: Interceptor.Chain ->
                    val request = chain.request().newBuilder().addHeader("Accept", "application/json").build()
                    chain.proceed(request)
                })
                .build()

            return Retrofit.Builder()
                .baseUrl(BuildConfig.URI_REMOTE_SERVER)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()
                .create(ApiService::class.java)
        }
    }
}
```

### Exemple d'utilisation

```kotlin
// Récupération de l'état depuis le serveur
private fun getStatus() {
    CoroutineScope(Dispatchers.IO).launch {
        runCatching {
            val readStatus = ApiService.instance.readStatus(ledStatus.identifier)
            ledStatus.setStatus(readStatus.status)
            setVisualState()
        }
    }
}
```

### Notification BLE

La Raspberry Pi dispose également d'un service de « Notification ». Les notifications sont envoyées à chaque changement d'état de la LED (local ou via le réseau). Cette notification est envoyée sur l'UUID `d75167c8-e6f9-4f0b-b688-09d96e195f00`.

```kotlin
private fun enableListenBleNotify() {
    getMainDeviceService()?.let { service ->
        Toast.makeText(this, getString(R.string.enable_ble_notifications), Toast.LENGTH_SHORT).show()
        // Indique que le GATT Client va écouter les notifications sur le charactérisque
        val notification = service.getCharacteristic(BluetoothLEManager.CHARACTERISTIC_NOTIFY_STATE)

        currentBluetoothGatt?.setCharacteristicNotification(notification, true)
    }
}

private fun handleToggleLedNotificationUpdate(characteristic: BluetoothGattCharacteristic) {
    if (characteristic.getStringValue(0).equals("on", ignoreCase = true)) {
        ledStatus.setImageResource(R.drawable.led_on)
    } else {
        ledStatus.setImageResource(R.drawable.led_off)
    }
}
```

### Fourniture des sources

[Partage du projet](https://docs.google.com/forms/d/e/1FAIpQLScZ5WflYVlnNzQlwYwdJsCc9izqthZJT9zVQK6HWsypgb06Bg/viewform)

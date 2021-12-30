<template><h1 id="telecommande-bluetooth-reseau" tabindex="-1"><a class="header-anchor" href="#telecommande-bluetooth-reseau" aria-hidden="true">#</a> Télécommande Bluetooth &amp; Réseau</h1>
<h2 id="objectif" tabindex="-1"><a class="header-anchor" href="#objectif" aria-hidden="true">#</a> Objectif</h2>
<p>Concevoir une application qui va :</p>
<ul>
<li>Avoir 3 activités.</li>
<li>Scanner les périphériques Bluetooth.</li>
<li>Connexion à notre « Équipement ».</li>
<li>Commander la LED / afficher l'état.</li>
</ul>
<h2 id="projet-final" tabindex="-1"><a class="header-anchor" href="#projet-final" aria-hidden="true">#</a> Projet final</h2>
<ul>
<li>Gérer correctement les messages d'erreurs (permissions, liste périphérique vide, etc.).</li>
<li>Gérer correctement le non-accès au réseau (pour la partie, télécommande via Internet).</li>
<li>Ranger / organiser « correctement le code source » dans des packages comme vus précédemment.</li>
<li>Ne scanner que les Raspberry Pi.</li>
<li>Vider la liste après une connexion (et ne pas avoir de doublons dans la liste).</li>
<li>Personnaliser l'icône de l'application (mettre le logo de l'école + ampoule).</li>
<li>L'ensemble des textes <strong>doivent-être</strong> dans le <code>strings.xml</code>.</li>
<li>Empêcher la rotation de l'ensemble des activity (<code>manifest.xml</code>).</li>
<li>Empêcher l'accès à la partie HTTP si le téléphone est en mode avion ou n'a pas accès à Internet.</li>
<li>Bonus : Implémenter la partie notification BLE.</li>
<li>Bonus : Commander en HTTP un équipement sur lequel nous ne nous sommes jamais connectés (intégrer un scan Bluetooth dans un dialog de type liste, en ne dupliquant pas le code).</li>
</ul>
<h2 id="les-activites" tabindex="-1"><a class="header-anchor" href="#les-activites" aria-hidden="true">#</a> Les activités</h2>
<p><img src="@source/tp/android/ressources/main.png" alt="Home">
<img src="@source/tp/android/ressources/scan.png" alt="Scan">
<img src="@source/tp/android/ressources/led.png" alt="Réseau et LED"></p>
<h2 id="le-scan" tabindex="-1"><a class="header-anchor" href="#le-scan" aria-hidden="true">#</a> Le scan</h2>
<ul>
<li>Création d'un Adapter pour les résultats du scan.</li>
<li>Création d'un objet représentant « Un Device ».</li>
<li>Création du layout permettant de l'afficher.</li>
<li>Ajout des permissions.</li>
<li>Ajout du code « de scan Bluetooth ».</li>
<li>Pour chaque périphérique « Ajout d'un device » dans la <code>Datasource</code>.</li>
</ul>
<h3 id="les-permissions" tabindex="-1"><a class="header-anchor" href="#les-permissions" aria-hidden="true">#</a> Les permissions</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-feature</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.hardware.bluetooth_le<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">android:</span>required</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.INTERNET<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.BLUETOOTH<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.BLUETOOTH_ADMIN<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.ACCESS_FINE_LOCATION<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="verifier-les-permissions" tabindex="-1"><a class="header-anchor" href="#verifier-les-permissions" aria-hidden="true">#</a> Vérifier les permissions</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token comment">/**
     * Gère l'action après la demande de permission.
     * 2 cas possibles :
     * - Réussite 🎉.
     * - Échec (refus utilisateur).
     */</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span>requestCode<span class="token operator">:</span> Int<span class="token punctuation">,</span> permissions<span class="token operator">:</span> Array<span class="token operator">&lt;</span><span class="token keyword">out</span> String<span class="token operator">></span><span class="token punctuation">,</span> grantResults<span class="token operator">:</span> IntArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>requestCode <span class="token operator">==</span> PERMISSION_REQUEST_LOCATION <span class="token operator">&amp;&amp;</span> grantResults<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>grantResults<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> PackageManager<span class="token punctuation">.</span>PERMISSION_GRANTED <span class="token operator">&amp;&amp;</span> <span class="token function">locationServiceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// Permission OK => Lancer SCAN</span>
                <span class="token function">setupBLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">locationServiceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// Inviter à activer la localisation</span>
                <span class="token function">startActivity</span><span class="token punctuation">(</span><span class="token function">Intent</span><span class="token punctuation">(</span>Settings<span class="token punctuation">.</span>ACTION_LOCATION_SOURCE_SETTINGS<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// Permission KO => Gérer le cas.</span>
                <span class="token comment">// Vous devez ici modifier le code pour gérer le cas d'erreur (permission refusé)</span>
                <span class="token comment">// Avec par exemple une Dialog</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/**
     * Permet de vérifier si l'application possede la permission « Localisation ». OBLIGATOIRE pour scanner en BLE
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ContextCompat<span class="token punctuation">.</span><span class="token function">checkSelfPermission</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>ACCESS_FINE_LOCATION<span class="token punctuation">)</span> <span class="token operator">==</span> PackageManager<span class="token punctuation">.</span>PERMISSION_GRANTED
    <span class="token punctuation">}</span>

    <span class="token comment">/**
     * Demande de la permission (ou des permissions) à l'utilisateur.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">askForPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ActivityCompat<span class="token punctuation">.</span><span class="token function">requestPermissions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span>Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>ACCESS_FINE_LOCATION<span class="token punctuation">)</span><span class="token punctuation">,</span> PERMISSION_REQUEST_LOCATION<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="verifier-si-la-localisation-est-active" tabindex="-1"><a class="header-anchor" href="#verifier-si-la-localisation-est-active" aria-hidden="true">#</a> Vérifier si la localisation est active</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">locationServiceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Build<span class="token punctuation">.</span>VERSION<span class="token punctuation">.</span>SDK_INT <span class="token operator">>=</span> Build<span class="token punctuation">.</span>VERSION_CODES<span class="token punctuation">.</span>P<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// This is new method provided in API 28</span>
        <span class="token keyword">val</span> lm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>Context<span class="token punctuation">.</span>LOCATION_SERVICE<span class="token punctuation">)</span> <span class="token keyword">as</span> LocationManager
        lm<span class="token punctuation">.</span>isLocationEnabled
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// This is Deprecated in API 28</span>
        <span class="token keyword">val</span> mode <span class="token operator">=</span> Settings<span class="token punctuation">.</span>Secure<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>contentResolver<span class="token punctuation">,</span> Settings<span class="token punctuation">.</span>Secure<span class="token punctuation">.</span>LOCATION_MODE<span class="token punctuation">,</span> Settings<span class="token punctuation">.</span>Secure<span class="token punctuation">.</span>LOCATION_MODE_OFF<span class="token punctuation">)</span>
        mode <span class="token operator">!=</span> Settings<span class="token punctuation">.</span>Secure<span class="token punctuation">.</span>LOCATION_MODE_OFF
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="le-code-du-scan" tabindex="-1"><a class="header-anchor" href="#le-code-du-scan" aria-hidden="true">#</a> Le code du scan</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">/**
* Récupération de l'adapter Bluetooth &amp; vérification si celui-ci est actif
*/</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">setupBLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>BLUETOOTH_SERVICE<span class="token punctuation">)</span> <span class="token keyword">as</span> BluetoothManager<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> bluetoothManager <span class="token operator">-></span>
        bluetoothAdapter <span class="token operator">=</span> bluetoothManager<span class="token punctuation">.</span>adapter
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bluetoothAdapter <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>bluetoothManager<span class="token punctuation">.</span>adapter<span class="token punctuation">.</span>isEnabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">startActivityForResult</span><span class="token punctuation">(</span><span class="token function">Intent</span><span class="token punctuation">(</span>BluetoothAdapter<span class="token punctuation">.</span>ACTION_REQUEST_ENABLE<span class="token punctuation">)</span><span class="token punctuation">,</span> REQUEST_ENABLE_BLE<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">scanLeDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Le scan va durer 10 secondes seulement, sauf si vous passez une autre valeur comme paramètre.</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">scanLeDevice</span><span class="token punctuation">(</span>scanPeriod<span class="token operator">:</span> Long <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mScanning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bluetoothLeScanner <span class="token operator">=</span> bluetoothAdapter<span class="token operator">?</span><span class="token punctuation">.</span>bluetoothLeScanner

        <span class="token comment">// On vide la liste qui contient les devices actuellement trouvés</span>
        bleDevicesFoundList<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        mScanning <span class="token operator">=</span> <span class="token boolean">true</span>

        <span class="token comment">// On lance une tache qui durera « scanPeriod » à savoir donc de base</span>
        <span class="token comment">// 10 secondes</span>
        handler<span class="token punctuation">.</span><span class="token function">postDelayed</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            mScanning <span class="token operator">=</span> <span class="token boolean">false</span>
            bluetoothLeScanner<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">stopScan</span><span class="token punctuation">(</span>leScanCallback<span class="token punctuation">)</span>
            Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>scan_ended<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> scanPeriod<span class="token punctuation">)</span>

        <span class="token comment">// On lance le scan</span>
        bluetoothLeScanner<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">startScan</span><span class="token punctuation">(</span>scanFilters<span class="token punctuation">,</span> scanSettings<span class="token punctuation">,</span> leScanCallback<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="gestions-des-resultats" tabindex="-1"><a class="header-anchor" href="#gestions-des-resultats" aria-hidden="true">#</a> Gestions des résultats</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Callback appelé à chaque périphérique trouvé.</span>
<span class="token keyword">private</span> <span class="token keyword">val</span> leScanCallback<span class="token operator">:</span> ScanCallback <span class="token operator">=</span> <span class="token keyword">object</span> <span class="token operator">:</span> <span class="token function">ScanCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onScanResult</span><span class="token punctuation">(</span>callbackType<span class="token operator">:</span> Int<span class="token punctuation">,</span> result<span class="token operator">:</span> ScanResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onScanResult</span><span class="token punctuation">(</span>callbackType<span class="token punctuation">,</span> result<span class="token punctuation">)</span>

        <span class="token comment">// C'est ici que nous allons créer notre « device » et l'ajouter dans le RecyclerView (Datasource)</span>

        <span class="token comment">//val device = Device(result.device.name, result.device.address, result.device)</span>
        <span class="token comment">// if (!bleDevicesFoundList.contains(device)) {</span>
        <span class="token comment">//     bleDevicesFoundList.add(device)</span>
        <span class="token comment">// }</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="quelques-variables" tabindex="-1"><a class="header-anchor" href="#quelques-variables" aria-hidden="true">#</a> Quelques variables</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// REQUEST Code de gestion</span>
<span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token keyword">val</span> PERMISSION_REQUEST_LOCATION <span class="token operator">=</span> <span class="token number">9999</span>
    <span class="token keyword">const</span> <span class="token keyword">val</span> REQUEST_ENABLE_BLE <span class="token operator">=</span> <span class="token number">9997</span>
<span class="token punctuation">}</span>

<span class="token comment">// Gestion du Bluetooth</span>
<span class="token comment">// L'Adapter permettant de se connecter</span>
<span class="token keyword">private</span> <span class="token keyword">var</span> bluetoothAdapter<span class="token operator">:</span> BluetoothAdapter<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">// La connexion actuellement établie</span>
<span class="token keyword">private</span> <span class="token keyword">var</span> currentBluetoothGatt<span class="token operator">:</span> BluetoothGatt<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">// « Interface système nous permettant de scanner »</span>
<span class="token keyword">private</span> <span class="token keyword">var</span> bluetoothLeScanner<span class="token operator">:</span> BluetoothLeScanner<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">/**
    * Gestion du SCAN, recherche des device BLE à proximité
    */</span>

<span class="token comment">// Parametrage du scan BLE</span>
<span class="token keyword">private</span> <span class="token keyword">val</span> scanSettings <span class="token operator">=</span> ScanSettings<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setScanMode</span><span class="token punctuation">(</span>ScanSettings<span class="token punctuation">.</span>SCAN_MODE_LOW_LATENCY<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// On ne retourne que les « Devices » proposant le bon UUID</span>
<span class="token keyword">private</span> <span class="token keyword">var</span> scanFilters<span class="token operator">:</span> List<span class="token operator">&lt;</span>ScanFilter<span class="token operator">></span> <span class="token operator">=</span> <span class="token function">arrayListOf</span><span class="token punctuation">(</span>
<span class="token comment">//        ScanFilter.Builder().setServiceUuid(ParcelUuid(BluetoothLEManager.DEVICE_UUID)).build()</span>
<span class="token punctuation">)</span>

<span class="token comment">// Variable de fonctionnement</span>
<span class="token keyword">private</span> <span class="token keyword">var</span> mScanning <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">private</span> <span class="token keyword">val</span> handler <span class="token operator">=</span> <span class="token function">Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// Adapter</span>
<span class="token keyword">private</span> <span class="token keyword">val</span> bleDevicesFoundList <span class="token operator">=</span> emptyDataSourceTyped<span class="token operator">&lt;</span>Device<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="le-recyclerview" tabindex="-1"><a class="header-anchor" href="#le-recyclerview" aria-hidden="true">#</a> Le RecyclerView</h3>
<h3 id="le-model" tabindex="-1"><a class="header-anchor" href="#le-model" aria-hidden="true">#</a> Le Model</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> android<span class="token punctuation">.</span>bluetooth<span class="token punctuation">.</span>BluetoothDevice

<span class="token comment">// Représente les données</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Device</span> <span class="token punctuation">(</span>
    <span class="token keyword">var</span> name<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">,</span>
    <span class="token keyword">var</span> mac<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">,</span>
    <span class="token keyword">var</span> device<span class="token operator">:</span> BluetoothDevice
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token operator">:</span> Any<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        <span class="token keyword">return</span> other <span class="token keyword">is</span> Device <span class="token operator">&amp;&amp;</span> other<span class="token punctuation">.</span>mac <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mac
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="le-viewholder" tabindex="-1"><a class="header-anchor" href="#le-viewholder" aria-hidden="true">#</a> Le Viewholder</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">DeviceViewHolder</span><span class="token punctuation">(</span>itemView<span class="token operator">:</span> View<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">ViewHolder</span><span class="token punctuation">(</span>itemView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> name<span class="token operator">:</span> TextView <span class="token operator">=</span> itemView<span class="token punctuation">.</span><span class="token function">findViewById</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>title<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="la-definition" tabindex="-1"><a class="header-anchor" href="#la-definition" aria-hidden="true">#</a> La Définition</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>rvDevices<span class="token punctuation">.</span><span class="token function">setup</span> <span class="token punctuation">{</span>
    <span class="token function">withDataSource</span><span class="token punctuation">(</span>bleDevicesFoundList<span class="token punctuation">)</span>
    withItem<span class="token operator">&lt;</span>Device<span class="token punctuation">,</span> DeviceViewHolder<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>item_device<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">onBind</span><span class="token punctuation">(</span><span class="token operator">::</span>DeviceViewHolder<span class="token punctuation">)</span> <span class="token punctuation">{</span> _<span class="token punctuation">,</span> item <span class="token operator">-></span>
            name<span class="token punctuation">.</span>text <span class="token operator">=</span> item<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">takeIf</span> <span class="token punctuation">{</span> <span class="token operator">!</span>it<span class="token punctuation">.</span><span class="token function">isNullOrEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token operator">?:</span> run <span class="token punctuation">{</span> item<span class="token punctuation">.</span>mac <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        onClick <span class="token punctuation">{</span>
            Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token label symbol">@ScanActivity</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>trying_connection_to<span class="token punctuation">,</span> item<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            BluetoothLEManager<span class="token punctuation">.</span>currentDevice <span class="token operator">=</span> item<span class="token punctuation">.</span>device
            <span class="token function">connectToCurrentDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="la-classe-localpreferences" tabindex="-1"><a class="header-anchor" href="#la-classe-localpreferences" aria-hidden="true">#</a> La classe LocalPreferences ?</h3>
<p>Cette classe va nous permettre de sauvegarder de manière « persistant » des paramètres.</p>
<p>Pour l'instant nous allons sauvegarder le nom raspberryPi, ça nous sera utile lors de la prochaine étape (connexion HTTP)</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token keyword">import</span> android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>Context
<span class="token keyword">import</span> android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>SharedPreferences

<span class="token keyword">class</span> LocalPreferences <span class="token keyword">private</span> <span class="token keyword">constructor</span><span class="token punctuation">(</span>context<span class="token operator">:</span> Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> sharedPreferences<span class="token operator">:</span> SharedPreferences <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getSharedPreferences</span><span class="token punctuation">(</span><span class="token string">"MyPref"</span><span class="token punctuation">,</span> Context<span class="token punctuation">.</span>MODE_PRIVATE<span class="token punctuation">)</span>

    <span class="token keyword">fun</span> <span class="token function">lastConnectedDeviceName</span><span class="token punctuation">(</span>deviceName<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sharedPreferences<span class="token punctuation">.</span><span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putString</span><span class="token punctuation">(</span><span class="token string">"selectedDevice"</span><span class="token punctuation">,</span> deviceName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">lastConnectedDeviceName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String<span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sharedPreferences<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"selectedDevice"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">var</span> INSTANCE<span class="token operator">:</span> LocalPreferences<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token keyword">fun</span> <span class="token function">getInstance</span><span class="token punctuation">(</span>context<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token operator">:</span> LocalPreferences <span class="token punctuation">{</span>
            <span class="token keyword">return</span> INSTANCE<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span>
                INSTANCE
            <span class="token punctuation">}</span> <span class="token operator">?:</span> run <span class="token punctuation">{</span>
                INSTANCE <span class="token operator">=</span> <span class="token function">LocalPreferences</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
                <span class="token keyword">return</span> INSTANCE<span class="token operator">!!</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="connexion-a-un-peripherique" tabindex="-1"><a class="header-anchor" href="#connexion-a-un-peripherique" aria-hidden="true">#</a> Connexion à un périphérique</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">connectToCurrentDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    BluetoothLEManager<span class="token punctuation">.</span>currentDevice<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> device <span class="token operator">-></span>
        Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">"Connexion en cours … <span class="token interpolation variable">$device</span>"</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        currentBluetoothGatt <span class="token operator">=</span> device<span class="token punctuation">.</span><span class="token function">connectGatt</span><span class="token punctuation">(</span>
            <span class="token keyword">this</span><span class="token punctuation">,</span>
            <span class="token boolean">false</span><span class="token punctuation">,</span>
            BluetoothLEManager<span class="token punctuation">.</span><span class="token function">GattCallback</span><span class="token punctuation">(</span>
                onConnect <span class="token operator">=</span> <span class="token punctuation">{</span>
                    <span class="token comment">// On indique à l'utilisateur que nous sommes correctement connecté</span>
                    runOnUiThread <span class="token punctuation">{</span>
                        <span class="token comment">// Nous sommes connecté au device, on active les notifications pour être notifié si la LED change d'état.</span>

                        <span class="token comment">// À IMPLÉMENTER</span>
                        <span class="token comment">// Vous devez appeler la méthode qui active les notifications BLE</span>
                        <span class="token comment">// enableListenBleNotify()</span>

                        <span class="token comment">// On change la vue « pour être en mode connecté »</span>
                        <span class="token function">setUiMode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

                        <span class="token comment">// On sauvegarde dans les « LocalPréférence » de l'application le nom du dernier préphérique</span>
                        <span class="token comment">// sur lequel nous nous sommes connecté</span>

                        <span class="token comment">// À IMPLÉMENTER EN FONCTION DE CE QUE NOUS AVONS DIT ENSEMBLE</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                onNotify <span class="token operator">=</span> <span class="token punctuation">{</span> runOnUiThread <span class="token punctuation">{</span>
                    <span class="token comment">// VOUS DEVEZ APPELER ICI LA MÉTHODE QUI VA GÉRER LE CHANGEMENT D'ÉTAT DE LA LED DANS L'INTERFACE</span>
                    <span class="token comment">// handleToggleLedNotificationUpdate(it)</span>
                 <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                onDisconnect <span class="token operator">=</span> <span class="token punctuation">{</span> runOnUiThread <span class="token punctuation">{</span> <span class="token function">disconnectFromCurrentDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h3 id="deconnexion" tabindex="-1"><a class="header-anchor" href="#deconnexion" aria-hidden="true">#</a> Déconnexion</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">/**
* On demande la déconnexion du device
*/</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">disconnectFromCurrentDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentBluetoothGatt<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    BluetoothLEManager<span class="token punctuation">.</span>currentDevice <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token function">setUiMode</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="bluetothlemanager" tabindex="-1"><a class="header-anchor" href="#bluetothlemanager" aria-hidden="true">#</a> BluetothLEManager</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">class</span> BluetoothLEManager <span class="token punctuation">{</span>

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> currentDevice<span class="token operator">:</span> BluetoothDevice<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token keyword">val</span> DEVICE_UUID<span class="token operator">:</span> UUID <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token string">"795090c7-420d-4048-a24e-18e60180e23c"</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> CHARACTERISTIC_LED_PIN_UUID<span class="token operator">:</span> UUID <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token string">"31517c58-66bf-470c-b662-e352a6c80cba"</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> CHARACTERISTIC_BUTTON_PIN_UUID<span class="token operator">:</span> UUID <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token string">"0b89d2d4-0ea6-4141-86bb-0c5fb91ab14a"</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> CHARACTERISTIC_TOGGLE_LED_UUID<span class="token operator">:</span> UUID <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token string">"59b6bf7f-44de-4184-81bd-a0e3b30c919b"</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> CHARACTERISTIC_NOTIFY_STATE<span class="token operator">:</span> UUID <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token string">"d75167c8-e6f9-4f0b-b688-09d96e195f00"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">open</span> <span class="token keyword">class</span> <span class="token function">GattCallback</span><span class="token punctuation">(</span>
        <span class="token keyword">val</span> onConnect<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> Unit<span class="token punctuation">,</span>
        <span class="token keyword">val</span> onNotify<span class="token operator">:</span> <span class="token punctuation">(</span>characteristic<span class="token operator">:</span> BluetoothGattCharacteristic<span class="token punctuation">)</span> <span class="token operator">-></span> Unit<span class="token punctuation">,</span>
        <span class="token keyword">val</span> onDisconnect<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> Unit
    <span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">BluetoothGattCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">/**
         * Méthode appelé au moment ou les « services » ont été découvert
         */</span>
        <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onServicesDiscovered</span><span class="token punctuation">(</span>gatt<span class="token operator">:</span> BluetoothGatt<span class="token punctuation">,</span> status<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onServicesDiscovered</span><span class="token punctuation">(</span>gatt<span class="token punctuation">,</span> status<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">==</span> BluetoothGatt<span class="token punctuation">.</span>GATT_SUCCESS<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">onConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">onDisconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/**
         * Méthode appelé au moment du changement d'état de la stack BLE
         */</span>
        <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onConnectionStateChange</span><span class="token punctuation">(</span>gatt<span class="token operator">:</span> BluetoothGatt<span class="token punctuation">,</span> status<span class="token operator">:</span> Int<span class="token punctuation">,</span> newState<span class="token operator">:</span> Int<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onConnectionStateChange</span><span class="token punctuation">(</span>gatt<span class="token punctuation">,</span> status<span class="token punctuation">,</span> newState<span class="token punctuation">)</span>
            <span class="token keyword">when</span> <span class="token punctuation">(</span>newState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                BluetoothGatt<span class="token punctuation">.</span>STATE_CONNECTED <span class="token operator">-></span> gatt<span class="token punctuation">.</span><span class="token function">discoverServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                BluetoothProfile<span class="token punctuation">.</span>STATE_DISCONNECTED <span class="token operator">-></span> <span class="token function">onDisconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/**
         * Méthodes appelée à chaque notifications BLE (en cas de changement de la led)
         */</span>
        <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCharacteristicChanged</span><span class="token punctuation">(</span>gatt<span class="token operator">:</span> BluetoothGatt<span class="token punctuation">,</span> characteristic<span class="token operator">:</span> BluetoothGattCharacteristic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCharacteristicChanged</span><span class="token punctuation">(</span>gatt<span class="token punctuation">,</span> characteristic<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>characteristic<span class="token punctuation">.</span>uuid <span class="token operator">==</span> CHARACTERISTIC_NOTIFY_STATE<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">onNotify</span><span class="token punctuation">(</span>characteristic<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h3 id="setuimode" tabindex="-1"><a class="header-anchor" href="#setuimode" aria-hidden="true">#</a> setUiMode ?</h3>
<p>Cette méthode permet de changer l'état de l'interface en fonction de la connexion.</p>
<p>Je vous laisse écrire la méthode mais petite aide :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">setUiMode</span><span class="token punctuation">(</span>isConnected<span class="token operator">:</span> Boolean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isConnected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Connecté à un périphérique</span>
        bleDevicesFoundList<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        rvDevices<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
        startScan<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
        currentConnexion<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>VISIBLE
        currentConnexion<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>connected_to<span class="token punctuation">,</span> BluetoothLEManager<span class="token punctuation">.</span>currentDevice<span class="token operator">?</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        disconnect<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>VISIBLE
        toggleLed<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>VISIBLE
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// Non connecté, reset de la vue.</span>
        rvDevices<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>VISIBLE
        startScan<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>VISIBLE
        ledStatus<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
        currentConnexion<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
        disconnect<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
        toggleLed<span class="token punctuation">.</span>visibility <span class="token operator">=</span> View<span class="token punctuation">.</span>GONE
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="interagir-avec-la-led" tabindex="-1"><a class="header-anchor" href="#interagir-avec-la-led" aria-hidden="true">#</a> Interagir avec la LED</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">/**
* Récupération de « service » BLE (via UUID) qui nous permettra d'envoyer / recevoir des commandes
*/</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getMainDeviceService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> BluetoothGattService<span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> currentBluetoothGatt<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> bleGatt <span class="token operator">-></span>
        <span class="token keyword">val</span> service <span class="token operator">=</span> bleGatt<span class="token punctuation">.</span><span class="token function">getService</span><span class="token punctuation">(</span>BluetoothLEManager<span class="token punctuation">.</span>DEVICE_UUID<span class="token punctuation">)</span>
        service<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> it
        <span class="token punctuation">}</span> <span class="token operator">?:</span> run <span class="token punctuation">{</span>
            Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>uuid_not_found<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token operator">?:</span> run <span class="token punctuation">{</span>
        Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>not_connected<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
* On change l'état de la LED (via l'UUID de toggle)
*/</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">toggleLed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getMainDeviceService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> service <span class="token operator">-></span>
        <span class="token keyword">val</span> toggleLed <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">getCharacteristic</span><span class="token punctuation">(</span>BluetoothLEManager<span class="token punctuation">.</span>CHARACTERISTIC_TOGGLE_LED_UUID<span class="token punctuation">)</span>
        toggleLed<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span>
        currentBluetoothGatt<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">writeCharacteristic</span><span class="token punctuation">(</span>toggleLed<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="gerer-la-compatibilite-du-mobile" tabindex="-1"><a class="header-anchor" href="#gerer-la-compatibilite-du-mobile" aria-hidden="true">#</a> Gérer la compatibilité du mobile</h3>
<p>Dans le code de <strong>l'activity BLE</strong>, si vous souhaitez gérer l'ensembles des cas d'erreurs :</p>
<ul>
<li>Équipement non compatible BLE.</li>
<li>Vérifications des permissions.</li>
<li>Vérification du service de localisation.</li>
</ul>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>packageManager<span class="token punctuation">.</span><span class="token function">hasSystemFeature</span><span class="token punctuation">(</span>PackageManager<span class="token punctuation">.</span>FEATURE_BLUETOOTH_LE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Test si le téléphone est compatible BLE, si c'est pas le cas, on finish() l'activity</span>
        Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>not_compatible<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">locationServiceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Lancer suite => Activation BLE + Lancer Scan</span>
        <span class="token function">setupBLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// On demande la permission</span>
        <span class="token function">askForPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// On demande d'activer la localisation</span>
        <span class="token comment">// Idéalement on demande avec un activité.</span>
        <span class="token comment">// À vous de me proposer mieux (Une activité, une dialog, etc)</span>
        <span class="token function">startActivity</span><span class="token punctuation">(</span><span class="token function">Intent</span><span class="token punctuation">(</span>Settings<span class="token punctuation">.</span>ACTION_LOCATION_SOURCE_SETTINGS<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="ajout-des-actions-aux-cliques-sur-l-interface" tabindex="-1"><a class="header-anchor" href="#ajout-des-actions-aux-cliques-sur-l-interface" aria-hidden="true">#</a> Ajout des actions aux cliques sur l'interface</h3>
<p>Nous avons nos méthodes, mais elles ne sont actuellement pas appelées par une action utilisateur. Pour vous guider dans la mission, vous devez dans le <code>OnCreate</code> ajouter des lignes de code similaire à :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>startScan<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span> <span class="token function">askForPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

disconnect<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token comment">// Appeler la bonne méthode</span>
<span class="token punctuation">}</span>

toggleLed<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token comment">// Appeler la bonne méthode</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="telecommande-via-internet" tabindex="-1"><a class="header-anchor" href="#telecommande-via-internet" aria-hidden="true">#</a> Télécommande via Internet</h2>
<p>Nécessite le « nom » du périphérique (donc d'un scan précédent).</p>
<ul>
<li>Modifier la vue de la home pour que nous ne puissions pas cliquer sur le bouton.</li>
<li>L'activité ne doit pas être accessible. (elle doit <code>finish()</code> si pas de <code>getCurrentSelectedDevice() == null</code>)</li>
<li>Créer un nouveau model <code>LedStatus</code></li>
</ul>
<h3 id="la-classe-ledstatus" tabindex="-1"><a class="header-anchor" href="#la-classe-ledstatus" aria-hidden="true">#</a> La classe LedStatus</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">/**
 * LedStatus model
 */</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">LedStatus</span><span class="token punctuation">(</span><span class="token keyword">var</span> identifier<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token keyword">var</span> status<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">setIdentifier</span><span class="token punctuation">(</span>identifier<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> LedStatus <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>identifier <span class="token operator">=</span> identifier
        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token operator">:</span> Boolean<span class="token punctuation">)</span><span class="token operator">:</span> LedStatus <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> status
        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">reverseStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> LedStatus <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token operator">!</span>status<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> LedStatus <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">LedStatus</span><span class="token punctuation">(</span>identifier<span class="token punctuation">,</span> status<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="nouvelles-dependances-gradle" tabindex="-1"><a class="header-anchor" href="#nouvelles-dependances-gradle" aria-hidden="true">#</a> Nouvelles dépendances Gradle</h3>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>implementation <span class="token string">'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'</span>
implementation <span class="token string">'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.8'</span>

implementation <span class="token string">'com.squareup.retrofit2:retrofit:2.9.0'</span>
implementation <span class="token string">'com.squareup.retrofit2:converter-gson:2.9.0'</span>
implementation <span class="token string">'com.squareup.okhttp3:okhttp:4.7.2'</span>
implementation <span class="token string">'com.squareup.okhttp3:logging-interceptor:4.7.2'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="la-classe-apiservice" tabindex="-1"><a class="header-anchor" href="#la-classe-apiservice" aria-hidden="true">#</a> la classe APIService</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token comment">/**
 * ApiService
 */</span>
<span class="token keyword">interface</span> ApiService <span class="token punctuation">{</span>

    <span class="token annotation builtin">@GET</span><span class="token punctuation">(</span><span class="token string">"/status"</span><span class="token punctuation">)</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">readStatus</span><span class="token punctuation">(</span><span class="token annotation builtin">@Query</span><span class="token punctuation">(</span><span class="token string">"identifier"</span><span class="token punctuation">)</span> identifier<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> LedStatus

    <span class="token annotation builtin">@POST</span><span class="token punctuation">(</span><span class="token string">"/status"</span><span class="token punctuation">)</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">writeStatus</span><span class="token punctuation">(</span><span class="token annotation builtin">@Body</span> status<span class="token operator">:</span> LedStatus<span class="token punctuation">)</span><span class="token operator">:</span> LedStatus

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token comment">/**
         * Création d'un singleton pour la simplicité, mais normalement nous utilisons plutôt un
         * injecteur de dépendances.
         */</span>
        <span class="token keyword">val</span> instance <span class="token operator">=</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">/**
         * Création de l'objet qui nous permettra de faire les appels d'API
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ApiService <span class="token punctuation">{</span>
            <span class="token keyword">val</span> gson <span class="token operator">=</span> <span class="token function">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// JSON deserializer/serializer</span>

            <span class="token comment">// Create the OkHttp Instance</span>
            <span class="token keyword">val</span> okHttpClient <span class="token operator">=</span> OkHttpClient<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">readTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">writeTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token function">HttpLoggingInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setLevel</span><span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span>BuildConfig<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span> HttpLoggingInterceptor<span class="token punctuation">.</span>Level<span class="token punctuation">.</span>BODY <span class="token keyword">else</span> HttpLoggingInterceptor<span class="token punctuation">.</span>Level<span class="token punctuation">.</span>NONE<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span>Interceptor <span class="token punctuation">{</span> chain<span class="token operator">:</span> Interceptor<span class="token punctuation">.</span>Chain <span class="token operator">-></span>
                    <span class="token keyword">val</span> request <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"Accept"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    chain<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token keyword">return</span> Retrofit<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span>BuildConfig<span class="token punctuation">.</span>URI_REMOTE_SERVER<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">client</span><span class="token punctuation">(</span>okHttpClient<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addConverterFactory</span><span class="token punctuation">(</span>GsonConverterFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>gson<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>ApiService<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h3 id="exemple-d-utilisation" tabindex="-1"><a class="header-anchor" href="#exemple-d-utilisation" aria-hidden="true">#</a> Exemple d'utilisation</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Récupération de l'état depuis le serveur</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">CoroutineScope</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
        runCatching <span class="token punctuation">{</span>
            <span class="token keyword">val</span> readStatus <span class="token operator">=</span> ApiService<span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">readStatus</span><span class="token punctuation">(</span>ledStatus<span class="token punctuation">.</span>identifier<span class="token punctuation">)</span>
            ledStatus<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span>readStatus<span class="token punctuation">.</span>status<span class="token punctuation">)</span>
            <span class="token function">setVisualState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="notification-ble" tabindex="-1"><a class="header-anchor" href="#notification-ble" aria-hidden="true">#</a> Notification BLE</h3>
<p>La Raspberry Pi dispose également d'un service de « Notification ». Les notifications sont envoyées à chaque changement d'état de la LED (local ou via le réseau). Cette notification est envoyée sur l'UUID <code>d75167c8-e6f9-4f0b-b688-09d96e195f00</code>.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">enableListenBleNotify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getMainDeviceService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> service <span class="token operator">-></span>
        Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getString</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>enable_ble_notifications<span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// Indique que le GATT Client va écouter les notifications sur le charactérisque</span>
        <span class="token keyword">val</span> notification <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">getCharacteristic</span><span class="token punctuation">(</span>BluetoothLEManager<span class="token punctuation">.</span>CHARACTERISTIC_NOTIFY_STATE<span class="token punctuation">)</span>

        currentBluetoothGatt<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">setCharacteristicNotification</span><span class="token punctuation">(</span>notification<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">handleToggleLedNotificationUpdate</span><span class="token punctuation">(</span>characteristic<span class="token operator">:</span> BluetoothGattCharacteristic<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>characteristic<span class="token punctuation">.</span><span class="token function">getStringValue</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"on"</span><span class="token punctuation">,</span> ignoreCase <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ledStatus<span class="token punctuation">.</span><span class="token function">setImageResource</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>led_on<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        ledStatus<span class="token punctuation">.</span><span class="token function">setImageResource</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>led_off<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="fourniture-des-sources" tabindex="-1"><a class="header-anchor" href="#fourniture-des-sources" aria-hidden="true">#</a> Fourniture des sources</h3>
<p><a href="https://docs.google.com/forms/d/e/1FAIpQLScZ5WflYVlnNzQlwYwdJsCc9izqthZJT9zVQK6HWsypgb06Bg/viewform" target="_blank" rel="noopener noreferrer">Partage du projet<ExternalLinkIcon/></a></p>
</template>

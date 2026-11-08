<?php
// Les seules sources que le relais accepte d'aller chercher (liste blanche)
$sources = [
    'devto' => 'https://dev.to/feed',
    'tldr' => 'https://tldr.tech/api/rss/tech',
    'journalduhacker' => 'https://www.journalduhacker.net/rss',
];

$source = $_GET['source'] ?? '';

// Un identifiant absent de la liste : on refuse, sans rien télécharger
if (!array_key_exists($source, $sources)) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Source inconnue';
    exit;
}

// Certains sites refusent les requêtes qui ne disent pas qui elles sont
$contexte = stream_context_create([
    'http' => [
        'timeout' => 10,
        'user_agent' => 'LecteurVeille/1.0 (TP BTS SIO)',
    ],
]);

// Le @ masque le Warning de PHP : l'échec est traité juste en dessous
$flux = @file_get_contents($sources[$source], false, $contexte);

if ($flux === false) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'La source ne répond pas';
    exit;
}

header('Content-Type: application/xml');
echo $flux;

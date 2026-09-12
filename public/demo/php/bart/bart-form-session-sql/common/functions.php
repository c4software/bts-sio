<?php
// Affiche la phrase autant de fois que demandé.
function displayPunition(string $phrase, int $count): void
{
    for ($i = 0; $i < $count; $i++) {
        echo htmlspecialchars($phrase) . '<br />';
    }
}

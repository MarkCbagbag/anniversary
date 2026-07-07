<?php
if (!isset($pageTitle)) {
    $pageTitle = 'Anniversary Story';
}
if (!isset($bodyClass)) {
    $bodyClass = '';
}
if (!isset($extraStyles)) {
    $extraStyles = [];
}
if (!isset($extraScriptsHead)) {
    $extraScriptsHead = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <?php foreach ($extraStyles as $style): ?>
        <link rel="stylesheet" href="<?= htmlspecialchars($style) ?>">
    <?php endforeach; ?>
    <?php foreach ($extraScriptsHead as $script): ?>
        <script src="<?= htmlspecialchars($script) ?>" defer></script>
    <?php endforeach; ?>
</head>
<body class="<?= htmlspecialchars($bodyClass) ?>">
<button id="musicToggle" type="button" class="music-toggle" data-music-toggle aria-pressed="true">🎵 Music: ON</button>

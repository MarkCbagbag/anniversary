<?php
session_start();

// Prevent browser caching of authenticated pages
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Enforce login
if (empty($_SESSION['authenticated'])) {
    header('Location: index.php');
    exit;
}
$pageTitle = 'Season 2 - Anniversary';
$bodyClass = 'season-page';
$extraStyles = ['css/style.css'];
$extraScriptsFooter = ['js/script.js'];
include __DIR__ . '/partials/header.php';
?>

<div class="season-page-content" style="padding: 40px; text-align:center;">
    <h1>Season 2</h1>
    <p>The story continues with more memories and moments.</p>
    <p><a href="home.php">Back to Home</a></p>
</div>

<?php include __DIR__ . '/partials/footer.php';

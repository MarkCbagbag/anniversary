<?php
session_start();
$_SESSION['authenticated'] = true;
$pageTitle = 'Verifying...';
$bodyClass = 'verify-page';
$extraStyles = ['css/verify.css'];
$extraScriptsFooter = ['js/verify.js'];
include __DIR__ . '/partials/header.php';
?>

<div class="verify">
    <h1 id="heart">❤️</h1>
    <h2 id="status">Verifying...</h2>
    <div class="progress"><div id="bar"></div></div>
    <p id="percent">0%</p>
    <p id="message">Finding the love of your life...</p>
</div>
<div id="welcome">
    <h1>❤️ Identity Confirmed</h1>
    <h2>Welcome Back,</h2>
    <h1 class="name">Kimmy ❤️</h1>
</div>

<?php include __DIR__ . '/partials/footer.php';

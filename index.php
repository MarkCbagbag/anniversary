<?php
$pageTitle = 'Our Story ❤️';
$bodyClass = 'landing-page';
$extraStyles = ['css/style.css'];
$extraScriptsFooter = ['js/script.js'];
$showMusicToggle = true;

$loginError = '';
$loveValue = '';
$dateValue = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loveValue = trim($_POST['love'] ?? '');
    $dateValue = trim($_POST['date'] ?? '');
    $expectedName = 'kimmy';
    $expectedDate = '2023';

    if (strcasecmp($loveValue, $expectedName) === 0 && $dateValue === $expectedDate) {
        header('Location: verify.php');
        exit;
    }

    $loginError = "That's not quite right... ❤️ Try again.";
}

include __DIR__ . '/partials/header.php';
?>

<div class="background"></div>

<section id="intro" style="<?= $loginError ? 'display:none;' : '' ?>">
    <div class="overlay"></div>
    <div class="content">
        <h1 class="logo">OUR STORY</h1>
        <p class="subtitle">Every Love Story Has A Beginning</p>
        <button id="startBtn">SIGN IN</button>

        <div class="mini-slider" aria-label="Story highlights">
            <div class="slider-track">
                <div class="slide active">
                    <strong>First hello</strong>
                    <span>The beginning of everything.</span>
                </div>
                <div class="slide">
                    <strong>First laugh</strong>
                    <span>Little moments that became forever.</span>
                </div>
                <div class="slide">
                    <strong>Three years</strong>
                    <span>A love that keeps growing brighter.</span>
                </div>
            </div>
            <div class="slider-dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    </div>
</section>

<section id="login" style="<?= $loginError ? 'opacity:1;pointer-events:auto;' : '' ?>">
    <div class="login-card">
        <div class="login-topbar">
            <button type="button" id="backBtn" class="button-back">← Back</button>
        </div>
        <h2>Unlock Our Story ❤️</h2>
        <form method="post" action="index.php">
            <input type="text" name="love" id="love" placeholder="Who is the love of my life?" value="<?= htmlspecialchars($loveValue) ?>" required>
            <input type="password" name="date" id="date" placeholder="When did our story begin? (MMDDYYYY)" value="<?= htmlspecialchars($dateValue) ?>" required>
            <button id="loginBtn" type="submit">❤️ Unlock ❤️</button>
        </form>
        <p id="error"><?= htmlspecialchars($loginError) ?></p>
    </div>
</section>

<?php include __DIR__ . '/partials/footer.php'; ?>


<?php
session_start();

if (empty($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}
if (empty($_SESSION['login_lock_until'])) {
    $_SESSION['login_lock_until'] = 0;
}

$now = time();
if ((int) $_SESSION['login_lock_until'] > $now) {
    $loginError = 'Too many failed attempts. Please wait a moment and try again.';
} else {
    $_SESSION['login_lock_until'] = 0;
}

$pageTitle = 'Our Story ❤️';
$bodyClass = 'landing-page';
$extraStyles = ['css/style.css'];
$extraScriptsFooter = ['js/script.js'];
// Index should not show the page background
$showBackground = false;

$loginError = $loginError ?? '';
$loveValue = '';
$dateValue = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loveValue = trim($_POST['love'] ?? '');
    $dateValue = trim($_POST['date'] ?? '');
    $expectedName = 'kimmy';
    $expectedDate = '2023';

    if ((int) $_SESSION['login_lock_until'] > $now) {
        $loginError = 'Too many failed attempts. Please wait a moment and try again.';
    } elseif (strcasecmp($loveValue, $expectedName) === 0 && $dateValue === $expectedDate) {
        session_regenerate_id(true);
        $_SESSION['authenticated'] = true;
        $_SESSION['profile_name'] = 'Kimmy';
        $_SESSION['login_attempts'] = 0;
        $_SESSION['login_lock_until'] = 0;
        header('Location: verify.php');
        exit;
    } else {
        $_SESSION['login_attempts'] = (int) $_SESSION['login_attempts'] + 1;

        if ((int) $_SESSION['login_attempts'] >= 3) {
            $_SESSION['login_lock_until'] = $now + 20;
            $loginError = 'Too many failed attempts. Please wait 20 seconds and try again.';
        } else {
            $loginError = "That's not quite right... ❤️ Try again.";
        }
    }
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
            <div class="password-field">
                <input type="password" name="date" id="date" placeholder="When did our story begin? (MMDDYYYY)" value="<?= htmlspecialchars($dateValue) ?>" required>
                <button type="button" class="password-toggle" data-target="date" aria-label="Show password">Show</button>
            </div>
            <button id="loginBtn" type="submit">❤️ Unlock ❤️</button>
        </form>
        <p id="error"><?= htmlspecialchars($loginError) ?></p>
    </div>
</section>

<?php include __DIR__ . '/partials/footer.php'; ?>

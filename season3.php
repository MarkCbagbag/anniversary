<?php
$pageTitle = 'Season 3 - Anniversary';
$bodyClass = 'season-page';
$extraStyles = ['css/style.css'];
$extraScriptsFooter = ['js/script.js'];
include __DIR__ . '/partials/header.php';
?>

<div class="season-page-content" style="padding: 40px; text-align:center; max-width: 960px; margin: 0 auto;">
    <h1>Season 3</h1>
    <p>Celebrate the anniversary moment with the final chapter.</p>

    <div style="margin: 32px auto 20px; padding: 24px; border-radius: 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(0,0,0,0.2);">
        <h2 style="margin-bottom: 12px; font-size: 1.5rem;">Episode 1</h2>
        <p style="margin-bottom: 16px;">A special memory from your story.</p>
        <video controls playsinline preload="metadata" style="width: 100%; max-height: 70vh; border-radius: 16px;">
            <source src="assets/videos/us-1.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <p><a href="home.php">Back to Home</a></p>
</div>

<?php include __DIR__ . '/partials/footer.php';

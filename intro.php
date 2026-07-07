<?php
$pageTitle = 'Our Story';
$bodyClass = 'intro-page';
$extraStyles = ['css/intro.css'];
$extraScriptsFooter = ['js/intro.js'];
include __DIR__ . '/partials/header.php';
?>

<div id="player">
    <video
        id="videoPlayer"
        autoplay
        playsinline
        muted
        controls
    >
        <source src="assets/videos/intro.mp4" type="video/mp4">
        Your browser does not support HTML video.
    </video>
    <p class="fallback-text">Intro video not available. The page will continue automatically.</p>
</div>

<?php include __DIR__ . '/partials/footer.php';

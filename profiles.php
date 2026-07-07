<?php
$pageTitle = "Who's Watching?";
$bodyClass = 'profiles-page';
$extraStyles = ['css/profile.css', 'css/profile-ui.css'];
$extraScriptsFooter = ['js/profile.js', 'js/profile-ui.js'];
include __DIR__ . '/partials/header.php';
?>

<div class="profile-stage">
    <div class="screen-fade"></div>
    <div class="profile-message">
        <p class="intro-text">One profile has changed my life forever...</p>
    </div>
    <div class="profiles hidden">
        <div class="profile-card" id="kimmyProfile" onclick="enterHome()">
            <div class="profile-pic-wrap">
                <img src="assets/photos/a2075462-3cc5-4ae6-98bf-3d1f8cba60fa.jpg" alt="Kimmy profile picture">
                <div class="card-glow"></div>
                <div class="heart-shower">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="profile-copy">
                <a href="home.php" class="profile-link">
                    <span class="profile-label">Kimmy</span>
                </a>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/partials/footer.php';

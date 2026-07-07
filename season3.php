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
$pageTitle = 'Season 3 - Anniversary';
$bodyClass = 'season-page';
$extraStyles = ['css/style.css'];
$extraScriptsFooter = ['js/script.js'];
include __DIR__ . '/partials/header.php';
?>

<style>
/* Background */
.season3-container{
    max-width:1100px;
    margin:40px auto;
    padding:20px;
}

/* Top Bar */
.top-bar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;
}

.page-title h1{
    margin:0;
    font-size:3rem;
    color:#fff;
}

.page-title p{
    color:#cfcfcf;
    margin-top:8px;
}

/* Back Button */
.back-btn{
    text-decoration:none;
    background:#ff4d6d;
    color:#fff;
    padding:12px 24px;
    border-radius:50px;
    font-weight:600;
    transition:.3s;
    box-shadow:0 10px 25px rgba(255,77,109,.3);
}

.back-btn:hover{
    background:#ff2f55;
    transform:translateY(-2px);
}

/* Episode Card */
.episode-card{
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.15);
    border-radius:25px;
    overflow:hidden;
    backdrop-filter:blur(15px);
    box-shadow:0 25px 60px rgba(0,0,0,.35);
}

.video-header{
    padding:30px;
}

.video-header h2{
    color:#fff;
    margin-bottom:10px;
    font-size:2rem;
}

.video-header p{
    color:#d8d8d8;
    margin:0;
}

/* Video */
.video-wrapper{
    padding:0 30px 30px;
}

.video-wrapper video{
    width:100%;
    border-radius:20px;
    background:#000;
}

/* Responsive */
@media(max-width:768px){

.top-bar{
    flex-direction:column;
    gap:20px;
    text-align:center;
}

.page-title h1{
    font-size:2.3rem;
}

.back-btn{
    width:100%;
    text-align:center;
}

.video-header,
.video-wrapper{
    padding:20px;
}

}
</style>

<div class="season3-container">

    <div class="top-bar">

        <div class="page-title">
            <h1>🎬 Season 3</h1>
            <p>Celebrate the anniversary with the final chapter of our story.</p>
        </div>

        <a href="home.php" class="back-btn">
            ← Back to Home
        </a>

    </div>

    <div class="episode-card">

        <div class="video-header">
            <h2>Episode 1</h2>
            <p>A special memory from our journey together.</p>
        </div>

        <div class="video-wrapper">
            <video controls playsinline preload="metadata">
                <source src="assets/videos/us-1.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>

    </div>

</div>

<?php include __DIR__ . '/partials/footer.php'; ?>
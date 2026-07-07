<?php
session_start();
if (empty($_SESSION['authenticated'])) {
    header('Location: index.php');
    exit;
}
$pageTitle = 'Anniversary Streaming';
$bodyClass = 'home-page';
$extraStyles = ['css/home.css'];
$extraScriptsFooter = ['js/home.js'];
// Home should not show the page background
$showBackground = false;
include __DIR__ . '/partials/header.php';
?>


<style>
/* ===========================
   Navigation Bar
=========================== */

.top-navbar{
    position: sticky;
    top: 0;
    z-index: 1000;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 40px;

    background: rgba(15,15,15,.85);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255,255,255,.08);
}

.nav-left{
    display: flex;
    align-items: center;
    gap: 30px;
}

.logo{
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    margin-right: 15px;
    white-space: nowrap;
}

.nav-link{
    color: #d6d6d6;
    text-decoration: none;
    font-weight: 600;
    transition: .3s;
    position: relative;
}

.nav-link:hover{
    color: #fff;
}

.nav-link.active{
    color: #fff;
}

.nav-link.active::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    background: #ff4d6d;
    border-radius: 10px;
}

.logout-btn{
    text-decoration: none;
    color: #fff;
    background: #ff4d6d;
    padding: 10px 22px;
    border-radius: 50px;
    font-weight: 600;
    transition: .3s;
}

.logout-btn:hover{
    background: #ff2b55;
    transform: translateY(-2px);
}

@media(max-width:768px){

    .top-navbar{
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        padding: 18px 20px;
    }

    .nav-left{
        flex-wrap: wrap;
        gap: 18px;
    }

    .logo{
        width: 100%;
        margin-bottom: 10px;
    }

}
</style>

<!-- ===========================
     Navigation
=========================== -->

<nav class="top-navbar">

    <div class="nav-left">

        <div class="logo">
            ❤️ Anniversary Streaming
        </div>

        <a href="home.php" class="nav-link active">
            🏠 Home
        </a>

        <a href="profiles.php" class="nav-link">
            👤 Profile
        </a>

        <a href="logout.php" class="logout-btn" id="logoutBtn">
            🚪 Logout
        </a>


    </div>

</nav>


<div class="page-shell">

    <header class="hero">
        <div class="hero-copy">
            <span class="eyebrow">Anniversary Streaming</span>
            <h1>Happy 3rd Anniversary</h1>
            <p>Celebrate three years with a cinematic homepage made just for your love story.</p>
            <div class="hero-actions">
                <button id="playButton" class="button button-primary">
                    <span>▶</span> Play Season 1
                </button>
            </div>
        </div>

        <div class="hero-panel">
            <div class="featured-card">
                <span class="badge">Happy 3rd Anniversary</span>
                <h2>Love, laughter, and togetherness</h2>
                <p>Three seasons of your story—starting with the moment everything changed.</p>

                <div class="featured-stats">
                    <div>
                        <strong>3</strong>
                        <span>Years</span>
                    </div>
                    <div>
                        <strong>3</strong>
                        <span>Seasons</span>
                    </div>
                    <div>
                        <strong>1</strong>
                        <span>Story</span>
                    </div>
                    <div>
                        <strong id="episodeCount">0</strong>
                        <span>Episodes</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section class="seasons" id="seasons">
        <h2>Choose Your Season</h2>
        <div class="season-grid">

            <article class="season-card season-one" id="season1Card">
                <span class="season-tag">Season 1</span>
                <h3>The Beginning</h3>
                <p>2023 · First moments, first memories, first love.</p>
                <a href="season1.php" class="season-link">Watch Now</a>
            </article>

            <article class="season-card season-two">
                <span class="season-tag">Season 2</span>
                <h3>Growing Together</h3>
                <p>2024 · Building dreams, exploring new adventures, growing closer.</p>
                <a href="season2.php" class="season-link">Watch Now</a>
            </article>

            <article class="season-card season-three">
                <span class="season-tag">Season 3</span>
                <h3>Three Years Strong</h3>
                <p>2025 · Anniversary celebration, highlights, and unforgettable love.</p>
                <a href="season3.php" class="season-link">Watch Now</a>
            </article>

        </div>
    </section>
</div>

<script>
    // Update episode count dynamically
    const episodeCountElement = document.getElementById('episodeCount');
    const totalEpisodes = 1; // Update this if you add more episodes
    episodeCountElement.textContent = totalEpisodes;
</script>


<?php include __DIR__ . '/partials/footer.php'; ?>

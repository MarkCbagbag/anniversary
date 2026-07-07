<?php
$pageTitle = 'Anniversary Streaming';
$bodyClass = 'home-page';
$extraStyles = ['css/home.css'];
$extraScriptsFooter = ['js/home.js'];
$showMusicToggle = true;
// Home should not show the page background
$showBackground = false;
include __DIR__ . '/partials/header.php';
?>

<a href="index.php" id="logoutLink">
    <button id="logoutBtn" class="button button-secondary">🚪 Logout</button>
</a>
<div class="page-shell">
    <header class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Anniversary Streaming</span>
        <h1>Happy 3rd Anniversary</h1>
        <p>Celebrate three years with a cinematic homepage made just for your love story.</p>
        <div class="hero-actions">
          <button id="playButton" class="button button-primary"><span>▶</span> Play Season 1</button>
        </div>
      </div>
      <div class="hero-panel">
        <div class="featured-card">
          <span class="badge">Happy 3rd Anniversary</span>
          <h2>Love, laughter, and togetherness</h2>
          <p>Three seasons of your story—starting with the moment everything changed.</p>
          <div class="featured-stats">
            <div><strong>3</strong><span>Years</span></div>
            <div><strong>3</strong><span>Seasons</span></div>
            <div><strong>1</strong><span>Story</span></div>
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
          <a href="season1.php" class="season-link">Watch now</a>
        </article>
        <article class="season-card season-two">
          <span class="season-tag">Season 2</span>
          <h3>Growing Together</h3>
          <p>2024 · Building dreams, exploring new adventures, growing closer.</p>
          <a href="season2.php" class="season-link">Watch now</a>
        </article>
        <article class="season-card season-three">
          <span class="season-tag">Season 3</span>
          <h3>Three Years Strong</h3>
          <p>2025 · Anniversary celebration, highlights, and unforgettable love.</p>
          <a href="season3.php" class="season-link">Watch now</a>
        </article>
      </div>
    </section>
  </div>

<?php include __DIR__ . '/partials/footer.php';

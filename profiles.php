<?php
session_start();
if (empty($_SESSION['authenticated'])) {
    header('Location: index.php');
    exit;
}

// ─── CONFIGURABLE PROFILES ──────────────────────────────
// Add new profiles by adding an entry to this array.
// 'photo' should be a filename inside assets/photos/
// 'url' is where clicking the profile takes you.
$profiles = [
    [
        'name'  => 'Kimmy',
        'photo' => 'a2075462-3cc5-4ae6-98bf-3d1f8cba60fa.jpg',
        'url'   => 'home.php',
    ],
    // To add more profiles, copy the block above and change the values.
    // Example:
    // [
    //     'name'  => 'Guest',
    //     'photo' => 'guest.jpg',
    //     'url'   => 'home.php',
    // ],
];

// ─── BACKGROUND SLIDES ──────────────────────────────────
// Drop your romantic photos into assets/bg-slides/
// Any .jpg, .jpeg, .png, .webp file will be picked up automatically.
$slidesDir = __DIR__ . '/assets/bg-slides/';
$slideImages = [];
if (is_dir($slidesDir)) {
    $files = scandir($slidesDir);
    foreach ($files as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
            $slideImages[] = 'assets/bg-slides/' . $file;
        }
    }
}
$hasSlides = !empty($slideImages);

$pageTitle = "Who's Watching?";
$bodyClass = 'profiles-page';
$extraStyles = ['css/profile.css', 'css/profile-ui.css'];
$extraScriptsFooter = ['js/profile.js', 'js/profile-ui.js'];
include __DIR__ . '/partials/header.php';
?>

<!-- ─── Floating Hearts ─────────────────────────────── -->
<div class="bg-hearts" aria-hidden="true">
    <span class="bg-heart">❤️</span>
    <span class="bg-heart">💕</span>
    <span class="bg-heart">❤️</span>
    <span class="bg-heart">💗</span>
    <span class="bg-heart">❤️</span>
    <span class="bg-heart">💖</span>
    <span class="bg-heart">❤️</span>
    <span class="bg-heart">💕</span>
    <span class="bg-heart">❤️</span>
    <span class="bg-heart">💗</span>
</div>

<!-- ─── Background Slider ───────────────────────────── -->
<div class="bg-slider<?= $hasSlides ? '' : ' bg-slider--empty' ?>" id="bgSlider">
    <?php if ($hasSlides): ?>
        <?php foreach ($slideImages as $i => $img): ?>
            <div class="bg-slide<?= $i === 0 ? ' active' : '' ?>" style="background-image: url('<?= htmlspecialchars($img) ?>');"></div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<!-- ─── Profile Stage ───────────────────────────────── -->
<div class="profile-stage">
    <div class="screen-fade"></div>

    <div class="profile-message">
        <p class="intro-text">One profile has changed my life forever...</p>
    </div>

    <div class="profiles hidden">
        <h1 class="who-watching">Who's watching?</h1>

        <div class="profile-grid">
            <?php foreach ($profiles as $i => $profile): ?>
                <div class="profile-card" data-profile-index="<?= $i ?>" onclick="selectProfile('<?= htmlspecialchars($profile['url']) ?>')">
                    <div class="profile-pic-wrap">
                        <?php $photoPath = 'assets/photos/' . $profile['photo']; ?>
                        <img src="<?= htmlspecialchars($photoPath) ?>" alt="<?= htmlspecialchars($profile['name']) ?> profile picture" loading="lazy">

                        <div class="card-glow"></div>

                        <div class="heart-shower">
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                        </div>
                    </div>

                    <div class="profile-copy">
                        <span class="profile-name"><?= htmlspecialchars($profile['name']) ?></span>
                    </div>
                </div>
            <?php endforeach; ?>

            <!-- Placeholder "Add Profile" slot -->
            <div class="profile-card profile-card--add" data-profile-index="add" aria-label="Add a new profile">
                <div class="profile-pic-wrap profile-pic-wrap--add">
                    <div class="add-icon">+</div>
                </div>
                <div class="profile-copy">
                    <span class="profile-name profile-name--add">Add Profile</span>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Pass PHP data to JS
window.__annivProfiles = <?= json_encode($profiles) ?>;
window.__annivHasSlides = <?= json_encode($hasSlides) ?>;
window.__annivSlideCount = <?= json_encode(count($slideImages)) ?>;
</script>

<?php include __DIR__ . '/partials/footer.php'; ?>

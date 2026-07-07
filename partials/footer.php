    <script src="js/music.js"></script>
    <script src="js/video-music-sync.js"></script>
    <script src="js/slider.js"></script>
    <?php if (!empty($extraScriptsFooter)) : ?>
        <?php foreach ($extraScriptsFooter as $script) : ?>
            <script src="<?= htmlspecialchars($script) ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>

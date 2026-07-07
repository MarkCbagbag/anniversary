<?php
session_start();
if (empty($_SESSION['authenticated'])) {
    header('Location: index.php');
    exit;
}

// ─── CONFIGURABLE QUIZ ─────────────────────────────────
// Change the questions, options, and correct answers here.
// 'correct' is the 0-based index of the right option.
$questions = [
    [
        'question' => 'What is his favorite thing about you?',
        'options'  => ['Your smile', 'Your eyes', 'Your laugh', 'Your kindness'],
        'correct'  => 0,  // "Your smile" is correct
    ],
    [
        'question' => 'Where did you two first meet?',
        'options'  => ['At school', 'Online', 'Through friends', 'At a party'],
        'correct'  => 1,  // "Online" is correct
    ],
    [
        'question' => 'What is his dream for the two of you?',
        'options'  => ['Travel the world', 'Start a family', 'Build a home', 'All of the above'],
        'correct'  => 3,  // "All of the above" is correct
    ],
    [
        'question' => 'What does he love doing most with you?',
        'options'  => ['Watching movies', 'Cooking together', 'Late night talks', 'Going on adventures'],
        'correct'  => 2,  // "Late night talks" is correct
    ],
    [
        'question' => 'How long has he loved you?',
        'options'  => ['Since day one', '3 years', 'Forever', 'More than words can say'],
        'correct'  => 2,  // "Forever" is correct
    ],
];

$totalQuestions = count($questions);
$pageTitle = 'Quick Quiz 💕';
$bodyClass = 'quiz-page';
$extraStyles = ['css/quiz.css'];
$extraScriptsFooter = ['js/quiz.js'];
include __DIR__ . '/partials/header.php';
?>

<div class="quiz-container">
    <div class="quiz-card">
        <div class="quiz-heart">❤️</div>
        <h1 class="quiz-title">How Well Do You Know Him?</h1>
        <p class="quiz-subtitle">Answer these to prove it's really you, Kimmy 💕</p>

        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" id="quizProgressFill" style="width: 0%;"></div>
        </div>
        <p class="quiz-progress-text" id="quizProgressText">Question 1 of <?= $totalQuestions ?></p>

        <div class="quiz-body" id="quizBody">
            <!-- Dynamically filled by JS -->
        </div>

        <div class="quiz-feedback" id="quizFeedback"></div>

        <button class="quiz-next-btn hidden" id="quizNextBtn">Next →</button>
    </div>

    <!-- Completion screen -->
    <div class="quiz-complete hidden" id="quizComplete">
        <div class="quiz-complete-heart">💖</div>
        <h1>You Know Him So Well!</h1>
        <p>No doubt about it — you're truly his Kimmy.</p>
        <p class="quiz-complete-sub">Loading something special for you...</p>
    </div>
</div>

<script>
// Pass quiz data to JS
window.__annivQuiz = <?= json_encode($questions) ?>;
</script>

<?php include __DIR__ . '/partials/footer.php'; ?>

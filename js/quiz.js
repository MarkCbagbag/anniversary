/* ===========================
   Quiz — 5 questions about him
   After quiz: "Do you want to see our video?"
=========================== */

(function () {
  var questions = window.__annivQuiz || [];
  if (!questions.length) return;

  var total = questions.length;
  var currentIndex = 0;
  var answered = false;
  var score = 0;

  var quizCard = document.getElementById('quizCard');
  var quizBody = document.getElementById('quizBody');
  var quizFeedback = document.getElementById('quizFeedback');
  var quizNextBtn = document.getElementById('quizNextBtn');
  var quizProgressFill = document.getElementById('quizProgressFill');
  var quizProgressText = document.getElementById('quizProgressText');
  var quizComplete = document.getElementById('quizComplete');
  var quizContainer = document.querySelector('.quiz-container');

  if (!quizBody || !quizNextBtn) {
    console.warn('Quiz: required elements missing');
    return;
  }

  function renderQuestion(index) {
    if (index >= total) {
      showVideoPrompt();
      return;
    }

    answered = false;
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    quizNextBtn.classList.add('hidden');

    var q = questions[index];
    var percent = Math.round((index / total) * 100);
    quizProgressFill.style.width = percent + '%';
    quizProgressText.textContent = 'Question ' + (index + 1) + ' of ' + total;

    var html = '';
    html += '<span class="quiz-q-number">Q' + (index + 1) + '</span>';
    html += '<p class="quiz-question">' + escapeHtml(q.question) + '</p>';
    html += '<div class="quiz-options">';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="quiz-option" data-option="' + i + '">' + escapeHtml(q.options[i]) + '</button>';
    }
    html += '</div>';

    quizBody.innerHTML = html;

    // Bind option clicks
    var options = quizBody.querySelectorAll('.quiz-option');
    for (var j = 0; j < options.length; j++) {
      options[j].addEventListener('click', onOptionClick);
    }
  }

  function onOptionClick() {
    if (answered) return;
    answered = true;

    var selected = parseInt(this.getAttribute('data-option'), 10);
    var q = questions[currentIndex];
    var correct = q.correct;

    // Disable all options
    var allOpts = quizBody.querySelectorAll('.quiz-option');
    for (var k = 0; k < allOpts.length; k++) {
      allOpts[k].classList.add('disabled');
    }

    if (selected === correct) {
      this.classList.add('correct');
      quizFeedback.textContent = '💕 Perfect! You know him so well!';
      quizFeedback.className = 'quiz-feedback correct-fb';
      score++;
    } else {
      this.classList.add('wrong');
      allOpts[correct].classList.add('correct');
      quizFeedback.textContent = '💔 Not quite — but he loves you anyway!';
      quizFeedback.className = 'quiz-feedback wrong-fb';
    }

    quizNextBtn.classList.remove('hidden');
  }

  function showVideoPrompt() {
    quizProgressFill.style.width = '100%';
    quizProgressText.textContent = 'Quiz Complete!';

    // Replace quiz body with the video prompt
    var html = '';
    html += '<div class="quiz-q-number" style="background:rgba(255,95,163,0.2);">🎬</div>';
    html += '<p class="quiz-question">Do you want to see our special video?</p>';
    html += '<div class="quiz-options">';
    html += '<button class="quiz-option" id="videoYes">💖 Yes, show me!</button>';
    html += '<button class="quiz-option" id="videoNo">⏭ Skip for now</button>';
    html += '</div>';

    quizBody.innerHTML = html;
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    quizNextBtn.classList.add('hidden');

    document.getElementById('videoYes').addEventListener('click', function () {
      document.querySelector('.quiz-card').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      document.querySelector('.quiz-card').style.opacity = '0';
      document.querySelector('.quiz-card').style.transform = 'scale(0.95)';
      setTimeout(function () {
        window.location.href = 'intro.php';
      }, 500);
    });

    document.getElementById('videoNo').addEventListener('click', function () {
      document.querySelector('.quiz-card').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      document.querySelector('.quiz-card').style.opacity = '0';
      document.querySelector('.quiz-card').style.transform = 'scale(0.95)';
      setTimeout(function () {
        window.location.href = 'profiles.php';
      }, 500);
    });
  }

  // Next button
  quizNextBtn.addEventListener('click', function () {
    currentIndex++;
    renderQuestion(currentIndex);
  });

  // Start quiz
  renderQuestion(0);

  // Simple HTML escape
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();

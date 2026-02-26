// editor.js — Worksheet rendering & editing

const WorksheetEditor = {
  currentWorksheet: null,
  currentView: 'student', // 'student' | 'teacher'

  render(worksheet) {
    this.currentWorksheet = worksheet;
    const container = document.getElementById('worksheet-container');
    const titleEl = document.getElementById('worksheet-title');
    const instructionsEl = document.getElementById('worksheet-instructions');
    const totalScore = document.getElementById('total-score');
    const questionsList = document.getElementById('questions-list');

    titleEl.textContent = worksheet.title || 'Worksheet';
    instructionsEl.textContent = worksheet.instructions || '';
    totalScore.textContent = worksheet.questions.length;

    // Set default date
    const dateEl = document.getElementById('header-date');
    if (!dateEl.textContent.trim()) {
      dateEl.textContent = new Date().toLocaleDateString();
    }

    questionsList.innerHTML = '';
    worksheet.questions.forEach((q, idx) => {
      questionsList.appendChild(this.renderQuestion(q, idx));
    });

    this.updateView();
  },

  renderQuestion(q, idx) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.draggable = true;
    card.dataset.index = idx;

    const typeLabel = {
      'multiple_choice': 'Multiple Choice',
      'fill_blank': 'Fill in the Blank',
      'short_answer': 'Short Answer',
      'true_false': 'True / False',
      'matching': 'Matching',
      'word_problem': 'Word Problem'
    }[q.type] || q.type;

    let optionsHTML = '';

    if (q.type === 'matching' && q.matchingPairs) {
      optionsHTML = `
        <table class="matching-table">
          <thead><tr><th>Column A</th><th>Column B</th></tr></thead>
          <tbody>
            ${q.matchingPairs.map((pair, i) => `
              <tr>
                <td contenteditable="true" data-field="matchLeft" data-pair="${i}">${pair.left}</td>
                <td contenteditable="true" data-field="matchRight" data-pair="${i}">${this.currentView === 'student' ? '________' : pair.right}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>`;
    } else if (q.options && q.options.length > 0) {
      optionsHTML = `
        <ul class="question-options">
          ${q.options.map((opt, i) => `<li contenteditable="true" data-field="option" data-option="${i}">${opt}</li>`).join('')}
        </ul>`;
    }

    // Answer blank for student view
    const blankHTML = q.type === 'short_answer' || q.type === 'word_problem'
      ? '<div class="answer-blank"></div>'
      : q.type === 'fill_blank'
        ? ''
        : '';

    card.innerHTML = `
      <div class="question-top">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="question-number">Q${idx + 1}.</span>
          <span class="question-type-badge">${typeLabel}</span>
        </div>
        <div class="question-actions">
          <button class="question-action-btn" onclick="WorksheetEditor.moveQuestion(${idx}, -1)" title="Move up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="question-action-btn" onclick="WorksheetEditor.moveQuestion(${idx}, 1)" title="Move down">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="question-action-btn danger" onclick="WorksheetEditor.removeQuestion(${idx})" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
      <div class="question-text" contenteditable="true" data-field="question" data-index="${idx}">${q.question}</div>
      ${optionsHTML}
      ${blankHTML}
      <div class="answer-section" data-index="${idx}">
        <div class="answer-label">✓ Answer</div>
        <div class="answer-text" contenteditable="true" data-field="answer" data-index="${idx}">${q.answer || ''}</div>
        <div class="explanation-label">💡 Explanation</div>
        <div class="explanation-text" contenteditable="true" data-field="explanation" data-index="${idx}">${q.explanation || ''}</div>
      </div>
    `;

    // Drag events
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', idx.toString());
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const toIdx = parseInt(card.dataset.index);
      if (fromIdx !== toIdx) {
        this.reorderQuestion(fromIdx, toIdx);
      }
    });

    // Editable field change tracking
    card.querySelectorAll('[contenteditable]').forEach(el => {
      el.addEventListener('blur', () => this.syncEdits(el));
    });

    return card;
  },

  syncEdits(el) {
    if (!this.currentWorksheet) return;
    const field = el.dataset.field;
    const idx = parseInt(el.dataset.index);
    const q = this.currentWorksheet.questions[idx];
    if (!q) return;

    if (field === 'question') q.question = el.textContent;
    else if (field === 'answer') q.answer = el.textContent;
    else if (field === 'explanation') q.explanation = el.textContent;
    else if (field === 'option') {
      const optIdx = parseInt(el.dataset.option);
      if (q.options) q.options[optIdx] = el.textContent;
    } else if (field === 'matchLeft' || field === 'matchRight') {
      const pairIdx = parseInt(el.dataset.pair);
      if (q.matchingPairs && q.matchingPairs[pairIdx]) {
        if (field === 'matchLeft') q.matchingPairs[pairIdx].left = el.textContent;
        else q.matchingPairs[pairIdx].right = el.textContent;
      }
    }
  },

  setView(view) {
    this.currentView = view;
    this.updateView();
    if (this.currentWorksheet) {
      // Re-render matching tables to show/hide answers
      this.render(this.currentWorksheet);
    }
  },

  updateView() {
    document.querySelectorAll('.answer-section').forEach(el => {
      el.classList.toggle('visible', this.currentView === 'teacher');
    });
    document.querySelectorAll('.answer-blank').forEach(el => {
      el.style.display = this.currentView === 'student' ? 'block' : 'none';
    });
  },

  moveQuestion(idx, direction) {
    const questions = this.currentWorksheet.questions;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= questions.length) return;
    [questions[idx], questions[newIdx]] = [questions[newIdx], questions[idx]];
    this.render(this.currentWorksheet);
  },

  reorderQuestion(fromIdx, toIdx) {
    const questions = this.currentWorksheet.questions;
    const [moved] = questions.splice(fromIdx, 1);
    questions.splice(toIdx, 0, moved);
    this.render(this.currentWorksheet);
  },

  removeQuestion(idx) {
    this.currentWorksheet.questions.splice(idx, 1);
    document.getElementById('total-score').textContent = this.currentWorksheet.questions.length;
    this.render(this.currentWorksheet);
  },

  addQuestion() {
    const newQ = {
      id: this.currentWorksheet.questions.length + 1,
      type: 'short_answer',
      question: 'New question — click to edit',
      answer: 'Answer here',
      explanation: 'Explanation here'
    };
    this.currentWorksheet.questions.push(newQ);
    document.getElementById('total-score').textContent = this.currentWorksheet.questions.length;
    this.render(this.currentWorksheet);

    // Scroll to new question
    const list = document.getElementById('questions-list');
    list.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  getWorksheetData() {
    // Gather header info
    return {
      school: document.getElementById('header-school')?.textContent || '',
      title: document.getElementById('worksheet-title')?.textContent || '',
      class: document.getElementById('header-class')?.textContent || '',
      date: document.getElementById('header-date')?.textContent || '',
      instructions: document.getElementById('worksheet-instructions')?.textContent || '',
      questions: this.currentWorksheet?.questions || []
    };
  }
};

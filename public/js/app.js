// app.js — Main application controller

(function() {
  'use strict';

  // === DOM refs ===
  const topicInput = document.getElementById('topic');
  const gradeLevelSelect = document.getElementById('gradeLevel');
  const languageSelect = document.getElementById('language');
  const modelInput = document.getElementById('model');
  const btnGenerate = document.getElementById('btn-generate');
  const emptyState = document.getElementById('empty-state');
  const loadingState = document.getElementById('loading-state');
  const worksheetContainer = document.getElementById('worksheet-container');
  const viewToggle = document.getElementById('view-toggle');
  const exportButtons = document.getElementById('export-buttons');
  const btnExportStudent = document.getElementById('btn-export-student');
  const btnExportTeacher = document.getElementById('btn-export-teacher');
  const btnAddQuestion = document.getElementById('btn-add-question');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const historyList = document.getElementById('history-list');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const toast = document.getElementById('toast');

  // === State ===
  let selectedQuestionCount = 10;
  let selectedDifficulty = 'medium';
  const STORAGE_KEY = 'ai_worksheet_history';

  // === Helpers ===
  function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.className = 'toast', 3500);
  }

  function showView(view) {
    emptyState.style.display = view === 'empty' ? 'block' : 'none';
    loadingState.style.display = view === 'loading' ? 'block' : 'none';
    worksheetContainer.style.display = view === 'worksheet' ? 'block' : 'none';
    viewToggle.style.display = view === 'worksheet' ? 'flex' : 'none';
    exportButtons.style.display = view === 'worksheet' ? 'flex' : 'none';
  }

  // === Button Groups (question count, difficulty) ===
  document.querySelectorAll('.btn-group').forEach(group => {
    group.querySelectorAll('.btn-option').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.btn-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Determine which group
        const val = btn.dataset.value;
        if (['5','10','15','20'].includes(val)) selectedQuestionCount = parseInt(val);
        else if (['easy','medium','hard'].includes(val)) selectedDifficulty = val;
      });
    });
  });

  // === Sidebar Toggle ===
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('mobile-open');
  });

  // === View Toggle ===
  viewToggle.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      viewToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      WorksheetEditor.setView(btn.dataset.view);
    });
  });

  // === Generate ===
  btnGenerate.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    if (!topic) {
      showToast(t('toastEnterTopic'), 'error');
      topicInput.focus();
      return;
    }

    const questionTypes = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
    if (questionTypes.length === 0) {
      showToast(t('toastSelectType'), 'error');
      return;
    }

    const params = {
      topic,
      gradeLevel: gradeLevelSelect.value,
      questionCount: selectedQuestionCount,
      questionTypes,
      difficulty: selectedDifficulty,
      language: languageSelect.value,
      model: modelInput.value.trim() || 'gpt-4o'
    };

    showView('loading');
    btnGenerate.disabled = true;

    try {
      const worksheet = await WorksheetGenerator.generate(params);
      WorksheetEditor.render(worksheet);
      showView('worksheet');
      saveToHistory(worksheet, params);
      showToast(t('toastGenerated'), 'success');
    } catch (err) {
      console.error('Generation error:', err);
      showToast(err.message || 'Failed to generate worksheet.', 'error');
      showView('empty');
    } finally {
      btnGenerate.disabled = false;
    }
  });

  // === Export ===
  btnExportStudent.addEventListener('click', async () => {
    showToast(t('toastStudentPDF'));
    try {
      await WorksheetExport.exportPDF('student');
      showToast(t('toastStudentPDFDone'), 'success');
    } catch (e) {
      showToast('PDF export failed: ' + e.message, 'error');
    }
  });

  btnExportTeacher.addEventListener('click', async () => {
    showToast(t('toastAnswerPDF'));
    try {
      await WorksheetExport.exportPDF('teacher');
      showToast(t('toastAnswerPDFDone'), 'success');
    } catch (e) {
      showToast('PDF export failed: ' + e.message, 'error');
    }
  });

  // === Add Question ===
  btnAddQuestion.addEventListener('click', () => {
    if (WorksheetEditor.currentWorksheet) {
      WorksheetEditor.addQuestion();
    }
  });

  // === Templates ===
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const config = WorksheetGenerator.getTemplateConfig(btn.dataset.template);
      if (!config) return;

      topicInput.value = config.topic;
      gradeLevelSelect.value = config.gradeLevel;

      // Set question types checkboxes
      document.querySelectorAll('.checkbox-group input').forEach(cb => {
        cb.checked = config.questionTypes.includes(cb.value);
      });

      // Set difficulty
      document.querySelectorAll('.btn-group .btn-option').forEach(b => {
        if (['easy','medium','hard'].includes(b.dataset.value)) {
          b.classList.toggle('active', b.dataset.value === config.difficulty);
        }
      });
      selectedDifficulty = config.difficulty;

      showToast(t('toastTemplateLoaded'));
    });
  });

  // === History ===
  function saveToHistory(worksheet, params) {
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      history.unshift({
        title: worksheet.title,
        params,
        worksheet,
        date: new Date().toISOString()
      });
      // Keep last 20
      if (history.length > 20) history.length = 20;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      renderHistory();
    } catch (e) { /* localStorage might be full */ }
  }

  function renderHistory() {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {}

    if (!history.length) {
      historyList.innerHTML = '<p class="empty-state">No worksheets yet</p>';
      return;
    }

    historyList.innerHTML = history.map((item, i) => {
      const d = new Date(item.date);
      const dateStr = `${d.getMonth()+1}/${d.getDate()}`;
      return `
        <div class="history-item" data-index="${i}">
          <span class="title">${item.title || item.params?.topic || 'Untitled'}</span>
          <span class="date">${dateStr}</span>
          <button class="delete-history" data-index="${i}" title="Remove">×</button>
        </div>`;
    }).join('');

    // Click to load
    historyList.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-history')) return;
        const idx = parseInt(el.dataset.index);
        const item = history[idx];
        if (item && item.worksheet) {
          WorksheetEditor.render(item.worksheet);
          showView('worksheet');
          showToast(t('toastLoadedHistory'), 'success');
        }
      });
    });

    // Delete single
    historyList.querySelectorAll('.delete-history').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index);
        history.splice(idx, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        renderHistory();
      });
    });
  }

  btnClearHistory.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
    showToast(t('toastHistoryCleared'));
  });

  // === Keyboard shortcut ===
  topicInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      btnGenerate.click();
    }
  });

  // === Init ===
  renderHistory();
  showView('empty');

  // Set initial language from dropdown
  setLanguage(languageSelect.value);

  // Language change handler — update UI language
  languageSelect.addEventListener('change', () => {
    setLanguage(languageSelect.value);
  });

  // Close sidebar on mobile when clicking main area
  document.getElementById('main-content').addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('mobile-open');
    }
  });

})();

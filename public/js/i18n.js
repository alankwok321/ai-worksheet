// i18n.js — Internationalization / UI language switching

const I18N = {
  'en': {
    // Header
    appTitle: 'AI Worksheet Generator',
    // Tabs / View Toggle
    studentView: 'Student View',
    teacherView: 'Teacher View',
    studentPDF: 'Student PDF',
    answerKeyPDF: 'Answer Key PDF',
    // Sidebar labels
    topicLabel: 'Topic / Subject',
    topicPlaceholder: 'e.g., "Grade 5 Fractions", "Photosynthesis"',
    gradeLevelLabel: 'Grade Level',
    questionCountLabel: 'Number of Questions',
    questionTypesLabel: 'Question Types',
    multipleChoice: 'Multiple Choice',
    fillBlank: 'Fill in the Blank',
    shortAnswer: 'Short Answer',
    trueFalse: 'True / False',
    matching: 'Matching',
    wordProblem: 'Word Problems',
    difficultyLabel: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    languageLabel: 'Language',
    modelLabel: 'AI Model',
    apiSettingsLabel: 'API Settings',
    apiSettingsExpand: 'Expand',
    apiSettingsCollapse: 'Collapse',
    apiBaseUrlLabel: 'API Base URL',
    apiBaseUrlHint: 'Leave empty to use OpenRouter',
    apiKeyLabel: 'API Key 🔑',
    apiKeyPlaceholder: 'sk-... or or-...',
    apiKeyHint: 'Key is stored only in your browser',
    apiSave: '💾 Save',
    apiClear: '🗑️ Clear',
    apiSaved: 'API settings saved!',
    apiCleared: 'API settings cleared.',
    apiKeyRequired: 'Please set your API Key first.',
    generateBtn: 'Generate Worksheet',
    templatesLabel: 'Quick Templates',
    templateMath: '🧮 Math Basics',
    templateScience: '🔬 Science Quiz',
    templateVocab: '📚 Vocabulary Test',
    templateReading: '📖 Reading Comprehension',
    recentLabel: 'Recent Worksheets',
    clearHistory: 'Clear',
    noHistory: 'No worksheets yet',
    // Grade levels
    grade: 'Grade',
    university: 'University',
    primaryGroup: 'Primary',
    secondaryGroup: 'Secondary',
    gradeP1: 'Primary 1', gradeP2: 'Primary 2', gradeP3: 'Primary 3',
    gradeP4: 'Primary 4', gradeP5: 'Primary 5', gradeP6: 'Primary 6',
    gradeS1: 'Secondary 1', gradeS2: 'Secondary 2', gradeS3: 'Secondary 3',
    gradeS4: 'Secondary 4', gradeS5: 'Secondary 5', gradeS6: 'Secondary 6',
    // Main area
    emptyTitle: 'Create Your Worksheet',
    emptyDesc: 'Enter a topic and customize your options, then click <strong>Generate Worksheet</strong> to get started.',
    featureAI: 'AI-Powered',
    featureAIDesc: 'Generates pedagogically sound questions tailored to any topic and grade level',
    featureEdit: 'Fully Editable',
    featureEditDesc: 'Click any question to edit. Add, remove, or reorder questions as needed',
    featurePDF: 'PDF Export',
    featurePDFDesc: 'Export clean student worksheets and answer keys ready for printing',
    featureBilingual: 'Bilingual',
    featureBilingualDesc: 'Generate worksheets in English or Traditional Chinese (繁體中文)',
    loadingTitle: 'Generating Your Worksheet...',
    loadingDesc: 'The AI is crafting questions tailored to your specifications. This usually takes 10-20 seconds.',
    addQuestion: 'Add Question',
    // Worksheet header
    schoolPlaceholder: 'School Name',
    classPlaceholder: 'Class / Section',
    datePlaceholder: 'Date',
    nameField: 'Name: ___________________________',
    scoreField: 'Score: _______ /',
    // Question types in cards
    typeMultipleChoice: 'Multiple Choice',
    typeFillBlank: 'Fill in the Blank',
    typeShortAnswer: 'Short Answer',
    typeTrueFalse: 'True / False',
    typeMatching: 'Matching',
    typeWordProblem: 'Word Problem',
    columnA: 'Column A',
    columnB: 'Column B',
    answerLabel: '✓ Answer',
    explanationLabel: '💡 Explanation',
    // Toasts
    toastEnterTopic: 'Please enter a topic or subject.',
    toastSelectType: 'Please select at least one question type.',
    toastGenerated: 'Worksheet generated successfully!',
    toastTemplateLoaded: 'Template loaded! Click Generate to create the worksheet.',
    toastHistoryCleared: 'History cleared.',
    toastLoadedHistory: 'Loaded from history.',
    toastStudentPDF: 'Generating student PDF...',
    toastStudentPDFDone: 'Student PDF downloaded!',
    toastAnswerPDF: 'Generating answer key PDF...',
    toastAnswerPDFDone: 'Answer key PDF downloaded!',
  },
  'zh-TW': {
    appTitle: 'AI 工作紙生成器',
    studentView: '學生版',
    teacherView: '教師版',
    studentPDF: '學生版 PDF',
    answerKeyPDF: '答案 PDF',
    topicLabel: '主題 / 科目',
    topicPlaceholder: '例如：「五年級分數」、「光合作用」',
    gradeLevelLabel: '年級',
    questionCountLabel: '題目數量',
    questionTypesLabel: '題目類型',
    multipleChoice: '選擇題',
    fillBlank: '填充題',
    shortAnswer: '簡答題',
    trueFalse: '是非題',
    matching: '配對題',
    wordProblem: '應用題',
    difficultyLabel: '難度',
    easy: '簡單',
    medium: '中等',
    hard: '困難',
    languageLabel: '語言',
    modelLabel: 'AI 模型',
    apiSettingsLabel: 'API 設定',
    apiSettingsExpand: '展開',
    apiSettingsCollapse: '收起',
    apiBaseUrlLabel: 'API Base URL',
    apiBaseUrlHint: '留空使用 OpenRouter',
    apiKeyLabel: 'API Key 🔑',
    apiKeyPlaceholder: 'sk-... 或 or-...',
    apiKeyHint: '金鑰只儲存在你的瀏覽器中',
    apiSave: '💾 儲存',
    apiClear: '🗑️ 清除',
    apiSaved: 'API 設定已儲存！',
    apiCleared: 'API 設定已清除。',
    apiKeyRequired: '請先設定 API Key。',
    generateBtn: '生成工作紙',
    templatesLabel: '快速模板',
    templateMath: '🧮 數學基礎',
    templateScience: '🔬 科學測驗',
    templateVocab: '📚 詞彙測試',
    templateReading: '📖 閱讀理解',
    recentLabel: '最近的工作紙',
    clearHistory: '清除',
    noHistory: '暫無工作紙',
    grade: '年級',
    university: '大學',
    primaryGroup: '小學',
    secondaryGroup: '中學',
    gradeP1: '小一', gradeP2: '小二', gradeP3: '小三',
    gradeP4: '小四', gradeP5: '小五', gradeP6: '小六',
    gradeS1: '中一', gradeS2: '中二', gradeS3: '中三',
    gradeS4: '中四', gradeS5: '中五', gradeS6: '中六',
    emptyTitle: '建立你的工作紙',
    emptyDesc: '輸入主題並自訂選項，然後點擊 <strong>生成工作紙</strong> 開始。',
    featureAI: 'AI 驅動',
    featureAIDesc: '根據任何主題和年級生成專業的教學題目',
    featureEdit: '完全可編輯',
    featureEditDesc: '點擊任何題目即可編輯。可以新增、刪除或重新排列題目',
    featurePDF: 'PDF 匯出',
    featurePDFDesc: '匯出整潔的學生工作紙和答案，可直接列印',
    featureBilingual: '雙語支援',
    featureBilingualDesc: '可生成英文或繁體中文工作紙',
    loadingTitle: '正在生成工作紙...',
    loadingDesc: 'AI 正在根據你的設定製作題目，通常需要 10-20 秒。',
    addQuestion: '新增題目',
    schoolPlaceholder: '學校名稱',
    classPlaceholder: '班別',
    datePlaceholder: '日期',
    nameField: '姓名：___________________________',
    scoreField: '得分：_______ /',
    typeMultipleChoice: '選擇題',
    typeFillBlank: '填充題',
    typeShortAnswer: '簡答題',
    typeTrueFalse: '是非題',
    typeMatching: '配對題',
    typeWordProblem: '應用題',
    columnA: '甲欄',
    columnB: '乙欄',
    answerLabel: '✓ 答案',
    explanationLabel: '💡 解釋',
    toastEnterTopic: '請輸入主題或科目。',
    toastSelectType: '請至少選擇一種題目類型。',
    toastGenerated: '工作紙生成成功！',
    toastTemplateLoaded: '模板已載入！點擊「生成工作紙」開始。',
    toastHistoryCleared: '歷史記錄已清除。',
    toastLoadedHistory: '已從歷史記錄載入。',
    toastStudentPDF: '正在生成學生版 PDF...',
    toastStudentPDFDone: '學生版 PDF 已下載！',
    toastAnswerPDF: '正在生成答案 PDF...',
    toastAnswerPDFDone: '答案 PDF 已下載！',
  }
};

let currentLang = 'zh-TW';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N['en'] && I18N['en'][key]) || key;
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t('appTitle');
  applyTranslations();
}

function applyTranslations() {
  // Helper to set text by selector
  const setText = (sel, key) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  };
  const setHTML = (sel, key) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = t(key);
  };
  const setPlaceholder = (sel, key) => {
    const el = document.querySelector(sel);
    if (el) el.placeholder = t(key);
  };
  const setAttr = (sel, attr, key) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, t(key));
  };

  // Header
  setText('.logo h1', 'appTitle');

  // View toggle
  const viewBtns = document.querySelectorAll('.toggle-btn');
  if (viewBtns[0]) viewBtns[0].innerHTML = viewBtns[0].querySelector('svg')?.outerHTML + ' ' + t('studentView');
  if (viewBtns[1]) viewBtns[1].innerHTML = viewBtns[1].querySelector('svg')?.outerHTML + ' ' + t('teacherView');

  // Export buttons
  const exportStudent = document.getElementById('btn-export-student');
  const exportTeacher = document.getElementById('btn-export-teacher');
  if (exportStudent) exportStudent.innerHTML = exportStudent.querySelector('svg')?.outerHTML + ' ' + t('studentPDF');
  if (exportTeacher) exportTeacher.innerHTML = exportTeacher.querySelector('svg')?.outerHTML + ' ' + t('answerKeyPDF');

  // Sidebar labels
  document.querySelectorAll('.form-label').forEach(el => {
    const text = el.textContent.trim();
    // Map existing English labels to i18n keys
    if (text.startsWith('Topic')) el.textContent = t('topicLabel');
    else if (text.startsWith('Grade Level')) el.textContent = t('gradeLevelLabel');
    else if (text.startsWith('Number of')) el.textContent = t('questionCountLabel');
    else if (text.startsWith('Question Types') || text === '題目類型') el.textContent = t('questionTypesLabel');
    else if (text.startsWith('Difficulty') || text === '難度') el.textContent = t('difficultyLabel');
    else if (text.startsWith('Language') || text === '語言') el.textContent = t('languageLabel');
    else if (text.startsWith('AI Model') || text === 'AI 模型') el.textContent = t('modelLabel');
    else if (text.startsWith('Quick') || text === '快速模板') el.textContent = t('templatesLabel');
  });

  // Recent worksheets label (has child button)
  document.querySelectorAll('.form-label').forEach(el => {
    const btnChild = el.querySelector('#btn-clear-history');
    const text = el.childNodes[0]?.textContent?.trim();
    if (btnChild) {
      el.childNodes[0].textContent = t('recentLabel') + ' ';
      btnChild.textContent = t('clearHistory');
    }
  });

  // Topic input placeholder
  setPlaceholder('#topic', 'topicPlaceholder');

  // Grade level options
  const gradeSelect = document.getElementById('gradeLevel');
  if (gradeSelect) {
    // Update optgroup labels
    const primaryGroup = document.getElementById('gradegroup-primary');
    const secondaryGroup = document.getElementById('gradegroup-secondary');
    if (primaryGroup) primaryGroup.label = t('primaryGroup');
    if (secondaryGroup) secondaryGroup.label = t('secondaryGroup');

    // Update option text
    const gradeKeys = {
      'P1': 'gradeP1', 'P2': 'gradeP2', 'P3': 'gradeP3',
      'P4': 'gradeP4', 'P5': 'gradeP5', 'P6': 'gradeP6',
      'S1': 'gradeS1', 'S2': 'gradeS2', 'S3': 'gradeS3',
      'S4': 'gradeS4', 'S5': 'gradeS5', 'S6': 'gradeS6',
    };
    gradeSelect.querySelectorAll('option').forEach(opt => {
      if (gradeKeys[opt.value]) opt.textContent = t(gradeKeys[opt.value]);
    });
  }

  // Question type checkboxes
  const typeMap = {
    'multiple_choice': 'multipleChoice',
    'fill_blank': 'fillBlank',
    'short_answer': 'shortAnswer',
    'true_false': 'trueFalse',
    'matching': 'matching',
    'word_problem': 'wordProblem'
  };
  document.querySelectorAll('.checkbox-group .checkbox-label').forEach(label => {
    const cb = label.querySelector('input');
    if (cb && typeMap[cb.value]) {
      // Preserve checkbox, update text
      const cbHTML = cb.outerHTML;
      label.innerHTML = cbHTML + ' ' + t(typeMap[cb.value]);
    }
  });

  // Difficulty buttons
  document.querySelectorAll('.btn-group .btn-option').forEach(btn => {
    if (btn.dataset.value === 'easy') btn.textContent = t('easy');
    else if (btn.dataset.value === 'medium') btn.textContent = t('medium');
    else if (btn.dataset.value === 'hard') btn.textContent = t('hard');
  });

  // Generate button
  const genBtn = document.getElementById('btn-generate');
  if (genBtn) {
    const svg = genBtn.querySelector('svg')?.outerHTML || '';
    genBtn.innerHTML = svg + ' ' + t('generateBtn');
  }

  // Templates
  document.querySelectorAll('.template-btn').forEach(btn => {
    if (btn.dataset.template === 'math') btn.textContent = t('templateMath');
    else if (btn.dataset.template === 'science') btn.textContent = t('templateScience');
    else if (btn.dataset.template === 'vocabulary') btn.textContent = t('templateVocab');
    else if (btn.dataset.template === 'reading') btn.textContent = t('templateReading');
  });

  // Empty state
  setText('#empty-state h2', 'emptyTitle');
  setHTML('#empty-state > p', 'emptyDesc');

  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards[0]) { featureCards[0].querySelector('h3').textContent = t('featureAI'); featureCards[0].querySelector('p').textContent = t('featureAIDesc'); }
  if (featureCards[1]) { featureCards[1].querySelector('h3').textContent = t('featureEdit'); featureCards[1].querySelector('p').textContent = t('featureEditDesc'); }
  if (featureCards[2]) { featureCards[2].querySelector('h3').textContent = t('featurePDF'); featureCards[2].querySelector('p').textContent = t('featurePDFDesc'); }
  if (featureCards[3]) { featureCards[3].querySelector('h3').textContent = t('featureBilingual'); featureCards[3].querySelector('p').textContent = t('featureBilingualDesc'); }

  // Loading state
  setText('#loading-state h2', 'loadingTitle');
  setText('#loading-state p', 'loadingDesc');

  // Add question button
  const addBtn = document.getElementById('btn-add-question');
  if (addBtn) {
    const svg = addBtn.querySelector('svg')?.outerHTML || '';
    addBtn.innerHTML = svg + ' ' + t('addQuestion');
  }

  // Worksheet header placeholders
  setAttr('#header-school', 'data-placeholder', 'schoolPlaceholder');
  setAttr('#header-class', 'data-placeholder', 'classPlaceholder');
  setAttr('#header-date', 'data-placeholder', 'datePlaceholder');

  // Student info
  const studentInfo = document.querySelector('.student-info');
  if (studentInfo) {
    const spans = studentInfo.querySelectorAll('span');
    if (spans[0]) spans[0].textContent = t('nameField');
    if (spans[1]) spans[1].innerHTML = t('scoreField') + ' <span id="total-score">' + (document.getElementById('total-score')?.textContent || '') + '</span>';
  }

  // No history text
  const historyEmpty = document.querySelector('#history-list .empty-state');
  if (historyEmpty) historyEmpty.textContent = t('noHistory');
}

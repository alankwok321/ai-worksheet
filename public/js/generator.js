// generator.js — AI worksheet generation logic

const WorksheetGenerator = {
  async generate({ topic, gradeLevel, questionCount, questionTypes, difficulty, language, model, apiKey, apiBaseUrl }) {
    const response = await fetch('/api/generate-worksheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, gradeLevel, questionCount, questionTypes, difficulty, language, model, apiKey, apiBaseUrl })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(err.error || `Server error: ${response.status}`);
    }

    const data = await response.json();

    // Validate structure
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid worksheet data returned from AI.');
    }

    // Normalize question IDs
    data.questions = data.questions.map((q, i) => ({
      ...q,
      id: q.id || i + 1,
      type: q.type || 'short_answer'
    }));

    return data;
  },

  // Build the prompt parameters from templates
  getTemplateConfig(templateName) {
    const templates = {
      math: {
        topic: 'Math Basics — Addition, Subtraction, Multiplication, Division',
        gradeLevel: '5',
        questionTypes: ['multiple_choice', 'word_problem', 'fill_blank'],
        difficulty: 'medium'
      },
      science: {
        topic: 'General Science Quiz — Biology, Physics, Chemistry basics',
        gradeLevel: '7',
        questionTypes: ['multiple_choice', 'true_false', 'short_answer'],
        difficulty: 'medium'
      },
      vocabulary: {
        topic: 'Vocabulary Test — Common English words and definitions',
        gradeLevel: '6',
        questionTypes: ['matching', 'fill_blank', 'multiple_choice'],
        difficulty: 'easy'
      },
      reading: {
        topic: 'Reading Comprehension — Short passage with questions',
        gradeLevel: '5',
        questionTypes: ['short_answer', 'multiple_choice', 'true_false'],
        difficulty: 'medium'
      }
    };
    return templates[templateName] || null;
  }
};

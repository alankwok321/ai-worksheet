const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// AI Worksheet Generation Endpoint
app.post('/api/generate-worksheet', async (req, res) => {
  const { topic, gradeLevel, questionCount, questionTypes, difficulty, language, model } = req.body;

  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const selectedModel = model || process.env.OPENAI_MODEL || 'gpt-4o';

  const typesStr = questionTypes.join(', ');
  const langInstruction = language === 'zh-TW'
    ? 'Generate the entire worksheet in Traditional Chinese (繁體中文). All questions, options, answers, and explanations must be in Traditional Chinese.'
    : 'Generate the entire worksheet in English.';

  const systemPrompt = `You are an expert educational content creator. Generate high-quality, pedagogically sound worksheets for teachers and students. Always respond with valid JSON only — no markdown, no code fences, no commentary.`;

  const userPrompt = `Create a worksheet with these specifications:
- Topic: ${topic}
- Grade Level: ${gradeLevel}
- Number of Questions: ${questionCount}
- Question Types: ${typesStr}
- Difficulty: ${difficulty}
- ${langInstruction}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Worksheet title",
  "instructions": "Brief instructions for students",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice | fill_blank | short_answer | true_false | matching | word_problem",
      "question": "The question text",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "matchingPairs": [{"left": "...", "right": "..."}],
      "answer": "The correct answer",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Rules:
- For multiple_choice: include exactly 4 options. The answer should be the letter + text (e.g., "B) Mitochondria").
- For fill_blank: use "___" in the question where the blank goes. The answer is the word/phrase that fills the blank.
- For short_answer: the answer should be a concise model answer.
- For true_false: options should be ["True", "False"]. The answer is "True" or "False".
- For matching: include a "matchingPairs" array with left/right pairs. Provide 4-6 pairs. The answer should describe the correct matching.
- For word_problem: write a detailed scenario. The answer should show the solution steps.
- Mix the question types as requested. If multiple types are specified, distribute questions roughly equally among them.
- Make questions progressively challenging within the worksheet.
- Ensure factual accuracy and age-appropriate content for the specified grade level.
- Return ONLY the JSON object, no other text.`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('AI API error:', response.status, errText);
      return res.status(response.status).json({ error: `AI API error: ${response.status}`, details: errText });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No content returned from AI.' });
    }

    // Strip markdown code fences if present
    content = content.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    let worksheet;
    try {
      worksheet = JSON.parse(content);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message, '\nContent:', content.substring(0, 500));
      return res.status(500).json({ error: 'Failed to parse AI response as JSON.', raw: content.substring(0, 1000) });
    }

    res.json(worksheet);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error generating worksheet.', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI Worksheet Generator running on http://localhost:${PORT}`);
});

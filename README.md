# AI Worksheet Generator

AI-powered worksheet generator for teachers and students. Enter a topic and the AI generates a complete printable worksheet with questions, answer key, and PDF export.

## Features

- 🎯 **AI-Powered Generation** — Creates pedagogically sound questions for any topic and grade level
- ✏️ **Fully Editable** — Click any question to edit text, add/remove/reorder questions
- 📄 **PDF Export** — Export clean student worksheets and answer keys for printing
- 🌐 **Bilingual** — Generate worksheets in English or Traditional Chinese (繁體中文)
- 💾 **History & Templates** — Save worksheets locally, use quick templates
- 📱 **Responsive** — Works on desktop and tablet

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables
export OPENAI_BASE_URL=https://api.openai.com/v1
export OPENAI_API_KEY=your-api-key-here

# Run locally
npm start
# Open http://localhost:3000
```

## Question Types

- Multiple Choice
- Fill in the Blank
- Short Answer
- True / False
- Matching
- Word Problems

## Tech Stack

- **Frontend:** HTML + CSS + Vanilla JS
- **Backend:** Node.js + Express
- **AI:** OpenAI-compatible API
- **PDF:** html2pdf.js
- **Deploy:** Vercel

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_BASE_URL` | OpenAI-compatible API base URL | `https://api.openai.com/v1` |
| `OPENAI_API_KEY` | API key for the AI service | Required |
| `OPENAI_MODEL` | Default model to use | `gpt-4o` |
| `PORT` | Server port | `3000` |

## Deploy to Vercel

```bash
vercel --yes --prod
```

Set environment variables in Vercel dashboard: `OPENAI_BASE_URL` and `OPENAI_API_KEY`.

## License

MIT

// export.js — PDF export using html2pdf.js

const WorksheetExport = {

  async exportPDF(mode = 'student') {
    const data = WorksheetEditor.getWorksheetData();
    if (!data.questions.length) return;

    const html = this.buildPrintHTML(data, mode);

    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    document.body.appendChild(tempDiv);

    const filename = mode === 'student'
      ? `${data.title || 'Worksheet'} - Student.pdf`
      : `${data.title || 'Worksheet'} - Answer Key.pdf`;

    const opt = {
      margin: [12, 15, 12, 15],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(tempDiv).save();
    } finally {
      document.body.removeChild(tempDiv);
    }
  },

  buildPrintHTML(data, mode) {
    const isTeacher = mode === 'teacher';

    const questionsHTML = data.questions.map((q, idx) => {
      const typeLabel = {
        'multiple_choice': 'Multiple Choice',
        'fill_blank': 'Fill in the Blank',
        'short_answer': 'Short Answer',
        'true_false': 'True / False',
        'matching': 'Matching',
        'word_problem': 'Word Problem'
      }[q.type] || q.type;

      let bodyHTML = '';

      if (q.type === 'matching' && q.matchingPairs) {
        const shuffled = isTeacher
          ? q.matchingPairs.map(p => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${p.left}</td><td style="padding:6px 12px;border:1px solid #ddd;">${p.right}</td></tr>`)
          : q.matchingPairs.map(p => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${p.left}</td><td style="padding:6px 12px;border:1px solid #ddd;">________</td></tr>`);
        bodyHTML = `
          <table style="border-collapse:collapse;margin:8px 0 8px 20px;width:90%;">
            <thead><tr><th style="text-align:left;padding:4px 12px;border-bottom:2px solid #333;font-size:12px;">Column A</th><th style="text-align:left;padding:4px 12px;border-bottom:2px solid #333;font-size:12px;">Column B</th></tr></thead>
            <tbody>${shuffled.join('')}</tbody>
          </table>`;
      } else if (q.options && q.options.length > 0) {
        bodyHTML = `<ul style="list-style:none;margin:8px 0 0 20px;padding:0;">
          ${q.options.map(opt => `<li style="padding:3px 0;font-size:14px;color:#374151;">○ ${opt}</li>`).join('')}
        </ul>`;
      }

      // Student blank lines
      if (!isTeacher && (q.type === 'short_answer' || q.type === 'word_problem')) {
        bodyHTML += `<div style="border-bottom:1px solid #9ca3af;margin:12px 0 0 20px;min-height:40px;"></div>`;
      }

      // Teacher answer section
      let answerHTML = '';
      if (isTeacher) {
        answerHTML = `
          <div style="margin-top:10px;padding-top:8px;border-top:1px dashed #d1d5db;">
            <div style="font-size:11px;font-weight:700;color:#16a34a;text-transform:uppercase;margin-bottom:2px;">✓ Answer</div>
            <div style="font-size:14px;color:#374151;padding:4px 8px;background:#f0fdf4;border-radius:4px;margin-bottom:6px;">${q.answer || ''}</div>
            <div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:2px;">💡 Explanation</div>
            <div style="font-size:13px;color:#6b7280;font-style:italic;">${q.explanation || ''}</div>
          </div>`;
      }

      return `
        <div style="padding:14px 16px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;margin-bottom:14px;page-break-inside:avoid;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-weight:700;color:#4f46e5;font-size:13px;">Q${idx + 1}.</span>
            <span style="font-size:10px;padding:2px 8px;background:#eef2ff;color:#4f46e5;border-radius:20px;font-weight:500;text-transform:uppercase;">${typeLabel}</span>
          </div>
          <div style="font-size:15px;color:#1f2937;margin-bottom:6px;">${q.question}</div>
          ${bodyHTML}
          ${answerHTML}
        </div>`;
    }).join('');

    return `
      <div style="font-family:'Inter',Helvetica,Arial,sans-serif;color:#1f2937;max-width:700px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #1f2937;">
          ${data.school ? `<div style="font-size:14px;color:#4b5563;margin-bottom:4px;">${data.school}</div>` : ''}
          <h1 style="font-size:22px;font-weight:700;color:#111827;margin:8px 0;">${data.title}${isTeacher ? ' — Answer Key' : ''}</h1>
          <div style="display:flex;justify-content:center;gap:24px;font-size:13px;color:#4b5563;">
            ${data.class ? `<span>${data.class}</span>` : ''}
            ${data.date ? `<span>${data.date}</span>` : ''}
          </div>
          ${!isTeacher ? `
          <div style="display:flex;justify-content:space-between;margin-top:14px;font-size:14px;color:#374151;">
            <span>Name: ___________________________</span>
            <span>Score: _______ / ${data.questions.length}</span>
          </div>` : ''}
          ${data.instructions ? `<p style="margin-top:10px;font-size:13px;color:#4b5563;font-style:italic;text-align:left;">${data.instructions}</p>` : ''}
        </div>
        ${questionsHTML}
      </div>`;
  }
};

const fileInput = document.getElementById('fileInput');
const analyzeButton = document.getElementById('analyzeButton');
const outputDiv = document.getElementById('output');
const promptInput = document.getElementById('promptInput');

function handleFileChange() {
  analyzeButton.disabled = !fileInput.files.length;
}

async function handleAnalyzeClick() {
  const file = fileInput.files[0];
  const text = await readFileAsText(file);

  const prompt = `${promptInput.value}\n\nDocument:\n\n${text}`;
  const analysis = await generateAnalysis(prompt);

  outputDiv.textContent = analysis;
}

async function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function generateAnalysis(prompt) {
  // Replace with your actual API key
  const apiKey = 'YOUR_API_KEY';

  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1000
    })
  });

  const data = await response.json();
  return data.choices[0].text;
}

document.addEventListener('DOMContentLoaded', function() {
  fileInput.addEventListener('change', handleFileChange);
  analyzeButton.addEventListener('click', handleAnalyzeClick);
});
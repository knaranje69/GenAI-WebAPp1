const fileInput = document.getElementById('fileInput');
const analyzeButton = document.getElementById('analyzeButton');
const outputDiv = document.getElementById('output');
const promptInput = document.getElementById('promptInput');

fileInput.addEventListener('change', () => {
  analyzeButton.disabled = !fileInput.files.length;
});

analyzeButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  const text = await readFileAsText(file);

  const prompt = `${promptInput.value}\n\nDocument:\n\n${text}`;
  const analysis = await generateAnalysis(prompt);

  outputDiv.textContent = analysis;
});

async function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function generateAnalysis(prompt) {
  // Replace with your actual API key and endpoint
  const apiKey = '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';
  const apiEndpoint = 'https://api.anthropic.com/v1/claude';

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1000 // Adjust as needed
    })
  });

  const data = await response.json();
  return data.result.output;
}

import DOMPurify from 'dompurify';
import { marked } from 'marked';

document.addEventListener("DOMContentLoaded", () => {
  const textField = document.getElementById("input-code");
  textField.value ="";
  
 let elementResponseValue = document.querySelector('#response');
    if(elementResponseValue.textContent)  {
        elementResponseValue.textContent = ''; // clear the response if already present
    }

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "selectedText" && message.selectedText) {

    let elementResponseValue = document.getElementById('response');
    if(elementResponseValue.textContent)  {
        elementResponseValue.textContent = ''; // clear the response if already present
    }
      textField.value = message.selectedText; // Dynamically update the text box
    }
  });

});

// DOM Elements
const inputCodeSnippet = document.querySelector('#input-code');
const buttonExplain = document.querySelector('#button-prompt');
const buttonReset = document.querySelector('#button-reset');
const elementResponse = document.querySelector('#response');
const elementLoading = document.querySelector('#loading');
const elementError = document.querySelector('#error');

let session;

// Function to handle Prompt API interaction
async function runPrompt(prompt, params) {
    try {
        if (!session) {
            session = await window.ai.languageModel.create({
                ...params,
                systemPrompt: `You are a Programming expert specializing in teaching and code explanations. Your responses must follow these guidelines:

                1. Clear Explanations: Break down code concepts concisely with relevant examples.
                2. Educational Style: Address beginner-level questions and gradually introduce advanced concepts.
                3. Practical Examples: Illustrate ideas with practical, real-world applications.
               
                Ensure responses are structured and easy to understand.`

            });
        }
        return session.prompt(prompt);
    } catch (e) {
        console.error('Prompt failed:', e);
        reset();
        throw e;
    }
}

// Function to reset the session
async function reset() {
    if (session) {
        await session.destroy();
    }
    session = null;
    buttonReset.setAttribute('disabled', '');
}

// Function to generate a prompt based on user input
function generatePrompt() {
    const codeSnippet = inputCodeSnippet.value.trim();

    return `
        Please explain the following code snippet:
        
        ${codeSnippet}

         Your explanation must include:
        1. Purpose of the code:
           - What problem does it solve or task does it perform?
           - Why is it useful or important?
        2. Explanation of each line:
           - Describe the purpose of each line or block.
           - Highlight operations, key syntax, and dependencies.
        3. Potential use cases:
           - Real-world applications or scenarios where this code is applicable.
           - Who benefits from this code and how?
        4. Common mistakes or pitfalls:
           - Typical errors, edge cases, or performance issues.
           - Misuse of libraries or potential security concerns.
    `.trim();
}

// Event Listeners
buttonReset.addEventListener('click', async () => {
    hide(elementLoading);
    hide(elementError);
    hide(elementResponse);
    await reset();
    inputCodeSnippet.value = '';
});

buttonExplain.addEventListener('click', async () => {
    const prompt = generatePrompt();
    showLoading();
    try {
        const params = { temperature: 0.7, topK: 40 }; // Adjust parameters as needed
        const response = await runPrompt(prompt, params);

        const htmlContent = marked.parse(response);
        
        showResponse(htmlContent);
        buttonReset.removeAttribute('disabled');
    } catch (e) {
        showError(e.message || 'Failed to generate explanation');
    }
});

// UI Helper Functions
function showLoading() {
    hide(elementResponse);
    hide(elementError);
    elementLoading.classList.add('visible');
}

function hideLoading() {
    elementLoading.classList.remove('visible');
}

function showResponse(response) {
    hideLoading();
    hide(elementError);
    show(elementResponse);

    elementResponse.textContent = '';

    let htmlContent = marked.parse(response); // Convert Markdown to HTML
    htmlContent = htmlContent.replace(/<\/?p>/g, ''); //

   let updatedCode = htmlContent.replace(/(#.*)/g, (match) => {
    // Wrap comments to a fixed length (e.g., 80 characters)
    let wrappedComment = match.replace(/(.{80})/g, '$1\n');
    return wrappedComment;
    });

    elementResponse.innerHTML = DOMPurify.sanitize(marked.parse(updatedCode));


}

function showError(error) {
    hideLoading();
    hide(elementResponse);
    show(elementError);
    elementError.textContent = error;
}

function show(element) {
    element.removeAttribute('hidden');
}

function hide(element) {
    element.setAttribute('hidden', '');
}

// Initialize the extension (Optional: Add default settings if needed)
console.log('Chatbot Enhancer initialized!');

# AI Code Mentor - Chrome Extension

**AI Code Mentor** is a powerful Chrome extension designed to make understanding code simple, clear, and accessible. With the help of AI, this tool provides detailed explanations for any code snippet, helping developers of all levels learn and grow with confidence.

---

## Features

- **Explain Code Snippets:** 
  Select a piece of code, right-click, and choose "Explain Code" from the context menu to get a detailed explanation.
  
- **Step-by-Step Explanations:** 
  Understand your code line-by-line with clear, beginner-friendly insights.

- **Real-World Applications:** 
  Learn where and how the code is applied in practical scenarios.

- **Common Pitfalls:** 
  Identify and avoid common mistakes in your code.

- **Multi-Language Support:** 
  Supports a variety of programming languages.

---

## How It Works

1. Select the code snippet in your browser.
2. Right-click and choose the "Explain Code" option from the context menu.
3. The **AI Code Mentor** side panel opens, and the selected code is automatically pasted into the input box.
4. Click the "Explain" button in the extension panel.
5. The AI API is triggered, and the explanation is displayed in the side panel, breaking down the code and providing insights.

---

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** in the top right corner.
4. Click **Load Unpacked** and select the folder containing this extension's files.
5. The extension will be added to Chrome and is ready to use!

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Chrome Extension UI).
- **Backend:** AI-powered engine integrated with the OpenAI API.
- **Chrome APIs:** Context Menus API, Side Panel API, and other exploratory Chrome features.

---

## Project Structure

```plaintext
├── images/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
├── manifest.json
├── background.js
├── content.js
├── sidepanel/index.html
|---sidepanel/index.js
├── sidepanel/index.css
├── popup.js
├── styles.css
├── README.md

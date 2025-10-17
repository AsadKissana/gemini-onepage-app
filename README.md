# SQAI (Software Quality Assurance AI)

This is a small Next.js app (originally gemini-onepage-app) that provides an AI assistant focused on Software Quality Assurance and Testing. The assistant uses Google's Gemini (Generative Language) API via a server-side API route.

Important notes:
- Keep your Gemini API key secret in `.env.local` (this file is ignored by `.gitignore`).
- The project uses the Pages router. If you want to migrate to the App Router, see Next.js docs — migration isn't required for a small portfolio app.

Environment
-----------
Create a `.env.local` file at the project root with:

GEMINI_API_KEY=your_api_key_here

No quotes, no spaces around `=`.

Run locally
-----------
- Install dependencies: `npm install`
- Start dev server: `npm run dev`

QA & Testing Notes
-------------------
- The app exposes an API route at `/api/chat` which calls the external Gemini API. The API key is read on the server only.
- Recommended next steps for a course/portfolio submission:
  - Add simple unit tests for the API route (mock external HTTP calls).
  - Add component tests for the chat UI (React Testing Library).
  - Add a CI step to run typechecking and tests on PRs.

Security
--------
- Never commit `.env.local` or your API keys.
- Validate/escape user inputs server-side and handle rate limiting / errors gracefully.

Contact
-------
If you want, I can add automated tests and a CI workflow. Ask me to add tests and I will scaffold them.
# SQAI - Software Quality Assurance AI Chatbot

SQAI is a specialized AI chatbot powered by Google's Gemini API, designed to provide expert guidance on Software Quality Assurance (SQA) practices, methodologies, and challenges.

## Features

- 🤖 **Specialized Knowledge Base**: Comprehensive SQA knowledge covering testing methodologies, automation frameworks, QA processes, and best practices
- 💬 **Conversational Interface**: Clean, modern chat UI with conversation history
- 🎯 **Context-Aware Responses**: Maintains conversation context for follow-up questions
- 📚 **Expert Guidance**: Provides detailed, practical advice on SQA topics
- 🔧 **Code Examples**: Offers relevant code snippets and implementation examples
- 🎨 **Professional Design**: Modern UI with gradient backgrounds and smooth animations

## Technologies Used

- **Next.js 15.5.5** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Google Gemini API (gemini-1.5-flash)** - AI model
- **Axios** - HTTP client for API calls

## Prerequisites

- Node.js 18+ installed
- A Google Gemini API key (free tier available)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gemini-onepage-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Important**: Never commit your `.env.local` file to version control!

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Starting a Conversation

1. Type your SQA-related question in the input field
2. Click "Send" or press Enter
3. SQAI will provide a detailed, expert response

### Example Questions

- "What is the difference between unit testing and integration testing?"
- "How do I implement a test automation strategy?"
- "What are the best practices for writing test cases?"
- "Explain the test pyramid concept"
- "How do I handle flaky tests in my CI/CD pipeline?"
- "What tools should I use for API testing?"
- "How do I write effective bug reports?"

### Clearing the Chat

Click the "Clear Chat" button in the header to start a new conversation.

## Project Structure

```
gemini-onepage-app/
├── src/
│   ├── data/
│   │   └── sqaKnowledgeBase.ts    # SQA knowledge base & system instructions
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts            # API route for Gemini integration
│   │   ├── _app.tsx               # App wrapper
│   │   ├── _document.tsx          # Document wrapper
│   │   └── index.tsx              # Main chat interface
│   └── styles/
│       └── globals.css            # Global styles
├── .env.local.example             # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Knowledge Base Coverage

SQAI has expertise in:

### Core Testing Methodologies
- Unit Testing
- Integration Testing
- System Testing
- Acceptance Testing

### Testing Types
- Functional Testing (Smoke, Sanity, Regression, Exploratory)
- Non-Functional Testing (Performance, Security, Usability, Compatibility)

### Test Automation
- Test Pyramid Strategy
- Automation Principles and Best Practices
- CI/CD Integration
- Popular frameworks (Selenium, Cypress, Playwright, etc.)

### Quality Metrics
- Defect Density
- Test Coverage
- Defect Detection Percentage (DDP)
- MTTD and MTTR

### Tools & Frameworks
- Selenium WebDriver
- Cypress, Playwright
- JUnit, TestNG, pytest, Jest
- Postman, REST Assured
- JMeter, Gatling
- JIRA, TestRail

### Agile Testing
- Testing in Sprints
- Agile Testing Quadrants
- Continuous Testing

### Standards & Best Practices
- ISO/IEC 25010
- IEEE Standards
- OWASP Top 10
- Test Design Techniques

## API Rate Limits

The free tier of Gemini API has the following limits:
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

If you exceed these limits, you'll receive a 429 error. Consider implementing rate limiting or upgrading to a paid plan for production use.

## Customization

### Modifying the Knowledge Base

Edit `src/data/sqaKnowledgeBase.ts` to:
- Add new topics or expand existing ones
- Include company-specific QA processes
- Add custom tools or frameworks

### Adjusting AI Parameters

In `src/pages/api/chat.ts`, modify the `generationConfig`:

```typescript
generationConfig: {
  maxOutputTokens: 2048,  // Max response length
  temperature: 0.7,        // Creativity (0.0-1.0)
  topP: 0.95,             // Diversity of responses
  topK: 40,               // Top K sampling
}
```

### Styling

Modify `src/styles/globals.css` or edit the Tailwind classes in `src/pages/index.tsx` to customize the appearance.

## Building for Production

```bash
npm run build
npm start
```

The app will be optimized and ready for deployment.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` to Environment Variables in Vercel settings
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- DigitalOcean App Platform

Make sure to set the `GEMINI_API_KEY` environment variable on your deployment platform.

## Troubleshooting

### "Gemini API key not configured" Error
- Ensure `.env.local` exists in the root directory
- Check that `GEMINI_API_KEY` is set correctly
- Restart the development server after adding the key

### API Errors
- Verify your API key is valid
- Check if you've exceeded rate limits
- Ensure you have internet connectivity

### Styling Issues
- Clear your browser cache
- Restart the development server
- Check that Tailwind CSS is properly configured

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Google Gemini API](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Note**: This chatbot is designed for educational and professional development purposes. Always validate critical decisions with human experts and official documentation.

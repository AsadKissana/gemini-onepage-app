import { useState, useRef, useEffect } from "react";
import Head from "next/head";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQuestions = [
    "What is the difference between unit testing and integration testing?",
    "How do I implement a test automation strategy?",
    "What are the best practices for writing test cases?",
    "Explain the test pyramid concept",
    "How do I handle flaky tests in my CI/CD pipeline?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to chat
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Call our server-side API route. The API key is read server-side and never sent to the browser.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // The server returns a helpful error message in `data.error` when available.
        throw new Error(data.error || "Failed to get response");
      }

      // Append assistant reply to chat messages.
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (err: any) {
      // Surface error to the user and log for debugging.
      setError(err.message || "An error occurred. Please try again.");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const lines = content.split("\n");
    return lines.map((line, i) => {
      // Handle headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-blue-600">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-blue-700">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-2xl font-bold mt-4 mb-2 text-blue-800">
            {line.replace("# ", "")}
          </h1>
        );
      }

      // Handle bullet points
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="ml-6 mb-1">
            {line.substring(2)}
          </li>
        );
      }

      // Handle numbered lists
      if (line.match(/^\d+\. /)) {
        return (
          <li key={i} className="ml-6 mb-1">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      }

      // Handle code blocks
      if (line.startsWith("```")) {
        return <div key={i} className="my-2 text-xs text-gray-500">{line}</div>;
      }

      // Handle bold text
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={i} className="mb-2">
            {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
          </p>
        );
      }

      // Regular paragraph
      return line ? (
        <p key={i} className="mb-2">
          {line}
        </p>
      ) : (
        <br key={i} />
      );
    });
  };

  return (
    <>
      <Head>
        <title>SQAI - Software Quality Assurance AI Assistant</title>
        <meta name="description" content="Expert AI assistant for Software Quality Assurance and Testing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SQ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">SQAI</h1>
                  <p className="text-sm text-gray-600">Software Quality Assurance Assistant</p>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Chat
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
            {/* Messages Container */}
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-2xl">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-white font-bold text-3xl">SQ</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome to SQAI
                      </h2>
                      <p className="text-lg text-gray-600 mb-8">
                        Your expert AI assistant for Software Quality Assurance and Testing.
                        Ask me anything about testing methodologies, automation frameworks, QA processes, and best practices.
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          Try asking:
                        </p>
                        {exampleQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleExampleClick(question)}
                            className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-3xl rounded-lg px-4 py-3 ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <div className="prose prose-sm max-w-none">
                              {formatMessage(message.content)}
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="px-6 py-3 bg-red-50 border-t border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Input Form */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about software quality assurance..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

import { useState } from "react";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setShortUrl("");

    try {
      //since it is using express static else you need to put your api url
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mainUrl: url }),
      });

      const data = await res.json();
      console.log(data)
      setShortUrl(data.shortUrl || "Error generating URL");
    } catch (err) {
      setShortUrl("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          🔗 Minimal URL Shortener
        </h1>

        <input
          type="url"
          placeholder="Enter your long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className={`w-full py-2 rounded-xl font-medium text-white transition 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Generating..." : "Generate Short URL"}
        </button>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

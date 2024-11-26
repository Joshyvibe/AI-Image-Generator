import React, { useState } from "react";
import { generateImage } from "../api"; // Make sure this function is calling your backend
import "../styles/ImageGenerator.css";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const data = {
        prompt,
        seed: 0,
        randomize_seed: true,
        width: 1024,
        height: 1024,
        steps: 4,
      };
      const result = await generateImage(data);

      if (result.image_url) {
        setImage(result.image_url); // Set the URL returned by the backend
      } else {
        throw new Error("Failed to generate image.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setPrompt("")
    }
  };

  const handleDownloadPNG = () => {
    const imgElement = document.createElement("img");
    imgElement.crossOrigin = "Anonymous";
    imgElement.src = `http://localhost:8000${image}`; // The image URL from your backend

    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the image size
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      // Draw the WebP image on the canvas
      ctx.drawImage(imgElement, 0, 0);

      // Convert canvas to PNG data URL
      const dataURL = canvas.toDataURL("image/png");

      // Create a temporary download link for the PNG file
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `generated_image_${Date.now()}.png`;
      a.click();
    };
  };
  
  return (
    <div className="image-generator-container">
      <h1 className="title">AI Image Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want to generate..."
        rows={4}
        className="prompt-input"
        required
      />
      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      <div className="output-section">
        {error && <p className="error-message">Error: {error}</p>}
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Generating image...</p>
          </div>
        )}
        {image && !loading && (
          <div className="image-preview">
            <img
              src={`http://localhost:8000${image}`}  // Prepend the correct base URL
              alt="Generated"
              className="generated-image"
            />
            <button
              onClick={handleDownloadPNG}
              className="download-button"
            >
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;

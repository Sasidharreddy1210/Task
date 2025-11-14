import React, { useState } from "react";
import "./Sign.css";
import img1 from "../src/Assests/Sachin.png";
import img2 from "../src/Assests/Sasi.png";
import img3 from "../src/Assests/vinod.png";

const allSignatures = [
  {
    name: "SACHIN KUMAR",
    img: img1,
  },
  {
    name: "SASIDHAR REDDY",
    img: img2,
  },
  {
    name: "VINOD KUMAR",
    img: img3,
  },
];

export default function SignatureMatch() {
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState(null);

  const filtered = allSignatures.filter((sig) =>
    sig.name.toLowerCase().includes(search.toLowerCase())
  );

  const next = () => {
    if (filtered.length === 0) return;
    setCurrent((prev) => (prev + 1) % filtered.length);
    setStatus(null);
  };

  const prev = () => {
    if (filtered.length === 0) return;
    setCurrent((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
    setStatus(null);
  };

  const currentSignature = filtered[current] || filtered[0];

  return (
    <div className="signature-page">
      <div className="signature-main-card">
        {/* Signature Display */}
        {currentSignature ? (
          <div className="signature-display">
            <div className="signature-display-inner">
              {/* Match / Mismatch Buttons above image */}
              <div className="signature-action-row">
                <button
                  type="button"
                  onClick={() => setStatus("match")}
                  className={`signature-match-btn${
                    status === "match" ? " active" : ""
                  }`}
                >
                  Match
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("mismatch")}
                  className={`signature-mismatch-btn${
                    status === "mismatch" ? " active" : ""
                  }`}
                >
                  Mismatch
                </button>
              </div>
              <div className="signature-image-nav">
                <button
                  type="button"
                  onClick={prev}
                  className="signature-arrow-btn left"
                  aria-label="Previous"
                >
                  <span className="signature-arrow-icon">‹</span>
                </button>
                {/* Signature Image (clickable for next) */}
                <img
                  src={currentSignature.img}
                  alt={currentSignature.name}
                  className="signature-main-image"
                  onClick={next}
                />
                <button
                  type="button"
                  onClick={next}
                  className="signature-arrow-btn right"
                  aria-label="Next"
                >
                  <span className="signature-arrow-icon">›</span>
                </button>
              </div>
            </div>
            {/* Name below image in its own container */}
              <div className="signature-name-container">
                <div className="signature-main-name">
                  <span>{currentSignature.name}</span>
                </div>
              </div>
          </div>
        ) : (
          <p className="signature-no-result">No signatures found</p>
        )}
        {/* Search Box */}
        <div className="signature-search-row">
          <input
            className="signature-search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrent(0);
              setStatus(null);
            }}
          />
        </div>
        {/* Bottom Name List */}
        <div className="signature-list-row">
          {filtered.map((sig, i) => (
            <div
              key={i}
              className={`signature-list-item${
                i === current ? " active" : ""
              }`}
              onClick={() => {
                setCurrent(i);
                setStatus(null);
              }}
            >
              <img
                src={sig.img}
                alt={sig.name}
                className={`signature-list-image${
                  i === current ? " active" : ""
                }`}
              />
              <span
                className={`signature-list-name${
                  i === current ? " active" : ""
                }`}
              >
                {sig.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
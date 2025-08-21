import React from "react";

function KeywordsDisplay({ keywords = [] }) {
  return (
    <div>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((k, i) => (
            <li key={i} className="mb-2">
              <span className="font-semibold">{k.keyword}:</span>{" "}
              {k.explanation}
            </li>
          ))}
        </ul>
      ) : (
        <p>無關鍵名詞解釋。</p>
      )}
    </div>
  );
}

export default KeywordsDisplay;

import React from "react";

function TranscriptDisplay({ transcript, improvedTranscript }) {
  return (
    <div>
      {improvedTranscript ? (
        <div>
          <h4 className="font-semibold mt-2">優化後的逐字稿:</h4>
          <p>{improvedTranscript}</p>
        </div>
      ) : transcript ? (
        <div>
          <h4 className="font-semibold mt-2">原始逐字稿:</h4>
          {transcript.map((segment, index) => (
            <p key={index}>{segment.text}</p>
          ))}
        </div>
      ) : (
        <p>無逐字稿。</p>
      )}
    </div>
  );
}

export default TranscriptDisplay;

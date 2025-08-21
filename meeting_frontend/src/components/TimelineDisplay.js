import React from "react";

function TimelineDisplay({ transcript }) {
  return (
    <div>
      {transcript && transcript.length > 0 ? (
        <ul>
          {transcript.map((segment, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">
                [{segment.start_time} - {segment.end_time}]:
              </span>{" "}
              {segment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>無時間軸資料。</p>
      )}
    </div>
  );
}

export default TimelineDisplay;

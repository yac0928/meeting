import React from "react";

function SummaryDisplay({ summary }) {
  return <div>{summary ? <p>{summary}</p> : <p>無重點筆記。</p>}</div>;
}

export default SummaryDisplay;

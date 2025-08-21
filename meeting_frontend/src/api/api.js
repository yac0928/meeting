const API_BASE_URL = "http://localhost:5000/api"; // 後端 API base URL

// 取得所有會議
export async function getMeetings() {
  const res = await fetch(`${API_BASE_URL}/meetings`);
  if (!res.ok) throw new Error("Failed to fetch meetings");
  return res.json();
}

// 新增會議
export async function createMeeting(formData) {
  const res = await fetch(`${API_BASE_URL}/meetings`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok)
    throw new Error((await res.json()).msg || "Failed to create meeting");
  return res.json();
}

// 取得單一會議
export async function getMeetingDetail(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}`);
  if (!res.ok) throw new Error("Failed to fetch meeting detail");
  return res.json();
}

// 刪除會議
export async function deleteMeeting(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete meeting");
  return res.json();
}

// 取得逐字稿
export async function getTranscript(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/transcripts`);
  if (!res.ok) throw new Error("Failed to fetch transcript");
  return res.json();
}

// 新增逐字稿（文字 JSON）
export async function addTranscript(meetingId, data) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/transcripts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add transcript");
  return res.json();
}

// 上傳語音並轉錄
export async function uploadTranscriptFile(meetingId, formData) {
  const res = await fetch(
    `${API_BASE_URL}/meetings/${meetingId}/transcripts/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!res.ok) throw new Error("Failed to upload and transcribe");
  return res.json();
}

// 改善逐字稿
export async function improveTranscript(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/transcripts`, {
    method: "PUT",
  });
  if (!res.ok)
    throw new Error((await res.json()).msg || "Failed to improve transcript");
  return res.json();
}

// 新增筆記
export async function addNote(meetingId, data) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add note");
  return res.json();
}

// 更新筆記
export async function updateNote(meetingId, noteId, data) {
  const res = await fetch(
    `${API_BASE_URL}/meetings/${meetingId}/notes/${noteId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// 刪除筆記
export async function deleteNote(meetingId, noteId) {
  const res = await fetch(
    `${API_BASE_URL}/meetings/${meetingId}/notes/${noteId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}

// 產生摘要
export async function generateSummary(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/summaries`, {
    method: "PUT",
  });
  if (!res.ok)
    throw new Error((await res.json()).msg || "Failed to generate summary");
  return res.json();
}

// 擷取關鍵字
export async function extractKeywords(meetingId) {
  const res = await fetch(`${API_BASE_URL}/meetings/${meetingId}/keywords`, {
    method: "PUT",
  });
  if (!res.ok)
    throw new Error((await res.json()).msg || "Failed to extract keywords");
  return res.json();
}

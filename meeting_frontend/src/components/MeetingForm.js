import React, { useState } from "react";
import { createMeeting } from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

function MeetingForm({ onMeetingCreated }) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", meetingName);
    formData.append("notes", meetingNotes);
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    try {
      const response = await createMeeting(formData);
      if (response.id) {
        onMeetingCreated(response);
      } else {
        setError(response.msg || "建立會議失敗");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      setError("建立會議時發生錯誤。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">新增會議</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="meetingName"
          >
            會議名稱
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="meetingName"
            type="text"
            placeholder="會議名稱"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="meetingNotes"
          >
            會議筆記 (可選)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="meetingNotes"
            placeholder="輸入會議筆記..."
            rows="5"
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="audioFile"
          >
            會議音檔 (.m4a)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="audioFile"
            type="file"
            accept=".m4a"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "建立中..." : "建立會議並轉換"}
          </button>
          {loading && <LoadingSpinner />}
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default MeetingForm;

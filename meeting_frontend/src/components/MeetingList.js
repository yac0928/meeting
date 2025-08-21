import React from "react";
import LoadingSpinner from "./LoadingSpinner";

function MeetingList({ meetings, onSelectMeeting, loading }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">會議列表</h2>
      {meetings.length === 0 ? (
        <p>目前沒有會議記錄。</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="border-b border-gray-200 last:border-b-0 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectMeeting(meeting.id)}
            >
              {meeting.name || `會議 ${meeting.id}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MeetingList;

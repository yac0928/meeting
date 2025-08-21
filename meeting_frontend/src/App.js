import React, { useState, useEffect } from "react";
import MeetingList from "./components/MeetingList";
import MeetingDetail from "./components/MeetingDetail";
import MeetingForm from "./components/MeetingForm";
import { getMeetings } from "./api/api";

function App() {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleMeetingCreated = (newMeeting) => {
    setMeetings([...meetings, newMeeting]);
    setSelectedMeetingId(newMeeting.id); // Assuming the API returns the new meeting with an ID
    setShowForm(false);
  };

  const handleMeetingSelected = (meetingId) => {
    setSelectedMeetingId(meetingId);
  };

  const handleBackToList = () => {
    setSelectedMeetingId(null);
    fetchMeetings(); // Refresh list after viewing a meeting
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">會議記錄助理</h1>

      {selectedMeetingId ? (
        <MeetingDetail
          meetingId={selectedMeetingId}
          onBackToList={handleBackToList}
        />
      ) : (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {showForm ? "取消新增會議" : "新增會議"}
          </button>
          {showForm && <MeetingForm onMeetingCreated={handleMeetingCreated} />}
          <MeetingList
            meetings={meetings}
            onSelectMeeting={handleMeetingSelected}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}

export default App;

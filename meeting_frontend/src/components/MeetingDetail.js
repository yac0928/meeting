import React, { useEffect } from "react";
import {
  getMeetingDetail,
  improveTranscript,
  generateSummary,
  extractKeywords,
} from "../api/api";
import TranscriptDisplay from "./TranscriptDisplay";
import SummaryDisplay from "./SummaryDisplay";
import KeywordsDisplay from "./KeywordsDisplay";
import TimelineDisplay from "./TimelineDisplay";
import LoadingSpinner from "./LoadingSpinner";
import useApi from "../hooks/useApi";

function MeetingDetail({ meetingId, onBackToList }) {
  const meetingDetailApi = useApi(getMeetingDetail);
  const improveApi = useApi(improveTranscript);
  const summaryApi = useApi(generateSummary);
  const keywordsApi = useApi(extractKeywords);

  useEffect(() => {
    meetingDetailApi.request(meetingId);
  }, [meetingId]);

  const meeting = meetingDetailApi.data;

  const updateMeeting = (data) => meetingDetailApi.setData(data);

  if (meetingDetailApi.loading) return <LoadingSpinner />;
  if (meetingDetailApi.error)
    return <div className="text-red-500">{meetingDetailApi.error}</div>;
  if (!meeting) return <div>找不到會議資料。</div>;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {meeting.name || `會議 ${meetingId}`}
        </h2>
        <button
          onClick={onBackToList}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          返回會議列表
        </button>
      </div>

      <h3 className="font-semibold mb-2">會議筆記</h3>
      <p>{meeting.notes || "無筆記"}</p>

      <h3 className="font-semibold mt-4">逐字稿</h3>
      <TranscriptDisplay
        transcript={meeting.transcript}
        improvedTranscript={meeting.improvedTranscript}
      />
      <button
        onClick={async () => updateMeeting(await improveApi.request(meetingId))}
        disabled={improveApi.loading}
      >
        {improveApi.loading ? "優化中..." : "優化逐字稿"}
      </button>

      <h3 className="font-semibold mt-4">逐字稿時間軸</h3>
      <TimelineDisplay transcript={meeting.transcript} />

      <h3 className="font-semibold mt-4">重點筆記</h3>
      <SummaryDisplay summary={meeting.summary} />
      <button
        onClick={async () => updateMeeting(await summaryApi.request(meetingId))}
        disabled={summaryApi.loading}
      >
        {summaryApi.loading ? "生成中..." : "生成重點筆記"}
      </button>

      <h3 className="font-semibold mt-4">關鍵名詞解釋</h3>
      <KeywordsDisplay keywords={meeting.keywords} />
      <button
        onClick={async () =>
          updateMeeting(await keywordsApi.request(meetingId))
        }
        disabled={keywordsApi.loading}
      >
        {keywordsApi.loading ? "萃取中..." : "萃取關鍵詞"}
      </button>
    </div>
  );
}

export default MeetingDetail;

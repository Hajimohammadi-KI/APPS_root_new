"use client";
import StudioFlow from "./flow/studio";
import { topicHints } from "./flow/hints";
import type { Attempt } from "./flow/model";
import { conversationTopics } from "./conversation-data";
import {
  findTeacherContentByContextKey,
  getTeacherAudio,
} from "@/lib/teacher-content";

const topics = conversationTopics.map((topic, index) => ({
  ...topic,
  task:
    index === 0
      ? "Stell dich in vier kurzen Sätzen vor. Nenne deinen Namen, deinen Wohnort, deine Tätigkeit und etwas, das du gern machst."
      : topic.task,
  hints: topicHints(index, topic.level, topic.topic, "de"),
}));
async function example(topicId: string) {
  const item = await findTeacherContentByContextKey(`conversation.${topicId}`);
  return item ? getTeacherAudio(item.id) : null;
}
function complete(attempt: Attempt) {
  const params = new URLSearchParams(location.search);
  if (params.get("from") !== "daily") return;
  const activity = Number(params.get("activity"));
  if (
    ![2, 3, 6].includes(activity) ||
    !attempt.topicId.startsWith(`daily:${activity}:`)
  )
    return;
  if (
    params.get("worksheet") &&
    attempt.topicId !== `daily:${activity}:${params.get("worksheet")}`
  )
    return;
  const key = "deutsch-automaticity:daily-session:v1";
  const state = JSON.parse(localStorage.getItem(key) || "{}");
  // A saved recording must not complete a different plan opened in another tab.
  if (
    state.topic &&
    (state.topic !== params.get("topic") || state.level !== params.get("level"))
  )
    return;
  // Checklist progress is separate from the retained recordings and grammar assessment evidence.
  localStorage.setItem(
    key,
    JSON.stringify({
      ...state,
      completedActivities: [
        ...new Set([...(state.completedActivities || []), activity]),
      ],
      updatedAt: attempt.completedAt,
    }),
  );
}
export default function ConversationEntry() {
  return (
    <StudioFlow
      language="de"
      topics={topics}
      getExampleAudio={example}
      onComplete={complete}
    />
  );
}

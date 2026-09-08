"use client";
import { useEffect, useState } from "react";
import {
  integratedSkillsLevels,
  type IntegratedSkillsUnit,
} from "@grammar/content";
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
      ? "Introduce yourself in four short sentences. Say your name, where you live, what you do and one thing you enjoy."
      : topic.task,
  hints: topicHints(index, topic.level, topic.topic, "en"),
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
  const key = "english-automaticity:daily-session:v1";
  const state = JSON.parse(localStorage.getItem(key) || "{}");
  // A saved recording must not complete a different plan opened in another tab.
  if (
    state.topic &&
    (state.topic !== params.get("topic") || state.level !== params.get("level"))
  )
    return;
  // Explicit practice completion updates the daily checklist only, never assessed mastery.
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
function comparableTokens(value: string) {
  const ignored = new Set(["a", "an", "and", "clearly", "the", "to", "your"]);
  return (
    value
      .toLowerCase()
      .match(/[a-z]+/g)
      ?.map((token) => token.replace(/(ing|ed|es|s|e)$/u, ""))
      .filter((token) => token.length > 2 && !ignored.has(token)) ?? []
  );
}

function topicForIntegratedUnit(level: string, unit: IntegratedSkillsUnit) {
  const unitTokens = new Set(comparableTokens(`${unit.title} ${unit.outcome}`));
  return conversationTopics
    .filter((topic) => topic.level === level)
    .map((topic) => ({
      topic,
      score: comparableTokens(`${topic.topic} ${topic.task}`).filter((token) =>
        unitTokens.has(token),
      ).length,
    }))
    .sort((left, right) => right.score - left.score)[0]?.topic;
}

export default function ConversationEntry() {
  const [initialTopicId, setInitialTopicId] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("source") !== "integrated-skills") return;
    const level = integratedSkillsLevels.find(
      (item) => !params.get("level") || item.cefr === params.get("level"),
    );
    const unit = level?.units.find((item) => item.id === params.get("unit"));
    if (level && unit)
      setInitialTopicId(topicForIntegratedUnit(level.cefr, unit)?.id);
  }, []);
  return (
    <StudioFlow
      language="en"
      topics={topics}
      getExampleAudio={example}
      onComplete={complete}
      initialTopicId={initialTopicId}
    />
  );
}

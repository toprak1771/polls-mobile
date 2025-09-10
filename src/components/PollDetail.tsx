// components/PollDetail.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { GetPollByIdResponse, Poll } from "../api/types";
import { PollsService } from "../services/polls.services";

type OptionItemProps = {
  opt: any;
  submitting: boolean;
  onVote: (optionId: string) => void;
};

const OptionItem = React.memo(function OptionItem({ opt, submitting, onVote }: OptionItemProps) {
  return (
    <Pressable
      key={opt.id}
      disabled={submitting}
      onPress={() => onVote(opt.id)}
      style={{
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        opacity: submitting ? 0.6 : 1,
      }}
    >
      <Text style={{ fontWeight: "600" }}>
        {opt.text} — {opt.votes} oy
      </Text>
    </Pressable>
  );
}, (prev, next) => prev.submitting === next.submitting && prev.opt === next.opt);

export default function PollDetail({ id }: { id: number }) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const p = await PollsService.getById(id); // GET /polls/:id
      setPoll(p?.poll);
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Response not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onVote = useCallback(async (optionId: string) => {
    try {
      setSubmitting(true);
      const res = await PollsService.vote(id, { optionId });

      setPoll((prev) => {
        if (!prev) return prev;
        const updated = res.poll;
        const updatedById = new Map(updated.options.map((o: any) => [o.id, o]));

        const mergedOptions = prev.options.map((o: any) => updatedById.get(o.id) ?? o);

        return {
          ...prev,
          question: updated.question ?? prev.question,
          options: mergedOptions,
        } as Poll;
      });
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Not vote.");
    } finally {
      setSubmitting(false);
    }
  }, [id]);

  if (loading || !poll) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: "700", fontSize: 18 }}>{poll.question}</Text>

      {poll.options.map((opt: any) => (
        <OptionItem key={opt.id} opt={opt} submitting={submitting} onVote={onVote} />
      ))}
    </View>
  );
}

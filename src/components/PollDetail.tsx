// components/PollDetail.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { Poll } from "../api/types";
import { PollsService } from "../services/polls.services";

export default function PollDetail({ id }: { id: number }) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const p = await PollsService.getById(id); // GET /polls/:id
      setPoll(p);
    } catch (e: any) {
      Alert.alert("Hata", e.message ?? "Detay alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onVote = async (optionId: string) => {
    try {
      setSubmitting(true);
      const res = await PollsService.vote(id, { optionId });
      setPoll(res.poll); 
    } catch (e: any) {
      Alert.alert("Hata", e.message ?? "Oy verilemedi");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !poll) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: "700", fontSize: 18 }}>{poll.question}</Text>

      {poll.options.map((opt:any) => (
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
      ))}
    </View>
  );
}

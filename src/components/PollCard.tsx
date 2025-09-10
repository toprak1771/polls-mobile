// components/PollCard.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

type Props = {
  id: number | string;
  question: string;
};

export default function PollCard({ id, question }: Props) {
  return (
    <View style={{ padding: 16, borderWidth: 1, borderRadius: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: "700", marginBottom: 8 }}>{question}</Text>

      <Link href={`/polls/${id}`} asChild>
        <Pressable style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: "#1e90ff" }}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Detail</Text>
        </Pressable>
      </Link>
    </View>
  );
}

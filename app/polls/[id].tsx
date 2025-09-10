// app/polls/[id].tsx
import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PollDetail from "@src/components/PollDetail";

export default function PollDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View style={{ padding: 16 }}>
      <PollDetail id={Number(id)} />
    </View>
  );
}

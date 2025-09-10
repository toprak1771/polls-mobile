// app/polls/index.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, FlatList, Text } from "react-native";
import PollCard from "@/src/components/PollCard";

import { PollsService } from "@/src/services/polls.services";
import { Poll } from "@/src/api/types";

export default function PollList() {
  const [data, setData] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await PollsService.getAll(); // GET /polls
        setData(list?.polls);
      } catch (e: any) {
        Alert.alert("Error", e.message ?? "Response not found");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  if (!loading && data.length === 0)
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "600" }}>Not found data.</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <PollCard id={item.id} question={item.question} />
        )}
      />
    </View>
  );
}

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="polls/index" options={{ title: "Polls" }} />
      <Stack.Screen name="polls/[id]" options={{ title: "Poll Detail" }} />
    </Stack>
  );
}
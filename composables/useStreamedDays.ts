export const useStreamedDays = async (body: any) => {
  const days = ref([]);

  const response = await $fetch<any>("/api/completion", {
    method: "POST",
    responseType: "stream",
    body
  });

  const reader = response?.getReader();
  const decoder = new TextDecoder();

  if (reader) {
    let partial = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      partial += decoder.decode(value, { stream: true });

      // Process each complete JSON object
      const lines = partial.split("\n");
      partial = lines.pop() || ""; // Save incomplete JSON for next iteration

      for (const line of lines) {
        if (line.trim()) {
          days.value.push(JSON.parse(line));
        }
      }
    }
  }

  return days.value;
};

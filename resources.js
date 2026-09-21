// EDIT ONLY THIS LIST to add or change your links.
// Replace an empty url with a full https:// address.
// You can add more entries by copying a { title, url } line.
const researchResources = {
  protocols: [
    { title: "Laboratory protocol", url: "" },
  ],
  pipelines: [
    { title: "Analysis pipeline", url: "" },
  ],
};

function renderResources(elementId, entries) {
  const container = document.getElementById(elementId);
  const available = entries.filter(entry => {
    try { return ["https:", "http:"].includes(new URL(entry.url).protocol); }
    catch { return false; }
  });
  if (!available.length) return;
  const list = document.createElement("ul");
  list.className = "resource-list";
  for (const entry of available) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = entry.url;
    link.textContent = entry.title + " ↗";
    item.append(link);
    list.append(item);
  }
  container.replaceChildren(list);
}
renderResources("protocol-links", researchResources.protocols);
renderResources("pipeline-links", researchResources.pipelines);

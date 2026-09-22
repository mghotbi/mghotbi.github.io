// YOUR RESOURCE CATALOGUE
// Add a full https:// URL to publish an entry. Empty URLs stay hidden.
// Optional fields can be left blank. Duplicate an entry to add more resources.
const researchResources = {
  protocols: [
    {
      title: "Maize & Wheat Redox Phenotyping",
      url: "protocols/maize-wheat-redox-phenotyping.html",
      description: "Bench protocols for ROS localisation, H\u2082O\u2082 quantification, oxidative damage, antioxidant buffering and recovery phenotyping in maize and wheat.",
      category: "Plant redox phenotyping",
      version: "SOP-RDX-01",
      updated: "22 September 2026",
      requirements: "Research-use protocol. Conditions marked as pilot should be validated for the local tissue, instrument and experimental system. Follow institutional safety procedures and current SDS guidance.",
      citation: "Ghotbi, M. (2026). Maize & Wheat Redox Phenotyping. Standard Operating Procedure SOP-RDX-01. https://mghotbi.github.io/protocols/maize-wheat-redox-phenotyping.html",
      downloadUrl: "assets/protocols/SOP-RDX-01_Maize-Wheat-Redox-Phenotyping.pdf"
    }
  ],
  pipelines: [
    {
      title: "Your pipeline title",
      url: "",
      description: "",
      category: "",
      version: "",
      updated: "",
      requirements: "",
      citation: "",
      downloadUrl: ""
    }
  ]
};

// DISPLAY LOGIC — no changes needed below this line.
function validResourceUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value, window.location.href);
    return ["https:", "http:", "file:"].includes(url.protocol);
  } catch {
    return false;
  }
}
function isInternalUrl(value) {
  try { return new URL(value, window.location.href).origin === window.location.origin; }
  catch { return false; }
}
function resourceElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
function renderResources(elementId, entries, kind) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const published = entries.filter(entry => validResourceUrl(entry.url));
  if (!published.length) return;
  const fragment = document.createDocumentFragment();
  for (const entry of published) {
    const card = resourceElement("article", "resource-entry");
    if (entry.category) card.append(resourceElement("span", "resource-type", entry.category));
    card.append(resourceElement("h4", "", entry.title || (kind === "protocol" ? "Protocol" : "Pipeline")));
    if (entry.description) card.append(resourceElement("p", "", entry.description));
    const metadata = resourceElement("dl", "resource-meta");
    for (const [label, value] of [["Version", entry.version], ["Updated", entry.updated]]) {
      if (!value) continue;
      const group = resourceElement("div");
      group.append(resourceElement("dt", "", label), resourceElement("dd", "", value));
      metadata.append(group);
    }
    if (metadata.childNodes.length) card.append(metadata);
    if (entry.requirements || entry.citation) {
      const details = resourceElement("details");
      details.append(resourceElement("summary", "", "Requirements & citation"));
      if (entry.requirements) details.append(resourceElement("p", "", entry.requirements));
      if (entry.citation) details.append(resourceElement("p", "", entry.citation));
      card.append(details);
    }
    const internal = isInternalUrl(entry.url);
    const noun = kind === "protocol" ? "protocol" : "pipeline";
    const link = resourceElement("a", "resource-action", internal ? `Explore ${noun} →` : `View ${noun} ↗`);
    link.href = entry.url;
    card.append(link);
    if (validResourceUrl(entry.downloadUrl)) {
      const isPdf = /\.pdf($|[?#])/i.test(entry.downloadUrl);
      const download = resourceElement("a", "resource-secondary", isPdf ? "Download SOP ↓" : "Supporting files ↗");
      download.href = entry.downloadUrl;
      if (isPdf && isInternalUrl(entry.downloadUrl)) download.setAttribute("download", "");
      card.append(download);
    }
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}
renderResources("protocol-links", researchResources.protocols, "protocol");
renderResources("pipeline-links", researchResources.pipelines, "pipeline");

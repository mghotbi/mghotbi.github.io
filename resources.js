// YOUR RESOURCE CATALOGUE
// Add a full https:// URL to publish an entry. Empty URLs stay hidden.
// Optional fields can be left blank. Duplicate an entry to add more resources.
const researchResources = {
  protocols: [
    {
      title: "Maize & Wheat Redox Phenotyping (SOP-RDX-01)",
      url: "https://mghotbi.github.io/assets/protocols/Maize-Wheat-Redox-Phenotyping-SOP.pdf",
      description: "Bench protocols for ROS localisation (DAB, NBT, H\u2082DCFDA), H\u2082O\u2082 quantification, lipid peroxidation, antioxidant enzymes and glutathione/ascorbate redox state in maize and wheat leaves and roots, with sampling rules for flooding and recovery experiments. Each assay is anchored to one practical reference.",
      category: "Redox physiology",
      version: "2.1",
      updated: "22 September 2026",
      requirements: "Plate reader (absorbance and fluorescence), UV spectrophotometer, vacuum infiltration, fluorescence or confocal microscope (H\u2082DCFDA), liquid nitrogen and \u221280 \u00B0C storage.",
      citation: "Ghotbi, M. (2026). Maize & Wheat Redox Phenotyping: Standard Operating Procedure SOP-RDX-01, version 2.1. https://mghotbi.github.io/assets/protocols/Maize-Wheat-Redox-Phenotyping-SOP.pdf",
      downloadUrl: ""
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
  try { return ["https:", "http:"].includes(new URL(value).protocol); }
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
    const link = resourceElement("a", "resource-action", kind === "protocol" ? "View protocol ↗" : "Explore pipeline ↗");
    link.href = entry.url;
    card.append(link);
    if (validResourceUrl(entry.downloadUrl)) {
      const download = resourceElement("a", "resource-secondary", "Supporting files ↗");
      download.href = entry.downloadUrl;
      card.append(download);
    }
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}
renderResources("protocol-links", researchResources.protocols, "protocol");
renderResources("pipeline-links", researchResources.pipelines, "pipeline");

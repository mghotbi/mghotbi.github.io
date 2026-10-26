# Mitra Ghotbi — academic website

A complete static website for https://mghotbi.github.io. No installation, build process, tracking, external fonts or JavaScript required.

## Publish on GitHub Pages
1. Sign into GitHub and create the public repository `mghotbi.github.io`, or open that repository if it already exists. Back up any existing website before replacing its files.
2. Extract this ZIP. Upload the CONTENTS of the `mghotbi.github.io` folder into the repository root: `index.html`, `style.css`, `resources.js`, `assets/`, and `.nojekyll`. Do not upload the ZIP itself or place the enclosing folder inside the repository.
3. Commit to the `main` branch.
4. Open Settings → Pages → Build and deployment. Choose Deploy from a branch, then `main` and `/(root)`. Save.
5. Visit https://mghotbi.github.io after the deployment finishes. Future commits update the site.

## Edit
- Text, publications, dates and links: `index.html`.
- Colours, typography and layout: `style.css`.
- Downloadable CV: replace `assets/Mitra-Ghotbi-CV.pdf` using the same filename.
- The supplied fieldwork portrait appears in the introduction; the supplied science-and-inclusion graphic appears below Teaching & Mentoring.
- Preview locally by opening `index.html`, or run `python3 -m http.server 8000` from this folder.

## Source and editorial notes
Content is adapted from the supplied Resume-CoverLetter-MGhotbi.pdf. The downloadable CV is an extraction of source pages 4–7 with the Communications Biology publication updated; its original page numbers remain. The job-specific letter, teaching/diversity statements, referee contact sheet and supporting documents are excluded from the download.

Before publication, review these details:
- The site follows the source's appointment dates: MTSU 2024–2026 and Kiel 2026–present. Confirm these are the dates you want displayed.
- Doctoral qualification and joint-programme wording follow the source CV; confirm the formal awarding institution wording.
- The source gives inconsistent HYDROREDOX proposal stages. No current award or application status is asserted on the website.
- The source lists RedoxRRI, whereas the current project may use HRRI. The site links to your GitHub profile without asserting a software version or release status.
- Publication titles, authors and DOI links are transcribed from the source; other publication metadata have not been independently verified. Authors abbreviated in the source remain abbreviated here.
- No personal telephone number or referee contact details are included in the website.

The site has not been uploaded to GitHub or published by this package.

## Validation
Local file references and section anchors were checked. All four extracted CV pages were visually reviewed. Browser-based desktop/mobile rendering could not be completed because the browser download was unavailable; check the page in your browser before publishing.

Publication update: the former snake skin-lipid preprint is now listed as Dallas, J.W., Murphy, K.M., Ghotbi, M. et al. (2026), Communications Biology, DOI 10.1038/s42003-026-10820-w. Title, author order, status and link were checked against the publisher and corrected in the website and downloadable CV.

## Add protocols and pipelines later
Open `resources.js` on GitHub, click the pencil icon, and edit the title and URL inside the `protocols` or `pipelines` list. For example:

```js
{ title: "My DNA extraction protocol", url: "https://example.org/my-protocol" },
```

Replace the example URL with your actual link. Copy a line to add another resource. Keep quotation marks and commas. Commit the changes; the website updates automatically. Empty URLs remain unpublished and the section displays Coming soon until it has at least one valid link. Links can point to GitHub repositories, protocols.io, documents or other websites.

## Latest changes
- Position updated to Postdoctoral Fellow at Kiel University as requested, in both the website and downloadable CV. Appointment dates are unchanged.
- Supplied portrait and science-and-inclusion artwork added without altering the originals.
- Protocols and Pipelines resource sections added, with editable links in resources.js.
- When updating the live site, upload index.html, style.css, resources.js and the complete assets folder to the branch used by GitHub Pages (currently Rhizosphere-nitrogen-fate in your screenshots).

## Professional resource collections (version 4)
The Protocols and Pipelines section now has two structured collections, each with its own visual identity, scientific focus labels and clearly marked unpublished state. No methods or repository URLs are fabricated.

Edit `resources.js` to add real resources. Each entry supports:
- `title`: the method or workflow name.
- `url`: the main link; leaving this empty keeps the entry hidden.
- `description`: a short explanation of purpose and scope.
- `category`: an optional label such as Rhizosphere methods or Microbiome analysis.
- `version` and `updated`: optional version and date, only shown if supplied.
- `requirements`: materials, prerequisites or software dependencies.
- `citation`: a recommended citation or attribution.
- `downloadUrl`: an optional link to supporting files.

Duplicate an entry inside its list to add another resource. Keep commas between entries. The placeholder disappears automatically when the first valid link is added. No build tools are required.

To publish this design update, replace index.html, style.css and resources.js on the GitHub Pages publishing branch. Existing assets and CV are unchanged. CSS and script URLs include a version query to avoid using cached copies of the older files.

## Protocol landing page (version 5)
- New page: `protocols/maize-wheat-redox-phenotyping.html` (SOP-RDX-01), styled with the site stylesheet.
- PDF: `assets/protocols/SOP-RDX-01_Maize-Wheat-Redox-Phenotyping.pdf`.
- `resources.js`: accepts relative links (internal pages and files); internal pages show "Explore protocol →", external links keep "↗", PDFs show "Download SOP ↓".
- `style.css`: new "Protocol landing pages" block at the end. `index.html` loads `style.css?v=5` and `resources.js?v=5`.
- To publish: upload `index.html`, `style.css`, `resources.js`, the `protocols/` folder and `assets/protocols/` to the GitHub Pages branch.
- To add another protocol page: copy the HTML file in `protocols/`, edit its text, add the PDF to `assets/protocols/`, and add an entry to `resources.js` with relative `url` and `downloadUrl`.

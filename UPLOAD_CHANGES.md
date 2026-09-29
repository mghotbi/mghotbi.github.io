# Website update — 29 September 2026

This version adds MycoHalo, the supplied SOP-RDX-02 v2.0 PDF and protocol page,
GhotbiLab links in both resource collections, and a sage/blush/cream visual refresh.
The published site has NOT been updated: the GitHub integration rejected writes.

## Upload the update
1. Unzip this archive and open the mghotbi.github.io folder.
2. Open https://github.com/mghotbi/mghotbi.github.io and select the existing
   Rhizosphere-nitrogen-fate branch (the repository default when this update was prepared).
3. Choose Add file > Upload files. Upload these files/folders with their paths:
   - index.html
   - style.css
   - resources.js
   - protocols/plate-reader-redox-phenotyping.html
   - assets/mycohalo-logo.png
   - assets/protocols/SOP-RDX-02_Plate-Reader-Redox-Phenotyping_v2.0.pdf
   You can drag the included protocols and assets folders to preserve paths.
4. Commit the changes. Do not upload the ZIP itself or nest the enclosing
   mghotbi.github.io folder inside the repository.
5. Wait for GitHub Pages deployment, then refresh https://mghotbi.github.io/.
   On a Mac, Cmd+Shift+R reloads without the usual browser cache.

The supplied SOP is unchanged. MycoHalo text follows its public DESCRIPTION and
README. GhotbiLab links open the organization; no private repository is exposed.
The public MycoHalo documentation URL returned HTTP 200 during preparation.

Validation: JavaScript syntax and local HTML link targets checked. Browser rendering
was not verified because the preview browser download failed. Responsive CSS
breakpoints are included; check desktop and phone views after deployment.

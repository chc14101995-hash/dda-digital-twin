# KMDD Digital Twin

Public app: https://chc14101995-hash.github.io/dda-digital-twin/

DDA and KMA geometry comes from the 25-Nov-2026 NWD files. Select the model at the top of the page; only the selected model downloads. Each model has separate progress, floor viewpoints and Excel templates. The app has no navigation sidebar. Import and export controls are directly in the header.

Support EIT and Support thang máng are separate groups. LADDERSUP, TRAYSUP/TRAYSUPP and instrumentation tray/ladder support assemblies belong to Support thang máng. Source assemblies are counted once; unnamed assemblies retain unique generated tags. Equipment and its support have separate geometry when the source hierarchy provides both.

All MISC branches, including Structure MISC, and VOL/INSU/STUDY model branches are excluded. EIT renders opaque gray-white. Structure and primary piping use actual geometry with 10 mm / 5 mm background vertex clustering and default 12% opacity. The app downloads about 24 MB for the chosen model.

## Fabrication baseline

Source: https://docs.google.com/spreadsheets/d/1iqw4M3-NDDXI4v6qslT6pfY9Qp3mWfKSgD3RotC7myQ/edit

The 16 DD/KM Equip/Tray deck tabs were read on 26-Nov-2026. Fabricated means FullWeldDate or a later IRN/Painting/Receive date, as confirmed by the user. Shop FullWeldDate sets Fabricated; it does not set site installation or site full weld. Cutting/Fitup alone do not mark fabrication complete.

| Model | Support EIT | Support thang máng | Equipment | Fabricated |
|---|---:|---:|---:|---:|
| DDA | 269 | 1056 | 291 | 142 |
| KMA | 269 | 1179 | 268 | 234 |

Every fabrication-complete Sheet row was matched to a support in the appropriate model. Exact support names and explicit drawing-type suffix aliases are used. Combined named supports count once. Rows without a completed fabrication date remain unchanged; unmatched rows are recorded in the accompanying reconciliation CSV files. No Sheet data was edited. The baseline is a snapshot, with no automatic live synchronization.

## Updates and colors

Tick Fabricated, Installed, Full welded or Blocked on a selected support or directly in the table. Each tick saves immediately. Stages are independent. Priority: blocked red; full welded green; installed blue; fabricated yellow; otherwise gray-white. A white selection outline preserves the underlying status color. Installation percentage and each stage count are separate.

Import .xlsx, CSV or JSON through Nhập tiến độ. Excel templates include both support groups for the currently selected model. IDs include the model prefix; ambiguous tags, duplicate IDs and ID/tag conflicts are rejected before applying. Blank cells preserve existing values. TRUE/FALSE, 1/0, Có/Không and X are accepted. Up to 50,000 rows; .xls must be saved as .xlsx. Export progress or backups with Xuất tiến độ.

Progress is local to the current browser/origin, with no cross-device collaboration backend. Existing DDA progress migrates only by unique compatible tag/deck or exact ID. Newer manual changes can override the Sheet fabrication baseline. Export JSON to retain backups. Model assets are gzip streams split into ordered parts; concatenate each model's parts before decoding outside the app.

## Hosting and dependencies

Static GitHub Pages main branch root, relative URLs and .nojekyll. models.json lists the ordered model assets. Serve over HTTP for local use. Dependencies are self-hosted Three.js r170, OrbitControls and fflate (MIT). FBXLoader/NURBS modules are conversion tools and are not required by the browser app.

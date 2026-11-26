# DDA Digital Twin

Static web app for monitoring EIT supports, equipment installation and cable pulling. Built for GitHub Pages, with self-hosted Three.js r170 and no runtime CDN dependency.

## Open

Serve this directory over HTTP, then open `index.html`. On GitHub Pages, use **Mở mô hình** to open the supplied local `dda-model.json.gz` file if it is not hosted alongside the app. Model processing happens in the browser.

## Support updates and Excel

Select a support in 3D or in the register and tick Fabricated, Installed, Full welded or Blocked. Each tick saves immediately to the current browser. Inline register checkboxes work the same way. The white selection outline does not replace the support status color.

Model color priority: Blocked = red; Full welded = green; Installed = blue; Fabricated = yellow; no completed milestone = gray-white. Stages are independent and do not automatically tick one another. The main support percentage measures installation; separate totals show each milestone and blocked supports. Existing installation progress is retained.

**Nhập tiến độ** accepts Excel `.xlsx`, CSV and JSON. Use **Tải mẫu Excel** for a workbook containing all 800 supports with their IDs, tags, decks and status columns. TRUE/FALSE, 1/0, Có/Không and X are supported. Blank Excel cells preserve existing values. Matching uses ID, or a unique tag; duplicate IDs and mismatched ID/tag pairs are reported before applying. Up to 50,000 data rows can be read at once; only model supports can receive support milestones. Worksheet selection and Vietnamese headers are supported.

The preview shows changes, unchanged rows and errors. No rows are written until **Áp dụng** is clicked. Errors block the batch by default; explicitly select **Bỏ qua dòng lỗi** to apply valid rows only. The complete error list can be downloaded as CSV. JSON snapshots preserve unknown stage values and can restore the complete progress state. `.xls` should be saved as `.xlsx` first.

## Model layers

MISC geometry is excluded from the 3D asset. Structure and primary piping meshes are taken from the original FBX, with 10 mm and 5 mm vertex clustering respectively for background rendering. EIT renders opaque gray-white, with the support milestone colors described above. Structure and piping use translucent materials, with visibility switches and a background opacity slider (12% by default). Model selection uses a white outline. Table status colors remain independent of model colors.

## Viewpoints and support families

The model excludes `DDO-VOL-PTSCMC-today.RVM`. Support EIT contains 800 records, including 251 LADDERSUP and 286 TRAYSUP assemblies. Each STRUCTURE assembly is counted once, with its component meshes linked to the same record.

Use **Viewpoint / Sàn** to select WSP, MD, CD, SCD, or Jacket (JK); use the angle selector for isometric, plan, front, or side views. **Chỉ sàn đang chọn** hides other decks. The table and KPIs follow the selected deck. Decks come from source hierarchy names; objects without a deck name use their elevation.

Original record IDs are preserved. The app can restore local progress or JSON backups from the prior model revision.

## Workflow

1. Load a converted model. NWD is not a browser format; export FBX from Navisworks first, preserving the hierarchy.
2. Review the inferred support/equipment classification. Object IDs belong to the exported snapshot, and are not Navisworks GUIDs. Check quantities against the approved BOQ.
3. Select an object and enter completed quantity, discipline, area, dates and notes. Blank progress means unknown; zero means confirmed not started. Each support/equipment record has total 1. Support installation quantity follows its Installed checkbox.
4. Add cable schedule rows using **+ Tuyến cáp**, or import CSV with `group=cable`, `total` in metres, and `done` as pulled metres. Cable lengths and routes are not inferred from supports or trays.
5. Export JSON after each working session. Data is stored in localStorage on the current browser and origin; it does not synchronize between users or devices.

CSV columns: `id,tag,group,discipline,zone,deck,total,done,blocked,planned_date,actual_date,from,to,note`. Use ID when a tag occurs more than once. Invalid or ambiguous imports are rejected atomically.

KPI = confirmed completed quantity / total baseline quantity. Coverage is shown separately. No percentage is shown before the first progress update. Cable KPI has no baseline until a cable schedule is entered.

## Scope

This is a construction progress snapshot, not a sensor-connected operational twin. Only exported geometry can be linked in 3D. Geometry hidden in the Navisworks session can be absent. Background geometry may be simplified, as disclosed in each model file. The model file contains technical project data; keep it local unless public hosting is authorized.

## Hosting

GitHub Pages: branch `main`, directory `/`. `.nojekyll` serves assets directly. All application URLs are relative, so the app works under a repository subpath.

Third-party dependency: Three.js r170, MIT; see `vendor/LICENSE-three.txt`. The browser app uses Three.js, OrbitControls and fflate (MIT) for local Excel ZIP import/export. `FBXLoader` and the NURBS helper files are conversion tools.

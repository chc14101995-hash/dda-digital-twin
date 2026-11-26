# DDA Digital Twin

Static web app for monitoring EIT supports, equipment installation and cable pulling. Built for GitHub Pages, with self-hosted Three.js r170 and no runtime CDN dependency.

## Open

Serve this directory over HTTP, then open `index.html`. On GitHub Pages, use **Mở mô hình** to open the supplied local `dda-model.json.gz` file if it is not hosted alongside the app. Model processing happens in the browser.

## Workflow

1. Load a converted model. NWD is not a browser format; export FBX from Navisworks first, preserving the hierarchy.
2. Review the inferred support/equipment classification. Object IDs belong to the exported snapshot, and are not Navisworks GUIDs. Check quantities against the approved BOQ.
3. Select an object and enter completed quantity, discipline, area, dates and notes. Blank progress means unknown; zero means confirmed not started. Each support/equipment record has total 1.
4. Add cable schedule rows using **+ Tuyến cáp**, or import CSV with `group=cable`, `total` in metres, and `done` as pulled metres. Cable lengths and routes are not inferred from supports or trays.
5. Export JSON after each working session. Data is stored in localStorage on the current browser and origin; it does not synchronize between users or devices.

CSV columns: `id,tag,group,discipline,zone,total,done,blocked,planned_date,actual_date,from,to,note`. Use ID when a tag occurs more than once. Invalid or ambiguous imports are rejected atomically.

KPI = confirmed completed quantity / total baseline quantity. Coverage is shown separately. No percentage is shown before the first progress update. Cable KPI has no baseline until a cable schedule is entered.

## Scope

This is a construction progress snapshot, not a sensor-connected operational twin. Only exported geometry can be linked in 3D. Geometry hidden in the Navisworks session can be absent. Background geometry may be simplified, as disclosed in each model file. The model file contains technical project data; keep it local unless public hosting is authorized.

## Hosting

GitHub Pages: branch `main`, directory `/`. `.nojekyll` serves assets directly. All application URLs are relative, so the app works under a repository subpath.

Third-party dependency: Three.js r170, MIT; see `vendor/LICENSE-three.txt`. `FBXLoader`, `fflate`, and NURBS helper files are conversion tools; the browser app uses only Three.js and OrbitControls.

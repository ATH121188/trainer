# FRSD Team Lead Trainer — offline install

Five files. Put them on any static web host, open the address once on the phone,
add it to the home screen, and from then on it runs with no connection at all.

## Why this and not the single file

iOS will not run JavaScript in a file saved to Files. It renders the page and
stops, which is why the case menu comes up empty. The only reliable way to get a
genuinely offline app onto an iPhone is a web address the phone has visited once
and cached. That is what the service worker in here does.

## GitHub Pages (free, about ten minutes)

1. Create a GitHub account if you do not have one.
2. Create a new **public** repository. Call it anything, e.g. `trauma-trainer`.
3. On the repo page choose **Add file → Upload files**, drag in all five files
   from this folder (index.html, sw.js, manifest.webmanifest, icon-180.png,
   icon-512.png), and commit.
4. Go to **Settings → Pages**. Under *Source* choose **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
5. Wait a minute or two. The page appears at
   `https://<your-username>.github.io/trauma-trainer/`

## Put it on the phone

1. Open that address in **Safari** (not Chrome — on iOS only Safari can install).
2. Let it finish loading. This is the moment it caches itself.
3. Share button → **Add to Home Screen** → Add.
4. Turn on airplane mode and launch it from the icon. It should run normally.

Android: open in Chrome, three dots, **Install app**.

## Checking it really is offline

Airplane mode, launch from the icon, run a case start to finish. If the case
menu appears and a case runs, it is cached properly.

## Updating it later

Replace index.html in the repo and bump the version string at the top of sw.js
(`frsd-trainer-v1` becomes `v2`). Phones pick up the new version the second time
they launch after reconnecting.

## What still needs a connection

Nothing essential. Without one, free-text orders fall back to keyword matching,
teammates give scripted answers rather than conversational ones, and the written
coaching paragraph at the end of the debrief is skipped. Every case, the
physiology, complications, dosing, scoring and the debrief itself are local.

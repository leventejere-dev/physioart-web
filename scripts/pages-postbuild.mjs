// Finishes the static export for GitHub Pages:
// - out/index.html sends visitors to their language (saved choice, then browser language, then Hungarian)
// - out/404.html exists for unknown URLs
// - out/.nojekyll stops Jekyll from hiding the _next folder on branch-based Pages setups
import { copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";
if (!existsSync(out)) {
  console.error("pages-postbuild: no out/ folder. Run with GITHUB_PAGES=1 next build first.");
  process.exit(1);
}

const redirect = `<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>PhysioArt</title>
<meta http-equiv="refresh" content="0; url=hu/">
<script>
(function () {
  var supported = ["hu", "ro", "en"];
  var saved = (document.cookie.match(/(?:^|; )NEXT_LOCALE=(hu|ro|en)/) || [])[1];
  var lang = saved;
  if (!lang) {
    var prefs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < prefs.length && !lang; i++) {
      var code = String(prefs[i]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) > -1) lang = code;
    }
  }
  location.replace((lang || "hu") + "/");
})();
</script>
</head>
<body><a href="hu/">PhysioArt</a></body>
</html>
`;

writeFileSync(join(out, "index.html"), redirect);
writeFileSync(join(out, ".nojekyll"), "");

if (!existsSync(join(out, "404.html"))) {
  const candidate = ["_not-found.html", "_not-found/index.html"].map((p) => join(out, p)).find(existsSync);
  if (candidate) copyFileSync(candidate, join(out, "404.html"));
  else console.warn("pages-postbuild: no 404 page found in out/");
}

// The client router requests navigation segments by a flat file name
// (`__next.$d$locale.$d$section.__PAGE__.txt`) while the export writes them into nested folders
// (`__next.$d$locale/$d$section/__PAGE__.txt`). Add flat copies so client-side navigation works
// on a plain static host instead of falling back to full page loads.
let flattened = 0;
function filesUnder(dir, prefix = []) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? filesUnder(join(dir, entry.name), [...prefix, entry.name])
      : [[...prefix, entry.name]],
  );
}
function flattenSegments(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const parts of filesUnder(full)) {
        const flat = join(dir, [entry.name, ...parts].join("."));
        if (!existsSync(flat)) {
          copyFileSync(join(full, ...parts), flat);
          flattened++;
        }
      }
    } else if (entry.name !== "_next") {
      flattenSegments(full);
    }
  }
}
flattenSegments(out);

console.log(`pages-postbuild: index.html, 404.html, .nojekyll and ${flattened} navigation segments ready`);

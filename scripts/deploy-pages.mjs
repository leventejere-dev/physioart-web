// Builds the static review site and publishes it to the `gh-pages` branch of the `origin` repository.
// GitHub Pages must be set to "Deploy from a branch" → gh-pages / (root).
// Usage: npm run deploy:pages   (set SITE_NOINDEX=0 to allow indexing)
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const sh = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd).toString().trim();

const origin = read("git remote get-url origin");
const match = origin.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
if (!match) {
  console.error(`deploy-pages: origin is not a GitHub repository (${origin})`);
  process.exit(1);
}
const [, owner, repo] = match;
const siteUrl = `https://${owner.toLowerCase()}.github.io/${repo}`;

console.log(`deploy-pages: building for ${siteUrl}`);
sh("npm run build:pages", {
  env: {
    ...process.env,
    GITHUB_PAGES: "1",
    BASE_PATH: `/${repo}`,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    SITE_NOINDEX: process.env.SITE_NOINDEX ?? "1",
  },
});

const out = "out";
const commit = read("git rev-parse --short HEAD");
const name = read("git config user.name");
const email = read("git config user.email");
const identity = `-c core.autocrlf=false -c user.name="${name}" -c user.email="${email}"`;

rmSync(join(out, ".git"), { recursive: true, force: true });
sh("git init -q -b gh-pages", { cwd: out });
sh("git -c core.autocrlf=false add -A", { cwd: out });
sh(`git ${identity} commit -q -m "Deploy ${commit}"`, { cwd: out });
sh(`git push -f -q "${origin}" gh-pages`, { cwd: out });
if (existsSync(join(out, ".git"))) rmSync(join(out, ".git"), { recursive: true, force: true });

console.log(`deploy-pages: published ${commit} → ${siteUrl}/`);

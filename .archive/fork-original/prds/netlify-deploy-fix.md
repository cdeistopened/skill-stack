# Netlify Deployment Fix

## Solution

Add these to your project to fix Netlify builds with Convex:

**netlify.toml:**

```toml
[build]
  command = "npm ci --include=dev && npx convex deploy --cmd 'npm run build'"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

**package.json build script:**

```json
"build": "npx vite build"
```

**Required devDependency:**

```bash
npm install --save-dev @types/node
```

---

## What went wrong

Four separate issues caused sequential build failures on Netlify.

### Issue 1: vite package not found during config load

**Error:**

```
npm warn exec The following package was not found and will be installed: vite@7.2.7
failed to load config from /opt/build/repo/vite.config.ts
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vite'
```

**Cause:** The build script used `npx vite build`. When npx couldn't find vite locally, it tried downloading the latest version (7.2.7) but failed to resolve the import in `vite.config.ts`.

**Initial fix attempt:** Changed build script from `npx vite build` to `vite build` to use the locally installed version.

### Issue 2: vite command not in PATH

**Error:**

```
> vite build
sh: 1: vite: not found
```

**Cause:** When `npx convex deploy` runs `npm run build` in a subprocess, the `node_modules/.bin` directory isn't in PATH. The `vite` command couldn't be found even though the package was installed.

**Fix:** Changed build script back to `npx vite build`. npx explicitly resolves binaries from `node_modules/.bin`.

### Issue 3: devDependencies not installed

**Error:**

```
sh: 1: vite: not found
```

**Cause:** `npm ci` was running, but `NODE_ENV=production` was set in `netlify.toml`:

```toml
[context.production.environment]
  NODE_ENV = "production"
```

With `NODE_ENV=production`, npm skips devDependencies by default. vite is a devDependency, so it wasn't installed.

**Fix:** Changed the build command from `npm ci` to `npm ci --include=dev`:

```toml
command = "npm ci --include=dev && npx convex deploy --cmd 'npm run build'"
```

The `--include=dev` flag forces npm to install devDependencies regardless of NODE_ENV.

### Issue 4: TypeScript cannot find process.env

**Error:**

```
convex/http.ts:9:18 - error TS2580: Cannot find name 'process'.
Do you need to install type definitions for node?
Try `npm i --save-dev @types/node`.
```

**Cause:** The Convex HTTP endpoints use `process.env.SITE_URL` for configuration. TypeScript needs `@types/node` to recognize Node.js globals like `process`.

**Fix:** Added `@types/node` to devDependencies:

```bash
npm install --save-dev @types/node
```

---

## Timeline of fixes

| Attempt | Error                      | Fix applied                              |
| ------- | -------------------------- | ---------------------------------------- |
| 1       | Cannot find package 'vite' | Changed `npx vite build` to `vite build` |
| 2       | vite: not found            | Changed back to `npx vite build`         |
| 3       | vite: not found            | Added `--include=dev` to npm ci          |
| 4       | Cannot find name 'process' | Added `@types/node`                      |

---

## Why this happens

Netlify's build environment sets `NODE_ENV=production` for production deploys. This is standard behavior, but it conflicts with projects that need devDependencies (like vite, typescript, etc.) during the build step.

The Convex deploy command runs your build script in a subprocess. That subprocess inherits the environment but not necessarily the PATH modifications that would normally make `node_modules/.bin` executables available.

---

## Checklist for Convex + Netlify deployments

- [ ] `@types/node` in devDependencies (for process.env types)
- [ ] Build script uses `npx` prefix for local binaries
- [ ] `npm ci --include=dev` in netlify.toml build command
- [ ] `CONVEX_DEPLOY_KEY` set in Netlify environment variables
- [ ] Node version specified in `[build.environment]`

---

## Final working configuration

**netlify.toml:**

```toml
[build]
  command = "npm ci --include=dev && npx convex deploy --cmd 'npm run build'"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
```

**package.json:**

```json
{
  "scripts": {
    "build": "npx vite build"
  },
  "devDependencies": {
    "@types/node": "^25.0.2",
    "vite": "^5.1.4"
  }
}
```

---

## References

- [Convex Netlify Hosting Docs](https://docs.convex.dev/production/hosting/netlify)
- [Netlify Build Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [npm ci documentation](https://docs.npmjs.com/cli/v10/commands/npm-ci)

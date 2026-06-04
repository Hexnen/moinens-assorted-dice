# Releasing a new version

Foundry installs this module from the **manifest URL** (always points at the latest release):

```
https://github.com/Hexnen/moinens-assorted-dice/releases/latest/download/module.json
```

For that to work, every release must attach two assets named exactly **`module.json`** and
**`module.zip`**, and `module.json`'s `version` must match the release tag.

## Steps

Run from the module root (`modules/moinens-assorted-dice/`). Replace `X.Y.Z` with the new version.

1. **Bump the version** in `module.json` → `"version": "X.Y.Z"` and update the `download` URL tag:
   `".../releases/download/vX.Y.Z/module.zip"`. (The `manifest` URL stays `latest`.)

2. **Commit** the change:
   ```bash
   git add -A && git commit -m "Release vX.Y.Z"
   git push
   ```

3. **Build `module.zip`** from the committed tree (clean — no `.git`, no build junk; `module.json`
   sits at the zip root, which Foundry requires):
   ```bash
   git archive --format=zip -o "$TMP/module.zip" HEAD
   ```
   (`$TMP` = any path outside the repo, e.g. your temp dir.)

4. **Create the release** with both assets (this also creates the `vX.Y.Z` tag on HEAD):
   ```bash
   gh release create vX.Y.Z "$TMP/module.zip" module.json \
     --title "vX.Y.Z" --notes "What changed in this version."
   ```

5. **Verify** the manifest resolves and reports the new version:
   ```bash
   curl -sL https://github.com/Hexnen/moinens-assorted-dice/releases/latest/download/module.json \
     | python -c "import json,sys; d=json.load(sys.stdin); print(d['version'], d['download'])"
   ```

## Regenerating dice art (when faces change)

The per-set build tooling lives in the standalone source modules (`stonetop-dice/tools/`,
`mb-dice/tools/`, `salvage-union-dice/tools/`, `stonetop-bone-dice/tools/`) — that's the source of
truth for the textures. After regenerating a set, copy its `textures/` into this module's
`textures/<brand>/` subfolder, then cut a new release as above.

Notes:
- Keep `module.json` `version` and the git tag in lockstep (Foundry compares them).
- `module.zip` excludes `.git` and the ignored build artifacts automatically because `git archive`
  only packs committed files.

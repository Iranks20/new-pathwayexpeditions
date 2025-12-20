# Repository history rewritten (LFS cleanup) — Action required

Date: 2025-12-15

Summary
- I rewrote repository history to remove 251 large assets that were previously moved to
  `attached_assets/archive/removed-largest-2025-12-14` to reclaim Git LFS quota.
- This is a destructive history rewrite (force-pushed). After this change, everyone with
  local clones must update their clones as described below.

Recommended (safe) action — re-clone
1. Backup any local, uncommitted work (stash, create patch, or copy the repo directory).
2. Re-clone the repository fresh:

```bash
git clone https://github.com/Iranks20/pathway-expeditions.git
```

Alternative (if you cannot re-clone)
1. Save your local commits (create patches or push them to a temporary remote).
2. Run these commands (WARNING: this will discard local uncommitted commits):

```powershell
git fetch origin
git checkout master
git reset --hard origin/master
git clean -fdx
```

If you have other local branches you want to keep, create patches first or recreate them from
origin after the reset with `git checkout -b <branch> origin/<branch>`.

Git LFS local cleanup
1. Ensure you have `git-lfs` installed.
2. Run:

```bash
git lfs fetch --all
git lfs prune --verify-remote
git lfs ls-files -l
```

Verification
- Confirm your working copy builds and that the app runs locally.
- Optionally check for any remaining references to the old archive paths.

Contact / questions
- If you need help preserving local unpushed work, reach out on the project chat or open an issue.

Email snippet you can forward to the team

Subject: Action required — repository history rewritten (re-clone or reset required)

Body:
Hi team,

I rewrote repository history today to remove many large files previously tracked by Git LFS and
force-pushed the cleaned history. Please either re-clone the repository or follow the reset steps
in `REWRITE_INSTRUCTIONS.md` to update your local clone. Backup any uncommitted or un-pushed work first.

If you need help, ping me or open an issue.

— Maintainer

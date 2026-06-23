# 🚀 Repository Ready!

Hello there, the repository is set up and ready to go. Below is everything you need to know about our branch structure and how to work with it day-to-day.

## 🌳 Branch Structure

| Branch | Purpose |
|---|---|
| `main` | Stable states of the project. Only tested, working code lives here. |
| `dev` | The non-stable, always-updating version. This is where ongoing work gets merged before it's considered stable. |
| `prod` | The final release version — what actually goes out to the public. |
| `feat-<name>` | Feature branches. Create one any time you're working on something that should be isolated from the rest (a new feature, a fix, an experiment, anything). Replace `<name>` with whatever describes the work. |

### A quick model

```
feat-whatever  →  dev  →  main  →  prod
   (build)      (test)  (stable) (release)
```

Work happens in feature branches, gets merged into `dev` for integration, proves itself stable on `main`, and eventually ships via `prod`.

## 🛠️ Getting Started

Clone the repo and check out `dev` to start working:

```bash
git clone https://gitlab.ultrawares.com/ultrawares/ultrawares-project/new-website-frontend.git
cd new-website-frontend
git checkout dev
git pull origin dev
```

## ✨ Creating a Feature Branch

When you're about to start work on something new, branch off of `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feat-your-feature-name
```

Push it up so others can see it / collaborate:

```bash
git push -u origin feat-your-feature-name
```

## 🔄 Keeping Your Feature Branch Up to Date

If `dev` has moved on while you've been working, rebase or merge to stay current:

```bash
git checkout feat-your-feature-name
git fetch origin
git merge origin/dev
```

(Use `git rebase origin/dev` instead of `merge` if you prefer a cleaner linear history — just be careful rebasing if others are also working on the same branch.)

## ✅ Merging Your Work Back Into `dev`

Once your feature is done and tested:

```bash
git checkout dev
git pull origin dev
git merge feat-your-feature-name
git push origin dev
```

Or, preferably, open a **Merge Request** on GitLab targeting `dev` so the team can review before it lands.

## 🧹 Cleaning Up After Merge

Once your feature branch has been merged and is no longer needed:

```bash
git branch -d feat-your-feature-name
git push origin --delete feat-your-feature-name
```

## 📌 Quick Reference Cheat Sheet

```bash
# Start a new feature
git checkout dev && git pull origin dev && git checkout -b feat-my-feature

# Push a new feature branch
git push -u origin feat-my-feature

# Update your feature branch with latest dev
git fetch origin && git merge origin/dev

# Merge feature into dev (after MR approval, or directly if solo)
git checkout dev && git pull origin dev && git merge feat-my-feature && git push origin dev

# Delete a finished feature branch (local + remote)
git branch -d feat-my-feature && git push origin --delete feat-my-feature

# Check which branch you're on
git branch --show-current

# See all branches (local + remote)
git branch -a
```

## 🧭 A Few Ground Rules

- Never push directly to `main` or `prod` — these should only be updated through reviewed merges (or release processes), to keep them stable.
- All new work starts from `dev`, not `main`.
- Name feature branches descriptively: `feat-login-page`, `feat-fix-payment-bug`, `feat-dark-mode`, etc. — anything goes after `feat-`, just make it clear what it's for.
- Delete your feature branch once it's merged to keep things tidy.

That's it — happy coding! 🎉 If anything about the workflow is unclear, just ask.
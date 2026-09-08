The Git remote is restored to `https://github.com/Hajimohammadi-KI/APPS_root_new.git`. Local Git uses long paths, prunes stale remote references on fetch and permits only fast-forward pulls. Existing author identity is preserved. Git LFS object verification passed.

The local history started again at `24f6b37`, while GitHub main continued through `3089bf0`; they had no common ancestor. The local initial snapshot already contained later representative assessment, curriculum revision and daily-plan work. The remote-to-local tree comparison consists of those language-app increments and the documented archive omissions. The recovery manifest records every remote-only path before history integration. Both histories are retained as merge parents; no force push or remote-history replacement is used.

The English `.vercelignore` was present locally but incorrectly excluded by `.vercel*`. Its exclusions match the remote version after normalizing line endings. It is restored to source tracking. Both apps retain `.env.example` exceptions while actual environment files stay ignored. The existing focused Python test-discovery configuration is preserved; searches omit local artifacts and quarantined outputs.

Cleanup is reversible:

- **49 generated intermediate files**, 15,526,973 bytes, moved from eight obsolete `.codex-tmp/proposal-*-render` directories into `DELETE/20260906-obsolete-renders`. All post-move SHA-256 values match the originals. The three output directories still referenced by render helpers remain in place.
- **46 remote-only historical files** recovered into `DELETE/20260906-remote-history/3089bf089ee8`: 44 archived Markdown files, one old roadmap temporary file and one historical thesis strategy file. They remain in remote history as well. These are preserved archive copies; byte-identical duplication is not assumed.
- Original thesis documents, source PDFs, current app trees, legacy apps, installer evidence and learner profiles are preserved. Nothing was permanently deleted. `DELETE/` stays outside Git and includes recovery manifests.

See [cleanup hashes](CLEANUP-MANIFEST-2026-09-06.json) and [remote recovery hashes](GIT-HISTORY-RECOVERY-2026-09-06.json). These tracked manifests contain paths and hashes, not the recovered personal document contents.

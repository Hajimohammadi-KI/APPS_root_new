# NOT a duplicate — miscategorized, needs a product decision

**Status: flagged for owner review, 2026-08-30. This label superseded the
generic archive notice this file originally carried.**

Investigation for the archive plan's content inventory (step 2) found that
this directory is not a duplicate of the canonical English app at all. It is
**LingoBridge**, an original local-first browser extension (German/Persian/
English flashcards, spaced repetition) that explicitly integrates with the
German app, English app, and project tracker — see its own `README.md`. It
was grouped into the duplicate-prototype archive list in
[`docs/CANONICAL-APP-MAP.md`](../../../docs/CANONICAL-APP-MAP.md) by mistake.

Nothing here has been deleted (only its gitignored `node_modules` cache was
cleared, which `bun install` regenerates). This directory should not be
treated as archived until the product owner decides whether LingoBridge is
a sixth active product or genuinely abandoned — that's a product-scope
decision, not a cleanup task.

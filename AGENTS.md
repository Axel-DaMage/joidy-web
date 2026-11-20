<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:docs-authoring -->
# Docs authoring (`docs/*.mdx`)

Docs pages are rendered with `next-mdx-remote` v6 using its secure defaults
(`blockJS: true`, `blockDangerousJS: true`). Consequences for authors:

- Any `{expression}` written in prose is **silently stripped** from the rendered
  output — no build error, no warning. Do not use `{variables}` or JSX
  expressions in prose.
- Keep all `{...}` braces inside fenced code blocks or inline code spans; those
  are safe.
- `next-mdx-remote` is archived upstream. The pinned v6 is retained knowingly
  (secure defaults, no current breakage); migration to `@next/mdx` or a
  maintained alternative is tracked separately.
<!-- END:docs-authoring -->

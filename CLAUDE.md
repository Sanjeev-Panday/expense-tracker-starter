# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

No test suite is configured.

## Architecture

This is a single-component React app (Vite + React 19). All logic lives in `src/App.jsx` — there are no sub-components, routing, or external state libraries.

**Known intentional issues (course material):**
- `amount` is stored as a string on each transaction, so `.reduce((sum, t) => sum + t.amount, 0)` produces string concatenation instead of numeric addition — the Income, Expenses, and Balance totals display incorrectly.
- Transaction #4 ("Freelance Work") is typed as `"expense"` in the seed data but categorized as `"salary"` — an inconsistency left in for the course.
- The UI is intentionally sparse; `App.css` includes a `.delete-btn` class but no delete functionality is wired up.

**State shape:** all state is local `useState` in `App`. Transactions are objects with `{ id, description, amount, type, category, date }` where `amount` is a string.

**Styling:** plain CSS in `src/App.css` (component styles) and `src/index.css` (global reset + body). No CSS framework or preprocessor.

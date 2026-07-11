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

React 19 app built with Vite. No routing, no external state libraries.

**Component tree:**
- `App` — holds the `transactions` array in state and passes it down; the only place `setTransactions` is called
  - `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally
  - `TransactionForm` — owns its own form state (description, amount, type, category); calls `onAdd(transaction)` prop on submit
  - `TransactionList` — owns its own filter state (filterType, filterCategory); receives `transactions` and renders the filtered table

**Transaction shape:** `{ id, description, amount, type, category, date }` where `amount` is a number, `type` is `"income"` or `"expense"`, and `category` is one of `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`. The `categories` array is defined locally in both `TransactionForm` and `TransactionList`.

**Known intentional issue (course material):**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` in the seed data.
- `App.css` includes a `.delete-btn` class but no delete functionality is wired up.

**Styling:** plain CSS in `src/App.css` (component styles) and `src/index.css` (global reset + body). No CSS framework or preprocessor.

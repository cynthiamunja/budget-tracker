# Budget Tracker API

A REST API for tracking income and expenses, built with Node.js, Express, and SQLite. It supports full CRUD for transactions and categories, filtering by type, category, and date range, and a summary endpoint that calculates total income, total expenses, and balance.

## Tech Stack

- Node.js (ES Modules)
- Express 5
- SQLite via better-sqlite3

## API Endpoints

### Categories (`/categories`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/categories/getAllCategories` | List all categories |
| POST | `/categories/createCategory` | Create a category |
| PUT | `/categories/updateCategory/:id` | Rename a category |
| DELETE | `/categories/deleteCategory/:id` | Delete a category (fails if in use) |

### Transactions (`/transactions`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/transactions/getAllTransactions` | List transactions, with optional filters |
| GET | `/transactions/getTransactionByID/:id` | Get one transaction |
| GET | `/transactions/summary` | Total income, total expenses, and balance |
| POST | `/transactions/createTransaction` | Create a transaction |
| PUT | `/transactions/updateTransaction/:id` | Replace a transaction |
| DELETE | `/transactions/deleteTransaction/:id` | Delete a transaction |

**Filters for `getAllTransactions`** (all optional): `type` (`income` or `expense`), `category_id`, `from` and `to` (dates in `YYYY-MM-DD` format).

Example: `/transactions/getAllTransactions?type=expense&from=2026-09-01&to=2026-09-30`
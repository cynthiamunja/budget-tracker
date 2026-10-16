# Budget Tracker API

A REST API for tracking income and expenses, built with Node.js, Express, and SQLite. It supports full CRUD for transactions and categories, filtering by type, category, and date range, and a summary endpoint that calculates total income, total expenses, and balance.

## Tech Stack

- Node.js (ES Modules)
- Express 5
- SQLite via better-sqlite3
- Node test runner and supertest for automated tests
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

## Running Tests

```bash
npm test
```

Tests use Node's built-in test runner and supertest. They run against a temporary in-memory SQLite database, so your real `budget.db` is never touched.

## Example Requests

Create a category:

```bash
curl -X POST http://localhost:3000/categories/createCategory \
  -H "Content-Type: application/json" \
  -d '{"name":"rent"}'
```

Create a transaction (`category_id` must belong to an existing category):

```bash
curl -X POST http://localhost:3000/transactions/createTransaction \
  -H "Content-Type: application/json" \
  -d '{"type":"expense","amount":500,"category_id":1,"description":"September rent","date":"2026-09-01"}'
```

Fields: `type` is `income` or `expense`, `amount` is a positive number, `date` is `YYYY-MM-DD`, and `description` is optional.

Update a transaction (send every field, since it replaces the whole record):

```bash
curl -X PUT http://localhost:3000/transactions/updateTransaction/1 \
  -H "Content-Type: application/json" \
  -d '{"type":"expense","amount":550,"category_id":1,"description":"Rent and extras","date":"2026-09-01"}'
```

Get a summary:

```bash
curl http://localhost:3000/transactions/summary
```

Example response:

```json
{ "totalIncome": 150, "totalExpenses": 590, "balance": -440 }
```

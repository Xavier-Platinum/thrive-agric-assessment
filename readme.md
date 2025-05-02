# ThriveAgric Smart Inventory System

ThriveAgric assessment backend platform for managing agricultural inventory across warehouses.

## Architecture

- Node.js + Express.js (API)
- MongoDB (Mongoose ODM)
- Bull Queue (Background Jobs)
- EventEmitter (for in-app pub/sub, can be upgraded to Redis)
- Mocked OpenAI-powered AI Assistant
- Modular Namespace-based architecture for scalability

## Namespace Structure

```plaintext
src/
├── domains
│   ├── inventory
│   │   ├── model.js
│   │   ├── service.js
│   │   └── repository.js
│   ├── warehouse
│   │   ├── model.js
│   │   ├── service.js
│   │   └── repository.js
│   ├── sync
│   │   └── service.js
│   └── ai
│       └── service.js
├── infrastructure
│   ├── database
│   │   └── connection.js
│   ├── jobs
│   │   └── duplication.js
│   ├── events
│   │   └── inventory.js
│   └── config
│       └── env.js
├── interfaces
│   └── http
│       ├── routes
│       │   └── index.js
│       ├── controllers
│       │   ├── inventory/index.js
│       │   ├── warehouse/index.js
│       │   ├── sync/index.js
│       │   ├── webhook/index.js
│       │   └── ai/index.js
│       └── middleware
│           └── validator.js
├── shared
│   ├── utils
│   │   └── matcher.js
│   ├── constants
│   └── validation
│       ├── inventory.validation.js
│       └── warehouse.validation.js
index.js
server.js
```

## Setup Instructions

```bash
git clone https://github.com/Xavier-Platinum/thrive-agric-assessment.git
cd thrive-agric-assessment
npm install
```

### Configure Environment

Example env config is in .env.example run the code below and update as wish.

```bash
cp .env.sample .env
```

### Run the App

```bash
npm run dev
yarn dev
```

To run background jobs:

```bash
node src/infrastructure/jobs/duplication.js
```

## API Endpoints

### Inventory

- `POST /api/inventory` – Add new inventory (emits `stock_in`)
- `PUT /api/inventory/:id` – Update inventory (emits `stock_out`)
- `GET /api/inventory` – List all inventory items
- `DELETE /api/inventory/:id` – Delete inventory item

### Warehouses

- `POST /api/warehouses` – Create new warehouse
- `GET /api/warehouses` – List warehouses
- `DELETE /api/warehouses/:id` – Delete warehouse

### Offline Sync

- `POST /api/sync` – Sync offline data

### Webhook

- `POST /api/webhook/stream` – Emissions from events updated in realtime to webhook
- Structured event payload (data, type, message, event).
- Auto-cleanup on client disconnect.

### AI Assistant (Mocked NLP)

- `POST /api/ai/suggest`
- `POST /api/ai/explain`

### Background Jobs

- **Duplicate Detection Job** (Runs every 5 mins)
  - Uses `Levenshtein distance` + `Agro Keywords` (e.g., "fertilzr" → "fertilizer")
  - Custom fuzzy matching from `shared/utils/matcher.js`
  - Job implemented using `Bull` which emits any matching data through events to webhook

### Real-time Events

- Stock events (`stock_in`, `stock_out`) are emitted from `inventoryService` and consumed via in-app pub/sub using `EventEmitter`.

### Validation

- Custom validators for input payloads using `shared/validations/*` via `interfaces/http/middleware/requests/index.js['validationHandler']`.

## Assumptions

- AI suggestions are based on dynamic agricultural keywords.
- Sync intelligently merges or creates items by normalized name and warehouse.
- Future integration of actual OpenAI NLP can be dropped into `ai/service.js` configured in `utils/matcher.js` .

## Postman Documentation

[Documentation](https://documenter.getpostman.com/view/10291803/2sB2j4fWRM)

## Engineer

[@Xavier-Platinum](https://github.com/Xavier-Platinum)

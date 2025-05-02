# 🌾 ThriveAgric Smart Inventory System

ThriveAgric assessment backend platform for managing agricultural inventory across warehouses.

## ⚙️ Architecture
- Node.js + Express.js (API)
- MongoDB (Mongoose ODM)
- Bull Queue (Background Jobs)
- EventEmitter (for in-app pub/sub, can be upgraded to Redis)
- Mocked OpenAI-powered AI Assistant
- Modular Namespace-based architecture for scalability

## 📁 Namespace Structure
```
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
│   │   └── syncService.js
│   └── ai
│       └── aiService.js
├── infrastructure
│   ├── database
│   │   └── connection.js
│   ├── jobs
│   │   └── duplicateDetector.js
│   ├── events
│   │   └── inventoryEvents.js
│   └── config
│       └── env.js
├── interfaces
│   └── http
│       ├── routes
│       │   └── index.js
│       ├── controllers
│       │   ├── inventoryController.js
│       │   ├── warehouseController.js
│       │   ├── syncController.js
│       │   └── aiController.js
│       └── middleware
│           └── validator.js
├── shared
│   ├── utils
│   │   └── fuzzyMatcher.js
│   ├── constants
│   └── validation
│       ├── inventoryValidation.js
│       └── warehouseValidation.js
server.js
```

## 🚀 Setup Instructions
```bash
git clone https://github.com/your-org/smart-inventory-backend.git
cd smart-inventory-backend
npm install
```

### 🔧 Configure Environment
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/thrive_inventory
REDIS_URL=redis://127.0.0.1:6379
```

### ▶️ Run the App
```bash
npm run dev
```

To run background jobs:
```bash
node src/infrastructure/jobs/duplicateDetector.js
```

---

## 📱 API Endpoints

### 🔹 Inventory
- `POST /api/inventory` – Add new inventory (emits `stock_in`)
- `PUT /api/inventory/:id` – Update inventory (emits `stock_out`)
- `GET /api/inventory` – List all inventory items
- `DELETE /api/inventory/:id` – Delete inventory item

### 🔹 Warehouses
- `POST /api/warehouses` – Create new warehouse
- `GET /api/warehouses` – List warehouses
- `DELETE /api/warehouses/:id` – Delete warehouse

### 🔹 Offline Sync
- `POST /api/sync` – Sync offline data
```json
{
  "offlineData": [
    { "name": "Fertilzr Urea", "quantity": 20, "warehouseId": "abc123" }
  ]
}
```

### 🔹 AI Assistant (Mocked NLP)
- `POST /api/ai/suggest`
```json
{ "input": "fertilzr" }
```
Response:
```json
{ "suggestion": "Fertilizer - Urea" }
```

- `POST /api/ai/explain`
```json
{ "itemName": "Fertilizer - Urea" }
```
Response:
```json
{ "explanation": "Fertilizer - Urea helps crops grow faster by providing essential nitrogen." }
```

---

## 🎯 Enterprise Features

### ✅ Background Jobs
- **Duplicate Detection Job** (Runs every 5 mins)
  - Uses `Levenshtein distance` + `Agro Keywords` (e.g., "fertilzr" → "fertilizer")
  - Custom fuzzy matching from `shared/utils/fuzzyMatcher.js`
  - Job implemented using `Bull`

### 📱 Real-time Events
- Stock events (`stock_in`, `stock_out`) are emitted from `inventoryService` and consumed via in-app pub/sub using `EventEmitter`.

### 📌 Validation
- Custom validators for input payloads using `Joi` via `interfaces/http/middleware/validator.js`

---

## ✅ Assumptions
- AI suggestions are based on dynamic agricultural keywords.
- Sync intelligently merges or creates items by normalized name and warehouse.
- Future integration of actual OpenAI NLP can be dropped into `aiService.js`.

---

## 🧪 Testing
Coming soon: Jest-based unit tests and Postman collection.

---

## 📦 Bonus
- Fully modular design ready for containerization (Docker, K8s)
- Extensible for RabbitMQ, Redis Streams, etc.

---

Let me know if you'd like the actual code export or Dockerized deployment next.
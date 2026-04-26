# E-commerce Backend (Express + Node.js)

Simple, modular backend with in-memory mock data. Ready for Docker / CI / Prometheus integration.

## Quick start

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm start
```

The server runs on port `3000` by default.

## API Endpoints

- `GET /products` → all products
- `GET /products/:id` → single product
- `GET /users` → all users
- `GET /orders` → all orders
- `POST /orders` → create order

Example `POST /orders` payload:

```json
{
  "userId": 1,
  "items": [
    { "productId": 2, "quantity": 1 },
    { "productId": 3, "quantity": 2 }
  ]
}
```

## Notes

- Data is in-memory (files under `data/`).
- Root health endpoint available at `/` for quick readiness checks.
- Health check JSON available at `/health` (`{"status":"ok"}`).
- `/metrics` is a placeholder for future Prometheus metrics.
- Basic error handling included (404s, validation).

To enable CORS for browser-based frontends, install and use the `cors` package:

```bash
npm install cors
```

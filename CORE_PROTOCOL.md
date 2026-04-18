# FUTURE BREW: CORE OPERATING SYSTEM PROTOCOL

This document defines the **Immutable Core** of the Cafe Administrative & Commerce System. No modification to these foundational patterns is permitted without explicit authorization, as they ensure the absolute stability of the Data Relay and Security Shield.

## 1. System Architecture
- **Environment**: Node.js / Express / MongoDB.
- **Frontend-Backend Bridge**: RESTful API utilizing JSON exchange.
- **Port Assignment**: 
  - Backend: `5000`
  - Frontend: `5173`

## 2. Authentication & Security (The Shield)
- **Mechanism**: JSON Web Token (JWT) + LocalStorage.
- **Authorization Flow**:
  1. `protect` middleware verifies the presence and validity of the Bearer Token.
  2. `admin` middleware verifies `role === 'admin'` or `isAdmin === true`.
- **Relay Headers**:
  ```javascript
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <TOKEN>'
  }
  ```

## 3. The Administrative Arsenal (Core Commands)
These endpoints are the "Power Signals" of the system and must remain unmodified:

### Bookings Sector
- **Fetch All**: `GET /api/bookings/admin/all`
- **Status Relay**: `PUT /api/bookings/admin/status/:id`
- **Atomic Purge**: `DELETE /api/bookings/admin/delete/:id`
  - *Logic*: Uses `findByIdAndDelete` for total record incineration.

### Orders Sector
- **Fetch All**: `GET /api/orders`
- **Status Relay**: `PUT /api/orders/:id/status`
- **Atomic Purge**: `DELETE /api/orders/:id`
  - *Logic*: Uses `findByIdAndDelete` to wipe transaction history.

## 4. Data Consistency Protocol
- **Spelling Flexibility**: All administrative and logic checks MUST be case-insensitive and support variants:
  - `cancelled` (Preferred)
  - `Cancelled` (Capitalized)
  - `canceled` (US-variant)
- **ID Validation**: Controllers must verify ID integrity (Length check >= 24) before database invocation.

## 5. UI Integration Rules (`Admin.jsx`)
- **Null Safety**: All component mappings (`.map()`) must include fallback checks (`|| []`) to prevent rendering crashes.
- **Signal Targeting**: 
  - "Purge" buttons MUST invoke the `DELETE` methods.
  - "Cancel" buttons MUST invoke the `PUT status` methods.

## 6. Deployment Logic
- **Production State**: Vercel-optimized. `process.env.NODE_ENV === 'production'` serves the `dist` folder.
- **Connection**: `MONGO_URI` is required for Cloud synchronization.

---
**END PROTOCOL // DO NOT OVERWRITE CORE API SIGNATURES**

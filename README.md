# 📈 PulseStack — AI-Powered Payment Infrastructure for Nigerian Businesses

PulseStack is the next-generation financial intelligence layer built for Nigerian merchants and landlords. It sits on top of **Nomba's** production-ready payment APIs, wrapping them inside a powerful, automated intelligence framework that helps businesses monitor cash flow, automate payroll, predict defaults, and optimize operations using AI.

Built for the **DevCareer x Nomba Hackathon**, PulseStack shows how modern fintech APIs can be paired with natural language understanding (English & Pidgin) and predictive diagnostics to elevate the merchant experience.

---

## 🚀 Key Features

### 1. Smart Payment Collections
- Accept payments through multiple channels: **Nomba Payment Links**, **Virtual Accounts (Providus/Wema)**, and **QR Codes**.
- **Real-Time Security Inspector**: AI monitors incoming payment signatures to flag fraud, card-IP mismatches (e.g. Brazilian cards on Nigerian IPs), and potential chargebacks before they settle.

### 2. AI Rent & Property Manager
- Map individual Providus/Wema virtual accounts to specific tenants.
- **Tenant Default Risk Predictor**: AI calculates delinquency risk (Low/Medium/High) based on historical payment cycles and local economic indicators.
- **Pidgin/English Auto-Nudges**: Generate friendly, high-conversion payment reminders (e.g. *“Abeg Segun, clear the rent balance of ₦350k...”*) to send via WhatsApp or SMS.

### 3. Smart Payroll & Bulk Payouts
- Single-click payroll disbursements powered by the **Nomba Payout API**.
- **AI Anomaly Auditor**: Automatically scans payroll inputs prior to execution to detect duplicate entries, account number mismatches, and double transfers.
- **Optimal Date Planner**: AI suggests the best salary payment date to maximize liquid cash flow buffers.

### 4. Inventory Intel & Shop Reordering
- Real-time stock depletion connected directly to incoming payment webhooks.
- **AI Stockout Predictor**: Forecasts exact stockout dates based on sales velocity.
- **Automated Supplier Invoice Drafts**: Drafts and prepares vendor payouts when inventory hits critical reorder thresholds.

### 5. AI Expense Auto-Classifier
- Log expenses using plain English or Pidgin (e.g. *“Bought Mikano generator diesel N145,000”*).
- **Auto-Categorizer**: AI automatically classifies transactions into distinct groups (Generator/Fuel, Logistics, Staff Feeding, etc.).
- **Waste Detection Alerts**: Flags excessive spending leakages (like high diesel generator costs) and advises solar hybrid break-even options.

### 6. Cooperative & Ajo Pools
- Organise owambe, thrift, or cooperative pools with automated tracking.
- Contributors pay via Nomba checkout links, while AI monitors delinquency and schedules payouts directly to the beneficiary's wallet.

### 7. Diaspora Remittance Rails
- Accept USDT/USDC deposits from overseas sponsors via a NOWPayments gateway simulation.
- Automatically exchanges stablecoins at live parallel rates (e.g. ₦1,550/$) and routes funds instantly to local bank accounts via Nomba payouts within 0.8 seconds.

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Modern, responsive Custom CSS with CSS variables, Glassmorphism design system, and sleek dark mode theme
- **Icons**: Lucide React
- **APIs Simulated**: Nomba Collections, Nomba Virtual Accounts, Nomba Bulk Payouts, NOWPayments, Twilio SMS API

---

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/PulseStack.git
   cd PulseStack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Code Linter**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🧪 Developer Sandbox Console
PulseStack includes a built-in **Developer Webhook Console** at the footer. In this sandbox panel, you can simulate real-world Nomba API webhooks:
- `simulatePaymentWebhook('card')`: Simulates credit card settlements into the merchant balance.
- `simulatePaymentWebhook('rent')`: Simulates rent settlements, updating the Property module.
- `simulatePaymentWebhook('ajo')`: Simulates cooperative contributions.
- `simulatePaymentWebhook('suspicious')`: Triggers the fraud-detection engine with card-IP discrepancies.

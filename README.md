# 🏥 SwasthyaTap Hospital Workstation Portal

> High-speed clinical EMR and healthcare workstation portal for hospitals and doctors to search patient records, issue digital prescriptions, upload lab reports, manage emergency blood donor networks, and program NFC health cards.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

**SwasthyaTap Hospital Workstation** is the clinical interface of the SwasthyaTap healthcare ecosystem. Designed for emergency rooms, consultation chambers, diagnostics labs, and blood banks, it provides hospital staff with unified, instantaneous access to citizen medical histories, emergency vitals, and diagnostic records.

### Core Modules

1. **🔐 Multi-Factor Hospital Authentication**
   - Facility ID selection with registered doctor/staff personnel profiles.
   - OTP verification with development mode bypass and live Twilio SMS integration in production.
   - Secure stateless session handling backed by signed JWT tokens.

2. **📋 Unified Electronic Medical Records (EMR)**
   - Rapid search by **Swasthya ID** (`SW-XXXXXX`), citizen full name, phone number, or chronic conditions.
   - Clinical overview: blood group, critical allergies, chronic illnesses, active medications, emergency contacts, and organ pledge status.
   - Tabbed history of clinical encounters, digital prescriptions, and laboratory reports.

3. **💊 Digital Prescription Generator**
   - Structured prescription builder with medication name, dosage, frequency, and treatment duration.
   - Meal timings (before/after food) and intake schedule flags (morning, afternoon, night).
   - Instant addition to the patient's global SwasthyaTap record.

4. **🧪 Diagnostic Lab Report Management**
   - Record test findings, issuing doctor/department, and test categories (Blood Tests, Radiology, Pathology, etc.).
   - Multi-parameter tabular tracking (Hemoglobin, RBC, WBC, Platelets, etc.) with normal reference ranges.
   - Abnormal result flags for rapid triage.

5. **🩸 Emergency Blood Donor Proximity Radar**
   - Real-time donor discovery filtered by blood group (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).
   - Automated distance calculation between the hospital's GPS coordinates and donor residential addresses using the **Haversine formula**.
   - One-click emergency broadcast to matching nearby community blood donors.

6. **📶 NFC Health Card Programming Portal**
   - Generate secure, signed NFC payloads for patient physical health cards.
   - Web NFC API integration to scan, program, and verify physical cards directly from the workstation browser.

7. **🩺 System Health Monitoring**
   - Built-in `/api/health` monitoring endpoint providing database connectivity status, latency metrics, and server uptime.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [Next.js 14 (App Router)](https://nextjs.org/) + [React 18](https://react.dev/) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/), Glassmorphism UI, [Lucide React Icons](https://lucide.dev/) |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose 8](https://mongoosejs.com/) |
| **Authentication & Tokens** | JSON Web Tokens ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)), OTP Sessions |
| **SMS Gateway** | Twilio REST API (configurable via environment variables) |

---

## 📁 Project Structure

```text
swasthyaTapHospital/
├── app/
│   ├── api/                          # Next.js Serverless API Routes
│   │   ├── auth/                     # Hospital auth, OTP dispatch & verification
│   │   │   ├── hospitals/route.js
│   │   │   ├── send-otp/route.js
│   │   │   └── verify/route.js
│   │   ├── blood-requests/route.js   # Emergency blood requests & dispatch
│   │   ├── health/route.js           # Server uptime & MongoDB health check
│   │   ├── patients/                 # Patient query and creation
│   │   │   ├── [id]/                 # Single patient profile, prescriptions, reports & NFC
│   │   │   └── route.js
│   │   └── stats/route.js            # Workstation dashboard analytics
│   ├── blood-network/page.jsx        # Blood Donor Radar UI
│   ├── dashboard/page.jsx            # Main clinical dashboard
│   ├── login/page.jsx                # Secure hospital login with OTP
│   ├── nfc-portal/page.jsx           # NFC Card Writer & Token Generator
│   ├── patients/                     # Patient search & clinical detail views
│   ├── prescriptions/new/page.jsx    # Digital prescription builder
│   ├── reports/new/page.jsx          # Diagnostic report upload interface
│   ├── layout.jsx                    # Root layout with AuthProvider & Navbar
│   └── page.jsx                      # Entrypoint redirector
├── components/                       # Modular UI components
│   ├── Badge.jsx                     # Blood group & status badges
│   ├── Navbar.jsx                    # Global navigation bar
│   ├── PatientCard.jsx               # Patient card summary
│   ├── PatientDetailHeader.jsx       # Clinical header banner
│   ├── Sidebar.jsx                   # Hospital sidebar navigation
│   ├── StatsGrid.jsx                 # Dynamic analytics cards
│   ├── SwasthyaIdSearchCard.jsx      # Swasthya ID lookup card
│   └── Toast.jsx                     # Notifications & alerts
├── lib/
│   ├── api.js                        # Client API wrapper methods
│   ├── authContext.jsx               # React authentication context
│   ├── mongodb.js                    # Mongoose database connector & cache
│   ├── utils.js                      # Shared helpers (cn, calculateDistance, formatDate)
│   └── models/                       # Mongoose data schemas
│       ├── BloodRequest.js
│       ├── Citizen.js
│       ├── Hospital.js
│       ├── NfcCard.js
│       └── OtpSession.js
├── public/                           # Static assets & hospital logo
├── .env.example                      # Environment variables template
├── jsconfig.json                     # Path aliases (@/*)
├── next.config.js                    # Next.js configuration
├── package.json                      # Project dependencies & scripts
└── tailwind.config.js                # Custom medical & cyber color palette
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18.17+ (v20+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB instance
- (Optional) [Twilio Account](https://www.twilio.com/) for live SMS OTP delivery

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ADITYAchhipa/swasthyaHospital.git swasthyaTapHospital
cd swasthyaTapHospital
npm install
```

### 3. Environment Variables

Copy the sample environment file and configure your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/swasthyatap?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Twilio SMS Configuration (Optional in development)
PRODUCTION_OTP=false
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Hospital Portal Port (Default: 3088)
PORT=3088
```

> **Note:** In development (`PRODUCTION_OTP=false`), the OTP code is displayed directly in the UI for effortless testing.

### 4. Running the Development Server

Start the local workstation on port `3088`:

```bash
npm run dev
```

Open [http://localhost:3088](http://localhost:3088) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts development server on port 3088 (`next dev -p 3088`) |
| `npm run build` | Compiles optimized production build (`next build`) |
| `npm run start` | Runs the production server on port 3088 (`next start -p 3088`) |
| `npm run lint` | Runs Next.js ESLint checks |

---

## 📡 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check endpoint returning uptime & DB connection status |
| `/api/auth/hospitals` | `GET` | Fetch list of registered hospitals and authorized personnel |
| `/api/auth/send-otp` | `POST` | Generate and dispatch OTP for hospital login |
| `/api/auth/verify` | `POST` | Verify OTP and issue JWT session token |
| `/api/patients` | `GET` | Query patients with filters (Swasthya ID, name, blood group, conditions) |
| `/api/patients` | `POST` | Create a new patient profile |
| `/api/patients/[id]` | `GET`, `PUT` | Fetch or update specific patient details |
| `/api/patients/[id]/prescriptions` | `POST` | Issue a digital prescription to a patient |
| `/api/patients/[id]/reports` | `GET`, `POST` | Query or upload diagnostic laboratory reports |
| `/api/patients/[id]/nfc-token` | `GET` | Generate an encrypted token payload for NFC card programming |
| `/api/blood-requests` | `GET`, `POST`, `PATCH` | Query, initiate, or update emergency blood dispatch requests |
| `/api/stats` | `GET` | Fetch real-time workstation statistics & timeline activity |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

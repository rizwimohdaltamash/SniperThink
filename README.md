<div align="center">

# 🎯 Sniper Think

**AI-powered document analysis platform — upload files, extract insights, and get intelligent text analytics in seconds.**

</div>

---

## 🛠️ Tech Stack

<div align="center">
<table>
<tr>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
  <br><strong>React 19</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
  <br><strong>Vite</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="TailwindCSS" />
  <br><strong>Tailwind</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
  <br><strong>Node.js</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
  <br><strong>Express 5</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=postgres" width="48" height="48" alt="PostgreSQL" />
  <br><strong>NeonDB</strong>
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=redis" width="48" height="48" alt="Redis" />
  <br><strong>Upstash Redis</strong>
</td>
</tr>
</table>

<img src="https://img.shields.io/badge/BullMQ-FF6600?style=for-the-badge&logo=bull&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/Multer-333333?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/pdf--parse-E34F26?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" />

</div>

---

## 🏗️ Architecture

```
sniper-think/
├── frontend/                  # React SPA (Vite + Tailwind)
│   └── src/
│       ├── components/        # Reusable UI — Navbar, Footer, FileUploader, LeadForm
│       ├── sections/          # Page sections — HeroSection, StrategyFlowSection
│       ├── pages/             # Route-level pages — Home
│       ├── data/              # Static data & config
│       ├── hooks/             # Custom React hooks
│       ├── services/          # API service layer (Axios)
│       └── assets/            # Images & static assets
│
├── backend/                   # Express 5 REST API
│   └── src/
│       ├── config/            # Database (NeonDB) & Redis connection setup
│       ├── routes/            # API routes — upload, jobs, interest
│       ├── controllers/       # Request handlers — upload, jobs, interest
│       ├── models/            # Data models — file, job, result, user
│       ├── queues/            # BullMQ queue definitions
│       └── workers/           # Background job processors — fileWorker
│
└── README.md
```

### How It Works

```
┌──────────────┐    HTTP     ┌──────────────────┐     Queue     ┌────────────────┐
│              │ ──────────► │                  │ ────────────► │                │
│   React UI   │             │  Express Server  │    BullMQ     │  File Worker   │
│   (Vite)     │ ◄────────── │  (REST API)      │ ◄──────────── │  (pdf-parse)   │
│              │    JSON     │                  │   Progress    │                │
└──────────────┘             └────────┬─────────┘               └───────┬────────┘
                                      │                                 │
                                      │  Postgres                       │  Results
                                      ▼                                 ▼
                              ┌──────────────┐                  ┌──────────────┐
                              │   NeonDB     │ ◄──────────────  │   NeonDB     │
                              │  (metadata)  │    Store          │  (results)   │
                              └──────────────┘                  └──────────────┘
                                      ▲
                                      │  Job Queue
                              ┌──────────────┐
                              │   Upstash    │
                              │   Redis      │
                              └──────────────┘
```

1. **User uploads** a PDF/text file via the React frontend
2. **Express API** receives the file (Multer), stores metadata in NeonDB, and pushes a job to **BullMQ**
3. **File Worker** picks up the job, extracts text with **pdf-parse**, runs text analytics (word count, paragraph detection, keyword extraction)
4. **Results** (word count, paragraph count, top keywords) are saved back to NeonDB
5. **Frontend polls** the job status and displays the analysis results

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| npm | v9+ |
| Redis | Upstash (cloud) or local |
| PostgreSQL | NeonDB (cloud) or local |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/sniper-think.git
cd sniper-think
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# ─── Server ──────────────────────────────
PORT=5000

# ─── NeonDB (PostgreSQL) ────────────────
DATABASE_URL=your_neondb_connection_string

# ─── Redis (Upstash) ────────────────────
REDIS_URL=your_upstash_redis_url

# ─── File Uploads ───────────────────────
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

Start the backend server:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The API will be running at **`http://localhost:5000`**

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be running at **`http://localhost:5173`**

### 4️⃣ Build for Production

```bash
cd frontend
npm run build
```

The production-ready files will be in `frontend/dist/`.

## 📡 API Documentation

### 1. `POST /api/upload`
Uploads a file for text extraction and analytics processing.
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** `file` (File), `name` (String, optional), `email` (String, optional)
- **Response:**
  ```json
  {
    "success": true,
    "message": "File accepted for processing",
    "data": {
      "fileId": 1,
      "jobId": 1,
      "bullJobId": "12",
      "status": "pending"
    },
    "jobId": 1
  }
  ```

### 2. `GET /api/jobs/:id`
Check the progress and retrieve the analytics results of a specific processing job.
- **Response (Completed):**
  ```json
  {
    "success": true,
    "data": {
      "jobId": "1",
      "state": "completed",
      "progress": 100,
      "wordCount": 1250,
      "paragraphCount": 15,
      "topKeywords": ["analysis", "data", "report", "growth", "results"]
    }
  }
  ```

### 3. `GET /api/jobs?status=all&page=1&limit=20`
Fetch a paginated list of all uploaded jobs and their current statuses.

### 4. `POST /api/interest`
Submit lead form data from the marketing flow.
- **Body:** `name`, `email`, `selectedStep`

---

## 🗄️ Database Schema (NeonDB / PostgreSQL)

The system relies on a relational Postgres database consisting of 4 tables:

1. **`Users`**: Stores uploader contact information.
   - `id` (PK), `name` (VARCHAR), `email` (UNIQUE VARCHAR)
2. **`Files`**: Tracks uploaded documents.
   - `id` (PK), `user_id` (FK -> Users), `file_path` (TEXT), `uploaded_at` (TIMESTAMP)
3. **`Jobs`**: Tracks BullMQ background processing state.
   - `id` (PK), `file_id` (FK -> Files), `status` (VARCHAR: pending/completed/failed), `progress` (INTEGER), `created_at` (TIMESTAMP)
4. **`Results`**: Stores the output of the text analytics pipeline.
   - `id` (PK), `job_id` (FK -> Jobs), `word_count` (INTEGER), `paragraph_count` (INTEGER), `keywords` (JSONB)

---

## ⚙️ Worker & Queue Configuration (BullMQ)

Background processing is powered by **BullMQ** running over an **Upstash Redis** instance.

### Queue Configuration (`src/queues/fileQueue.js`)
- **Name:** `file-processing`
- **Options:** 
  - Standard Priority `2`, PDF Priority `1`
  - Attempts: 3 (with exponential backoff)
  - Retention: Keeps completed jobs for 1 hour (max 100), failed jobs for 24 hours.

### Worker Pipeline (`src/workers/fileWorker.js`)
- **Concurrency:** Processes up to `3` files simultaneously.
- **Rate Limiting:** Maximum of `10` jobs processed per minute to prevent CPU overload during heavy PDF parsing.
- **Processing Steps:**
  1. Validates and reads the file from local disk.
  2. Extracts text directly (for `.txt`) or uses `pdf-parse` (for `.pdf`).
  3. Calculates exact Word Count and intelligent Paragraph Count via formatting heuristics.
  4. Filters common stop words and extracts the Top 5 Keywords based on frequency.
  5. Pushes progress updates (10% → 60% → 80% → 100%) back to the database.
  6. Persists final analytics payload to the `Results` table.

---

## 📝 License

This project is licensed under the ISC License.

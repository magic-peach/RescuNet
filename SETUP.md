# RescuNet Setup Guide

This guide provides step-by-step instructions for setting up and running the RescuNet project on **macOS** and **Windows**.

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download](https://nodejs.org/) (v18 or higher recommended)
- **Python**: [Download](https://www.python.org/) (v3.10 or higher recommended)
- **MongoDB**: [Download](https://www.mongodb.com/try/download/community) (Running locally on default port 27017)
- **Git**: [Download](https://git-scm.com/)

---

## 🛠️ Installation & Setup

### 1. Database Setup

Ensure MongoDB is running locally.

- **macOS (via Homebrew)**:
  ```bash
  brew services start mongodb-community
  ```
- **Windows**:
  Start the MongoDB service through the "Services" app or run `mongod` in a terminal.

---

### 2. Backend (Node.js Server)

**Terminal/Command Prompt:**

```bash
cd web/backend
npm install
```

**Environment Configuration:**
Create a `.env` file in `web/backend/` (or check if one exists) with:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/RescuNetDb
JWT_SECRET=your_jwt_secret_here
DEMO_MODE=true
```

---

### 3. Frontend (React/Vite Web Portal)

**Terminal/Command Prompt:**

```bash
cd web/client
npm install
```

---

### 4. Analysis Server (Python Flask)

**macOS/Linux:**

```bash
cd web/flask_server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m spacy download en_core_web_lg
```

**Windows (PowerShell):**

```powershell
cd web/flask_server
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_lg
```

---

## 🚀 Running the Application

To run the full system, you need to start three separate terminals:

### 📡 Terminal 1: Backend

```bash
cd web/backend
npm run server
```

_Runs on: `http://localhost:8000`_

### 🤖 Terminal 2: Analysis Hub (Flask)

**macOS:**

```bash
cd web/flask_server && source venv/bin/activate && python3 main.py
```

**Windows:**

```powershell
cd web/flask_server && .\venv\Scripts\activate && python main.py
```

_Runs on: `http://localhost:5000`_

### 💻 Terminal 3: Web Portal (Frontend)

```bash
cd web/client
npm run dev
```

_Runs on: `http://localhost:5173`_

---

## 📦 Ports Cheat Sheet

| Component        | Port    | Description                    |
| :--------------- | :------ | :----------------------------- |
| **Backend**      | `8000`  | Node.js API & Socket.io Alerts |
| **Flask Server** | `5000`  | AI/NLP analysis & Search       |
| **Frontend**     | `5173`  | React Dashboard (Vite)         |
| **MongoDB**      | `27017` | Local Database                 |

---

## 💡 Troubleshooting

- **Demo Mode**: Both servers have `DEMO_MODE=true` set in their respective `.env` files. This allows running the app without external API keys (Twilio, Groq, etc.).
- **Node Modules**: If you encounter errors, try deleting `node_modules` and running `npm install` again.
- **Python Path**: If `python3` doesn't work on Windows, use `python`.

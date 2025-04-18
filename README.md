# Compare LLM’s

A full‑stack “Compare LLM’s” project that lets you send the same prompt to multiple large‑language‑model APIs (OpenAI, Anthropic, X.ai), see their outputs side‑by‑side, track usage & cost, view time‑series analytics, and browse your request history.

---

## 🚀 Features

- **Backend (Node.js + Express)**
  - **`POST /generate`**  
    Send a prompt + model list + temperature + max_tokens → fan‑out concurrent calls to OpenAI, Anthropic, X.ai → return each model’s response text, usage, cost, duration, into a single JSON envelope.
  - **`GET /requests`** (paged)  
    List past requests (UUID, timestamp, prompt, models, parameters).
  - **`GET /request/:id`**  
    Fetch one historic request’s full results.
  - **`GET /timeseries`**  
    Returns time‑series of per‑model cost & latency (breakdown by request timestamp) for visualization.
  - **Prisma + MongoDB Atlas**  
    Persist every API‑call record and its usage/cost/latency.  

- **Frontend (React + Tailwind + Recharts)**
  - **TopBar** with logo & app title.
  - **LeftBar**  
    - Resizable history panel  
    - Paginated list of past requests  
    - Refresh button  
    - Click → loads that request into main view
  - **ControlPanel**  
    - Model checkboxes (`open_ai`, `anthropic`, `x_ai`)  
    - Temperature slider (0–1)  
    - Max‑tokens input  
  - **PromptArea**  
    - Prompt textarea & “Generate” button  
    - Shows individual loaders while awaiting each model  
  - **PromptResponse**  
    - Side‑by‑side panels rendering each model’s Markdown output  
    - Synchronized scrolling
  - **RightBar (Analytics)**  
    - **Time‑series** line‑charts: cost & latency over time  
    - **Bar‑charts**: cost & latency comparison for current request  
    - **Cards**: detailed usage / cost / latency per model  

---

## 📦 Prerequisites

- [Docker](https://www.docker.com/) installed & running  
- A MongoDB Atlas cluster (or any MongoDB URI you prefer)  
- API keys for:
  - OpenAI
  - Anthropic
  - X.ai (X.ai / Grok)

---

## 🔧 Setup & Run

1. **Clone this repo**  
   ```bash
   git clone <your‑repo‑url>
   cd ai-comp
   ```
2. **Create .env for the backend**  
   in the `backend/.env` add:
   ```env
    # MongoDB Atlas connection URL (include database name)
    DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/mydb?retryWrites=true&w=majority"

    # Express port (optional, defaults to 3000)
    PORT=3000

    # Your LLM API keys
    XAI_API_KEY=<your_xai_key>
    ANTHROPIC_API_KEY=<your_anthropic_key>
    OPENAI_API_KEY=<your_openai_key>

3. **Run everything with Docker Compose**  
   ```bash
   docker-compose up --build
   ```
   - Backend available at http://localhost:3000
   - Prisma Studio at http://localhost:5555
   - Frontend at http://localhost:3001

4. **Browse & compare**
   - Navigate to http://localhost:3001
   - Enter a prompt, select models, click Generate
   - View side‑by‑side outputs, usage, cost, latency
   - Explore history in the left panel, analytics in the right panel

## 📂 Project Structure
```txt
ai-comp/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── .env
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── App.js
│       └── index.js
└── docker-compose.yml
```
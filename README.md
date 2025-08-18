<div align="center">
	<h1>📧 Cold Email Generator</h1>
	<p><strong>Generate personalized B2B cold outreach emails by scraping a careers page, extracting roles, matching skills to your portfolio, and drafting emails with a Groq LLM.</strong></p>
</div>

## 1. What This Does
Given a public job / careers page URL, the app:
1. Downloads & cleans the page text.
2. Uses an LLM (Groq via LangChain) to extract structured job postings (role, experience, skills, description) as JSON.
3. Loads & indexes your portfolio (tech stack → project links) into a Chroma vector store.
4. For each job, retrieves the most relevant portfolio links based on required skills.
5. Generates a concise, value‑focused cold email draft (as Mohan from AtliQ) referencing those links.

## 2. Architecture Overview
```
[Streamlit UI]
		│
		├─► WebBaseLoader (LangChain) → Raw Page Text
		│        │
		│        └─► clean_text() → Sanitized Text
		│
		├─► Chain.extract_jobs()  (Groq LLM + JSON parse)
		│              │
		│              └─► List[Job]
		│
		├─► Portfolio (CSV → Chroma PersistentClient)
		│        │                │
		│        └─► query_links(skills) → Relevant link metadatas
		│
		└─► Chain.write_mail(job, links) → Draft Email → Display in UI
```

## 3. Tech Stack
| Area | Library |
|------|---------|
| UI | Streamlit |
| LLM | Groq (ChatGroq via langchain-groq) |
| Orchestration | LangChain core / community |
| Vector Store | Chroma (persistent local) |
| Data | pandas |
| Env Config | python-dotenv |

## 4. File Structure
```
app/
	resource/
		main.py           # Streamlit entry point
		chains.py         # LLM chains: extract jobs & write email
		portfolio.py      # Portfolio ingestion + Chroma indexing/query
		utils.py          # Text cleaning helpers
my_portfolio.csv      # (expected at app/resource/) portfolio mapping
sample potfolio.csv   # Example CSV (typo retained if present)
requirements.txt
README.md
```

## 5. Portfolio CSV Format
Expected columns (example):
```
Techstack,Links
"Experience in Python, FastAPI, ML",https://example.com/project-ml
"React, TypeScript, UI performance",https://example.com/project-ui
```
Each row: a textual stack description + a URL to showcase work.

## 6. Environment Variables
Create an `.env` file (DO NOT COMMIT real keys):
```
GROQ_API_KEY=your_groq_api_key_here
```
Optional: adjust the Groq model inside `chains.py` (`model_name="llama-3.1-70b-versatile"`).

## 7. Installation & Run
```powershell
# (Optional) Create venv
python -m venv .venv
./.venv/Scripts/Activate.ps1

# Install deps
pip install -r requirements.txt

# Add your .env file under app/resource or project root.

# Launch app
streamlit run app/resource/main.py
```

## 8. Usage Flow
1. Open the UI.
2. Enter a jobs / careers page URL.
3. Click Submit.
4. Wait for extraction; each job's email draft appears as code block.
5. Manually review & refine before sending (avoid raw automated sends).

## 9. Key Components
### chains.Chain
* `extract_jobs(cleaned_text)` → JSON list of jobs via prompt + JSONOutputParser.
* `write_mail(job, links)` → Cold email draft referencing dynamic `link_list`.

### portfolio.Portfolio
* Loads CSV once; lazily populates Chroma collection (persistent folder `vectorstore`).
* `query_links(skills)` fetches top 2 relevant metadata link sets for each job.

### utils.clean_text
* Strips HTML, URLs, special chars, repeated whitespace.

## 10. Customization Ideas
| Goal | How |
|------|-----|
| Better job parsing | Add fallback regex grouping or multi-pass chunking before LLM |
| Portfolio relevance | Add embeddings for skill phrases instead of raw text query |
| Email variants | Generate multiple tones (formal / concise / technical) |
| Rate limiting | Wrap LLM calls with retry & exponential backoff |
| Multi-provider | Abstract LLM class to swap Groq with OpenAI / local models |

## 11. Troubleshooting
| Issue | Fix |
|-------|-----|
| Push blocked (secret) | Remove key from notebook/commits; rotate key; use `.env` |
| JSON parse error | Page too large → pre-truncate or segment before prompt |
| Empty jobs list | Page structure not text-rich; disable aggressive cleaning |
| Chroma duplicate items | Add deterministic IDs from hash of Techstack text |
| Slow first load | Large model or network latency → reduce model size |

## 12. Security & Ethics
* Never hard‑code API keys in source / notebooks.
* Respect site robots.txt & terms when scraping.
* Manual human review before outreach to avoid spam.

## 13. Roadmap (Suggested)
1. Add embedding-based similarity for links.
2. Add caching layer for extracted jobs per URL (hash-based).
3. Provide CSV export of generated emails.
4. Add simple tests for `clean_text` and portfolio ingestion.
5. Add pre-commit secret scanning hook.

## 14. License
Provide your chosen license here (e.g., MIT). Clarify any upstream inspiration attribution.

---
Happy building!

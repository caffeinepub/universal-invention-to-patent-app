# Specification

## Summary
**Goal:** Build PatentForge AI — a full-stack invention-to-patent workspace app with a professional navy/gold theme, AI-assisted analysis (rule-based), voice input, and structured patent authoring tools.

**Planned changes:**

### Theme & Layout
- Deep navy/slate backgrounds with gold/amber accents, clean sans-serif typography applied consistently across all pages
- Structured dashboard layout with main navigation linking to Dashboard, Portfolio, and Resources

### Dashboard
- Lists all invention projects as cards showing title, status badge (Draft / In Review / Ready to Submit), and creation date
- "New Invention" button to start a new project; clicking a card opens its workspace

### Invention Workspace
- Fields: Invention Title, Problem Being Solved, Proposed Solution, Key Features, Claims
- Auto-save to backend after 2 seconds of inactivity with a save confirmation indicator

### Voice Input
- Microphone button next to each major text field using the browser Web Speech API
- Pulsing visual indicator when voice recognition is active; click again to stop

### Scientific Terminology Assistant Panel
- Searchable glossary with 30+ common scientific/engineering terms
- Each term shows its definition and recommended patent phrasing in a side panel or tooltip

### Legal Terminology Formatter Panel
- Clickable list of 20+ standard patent legal phrases (e.g., "wherein", "comprising", "at least one")
- Single-click inserts the phrase into the claims field; formatted preview of the claims section displayed

### AI Collaboration Panel (rule-based)
- "Analyze Idea" button triggers deterministic frontend/backend analysis
- Outputs: novelty checklist (5+ questions), suggested improvements list, readiness score (0–100%)
- Analysis results saved to backend and reloaded on project reopen

### Learning Resources Page
- Accessible from main navigation; 4+ categories (patent process, patent types, prior art search, working with attorneys)
- Expandable category cards showing individual resource entries with title and summary

### File Import / Export
- Export any project as a structured .txt file with all fields labeled
- Import a previously exported .txt file to pre-populate a new project's fields

### Patent Lawyer Export Package
- "Generate Lawyer Package" button on each project
- User writes a custom cover note; downloads a formatted .txt package with title, description, claims, AI analysis, and cover note

### Portfolio Page
- Groups all projects by status with summary stats: total inventions, per-status counts, most recently updated project
- Clicking a project card navigates to its workspace

### Backend (Motoko)
- Single actor in `backend/main.mo` with a stable TrieMap storing invention projects
- Project record fields: id, title, ownerId, problem, solution, features, claims, status, aiAnalysis (noveltyChecklist, suggestions, readinessScore), createdAt, updatedAt (Int nanoseconds)
- CRUD operations: createProject, updateProject, getProject, getAllProjects, deleteProject

### Logo
- PatentForge AI logo (gold lightbulb + gear + scroll icon) placed in `frontend/public/assets/generated/` and displayed in the app header

**User-visible outcome:** Users can create and manage invention projects through a structured workspace with voice dictation, scientific and legal terminology tools, rule-based AI analysis, a resource library, and the ability to export polished patent packages for a patent attorney — all within a professional navy/gold-themed interface.

# Career Co-Pilot AI Agent Instructions

## Project Overview
AI-powered career guidance web application that recommends career paths based on user-inputted skills. Frontend collects skills via text input, backend matches against predefined rules to suggest careers and learning roadmaps.

## Architecture
- **Frontend**: React (Vite) - User interface for skill input and displaying recommendations
- **Backend**: Python Flask - API server with career matching logic
- **Communication**: HTTP POST to `/recommend` endpoint with JSON `{"skills": ["python", "ml"]}`

## Key Components
- `backend/app.py`: Flask app with hardcoded `CARRER_RULES` list defining skill-career mappings
- `frontend/src/App.jsx`: Main React component handling user input and API calls
- Career matching: Exact match required - all rule skills must be present in user skills (case-sensitive)

## Developer Workflows
- **Run Backend**: `cd backend && python app.py` (starts on localhost:5000)
- **Run Frontend**: `cd frontend && npm run dev` (starts dev server)
- **Build Frontend**: `cd frontend && npm run build`
- **Lint Frontend**: `cd frontend && npm run lint`

## Code Patterns
- **Adding Career Rules**: Append to `CARRER_RULES` in `backend/app.py` with format:
  ```python
  {
      "skills": ["skill1", "skill2"],
      "career": "Career Name",
      "roadmap": ["Step 1", "Step 2"]
  }
  ```
- **Frontend API Integration**: Use `fetch()` in `handleSubmit` to POST to backend:
  ```jsx
  const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({skills: skills.split(',').map(s => s.trim())})
  });
  const data = await response.json();
  ```
- **Skill Input**: Comma-separated string converted to array, trimmed
- **Default Response**: "Software Engineer" with basic roadmap if no rule matches

## Conventions
- Skills stored as lowercase strings in rules
- API responses include `career` (string) and `roadmap` (string array)
- No backend validation beyond basic checks; frontend handles user input parsing
- Debug mode enabled in Flask for development

## Common Tasks
- **Integrate Frontend-Backend**: Update `App.jsx` `handleSubmit` to call backend API and display results
- **Add New Careers**: Extend `CARRER_RULES` with new skill combinations
- **Improve Matching**: Modify logic in `/recommend` route for partial matches or scoring</content>
<parameter name="filePath">d:\AB_Projects\career-co-pilot - practice\.github\copilot-instructions.md
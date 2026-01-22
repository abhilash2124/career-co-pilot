import { useState } from "react";
import "./App.css";


function App() {
  const [skills, setSkills] = useState("");

  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Handle input change
  const handleChange = (e) => {
    setSkills(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    //Client-side validation
    if (!skills.trim()) {
      setError("Please enter at least one skill");
      setCareer("");
      setRoadmap([]);
      return;
    }
    setError("");
    setLoading(true);

    //Normalize skills input
    const skillsArray = skills
      .split(",")
      .map(skill => skill.trim().toLowerCase());

    //Call backend API
    try {
      const response = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ skills: skillsArray })
      });

      const data = await response.json();
      setCareer(data.career);
      setRoadmap(data.roadmap);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setLoading(false);
    }
    setSkills("");
  };


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Career Co-Pilot</h1>

      <input
        type="text"
        placeholder="Enter skills (comma separated)"
        value={skills}
        onChange={handleChange}
        style={{ padding: "8px", width: "300px" }}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading} >
        {loading ? "Loading..." : "Get Career Suggestion"}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Recommended Roadmap:</h2>
      <ul>
        {roadmap.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>Suggested Career:</h2>
      <p><strong>{career}</strong></p>

    </div>
  );
}

export default App;

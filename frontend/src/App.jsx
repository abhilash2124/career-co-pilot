import { useState } from "react";
import "./App.css";


function App() {
  const [skills, setSkills] = useState("");

  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {

    setSkills(e.target.value);
  };

  const handleSubmit = async () => {
    if (!skills.trim()) {
      setError("Please enter at least one skill");
      setCareer("");
      setRoadmap([]);
      return;
    }
    setError("");
    const skillsArray = skills
      .split(",")
      .map(skill => skill.trim().toLowerCase());

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          skills: skillsArray
        })
      });

      const data = await response.json();
      setCareer(data.career);
      setRoadmap(data.roadmap);
    } catch (error) {
      console.error("Error connecting to backend:", error);
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

      <button onClick={handleSubmit}>
        Get Career Suggestion
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>You entered: {skills}</p>
      <p>Skills array: {JSON.stringify(
        skills.split(",").map((skill) => skill.trim()))}</p>
      <h2>Recommended Roadmap:</h2>
      <ul>
        {roadmap.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>Suggested Career:</h2>
      <p>{career}</p>

    </div>
  );
}

export default App;

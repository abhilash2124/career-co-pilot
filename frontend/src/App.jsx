import { useState } from "react";
import "./App.css";


function App() {
  const [skills, setSkills] = useState("");

  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);


  const handleChange = (e) => {
    setSkills(e.target.value);
  };

  // const handleSubmit = () => {
  //   const skillsArray = skills
  //     .split(",")
  //     .map((skill) => skill.trim())

  //   console.log("Submitted skills:", skillsArray);
  // };
  const handleSubmit = async () => {
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

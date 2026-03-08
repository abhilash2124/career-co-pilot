import { useState } from "react";

import { useEffect } from "react";
import { apiRequest } from "../utils/api";

function Home() {


    const [skills, setSkills] = useState("");

    const [career, setCareer] = useState("");
    const [roadmap, setRoadmap] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);


    const fetchHistory = async () => {
        try {
            const data = await apiRequest(`/history?page=${page}`);
            setHistory(data?.history || []);
        } catch (error) {
            console.error("Error fetching history:", error);
            setHistory([]);
        }
    };


    // Handle input change
    const handleChange = (e) => {
        setSkills(e.target.value);
    };

    useEffect(() => {
        fetchHistory();
    }, [page]);




    async function handleDelete(id) {
        try {

            await apiRequest(`/history/${id}`, {
                method: "DELETE"
            });

            // refresh history
            fetchHistory();
        } catch (error) {
            console.error("Error deleting history item:", error);
        }
    }

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

        const skillsArray = skills
            .split(",")
            .map(skill => skill.trim().toLowerCase())
            .filter(skill => skill.length > 0);  // Remove empty strings



        try {
            const data = await apiRequest(`/recommend`, {
                method: "POST",
                body: JSON.stringify({ skills: skillsArray })
            });
            console.log("Running.....");

            setCareer(data.career);
            setRoadmap(data.roadmap);

            await fetchHistory(); // refresh history after new recommendation

        } catch (error) {
            console.error("Error connecting to backend:", error);
            setError("Failed to connect to server. Please try again.");
            setCareer("");
            setRoadmap([]);
        }
        finally {
            setLoading(false);
        }
        setSkills("");

    };

    return (
        <div className="container">
            <h1>Career Co-Pilot 🚀</h1>

            <div className="card">
                <h2>🔎 Find Your Career</h2>

                <input
                    type="text"
                    placeholder="Enter skills (comma separated), e.g. python,pandas"
                    value={skills}
                    onChange={handleChange}
                />

                <br /><br />

                <button onClick={handleSubmit} disabled={loading} >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {loading && <div className="spinner"></div>}
                        {loading ? "Analyzing..." : "Get Career Suggestion"}
                    </div>
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>

            <div className="card">
                <h2>📊 Recommendation</h2>

                {career && (
                    <>
                        <h2>Suggested Career:</h2>
                        <p><strong>{career}</strong></p>

                        <h2>Recommended Roadmap:</h2>
                        <ul>
                            {roadmap.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}

                {!career && !loading && <p>No recommendation yet</p>}
            </div>

            <div className="card">
                <h2> 📜 Search History:</h2>

                {history.length === 0 ? (
                    <p>No searches yet. Enter your skills to get career suggestions.</p>
                ) : (
                    <ul >
                        {history.map((item, index) => (
                            <li key={item.id ?? index} className="history-item" >

                                {/* {item.skills} ={">"} {item.career} */}

                                <span>
                                    <strong>{item.skills}</strong> → {item.career}
                                </span>

                                <button
                                    className="delete"
                                    onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={() => setPage(page - 1)} disabled={page === 1 || loading}>
                Previous
            </button>

            <button onClick={() => setPage(page + 1)} disabled={loading}>
                Next
            </button>

        </div>
    )
}

export default Home;
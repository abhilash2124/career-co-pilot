import { useState } from "react";

import { useEffect } from "react";

function Home() {

    const [skills, setSkills] = useState("");

    const [career, setCareer] = useState("");
    const [roadmap, setRoadmap] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);

    // Generate or retrieve session ID on app load
    let sessionId = localStorage.getItem("sessionId");
    useEffect(() => {

        if (!sessionId) {
            sessionId = crypto.randomUUID();   // generate UUIDs in browsers
            localStorage.setItem("sessionId", sessionId);
        }
    }, []);

    // ✅ Standalone fetchHistory function
    const fetchHistory = async () => {

        const response = await fetch(
            `${API_URL}/history?page=${page}`,
            {
                headers: { "session-id": sessionId }
            }
        );

        const data = await response.json();
        setHistory(data.history);
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
            const sessionId = localStorage.getItem("sessionId");

            await fetch(`${API_URL}/history/${id}`, {
                method: "DELETE",
                headers: {
                    "session-id": sessionId
                }
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
            const response = await fetch(`${API_URL}/recommend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "session-id": localStorage.getItem("sessionId")  // Include session ID in headers
                },
                body: JSON.stringify({ skills: skillsArray })
            });
            console.log("Running.....");

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            setCareer(data.career);
            setRoadmap(data.roadmap);
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

        await fetch(`${API_URL}/history`, {
            method: "GET",
            headers: {
                "session-id": sessionId
            }
        })
            .then(res => res.json())
            .then(data => {
                setHistory(data.history);
            });

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

            <h2>Search History:</h2>

            {history.length === 0 ? (
                <p>You have not searched anything till now.</p>
            ) : (
                <ul>
                    {history.map((item, index) => (
                        <li key={item.id ?? index}>
                            {item.skills} ={">"} → {item.career}
                            <button onClick={() => handleDelete(item.id)}>
                                Delete ❌
                            </button>
                        </li>
                    ))}
                </ul>
            )}

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
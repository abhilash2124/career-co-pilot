import { useState } from "react";

import { useEffect } from "react";
import { apiRequest } from "../utils/api";

function Home() {
    // const token = localStorage.getItem("token");

    // useEffect(() => {
    //     if (!token) {
    //         window.location.href = "/login";
    //     }
    // }, []);

    const [skills, setSkills] = useState("");

    const [career, setCareer] = useState("");
    const [roadmap, setRoadmap] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const API_URL = import.meta.env.VITE_API_URL;
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);




    // function handleLogout() {
    //     localStorage.removeItem("token");
    //     window.location.href = "/login";
    // }

    // ✅ Standalone fetchHistory function
    // const fetchHistory = async () => {
    //     try {
    //         const response = await fetch(
    //             `${API_URL}/history?page=${page}`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //                 }
    //             }
    //         );
    //         if (response.status === 401) {
    //             localStorage.removeItem("token");
    //             window.location.href = "/login";
    //             return;
    //         }

    //         const data = await response.json();
    //         setHistory(data.history || []);

    //     } catch (error) {
    //         console.error("Error fetching history:", error);
    //         setHistory([]);
    //     }
    // };
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
    // async function handleDelete(id) {
    //     try {

    //         await fetch(`${API_URL}/history/${id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });

    //         // refresh history
    //         fetchHistory();
    //     } catch (error) {
    //         console.error("Error deleting history item:", error);
    //     }
    // }

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

            // const data = await response.json();
            // setCareer(data.career);
            // setRoadmap(data.roadmap);
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

        // await fetch(`${API_URL}/history`, {
        //     method: "GET",
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`
        //     }
        // })
        //     .then(res => {
        //         if (res.status === 401) {
        //             localStorage.removeItem("token");
        //             window.location.href = "/login";
        //             return;
        //         }
        //         return res.json();
        //     })
        //     .then(data => {
        //         if (data) setHistory(data.history);
        //     });

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
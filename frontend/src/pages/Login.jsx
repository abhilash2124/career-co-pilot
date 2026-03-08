import { useState } from "react";

function Login() {

    const API_URL = import.meta.env.VITE_API_URL;

    //user login states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //registration states
    const [name, setName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [logLoading, setLogLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);

    // Handle login and registration (for future implementation)
    const handleLogin = async () => {

        setLogLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            setLogLoading(false);
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "/";  // abab Redirect to home page after login ab
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }

        setLogLoading(false);
    };

    async function handleRegister() {
        setRegLoading(true);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email: regEmail, password: regPassword })
            });
            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! please login.");
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again.");
        }

        setRegLoading(false);
    }


    return (
        <div className="container">

            <div className="card">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin} disabled={logLoading}>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        {logLoading && <div className="spinner"></div>}
                        {logLoading ? "Logging in..." : "Login"}
                    </div>
                </button>

            </div>

            <div className="card">
                {/* ab DONE */}
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                />

                <button onClick={handleRegister} disabled={regLoading}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        {regLoading && <div className="spinner"></div>}
                        {regLoading ? "Registering..." : "Register"}
                    </div>
                </button>
            </div>
        </div>


    )
}

export default Login;
import { Navigate, Link } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }

    if (!token) {
        return (
            <div className="container">
                <div className="card">
                    <h2>🔒 Login Required</h2>
                    <p>Please login to access Career Co-Pilot.</p>

                     <Link to="/login">
                        <button>Go to Login</button>
                    </Link>
                </div>
            </div>
        );
    }

    return children;
    
}

export default ProtectedRoute;


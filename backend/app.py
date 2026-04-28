"""
Career Co-Pilot Backend
Handles career recommendation based on user skills
"""
from flask import Flask, request, jsonify
from routes.career_routes import career_bp
from flask_cors import CORS
import os
from models.user_model import save_search_history
from routes.auth_routes import auth_bp


from database import get_db_connection

# Initialize Flask app
app = Flask(__name__)
# Enable CORS
#connecting to frontend resolve problem of CORS(Ab)
CORS(app)

# Register Blueprint
app.register_blueprint(career_bp)
# Register auth blueprint
app.register_blueprint(auth_bp)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Career Co-Pilot Backend Running"
    })
    
    
@app.route("/test-db")
def test_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        result = cur.fetchone()
        conn.close()
        return {"status": "DB Connected", "result": result}
    except Exception as e:
        return {"error": str(e)}

# Run the app   
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

from flask import Flask, request, jsonify
from flask import Flask, request, jsonify
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Career Co-Pilot Backend Running"
    })

CARRER_RULES = [
    {
        "skills": ["python", "ml"],
        "career": "Data Sceitist",
        "roadmap": ["Statistics", "Pandas", "Scikit-learn"] 
    },
    {
        "skills": ["html", "css", "javascript"],
        "career": "Frontend Developer",
        "roadmap": ["React", "Git", "Responsive Design"] 
    },
    {
    "skills": ["java", "spring"],
    "career": "Backend Developer",
    "roadmap": ["Java Core", "Spring Boot", "REST APIs"]
    }
]

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    
    if not data:
        return jsonify({
            "error" : "No data provided"
        }),400
        
    skills = data.get("skills", [])
    
    if not skills or not isinstance(skills, list):
        return jsonify({
            "error" : "Skills must be provided as a list"
        }), 400
    
    for rule in CARRER_RULES:
        if all(skill in skills for skill in rule["skills"]):
            return jsonify({
                "career": rule["career"],
                "roadmap": rule["roadmap"]
            })
            
    # return jsonify({
    #     "career": "Software Engineer",
    #     "roadmap": ["DSA Basic", "GIt", "Problem Solving"]
    # })
    return jsonify({
    "career": "No suitable career found",
    "roadmap": ["Try adding more relevant skills"]
})


# if __name__ == "__main__":
#     app.run(debug=True)
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

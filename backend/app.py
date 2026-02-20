"""
Career Co-Pilot Backend
Handles career recommendation based on user skills
"""



from flask import Flask, request, jsonify
from routes.career_routes import career_bp
from flask_cors import CORS
import os
from models.user_model import save_search_history


# Initialize Flask app
app = Flask(__name__)
# Enable CORS
#connecting to frontend resolve problem of CORS(Ab)
CORS(app)

# Register Blueprint
app.register_blueprint(career_bp)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Career Co-Pilot Backend Running"
    })

 
# Run the app   
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

    







 
  
# """
# Career Co-Pilot Backend
# Handles career recommendation based on user skills
# """



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import sqlite3

# # Initialize Flask app
# app = Flask(__name__)
# # Enable CORS
# #connecting to frontend resolve problem of CORS(Ab)
# CORS(app)


# # conn = sqlite3.connect("career.db")
# # cursor = conn.cursor()
# # cursor.execute("SELECT * FROM career_rules")
# # print(cursor.fetchall())

# def get_career_from_db(skills_list):
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#     DB_PATH = os.path.join(BASE_DIR, "career.db")

#     conn = sqlite3.connect(DB_PATH)
#     cursor = conn.cursor()

#     cursor.execute("SELECT skills, career, roadmap FROM career_rules")
#     rows = cursor.fetchall()

#     # ✅ Convert user skills to lowercase
#     skills_list_lower = [skill.lower().strip() for skill in skills_list]

#     for row in rows:
#         db_skills = [s.strip() for s in row[0].lower().split(",")]
#         career = row[1]
#         roadmap = row[2]

#         # ✅ Now both are lowercase
#         if all(skill in skills_list_lower for skill in db_skills):
#             conn.close()
#             #return career, [r.strip() for r in roadmap.split(",")]
#             roadmap_items = [item.strip() for item in roadmap.split(",")]
#             return career, roadmap_items

#     conn.close()
#     return "No suitable career found", ["Try adding more relevant skills"]
# # def get_career_from_db(skills_list):
# #     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# #     DB_PATH = os.path.join(BASE_DIR, "career.db")

# #     conn = sqlite3.connect(DB_PATH)
# #     cursor = conn.cursor()

# #     cursor.execute("SELECT skills, career, roadmap FROM career_rules")
# #     rows = cursor.fetchall()

# #     for row in rows:
# #         db_skills = row[0].lower().split(", ")
# #         career = row[1]
# #         roadmap = row[2]

# #         # Check if all required skills are inside user input
# #         if all(skill in skills_list for skill in db_skills):
# #             conn.close()
# #             return career, roadmap.split(", ")

# #     conn.close()
# #     return "No suitable career found", ["Try adding more relevant skills"]



# # Health check endpoint
# #root route
# #when we hit the root route it will return a json response with a message
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({
#         "message": "Career Co-Pilot Backend Running"
#     })

# # Career recommendation endpoint
# # @app.route("/recommend", methods=["POST"])
# # def recommend():
# #     data = request.json
# #     skills = data.get("skills", [])

# #     career, roadmap = get_career_from_db(skills)

# #     return jsonify({
# #         "career": career,
# #         "roadmap": roadmap
# #     })

# @app.route("/recommend", methods=["POST"])
# def recommend():
#     try:
#         data = request.json
        
#         if not data:
#             return jsonify({"error": "No data provided"}), 400
        
#         skills = data.get("skills", [])
        
#         if not skills or not isinstance(skills, list):
#             return jsonify({"error": "Skills must be a non-empty list"}), 400

#         career, roadmap = get_career_from_db(skills)

#         return jsonify({
#             "career": career,
#             "roadmap": roadmap
#         })
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "Internal server error"}), 500

# # # Career recommendation endpoint
# # @app.route("/recommend", methods=["POST"])
# # def recommend():
# #     # Get skills from request
# #     request_data = request.get_json()
    
# #     # Validate input
# #     if not request_data:
# #         return jsonify({
# #             "error" : "No request_data provided"
# #         }),400
     
# #     user_skills = request_data.get("user_skills", [])
    
# #     # Validate user_skills
# #     if not user_skills or not isinstance(user_skills, list):
# #         return jsonify({
# #             "error" : "skills must be provided as a list"
# #         }), 400
    
# #     # Simple rule-based recommendation
# #     for rule in CARRER_RULES:
# #         if all(skill in user_skills for skill in rule["skills"]):
# #             return jsonify({
# #                 "career": rule["career"],
# #                 "roadmap": rule["roadmap"]
# #             })
            
# #     # return jsonify({
# #     #     "career": "Software Engineer",
# #     #     "roadmap": ["DSA Basic", "GIt", "Problem Solving"]
# #     # })
    
    
# #     return jsonify({
# #     "career": "No suitable career found",
# #     "roadmap": ["Try adding more relevant skills"]
# # })


# # if __name__ == "__main__":
# #     app.run(debug=True)
 
# # Run the app   
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)

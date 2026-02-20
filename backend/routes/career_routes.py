import os
import sqlite3
from models.user_model import  get_user_history, save_search_history
from flask import Blueprint, request, jsonify
from models.career_model import get_career_from_db
from database import get_db_connection


career_bp = Blueprint("career", __name__)


@career_bp.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No data provided"}), 400

        skills = data.get("skills", [])
        
        session_id = request.headers.get("session-id")
        
        if not session_id:
            print("WARNING: No session_id in headers!")

        if not skills or not isinstance(skills, list):
            return jsonify({"error": "Skills must be a non-empty list"}), 400

        career, roadmap = get_career_from_db(skills)

        if career != "No suitable career found":
            save_search_history(skills, career, session_id)

        return jsonify({
            "career": career,
            "roadmap": roadmap
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
# @career_bp.route("/history", methods=["GET"])
# def get_history():
#     session_id = request.headers.get("session-id")
    
#     if not session_id:
#         return jsonify({"error": "No session ID provided"}), 400
    
#     history = get_user_history(session_id)
#     print("Session ID received:", session_id)
#     return jsonify({"history": history})

@career_bp.route("/history", methods=["GET"])
def history():
    session_id = request.headers.get("session-id")
    
    page = int(request.args.get("page", 1))
    limit = 5
    offset = (page - 1) * limit

    if not session_id:
        return jsonify({"error": "No session ID provided"}), 400

    history_data = get_user_history(session_id, limit, offset)
    return jsonify({
        "history": history_data
    })


@career_bp.route("/history/<int:history_id>", methods=["DELETE"])
def delete_history(history_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "DELETE FROM user_search_history WHERE id = ? AND session_id = ?",
            (history_id, request.headers.get("session-id"))
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({"message": "History entry deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
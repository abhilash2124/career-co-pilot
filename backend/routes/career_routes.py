import os
import sqlite3
from models.user_model import  get_user_history, save_search_history
from flask import Blueprint, request, jsonify
from models.career_model import get_career_from_db
from database import get_db_connection
import utils.decorators as token_decorator


career_bp = Blueprint("career", __name__)


@career_bp.route("/recommend", methods=["POST"])
@token_decorator.token_required
def recommend(user_id):
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        skills = data.get("skills", [])

        if not skills or not isinstance(skills, list):
            return jsonify({"error": "Skills must be a non-empty list"}), 400

        career, roadmap = get_career_from_db(skills)

        if career != "No suitable career found":
            save_search_history(user_id, skills, career)

        return jsonify({
            "career": career,
            "roadmap": roadmap
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    


@career_bp.route("/history", methods=["GET"])
@token_decorator.token_required
def history(user_id):
    page = int(request.args.get("page", 1))
    limit = 5
    offset = (page - 1) * limit

    if not user_id:
        return jsonify({"error": "No user ID provided"}), 400

    history_data = get_user_history(user_id, limit, offset)
    
    return jsonify({
        "history": history_data
    })


@career_bp.route("/history/<int:history_id>", methods=["DELETE"])
@token_decorator.token_required
def delete_history(user_id, history_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "DELETE FROM user_search_history WHERE id = %s AND user_id = %s",
            (history_id, user_id)
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({"message": "History entry deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @career_bp.route('/history')
# @token_decorator.token_required
# def get_history(user_id):
#     history = get_user_history(user_id)
#     return jsonify({"history": history})
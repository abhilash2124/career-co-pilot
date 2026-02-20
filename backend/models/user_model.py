import sqlite3
import os

# from models.career_model import get_db_connection
from database import get_db_connection


def save_search_history(skills_list, career, session_id):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DB_PATH = os.path.join(BASE_DIR, "..", "career.db")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    skills_text = ", ".join(skills_list)

    cursor.execute(
        "INSERT INTO user_search_history (skills, career, session_id) VALUES (?, ?, ?)",
        (skills_text, career, session_id)
    )

    conn.commit()
    conn.close()

# def get_user_history(session_id):
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     cursor.execute(
#         "SELECT skills, career FROM user_search_history WHERE session_id = ?",
#         (session_id,)
#     )
    
#     rows = cursor.fetchall()
#     conn.close()

#     return rows

def get_user_history(session_id, limit=5, offset=0):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DB_PATH = os.path.join(BASE_DIR, "..", "career.db")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, skills, career, timestamp 
        FROM user_search_history 
        WHERE session_id = ? 
        ORDER BY timestamp DESC
        LIMIT ? OFFSET ?
        """,
        (session_id, limit, offset)
    )

    rows = cursor.fetchall()
    conn.close()

    history = []
    for row in rows:
        history.append({
            "id": row[0],
            "skills": row[1],
            "career": row[2],
            "timestamp": row[3]
        })

    return history
    
    



# from datetime import datetime
# from werkzeug.security import generate_password_hash


# class User:
#     def __init__(self, username, email, password, skills=None):
#         self.username = username
#         self.email = email
#         self.password = generate_password_hash(password)
#         self.skills = skills if skills else []
#         self.created_at = datetime.utcnow()

#     def to_dict(self):
#         return {
#             "username": self.username,
#             "email": self.email,
#             "password": self.password,
#             "skills": self.skills,
#             "created_at": self.created_at
#         }


import os
import sqlite3
from database import get_db_connection

# def get_db_connection():
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#     DB_PATH = os.path.join(BASE_DIR, "..", "career.db")
#     DB_PATH = os.path.abspath(DB_PATH)

#     conn = sqlite3.connect(DB_PATH)
#     return conn


def get_career_from_db(skills_list):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT skills, career, roadmap FROM career_rules")
    rows = cursor.fetchall()

    skills_list_lower = [skill.lower().strip() for skill in skills_list]

    for row in rows:
        db_skills = [s.strip() for s in row[0].lower().split(",")]
        career = row[1]
        roadmap = row[2]

        if all(skill in skills_list_lower for skill in db_skills):
            conn.close()
            roadmap_items = [item.strip() for item in roadmap.split(",")]
            return career, roadmap_items

    conn.close()
    return "No suitable career found", ["Try adding more relevant skills"]


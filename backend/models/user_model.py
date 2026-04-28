
# from models.career_model import get_db_connection
from database import get_db_connection


def save_search_history(user_id, skills_list, career):
    # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # DB_PATH = os.path.join(BASE_DIR, "..", "career.db")

    conn = get_db_connection()
    cursor = conn.cursor()

    skills_text = ", ".join(skills_list)

    cursor.execute(
        "INSERT INTO user_search_history (user_id, skills, career) VALUES (%s, %s, %s)",
        (user_id, skills_text, career)
    )

    conn.commit()
    cursor.close()
    conn.close()



def get_user_history(user_id, limit=5, offset=0):
    # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # DB_PATH = os.path.join(BASE_DIR, "..", "career.db")

    # print("Fetching history for user:", user_id)
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, skills, career, timestamp 
        FROM user_search_history 
        WHERE user_id = %s
        ORDER BY timestamp DESC
        LIMIT %s OFFSET %s
        """,
        (user_id, limit, offset)
    )

    rows = cursor.fetchall()
    
    cursor.close()
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
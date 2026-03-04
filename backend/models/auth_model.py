import bcrypt
from database import get_db_connection
# import os
# import sqlite3



def create_user(name, email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Hash the password
    password_bytes = password.encode("utf-8")
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)",
            (name, email, hashed.decode("utf-8"))
        )
        conn.commit()
        return True
    except Exception as e:
        print("Error creating user:", e)
        return False
    finally:
        cursor.close()
        conn.close()


def get_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    return user

def login_user(email, password):
    # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # DB_PATH = os.path.join(BASE_DIR, "..", "career.db")

    # conn = sqlite3.connect(DB_PATH)
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, password_hash FROM users WHERE email = %s", (email,))
    
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return None, "User not found"

    user_id, name, stored_hash = user

    if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
        return {
            "id": user_id,
            "name": name,
            "email": email
        }, None
    else:
        return None, "Invalid password"
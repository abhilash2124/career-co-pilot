from datetime import datetime
from werkzeug.security import generate_password_hash


class User:
    def __init__(self, username, email, password, skills=None):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.skills = skills if skills else []
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "skills": self.skills,
            "created_at": self.created_at
        }


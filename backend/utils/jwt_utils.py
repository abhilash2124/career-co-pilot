import dotenv
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

SECREAT_KEY = os.environ.get("JWT_SECRET_KEY")
# SECREAT_KEY = os.environ.get("JWT_SECRET_KEY")
# if not SECREAT_KEY:
#     raise Exception("JWT_SECRET_KEY not set")

def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        # "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
    }
    print("Generating token with payload:", payload)
    token = jwt.encode(payload, SECREAT_KEY, algorithm="HS256")
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, SECREAT_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    except:
        return None
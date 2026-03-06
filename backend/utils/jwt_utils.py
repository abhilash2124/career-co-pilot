import dotenv
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Convert payload → JSON
# 2. Convert JSON → Base64
# 3. Create header automatically
# 4. Combine header + payload
# 5. Generate signature using secret key
# 6. Create final token
# ---
# 1. Create header
# 2. Encode header → base64
# 3. Encode payload → base64
# 4. Generate signature using SECRET_KEY
# 5. Combine them → HEADER.PAYLOAD.SIGNATURE

SECREAT_KEY = os.environ.get("JWT_SECRET_KEY")

def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        # "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
    }
    
    token = jwt.encode(payload, SECREAT_KEY, algorithm="HS256")
    return token

# 1. Split token → HEADER.PAYLOAD.SIGNATURE
# 2. Decode Base64 payload
# 3. Verify signature with SECRET_KEY
# 4. Check expiration (exp)
# 5. Return payload dictionary
# ---
# 1. Splits token → HEADER | PAYLOAD | SIGNATURE
# 2. Recreates signature using SECRET_KEY
# 3. Compares with token's signature

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
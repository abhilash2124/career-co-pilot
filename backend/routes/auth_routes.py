from flask import Blueprint, request, jsonify
from models.auth_model import create_user
from models.auth_model import login_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    print("Received registration data:", data)
    print("Name:", name)
    print("Email:", email)
    print("Password:", password)
    if not name or not email or not password:
        return jsonify({"error": "All fields (name, email, password) are required"}), 400
    
    success = create_user(name, email, password)
    
    if not success:
        return jsonify({"error": "User registration failed. Email may already be in use."}), 400
    
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user, error = login_user(email, password)
    
    if error == "User not found":
        return jsonify({"error": error}), 404
    
    if error == "Invalid password":
        return jsonify({"error": error}), 401
    
    return jsonify({
        "message": "Login successful",
        "user" : user
    }), 200
    
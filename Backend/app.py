from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from agents.resume_agent import ResumeParser
from agents.question_roadmapPlanner import InterviewPlanner
from agents.question_fetcher import QuestionFetcher
from agents.feedback_agent import FeedbackAgent
import json
from typing import Dict, Any
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/parse-resume', methods=['POST'])
def parse_resume() -> Dict[str, Any]:
    """Endpoint to handle resume PDF upload and parsing."""
    # Check if the post request has the file part
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['resume']

    # If user does not select file, browser might submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            # Secure the filename and save the file
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Parse the resume
            parser = ResumeParser()
            result = parser.parse_resume(file_path)

            # Clean up: remove the saved file
            os.remove(file_path)

            return jsonify(result)

        except Exception as e:
            # Clean up in case of error
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'File type not allowed. Only PDF files are accepted.'}), 400

@app.route('/generate-interview-questions', methods=['POST'])
def generate_interview_questions() -> Dict[str, Any]:
    """Endpoint to generate interview questions based on resume summary and other parameters."""
    try:
        # Get the request data
        data = request.get_json()

        # Validate required fields
        required_fields = ['resume_summary', 'company', 'role', 'round']
        if not all(field in data for field in required_fields):
            return jsonify({
                "error": "Missing required fields",
                "required_fields": required_fields
            }), 400

        # Initialize the interview planner
        planner = InterviewPlanner()

        # Generate interview questions
        result = planner.generate_interview_questions(
            resume_summary=data['resume_summary'],
            company=data['company'],
            role=data['role'],
            round_type=data['round']
        )

        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in request"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500  

@app.route('/get-question', methods=['POST'])
def get_question() -> Dict[str,Any]:
    try:
        data= request.get_json()
        
        if not data:
            return jsonify({"error":"No JSON data provided"}),400
        
        if 'sr_no' not in data or 'interview_plan' not in data:
            return jsonify({
                "error":"Missing required fields",
                "required_fields": ["sr_no", "interview_plan"]
            }),400
            
        question = QuestionFetcher.get_question_by_srno(
            interview_plan= data['interview_plan'],
            sr_no= data['sr_no']
        )
        
        if "error" in question:
            return jsonify(question),404
        
        return jsonify(question)
    
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in request"}),400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/evaluate-answer', methods=['POST'])
def evaluate_answer() -> Dict[str, Any]:
    """
    Endpoint to evaluate a user's interview answer and provide feedback.

    Expected JSON payload:
    {
        "question": "The interview question",
        "user_answer": "The user's response to the question"
    }
    """
    try:
        # Get and validate the request data
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        required_fields = ['question', 'user_answer']
        if not all(field in data for field in required_fields):
            return jsonify({
                "error": "Missing required fields",
                "required_fields": required_fields
            }), 400

        # Initialize the feedback agent
        agent = FeedbackAgent()

        # Get the evaluation
        result = agent.evaluate_answer(
            question=data['question'],
            user_answer=data['user_answer']
        )

        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in request"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check() -> Dict[str, str]:
    """Health check endpoint."""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



# Placementor

Placementor is a comprehensive interview preparation platform designed to help users practice and improve their interview skills. This project was developed as part of a hackathon and leverages advanced AI agents to provide a realistic interview experience and constructive feedback.

## Table of Contents

- [Features](#features)
- [Agents](#agents)
  - [Feedback Agent](#feedback-agent)
  - [Question Fetcher](#question-fetcher)
  - [Interview Planner](#interview-planner)
  - [Resume Parser](#resume-parser)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Resume Upload and Parsing**: Users can upload their resumes, which are then parsed to extract relevant information.
- **Interview Simulation**: Users can select a company, role, and interview round to generate a tailored set of interview questions.
- **Speech Recognition**: Users can practice answering questions using their voice.
- **Feedback and Evaluation**: AI agents evaluate user responses and provide detailed feedback, including scores and suggestions for improvement.

## Agents

### Feedback Agent

- **Purpose**: Evaluates user responses to interview questions and provides constructive feedback.
- **Logic**:
  - Utilizes the Gemini model to analyze user answers based on structure, clarity, relevance, and impact.
  - Provides a score out of 10, detailed feedback, a corrected version of the answer, and a recommendation on whether the user should repeat the question.
  - Outputs the evaluation in a structured JSON format.

### Question Fetcher

- **Purpose**: Retrieves specific questions from an interview plan based on the serial number.
- **Logic**:
  - Takes an interview plan and a serial number as inputs.
  - Searches through the interview plan to find and return the question corresponding to the given serial number.
  - Returns an error if the question is not found.

### Interview Planner

- **Purpose**: Generates a structured interview plan based on the user's resume, target company, role, and interview round.
- **Logic**:
  - Uses the Gemini model to create a list of 10 interview questions tailored to the user's selected parameters.
  - Questions are structured to simulate a real interview, starting with introductory questions and gradually increasing in difficulty.
  - Outputs the interview plan in a structured JSON format.

### Resume Parser

- **Purpose**: Extracts structured information from a user's uploaded resume.
- **Logic**:
  - Uses the Gemini model to parse the resume and extract key details such as full name, email, phone, skills, projects, education, and work experience.
  - Outputs the extracted information in a structured JSON format.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Placementor
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Upload Resume**: Upload your resume in PDF format. The system will parse the resume and extract relevant information.

2. **Select Interview Parameters**: Choose the target company, role, and interview round to generate a tailored set of interview questions.

3. **Practice Interview**: Use the speech recognition feature to practice answering the generated interview questions.

4. **Receive Feedback**: After submitting your answers, the AI agents will evaluate your responses and provide detailed feedback, including scores and suggestions for improvement.

## Screenshots

(This section is reserved for adding screenshots of the application in action.)

## Contributing

We welcome contributions to Placementor! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any inquiries or feedback, please contact us at your-email@example.com.
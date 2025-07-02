from agno.agent import Agent,RunResponse
from agno.models.google import Gemini
from agno.tools.duckduckgo import DuckDuckGoTools
from rich.pretty import pprint

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    tools=[DuckDuckGoTools()],
    show_tool_calls=True,
    markdown=True,
)
run_response: RunResponse = agent.run(
  '''
  You are an interview planning assistant. Based on the candidate's resume summary, target company, role, and interview round type, generate a list of 10 structured interview questions like a full interview from starting intro like tell me about yourself and so on gradually in the following JSON format:

  {
    "interview_plan": [
        {
            "SrNo": "number",
            "round": "string",
            "question": "string",
            "topic": "string",
            "difficulty": "string"
        }
    ]
}
Use only one of the following for "round": "technical", "coding", "hr".
Ensure to make the questions sound like a dialogue asking to the candidate
Resume Summary: {
    "Education": [
        "Vivekanand Education Society's Institute of Technology\nBachelor of Engineering (Computer Engineering)\n2022 - Present\nCGPA: 9.74 (till Sem VI)"
    ],
    "Email": "tejasgadge903@gmail.com",
    "Full Name": "Tejas Gadge",
    "Phone": "+91-8850990106",
    "Projects": [
        "AcademyFunds: Finance Management System for Institutes: A full-stack fees management platform using ReactJS and Firebase, enabling institutes to manage student admissions, payments, and fee installments.",
        "Implemented secure PIN-based login, real-time fee tracking, and a modern role-based dashboard to streamline admissions and enhance financial transparency for Institutes.",
        "Deduper: Cloud-Native Storage Optimization Platform.: Built a serverless system with AWS Lambda, S3, and DynamoDB to eliminate duplicate file storage.",
        "Developed FastAPI middleware for secure file routing and client-side SHA-256 hashing to reduce bandwidth.",
        "Achieved zero-duplicate storage with metadata-driven user-file mapping and serverless auto-scaling for peak loads.",
        "RightsQuest: Developed an application by integrating the Llama 3 model to teach rights values using gamified scenarios respectively.",
        "Ranked 2nd respectively in the Project & Poster Presentation Competition.",
        "Suraksha Sakey: Developed a women safety app using Flutter and Firebase with safety features like real-time location tracking, emergency SOS alerts, incident reporting, fake call agent using Google's Dialogflow and Gemini bot to provide safety tips and enhance user security during emergencies."
    ],
    "Skills": [
        "React",
        "Flask",
        "NextJS",
        "NodeJS",
        "Dart",
        "Flutter",
        "C++",
        "C",
        "Python",
        "SQL",
        "Firebase",
        "Mongodb",
        "HTML",
        "CSS",
        "JS",
        "ALP",
        "GitHub",
        "Jupyter",
        "Amazon AWS",
        "VS Code",
        "Postman",
        "Android Studio",
        "Zero-True",
        "PowerBI",
        "Tableau",
        "UPTIQ AI",
        "Shaden"
    ],
    "Work Experience": [
        "Generative AI using OpenSource, Remote: Summer Intern\nVivekanand Education Society's Institute of Technology\nJuly 1,2024-July 31,2024\nDeveloped Application named RightsQuest and Heartistry using the Open Source Meta-Llama Model for Teaching Human Rights and Bullying Scenarios.",
        "Genius Academy, Kalyan-Badlapur: Web Developer\n2024\nRedesigned the academy's platform with a lightweight, mobile-friendly interface and added features like a chatbot, boosting user experience and increasing mobile traffic."
    ]
}


Company: Capgemini
Role: SDE-1
Round Type: Technical
  '''
)
pprint(run_response.content)
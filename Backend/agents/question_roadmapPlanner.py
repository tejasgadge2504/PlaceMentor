from agno.agent import Agent, RunResponse
from agno.models.google import Gemini
from agno.tools.duckduckgo import DuckDuckGoTools
from typing import Dict, Any
import json

class InterviewPlanner:
    def __init__(self):
        self.agent = Agent(
            model=Gemini(id="gemini-2.0-flash-exp"),
            tools=[DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=False,
        )

    def generate_interview_questions(self, resume_summary: Dict[str, Any], company: str, role: str, round_type: str) -> Dict[str, Any]:
        """Generate interview questions based on the provided parameters."""
        try:
            # Prepare the prompt with the given parameters
            prompt = f'''
            You are an interview planning assistant. Based on the candidate's resume summary, target company, role, and interview round type,
            generate a list of 10 structured interview questions like a full interview from starting intro like "tell me about yourself"
            and so on for {company} company for Role: {role} and {round_type} round gradually in the following JSON format:

            {{
                "interview_plan": [
                    {{
                        "SrNo": "number",
                        "round": "string",
                        "question": "string",
                        "topic": "string",
                        "difficulty": "string"
                    }}
                ]
            }}

            ensure the questions to be of {round_type} round only and not of other rounds.
            Start with question like hello welcome to this company and introduce yourself. then increase the level gradually and then the last question like do u have any questions.
            Ensure to make the questions sound like a dialogue asking to the candidate.

            For coding round : Ensure to include the past year questions starting from simple and gradually increase level. for this coding round the type of questions will be wrt the DSA and all background or from leetcode patterns.
            for the coding round give only 5 questions.Also in this for only for coding round give atleast 1 question to be like directly from past year questions and it must be framed like a proper question nut don't include any stuff like Here's a question that has been asked in previous interviews: give me just question and instead start like so lets solve this question just open the code editor and type the code there.

            Resume Summary: {json.dumps(resume_summary)}
            
            '''

            # Get the response from the agent
            run_response: RunResponse = self.agent.run(prompt)

            # Clean and parse the response
            content = run_response.content.strip()
            if content.startswith("```json"):
                content = content[7:-3].strip()

            return json.loads(content)

        except json.JSONDecodeError:
            return {
                "error": "Failed to parse response as JSON",
                "raw_response": run_response.content
            }
        except Exception as e:
            return {"error": str(e)}

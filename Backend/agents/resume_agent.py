from pathlib import Path
from agno.agent import Agent, RunResponse
from agno.media import File
from agno.models.google import Gemini
import json
import os
from typing import Dict, Any

class ResumeParser:
    def __init__(self):
        self.agent = Agent(
            model=Gemini(id="gemini-2.0-flash-exp"),
            markdown=False,
            add_history_to_messages=False,
        )

    def parse_resume(self, file_path: str) -> Dict[str, Any]:
        """Parse a resume PDF file and extract structured information."""
        try:
            run_response: RunResponse = self.agent.run(
                '''
                You are a resume parser. Extract the following in clean structured JSON format:
                {
                    "Full Name": "string",
                    "Email": "string",
                    "Phone": "string",
                    "Skills": ["string"],
                    "Projects": ["string"],
                    "Education": ["string"],
                    "Work Experience": ["string"]
                }

                Only return the valid JSON object with no additional text or markdown formatting.
                ''',
                files=[File(filepath=Path(file_path))],
            )

            # Clean and parse the response
            content = run_response.content.strip()
            if content.startswith("```json"):
                content = content[7:-3].strip()

            return json.loads(content)

        except json.JSONDecodeError:
            return {"error": "Failed to parse response as JSON", "raw_response": run_response.content}
        except Exception as e:
            return {"error": str(e)}

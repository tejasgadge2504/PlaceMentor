from typing import Dict, Any, Union
import json

class QuestionFetcher:
    @staticmethod
    def get_question_by_srno(interview_plan: Dict[str, Any], sr_no: int) -> Union[Dict[str, Any], Dict[str, str]]:
        """
        Get a specific question from the interview plan by its SrNo.

        Args:
            interview_plan: The complete interview plan dictionary
            sr_no: The serial number of the question to retrieve

        Returns:
            The question dictionary if found, or an error dictionary if not found
        """
        try:
            # Convert sr_no to string since SrNo in the JSON is a string
            sr_no_str = str(sr_no)

            # Find the question with matching SrNo
            for question in interview_plan.get("interview_plan", []):
                if question.get("SrNo") == sr_no_str:
                    return question

            return {"error": f"Question with SrNo {sr_no} not found"}

        except Exception as e:
            return {"error": str(e)}

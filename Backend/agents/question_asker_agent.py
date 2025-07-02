from pathlib import Path
from agno.agent import Agent
from agno.media import File
# from agno.models.openai.responses import OpenAIResponses
from agno.models.groq import Groq
# from agno.utils.media import download_file
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase 
from agno.vectordb.lancedb import LanceDb, SearchType
from agno.embedder.openai import OpenAIEmbedder

pdf_path = 'C:\\Users\\tejas\\OneDrive\\Desktop\\CODE\\PlaceMentor\\Backend\\uploads\\Tejas_Gadge_Resume.pdf'


# agent = Agent(
#     model=OpenAIResponses(id="gpt-4o-mini"),
#     tools=[{"type": "file_search"}],
#     markdown=True,
#     add_history_to_messages=True,
# )

agent = Agent(
    model=Groq(id="llama-3.1-8b-instant"),
      knowledge=PDFUrlKnowledgeBase(  # Configure knowledge source
        urls=["https://agno-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"],  # URL to Thai recipes PDF
        
    ),
      markdown=True,
      add_history_to_messages=True,
      )

agent.print_response(
    '''You are a resume parser. 
        Extract the following in clean structured format:
        - Full Name
        - Email
        - Skills
        - Projects
        - Education
        - Work Experience

        Return the output in clean JSON format.''',
    files=[File(filepath=pdf_path)],
    stream=True
)


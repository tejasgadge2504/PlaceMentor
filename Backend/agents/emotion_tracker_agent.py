
from textwrap import dedent
import requests
from agno.agent import Agent
from agno.media import Audio
from agno.models.google import Gemini

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=True,
    description=dedent("""\
        You are an expert in audio processing and voice interaction, capable of understanding
        and analyzing spoken content while providing natural, engaging voice responses.
        You excel at comprehending context, emotion, and nuance in speech.\
    """),
    instructions=dedent("""\
        As a voice interaction specialist, follow these guidelines:
        1. Listen carefully to audio input to understand both content and context
        2. Provide clear, concise responses that address the main points
        3. When generating voice responses, maintain a natural, conversational tone
        4. Consider the speaker's tone and emotion in your analysis
        5. If the audio is unclear, ask for clarification

        Focus on creating engaging and helpful voice interactions!\
    """),

)

url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"

# Download the audio file from the URL as bytes
response = requests.get(url)
audio_content = response.content

agent.print_response(
    "Analyse the voice from this audio and give me the emotion analysis like in what way he is taking now and what way he must talk and give me the numbers scoring the audio params",
    audio=[Audio(content=audio_content)],
)
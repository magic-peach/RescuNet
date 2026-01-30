from flask import Blueprint, request, jsonify
import os
import logging
from langdetect import detect

DEMO_MODE = os.environ.get("DEMO_MODE", "false").lower() == "true"

bot = Blueprint("rescuBot", __name__)

# Groq client setup - mock in demo mode
client = None
if DEMO_MODE:
    print("[DEMO MODE] Groq API mocked - chatbot will return placeholder responses")
else:
    try:
        from groq import Groq
        from groq._base_client import SyncHttpxClientWrapper

        http_client = SyncHttpxClientWrapper()
        api_key = os.getenv("GROQ_API_KEY")
        if api_key:
            client = Groq(api_key=api_key, http_client=http_client)
            print("Groq client initialized successfully")
        else:
            print("Warning: GROQ_API_KEY not set, using demo mode")
    except Exception as e:
        print(f"Warning: Could not initialize Groq client: {e}")

RESCUNET_PROMPT = (
    "You are a specialized disaster response officer for RescuNet assisting citizens during disaster scenarios. "
    "Communication Guidelines: "
    "- Respond professionally and authoritatively "
    "- Prioritize public safety with clear, actionable information "
    "- Default language is English "
    "- Respond in the detected user's language (Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Marathi, Bengali, Punjabi, Kashmiri) "
    "Primary Objectives: "
    "1. Deliver rapid, accurate disaster information "
    "2. Enable immediate emergency service access "
    "3. Advance disaster preparedness and recovery technologies "
    "Response Protocols: "
    "- Maximum 200 words for mobile readability "
    "- Use numbered steps for emergency instructions "
    "- Ensure instructions are clear, practical, and immediately implementable "
    "- Maintain formal tone focused on disaster management "
    "Scope: Exclusively address *Disaster management and public safety* "
    "Out-of-Scope Response: "
    "'As a RescuNet officer, I'm focused on providing critical disaster management and public safety information.'"
)

RESCUNET_PERSONNEL_PROMPT = (
    "You are an advanced AI assistant specifically designed for RescuNet personnel and first responders. "
    "Your primary mission is to provide critical support during disaster management scenarios. "
    "Core Operational Guidelines: "
    "1. Communicate with absolute clarity and precision "
    "2. Prioritize immediate life-saving information "
    "3. Maintain a professional, authoritative communication style "
    "Language Protocol: "
    "- Default communication language is English "
    "- Capable of understanding and responding in multiple Indian languages "
    "Operational Objectives: "
    "1. Deliver real-time, accurate disaster-related information "
    "2. Facilitate rapid emergency response coordination "
    "3. Support strategic disaster preparedness and recovery efforts "
    "Response Framework: "
    "- Responses must be concise (maximum 200 words) "
    "- Use numbered steps for clear, actionable guidance "
    "- Focus on practical, immediately implementable solutions "
    "Scope of Assistance: "
    "- Specialize in disaster management scenarios "
    "- Cover natural and human-made disaster contexts "
    "Escalation Protocol: "
    "If query falls outside disaster management domain, respond with: "
    "'As a RescuNet specialized assistant, I'm focused on providing critical disaster management support and public safety information.'"
)


# GROQ's parameters
DEFAULT_MODEL = "llama-3.1-70b-versatile"
DEFAULT_TEMPERATURE = 0.7
DEFAULT_MAX_TOKENS = 1024

# Logging starter
logging.basicConfig(level=logging.DEBUG)


@bot.route("/")
def home():
    return jsonify({"message": "Welcome to the RescuNet Bot!"})


@bot.route("/chat", methods=["POST"])
def generate_public_chat_response():
    try:
        data = request.get_json()
        messages = data.get("messages", [])

        # Check if the content empty
        if not messages or all(not msg.get("content") for msg in messages):
            return (
                jsonify(
                    {
                        "message": (
                            "Namaste, I'm RescuNet Bot. I'm here to help you with any queries or requests you may have during a disaster. "
                            "Please feel free to ask me anything in any of the following languages: Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Marathi, Bengali, Punjabi, or Kashmiri. \n\n"
                            "If you need assistance, please type 'help' and I will guide you through the process."
                        ),
                        "tokens_used": 0,
                    }
                ),
                200,
            )

        full_messages = [{"role": "system", "content": RESCUNET_PROMPT}]

        # Add user role to each message and detect language
        for msg in messages:
            msg["role"] = "user"
            user_language = detect(msg["content"])
            full_messages[0][
                "content"
            ] = f"{RESCUNET_PROMPT} Respond in {user_language}."
            full_messages.append(msg)

        # Demo mode: return placeholder response
        if client is None:
            return (
                jsonify(
                    {
                        "message": "[DEMO MODE] This is a placeholder response from the RescuNet Bot. In production, this would be an AI-generated response about disaster management.",
                        "tokens_used": 0,
                    }
                ),
                200,
            )

        # Send request to the Groq API
        response = client.chat.completions.create(
            messages=full_messages,
            model=DEFAULT_MODEL,
            temperature=DEFAULT_TEMPERATURE,
            max_tokens=DEFAULT_MAX_TOKENS,
        )
        assistant_message = response.choices[0].message.content

        assistant_message = format_response_for_mobile(assistant_message)

        return (
            jsonify(
                {
                    "message": assistant_message,
                    "tokens_used": response.usage.total_tokens,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


def format_response_for_mobile(response):
    max_length = 300
    paragraphs = []

    while len(response) > max_length:
        split_point = response.rfind(" ", 0, max_length)
        paragraphs.append(response[:split_point])
        response = response[split_point:].strip()

    if response:
        paragraphs.append(response)

    return "\n\n".join(paragraphs)


@bot.route("/employee-chat", methods=["POST"])
def generate_employee_chat_response():
    try:
        data = request.get_json()
        messages = data.get("messages", [])

        # Check if the content empty
        if not messages or all(not msg.get("content") for msg in messages):
            return (
                jsonify(
                    {
                        "message": (
                            "Namaste, I'm RescuNet Bot. I'm here to assist RescuNet personnel with any queries and requests during a disaster. "
                            "If you need assistance, please type 'help' and I will guide you through the process."
                        ),
                        "tokens_used": 0,
                    }
                ),
                200,
            )

        full_messages = [{"role": "system", "content": RESCUNET_PERSONNEL_PROMPT}]

        # Add user role to each message and detect language
        for msg in messages:
            msg["role"] = "user"
            user_language = detect(msg["content"])
            full_messages[0][
                "content"
            ] = f"{RESCUNET_PERSONNEL_PROMPT} Respond in {user_language}."
            full_messages.append(msg)

        # Demo mode: return placeholder response
        if client is None:
            return (
                jsonify(
                    {
                        "message": "[DEMO MODE] This is a placeholder response for RescuNet personnel. In production, this would be an AI-generated response for disaster management coordination.",
                        "tokens_used": 0,
                    }
                ),
                200,
            )

        # Send request to the Groq API
        response = client.chat.completions.create(
            messages=full_messages,
            model=DEFAULT_MODEL,
            temperature=DEFAULT_TEMPERATURE,
            max_tokens=DEFAULT_MAX_TOKENS,
        )
        assistant_message = response.choices[0].message.content

        assistant_message = format_response_for_mobile(assistant_message)

        return (
            jsonify(
                {
                    "message": assistant_message,
                    "tokens_used": response.usage.total_tokens,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@bot.route("/v1/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "RescuNet Bot, COPY!"}), 200

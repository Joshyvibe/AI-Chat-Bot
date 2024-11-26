


def chat_with_ai(message):
    try:
        from gradio_client import Client
        client = Client("sakthisurya/textbasedAI")
        result = client.predict(
            message,	# str in 'Message' Textbox component
            api_name="/chat"
        )
        print("hey Chief here's the Gradio API result:", result)
        return {
            "result": result
        }
    except Exception as e:
        print(f"Error generating text: {str(e)}")
        return {"error": str(e)}




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import chat_with_ai
from rest_framework.permissions import AllowAny



class ChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        message = request.data.get('message')
        

        if not message:
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        response = chat_with_ai(message)
        if "error" in response:
            return Response({'error': response["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'response': response["result"]}, status=status.HTTP_200_OK)

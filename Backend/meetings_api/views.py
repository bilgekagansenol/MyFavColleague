from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from meetings_api.serializers import MeetingItemSerializer
from meetings_api.models import MeetingItem

import tempfile
import os
from dotenv import load_dotenv


from openai import OpenAI

class MeetingItemAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        audio_file = request.FILES.get('meeting_audio_recording')
        if not audio_file:
            return Response({"error": "Audio file is required."}, status=400)

        # STEP 1: Save audio temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            for chunk in audio_file.chunks():
                temp_audio.write(chunk)
            temp_audio_path = temp_audio.name

        try:
            # STEP 2: Whisper'dan plain text al (örnek simülasyon)
            plain_text = self.transcribe_with_whisper(temp_audio_path)

            # STEP 3: LLM'den summary ve keypoints al (örnek simülasyon)
            summary, key_points = self.get_summary_and_keypoints(plain_text)

            # STEP 4: Model'e sadece gerekli verileri kaydet
            meeting = MeetingItem.objects.create(
                user=request.user,
                meeting_name="New Meeting",
                meeting_summary=summary,
                meeting_key_points=key_points
            )

            serializer = MeetingItemSerializer(meeting)
            return Response({
                            "meeting": serializer.data,
                            "debug_plain_text": plain_text  # sadece test için gösteriyoruz
                            }, status=201)
           # return Response(serializer.data, status=201)

        finally:
            # STEP 5: Ses dosyasını ve plaintexti sil
            os.remove(temp_audio_path)
            del plain_text  # RAM'den de silinmiş olur

    def transcribe_with_whisper(self, audio_path):
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        with open(audio_path ,"rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model = "gpt-4o-transcribe",
                file=audio_file,
                response_format="text"
                
            )
        return transcription.text

    def get_summary_and_keypoints(self, plain_text):
        # Burası LLM çağrısı yerine geçer, şimdilik taklit ediyoruz
        summary = "Bu toplantının özeti budur."
        key_points = ["Madde 1", "Madde 2", "Madde 3"]
        return summary, key_points

    def get(self, request):
        meetings = MeetingItem.objects.filter(user=request.user)
        serializer = MeetingItemSerializer(meetings, many=True)
        return Response(serializer.data)

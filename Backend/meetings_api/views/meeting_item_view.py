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
            meeting_name, summary, key_points = self.get_summary_and_keypoints(plain_text)

            # STEP 4: Model'e sadece gerekli verileri kaydet
            meeting = MeetingItem.objects.create(
                user=request.user,
                meeting_name=meeting_name,
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
        with open(audio_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",  # ✅ whisper-1 kullan, gpt-4o-transcribe değil
                file=audio_file,
                response_format="text"
            )
        return transcription  


    def get_summary_and_keypoints(self, plain_text):
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        system_prompt = """
        Aşağıdaki toplantı metni için:
        1. Toplantıya uygun kısa bir başlık üret (en fazla 10 kelime)
        2. Toplantıyı özetle
        3. En fazla 5 madde ile önemli noktaları çıkar.

        Format şu şekilde olmalı:

        Title: <toplantı başlığı>
        Summary: <özet>
        Key Points:
        - Nokta 1
        - Nokta 2
        """

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": plain_text}
            ],
            temperature=0.7,
        )

        response_text = completion.choices[0].message.content

        # Parçala
        title, summary, keypoints = "Untitled Meeting", "", []
        if "Title:" in response_text:
            try:
                title_part, rest = response_text.split("Summary:", 1)
                summary_part, keypoints_part = rest.split("Key Points:", 1)
                title = title_part.replace("Title:", "").strip()
                summary = summary_part.strip()
                keypoints = [line.strip("- ").strip() for line in keypoints_part.strip().split("\n") if line.startswith("-")]
            except:
                pass

        return title, summary, keypoints

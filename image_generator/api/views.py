from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_image_with_gradio
from rest_framework.permissions import AllowAny

class GradioImageGenerateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        prompt = request.data.get("prompt")
        seed = request.data.get("seed", 0)
        randomize_seed = request.data.get("randomize_seed", True)
        width = request.data.get("width", 1024)
        height = request.data.get("height", 1024)
        steps = request.data.get("steps", 4)

        if not prompt:
            return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)
        

        # Generate image using the utility function
        result = generate_image_with_gradio(
            prompt=prompt,
            seed=seed,
            randomize_seed=randomize_seed,
            width=width,
            height=height,
            steps=steps
        )

        if "error" in result:
            return Response({"error": result["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(result, status=status.HTTP_200_OK)




import os
import shutil
import re
from django.conf import settings

def sanitize_filename(name):
    return re.sub(r'[^\w\-_\.]', '_', name)

def generate_image_with_gradio(prompt, seed=0, randomize_seed=True, width=1024, height=1024, steps=4):
    try:
        from gradio_client import Client

        client = Client("black-forest-labs/FLUX.1-schnell")
        result = client.predict(
            prompt=prompt,
            seed=seed,
            randomize_seed=randomize_seed,
            width=width,
            height=height,
            num_inference_steps=steps,
            api_name="/infer"
        )
        print("hey Chief here's the Gradio API result:", result)

        temp_file_path = result[0] if isinstance(result, tuple) else result
        print(f"Temporary file path: {temp_file_path}")

        if not os.path.exists(temp_file_path):
            return {"error": f"Temp file not found: {temp_file_path}"}

        media_folder = os.path.join(settings.MEDIA_ROOT, "generated_images")
        os.makedirs(media_folder, exist_ok=True)

        final_file_name = sanitize_filename(f"{prompt[:50].replace(' ', '_')}_{seed}.webp")
        final_path = os.path.join(media_folder, final_file_name)
        print(f"Final save path: {final_path}")

        shutil.copy(temp_file_path, final_path)

        return {
            "image_url": f"{settings.MEDIA_URL}generated_images/{final_file_name}"
        }
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return {"error": str(e)}

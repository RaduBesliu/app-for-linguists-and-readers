from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import storage
import os
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google Cloud Storage Configurations
BUCKET_NAME = 'linguists-and-readers'
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service-account.json'

storage_client = storage.Client()


@app.get("/get-story/{story_id}")
async def download_story(story_id: str):
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(f"stories/{story_id}.json")
        story = json.loads(blob.download_as_string())
        return story
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload-story/{story_name}")
async def upload_story(story_name: str, file: UploadFile = File(...)):
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(f"stories/{story_name}.json")
        blob.upload_from_string(await file.read(), content_type=file.content_type)
        return {"message": f"Uploaded {story_name} successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
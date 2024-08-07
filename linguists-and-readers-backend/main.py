from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import storage
from google.auth import compute_engine
from google.oauth2 import service_account
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

@app.get("/get-dictionary")
async def get_dictionary():
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob("dictionary.json")
        dictionary = json.loads(blob.download_as_string())
        return dictionary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get-story/{story_id}")
async def download_story(story_id: str):
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(f"stories/{story_id}.json")
        story = json.loads(blob.download_as_string())
        return story
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get('/get-story-lists')
async def get_story_list():
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blobs = bucket.list_blobs(prefix="stories/")
        story_lists = []
        for blob in blobs:
            if blob.name.endswith('metadata.json'):
                story_lists.append(json.loads(blob.download_as_string()))

        return story_lists
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
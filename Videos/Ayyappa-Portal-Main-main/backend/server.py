from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Song Model
class Song(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    artist: str
    album: str
    duration: str
    image: str
    youtubeId: str = None
    audioUrl: str = None
    type: str  # 'youtube' or 'local'
    category: str
    language: str
    description: str = ""
    uploadedBy: str = "Anonymous"
    uploadedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SongCreate(BaseModel):
    title: str
    artist: str
    album: str
    duration: str = "0:00"
    image: str = ""
    youtubeId: str = None
    audioUrl: str = None
    type: str
    category: str
    language: str
    description: str = ""
    uploadedBy: str = "Anonymous"

# Puja Guide Model
class PujaGuide(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    author: str
    description: str
    category: str
    language: str
    pages: str = "Unknown"
    sections: List[str] = []
    content: dict = {}
    type: str = "guide"  # 'guide' or 'pdf-book'
    pdfUrl: str = None
    fileSize: str = None
    uploadedBy: str = "Anonymous"
    uploadedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PujaGuideCreate(BaseModel):
    title: str
    author: str
    description: str
    category: str
    language: str
    pages: str = "Unknown"
    sections: List[str] = []
    content: dict = {}
    type: str = "guide"
    pdfUrl: str = None
    fileSize: str = None
    uploadedBy: str = "Anonymous"

# Puja Picture Model
class PujaPic(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image: str
    devotee: str
    location: str
    date: str
    occasion: str
    description: str
    likes: int = 0
    comments: int = 0
    isLiked: bool = False
    uploadedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PujaPicCreate(BaseModel):
    image: str
    devotee: str
    location: str
    date: str
    occasion: str
    description: str

# Event Model
class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: str  # 'pooja', 'annadanam', 'both'
    temple: str
    location: str
    date: str
    time: str
    description: str
    organizer: str
    contact: str
    expectedDevotees: int
    specialFeatures: List[str] = []
    isToday: bool = False
    daysLeft: int = 0
    uploadedBy: str = "Anonymous"
    uploadedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EventCreate(BaseModel):
    title: str
    type: str
    temple: str
    location: str
    date: str
    time: str
    description: str
    organizer: str
    contact: str
    expectedDevotees: int = 50
    specialFeatures: List[str] = []
    uploadedBy: str = "Anonymous"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Ayyappa Devotional Platform API"}

# Songs API
@api_router.post("/songs", response_model=Song)
async def create_song(song_data: SongCreate):
    song_dict = song_data.model_dump()
    song_obj = Song(**song_dict)
    song_dict = song_obj.model_dump()
    song_dict['timestamp'] = song_dict['uploadedAt'].isoformat()
    await db.songs.insert_one(song_dict)
    return song_obj

@api_router.get("/songs", response_model=List[Song])
async def get_songs():
    songs = await db.songs.find().to_list(1000)
    return [Song(**song) for song in songs]

@api_router.get("/songs/search")
async def search_songs(q: str):
    songs = await db.songs.find({
        "$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"artist": {"$regex": q, "$options": "i"}},
            {"album": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}},
            {"language": {"$regex": q, "$options": "i"}}
        ]
    }).to_list(100)
    return {"songs": [Song(**song) for song in songs], "total": len(songs)}

# Puja Guides API
@api_router.post("/puja-guides", response_model=PujaGuide)
async def create_puja_guide(guide_data: PujaGuideCreate):
    guide_dict = guide_data.model_dump()
    guide_obj = PujaGuide(**guide_dict)
    guide_dict = guide_obj.model_dump()
    guide_dict['timestamp'] = guide_dict['uploadedAt'].isoformat()
    await db.puja_guides.insert_one(guide_dict)
    return guide_obj

@api_router.get("/puja-guides", response_model=List[PujaGuide])
async def get_puja_guides():
    guides = await db.puja_guides.find().to_list(1000)
    return [PujaGuide(**guide) for guide in guides]

@api_router.get("/puja-guides/{guide_id}")
async def get_puja_guide(guide_id: str):
    guide = await db.puja_guides.find_one({"id": guide_id})
    if guide:
        return PujaGuide(**guide)
    return {"error": "Guide not found"}

# Puja Pictures API
@api_router.post("/puja-pics", response_model=PujaPic)
async def create_puja_pic(pic_data: PujaPicCreate):
    # Check if user already has a picture (one per devotee rule)
    existing = await db.puja_pics.find_one({"devotee": pic_data.devotee})
    if existing:
        return {"error": "Each devotee can only upload one picture"}
    
    pic_dict = pic_data.model_dump()
    pic_obj = PujaPic(**pic_dict)
    pic_dict = pic_obj.model_dump()
    pic_dict['timestamp'] = pic_dict['uploadedAt'].isoformat()
    await db.puja_pics.insert_one(pic_dict)
    return pic_obj

@api_router.get("/puja-pics", response_model=List[PujaPic])
async def get_puja_pics():
    pics = await db.puja_pics.find().sort("uploadedAt", -1).to_list(1000)
    return [PujaPic(**pic) for pic in pics]

@api_router.put("/puja-pics/{pic_id}/like")
async def toggle_like_puja_pic(pic_id: str):
    pic = await db.puja_pics.find_one({"id": pic_id})
    if pic:
        new_likes = pic.get('likes', 0) + (1 if not pic.get('isLiked', False) else -1)
        new_liked = not pic.get('isLiked', False)
        await db.puja_pics.update_one(
            {"id": pic_id}, 
            {"$set": {"likes": new_likes, "isLiked": new_liked}}
        )
        return {"likes": new_likes, "isLiked": new_liked}
    return {"error": "Picture not found"}

# Events API
@api_router.post("/events", response_model=Event)
async def create_event(event_data: EventCreate):
    from datetime import datetime as dt
    
    event_dict = event_data.model_dump()
    
    # Calculate isToday and daysLeft
    event_date = dt.strptime(event_data.date, "%Y-%m-%d").date()
    today = dt.now().date()
    event_dict['isToday'] = event_date == today
    event_dict['daysLeft'] = (event_date - today).days
    
    event_obj = Event(**event_dict)
    event_dict = event_obj.model_dump()
    event_dict['timestamp'] = event_dict['uploadedAt'].isoformat()
    await db.events.insert_one(event_dict)
    return event_obj

@api_router.get("/events", response_model=List[Event])
async def get_events():
    events = await db.events.find().sort("date", 1).to_list(1000)
    return [Event(**event) for event in events]

@api_router.get("/events/today")
async def get_today_events():
    from datetime import datetime as dt
    today = dt.now().date().isoformat()
    events = await db.events.find({"date": today}).to_list(100)
    return [Event(**event) for event in events]

# Status Check (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
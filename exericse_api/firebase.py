from dotenv import load_dotenv
import firebase_admin
from firebase_admin import firestore, credentials
import asyncio

cred = credentials.Certificate('./workout-2531c-9711249ce4a8.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

load_dotenv()

class BodyPart:
    def __init__(self, name) -> None:
        self.name = name
    
    @staticmethod
    def from_dict(source):
        pass

    def to_dict(self):
        return vars(self)

    def __repr__(self) -> str:
        return f"BodyPart({self.name})"

async def test():
    a = BodyPart("arms")
    print(a.to_dict())

    bodypart_ref = db.collection('bodyParts').document(a.name)
    bodypart_ref.set(
        a.to_dict()
    )

asyncio.run(test())
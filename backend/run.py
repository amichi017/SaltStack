# from backend import app
from app import app

from backend.database import db

if __name__ == "__main__":
    print(db)
    app.run()

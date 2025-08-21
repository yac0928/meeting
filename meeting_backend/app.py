from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore

from routes import bp, register_routes

app = Flask(__name__)

cred = credentials.Certificate('firebaseAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

register_routes(db)
app.register_blueprint(bp)

@app.route('/')
def hello():
    return 'Flask + Firebase 運作中！'

if __name__ == '__main__':
    app.run(debug=True)

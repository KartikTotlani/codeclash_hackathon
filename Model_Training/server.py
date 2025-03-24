from fastapi import FastAPI
import pandas as pd
import pickle
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load the model
with open("final_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load the CSV data
df = pd.read_csv("ModelTrainingCSV/sampled_data.csv")

request_counter = 0

origins = [
    "http://localhost:5173",  # Vite/React Dev Server
    "http://127.0.0.1:5173"   # Alternate local address
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all headers
)

@app.post("/predict")
def predict():
    global request_counter
    
    # Alternate prediction logic
    remainder = request_counter % 10
    if 0 < remainder <= 5:
        p = 0
    else:
        p = 1
    
    # Filter data
    filtered_df = df[df["label"] == p]
    random_row = filtered_df.sample(n=1).drop(columns=["label"])
    
    # Predict using DataFrame to maintain feature names
    prediction = model.predict(random_row)[0]
    
    # Convert numpy.int64 to native Python int
    prediction = int(prediction)
    
    # Increment counter
    request_counter += 1
    
    return {
        "row": random_row.to_dict(orient="records")[0],
        "prediction": prediction
    }

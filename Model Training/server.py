from fastapi import FastAPI
import pandas as pd
import pickle
import random
from pydantic import BaseModel

app = FastAPI()

# Load the model
with open("final_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load the CSV data
df = pd.read_csv("sampled_data.csv")
request_counter = 0

@app.post("/predict")
def predict():
    global request_counter
    
    # Alternate prediction logic
    remainder = request_counter % 10
    if 0 < remainder <= 5:
        p = 0
        filtered_df = df[df["label"] == p]
        random_row = filtered_df.sample(n=1).drop(columns=["label"]).iloc[0].to_dict()
        prediction = model.predict([list(random_row.values())])[0]
    else:
        p = 1
        filtered_df = df[df["label"] == p]
        random_row = filtered_df.sample(n=1).drop(columns=["label"]).iloc[0].to_dict()
        prediction = model.predict([list(random_row.values())])[0]
    # Increment counter
    request_counter += 1
    
    return {"row": random_row, "prediction": prediction}


# to run this you need final_model.pkl and sampled_data.csv file in the same directory

# the random row has all the attributes to return as kartik mentioned
# aisa structure hogga dekh bhargav
# abb isme tu jo bhi data kartik ke yaha se aayega wo side me rkh that will be of no use just get the data whatever it is and run the above scirpt
# ye aisa likha hai ki first 5 times normal traffic batayega and next 5 times attacking traffic batayega

# random_row = {'ct_dst_ltm': 3.407505725449336,
#  'ct_state_ttl': 0.6804837300028516,
#  'dload': -0.2725562613222879,
#  'sload': -0.10738149193735,
#  'ct_dst_src_ltm': 3.739330633181813,
#  'sttl': 0.7217893832508473,
#  'dpkts': -0.167678396716266,
#  'rate': 0.125340000935501,
#  'sinpkt': -0.1318362054998859,
#  'ct_dst_sport_ltm': 3.2508830022489152,
#  'ct_srv_dst': 3.7500108656438975,
#  'dmean': -0.4787369382851281,
#  'ct_srv_src': 3.7410066015653753,
#  'state_INT': 1.1013915574820168}

# prediction = 1/0


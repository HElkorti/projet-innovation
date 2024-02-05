# uvicorn prid:app --reload --host 0.0.0.0

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import os
import librosa
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers, models

from tensorflow.keras import layers, models
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf

from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.image import resize
from tensorflow.keras.models import load_model

# audio_file = "c:/Users/omar-/Downloads/babyshouting_potentially_not_hungry.wav"


def predict(audio):
    # Load the saved model
    # model = load_model('/home/simed/Projects/PI-Dev/projet-innovation/Back-end/analyzerApp/rnn_mfcc_model.h5')
    model = load_model("C:/Users/dell/Desktop/Dossier Projet d'innovation/PI/rnn_mfcc_model.h5")
    min_shape = 281
    # Modify the list of classes
    classes = ["belly_pain", "burping", "discomfort", "hungry", "tired"]

    # Function to extract audio features (MFCC)
    def extract_features(audio_path):
        audio, _ = librosa.load(audio_path, res_type="kaiser_fast")
        mfccs = librosa.feature.mfcc(y=audio, sr=22050, n_mfcc=13)
        return mfccs

    # Function to reshape and truncate the MFCCs
    def reshape_and_truncate(mfccs, target_shape):
        if mfccs.shape[1] > target_shape:
            return mfccs[:, :target_shape]
        else:
            return np.pad(mfccs, ((0, 0), (0, target_shape - mfccs.shape[1])))

    # Function to process audio file and make a prediction
    def predict_audio_class(audio_path, model, min_shape):
        # Extract features of the new audio
        new_audio_features = extract_features(audio_path)

        # Ensure features have the same shape as those used for training
        new_audio_features = reshape_and_truncate(new_audio_features, min_shape)

        # Add an additional dimension for the batch size
        new_audio_features = np.expand_dims(new_audio_features, axis=0)

        # Predict the class of the new audio
        predictions = model.predict(new_audio_features)

        # Get the class probabilities
        class_probabilities = predictions[0]

        # Get the predicted class index
        predicted_class_index = np.argmax(class_probabilities)

        return class_probabilities, predicted_class_index

    # Make a prediction for the new audio
    class_probabilities, predicted_class_index = predict_audio_class(
        audio, model, min_shape
    )

    # Calculate and display the predicted class and accuracy
    predicted_class = classes[predicted_class_index]
    accuracy = class_probabilities[predicted_class_index]
    return predicted_class




app = FastAPI()
# add CORS support

# add the following line to allow CORS

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/process_wav")
async def create_upload_file(file: UploadFile):
    prediction = predict(file.file)
    return {"prediction": prediction}
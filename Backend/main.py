from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cryptography.fernet import Fernet

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

key = Fernet.generate_key()
cipher = Fernet(key)

@app.get("/")
def home():
    return {"status": "Secure Vault is Online"}

@app.get("/encrypt")
def encrypt_data(text:str):
    data_as_bytes = text.encode()
    secret_code = cipher.encrypt(data_as_bytes)
    return {"original": text, "encrypted_code": secret_code}

@app.get("/decrypt")
def decrypt_data(secret_code:str):
    decrypted_bytes = cipher.decrypt(secret_code.encode())
    original_message = decrypted_bytes.decode()
    return {"decrypted_message": original_message}
    
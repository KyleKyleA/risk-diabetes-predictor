# Author: Kyle Angeles
# File-Name: database.py
# Description: Supabase file connection between our application and supa base


# Initial setup
import os
from supabase import create_client, Client

# Assign the values directly as strings (remove os.environ.get)
url: str = "https://oppakxtfpnkyxvhomfns.supabase.co"
key: str = "sb_publishable_CpVDaIc1j7fck1aiSdV1GQ_dM9v9pRc"

supabase: Client = create_client(url, key)


# Implemantation 

# Each user gets a unique user_id increment by 1 
# Each user will have a name and etc
# automatically update by supa base
def register_user(name: str, email: str, phone: str, dob: str):
    try:
        new_user = {
            "name": name,
            "email": email, 
            "phone": phone,
            "dob": dob
        }
        response = supabase.table("users").insert(new_user).execute()
        return response.data 
    except Exception as e:
        print(f"Error registering user '{email}': {e}")

if __name__ == "__main__":
    print("Inserting users... ")
    
    inserted_user = register_user(
        "Kyle Angeles",
        "kyleangeles2006@gmail.com",
        "437-985-3701",
        "2006-06-12"
    )
    
    if inserted_user:
        print("Successfully registered user: ", inserted_user)


print("Current users in the database: ")
all_users = supabase.table("users").select("*").execute()
print(all_users.data)
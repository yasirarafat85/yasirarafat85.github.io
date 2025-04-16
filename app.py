from flask import Flask, render_template
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

# Set up the credentials and client
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client = gspread.authorize(creds)

@app.route("/")
def index():
    # Open the sheet by URL or title
    sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1V26XC6y9o6wxo09njMeJjPbHO7dtKOVrJsijlW-ag6A/edit").sheet1
    data = sheet.get_all_records()
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)

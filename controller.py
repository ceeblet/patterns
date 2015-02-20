# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect
from flask import session as flask_session
import model


app = Flask(__name__)

#TODO: Hide this.  
app.secret_key = 'fU0Og5yop7EddZQOGUE$FMENpdw1'

#TODO: Rename home route to just '/'?
@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/gallery')
def gallery():
    return render_template("gallery.html")
    
@app.route('/save')
def save_img():
	#TODO: save img to database 
	return redirect("/gallery")

#TODO: make another function to query db and display image on gallery pg

if __name__ == '__main__':
    app.run(debug=True)
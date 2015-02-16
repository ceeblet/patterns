# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/gallery')
def gallery():
    return render_template("gallery.html")
    
if __name__ == '__main__':
    app.run(debug=True)
# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/create')
def create_art():
    return render_template("create.html")

@app.route('/about')
def create_art():
    return render_template("about.html")

@app.route('/gallery')
def create_art():
    return render_template("gallery.html")
    
if __name__ == '__main__':
    app.run(debug=True)
# This file will contain server code that responds to user interaction, communicates with the model, and updates the view.

from flask import Flask, render_template, request, url_for, redirect
from flask import session as flask_session
import model


app = Flask(__name__)

#TODO: Hide this.  
app.secret_key = 'fU0Og5yop7EddZQOGUE$FMENpdw1'

#Q: Rename home route to just '/'?
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')
    
@app.route('/save', methods=['GET'])
def user_info():
    return render_template('save.html')
  
# TODO: save img to database     
# @app.route('/save', methods=['POST'])
# def save_image():
# 	first_name = request.form["first_name"]
# 	last_name = request.form["last_name"]
# 	email = request.form["email"]

# 	image = how do I get the img?

# 	new_img = model.User(first_name = first_name, last_name = last_name, email = email, image = image)
	
# 	commit changes

# 	flash("Saved!")
# 	return redirect("/gallery")
# 	pass
    
#TODO: display image on gallery pg

if __name__ == '__main__':
    app.run(debug=True)
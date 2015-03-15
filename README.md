#Patterns

Patterns is a space to create, share, and admire abstract art inspired by fractal patterns found in nature. Begin with a tree on your canvas, and watch it transform into surprising and unexpected shapes with the movement of your mouse. Save your masterpieces to a public art gallery, and while you’re there, be sure to take a look around.

Technology Stack: JavaScript, HTML, CSS, Python, Flask, SQLAlchemy, SQLite, AWS S3 API

![image](/static/images/home.png) 

![image](/static/images/gallery.png) 

#Getting Started

Clone or fork this repo: 

```
https://github.com/sfalkoff/patterns.git

```

Create and activate a virtual environment inside your project directory: 

```
virtualenv env

source env/bin/activate

```

Install the requirements:

```
pip install -r requirements.txt

```

Get your own secrect keys for [AWS S3] (http://aws.amazon.com/s3/) and save them to a file `s3_keys.sh`. Your file should look something like this:

```
export AWS_ACCESS_KEY_ID='YOURSECRETKEYIDHERE'
export AWS_SECRET_ACCESS_KEY='YOURSECRETACCESSKEYHERE'

```
	
Source your secret keys:

```
source s3_keys.sh

```

Run the app:

```
python controller.py

```




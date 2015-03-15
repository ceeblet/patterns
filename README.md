#Patterns

Patterns is a space to create, share, and admire abstract art inspired by fractal patterns found in nature. Begin with a tree on your canvas, and watch it transform into surprising and unexpected shapes with the movement of your mouse. Save your masterpieces to a public art gallery, and while you’re there, be sure to take a look around.

#Technology Stack: JavaScript, HTML, CSS, Python, Flask, SQLAlchemy, SQLite, AWS S3 API

![image](/static/images/home.png) 

![image](/static/images/gallery.png) 

###Getting Started

1. Clone or fork this repo: 

```https://github.com/sfalkoff/patterns.git```

2. Create a virtual environment inside your project directory: 

```virtualenv env```

3. Activate the virtual environment:

```source env/bin/activate```

4. Install the requirements:

```pip install -r requirements.txt```

5. Get your own secrect keys for AWS S3 and save them to a file s3_keys.sh. s3_keys.sh should look something like this:

```
export AWS_ACCESS_KEY_ID='YOURSECRETKEYIDHERE'
export AWS_SECRET_ACCESS_KEY='YOURSECRETACCESSKEYHERE'

```

6. Source your secret keys:

```source s3_keys.sh```

7. Run the app:

```python controller.py```




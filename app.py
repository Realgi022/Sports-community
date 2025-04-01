from flask import Flask, render_template, request, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key'   

def load_users():
    with open('users.json') as f:
        data = json.load(f)
    return data["users"]

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        users = load_users()

        for user in users:
            if username == user['username'] and password == user['password']:
                session.permanent = True  
                session['user'] = username
                return redirect(url_for('home'))

        return "Invalid username or password, please try again."

    return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)  
    return redirect(url_for('login'))  



@app.route('/')
def home():
    if 'user' not in session:  
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/chat')
def chat():
    if 'user' not in session:  
        return redirect(url_for('login'))
    return render_template('chat.html', username=session['user']) 


@app.route('/forum')
def forum():
    if 'user' not in session:  
        return redirect(url_for('login'))
    return render_template('forum.html')

@app.route('/organizeevents')
def organize_events():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('organizeevents.html')

if __name__ == '__main__':
    app.run(debug=True)

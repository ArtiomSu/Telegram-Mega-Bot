import json
import base64
from flask import Flask, request, jsonify

import subprocess
import sys
import os
import signal
import hashlib
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

nodejs_process = None

secret = os.getenv('API_SECRET')
session_text = None

def confirm_ses(hashed):
    if session_text is not None:
        real_hash = hashlib.sha512(str(session_text).encode('utf-8')+str(secret).encode('utf-8')).hexdigest()
        if real_hash == hashed:
            return True
        else:
            return False
    else:
        return False

@app.route('/', methods=['GET'])
def test_up():
    status = "bot appears to be down" if nodejs_process is None else "bot appears to be up"
    return jsonify({'status': status})

@app.route('/ses', methods=['GET'])
def ses():
    global session_text
    session_text = base64.b64encode(os.urandom(128)).decode("utf-8")
    return jsonify({'data': session_text})



@app.route('/start', methods=['POST'])
def start():
    global nodejs_process

    req = request.form.get('data',default=None)
    if req is not None:
        hashed = request.form['data']
        if confirm_ses(hashed):
            if nodejs_process is None:
                nodejs_process = subprocess.Popen("node ./bot.js",shell=True)
                return jsonify({'status': 'started'})
            else:
                return jsonify({'status': 'already running'})
        else:
            return jsonify({'error': 'invalid session'})
    else:
        return jsonify({'error': 'invalid request'})


@app.route('/stop', methods=['POST'])
def stop():
    global nodejs_process
    req = request.form.get('data',default=None)
    if req is not None:
        hashed = request.form['data']
        if confirm_ses(hashed):
            if nodejs_process is not None:
                nodejs_process.kill()
                print("nodejs stopped")
                nodejs_process = None
                return jsonify({'status': 'stopped'})
            else:
                print("no process running")
                return jsonify({'status': 'already not running'})
        else:
            return jsonify({'error': 'invalid session'})
    else:
        return jsonify({'error': 'invalid request'})

@app.route('/restart', methods=['POST'])
def restart():
    req = request.form.get('data',default=None)
    if req is not None:
        hashed = request.form['data']
        if confirm_ses(hashed):
            shutdown()
            return jsonify({'status': 'rebooting'})
        else:
            return jsonify({'error': 'invalid session'})
    else:
        return jsonify({'error': 'invalid request'})

def shutdown():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    return "Shutting down..."



@app.route('/test', methods=['POST'])
def test():
    #body = request.form.keys()[0]
    secret = request.form.get('data',default=None)
    if secret is not None:
        print(request.form['data'])
    else:
        print("secret not found")
    return jsonify({'test': 'ok'})

app.run(host='10.0.0.2', port='9877')

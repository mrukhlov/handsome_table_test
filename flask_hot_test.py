#!/usr/bin/env python

import os
import random
import json
from flask import (
    Flask,
    request,
    make_response,
    jsonify,
    render_template
)

app = Flask(__name__)
log = app.logger

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route('/save_test', methods=['POST'])
def save_test():
    if request.method == 'POST':
        print type(request), request.get_data(), request.json
        print type(request.data), len(request.data)
        print request.data
    else:
        print 'not POST'
    return 'posted'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))

    app.run(
        debug=True,
        port=port,
        host='0.0.0.0'
    )
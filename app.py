# API endpoint
# https://www.itoolset.com/nsfw/api/0

from flask import Flask, request, jsonify

app = Flask(__name__, static_url_path='', static_folder='dist')

import logging

from classify_nsfw import calc

@app.route('/nsfw')
def index():
    return app.send_static_file('index.html')
    # return 'hello, nsfw!'


@app.route('/nsfw/api/0/score', methods=['POST'])
def score():
    if 'file' not in request.files:
        return jsonify({'status': 'error'})

    file = request.files['file']

    return jsonify({'status': 'success',
                    'name': file.filename,
                    'score': calc(file.read())})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

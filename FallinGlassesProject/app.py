from flask import Flask, render_template, request, jsonify
import numpy as np
import cv2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/compare', methods=['POST'])
def compare_images():
    file1 = request.files['current_image']
    file2 = request.files['answer_image']

    current_image = cv2.imdecode(np.frombuffer(file1.read(), np.uint8), cv2.IMREAD_COLOR)
    answer_image = cv2.imdecode(np.frombuffer(file2.read(), np.uint8), cv2.IMREAD_COLOR)

    current_image = cv2.resize(current_image, (answer_image.shape[1], answer_image.shape[0]))

    diff = cv2.absdiff(current_image, answer_image)
    diff_sum = np.sum(diff)
    max_diff = answer_image.shape[0] * answer_image.shape[1] * 255 * 3

    accuracy = ((max_diff - diff_sum) / max_diff) * 100

    return jsonify({"accuracy": accuracy})

if __name__ == '__main__':
    app.run(debug=True)

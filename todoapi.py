from flask import Flask,render_template,request, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data store (in-memory)
tasks = []

# @app.route('/tasks', methods=['GET'])
# def get_tasks():
#     return jsonify(tasks)

@app.route('/add', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')
    if task:
        tasks.append(task)
    return jsonify(tasks)

@app.route('/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        del tasks[task_id]
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug = True)

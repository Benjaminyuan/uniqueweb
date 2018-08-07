from . import draw
from flask import render_template,request,redirect,url_for
import os
basedir = os.path.abspath(os.path.dirname(__file__))
path_return=''
@draw.route('/',methods=['GET'])
def drawl_main():
    return render_template('draw.html')
@draw.route('/',methods=["POST"])
def proccess_Data():
    files = request.files
    imgToTrain = files.get('file')
    form = request.form
    print(form)
    path = basedir +"/static/train/"
    print(basedir)
    print(path)
    file_path = path +imgToTrain.filename
    print(file_path)
    imgToTrain.save(file_path)
    path_return =  "/static/train/"+imgToTrain.filename
    return path_return

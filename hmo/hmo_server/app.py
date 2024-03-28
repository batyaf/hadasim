from store import patient_store as ps
from dto.patient import  Patient
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from controller.patient_controler import *
from controller.vaccine_controller import *
from controller.address_controller import *
from controller.vaccine_manufacturer_controller import *
from controller.corona_patient_controller import *
from controller.city_controller import *
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
   app.run(port=5000)
   # app.run(debug=True)














   # p=Patient(256987528,"shir",'levi',1,'2001-03-22','039895585','0555585848')
   ## ps.insert_patient(p)
   #
   # data=ps.get_all_Patient()
   # print(data)
   # pdata=ps.get_Patient_by_id(324543345)
   # print(pdata)

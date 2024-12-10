from flask import Flask, render_template, request, jsonify
import os
from predict_risk import predict_risk_monthly_input

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')  # index.html 렌더링

# API 엔드포인트: 예측 요청 처리
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 클라이언트로부터 데이터 수신
        data = request.json
        age = int(data.get('age'))
        gender = 1 if data.get('gender') == '남성' else 0  # 성별을 숫자로 변환
        date = data.get('date').replace("-", "")  # "YYYY-MM" -> "YYYYMM"

        # 예측 수행
        result = predict_risk_monthly_input(age, gender, date)

        # 결과 반환
        return jsonify({"success": True, "result": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    host = '0.0.0.0'
    port = 5000
    app.debug = True
    print(f"서버가 실행 중입니다: http://127.0.0.1:{port}")
    app.run(host=host, port=port)

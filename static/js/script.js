// 폼 제출 시 이벤트 처리
document.getElementById("festivalForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지

    // 입력된 값 가져오기
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;

    // 서버에 데이터 전송
    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ age, gender, date }),
        });

        const result = await response.json();

        if (result.success) {
            // 결과 출력
            const outputDiv = document.getElementById("output");
            const data = result.result;

            outputDiv.innerHTML = `
                <h2>예측 결과</h2>
                <p>위험도: ${data["Predicted Risk"]}</p>
                <p>위험 확률: ${data["Risk Probability"].toFixed(2)}%</p>
                <h3>사용된 데이터:</h3>
                <ul>
                    <li>성별: ${data["Used Values"]["Gender"]}</li>
                    <li>연령대: ${data["Used Values"]["Age Group"]}</li>
                    <li>평균 기온: ${data["Used Values"]["Average Temperature"]}°C</li>
                    <li>평균 습도: ${data["Used Values"]["Average Humidity"]}%</li>
                    <li>예상 확진자 수 (성별): ${data["Used Values"]["Predicted Cases for Gender"]}명</li>
                    <li>예상 확진자 수 (연령대): ${data["Used Values"]["Predicted Cases for Age Group"]}명</li>
                </ul>
            `;
        } else {
            alert(`예측 실패: ${result.error}`);
        }
    } catch (error) {
        alert(`서버 오류: ${error.message}`);
    }
});

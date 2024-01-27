//1. 시간 넣을 div 지정
//2. date()이용해서 각각의 시간 넣기
//3. setInterval로 1초마다 바뀌게.
//4. 새로고침해도 남아있도록.
//5. 00:00:00:00되면 경과한 시간 띄우기 + 새로운 날짜를 선택하세요!(날짜선택..할 수 있도록)

//1. 시간 넣을 div + 타이머 지정 시간 띄우는 h5 + date.button  지정
const daysDiv = document.getElementById("days");
const hoursDiv = document.getElementById("hours");
const minutesDiv = document.getElementById("minutes");
const secondsDiv = document.getElementById("seconds");
const selectDate = document.getElementById("date");
const select = document.getElementById("select");
const h5 = document.querySelector("h5");

const now = new Date(); //Sat Jan 06 2024 05:56:37
// const birthday = new Date(2024, 0, 8); //Wed Sep 04 2024 00:00:00 GMT+0900 -> 사용자가 직접 선택할 수 있또록 변경

let start;
// selectDate.addEventListener('change',function(){
select.addEventListener("click", function () {
  if (selectDate.value === "") {
    alert("생일을 선택해주세요");
    return;
  }
  clearInterval(start);
  const selectValue = selectDate.value.split("-");
  start = setInterval(function () {
    // type=date활용해서 시간 넣기
    const selectArr = []; //달력에서 선택한 값 넣어주는 배열
    // console.log(selectDate.value) //['2024-01-18']
    // - 기준으로 문자열 나누기 ['2024','01','18']
    // console.log(selectValue);
    selectArr.push(selectValue); // 문자열 나눈 것 배열에 넣어주기
    // console.log(selectArr)
    //연,월,일 각각 지정
    const selectYear = parseInt(selectValue[0]);
    console.log(selectYear); //2024
    const selectMonth = parseInt(selectValue[1]) - 1;
    console.log(selectMonth); //0
    const selectDay = parseInt(selectValue[2]);
    console.log(selectDay); //19

    //date 누르면 생일지정, + h5에 생일 날짜 띄우기
    const birthday = new Date(selectYear, selectMonth, selectDay);
    h5.textContent = `당신의 생일은 ${birthday.getFullYear()}년 ${
      birthday.getMonth() + 1
    }월 ${birthday.getDate()}일 입니다`;

    //생일시간에서 현재시간 빼기
    const currentTime = new Date().getTime(); //1704488275434
    const birthdayTime = birthday.getTime(); //1725375600000
    const timeDifference = birthdayTime - currentTime; //20887269633

    //밀리초로 반환된 것 각각 바꾸기
    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor((timeDifference / (1000 * 3600)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    //바꾼거 박스에 넣어주기
    daysDiv.textContent = days;
    hoursDiv.textContent = hours;
    minutesDiv.textContent = minutes;
    secondsDiv.textContent = seconds;

    //4. 00:00:00:00되면 경과한 시간 띄우기 + 색 변경// 새로운 날짜를 선택하세요!
    if (timeDifference < 0) {
      daysDiv.classList.add("timeover");
      hoursDiv.classList.add("timeover");
      minutesDiv.classList.add("timeover");
      secondsDiv.classList.add("timeover");

      const timeDifference = currentTime - birthdayTime;
      const days = Math.floor(timeDifference / (1000 * 3600 * 24));
      const hours = Math.floor((timeDifference / (1000 * 3600)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      daysDiv.textContent = days;
      hoursDiv.textContent = hours;
      minutesDiv.textContent = minutes;
      secondsDiv.textContent = seconds;

      h5.textContent = `이미 지난 생일입니다. 새로운 생일을 등록하세요!`;

      if (secondsDiv.textContent >= 50) {
        // Add the 'changed' class to apply the effect
        secondsDiv.classList.add("changed_timeover");
        // Remove the class after the animation completes (0.5s in this example)
        setTimeout(() => {
          secondsDiv.classList.remove("changed_timeover");
        }, 500);
      }
    } else {
      daysDiv.classList.remove("timeover");
      hoursDiv.classList.remove("timeover");
      minutesDiv.classList.remove("timeover");
      secondsDiv.classList.remove("timeover");

      if (secondsDiv.textContent <= 10) {
        // Add the 'changed' class to apply the effect
        secondsDiv.classList.add("changed");
        // Remove the class after the animation completes (0.5s in this example)
        setTimeout(() => {
          secondsDiv.classList.remove("changed");
        }, 500);
      }
    }
  }, 1000);
});

//3. setInterval로 1초마다 바뀌게

// 지정된 시간부터 타이머 시작하게
//settimeout -> 초.
//if문 사용해서! -> 그럼 if문이 안에 잇는 변수를 써야햐는디;;;-> 타이머 만드는 함수를 선언? Gooootddd

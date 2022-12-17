"use strict";

let selectBox = document.querySelector(".select-box");
let selectPlayerX = selectBox.querySelector(".playerX");
let selectPlayerO = selectBox.querySelector(".playerO");

let playBox = document.querySelector(".play-box");
let play = document.querySelector(".btn-play");

let player = document.querySelector(".players");
let xTurn = document.querySelector(".Xturn");
let oTurn = document.querySelector(".Oturn");

let gameBoard = document.querySelector(".game-board");

let resultBox = document.querySelector(".result-box");
let wonText = resultBox.querySelector(".won-text");
let replay = resultBox.querySelector(".btn-replay");

let count = 0; // Đếm số lần click vào ô
let sign, notSign;
let win = false;

// Tạo lưới ô trò chơi
const render = (row, column) => {
  let resume = "<table>";
  for (let i = 0; i < row; i++) {
    resume += "<tr>";
    for (let j = 0; j < column; j++) {
      resume += '<td class = "btn-box" id="1">';
      resume += "</td>";
    }
    resume += "</tr>";
  }
  resume += "</table>";
  return resume;
};

///////////////////////////////
// Khi người chơi click vào nút chọn chơi quân X
selectPlayerX.addEventListener("click", function () {
  selectBox.classList.add("hidden"); //Ẩn hộp chọn quân X/O
  playBox.classList.add("show"); // Hiện giao diện chơi chính
  xTurn.classList.add("active"); //
});

// Khi người chơi click vào nút chọn chơi quân O
selectPlayerO.addEventListener("click", function () {
  selectBox.classList.add("hidden");
  playBox.classList.add("show");
  oTurn.classList.add("active");
});

///////////////////////////////////
// Hàm Play
const handlePlayClick = () => {
  let rows = Number(document.querySelector(".input-row").value);
  let columns = Number(document.querySelector(".input-column").value);

  if (!rows || !columns) alert("Chưa nhập đúng số hàng và cột ⛔");
  // Kiểm tra xem row và column nhập vào có phải số nguyên không
  else if (Number.isInteger(rows) && Number.isInteger(columns)) {
    if (rows >= 4 && columns >= 4 && rows <= 14 && columns <= 14) {
      document.querySelector(".game-board").innerHTML = render(rows, columns); // Thêm lưới trò chơi vào play-box
      let allBox = document.querySelectorAll(".btn-box"); // allBox là tập các ô

      for (let i = 0; i < allBox.length; i++) {
        // Hàm kiểm tra kết quả
        const check = () => {
          // Theo hàng ngang

          if (
            i % (columns - 1) !== 0 &&
            i % columns !== 0 &&
            i % (columns + 1) !== 0 &&
            allBox[i - 1]?.id === sign &&
            allBox[i + 1]?.id === sign &&
            ((allBox[i - 2]?.id === sign &&
              allBox[i + 2]?.id !== notSign &&
              allBox[i - 3]?.id !== notSign) ||
              (allBox[i - 2]?.id !== notSign &&
                allBox[i + 2]?.id === sign &&
                allBox[i + 3]?.id !== notSign))
          ) {
            {
              win = true;
            }
          } else if (
            i % columns !== 0 &&
            (i - 1) % columns !== 0 &&
            (i - 2) % columns !== 0 &&
            allBox[i - 1]?.id === sign &&
            allBox[i - 2]?.id === sign &&
            allBox[i - 3]?.id === sign &&
            allBox[i - 4]?.id !== notSign &&
            allBox[i + 1]?.id !== notSign
          ) {
            win = true;
          } else if (
            i % (columns - 1) !== 0 &&
            (i + 1) % (columns - 1) !== 0 &&
            (i + 2) % (columns - 1) !== 0 &&
            allBox[i + 1]?.id === sign &&
            allBox[i + 2]?.id === sign &&
            allBox[i + 3]?.id === sign &&
            allBox[i - 1]?.id !== notSign &&
            allBox[i + 4]?.id !== notSign
          ) {
            win = true;
          }

          // Theo hàng dọc
          if (
            // Chọn cuối ở giữa
            allBox[i - columns]?.id === sign &&
            allBox[i + columns]?.id === sign &&
            ((allBox[i - 2 * columns]?.id === sign &&
              allBox[i + 2 * columns]?.id !== notSign &&
              allBox[i - 3 * columns]?.id !== notSign) ||
              (allBox[i - 2 * columns]?.id !== notSign &&
                allBox[i + 2 * columns]?.id === sign &&
                allBox[i + 3 * columns]?.id !== notSign))
          ) {
            win = true;
          } else if (
            // Chọn cuối ở dưới
            allBox[i - columns]?.id === sign &&
            allBox[i - 2 * columns]?.id === sign &&
            allBox[i - 3 * columns]?.id === sign &&
            allBox[i - 4 * columns]?.id !== notSign &&
            allBox[i + columns]?.id != notSign
          ) {
            win = true;
          } else if (
            // Chọn cuối ở trên
            allBox[i + columns]?.id === sign &&
            allBox[i + 2 * columns]?.id === sign &&
            allBox[i + 3 * columns]?.id === sign &&
            allBox[i + 4 * columns]?.id !== notSign &&
            allBox[i - columns]?.id != notSign
          ) {
            win = true;
          }
          //Theo đường chéo trên trái
          if (
            // Chọn cuối ở giữa
            allBox[i - columns - 1]?.id === sign &&
            allBox[i + columns + 1]?.id === sign &&
            ((allBox[i - 2 * columns - 2]?.id === sign &&
              allBox[i + 2 * columns + 2]?.id !== notSign &&
              allBox[i - 3 * columns - 3]?.id !== notSign) ||
              (allBox[i + 2 * columns + 2]?.id === sign &&
                allBox[i - 2 * columns - 2]?.id !== notSign &&
                allBox[i + 3 * columns + 3]?.id !== notSign))
          ) {
            win = true;
          }
          // Chọn cuối ở dưới
          else if (
            allBox[i - columns - 1]?.id === sign &&
            allBox[i - 2 * columns - 2]?.id === sign &&
            allBox[i - 3 * columns - 3]?.id === sign &&
            allBox[i - 4 * columns - 4]?.id !== notSign &&
            allBox[i + columns + 1]?.id !== notSign
          ) {
            win = true;
          }
          // Chọn cuối ở trên
          else if (
            allBox[i + columns + 1]?.id === sign &&
            allBox[i + 2 * columns + 2]?.id === sign &&
            allBox[i + 3 * columns + 3]?.id === sign &&
            allBox[i + 4 * columns + 4]?.id !== notSign &&
            allBox[i - columns - 1]?.id !== notSign
          ) {
            win = true;
          }
          //Theo đường chéo trên phải
          if (
            // Chọn cuối ở giữa
            allBox[i - columns + 1]?.id === sign &&
            allBox[i + columns - 1]?.id === sign &&
            ((allBox[i - 2 * columns + 2]?.id === sign &&
              allBox[i + 2 * columns - 2]?.id !== notSign &&
              allBox[i - 3 * columns + 3]?.id !== notSign) ||
              (allBox[i - 2 * columns + 2]?.id !== notSign &&
                allBox[i + 2 * columns - 2]?.id === sign &&
                allBox[i + 3 * columns - 3]?.id !== notSign))
          ) {
            win = true;
          }
          // Chọn cuối ở dưới
          else if (
            allBox[i - columns + 1]?.id === sign &&
            allBox[i - 2 * columns + 2]?.id === sign &&
            allBox[i - 3 * columns + 3]?.id === sign &&
            allBox[i + columns - 1]?.id !== notSign &&
            allBox[i - 4 * columns + 4]?.id !== notSign
          ) {
            win = true;
          }
          // Chọn cuối ở trên
          else if (
            allBox[i + columns - 1]?.id === sign &&
            allBox[i + 2 * columns - 2]?.id === sign &&
            allBox[i + 3 * columns - 3]?.id === sign &&
            allBox[i - columns + 1]?.id === sign &&
            allBox[i + 4 * columns - 4]?.id !== notSign
          ) {
            win = true;
          }

          // Thông báo kết quả
          if (win) {
            playBox.classList.remove("show"); // Khi thắng ẩn play-box
            wonText.innerHTML = `Người chơi <span>${sign}</span> giành chiến thắng 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉`;
            resultBox.classList.add("show"); // Hiện bảng kết quả
          } else if (count === rows * columns) {
            playBox.classList.remove("show"); // Khi thắng ẩn play-box
            wonText.innerHTML = `Chưa tìm thấy người thắng rồi 😊😊😊😊😊😊😊😊😊😊😊`;
            resultBox.classList.add("show"); // Hiện bảng kết quả
          }
        };

        const handleCellClick = () => {
          count++;
          if (xTurn.classList.contains("active")) {
            allBox[i].innerHTML = '<i  class="fa-solid fa-xmark "></i>'; // Khi nhấn vào ô thì hiện dấu X
            allBox[i].setAttribute("id", "X"); // Thêm id = "X"

            sign = "X";
            notSign = "O";

            xTurn.classList.remove("active"); // Khi X đánh xong chuyển thanh trạng thái từ X đánh
            oTurn.classList.add("active"); // sang O đánh
          } else if (oTurn.classList.contains("active")) {
            allBox[i].innerHTML = '<i class="fa-sharp fa-solid fa-o"></i>'; // Khi nhấn vào ô thì hiện dấu O
            allBox[i].setAttribute("id", "O"); // Thêm id = "O"

            sign = "O";
            notSign = "X";

            oTurn.classList.remove("active"); // Khi O đánh xong chuyển thanh trạng thái từ O đánh
            xTurn.classList.add("active"); // sang X đánh
          }
          check();
          allBox[i].removeEventListener("click", handleCellClick); // Khi một nút đã được chọn sẽ không chọn lại được
        };

        allBox[i].addEventListener("click", handleCellClick);
      }
    } else
      alert("Nhập sai ❌ Mời nhập lại ( 4 <= Row <= 14 và 4 <= Column <= 14)");
  } else alert("Nhập sai ❌. Row và Column phải là số nguyên!");
};

// Hàm replay
const handleReplayClick = () => {
  resultBox.classList.remove("show");
  selectBox.classList.add("show");
  window.location.reload(); //Khi nhấn nút Replay sẽ tải lại trang
};

document.querySelector(".btn-play").addEventListener("click", handlePlayClick);
replay.addEventListener("click", handleReplayClick);

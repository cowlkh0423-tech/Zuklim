// ============================================================
// CODE : 죽림고수
// main.js
// ============================================================


// ============================================================
// HTML 요소 가져오기
// ============================================================

const canvas =
    document.getElementById("gameCanvas");

const startScreen =
    document.getElementById("startScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


// ============================================================
// Canvas
// ============================================================

const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


// ============================================================
// 키보드
// ============================================================

const keys = {};


// 키를 누름

window.addEventListener(
    "keydown",
    (event) => {

        // 방향키가 웹페이지를 스크롤하지 않도록 함

        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

        }


        keys[event.key] = true;

    },
    {
        passive: false
    }
);


// 키를 뗌

window.addEventListener(
    "keyup",
    (event) => {

        keys[event.key] = false;

    }
);


// 창을 벗어났을 때 키 초기화

window.addEventListener(
    "blur",
    () => {

        for (
            const key in keys
        ) {

            keys[key] = false;

        }

    }
);


// ============================================================
// 게임 상태
// ============================================================

let gameStarted = false;


// ============================================================
// 게임 시작
// ============================================================

function startGame() {

    gameStarted = true;

    startScreen.classList.add(
        "hidden"
    );

    gameOverScreen.classList.add(
        "hidden"
    );

}


// ============================================================
// 게임 오버
// ============================================================

function showGameOver() {

    gameStarted = false;

    gameOverScreen.classList.remove(
        "hidden"
    );

}


// ============================================================
// 시작 버튼
// ============================================================

startButton.addEventListener(
    "click",
    () => {

        startGame();

    }
);


// ============================================================
// 재시작 버튼
// ============================================================

restartButton.addEventListener(
    "click",
    () => {

        startGame();

    }
);


// ============================================================
// R 키
// ============================================================

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "r"
        ) {

            if (!gameStarted) {

                startGame();

            }

        }

    }
);


// ============================================================
// 테스트 렌더링
//
// game.js를 연결하기 전까지 사용하는 임시 렌더링.
// 지금 단계에서는 플레이어가 아니라
// Canvas가 정상적으로 작동하는지만 확인한다.
// ============================================================

function render() {

    // Canvas 초기화

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // 테스트용 어두운 배경

    ctx.fillStyle =
        "#071008";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // 황금색 CODE

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.font =
        "bold " +
        Math.min(
            130,
            canvas.width * 0.13
        ) +
        "px Georgia";


    ctx.fillStyle =
        "rgba(216, 182, 90, 0.06)";


    ctx.fillText(
        "CODE",
        canvas.width / 2,
        canvas.height / 2
    );


    ctx.restore();


    // 다음 프레임

    requestAnimationFrame(
        render
    );

}


// ============================================================
// 렌더링 시작
// ============================================================

render();

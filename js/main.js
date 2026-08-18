// ============================================================
// CODE : 죽림고수
// main.js
// ============================================================

import { Game } from "./game.js";


// ============================================================
// HTML
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


// ============================================================
// 키보드
// ============================================================

const keys = {};


// 키를 누름

window.addEventListener(
    "keydown",
    (event) => {

        const key = event.key;


        // 방향키로 페이지가 움직이지 않게

        if (
            key === "ArrowUp" ||
            key === "ArrowDown" ||
            key === "ArrowLeft" ||
            key === "ArrowRight"
        ) {

            event.preventDefault();

        }


        keys[key] = true;

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


// 창을 벗어나면 모든 키 해제

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
// Game 생성
// ============================================================

const game =
    new Game(
        canvas,
        keys
    );


// ============================================================
// 화면 크기 변경
// ============================================================

window.addEventListener(
    "resize",
    () => {

        game.resize();

    }
);


// ============================================================
// 게임 시작
// ============================================================

function startGame() {

    // 시작 화면 제거

    startScreen.classList.add(
        "hidden"
    );


    // 게임 오버 화면 제거

    gameOverScreen.classList.add(
        "hidden"
    );


    // 게임 시작

    game.start();

}


// ============================================================
// 게임 시작 버튼
// ============================================================

startButton.addEventListener(
    "click",
    () => {

        startGame();

    }
);


// ============================================================
// 다시 시작 버튼
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

            startGame();

        }

    }
);


// ============================================================
// 시작 전 Canvas 배경
// ============================================================

function drawPreview() {

    const width =
        canvas.width;

    const height =
        canvas.height;


    // 배경

    ctx.fillStyle =
        "#071008";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // CODE

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "bold " +
        Math.min(
            150,
            width * 0.14
        ) +
        "px Georgia";

    ctx.fillStyle =
        "rgba(216, 182, 90, 0.055)";

    ctx.fillText(
        "CODE",
        width / 2,
        height / 2
    );

    ctx.restore();

}


// 처음 화면 그리기

drawPreview();

// ============================================================
// CODE : 죽림고수
// main.js
// ============================================================

import { Game } from "./game.js";


// ============================================================
// Canvas
// ============================================================

const canvas =
    document.getElementById("gameCanvas");


// Canvas가 없으면 실행 중단

if (!canvas) {

    console.error(
        "gameCanvas를 찾을 수 없습니다."
    );

    throw new Error(
        "gameCanvas missing"
    );

}


// ============================================================
// 키보드
// ============================================================

const keys = {

    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false

};


// ============================================================
// 키 입력
// ============================================================

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key in keys
        ) {

            keys[event.key] = true;

            event.preventDefault();

        }


        // R = 재시작

        if (
            event.key.toLowerCase() === "r"
        ) {

            if (
                game.gameOver
            ) {

                gameOverScreen.classList.add(
                    "hidden"
                );

                game.start();

            }

        }

    }
);


window.addEventListener(
    "keyup",
    (event) => {

        if (
            event.key in keys
        ) {

            keys[event.key] = false;

            event.preventDefault();

        }

    }
);


// ============================================================
// Game
// ============================================================

const game =
    new Game(
        canvas,
        keys
    );


// ============================================================
// 화면 크기
// ============================================================

function resize() {

    game.resize();

}


window.addEventListener(
    "resize",
    resize
);


resize();


// ============================================================
// UI
// ============================================================

const startScreen =
    document.getElementById(
        "startScreen"
    );


const gameOverScreen =
    document.getElementById(
        "gameOverScreen"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


const restartButton =
    document.getElementById(
        "restartButton"
    );


// ============================================================
// 게임 시작 버튼
// ============================================================

startButton.addEventListener(
    "click",
    () => {

        startScreen.classList.add(
            "hidden"
        );

        gameOverScreen.classList.add(
            "hidden"
        );

        game.start();

    }
);


// ============================================================
// 재시작 버튼
// ============================================================

restartButton.addEventListener(
    "click",
    () => {

        gameOverScreen.classList.add(
            "hidden"
        );

        game.start();

    }
);

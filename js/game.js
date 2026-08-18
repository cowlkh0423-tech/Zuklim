// ============================================================
// CODE : 죽림고수
// game.js
// ============================================================

import { Player } from "./player.js";


// ============================================================
// Game
// ============================================================

export class Game {

    constructor(canvas, keys) {

        // ----------------------------------------------------
        // Canvas
        // ----------------------------------------------------

        this.canvas = canvas;

        this.ctx =
            canvas.getContext("2d");


        // ----------------------------------------------------
        // 키
        // ----------------------------------------------------

        this.keys = keys;


        // ----------------------------------------------------
        // 게임 상태
        // ----------------------------------------------------

        this.running = false;

        this.gameOver = false;


        // ----------------------------------------------------
        // 시간
        // ----------------------------------------------------

        this.startTime = 0;

        this.survivalTime = 0;

        this.lastTime =
            performance.now();


        // ----------------------------------------------------
        // 최고 기록
        // ----------------------------------------------------

        this.bestTime =
            Number(
                localStorage.getItem(
                    "code-juklim-best"
                )
            ) || 0;


        // ----------------------------------------------------
        // 플레이어
        // ----------------------------------------------------

        this.player =
            new Player(
                canvas.width / 2,
                canvas.height / 2
            );


        // ----------------------------------------------------
        // Canvas 크기 변경
        // ----------------------------------------------------

        window.addEventListener(
            "resize",
            () => {

                this.resize();

            }
        );

    }


    // ========================================================
    // Canvas 크기
    // ========================================================

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;


        // 플레이어가 화면 밖으로 나가지 않도록

        this.player.x =
            Math.min(
                this.player.x,
                this.canvas.width -
                this.player.radius
            );


        this.player.y =
            Math.min(
                this.player.y,
                this.canvas.height -
                this.player.radius
            );

    }


    // ========================================================
    // 게임 시작
    // ========================================================

    start() {

        this.running = true;

        this.gameOver = false;

        this.survivalTime = 0;

        this.startTime =
            performance.now();

        this.lastTime =
            performance.now();


        // 플레이어 중앙 배치

        this.player.reset(
            this.canvas.width / 2,
            this.canvas.height / 2
        );


        // 게임 루프 시작

        requestAnimationFrame(
            (time) => {

                this.loop(time);

            }
        );

    }


    // ========================================================
    // 게임 종료
    // ========================================================

    endGame() {

        if (!this.running) {

            return;

        }


        this.running = false;

        this.gameOver = true;


        // 최고 기록 갱신

        if (
            this.survivalTime >
            this.bestTime
        ) {

            this.bestTime =
                this.survivalTime;


            localStorage.setItem(
                "code-juklim-best",
                this.bestTime.toString()
            );

        }


        // HTML 업데이트

        const finalTime =
            document.getElementById(
                "finalTime"
            );

        const finalBest =
            document.getElementById(
                "finalBest"
            );


        if (finalTime) {

            finalTime.textContent =
                this.survivalTime.toFixed(2);

        }


        if (finalBest) {

            finalBest.textContent =
                this.bestTime.toFixed(2);

        }


        // 게임 오버 화면

        const gameOverScreen =
            document.getElementById(
                "gameOverScreen"
            );


        if (gameOverScreen) {

            gameOverScreen.classList.remove(
                "hidden"
            );

        }

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        // ----------------------------------------------------
        // 생존 시간
        // ----------------------------------------------------

        this.survivalTime =
            (
                performance.now() -
                this.startTime
            ) / 1000;


        // ----------------------------------------------------
        // 플레이어
        // ----------------------------------------------------

        this.player.update(
            delta,
            this.keys,
            this.canvas.width,
            this.canvas.height
        );


        // ----------------------------------------------------
        // HUD
        // ----------------------------------------------------

        const time =
            document.getElementById(
                "time"
            );

        const best =
            document.getElementById(
                "best"
            );


        if (time) {

            time.textContent =
                this.survivalTime.toFixed(2);

        }


        if (best) {

            best.textContent =
                this.bestTime.toFixed(2);

        }


        // ----------------------------------------------------
        // 체력
        // ----------------------------------------------------

        const life =
            document.getElementById(
                "life"
            );


        if (life) {

            life.textContent =
                this.player.health > 0
                    ? "♥"
                    : "";

        }


        // ----------------------------------------------------
        // 사망
        // ----------------------------------------------------

        if (
            this.player.health <= 0
        ) {

            this.endGame();

        }

    }


    // ========================================================
    // 배경
    // ========================================================

    drawBackground() {

        const ctx = this.ctx;

        const width =
            this.canvas.width;

        const height =
            this.canvas.height;


        // ----------------------------------------------------
        // 기본 배경
        // ----------------------------------------------------

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );


        gradient.addColorStop(
            0,
            "#061109"
        );


        gradient.addColorStop(
            0.5,
            "#0b1c0e"
        );


        gradient.addColorStop(
            1,
            "#030805"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        // ----------------------------------------------------
        // 중앙 빛
        // ----------------------------------------------------

        const glow =
            ctx.createRadialGradient(
                width / 2,
                height / 2,
                40,
                width / 2,
                height / 2,
                Math.max(
                    width,
                    height
                ) * 0.7
            );


        glow.addColorStop(
            0,
            "rgba(80,120,55,0.14)"
        );


        glow.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
            glow;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        // ----------------------------------------------------
        // 대나무
        // ----------------------------------------------------

        for (
            let x = -20;
            x < width + 40;
            x += 75
        ) {

            this.drawBamboo(
                x,
                height
            );

        }


        // ----------------------------------------------------
        // CODE
        // ----------------------------------------------------

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
            "rgba(216,182,90,0.055)";

        ctx.shadowColor =
            "rgba(216,182,90,0.15)";

        ctx.shadowBlur = 20;

        ctx.fillText(
            "CODE",
            width / 2,
            height / 2
        );

        ctx.restore();

    }


    // ========================================================
    // 대나무
    // ========================================================

    drawBamboo(x, height) {

        const ctx = this.ctx;

        const width = 18;


        // 줄기

        ctx.fillStyle =
            "#17371d";


        ctx.fillRect(
            x,
            0,
            width,
            height
        );


        // 밝은 부분

        ctx.fillStyle =
            "#2b552d";


        ctx.fillRect(
            x + 3,
            0,
            3,
            height
        );


        // 마디

        ctx.fillStyle =
            "#0a2010";


        for (
            let y = 50;
            y < height;
            y += 75
        ) {

            ctx.fillRect(
                x - 2,
                y,
                width + 4,
                6
            );

        }

    }


    // ========================================================
    // 렌더링
    // ========================================================

    draw() {

        // 배경

        this.drawBackground();


        // 플레이어

        this.player.draw(
            this.ctx
        );

    }


    // ========================================================
    // 게임 루프
    // ========================================================

    loop(time) {

        if (!this.running) {

            return;

        }


        // ----------------------------------------------------
        // Delta time
        // ----------------------------------------------------

        let delta =
            (time - this.lastTime) /
            1000;


        this.lastTime = time;


        // 너무 큰 값 방지

        delta =
            Math.min(
                delta,
                0.05
            );


        // ----------------------------------------------------
        // 업데이트
        // ----------------------------------------------------

        this.update(
            delta
        );


        // ----------------------------------------------------
        // 그리기
        // ----------------------------------------------------

        this.draw();


        // ----------------------------------------------------
        // 다음 프레임
        // ----------------------------------------------------

        if (this.running) {

            requestAnimationFrame(
                (nextTime) => {

                    this.loop(
                        nextTime
                    );

                }
            );

        }

    }

}

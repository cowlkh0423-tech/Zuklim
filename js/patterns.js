// ============================================================
// CODE : 죽림고수
// game.js
// ============================================================

import { Player } from "./player.js";
import { Arrow } from "./arrow.js";


// ============================================================
// Game
// ============================================================

export class Game {

    constructor(canvas, keys) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.keys = keys;

        // 게임 상태
        this.running = false;
        this.gameOver = false;

        // 시간
        this.startTime = 0;
        this.survivalTime = 0;
        this.lastTime = 0;

        // 화살
        this.arrows = [];

        // 다음 화살까지 시간
        this.arrowTimer = 0;

        // 처음에는 조금 여유 있게
        this.arrowInterval = 1.0;

        // 최고 기록
        this.bestTime =
            Number(
                localStorage.getItem(
                    "code-juklim-best"
                )
            ) || 0;

        // 플레이어
        this.player =
            new Player(
                canvas.width / 2,
                canvas.height / 2
            );

    }


    // ========================================================
    // 화면 크기
    // ========================================================

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;


        this.player.x =
            Math.max(
                this.player.radius,
                Math.min(
                    this.player.x,
                    this.canvas.width -
                    this.player.radius
                )
            );


        this.player.y =
            Math.max(
                this.player.radius,
                Math.min(
                    this.player.y,
                    this.canvas.height -
                    this.player.radius
                )
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

        this.arrowTimer = 0;

        this.arrows = [];

        this.arrowInterval = 1.0;


        // 플레이어 초기화

        this.player.reset(
            this.canvas.width / 2,
            this.canvas.height / 2
        );


        // 게임 루프

        requestAnimationFrame(
            (time) => {
                this.loop(time);
            }
        );

    }


    // ========================================================
    // 게임 오버
    // ========================================================

    endGame() {

        if (!this.running) {
            return;
        }

        this.running = false;
        this.gameOver = true;


        // 최고 기록

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


        // 결과 표시

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
    // 화살 생성
    // ========================================================

    spawnArrow() {

        const width =
            this.canvas.width;

        const height =
            this.canvas.height;


        // 화면의 네 방향 중 하나에서 생성

        const side =
            Math.floor(
                Math.random() * 4
            );


        let x;
        let y;
        let vx;
        let vy;


        const margin = 40;


        // 위

        if (side === 0) {

            x =
                Math.random() *
                width;

            y = -margin;

            vx = 0;
            vy = 1;

        }


        // 오른쪽

        else if (side === 1) {

            x =
                width + margin;

            y =
                Math.random() *
                height;

            vx = -1;
            vy = 0;

        }


        // 아래

        else if (side === 2) {

            x =
                Math.random() *
                width;

            y =
                height + margin;

            vx = 0;
            vy = -1;

        }


        // 왼쪽

        else {

            x = -margin;

            y =
                Math.random() *
                height;

            vx = 1;
            vy = 0;

        }


        // 화살 생성

        const arrow =
            new Arrow(
                x,
                y,
                vx,
                vy,
                430
            );


        this.arrows.push(
            arrow
        );

    }


    // ========================================================
    // 화살 업데이트
    // ========================================================

    updateArrows(delta) {

        // 화살 생성 타이머

        this.arrowTimer -= delta;


        if (
            this.arrowTimer <= 0
        ) {

            this.spawnArrow();

            this.arrowTimer =
                this.arrowInterval;

        }


        // 화살 이동

        for (
            const arrow of this.arrows
        ) {

            arrow.update(
                delta
            );


            // 충돌

            if (
                arrow.collidesWith(
                    this.player
                )
            ) {

                this.player.takeDamage();

                arrow.active = false;

            }


            // 화면 밖

            if (
                arrow.isOutside(
                    this.canvas.width,
                    this.canvas.height
                )
            ) {

                arrow.active = false;

            }

        }


        // 필요 없는 화살 제거

        this.arrows =
            this.arrows.filter(
                (arrow) =>
                    arrow.active
            );

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        // 생존 시간

        this.survivalTime =
            (
                performance.now() -
                this.startTime
            ) / 1000;


        // 플레이어

        this.player.update(
            delta,
            this.keys,
            this.canvas.width,
            this.canvas.height
        );


        // 화살

        this.updateArrows(
            delta
        );


        // ----------------------------------------------------
        // 난이도 증가
        // ----------------------------------------------------

        // 시간이 지날수록 화살이 조금씩 빨라짐

        const difficulty =
            Math.min(
                this.survivalTime / 10,
                1
            );


        // 10초가 되면 약 2배 가까이 자주 생성

        this.arrowInterval =
            1.0 -
            difficulty * 0.48;


        // HUD

        const time =
            document.getElementById(
                "time"
            );

        const best =
            document.getElementById(
                "best"
            );

        const life =
            document.getElementById(
                "life"
            );


        if (time) {

            time.textContent =
                this.survivalTime.toFixed(2);

        }


        if (best) {

            best.textContent =
                this.bestTime.toFixed(2);

        }


        if (life) {

            life.textContent =
                this.player.health > 0
                    ? "♥"
                    : "";

        }


        // 사망

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


        // 기본 배경

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


        // 중앙 빛

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


        // 대나무

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

    drawBamboo(
        x,
        height
    ) {

        const ctx = this.ctx;

        const width = 18;


        ctx.fillStyle =
            "#17371d";


        ctx.fillRect(
            x,
            0,
            width,
            height
        );


        ctx.fillStyle =
            "#2b552d";


        ctx.fillRect(
            x + 3,
            0,
            3,
            height
        );


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


        // 화살

        for (
            const arrow of this.arrows
        ) {

            arrow.draw(
                this.ctx
            );

        }


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


        // Delta time

        let delta =
            (
                time -
                this.lastTime
            ) / 1000;


        this.lastTime =
            time;


        // 프레임이 순간적으로 느려져도
        // 게임이 폭주하지 않게 함

        delta =
            Math.min(
                delta,
                0.05
            );


        // 업데이트

        this.update(
            delta
        );


        // 그리기

        this.draw();


        // 다음 프레임

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

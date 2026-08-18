// ============================================================
// CODE : 죽림고수
// patterns.js
// 화살 패턴 관리자
// ============================================================

import { Arrow } from "./arrow.js";


export class PatternManager {

    constructor(game) {

        this.game = game;

        this.elapsed = 0;

        this.patternTimer = 0;

        this.patternIndex = 0;

        // 패턴 사이의 기본 간격

        this.interval = 0.9;

    }


    // ========================================================
    // 초기화
    // ========================================================

    reset() {

        this.elapsed = 0;

        this.patternTimer = 0;

        this.patternIndex = 0;

        this.interval = 0.9;

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        this.elapsed += delta;

        this.patternTimer -= delta;


        // 시간이 지나면 패턴 실행

        if (
            this.patternTimer <= 0
        ) {

            this.firePattern();

            this.patternTimer =
                this.getInterval();

        }

    }


    // ========================================================
    // 패턴 간격
    // ========================================================

    getInterval() {

        const time =
            this.elapsed;


        // 초반

        if (time < 3) {

            return 0.85;

        }


        // 3~6초

        if (time < 6) {

            return 0.7;

        }


        // 6~10초

        if (time < 10) {

            return 0.58;

        }


        // 10초 이후

        return 0.48;

    }


    // ========================================================
    // 패턴 선택
    // ========================================================

    firePattern() {

        const time =
            this.elapsed;


        // ----------------------------------------------------
        // 초반
        // ----------------------------------------------------

        if (time < 2) {

            this.straight();

            return;

        }


        // ----------------------------------------------------
        // 2~4초
        // ----------------------------------------------------

        if (time < 4) {

            const patterns = [

                () => this.straight(),

                () => this.diagonal(),

                () => this.aimed()

            ];


            this.randomPattern(
                patterns
            );

            return;

        }


        // ----------------------------------------------------
        // 4~7초
        // ----------------------------------------------------

        if (time < 7) {

            const patterns = [

                () => this.doubleSide(),

                () => this.cross(),

                () => this.fan(),

                () => this.aimed()

            ];


            this.randomPattern(
                patterns
            );

            return;

        }


        // ----------------------------------------------------
        // 7~10초
        // ----------------------------------------------------

        if (time < 10) {

            const patterns = [

                () => this.doubleSide(),

                () => this.cross(),

                () => this.fan(),

                () => this.circle(),

                () => this.aimed()

            ];


            this.randomPattern(
                patterns
            );

            return;

        }


        // ----------------------------------------------------
        // 10초 이후
        // ----------------------------------------------------

        const patterns = [

            () => this.doubleSide(),

            () => this.cross(),

            () => this.fan(),

            () => this.circle(),

            () => this.aimed(),

            () => this.complex()

        ];


        this.randomPattern(
            patterns
        );

    }


    // ========================================================
    // 랜덤 패턴
    // ========================================================

    randomPattern(patterns) {

        const index =
            Math.floor(
                Math.random() *
                patterns.length
            );


        patterns[index]();

    }


    // ========================================================
    // 1. 직선
    // ========================================================

    straight() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        let x;
        let y;
        let vx;
        let vy;


        const margin = 50;


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


        game.arrows.push(
            new Arrow(
                x,
                y,
                vx,
                vy,
                430
            )
        );

    }


    // ========================================================
    // 2. 대각선
    // ========================================================

    diagonal() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const directions = [

            {
                x: -1,
                y: -1
            },

            {
                x: 1,
                y: -1
            },

            {
                x: -1,
                y: 1
            },

            {
                x: 1,
                y: 1
            }

        ];


        const direction =
            directions[
                Math.floor(
                    Math.random() *
                    directions.length
                )
            ];


        const margin = 50;


        let x =
            direction.x > 0
                ? -margin
                : width + margin;


        let y =
            direction.y > 0
                ? -margin
                : height + margin;


        const length =
            Math.sqrt(
                direction.x *
                direction.x +
                direction.y *
                direction.y
            );


        const vx =
            direction.x /
            length;

        const vy =
            direction.y /
            length;


        game.arrows.push(
            new Arrow(
                x,
                y,
                vx,
                vy,
                440
            )
        );

    }


    // ========================================================
    // 3. 양쪽
    // ========================================================

    doubleSide() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const y =
            Math.random() *
            height;


        // 왼쪽

        game.arrows.push(
            new Arrow(
                -50,
                y,
                1,
                0,
                450
            )
        );


        // 오른쪽

        game.arrows.push(
            new Arrow(
                width + 50,
                y,
                -1,
                0,
                450
            )
        );

    }


    // ========================================================
    // 4. 십자
    // ========================================================

    cross() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const speed = 430;


        // 위

        game.arrows.push(
            new Arrow(
                width / 2,
                -50,
                0,
                1,
                speed
            )
        );


        // 아래

        game.arrows.push(
            new Arrow(
                width / 2,
                height + 50,
                0,
                -1,
                speed
            )
        );


        // 왼쪽

        game.arrows.push(
            new Arrow(
                -50,
                height / 2,
                1,
                0,
                speed
            )
        );


        // 오른쪽

        game.arrows.push(
            new Arrow(
                width + 50,
                height / 2,
                -1,
                0,
                speed
            )
        );

    }


    // ========================================================
    // 5. 부채꼴
    // ========================================================

    fan() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const player =
            game.player;


        // 어느 방향에서 나올지

        const side =
            Math.floor(
                Math.random() * 4
            );


        let x;
        let y;

        let baseAngle;


        const margin = 60;


        if (side === 0) {

            x =
                width *
                Math.random();

            y = -margin;

            baseAngle =
                Math.PI / 2;

        }


        else if (side === 1) {

            x =
                width + margin;

            y =
                height *
                Math.random();

            baseAngle =
                Math.PI;

        }


        else if (side === 2) {

            x =
                width *
                Math.random();

            y =
                height + margin;

            baseAngle =
                -Math.PI / 2;

        }


        else {

            x = -margin;

            y =
                height *
                Math.random();

            baseAngle = 0;

        }


        // 화살 5개

        const count = 5;

        const spread =
            Math.PI / 5;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                baseAngle +
                (
                    i -
                    (count - 1) / 2
                ) *
                spread;


            game.arrows.push(
                new Arrow(
                    x,
                    y,
                    Math.cos(angle),
                    Math.sin(angle),
                    400
                )
            );

        }

    }


    // ========================================================
    // 6. 플레이어 조준
    // ========================================================

    aimed() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const player =
            game.player;


        const side =
            Math.floor(
                Math.random() * 4
            );


        let x;
        let y;


        const margin = 60;


        if (side === 0) {

            x =
                Math.random() *
                width;

            y = -margin;

        }


        else if (side === 1) {

            x =
                width + margin;

            y =
                Math.random() *
                height;

        }


        else if (side === 2) {

            x =
                Math.random() *
                width;

            y =
                height + margin;

        }


        else {

            x = -margin;

            y =
                Math.random() *
                height;

        }


        const dx =
            player.x - x;

        const dy =
            player.y - y;


        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const vx =
            dx / length;

        const vy =
            dy / length;


        game.arrows.push(
            new Arrow(
                x,
                y,
                vx,
                vy,
                460
            )
        );

    }


    // ========================================================
    // 7. 원형
    // ========================================================

    circle() {

        const game =
            this.game;

        const width =
            game.canvas.width;

        const height =
            game.canvas.height;


        const centerX =
            width / 2;

        const centerY =
            height / 2;


        const count = 10;

        const speed = 360;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                (
                    Math.PI * 2 *
                    i
                ) /
                count;


            game.arrows.push(
                new Arrow(
                    centerX,
                    centerY,
                    Math.cos(angle),
                    Math.sin(angle),
                    speed
                )
            );

        }

    }


    // ========================================================
    // 8. 복합 패턴
    // ========================================================

    complex() {

        // 부채꼴

        this.fan();


        // 약간의 랜덤 시간차 대신
        // 서로 다른 위치에서 추가 공격


        setTimeout(
            () => {

                if (
                    !this.game.running
                ) {
                    return;
                }

                this.doubleSide();

            },
            180
        );


        setTimeout(
            () => {

                if (
                    !this.game.running
                ) {
                    return;
                }

                this.aimed();

            },
            360
        );

    }

}

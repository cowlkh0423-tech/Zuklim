// ============================================================
// CODE : 죽림고수
// patterns.js
// ============================================================

import { Arrow } from "./arrow.js";


export class PatternManager {

    constructor(game) {

        this.game = game;

        this.timer = 0;

        this.elapsed = 0;

    }


    // ========================================================
    // 초기화
    // ========================================================

    reset() {

        this.timer = 0;

        this.elapsed = 0;

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        this.elapsed += delta;

        this.timer -= delta;


        if (this.timer <= 0) {

            this.choosePattern();

            this.timer =
                this.getInterval();

        }

    }


    // ========================================================
    // 시간이 지날수록 빨라짐
    // ========================================================

    getInterval() {

        if (this.elapsed < 2) {
            return 0.9;
        }

        if (this.elapsed < 4) {
            return 0.7;
        }

        if (this.elapsed < 6) {
            return 0.55;
        }

        if (this.elapsed < 8) {
            return 0.42;
        }

        if (this.elapsed < 10) {
            return 0.34;
        }

        return 0.28;
    }


    // ========================================================
    // 패턴 선택
    // ========================================================

    choosePattern() {

        const time =
            this.elapsed;


        // --------------------------------------------
        // 0~2초
        // --------------------------------------------

        if (time < 2) {

            this.straight();

            return;
        }


        // --------------------------------------------
        // 2~4초
        // --------------------------------------------

        if (time < 4) {

            this.random([

                () => this.straight(),

                () => this.diagonal(),

                () => this.aim()

            ]);

            return;
        }


        // --------------------------------------------
        // 4~6초
        // --------------------------------------------

        if (time < 6) {

            this.random([

                () => this.double(),

                () => this.cross(),

                () => this.fan(),

                () => this.aim()

            ]);

            return;
        }


        // --------------------------------------------
        // 6~8초
        // --------------------------------------------

        if (time < 8) {

            this.random([

                () => this.fan(),

                () => this.bigFan(),

                () => this.cross(),

                () => this.aimTriple()

            ]);

            return;
        }


        // --------------------------------------------
        // 8~10초
        // --------------------------------------------

        if (time < 10) {

            this.random([

                () => this.bigFan(),

                () => this.circle(),

                () => this.aimTriple(),

                () => this.double(),

                () => this.cross()

            ]);

            return;
        }


        // --------------------------------------------
        // 10초 이후
        // --------------------------------------------

        this.random([

            () => this.bigFan(),

            () => this.circle(),

            () => this.aimTriple(),

            () => this.cross(),

            () => this.combination()

        ]);

    }


    // ========================================================
    // 랜덤 선택
    // ========================================================

    random(patterns) {

        const index =
            Math.floor(
                Math.random() *
                patterns.length
            );


        patterns[index]();

    }


    // ========================================================
    // 화살 추가
    // ========================================================

    addArrow(
        x,
        y,
        vx,
        vy,
        speed = 430
    ) {

        this.game.arrows.push(

            new Arrow(
                x,
                y,
                vx,
                vy,
                speed
            )

        );

    }


    // ========================================================
    // 1. 직선
    // ========================================================

    straight() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        if (side === 0) {

            this.addArrow(

                Math.random() * width,
                -margin,

                0,
                1

            );

        }


        else if (side === 1) {

            this.addArrow(

                width + margin,
                Math.random() * height,

                -1,
                0

            );

        }


        else if (side === 2) {

            this.addArrow(

                Math.random() * width,
                height + margin,

                0,
                -1

            );

        }


        else {

            this.addArrow(

                -margin,
                Math.random() * height,

                1,
                0

            );

        }

    }


    // ========================================================
    // 2. 대각선
    // ========================================================

    diagonal() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const directions = [

            [-1, -1],

            [1, -1],

            [-1, 1],

            [1, 1]

        ];


        const d =
            directions[
                Math.floor(
                    Math.random() *
                    directions.length
                )
            ];


        const length =
            Math.sqrt(2);


        this.addArrow(

            d[0] < 0
                ? width + 70
                : -70,

            d[1] < 0
                ? height + 70
                : -70,

            d[0] / length,
            d[1] / length,

            450

        );

    }


    // ========================================================
    // 3. 양쪽
    // ========================================================

    double() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const y =
            Math.random() * height;


        this.addArrow(
            -70,
            y,
            1,
            0,
            440
        );


        this.addArrow(
            width + 70,
            y,
            -1,
            0,
            440
        );

    }


    // ========================================================
    // 4. 십자
    // ========================================================

    cross() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const speed = 420;


        this.addArrow(
            width / 2,
            -70,
            0,
            1,
            speed
        );


        this.addArrow(
            width + 70,
            height / 2,
            -1,
            0,
            speed
        );


        this.addArrow(
            width / 2,
            height + 70,
            0,
            -1,
            speed
        );


        this.addArrow(
            -70,
            height / 2,
            1,
            0,
            speed
        );

    }


    // ========================================================
    // 5. 부채꼴
    // ========================================================

    fan() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        let x;
        let y;
        let baseAngle;


        if (side === 0) {

            x =
                Math.random() * width;

            y = -margin;

            baseAngle =
                Math.PI / 2;

        }


        else if (side === 1) {

            x = width + margin;

            y =
                Math.random() * height;

            baseAngle =
                Math.PI;

        }


        else if (side === 2) {

            x =
                Math.random() * width;

            y = height + margin;

            baseAngle =
                -Math.PI / 2;

        }


        else {

            x = -margin;

            y =
                Math.random() * height;

            baseAngle = 0;

        }


        const count = 5;

        const spread =
            Math.PI / 7;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                baseAngle +
                (
                    i - 2
                ) *
                spread;


            this.addArrow(

                x,
                y,

                Math.cos(angle),
                Math.sin(angle),

                410

            );

        }

    }


    // ========================================================
    // 6. 대형 부채꼴
    // ========================================================

    bigFan() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        let x;
        let y;
        let baseAngle;


        if (side === 0) {

            x =
                Math.random() * width;

            y = -margin;

            baseAngle =
                Math.PI / 2;

        }


        else if (side === 1) {

            x = width + margin;

            y =
                Math.random() * height;

            baseAngle =
                Math.PI;

        }


        else if (side === 2) {

            x =
                Math.random() * width;

            y = height + margin;

            baseAngle =
                -Math.PI / 2;

        }


        else {

            x = -margin;

            y =
                Math.random() * height;

            baseAngle = 0;

        }


        const count = 9;

        const spread =
            Math.PI / 9;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                baseAngle +
                (
                    i - 4
                ) *
                spread;


            this.addArrow(

                x,
                y,

                Math.cos(angle),
                Math.sin(angle),

                440

            );

        }

    }


    // ========================================================
    // 7. 플레이어 조준
    // ========================================================

    aim() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;

        const player =
            this.game.player;


        const side =
            Math.floor(
                Math.random() * 4
            );


        const margin = 70;


        let x;
        let y;


        if (side === 0) {

            x =
                Math.random() * width;

            y = -margin;

        }


        else if (side === 1) {

            x = width + margin;

            y =
                Math.random() * height;

        }


        else if (side === 2) {

            x =
                Math.random() * width;

            y = height + margin;

        }


        else {

            x = -margin;

            y =
                Math.random() * height;

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


        this.addArrow(

            x,
            y,

            dx / length,
            dy / length,

            470

        );

    }


    // ========================================================
    // 8. 조준 3연발
    // ========================================================

    aimTriple() {

        this.aim();


        setTimeout(
            () => {

                if (
                    this.game.running
                ) {

                    this.aim();

                }

            },
            120
        );


        setTimeout(
            () => {

                if (
                    this.game.running
                ) {

                    this.aim();

                }

            },
            240
        );

    }


    // ========================================================
    // 9. 원형
    // ========================================================

    circle() {

        const width =
            this.game.canvas.width;

        const height =
            this.game.canvas.height;


        const cx =
            width / 2;

        const cy =
            height / 2;


        const count = 12;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =
                (
                    Math.PI * 2 * i
                ) /
                count;


            this.addArrow(

                cx,
                cy,

                Math.cos(angle),
                Math.sin(angle),

                360

            );

        }

    }


    // ========================================================
    // 10. 복합 패턴
    // ========================================================

    combination() {

        this.fan();


        setTimeout(
            () => {

                if (
                    !this.game.running
                ) {
                    return;
                }

                this.double();

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

                this.aimTriple();

            },
            360
        );

    }

}

// ============================================================
// CODE : 죽림고수
// arrow.js
// ============================================================

export class Arrow {

    constructor(
        x,
        y,
        vx,
        vy,
        speed = 450
    ) {

        // 위치
        this.x = x;
        this.y = y;

        // 방향
        this.vx = vx;
        this.vy = vy;

        // 속도
        this.speed = speed;

        // 화살 길이
        this.length = 28;

        // 충돌 반지름
        this.radius = 5;

        // 화살 활성화
        this.active = true;

    }


    // ========================================================
    // 업데이트
    // ========================================================

    update(delta) {

        this.x +=
            this.vx *
            this.speed *
            delta;

        this.y +=
            this.vy *
            this.speed *
            delta;

    }


    // ========================================================
    // 화면 밖인지 확인
    // ========================================================

    isOutside(
        width,
        height
    ) {

        const margin = 80;

        return (
            this.x < -margin ||
            this.x > width + margin ||
            this.y < -margin ||
            this.y > height + margin
        );

    }


    // ========================================================
    // 플레이어와 충돌
    // ========================================================

    collidesWith(player) {

        const dx =
            this.x - player.x;

        const dy =
            this.y - player.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        return (
            distance <
            this.radius +
            player.radius
        );

    }


    // ========================================================
    // 그리기
    // ========================================================

    draw(ctx) {

        if (!this.active) {
            return;
        }


        // 방향 벡터의 반대쪽

        const backX =
            this.x -
            this.vx *
            this.length;

        const backY =
            this.y -
            this.vy *
            this.length;


        ctx.save();


        // ====================================================
        // 화살의 빛
        // ====================================================

        ctx.shadowColor =
            "rgba(230, 210, 150, 0.7)";

        ctx.shadowBlur = 8;


        // ====================================================
        // 화살대
        // ====================================================

        ctx.strokeStyle =
            "#d7c18a";

        ctx.lineWidth = 3;

        ctx.lineCap =
            "round";


        ctx.beginPath();

        ctx.moveTo(
            backX,
            backY
        );

        ctx.lineTo(
            this.x,
            this.y
        );

        ctx.stroke();


        // ====================================================
        // 화살촉
        // ====================================================

        const headSize = 7;


        // 화살촉 중심

        const tipX =
            this.x;

        const tipY =
            this.y;


        // 수직 방향 벡터

        const px =
            -this.vy;

        const py =
            this.vx;


        ctx.fillStyle =
            "#eee0ad";


        ctx.beginPath();

        ctx.moveTo(
            tipX,
            tipY
        );

        ctx.lineTo(
            tipX -
            this.vx * headSize +
            px * headSize * 0.55,

            tipY -
            this.vy * headSize +
            py * headSize * 0.55
        );

        ctx.lineTo(
            tipX -
            this.vx * headSize -
            px * headSize * 0.55,

            tipY -
            this.vy * headSize -
            py * headSize * 0.55
        );

        ctx.closePath();

        ctx.fill();


        // ====================================================
        // 깃털
        // ====================================================

        ctx.shadowBlur = 0;

        ctx.strokeStyle =
            "#9b6f3d";

        ctx.lineWidth = 2;


        const featherX =
            this.x -
            this.vx *
            (this.length - 5);

        const featherY =
            this.y -
            this.vy *
            (this.length - 5);


        ctx.beginPath();

        ctx.moveTo(
            featherX,
            featherY
        );

        ctx.lineTo(
            featherX +
            px * 5,
            featherY +
            py * 5
        );

        ctx.moveTo(
            featherX,
            featherY
        );

        ctx.lineTo(
            featherX -
            px * 5,
            featherY -
            py * 5
        );

        ctx.stroke();


        ctx.restore();

    }

}

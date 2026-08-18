export class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 15;

        this.speed = 280;

        this.health = 1;
    }


    update(delta, keys, width, height) {

        let dx = 0;
        let dy = 0;


        // 방향키

        if (keys["ArrowUp"]) {
            dy -= 1;
        }

        if (keys["ArrowDown"]) {
            dy += 1;
        }

        if (keys["ArrowLeft"]) {
            dx -= 1;
        }

        if (keys["ArrowRight"]) {
            dx += 1;
        }


        // 대각선 이동 속도 보정

        const length =
            Math.sqrt(dx * dx + dy * dy);

        if (length > 0) {

            dx /= length;
            dy /= length;

        }


        // 이동

        this.x +=
            dx * this.speed * delta;

        this.y +=
            dy * this.speed * delta;


        // 화면 밖으로 못 나감

        this.x = Math.max(
            this.radius,
            Math.min(
                width - this.radius,
                this.x
            )
        );

        this.y = Math.max(
            this.radius,
            Math.min(
                height - this.radius,
                this.y
            )
        );

    }


    draw(ctx) {

        const x = this.x;
        const y = this.y;


        // 그림자

        ctx.save();

        ctx.fillStyle =
            "rgba(0,0,0,0.4)";

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + 18,
            18,
            7,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // 캐릭터

        ctx.shadowColor =
            "rgba(220,190,90,0.6)";

        ctx.shadowBlur = 12;


        // 몸

        ctx.fillStyle =
            "#496b43";

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + 7,
            13,
            16,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // 얼굴

        ctx.shadowBlur = 0;

        ctx.fillStyle =
            "#d9ad78";

        ctx.beginPath();

        ctx.arc(
            x,
            y - 6,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // 삿갓

        ctx.fillStyle =
            "#735a32";

        ctx.beginPath();

        ctx.moveTo(
            x,
            y - 28
        );

        ctx.lineTo(
            x - 21,
            y - 7
        );

        ctx.lineTo(
            x + 21,
            y - 7
        );

        ctx.closePath();

        ctx.fill();


        // 삿갓 테두리

        ctx.strokeStyle =
            "#302412";

        ctx.lineWidth = 2;

        ctx.stroke();


        // 눈

        ctx.fillStyle =
            "#17130c";

        ctx.fillRect(
            x - 4,
            y - 6,
            2,
            2
        );

        ctx.fillRect(
            x + 2,
            y - 6,
            2,
            2
        );


        ctx.restore();

    }

}

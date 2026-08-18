export class Arrow {

    constructor(x, y, vx, vy, speed = 400) {

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.speed = speed;

        this.active = true;

        this.length = 40;
        this.width = 6;
    }


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


    isOutside(width, height) {

        return (
            this.x < -100 ||
            this.x > width + 100 ||
            this.y < -100 ||
            this.y > height + 100
        );
    }


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
            player.radius + 10
        );
    }


    draw(ctx) {

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        const angle =
            Math.atan2(
                this.vy,
                this.vx
            );

        ctx.rotate(angle);


        // 화살 몸통

        ctx.fillStyle =
            "#d8b45c";

        ctx.fillRect(
            -20,
            -3,
            32,
            6
        );


        // 화살촉

        ctx.beginPath();

        ctx.moveTo(
            20,
            0
        );

        ctx.lineTo(
            8,
            -9
        );

        ctx.lineTo(
            8,
            9
        );

        ctx.closePath();

        ctx.fillStyle =
            "#f2d67c";

        ctx.fill();


        // 깃털

        ctx.beginPath();

        ctx.moveTo(
            -20,
            0
        );

        ctx.lineTo(
            -30,
            -7
        );

        ctx.lineTo(
            -26,
            0
        );

        ctx.lineTo(
            -30,
            7
        );

        ctx.closePath();

        ctx.fillStyle =
            "#8c7136";

        ctx.fill();


        ctx.restore();
    }
}

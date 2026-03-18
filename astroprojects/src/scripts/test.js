import p5 from 'p5';

export const createSketch = (targetElement) => {

    const sketch = (p) => {
        let nodeSize = 0;

        let rotation = 0;

        let offsetPos = {
            x: 0,
            y: 0
        }

        p.setup = () => {
            const canvas = p.createCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
            canvas.parent(targetElement);

            p.noStroke();
            p.fill(255);
        }

        p.draw = () => {
            p.blendMode(p.BLEND);
            p.background(255);
            p.blendMode(p.DIFFERENCE);

            nodeSize = 200 + 100 * p.sin(p.TAU * p.sin(p.frameCount * 0.002));

            rotation += p.PI * 0.002 * p.sin(p.TAU * p.sin(p.frameCount * 0.002));

            offsetPos.x = 600 * p.noise(p.frameCount * 0.002, 200) - 300;
            offsetPos.y = 600 * p.noise(p.frameCount * 0.002, 500) - 300;

            p.push();
            p.translate(p.width / 2 + offsetPos.x, p.height / 2 + offsetPos.y);
            p.rotate(rotation);
            for (let i = -30; i < 30; i++) {
                for (let j = -30; j < 50; j++) {
                    OO(1 * nodeSize * i, 1 * nodeSize * j, angle(p.frameCount), nodeSize / 2, nodeSize / 2 + nodeSize / 2 * p.sin((p.frameCount + i * 5) * 0.01), nodeSize / 8, p.frameCount + j * 5 + (120 * p.noise(i * 0.3, j * 0.3, p.frameCount * 0.01)));
                    //OO(-nodeSize*i,-nodeSize*j,0,nodeSize/2,nodeSize/4,nodeSize/8,frameCount+i*3);
                }
            }
            p.pop();
        }

        function OO(x, y, angle, size, length, offset, t) {
            p.push();
            p.translate(x, y);
            p.rotate(angle);
            p.circle(p.map(keyframe(t), 0, 1, -length, length) - offset, 0, size);
            p.circle(p.map(keyframe(t), 0, 1, length, -length) + offset, 0, size);
            p.pop();
        }

        function keyframe(t) {
            const duration = 480;
            let value = 0;
            let progress = (t % duration) / duration;

            if (progress < 0.2) {
                value = 0;
            } else if (progress < 0.3) {
                value = easeOutCubic(p.norm(progress, 0.2, 0.3));
            } else if (progress < 0.7) {
                value = 1;
            } else if (progress < 0.8) {
                value = 1 - easeOutCubic(p.norm(progress, 0.7, 0.8));
            } else {
                value = 0;
            }

            return value;
        }

        function angle(t) {
            const duration = 60;
            let value = p.PI / 4 * (p.floor(t / duration) + easeOutCubic((t % duration) / duration));
            return value;
        }

        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }

        p.windowResized = () => {
            p.resizeCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
        }
    };


    new p5(sketch);
};

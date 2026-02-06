import p5 from 'p5';

export const createSketch = (targetElement) => {
    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
            canvas.parent(targetElement);
        }

        p.draw = () => {
            p.background(245);
            p.circle(p.mouseX, p.mouseY, 50);
        }

        p.windowResized = () => {
            p.resizeCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
        }
    };

    new p5(sketch);
};

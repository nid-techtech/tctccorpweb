import p5 from 'p5';

export function createSketch(targetElement, config) {

    const {
        qty = 12,
        isVisible = true
    } = config;

    const sketch = (p) => {
        class Circle {
            constructor(x, y, scale) {
                this.startPos = p.createVector(x, y);
                this.endPos = p5.Vector.copy(this.startPos);
                this.currentPos = p5.Vector.copy(this.startPos);
                this.startScale = scale;
                this.endScale = scale
                this.currentScale = scale;
                this.progress = 0;
                this.duration = 20;
                this.life = 0;
            }

            disp() {
                if (!isVisible) return;
                p.push();
                p.stroke(lineCol);
                capsule(this.currentPos.x, this.currentPos.y, this.precedePos.x, this.precedePos.y, this.currentScale);
                p.fill(bgCol);
                p.strokeWeight(weight);
                p.circle(this.precedePos.x, this.precedePos.y, this.currentScale * 2 - weight);
                p.circle(this.currentPos.x, this.currentPos.y, this.currentScale * 2 - weight);
                p.pop();
            }

            move() {
                this.currentPos = p5.Vector.lerp(this.startPos, this.endPos, easeInOutQuint(this.progress));
                this.precedePos = p5.Vector.lerp(this.startPos, this.endPos, easeOutCubic(this.progress));
                this.currentScale = p.lerp(this.startScale, this.endScale, easeInOutQuint(this.progress));

                this.life = p.constrain(this.life + 1, 0, this.duration);
                this.progress = this.life / this.duration;
            }


            reset(duration) {
                if (duration) this.duration = duration;
                this.progress = 0;
                this.life = 0;
            }

            morphSphere(radius, origin = createVector(0, 0)) {
                let n = p5.Vector.sub(this.currentPos, origin).normalize();
                n.mult(radius);
                this.setEndPos(p5.Vector.add(origin, n));
            }
            setEndPos(newPos, isForce = false) {
                if (isForce) {
                    this.startPos = p5.Vector.copy(newPos);
                    this.endPos = p5.Vector.copy(newPos);
                    this.currentPos = p5.Vector.copy(newPos);
                    return;
                }
                this.startPos = p5.Vector.copy(this.endPos);
                this.endPos = newPos;
            }
            setEndScale(newScale, isForce = false) {
                if (isForce) {
                    this.startScale = newScale;
                    this.endScale = newScale;
                    this.currentScale = newScale;
                    return;
                }
                this.startScale = this.endScale;
                this.endScale = newScale;
            }

        }

        let weight = 5;

        let circleSize = 20;

        const circles = [];

        let lineCol = "#0e0d14"

        let bgCol = "#eeeeee"

        const debugMode = false;


        p.setup = () => {
            const canvas = p.createCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
            canvas.parent(targetElement);
            circleSize = Math.min(p.width, p.height) / 40;
            weight = circleSize / 4;
            for (let i = 0; i < qty; i++) {
                let newPos = getNonOverlappingRandomPosition(circles, 2 * circleSize, () =>
                    p.createVector(p.randomGaussian(0, 75), p.randomGaussian(0, 75))
                );
                circles.push(new Circle(newPos.x, newPos.y, circleSize));
            }
            p.pixelDensity(1);
            p.frameRate(60);
        }

        p.draw = () => {
            circleSize = Math.min(p.width, p.height) / 40;
            weight = circleSize / 4;
            p.background(bgCol);

            if (p.frameCount % 120 == 1) {
                circles.forEach((el, i) => {
                    el.reset(90);
                    let newPos = getNonOverlappingRandomPosition(circles.slice(0, i), 2 * circleSize, () =>
                        p5.Vector.random2D().mult(Math.min(p.width, p.height) / 4 + p.randomGaussian(0, 20))
                        //createVector(random(-width/2+circleSize,width/2-circleSize), random(-height/2+circleSize,height/2-circleSize))
                    );
                    el.setEndPos(newPos);
                    el.setEndScale(Math.min(p.width, p.height) / 40);
                });
            }


            p.push();
            p.translate(p.width / 2, p.height / 2);
            circles.forEach(el => {
                el.move();
                el.disp();
            });

            let convex = getConvexHull(circles.map(el => el.precedePos).concat(circles.map(el => el.currentPos)));
            p.stroke(lineCol);
            p.strokeWeight(weight);
            let offset = circleSize - weight / 2 + weight * 3
            for (let i = 0; i < convex.length; i++) {
                let start, end;
                if (i == convex.length - 1) {
                    start = convex[i];
                    end = convex[0];
                } else {
                    start = convex[i];
                    end = convex[i + 1];
                }
                if (p.dist(start.x, start.y, end.x, end.y) > weight) {
                    offsetLine(start, end, offset);
                }
            }
            p.pop();


            if (debugMode) {
                p.push();
                p.fill(0);
                p.noStroke();
                p.text(`DEBUG MODE IS ACTIVE!!!!\nFPS:${p.frameRate()}\nframe:${p.frameCount}`, 10, 20);
                p.pop();
            }
        }


        function trimLine(vec1, vec2, start, end, isRelative) {
            let a, b;
            if (isRelative) {
                a = p5.Vector.lerp(vec1, vec2, p.constrain(start, 0, 1));
                b = p5.Vector.lerp(vec1, vec2, p.constrain(end, 0, 1));
            } else {
                let n = p.p5.Vector.sub(vec2, vec1).normalize();
                a = p5.Vector.add(vec1, p5.Vector.mult(n, start));
                b = p5.Vector.sub(vec2, p5.Vector.mult(n, end));
            }
            p.line(a.x, a.y, b.x, b.y);
        }

        function getConvexHull(points) { //Convex Algorithm by Claude
            points.sort((a, b) => a.x - b.x || a.y - b.y);

            const upper = [];
            const lower = [];

            for (const point of points) {
                while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
                    upper.pop();
                }
                upper.push(point);
            }

            for (let i = points.length - 1; i >= 0; i--) {
                const point = points[i];
                while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
                    lower.pop();
                }
                lower.push(point);
            }

            return upper.slice(0, -1).concat(lower.slice(0, -1));
        }

        function offsetLine(a, b, R) {
            p.push();
            let angle = p.atan2(a.y - b.y, a.x - b.x) + Math.PI / 2;
            let n = p5.Vector.fromAngle(angle, R);
            p.translate(n.x, n.y);
            p.line(a.x, a.y, b.x, b.y);
            p.pop();
        }

        function cross(a, b, c) {
            return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        }

        function capsule(x1, y1, x2, y2, r) {
            p.push();
            p.strokeWeight(r);
            p.line(x1, y1, x2, y2);
            p.pop();
        }

        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }

        function easeInOutQuint(x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }

        function getNonOverlappingRandomPosition(existingCircles, minDistance, posGenerator, maxAttempts = 500) {
            let newPos;
            let attempts = 0;
            let isOverlapping;

            do {
                newPos = posGenerator();
                isOverlapping = existingCircles.some(existingCircle =>
                    p5.Vector.dist(newPos, existingCircle.endPos) < minDistance
                );
                attempts++;
                if (attempts > maxAttempts) {
                    break;
                }
            } while (isOverlapping);

            return newPos;
        }

        p.windowResized = () => {
            p.resizeCanvas(targetElement.offsetWidth, targetElement.offsetHeight);
        }
    };


    new p5(sketch, targetElement);
};

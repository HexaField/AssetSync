export class Circle {

    constructor(x, y, r, data = {}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rPow2 = this.r * this.r;
        this.data = data;
    }

    euclideanDistancePow2(point1, point2) {
        return Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2);
    }

    contains(point) {
        return this.euclideanDistancePow2(point, this) <= this.rPow2;
    }

    intersects(range) {
        const dX = this.x - Math.max(range.x, Math.min(this.x, range.x + range.w));
        const dY = this.y - Math.max(range.y, Math.min(this.y, range.y + range.h));
        return (dX * dX + dY * dY) <= (this.rPow2);
    }
}

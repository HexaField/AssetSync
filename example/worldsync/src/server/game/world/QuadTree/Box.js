export class Box {
    
    constructor(x, y, w, h, data) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = data;
    }

    contains(point) {
        return point.x >= this.x &&
            point.x <= this.x + this.w &&
            point.y >= this.y &&
            point.y <= this.y + this.h;
    }

    intersects(range) {
        return !(range.x > this.x + this.w
            || range.x + range.w < this.x
            || range.y > this.y + this.h
            || range.y + range.h < this.y);
    }
}
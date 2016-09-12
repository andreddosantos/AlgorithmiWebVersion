"use strict";
class Shape {
    constructor(x, y, width, height, fill, hover) {
        this.reactOnHover = false;
        this.xPosition = x;
        this.yPosition = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.reactOnHover = hover;
        this.parent = null;
    }
    //This method will be overriden by any object that inherits this
    //and implements a new version of draw
    draw(ctx) {
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height);
    }
    // Determine if a point is inside the shape's bounds
    contains(mouseXPosition, mouseYPosition) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Height) and its Y and (Y + Height)        
        return (this.xPosition <= mouseXPosition) && (this.xPosition + this.width >= mouseXPosition)
            && (this.yPosition <= mouseYPosition) && (this.yPosition + this.height >= mouseYPosition);
    }
    //This method will be overriden by any object that inherits this
    //and implements a new version of actionOnMouseOver
    actionOnMouseOver(ctx) {
        ctx.fillStyle = "#ffffff";
        this.draw(ctx);
    }
    actionOnMouseClick(ctx, fluxogramManager) {
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getX() {
        return this.xPosition;
    }
    getY() {
        return this.yPosition;
    }
    setX(x) {
        this.xPosition = x;
    }
    setY(y) {
        this.yPosition = y;
    }
    setXandY(x, y) {
        this.xPosition = x;
        this.yPosition = y;
    }
}
//# sourceMappingURL=Shape.js.map
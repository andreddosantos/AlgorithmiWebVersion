"use strict";
class HorizontalLine extends Line {
    constructor(hasArrow, x1, x2, y1, y2, lineHeight, fill, hover, parent, previous, next) {
        super(hasArrow, x1, x2, y1, y2, lineHeight, fill, hover, parent, previous, next);
        this.onMouseOverFillStyle = "#ffffff";
        this.hasArrow = hasArrow;
        this.headlen = 6;
        this.lineHeight = 8;
    }
    draw(ctx) {
        ctx.save();
        if (!this.onMouseOuver) {
            ctx.strokeStyle = this.fill;
            ctx.fillStyle = this.fill;
        }
        else {
            ctx.strokeStyle = this.onMouseOverFillStyle;
            ctx.fillStyle = this.onMouseOverFillStyle;
        }
        var path = new Path2D();
        path.moveTo(this.x1, this.y1);
        path.lineTo(this.x2, this.y2);
        if (this.hasArrow || this.next != null) {
            if (this.x2 < this.x1) {
                //arrow to the left :)
                //Arrow
                path.moveTo(this.x2 + this.headlen, this.y2);
                //right side
                path.lineTo(this.x2 + this.headlen, this.y2 + 3);
                path.lineTo(this.x2, this.y2);
                path.lineTo(this.x2 + this.headlen, this.y2 - 3);
                path.lineTo(this.x2 + this.headlen, this.y2);
            }
            else {
                path.moveTo(this.x2 - this.headlen, this.y2);
                //right side
                path.lineTo(this.x2 - this.headlen, this.y2 + 3);
                path.lineTo(this.x2, this.y2);
                path.lineTo(this.x2 - this.headlen, this.y2 - 3);
                path.lineTo(this.x2 - this.headlen, this.y2);
            }
        }
        path.closePath();
        //draws the paths created above
        ctx.lineWidth = this.lineHeight;
        ctx.stroke(path);
        ctx.fill(path);
        ctx.restore();
    }
    actionOnMouseOver(ctx) {
        this.onMouseOuver = true;
        this.draw(ctx);
    }
    // Determine if a point is inside the shape's bounds
    contains(mouseXPosition, mouseYPosition) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Height) and its Y and (Y + Height)
        var xPosition = this.x1;
        var yPosition = this.y1;
        var width = this.x2 - this.x1;
        var height = this.lineHeight;
        return (xPosition <= mouseXPosition) && (xPosition + width >= mouseXPosition)
            && (yPosition <= mouseYPosition) && (yPosition + height >= mouseYPosition);
    }
}
//# sourceMappingURL=HorizontalLine.js.map
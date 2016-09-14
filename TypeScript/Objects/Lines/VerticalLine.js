"use strict";
class VerticalLine extends Line {
    constructor(hasArrow, x1, x2, y1, y2, lineHeight, fill, hover, parent, previous, next) {
        super(hasArrow, x1, x2, y1, y2, lineHeight, fill, hover, parent, previous, next);
        this.onMouseOverFillStyle = "#ffffff";
        this.headlen = 6;
        this.hasArrow = hasArrow;
        this.utilityMargin = 10;
        this.lineHeight = 8;
    }
    actionOnMouseClick(ctx) {
        if (this.reactOnHover) {
            new NewBlockPopUp(100, 100, this.parent, this);
        }
    }
    draw(ctx) {
        var path = new Path2D();
        path.moveTo(this.x1, this.y1);
        path.lineTo(this.x2, this.y2);
        if ((this.hasArrow && this.next != null) || this.next != null || this.hasArrow) {
            if (this.y2 > this.y1) {
                //Arrow
                path.moveTo(this.x2, this.y2 - this.headlen);
                path.lineTo(this.x2 + 3, this.y2 - this.headlen);
                path.lineTo(this.x2, this.y2);
                path.lineTo(this.x2 - 3, this.y2 - this.headlen);
                path.lineTo(this.x2, this.y2 - this.headlen);
            }
            else {
                //Arrow
                path.moveTo(this.x2, this.y2 + this.headlen);
                path.lineTo(this.x2 + 3, this.y2 + this.headlen);
                path.lineTo(this.x2, this.y2);
                path.lineTo(this.x2 - 3, this.y2 + this.headlen);
                path.lineTo(this.x2, this.y2 + this.headlen);
            }
        }
        path.closePath();
        ctx.save();
        if (!this.onMouseOuver) {
            ctx.strokeStyle = this.fill;
            ctx.lineWidth = this.lineHeight;
            ctx.fillStyle = this.fill;
        }
        else {
            ctx.strokeStyle = this.onMouseOverFillStyle;
            ctx.lineWidth = this.lineHeight;
            ctx.fillStyle = this.onMouseOverFillStyle;
        }
        if (this.reactOnHover && !this.onMouseOuver)
            ctx.strokeStyle = "#ED8C00";
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
        var xPosition = this.xPosition;
        var yPosition = this.yPosition;
        var width = this.lineHeight;
        var height = this.y2 - this.y1;
        return ((xPosition - this.utilityMargin) <= mouseXPosition) && (xPosition + width + this.utilityMargin >= mouseXPosition)
            && (yPosition <= mouseYPosition) && (yPosition + height >= mouseYPosition);
    }
}
//# sourceMappingURL=VerticalLine.js.map
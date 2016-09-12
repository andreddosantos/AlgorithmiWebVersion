"use strict";
class Line extends Shape {
    constructor(hasArrow, x1, x2, y1, y2, lineHeight, fill, hover, parent, previous, next) {
        super(x1, y1, lineHeight, y2 - y1, fill, hover);
        this.parent = parent;
        this.previous = previous;
        this.next = next;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.lineHeight = lineHeight;
    }
    // Determine if a point is inside the shape's bounds
    contains(mouseXPosition, mouseYPosition) {
        // All we have to do is make sure the Mouse X,Y fall in the area between
        // the shape's X and (X + Height) and its Y and (Y + Height)
        var xPosition = this.x1;
        var yPosition = this.y1;
        var width = this.lineHeight;
        var height = this.height;
        return (xPosition <= mouseXPosition) && (xPosition + width >= mouseXPosition)
            && (yPosition <= mouseYPosition) && (yPosition + height >= mouseYPosition);
    }
    setNewDimensions(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.xPosition = x1;
        this.yPosition = y1;
    }
}
//# sourceMappingURL=Line.js.map
"use strict";
class Circle extends Shape {
    constructor(x, y, width, height, fill, hover) {
        super(x, y, width, height, fill, hover);
    }
    draw(ctx) {
        var centerX = this.xPosition + this.width / 2;
        var centerY = this.yPosition + this.height / 2;
        var radius = this.width / 2;
        var path = new Path2D();
        path.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.save();
        if (!this.onMouseOuver) {
            ctx.fillStyle = this.fill;
        }
        else {
            ctx.fillStyle = "#ffffff";
        }
        ctx.fill(path);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke(path);
        ctx.restore();
    }
    actionOnMouseOver(ctx) {
        this.onMouseOuver = true;
        this.draw(ctx);
        this.parent.debugBlock();
    }
    setNewDimensions(x1Position, y1Position, width, height) {
        this.xPosition = x1Position;
        this.yPosition = y1Position;
        this.width = width;
        this.height = height;
    }
    actionOnMouseClick(ctx, fluxogramManager) {
        new ContainerBlocksInstructionPopUp(100, 100, this.parent, null, 0, this.parent);
    }
}
//# sourceMappingURL=Circle.js.map
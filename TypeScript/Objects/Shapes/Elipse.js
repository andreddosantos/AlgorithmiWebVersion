"use strict";
class Elipse extends Shape {
    constructor(x, y, width, height, fill, hover) {
        super(x, y, width, height, fill, hover);
    }
    setInstruction(instruction) {
        this.instruction = instruction;
    }
    draw(ctx) {
        var centerX = this.xPosition + this.width / 2;
        var width = this.width;
        var centerY = this.yPosition + this.height / 2;
        var height = this.height;
        ctx.lineWidth = 4;
        var path = new Path2D();
        path.moveTo(this.xPosition + this.width / 2, this.yPosition);
        path.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2, centerX, centerY + height / 2);
        path.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX - width / 2, centerY - height / 2, centerX, centerY - height / 2);
        path.closePath();
        ctx.save();
        if (!this.onMouseOuver) {
            ctx.fillStyle = this.fill;
        }
        else {
            ctx.fillStyle = "#FFFFFF";
        }
        ctx.strokeStyle = '#000000';
        ctx.stroke(path);
        ctx.fill(path);
        //draw instruction
        ctx.fillStyle = "#000000";
        ctx.font = "18pt sans-serif";
        var myInstructionSize = ctx.measureText(this.instruction);
        ctx.fillText(this.instruction, this.xPosition + (this.width / 2 - myInstructionSize.width / 2), this.yPosition + (this.height / 2) + 9);
        ctx.restore();
    }
    actionOnMouseOver(ctx) {
        this.onMouseOuver = true;
        this.draw(ctx);
        this.parent.debugBlock();
    }
}
//# sourceMappingURL=Elipse.js.map
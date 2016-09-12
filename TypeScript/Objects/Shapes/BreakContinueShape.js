"use strict";
class BreakContinueShape extends Shape {
    constructor(x, y, width, height, fill, hover) {
        super(x, y, width, height, fill, hover);
        this.margin = 10;
        this.instruction = "";
    }
    draw(ctx) {
        var path = new Path2D();
        path.moveTo(this.xPosition - this.margin, this.yPosition + this.height / 2);
        path.lineTo(this.xPosition + this.margin, this.yPosition);
        path.lineTo(this.xPosition + this.width, this.yPosition);
        path.lineTo(this.xPosition - this.margin + this.width, this.yPosition + this.height / 2);
        path.lineTo(this.xPosition + this.width, this.yPosition + this.height);
        path.lineTo(this.xPosition, this.yPosition + this.height);
        path.lineTo(this.xPosition - this.margin, this.yPosition + this.height / 2);
        ctx.save();
        if (!this.onMouseOuver)
            ctx.fillStyle = this.fill;
        else
            ctx.fillStyle = "#ffffff";
        if (this.parent.executionState != "" || this.parent.executionState != "undefined")
            ctx.fillStyle = this.parent.executionState;
        ctx.strokeStyle = '#000000';
        ctx.stroke(path);
        ctx.fill(path);
        ctx.font = "18pt sans-serif";
        ctx.fillStyle = "#000000";
        var myInstructionSize = ctx.measureText(this.instruction);
        this.width = Math.round(myInstructionSize.width + 50 > 200 ? myInstructionSize.width + 50 : 200);
        ctx.fillText(this.instruction, this.xPosition + (this.width / 2 - myInstructionSize.width / 2), this.yPosition + (this.height / 2) + 9);
        ctx.restore();
    }
    actionOnMouseOver(ctx) {
        this.onMouseOuver = true;
        this.draw(ctx);
        this.parent.debugBlock();
    }
    actionOnMouseClick(ctx, fluxogramManager) {
        new BreakContinueBlocksInstructionPopUp(100, 100, this.parent, null, 0, this.parent);
    }
}
//# sourceMappingURL=BreakContinueShape.js.map
"use strict";
class Define extends Shape {
    constructor(x, y, width, height, fill, hover) {
        super(x, y, width, height, fill, hover);
        this.instruction = "Hello World!!!";
    }
    draw(ctx) {
        var path = new Path2D();
        path.rect(this.xPosition, this.yPosition, this.width, this.height);
        path.closePath();
        var specialDefinePath = new Path2D();
        specialDefinePath.moveTo(this.xPosition, this.yPosition + 15);
        specialDefinePath.lineTo(this.xPosition + this.width, this.yPosition + 15);
        specialDefinePath.moveTo(this.xPosition + 15, this.yPosition);
        specialDefinePath.lineTo(this.xPosition + 15, this.yPosition + this.height);
        specialDefinePath.closePath();
        ctx.save();
        if (!this.onMouseOuver) {
            ctx.fillStyle = this.fill;
        }
        else {
            ctx.fillStyle = "#ffffff";
        }
        if (this.parent.executionState != "" || this.parent.executionState != "undefined")
            ctx.fillStyle = this.parent.executionState;
        ctx.lineWidth = 4;
        ctx.stroke(path);
        ctx.fill(path);
        ctx.stroke(specialDefinePath);
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
        new DefineBlockInstructionPopUp(100, 100, this.parent, null, 0, this.parent);
    }
}
//# sourceMappingURL=Define.js.map
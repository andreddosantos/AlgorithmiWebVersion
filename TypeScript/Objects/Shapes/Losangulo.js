"use strict";
class Losangulo extends Shape {
    constructor(x, y, width, height, fill, hover) {
        super(x, y, width, height, fill, hover);
        this.instruction = "Hello World!!!";
    }
    draw(ctx) {
        ctx.font = "18pt sans-serif";
        var myInstructionSize = ctx.measureText(this.instruction);
        this.width = Math.round(myInstructionSize.width + 50 > 80 ? myInstructionSize.width + 50 : 80);
        var path = new Path2D();
        path.moveTo(this.xPosition, this.yPosition + this.height / 2);
        path.lineTo(this.xPosition + this.width / 2, this.yPosition);
        path.lineTo(this.xPosition + this.width, this.yPosition + this.height / 2);
        path.lineTo(this.xPosition + this.width / 2, this.yPosition + this.height);
        path.lineTo(this.xPosition, this.yPosition + this.height / 2);
        path.closePath();
        ctx.save();
        if (!this.onMouseOuver)
            ctx.fillStyle = this.fill;
        if (this.parent.executionState != "" || this.parent.executionState != "undefined")
            ctx.fillStyle = this.parent.executionState;
        ctx.strokeStyle = '#000000';
        ctx.stroke(path);
        ctx.fill(path);
        ctx.fillStyle = "#000000";
        ctx.fillText(this.instruction, this.xPosition + (this.width / 2 - myInstructionSize.width / 2), this.yPosition + (this.height / 2) + 9);
        if (this.parent instanceof WhileBlock) {
            ctx.save();
            ctx.font = '12px Arial';
            ctx.fillText(lang.WhileBlockCondition, this.xPosition + this.width, this.yPosition + this.height / 2 - 5);
            ctx.restore();
        }
        if (this.parent instanceof DoWhileBlock) {
            ctx.save();
            ctx.font = '12px Arial';
            ctx.fillText(lang.DoWhileBlockCondition, this.xPosition + this.width / 2 + 7, this.yPosition);
            ctx.restore();
        }
        if (this.parent instanceof IfBlock) {
            ctx.save();
            ctx.font = '12px Arial';
            ctx.fillText(lang.IfBlockTrueCondition, this.xPosition + this.width, this.yPosition + this.height / 2 - 5);
            ctx.fillText(lang.IfBlockFalseCondition, this.xPosition - 40, this.yPosition + this.height / 2 - 5);
            ctx.restore();
        }
        ctx.restore();
    }
    actionOnMouseOver(ctx) {
        this.onMouseOuver = true;
        ctx.fillStyle = "#ffffff";
        this.draw(ctx);
        this.parent.debugBlock();
    }
    getWidth() {
        var myInstructionSize = this.parent.fluxogramManager.shapeObjectManager.context.measureText(this.instruction);
        return Math.round(myInstructionSize.width + 50 > 80 ? myInstructionSize.width + 50 : 80);
    }
    actionOnMouseClick(ctx, fluxogramManager) {
        new ContainerBlocksInstructionPopUp(100, 100, this.parent, null, 0, this.parent);
    }
}
//# sourceMappingURL=Losangulo.js.map
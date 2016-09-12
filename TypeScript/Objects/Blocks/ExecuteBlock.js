"use strict";
class ExecuteBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.baseHeight = ExecuteBlockShapeSize.rectangleHeight;
        this.baseWidth = ExecuteBlockShapeSize.rectangleWidth;
        this.rectangle = new Rectangle(x, y, ExecuteBlockShapeSize.rectangleWidth, ExecuteBlockShapeSize.rectangleHeight, ExecuteBlockShapeSize.rectangleColor, true);
        this.rectangle.instruction = instruction;
        this.rectangle.parent = this;
        this.shapes.push(this.rectangle);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    editBlockInstruction(instruction) {
        this.fluxogramManager.editBlockInstruction(this, instruction);
    }
    debugBlock() { }
    resize() {
        this.rectangle.instruction = this.instruction;
        this.width = this.rectangle.getWidth(); //String width plus some side margins
    }
    redraw() {
        this.rectangle.setXandY(this.xPosition, this.yPosition);
    }
    actionOnMouseClick(ctx, fluxogramManager) {
        this.width += 10;
        this.parent.fluxogramManager.resizeFluxogramBlocks();
    }
}
//# sourceMappingURL=ExecuteBlock.js.map
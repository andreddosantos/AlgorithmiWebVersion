"use strict";
class WriteBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.baseHeight = WriteBlockShapeSize.rectangleHeight;
        this.baseWidth = WriteBlockShapeSize.rectangleWidth;
        this.rectangle = new Write(x, y, WriteBlockShapeSize.rectangleWidth, WriteBlockShapeSize.rectangleHeight, WriteBlockShapeSize.rectangleColor, true);
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
    debugBlock() {
        this.fluxogramManager.debugBlock(this);
    }
    resize() {
        this.rectangle.instruction = this.instruction;
        this.width = this.rectangle.getWidth(); //String width plus some side margins
    }
    redraw() {
        this.rectangle.setXandY(this.xPosition, this.yPosition);
    }
}
//# sourceMappingURL=WriteBlock.js.map
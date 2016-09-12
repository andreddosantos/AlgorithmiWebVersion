"use strict";
class ReturnBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.baseHeight = ReturnBlockShapeSize.rectangleHeight;
        this.baseWidth = ReturnBlockShapeSize.rectangleWidth;
        this.rectangle = new Return(x, y, ReturnBlockShapeSize.rectangleWidth, ReturnBlockShapeSize.rectangleHeight, ReturnBlockShapeSize.rectangleColor, true);
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
}
//# sourceMappingURL=ExecuteBlock.1.js.map 
//# sourceMappingURL=ReturnBlock.js.map
"use strict";
class BreakBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction, message) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = lang.BreakBlockInstruction;
        this.message = message;
        this.baseHeight = ReadBlockShapeSize.readShapeWidth;
        this.baseWidth = ReadBlockShapeSize.readShapeHeight;
        this.readShape = new BreakContinueShape(x, y, BreakContinueShapeSize.BreakContinueShapeWidth, BreakContinueShapeSize.BreakContinueShapeHeight, BreakContinueShapeSize.BreakContinueShapeColor, true);
        this.readShape.instruction = this.instruction;
        this.readShape.parent = this;
        this.shapes.push(this.readShape);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    editBlock(variableName, message) {
        this.message = message;
        this.instruction = variableName;
        this.fluxogramManager.resizeFluxogramBlocks();
        this.fluxogramManager.resizeFluxogramBlocks();
    }
    debugBlock() {
    }
    resize() {
        this.readShape.instruction = this.instruction;
        this.width = this.readShape.getWidth(); //String width plus some side margins
    }
    redraw() {
        this.readShape.setXandY(this.xPosition, this.yPosition);
    }
}
//# sourceMappingURL=BreakBlock.js.map
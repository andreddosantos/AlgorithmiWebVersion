"use strict";
class DefineBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction, value, type) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.value = value;
        this.type = type;
        this.instruction = instruction;
        this.baseHeight = DefineBlockShapeSize.rectangleHeight;
        this.baseWidth = DefineBlockShapeSize.rectangleWidth;
        this.rectangle = new Define(x, y, DefineBlockShapeSize.rectangleWidth, DefineBlockShapeSize.rectangleHeight, DefineBlockShapeSize.rectangleColor, true);
        this.rectangle.instruction = instruction;
        this.rectangle.parent = this;
        this.shapes.push(this.rectangle);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    editBlockLogicInfo(instruction, value, type) {
        this.value = value;
        this.type = type;
        this.instruction = instruction;
        this.fluxogramManager.resizeFluxogramBlocks();
        this.fluxogramManager.resizeFluxogramBlocks();
    }
    resize() {
        this.rectangle.instruction = this.instruction;
        this.width = this.rectangle.getWidth(); //String width plus some side margins
    }
    redraw() {
        this.rectangle.setXandY(this.xPosition, this.yPosition);
    }
}
//# sourceMappingURL=DefineBlock.js.map
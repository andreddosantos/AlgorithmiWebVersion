"use strict";
class BegginingBlock extends Block {
    /**
     *
     */
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.startingInstruction = lang.BegginingBlockBegin;
        this.endingInstruction = lang.BegginingBlockEnd;
        this.instruction = instruction;
        this.baseHeight = WhileBlockShapeSize.blockHeight;
        this.baseWidth = WhileBlockShapeSize.blockWidth;
        //implement all related shapes.
        //top shape
        this.previousConnector = null;
        this.nextConnector = null;
        this.beggining = new Elipse(this.xPosition + this.width / 2 - BegginingBlockShapeSize.begginingShapeSizeWidth / 2, this.yPosition, BegginingBlockShapeSize.begginingShapeSizeWidth, BegginingBlockShapeSize.begginingShapeSizeHeigth, BegginingBlockShapeSize.begginingColor, false);
        this.end = new Elipse(this.beggining.getX(), BegginingBlockShapeSize.blockSize, BegginingBlockShapeSize.endShapeSizeWidth, BegginingBlockShapeSize.endShapeSizeHeigth, BegginingBlockShapeSize.endColor, false);
        this.beggining.setInstruction(this.startingInstruction);
        this.end.setInstruction(this.endingInstruction);
        //First Flux line
        this.mainFluxLine = new VerticalLine(true, this.beggining.getX() + this.beggining.getWidth() / 2, this.end.getX() + this.end.getWidth() / 2, this.beggining.getY() + this.beggining.getHeight(), this.end.getY(), 6, "#000000", true, this, null, null);
        //add flux line to flux line array
        this.connectors.push(this.mainFluxLine);
        //add it to the inherited shapes array
        this.shapes.push(this.beggining, this.end, this.mainFluxLine);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    moveInnerBlocks() {
        var firstConnector = this.findFirstConnector(this);
        this.beggining.setX(this.xPosition + this.width / 2 - BegginingBlockShapeSize.begginingShapeSizeWidth / 2);
        this.mainFluxLine.setNewDimensions(this.beggining.getX() + this.beggining.getWidth() / 2, this.end.getX() + this.end.getWidth() / 2, this.beggining.getY() + this.beggining.getHeight(), this.end.getY());
        this.end.setX(this.beggining.getX());
        // Write rhe correspondent end and start description
        this.drawEndInstruction;
        this.drawStartInstruction;
        if (this.connectors.length > 1) {
            this.relocateInnerBlocks(firstConnector);
        }
        this.connectors.find(o => o.next == null).hasArrow = true;
    }
    drawStartInstruction() {
        this.beggining.setInstruction(this.startingInstruction);
    }
    drawEndInstruction() {
        this.beggining.setInstruction(this.endingInstruction);
    }
    moveInCanvas() {
    }
    relocateInnerBlocks(line) {
        if (line.next == null && line.previous != null) {
            line.y1 = line.previous.yPosition + line.previous.height;
            line.y2 = line.y1 + LineSize.verticalLineSize;
            line.x1 = this.beggining.getX() + this.beggining.getWidth() / 2;
            line.x2 = line.x1;
            line.yPosition = line.y1;
            line.xPosition = line.x1;
            this.end.setY(line.y2);
        }
        else {
            if (line.previous != null) {
                line.y1 = line.previous.height + line.previous.yPosition;
                line.y2 = line.y1 + LineSize.verticalLineSize;
                line.x1 = this.beggining.getX() + this.beggining.getWidth() / 2;
                if (line.next instanceof WhileBlock || line.next instanceof DoWhileBlock) {
                    line.next.xPosition = line.x1 - line.next.losangulo.width / 2;
                }
                else if (line.next instanceof IfBlock) {
                    line.next.xPosition = line.x1 - (line.next.drawingWidthLeft + line.next.losangulo.width / 2);
                }
                else {
                    line.next.xPosition = line.x1 - line.next.width / 2;
                }
                line.x2 = line.x1;
                line.yPosition = line.y1;
                line.xPosition = line.x1;
                line.next.yPosition = line.y2;
                line.next.redraw();
                this.relocateInnerBlocks(line.next.nextConnector);
            }
            else {
                line.x1 = this.beggining.getX() + this.beggining.getWidth() / 2;
                line.x2 = line.x1;
                line.y1 = this.beggining.getY() + this.beggining.getHeight();
                line.y2 = line.y1 + LineSize.verticalLineSize;
                line.yPosition = line.y1;
                line.xPosition = line.x1;
                line.next.yPosition = line.y2;
                if (line.next instanceof WhileBlock || line.next instanceof DoWhileBlock) {
                    line.next.xPosition = line.x1 - line.next.losangulo.width / 2;
                }
                else if (line.next instanceof IfBlock) {
                    line.next.xPosition = line.x1 - (line.next.drawingWidthLeft + line.next.losangulo.width / 2);
                }
                else {
                    line.next.xPosition = line.x1 - line.next.width / 2;
                }
                line.next.redraw();
                this.relocateInnerBlocks(line.next.nextConnector);
            }
        }
    }
}
//# sourceMappingURL=BegginingBlock.js.map
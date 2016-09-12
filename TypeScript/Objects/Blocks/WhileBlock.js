"use strict";
class WhileBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.baseHeight = WhileBlockShapeSize.blockHeight;
        this.baseWidth = WhileBlockShapeSize.blockWidth;
        this.drawingWidth = WhileBlockShapeSize.blockWidth - WhileBlockShapeSize.losanguloWidth / 2;
        this.losangulo = new Losangulo(this.xPosition, this.yPosition, WhileBlockShapeSize.losanguloWidth, WhileBlockShapeSize.losanguloHeight, WhileBlockShapeSize.losanguloColor, true);
        this.losangulo.parent = this;
        this.losangulo.instruction = this.instruction;
        //No interaction lines 
        this.rightHorizontalLine = new HorizontalLine(false, this.losangulo.getX() + this.losangulo.getWidth(), this.xPosition + this.width, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2, 5, "#000000", false, this, null, null);
        this.restoreFluxVerticalLine = new VerticalLine(false, this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getY() + this.losangulo.getHeight(), (this.yPosition + this.height) - (this.losangulo.getY() + this.losangulo.getHeight()), 5, "#000000", false, this, null, null);
        this.blockBottomLine = new HorizontalLine(false, this.xPosition + this.width, this.losangulo.getX() + this.losangulo.getWidth() / 2 + 10, this.yPosition + this.height * 3 / 4, this.yPosition + this.height * 3 / 4, 5, "#000000", false, this, null, null);
        this.blockFinalLine = new VerticalLine(true, this.losangulo.getX() + this.losangulo.getWidth() / 2 + 10, this.losangulo.getX() + this.losangulo.getWidth() / 2 + 10, this.yPosition + this.height * 3 / 4, this.losangulo.getY() + this.losangulo.getHeight(), 5, "#000000", false, this, null, null);
        //first conne
        var blockReceiverLine = new VerticalLine(false, this.xPosition + this.width - 2, this.xPosition + this.width - 2, this.yPosition + this.losangulo.getHeight() / 2, this.yPosition + this.height * 3 / 4, 5, "#000000", true, this, null, null);
        this.connectors.push(blockReceiverLine);
        //add it to the inherited shapes array
        this.shapes.push(this.losangulo, this.rightHorizontalLine, blockReceiverLine, this.blockBottomLine, this.blockFinalLine, this.restoreFluxVerticalLine);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    destroy() {
        this.destroySons(this.findFirstConnector(this));
        this.destroyShapes();
    }
    destroySons(line) {
        if (line.next != null) {
            if (line.next.nextConnector.next != null) {
                this.destroySons(line.next.nextConnector);
            }
            line.next.destroy();
        }
    }
    editBlockInstruction(instruction) {
        this.fluxogramManager.editBlockInstruction(this, instruction);
    }
    debugBlock() {
        this.fluxogramManager.debugBlock(this);
    }
    resize() {
        var firstConnector = this.findFirstConnector(this);
        this.losangulo.instruction = this.instruction;
        if (firstConnector != null) {
            var blockHeight = this.resizeRecursiveHeight(firstConnector, 0);
            this.height = blockHeight;
            if (this.connectors.length < 2) {
                this.width = this.baseWidth - WhileBlockShapeSize.losanguloWidth + this.losangulo.getWidth();
            }
            else {
                this.width = this.resizeRecursiveWidth(firstConnector, 0, this);
            }
        }
    }
    widthFinalReajust() {
        var maxBlockWidthLeft = 0;
        var maxBlockWidthRight = 0;
        for (var index = 0; index < this.connectors.length; index++) {
            if (this.connectors[index].next != null) {
                if (this.connectors[index].next instanceof IfBlock) {
                    if (this.connectors[index].next.leftWidth > maxBlockWidthLeft) {
                        maxBlockWidthLeft = this.connectors[index].next.leftWidth;
                    }
                    if (this.connectors[index].next.rightWidth > maxBlockWidthRight) {
                        maxBlockWidthRight = this.connectors[index].next.rightWidth;
                    }
                }
                if (this.connectors[index].next instanceof WhileBlock
                    || this.connectors[index].next instanceof DoWhileBlock) {
                    if (this.connectors[index].next.losangulo.getWidth() / 2 > maxBlockWidthLeft) {
                        maxBlockWidthRight = this.connectors[index].next.losangulo.getWidth() / 2;
                    }
                    if (this.connectors[index].next.width - this.connectors[index].next.losangulo.getWidth() / 2 > maxBlockWidthRight) {
                        maxBlockWidthRight = this.connectors[index].next.width - this.connectors[index].next.losangulo.getWidth() / 2;
                    }
                }
                if (this.connectors[index].next instanceof DefineBlock
                    || this.connectors[index].next instanceof ReadBlock
                    || this.connectors[index].next instanceof ExecuteBlock
                    || this.connectors[index].next instanceof ContinueBlock
                    || this.connectors[index].next instanceof BreakBlock
                    || this.connectors[index].next instanceof ReturnBlock
                    || this.connectors[index].next instanceof WriteBlock) {
                    if (this.connectors[index].next.width / 2 > maxBlockWidthLeft) {
                        maxBlockWidthLeft = this.connectors[index].next.width / 2;
                    }
                    if (this.connectors[index].next.width / 2 > maxBlockWidthRight) {
                        maxBlockWidthRight = this.connectors[index].next.width / 2;
                    }
                }
            }
        }
        if (maxBlockWidthLeft + maxBlockWidthRight > this.width) {
            this.width = maxBlockWidthRight + maxBlockWidthLeft + this.losangulo.getWidth();
        }
    }
    resizeBiggestSonWidth() {
        var maxWidthDrawing = 0;
        for (var index = 0; index < this.connectors.length; index++) {
            if (this.connectors[index].next != null) {
                if (this.connectors[index].next instanceof IfBlock && maxWidthDrawing < this.connectors[index].next.leftWidth) {
                    maxWidthDrawing = this.connectors[index].next.leftWidth;
                }
                if ((this.connectors[index].next instanceof WhileBlock ||
                    this.connectors[index].next instanceof DoWhileBlock) && maxWidthDrawing < this.connectors[index].next.losangulo.getWidth() / 2) {
                    maxWidthDrawing = this.connectors[index].next.losangulo.getWidth() / 2;
                }
                if ((this.connectors[index].next instanceof DefineBlock
                    || this.connectors[index].next instanceof ReadBlock
                    || this.connectors[index].next instanceof ExecuteBlock
                    || this.connectors[index].next instanceof ContinueBlock
                    || this.connectors[index].next instanceof BreakBlock
                    || this.connectors[index].next instanceof ReturnBlock
                    || this.connectors[index].next instanceof WriteBlock) && maxWidthDrawing < this.connectors[index].next.width / 2) {
                    maxWidthDrawing = this.connectors[index].next.width / 2;
                }
            }
        }
        if (maxWidthDrawing > 0) {
            this.drawingWidth = maxWidthDrawing;
        }
        else {
            if (maxWidthDrawing - WhileBlockShapeSize.losanguloWidth / 2 < 0) {
                this.drawingWidth = (maxWidthDrawing - WhileBlockShapeSize.losanguloWidth / 2) * (-1);
            }
            else {
                this.drawingWidth = maxWidthDrawing - WhileBlockShapeSize.losanguloWidth / 2;
            }
        }
    }
    moveInnerBlocks() {
        var firstConnector = this.findFirstConnector(this);
        this.relocateInnerBlocks(firstConnector);
        this.connectors.find(o => o.next == null).hasArrow = false;
    }
    relocateInnerBlocks(line) {
        if (line.previous == null && line.next == null) {
            line.setNewDimensions(this.rightHorizontalLine.x2, this.rightHorizontalLine.x2, this.rightHorizontalLine.y1, this.blockBottomLine.y1);
        }
        else if (line.next == null && line.previous != null) {
            line.y1 = line.previous.yPosition + line.previous.height;
            line.y2 = this.blockBottomLine.y1;
            line.x1 = this.rightHorizontalLine.x2;
            line.x2 = line.x1;
            line.yPosition = line.y1;
            line.xPosition = line.x1;
        }
        else {
            if (line.previous != null) {
                line.y1 = line.previous.height + line.previous.yPosition;
                line.y2 = line.y1 + LineSize.verticalLineSize;
                line.x1 = this.rightHorizontalLine.x2;
                line.x2 = line.x1;
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
            else {
                line.x1 = this.rightHorizontalLine.x2;
                line.x2 = line.x1;
                line.y1 = this.rightHorizontalLine.y2;
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
    redraw() {
        this.losangulo.setXandY(this.xPosition, this.yPosition);
        this.rightHorizontalLine.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth(), this.xPosition + this.drawingWidth + this.losangulo.getWidth(), this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2);
        this.blockFinalLine.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth() / 2 + 15, this.losangulo.getX() + this.losangulo.getWidth() / 2 + 15, this.yPosition + this.height - 50, this.losangulo.getY() + this.losangulo.getHeight());
        this.blockBottomLine.setNewDimensions(this.rightHorizontalLine.x2, this.losangulo.getX() + this.losangulo.getWidth() / 2 + 15, this.blockFinalLine.y1, this.blockFinalLine.y1);
        this.restoreFluxVerticalLine.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getY() + this.losangulo.getHeight(), this.yPosition + this.height);
        var firstConnector = this.findFirstConnector(this);
        firstConnector.setNewDimensions(this.xPosition + this.drawingWidth - 2, this.xPosition + this.drawingWidth - 2, this.yPosition + this.losangulo.getHeight() / 2, (this.yPosition + this.losangulo.getHeight() / 2) + LineSize.verticalLineSize);
        if (this.connectors.length > 1) {
            firstConnector.hasArrow = true;
        }
    }
}
//# sourceMappingURL=WhileBlock.js.map
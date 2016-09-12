"use strict";
class DoWhileBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.baseHeight = DoWhileBlockShapeSize.blockHeight;
        this.baseWidth = DoWhileBlockShapeSize.blockWidth;
        this.drawingWidth = DoWhileBlockShapeSize.blockWidth - DoWhileBlockShapeSize.losanguloWidth / 2;
        this.losangulo = new Losangulo(this.xPosition, this.yPosition + this.height - DoWhileBlockShapeSize.losanguloHeight, DoWhileBlockShapeSize.losanguloWidth, DoWhileBlockShapeSize.losanguloHeight, DoWhileBlockShapeSize.losanguloColor, true);
        this.losangulo.parent = this;
        this.losangulo.instruction = this.instruction;
        this.connectionCircle = new Circle(this.xPosition, this.yPosition, DoWhileBlockShapeSize.joinShapeRadius, DoWhileBlockShapeSize.joinShapeRadius, DoWhileBlockShapeSize.joinShapeColor, false);
        //No interaction lines 
        this.rightHorizontalLine = new HorizontalLine(false, this.losangulo.getX() + this.losangulo.getWidth(), this.xPosition + this.width, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2, 5, "#000000", false, this, null, null);
        this.rightHorizontalLineDown = new HorizontalLine(true, this.xPosition + this.width, this.losangulo.getX() + this.losangulo.getWidth(), this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2, 5, "#000000", false, this, null, null);
        this.bottomToTopVerticalLine =
            new VerticalLine(true, this.connectionCircle.getX() + this.connectionCircle.getWidth() / 2, this.connectionCircle.getX() + this.connectionCircle.getWidth() / 2, this.losangulo.getY(), this.connectionCircle.getX() + this.connectionCircle.getWidth() / 2, 5, "#000000", false, this, null, null);
        //first connector
        var blockReceiverLine = new VerticalLine(false, this.xPosition + this.width - 2, this.xPosition + this.width - 2, this.yPosition + this.connectionCircle.getHeight() / 2, this.yPosition + this.height * 3 / 4, 5, "#000000", true, this, null, null);
        this.connectors.push(blockReceiverLine);
        //add it to the inherited shapes array
        this.shapes.push(this.losangulo, this.rightHorizontalLine, blockReceiverLine, this.bottomToTopVerticalLine, this.rightHorizontalLineDown, this.connectionCircle);
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
            if (line.next.nextConnector != null) {
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
                this.width = this.baseWidth - DoWhileBlockShapeSize.losanguloWidth + this.losangulo.getWidth();
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
            if (maxWidthDrawing - DoWhileBlockShapeSize.losanguloWidth / 2 < 0) {
                this.drawingWidth = (maxWidthDrawing - DoWhileBlockShapeSize.losanguloWidth / 2) * (-1);
            }
            else {
                this.drawingWidth = maxWidthDrawing - DoWhileBlockShapeSize.losanguloWidth / 2;
            }
        }
    }
    moveInnerBlocks() {
        var firstConnector = this.findFirstConnector(this);
        this.relocateInnerBlocks(firstConnector);
    }
    relocateInnerBlocks(line) {
        if (line.previous == null && line.next == null) {
            line.setNewDimensions(this.rightHorizontalLine.x1, this.rightHorizontalLine.x1, this.rightHorizontalLine.y1, this.losangulo.getY() + this.losangulo.getHeight() / 2);
            return;
        }
        else if (line.next == null && line.previous != null) {
            line.y1 = line.previous.yPosition + line.previous.height;
            line.y2 = this.losangulo.getY() + this.losangulo.getHeight() / 2;
            line.x1 = this.rightHorizontalLine.x1;
            line.x2 = line.x1;
            line.yPosition = line.y1;
            line.xPosition = line.x1;
            return;
        }
        else {
            if (line.previous != null) {
                line.y1 = line.previous.height + line.previous.yPosition;
                line.y2 = line.y1 + LineSize.verticalLineSize;
                line.x1 = this.rightHorizontalLine.x1;
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
                line.x1 = this.rightHorizontalLine.x1;
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
        this.losangulo.setXandY(this.xPosition, this.yPosition + this.height - this.losangulo.getHeight());
        this.connectionCircle.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth() / 2 - this.connectionCircle.getWidth() / 2, this.yPosition, DoWhileBlockShapeSize.joinShapeRadius, DoWhileBlockShapeSize.joinShapeRadius);
        this.rightHorizontalLine.setNewDimensions(this.xPosition + this.drawingWidth + this.losangulo.getWidth(), this.connectionCircle.getX() + this.connectionCircle.getWidth(), this.connectionCircle.getY() + this.connectionCircle.getHeight() / 2, this.connectionCircle.getY() + this.connectionCircle.getHeight() / 2);
        this.rightHorizontalLineDown.setNewDimensions(this.xPosition + this.drawingWidth + this.losangulo.getWidth(), this.losangulo.getX() + this.losangulo.getWidth(), this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2);
        this.bottomToTopVerticalLine.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getX() + this.losangulo.getWidth() / 2, this.losangulo.getY(), this.connectionCircle.getY() + this.connectionCircle.getHeight());
    }
}
//# sourceMappingURL=DoWhileBlock.js.map
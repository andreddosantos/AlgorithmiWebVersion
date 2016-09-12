"use strict";
class IfBlock extends Block {
    constructor(x, y, minWidth, minHeight, myCanvas, fluxogramManager, instruction) {
        super(x, y, minWidth, minHeight, myCanvas, fluxogramManager);
        this.instruction = instruction;
        this.leftWidth = IfBlockShapeSize.blockWidth / 2;
        this.rightWidth = IfBlockShapeSize.blockWidth / 2;
        this.connectors == null;
        //implement all related shapes.
        //top shape
        this.losangulo = new Losangulo(this.xPosition + this.width / 2 - IfBlockShapeSize.losanguloWidth / 2, this.yPosition, IfBlockShapeSize.losanguloWidth, IfBlockShapeSize.losanguloHeight, IfBlockShapeSize.losanguloColor, true);
        this.losangulo.parent = this;
        this.losangulo.instruction = this.instruction;
        this.baseHeight = IfBlockShapeSize.blockHeight;
        this.baseWidth = IfBlockShapeSize.blockWidth;
        this.drawingWidthRight = IfBlockShapeSize.blockWidth / 2 - IfBlockShapeSize.losanguloWidth / 2;
        this.drawingWidthLeft = IfBlockShapeSize.blockWidth / 2 - IfBlockShapeSize.losanguloWidth / 2;
        //No interaction lines 
        this.rightHorizontalLine = new HorizontalLine(false, this.losangulo.getX() + this.losangulo.getWidth(), this.xPosition + this.width, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2, 5, "#000000", false, this, null, null);
        this.leftHorizontalLine = new HorizontalLine(false, this.losangulo.getX(), this.xPosition, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2, 5, "#000000", false, this, null, null);
        var restoreFluxVerticalLineLeft = new VerticalLine(false, this.xPosition, this.xPosition, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.yPosition + this.height - this.losangulo.height * 1 / 4, 5, "#000000", true, this, null, null);
        var restoreFluxVerticalLineRight = new VerticalLine(false, this.xPosition + this.width, this.xPosition + this.width, this.losangulo.getY() + this.losangulo.getHeight() / 2, this.yPosition + this.height - this.losangulo.height * 1 / 4, 5, "#000000", true, this, null, null);
        this.restoreFluxHorizontalLineLeft =
            new HorizontalLine(true, this.xPosition, this.losangulo.getX() + this.losangulo.width * 1 / 4, this.yPosition + this.height - this.losangulo.getWidth() * 1 / 4, this.yPosition + this.height - this.losangulo.width * 1 / 4, 5, "#000000", false, this, null, null);
        this.restoreFluxHorizontalLineRight =
            new HorizontalLine(true, this.xPosition + this.width, this.losangulo.getX() + this.losangulo.getWidth() - this.losangulo.width * 1 / 4, this.yPosition + this.height - this.losangulo.width * 1 / 4, this.yPosition + this.height - this.losangulo.width * 1 / 4, 5, "#000000", false, this, null, null);
        this.connectionCircle = new Circle(this.restoreFluxHorizontalLineLeft.x2, this.restoreFluxHorizontalLineLeft.y1, IfBlockShapeSize.joinShapeRadius, IfBlockShapeSize.joinShapeRadius, IfBlockShapeSize.joinShapeColor, false);
        this.leftConnectors = [];
        this.rightConnectors = [];
        this.leftConnectors.push(restoreFluxVerticalLineLeft);
        this.rightConnectors.push(restoreFluxVerticalLineRight);
        //add it to the inherited shapes array
        this.shapes.push(this.losangulo, this.rightHorizontalLine, this.leftHorizontalLine, this.restoreFluxHorizontalLineLeft, restoreFluxVerticalLineLeft, this.restoreFluxHorizontalLineRight, restoreFluxVerticalLineRight, this.connectionCircle);
        for (var index = 0; index < this.shapes.length; index++) {
            myCanvas.addShape(this.shapes[index]);
        }
    }
    destroy() {
        this.destroySons(this.findFirstConnectorLeft());
        this.destroySons(this.findFirstConnectorRight());
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
    removeConnector(line) {
        var indexLineLeft = this.leftConnectors.findIndex(s => s === line);
        var indexLineRight = this.rightConnectors.findIndex(s => s === line);
        if (indexLineLeft > -1) {
            this.leftConnectors.splice(indexLineLeft, 1);
            this.canvas.removeShape(line);
            return;
        }
        if (indexLineRight > -1) {
            this.rightConnectors.splice(indexLineRight, 1);
            this.canvas.removeShape(line);
            return;
        }
    }
    editBlockInstruction(instruction) {
        this.fluxogramManager.editBlockInstruction(this, instruction);
    }
    moveInnerBlocks() {
        //find first connector left
        var firstConnectorLeft = this.findFirstConnectorLeft();
        //realocate left
        this.relocateInnerBlocks(firstConnectorLeft, this.leftHorizontalLine);
        //find first connector right
        var firstConnectorRight = this.findFirstConnectorRight();
        //realocate right
        this.relocateInnerBlocks(firstConnectorRight, this.rightHorizontalLine);
    }
    debugBlock() {
        this.fluxogramManager.debugBlock(this);
    }
    relocateInnerBlocks(line, guideLine) {
        if (line.previous == null && line.next == null) {
            line.setNewDimensions(guideLine.x2, guideLine.x2, guideLine.y1, this.restoreFluxHorizontalLineLeft.y1);
        }
        else if (line.next == null && line.previous != null) {
            line.y1 = line.previous.yPosition + line.previous.height;
            line.y2 = this.restoreFluxHorizontalLineLeft.y1;
            line.x1 = guideLine.x2;
            line.x2 = line.x1;
            line.yPosition = line.y1;
            line.xPosition = line.x1;
        }
        else {
            if (line.previous != null) {
                line.y1 = line.previous.height + line.previous.yPosition;
                line.y2 = line.y1 + LineSize.verticalLineSize;
                line.x1 = guideLine.x2;
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
                this.relocateInnerBlocks(line.next.nextConnector, guideLine);
            }
            else {
                line.x1 = guideLine.x2;
                line.x2 = line.x1;
                line.y1 = guideLine.y2;
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
                this.relocateInnerBlocks(line.next.nextConnector, guideLine);
            }
        }
    }
    storeNewConnector(connector, pressedConnector) {
        //we need to find out where it belongs, left or right connector container
        for (var index = 0; index < this.leftConnectors.length; index++) {
            if (pressedConnector == this.leftConnectors[index]) {
                this.leftConnectors.push(connector);
                return;
            }
        }
        for (var index = 0; index < this.rightConnectors.length; index++) {
            if (pressedConnector == this.rightConnectors[index]) {
                this.rightConnectors.push(connector);
                return;
            }
        }
    }
    resize() {
        //Height
        //find first connector left
        var firstConnectorLeft = this.findFirstConnectorLeft();
        //realocate left
        var leftHeight = this.resizeRecursiveHeight(firstConnectorLeft, 0);
        //find first connector right
        var firstConnectorRight = this.findFirstConnectorRight();
        //realocate right
        var rightHeight = this.resizeRecursiveHeight(firstConnectorRight, 0);
        this.losangulo.instruction = this.instruction;
        this.losangulo.getWidth();
        //Width
        if (this.leftConnectors.length < 2) {
            this.leftWidth = (this.baseWidth / 2 - IfBlockShapeSize.losanguloWidth / 2) + this.losangulo.getWidth() / 2;
        }
        else {
            this.leftWidth = this.resizeRecursiveWidth(firstConnectorLeft, 0, this);
        }
        if (this.rightConnectors.length < 2) {
            this.rightWidth = (this.baseWidth / 2 - IfBlockShapeSize.losanguloWidth / 2) + this.losangulo.getWidth() / 2;
        }
        else {
            this.rightWidth = this.resizeRecursiveWidth(firstConnectorRight, 0, this);
        }
        this.width = this.leftWidth.valueOf() + this.rightWidth.valueOf();
        //Resize Height 
        if (leftHeight > rightHeight) {
            this.height = leftHeight;
        }
        else {
            this.height = rightHeight;
        }
        return 0;
    }
    widthFinalReajust() {
        this.reajustLeftWidth();
        this.reajustRightWidth();
        this.width = this.leftWidth.valueOf() + this.rightWidth.valueOf();
    }
    /***
     *
     * Calculate final left width
     * This is needed because the left and right width returned in the resize width method might
     * be wrong because it returns the biggest block width, but we can have one not that big but groing
     * in the opposite direction
     */
    reajustLeftWidth() {
        var maxWidthDrawingLeft = 0;
        var maxWidthDrawingRight = 0;
        for (var index = 0; index < this.leftConnectors.length; index++) {
            if (this.leftConnectors[index].next != null) {
                if (this.leftConnectors[index].next instanceof IfBlock) {
                    if (this.leftConnectors[index].next.leftWidth > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.leftConnectors[index].next.leftWidth;
                    }
                    if (this.leftConnectors[index].next.rightWidth > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.leftConnectors[index].next.rightWidth;
                    }
                }
                if (this.leftConnectors[index].next instanceof WhileBlock
                    || this.leftConnectors[index].next instanceof DoWhileBlock) {
                    if ((this.leftConnectors[index].next.width - this.leftConnectors[index].next.losangulo.getWidth() / 2)
                        > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.leftConnectors[index].next.width
                            - this.leftConnectors[index].next.losangulo.getWidth() / 2;
                    }
                    if (this.leftConnectors[index].next.losangulo.getWidth() / 2 > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.leftConnectors[index].next.losangulo.getWidth() / 2;
                    }
                }
                if (this.leftConnectors[index].next instanceof DefineBlock
                    || this.leftConnectors[index].next instanceof ReadBlock
                    || this.leftConnectors[index].next instanceof ExecuteBlock
                    || this.leftConnectors[index].next instanceof ReturnBlock
                    || this.leftConnectors[index].next instanceof ContinueBlock
                    || this.leftConnectors[index].next instanceof BreakBlock
                    || this.leftConnectors[index].next instanceof WriteBlock) {
                    if (this.leftConnectors[index].next.width / 2 > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.leftConnectors[index].next.width / 2;
                    }
                    if (this.leftConnectors[index].next.width / 2 > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.leftConnectors[index].next.width / 2;
                    }
                }
            }
        }
        if (maxWidthDrawingLeft + maxWidthDrawingRight > this.leftWidth) {
            this.leftWidth = maxWidthDrawingLeft + maxWidthDrawingRight + this.losangulo.getWidth() / 2;
        }
    }
    /***
    *
    * Calculate final right width
    * This is needed because the left and right width returned in the resize width method might
    * be wrong because it returns the biggest block width, but we can have one not that big but groing
    * in the opposite direction
    */
    reajustRightWidth() {
        var maxWidthDrawingLeft = 0;
        var maxWidthDrawingRight = 0;
        for (var index = 0; index < this.rightConnectors.length; index++) {
            if (this.rightConnectors[index].next != null) {
                if (this.rightConnectors[index].next instanceof IfBlock) {
                    if (this.rightConnectors[index].next.leftWidth > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.rightConnectors[index].next.leftWidth;
                    }
                    if (this.rightConnectors[index].next.rightWidth > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.rightConnectors[index].next.rightWidth;
                    }
                }
                if (this.rightConnectors[index].next instanceof WhileBlock
                    || this.rightConnectors[index].next instanceof DoWhileBlock) {
                    if ((this.rightConnectors[index].next.width - this.rightConnectors[index].next.losangulo.getWidth() / 2)
                        > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.rightConnectors[index].next.width
                            - this.rightConnectors[index].next.losangulo.getWidth() / 2;
                    }
                    if (this.rightConnectors[index].next.losangulo.getWidth() / 2 > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.rightConnectors[index].next.losangulo.getWidth() / 2;
                    }
                }
                if (this.rightConnectors[index].next instanceof DefineBlock
                    || this.rightConnectors[index].next instanceof ReadBlock
                    || this.rightConnectors[index].next instanceof ExecuteBlock
                    || this.rightConnectors[index].next instanceof ReturnBlock
                    || this.rightConnectors[index].next instanceof ContinueBlock
                    || this.rightConnectors[index].next instanceof BreakBlock
                    || this.rightConnectors[index].next instanceof WriteBlock) {
                    if (this.rightConnectors[index].next.width / 2 > maxWidthDrawingLeft) {
                        maxWidthDrawingLeft = this.rightConnectors[index].next.width / 2;
                    }
                    if (this.rightConnectors[index].next.width / 2 > maxWidthDrawingRight) {
                        maxWidthDrawingRight = this.rightConnectors[index].next.width / 2;
                    }
                }
            }
        }
        if (maxWidthDrawingLeft + maxWidthDrawingRight > this.rightWidth) {
            this.rightWidth = maxWidthDrawingLeft + maxWidthDrawingRight + this.losangulo.getWidth() / 2;
        }
    }
    resizeBiggestSonWidth() {
        this.resizeWidthLeft();
        this.resizeWidthRight();
    }
    resizeWidthLeft() {
        var maxWidthDrawing = 0;
        for (var index = 0; index < this.leftConnectors.length; index++) {
            if (this.leftConnectors[index].next != null) {
                if (this.leftConnectors[index].next instanceof IfBlock && maxWidthDrawing < this.leftConnectors[index].next.rightWidth) {
                    if (this.leftConnectors[index].next.rightConnectors.length > 1) {
                        maxWidthDrawing = this.leftConnectors[index].next.rightWidth;
                    }
                    else {
                        maxWidthDrawing = this.leftConnectors[index].next.rightWidth;
                    }
                }
                else if ((this.leftConnectors[index].next instanceof WhileBlock || this.leftConnectors[index].next instanceof DoWhileBlock) && this.leftConnectors[index].next.width > maxWidthDrawing) {
                    maxWidthDrawing = this.leftConnectors[index].next.width - this.leftConnectors[index].next.losangulo.getWidth() / 2;
                }
                else if (this.leftConnectors[index].next.width > maxWidthDrawing &&
                    (this.leftConnectors[index].next instanceof DefineBlock
                        || this.leftConnectors[index].next instanceof ReadBlock
                        || this.leftConnectors[index].next instanceof ExecuteBlock
                        || this.leftConnectors[index].next instanceof ReturnBlock
                        || this.leftConnectors[index].next instanceof ContinueBlock
                        || this.leftConnectors[index].next instanceof BreakBlock
                        || this.leftConnectors[index].next instanceof WriteBlock)) {
                    maxWidthDrawing = this.leftConnectors[index].next.width / 2;
                }
            }
        }
        if (maxWidthDrawing <= 0) {
            this.drawingWidthLeft = this.baseWidth.valueOf() / 2 - IfBlockShapeSize.losanguloWidth / 2;
        }
        else {
            this.drawingWidthLeft = maxWidthDrawing; //- this.losangulo.getWidth()/2;
        }
    }
    resizeWidthRight() {
        var maxWidthDrawing = 0;
        for (var index = 0; index < this.rightConnectors.length; index++) {
            if (this.rightConnectors[index].next != null) {
                if (this.rightConnectors[index].next instanceof IfBlock
                    && maxWidthDrawing < this.rightConnectors[index].next.leftWidth) {
                    maxWidthDrawing = this.rightConnectors[index].next.leftWidth;
                }
                else if ((this.rightConnectors[index].next instanceof WhileBlock || this.rightConnectors[index].next instanceof DoWhileBlock)
                    && maxWidthDrawing < this.rightConnectors[index].next.losangulo.getWidth() / 2) {
                    maxWidthDrawing = this.rightConnectors[index].next.losangulo.getWidth() / 2;
                }
                else if (this.rightConnectors[index].next.width / 2 > maxWidthDrawing &&
                    (this.rightConnectors[index].next instanceof DefineBlock
                        || this.rightConnectors[index].next instanceof ReadBlock
                        || this.rightConnectors[index].next instanceof ExecuteBlock
                        || this.rightConnectors[index].next instanceof ContinueBlock
                        || this.rightConnectors[index].next instanceof BreakBlock
                        || this.rightConnectors[index].next instanceof ReturnBlock
                        || this.rightConnectors[index].next instanceof WriteBlock)) {
                    maxWidthDrawing = this.rightConnectors[index].next.width / 2;
                }
            }
        }
        if (maxWidthDrawing <= 0) {
            this.drawingWidthRight = this.baseWidth.valueOf() / 2 - IfBlockShapeSize.losanguloWidth / 2;
        }
        else {
            this.drawingWidthRight = maxWidthDrawing; // - this.losangulo.getWidth()/2;
        }
    }
    //adapt left and right width
    redraw() {
        this.losangulo.setXandY(this.xPosition.valueOf() + this.drawingWidthLeft.valueOf(), this.yPosition);
        this.rightHorizontalLine.setNewDimensions(this.losangulo.getX() + this.losangulo.getWidth(), this.losangulo.getX() + this.losangulo.getWidth() + this.drawingWidthRight.valueOf(), this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2);
        this.leftHorizontalLine.setNewDimensions(this.losangulo.getX(), this.xPosition.valueOf(), this.losangulo.getY() + this.losangulo.getHeight() / 2, this.losangulo.getY() + this.losangulo.getHeight() / 2);
        this.restoreFluxHorizontalLineLeft.setNewDimensions(this.leftHorizontalLine.x2, this.previousConnector.getX() - this.connectionCircle.getWidth() / 2, this.yPosition + this.height - this.losangulo.getHeight() * 1 / 4, this.yPosition + this.height - this.losangulo.getHeight() * 1 / 4);
        this.connectionCircle.setNewDimensions(this.restoreFluxHorizontalLineLeft.x2, this.restoreFluxHorizontalLineLeft.y1 - this.connectionCircle.getHeight() / 2, IfBlockShapeSize.joinShapeRadius, IfBlockShapeSize.joinShapeRadius);
        this.restoreFluxHorizontalLineRight.setNewDimensions(this.rightHorizontalLine.x2, this.connectionCircle.getX() + this.connectionCircle.getWidth(), this.yPosition + this.height - this.losangulo.getHeight() * 1 / 4, this.yPosition + this.height - this.losangulo.getHeight() * 1 / 4);
        var firstConnector = null;
        if (this.leftConnectors.length <= 1) {
            firstConnector = this.findFirstConnectorLeft();
            firstConnector.setNewDimensions(this.xPosition + this.width - 2, this.xPosition + this.width - 2, this.yPosition + this.losangulo.getHeight() / 2, this.yPosition + this.height);
        }
        if (this.rightConnectors.length <= 1) {
            firstConnector = this.findFirstConnectorRight();
            firstConnector.setNewDimensions(this.xPosition + this.width - 2, this.xPosition + this.width - 2, this.yPosition + IfBlockShapeSize.losanguloHeight / 2, this.yPosition + this.height);
        }
    }
    findFirstConnectorLeft() {
        var firstConnector = null;
        for (var index = 0; index < this.leftConnectors.length; index++) {
            if (this.leftConnectors[index].previous == null) {
                //encontrei o primeiro connector
                firstConnector = this.leftConnectors[index];
            }
        }
        return firstConnector;
    }
    findFirstConnectorRight() {
        var firstConnector = null;
        for (var index = 0; index < this.rightConnectors.length; index++) {
            if (this.rightConnectors[index].previous == null) {
                //encontrei o primeiro connector
                firstConnector = this.rightConnectors[index];
            }
        }
        return firstConnector;
    }
}
//# sourceMappingURL=IfBlock.js.map
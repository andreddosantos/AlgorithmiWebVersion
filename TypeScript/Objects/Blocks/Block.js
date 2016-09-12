"use strict";
class Block {
    constructor(x, y, minWidth, minHeight, canvas, fluxogramManager) {
        this.fluxogramManager = fluxogramManager;
        this.canvas = canvas;
        this.xPosition = x;
        this.yPosition = y;
        this.width = minWidth;
        this.executionState = "";
        this.height = minHeight;
        this.shapes = [];
        this.connectors = [];
        this.instruction = "";
    }
    destroy() {
        this.destroyShapes();
    }
    destroyShapes() {
        var line = this.nextConnector;
        this.previousConnector.next = line.next;
        if (line.next != null) {
            line.next.previousConnector = this.previousConnector;
        }
        for (var index = 0; index < this.shapes.length; index++) {
            this.canvas.removeShape(this.shapes[index]);
        }
        var indexBlock = this.fluxogramManager.blocks.findIndex(s => s === this);
        if (indexBlock > -1) {
            this.fluxogramManager.blocks.splice(indexBlock, 1);
        }
        line.parent.removeConnector(line);
    }
    removeConnector(line) {
        var indexLine = this.connectors.findIndex(s => s === line);
        if (indexLine > -1) {
            this.connectors.splice(indexLine, 1);
            this.canvas.removeShape(line);
        }
    }
    redraw() { }
    debugBlock() {
        this.fluxogramManager.debugBlock(this);
    }
    moveInnerBlocks() { }
    widthFinalReajust() { }
    resizeBiggestSonWidth() { }
    draw(ctx) {
        for (var index = 0; index < this.shapes.length; index++) {
            this.shapes[index].draw(ctx);
        }
    }
    addBlock(line, blockType, instruction) {
        return this.fluxogramManager.addblock(this, line, blockType, instruction, null, null);
    }
    editBlockInstruction(instruction) {
        this.instruction = instruction;
    }
    resize() {
        var firstConnector = this.findFirstConnector(this);
        if (firstConnector != null) {
            var blockHeight = this.resizeRecursiveHeight(firstConnector, 0) + LineSize.verticalLineSize;
            this.height = blockHeight;
            this.width = this.resizeRecursiveWidth(firstConnector, 0, this);
        }
    }
    resizeRecursiveHeight(connector, height) {
        height = height + LineSize.verticalLineSize;
        if (connector.next == null && connector.previous == null) {
            return this.baseHeight;
        }
        if (connector.next == null) {
            return height + 80;
        }
        else {
            if (connector.next instanceof IfBlock == false) {
                if (connector.next.connectors.length <= 1) {
                    return this.resizeRecursiveHeight(connector.next.nextConnector, height + connector.next.height);
                }
                else {
                    var childHeight = this.resizeRecursiveHeight(this.findFirstConnector(connector.next), 0);
                    return this.resizeRecursiveHeight(connector.next.nextConnector, height + childHeight);
                }
            }
            else {
                if (connector.next.leftConnectors.length <= 1 && connector.next.rightConnectors.length <= 1) {
                    return this.resizeRecursiveHeight(connector.next.nextConnector, height + connector.next.height);
                }
                var childHeightLeft = this.resizeRecursiveHeight(connector.next.findFirstConnectorLeft(), 0);
                var childHeightRight = this.resizeRecursiveHeight(connector.next.findFirstConnectorRight(), 0);
                if (childHeightLeft > childHeightRight) {
                    return this.resizeRecursiveHeight(connector.next.nextConnector, height + childHeightLeft);
                }
                else {
                    return this.resizeRecursiveHeight(connector.next.nextConnector, height + childHeightRight);
                }
            }
        }
    }
    resizeRecursiveWidth(connector, width, parentBlock) {
        if (connector.next == null && connector.parent == parentBlock) {
            if (connector.parent instanceof WhileBlock || connector.parent instanceof DoWhileBlock) {
                return parentBlock.losangulo.getWidth() + width;
            }
            else if (connector.parent instanceof IfBlock) {
                return parentBlock.losangulo.getWidth() / 2 + width;
            }
            else if (connector.parent instanceof BegginingBlock) {
                return width;
            }
            return width;
        }
        //If my block doesn't has any son
        if (connector.previous == null && connector.next == null) {
            return (connector.parent.baseWidth - IfBlockShapeSize.losanguloWidth / 2) + connector.parent.losangulo.getWidth() + parentBlock.losangulo.getWidth() / 2;
        }
        if (connector.next == null) {
            return width;
        }
        //If my connector.next is an IfBlock
        if (connector.next instanceof IfBlock) {
            var leftWidth = 0;
            var rightWidth = 0;
            //check if my next left side has any sons
            if (connector.next.leftConnectors.length > 1) {
                leftWidth = this.resizeRecursiveWidth(connector.next.findFirstConnectorLeft(), 0, parentBlock);
            }
            //check if my next right side has any sons
            if (connector.next.rightConnectors.length > 1) {
                rightWidth = this.resizeRecursiveWidth(connector.next.findFirstConnectorRight(), 0, parentBlock);
            }
            //Calculate If block final Width
            if (leftWidth == 0) {
                leftWidth = connector.next.baseWidth / 2 - IfBlockShapeSize.losanguloWidth / 2;
            }
            if (rightWidth == 0) {
                rightWidth = connector.next.baseWidth / 2 - IfBlockShapeSize.losanguloWidth / 2;
            }
            if (width < leftWidth + rightWidth + connector.next.losangulo.getWidth()) {
                return this.resizeRecursiveWidth(connector.next.nextConnector, leftWidth + rightWidth + connector.next.losangulo.getWidth(), parentBlock);
            }
            return this.resizeRecursiveWidth(connector.next.nextConnector, width, parentBlock);
        }
        else if (connector.next instanceof WhileBlock || connector.next instanceof DoWhileBlock) {
            if (connector.next.connectors.length < 2) {
                if (width < (connector.next.baseWidth - WhileBlockShapeSize.losanguloWidth) + connector.next.losangulo.getWidth()) {
                    return this.resizeRecursiveWidth(connector.next.nextConnector, (connector.next.baseWidth - WhileBlockShapeSize.losanguloWidth) + connector.next.losangulo.getWidth(), parentBlock);
                }
                return this.resizeRecursiveWidth(connector.next.nextConnector, width, parentBlock);
            }
            else {
                var childwidth = this.resizeRecursiveWidth(this.findFirstConnector(connector.next), 0, parentBlock);
                if (width < childwidth + connector.next.losangulo.getWidth()) {
                    return this.resizeRecursiveWidth(connector.next.nextConnector, childwidth + connector.next.losangulo.getWidth(), parentBlock);
                }
                return this.resizeRecursiveWidth(connector.next.nextConnector, width, parentBlock);
            }
        }
        else if (connector.next instanceof DefineBlock
            || connector.next instanceof ReadBlock
            || connector.next instanceof ExecuteBlock
            || connector.next instanceof WriteBlock
            || connector.next instanceof ReturnBlock
            || connector.next instanceof BreakBlock
            || connector.next instanceof ContinueBlock) {
            if (width < connector.next.width) {
                return this.resizeRecursiveWidth(connector.next.nextConnector, connector.next.width, parentBlock);
            }
            else {
                return this.resizeRecursiveWidth(connector.next.nextConnector, width, parentBlock);
            }
        }
    }
    findFirstConnector(block) {
        var firstConnector = null;
        for (var index = 0; index < block.connectors.length; index++) {
            if (block.connectors[index].previous == null) {
                //encontrei o primeiro connector
                firstConnector = block.connectors[index];
                break;
            }
        }
        return firstConnector;
    }
}
//# sourceMappingURL=Block.js.map
"use strict";
/**
 *
 * FluxogramManager
 *
 */
class FluxogramManager {
    constructor(projectName) {
        //HTML Events
        this.canvas = document.createElement('canvas');
        this.fluxoFileManager = new FluxogramFileManager(this);
        this.projectName = projectName;
        this.fluxogramArea = document.createElement('div');
        this.fluxogramArea.setAttribute("id", "fluxogramContainer");
        this.fluxogramArea.appendChild(this.canvas);
        document.getElementById('fluxogramDiv').appendChild(this.fluxogramArea);
        this.canvas.width = this.fluxogramArea.offsetWidth;
        this.canvas.height = this.fluxogramArea.offsetHeight;
        this.blocks = [];
        this.fluxogramArea.addEventListener('onresize', (e) => {
            this.resizeCanvas();
        });
        this.fluxogramArea.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        this.executor = new Executor(this);
        this.shapeObjectManager = new ObjectManager(this.canvas, this);
        this.canvas.getContext("2d").lineHeight = 6;
        this.create();
    }
    /**
     * Creates new Fluxogram
     */
    create() {
        this.canvas.setAttribute("id", "fluxogramCanvas");
        this.blocks = [];
        this.shapeObjectManager.shapes = [];
        this.resizeCanvas();
        this.startingBlock = new BegginingBlock(200, 40, BegginingBlockShapeSize.endShapeSizeWidth, BegginingBlockShapeSize.blockHeight, this.shapeObjectManager, this, "");
        this.blocks.push(this.startingBlock);
        this.resizeFluxogramBlocks();
        this.shapeObjectManager.scaleFactor = 1;
        this.shapeObjectManager.horizontalPan = 0;
        this.shapeObjectManager.verticalPan = 0;
        this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
        this.shapeObjectManager.draw();
    }
    execute(velocity) {
        this.executor.stopExecution();
        if (this.executor.validateFluxogram()) {
            var temp = [];
            document.getElementById("internalOutputContentDiv").innerHTML = ' <span style="color:red;"> Begin Program ' + eval('Date()') + ' : <span><br><br>';
            this.executor.execute(this.startingBlock.findFirstConnector(this.startingBlock), velocity, temp);
        }
        else {
            new WarningPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, "The fluxogram can not be executed with invalid blocks, try to edit the highlited blocks.");
        }
    }
    saveToImage() {
        if (!this.executor.isInExecution() && !this.shapeObjectManager.popUpIsActive) {
            this.fluxoFileManager.saveToImage();
        }
    }
    resizeCanvas() {
        this.canvas.width = document.getElementById("fluxogramDiv").offsetWidth;
        this.canvas.height = document.getElementById("fluxogramDiv").offsetHeight;
        this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
        this.shapeObjectManager.draw();
    }
    scaleDown(e) {
        e.preventDefault();
        this.shapeObjectManager.scaleFactor = Math.round((this.shapeObjectManager.scaleFactor / 1.1) * 100) / 100 > 0.6 ? Math.round((this.shapeObjectManager.scaleFactor / 1.1) * 100) / 100 : 0.6;
        this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
        this.shapeObjectManager.draw();
    }
    showFluxogramCode() {
        if (!this.executor.isInExecution() && !this.shapeObjectManager.popUpIsActive) {
            var temp = [];
            this.fluxoFileManager.createFileFromFluxogram(this.startingBlock.findFirstConnector(this.startingBlock), temp);
            var projectName = document.getElementById('projectName').innerHTML;
            var fileContent = this.fluxoFileManager.parseFluxoInfoToShow(temp);
            new ShowCodePopUpPopUp(fileContent);
        }
    }
    scaleUp(e) {
        e.preventDefault();
        this.shapeObjectManager.scaleFactor *= 1.1;
        this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
        this.shapeObjectManager.draw();
    }
    editBlockInstruction(blockToEdit, instruction) {
        blockToEdit.instruction = instruction;
        this.resizeFluxogramBlocks();
        this.resizeFluxogramBlocks();
    }
    scopeFluxogram() {
        this.shapeObjectManager.horizontalPan = 0;
        this.shapeObjectManager.verticalPan = 0;
        this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
        this.shapeObjectManager.draw();
    }
    openHelpMenu(innerTab) {
        if (!this.executor.isInExecution()) {
            new helpPopUp(innerTab);
        }
    }
    openFile(file) {
        if (!this.executor.isInExecution() && !this.shapeObjectManager.popUpIsActive) {
            this.fluxoFileManager.openFile(file);
            this.resizeFluxogramBlocks();
            this.resizeFluxogramBlocks();
            this.shapeObjectManager.scaleFactor = 1;
            this.shapeObjectManager.horizontalPan = 0;
            this.shapeObjectManager.verticalPan = 0;
            this.shapeObjectManager.context.setTransform(this.shapeObjectManager.scaleFactor, 0, 0, this.shapeObjectManager.scaleFactor, this.shapeObjectManager.horizontalPan, this.shapeObjectManager.verticalPan);
            this.shapeObjectManager.draw();
        }
    }
    newProject() {
        if (this.blocks.length > 1 && !this.executor.isInExecution())
            new ConfirmPopUp(ConfirmSuccessWarningPopUpSize.Width, ConfirmSuccessWarningPopUpSize.Heigth, "You will erase the entire fluxogram do you wish to continue?", "fluxogram.create()");
    }
    downloadFluxogram() {
        debugger;
        if (!this.executor.isInExecution() && !this.shapeObjectManager.popUpIsActive) {
            this.fluxoFileManager.saveToFile();
        }
    }
    /**
     * Adds new block in the fluxogram acording to parent block
     */
    addblock(parentBlock, line, blockType, instruction, value, type) {
        //New Block to be added;
        var newBlock = new Block(0, 0, 0, 0, this.shapeObjectManager, this);
        //New connector
        var newVerticalLine = new VerticalLine(false, 100, 120, 120, 1050, 60, "#000000", true, parentBlock, null, null);
        //Connect the connector to its container and next block
        newVerticalLine.parent = parentBlock;
        newVerticalLine.next = line.next;
        if (newVerticalLine.next == null && newVerticalLine.previous != null) {
            newVerticalLine.hasArrow = true;
        }
        //Now we'll add the specifics of the new selected block
        switch (blockType) {
            case 0:
                newBlock = new WhileBlock(100, 0, WhileBlockShapeSize.blockWidth, WhileBlockShapeSize.blockHeight, this.shapeObjectManager, this, instruction);
                break;
            case 1:
                newBlock = new IfBlock(100, 0, IfBlockShapeSize.blockWidth, IfBlockShapeSize.blockHeight, this.shapeObjectManager, this, instruction);
                break;
            case 2:
                newBlock = new DefineBlock(100, 0, DefineBlockShapeSize.rectangleWidth, DefineBlockShapeSize.rectangleHeight, this.shapeObjectManager, this, instruction, value, type);
                break;
            case 3:
                newBlock = new ReadBlock(100, 0, ReadBlockShapeSize.readShapeWidth, ReadBlockShapeSize.readShapeHeight, this.shapeObjectManager, this, instruction, "");
                break;
            case 4:
                newBlock = new ExecuteBlock(100, 0, ExecuteBlockShapeSize.rectangleWidth, ExecuteBlockShapeSize.rectangleHeight, this.shapeObjectManager, this, instruction);
                break;
            case 5:
                newBlock = new WriteBlock(100, 0, WriteBlockShapeSize.rectangleWidth, WriteBlockShapeSize.rectangleHeight, this.shapeObjectManager, this, instruction);
                break;
            case 6:
                newBlock = new DoWhileBlock(100, 0, ReturnBlockShapeSize.rectangleWidth, ReturnBlockShapeSize.rectangleHeight, this.shapeObjectManager, this, instruction);
                break;
            case 7:
                newBlock = new BreakBlock(100, 0, ReadBlockShapeSize.readShapeWidth, ReadBlockShapeSize.readShapeHeight, this.shapeObjectManager, this, instruction, "");
                break;
            case 8:
                newBlock = new ContinueBlock(100, 0, ReadBlockShapeSize.readShapeWidth, ReadBlockShapeSize.readShapeHeight, this.shapeObjectManager, this, instruction, "");
                break;
            default:
                "None";
        }
        //We need to know if our parent block is an IfBlkock in order to know in witch of the connectors array(Left/Right) should we put the new vertical line
        if (parentBlock instanceof IfBlock) {
            parentBlock.storeNewConnector(newVerticalLine, line);
        }
        else {
            parentBlock.connectors.push(newVerticalLine);
        }
        newBlock.previousConnector = line;
        newVerticalLine.previous = newBlock;
        newBlock.nextConnector = newVerticalLine;
        line.next = newBlock;
        if (newVerticalLine.next != null) {
            newVerticalLine.next.previousConnector = newVerticalLine;
        }
        this.blocks.push(newBlock);
        this.shapeObjectManager.shapes.push(newVerticalLine);
        this.resizeFluxogramBlocks();
        return newBlock;
    }
    removeBlock(blockToRemove) {
        blockToRemove.destroy();
        if (this.startingBlock.connectors.length == 1) {
            this.create();
        }
        else {
            this.resizeFluxogramBlocks();
        }
    }
    resizeFluxogramBlocks() {
        for (var index = this.blocks.length - 1; index > 0; index--) {
            this.blocks[index].resize();
        }
        for (var index = this.blocks.length - 1; index > 0; index--) {
            this.blocks[index].widthFinalReajust();
        }
        for (var index = 0; index < this.blocks.length; index++) {
            this.blocks[index].resizeBiggestSonWidth();
        }
        for (var index = 0; index < this.blocks.length; index++) {
            this.blocks[index].moveInnerBlocks();
        }
        this.shapeObjectManager.draw();
    }
    debugBlock(block) {
        /*
                  var drawing = this.canvas;
                 var con = drawing.getContext("2d");
                
                //Desenhar a caixa
                 con.fillStyle = "white";
                 con.lineWidth = 5;
        
                 if(block instanceof WhileBlock || block instanceof DoWhileBlock || block instanceof IfBlock){
                     con.fillRect(block.rightHorizontalLine.x2 +10,block.rightHorizontalLine.y1-43, 200, 150);
                 
                 }else{
                     con.fillRect(block.xPosition +10,block.yPosition-43, 200, 150);
                 }
        
                         //Escrever o texto
                 con.fillStyle = "green";
                 con.font = "12pt sans-serif";
        
                 if(block instanceof WhileBlock || block instanceof DoWhileBlock){
        
                      con.fillText("Width:" + block.width, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 12-40);
                     con.fillStyle = "blue";
                    con.fillText("Right Line Width: " + block.drawingWidth, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 27-40);
                    con.fillText("Losangulo Width: " + block.losangulo.getWidth(), block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 44-40);
                 }else if(block instanceof IfBlock){
        
                      con.fillText("Width:" + block.width, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 12-40);
                    con.fillStyle = "red";
                    con.fillText("Left Width: " + block.leftWidth, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 27-40);
                    con.fillText("Right Width: " + block.rightWidth, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 44-40);
                    con.fillStyle = "gray";
                    con.fillText("Losangulo Width: " + block.losangulo.getWidth(), block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 61-40);
                    con.fillStyle = "blue";
                    con.fillText("Drawing Width Left: " + block.drawingWidthLeft, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+78-40);
                    con.fillText("Drawing With Right: " + block.drawingWidthRight, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 95-40);
          
                }else{
                    con.fillStyle = "red";
                    con.fillText(" Width: " + block.width, block.xPosition +25, block.yPosition+ 27-40);
                }
        
        
                if(block instanceof WhileBlock || block instanceof DoWhileBlock || block instanceof IfBlock){
                    con.fillText("XPosition:" + block.losangulo.xPosition, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 112-40);
                    con.fillText("YPosition:" + block.losangulo.yPosition, block.rightHorizontalLine.x2 +25, block.rightHorizontalLine.yPosition+ 129-40);
                 }
                 */
    }
}
//# sourceMappingURL=FluxogramManager.js.map
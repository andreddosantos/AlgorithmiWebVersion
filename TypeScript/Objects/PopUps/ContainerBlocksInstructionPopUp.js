"use strict";
class ContainerBlocksInstructionPopUp {
    constructor(width, height, block, line, blockTye, editBlock) {
        if (document.body.contains(document.getElementById("divPopInstruction"))) {
            document.getElementById("divPopInstruction").parentNode.removeChild(document.getElementById("divPopInstruction"));
        }
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        var helpImage = document.createElement("span");
        helpImage.setAttribute("id", "helpButtonPopUp");
        helpImage.addEventListener('mousedown', (e) => {
            this.openHelpPopUp(editBlock);
        });
        var tempHelpImage = document.createElement("i");
        tempHelpImage.setAttribute("class", "fa fa-question-circle");
        helpImage.appendChild(tempHelpImage);
        var expressionInsert = document.createElement('div');
        expressionInsert.setAttribute("id", "expressionInsert");
        this.parentBlock = block;
        this.pressedConnector = line;
        this.blockType = blockTye;
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopInstructionContainer");
        document.body.appendChild(this.popUp);
        this.popUp.appendChild(expressionInsert);
        this.width = width;
        this.height = height;
        this.closingButton = document.createElement('div');
        //this.closingButton.setAttribute("src", "./img/close-circle-512.png");
        this.closingButton.innerHTML = "Cancel";
        this.instructionTextBox = document.createElement('textarea');
        this.instructionTextBox.setAttribute("class", "instructionTextArea");
        if (editBlock == null) {
            this.titleDIV.innerHTML = "Create New Block";
            expressionInsert.innerHTML += "Insert a valid expression: ";
            this.closingButton.setAttribute("id", "popupInstructionCloseButton");
            this.createBlockButton = document.createElement('div');
            this.createBlockButton.setAttribute("id", "popupValidateCreateBlockPopUp");
            this.createBlockButton.innerHTML = "Create Block";
            this.popUp.appendChild(this.createBlockButton);
            this.popUp.appendChild(this.instructionTextBox);
            this.createBlockButton.addEventListener('mousedown', (e) => {
                this.addBlock();
            });
        }
        else {
            this.titleDIV.innerHTML = "Edit Block";
            expressionInsert.innerHTML += "Edit this block expression: ";
            this.closingButton.setAttribute("id", "popupInstructionCloseButtonEditMode");
            this.parentBlock = editBlock;
            this.pressedConnector = editBlock.previousConnector;
            this.instructionTextBox.value = String(this.parentBlock.instruction).toString();
            this.editBlockButton = document.createElement('div');
            this.editBlockButton.setAttribute("id", "popupValidateCreateBlockPopUpEditMode");
            this.editBlockButton.innerHTML = "Edit Block";
            this.popUp.appendChild(this.editBlockButton);
            this.editBlockButton.addEventListener('mousedown', (e) => {
                this.editBlock();
            });
            this.removeBlockButton = document.createElement('div');
            this.removeBlockButton.setAttribute("id", "popupValidateRemoveBlockPopUp");
            this.removeBlockButton.innerHTML = "Remove Block";
            this.popUp.appendChild(this.removeBlockButton);
            this.popUp.appendChild(this.instructionTextBox);
            this.removeBlockButton.addEventListener('mousedown', (e) => {
                this.removeBlock();
            });
        }
        this.titleDIV.appendChild(helpImage);
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.titleDIV);
        this.closingButton.addEventListener('mousedown', (e) => {
            this.cancelPopUp();
        });
    }
    closePopUp() {
        document.getElementById("divPopInstructionContainer").parentNode.removeChild(document.getElementById("divPopInstructionContainer"));
    }
    cancelPopUp() {
        this.closePopUp();
        if (this.parentBlock == null) {
            new NewBlockPopUp(100, 100, this.parentBlock, this.pressedConnector);
        }
    }
    addBlock() {
        let helperVerticalLine = new VerticalLine(false, 10, 12, 12, 105, 6, "#000000", true, this.pressedConnector.parent, null, null);
        helperVerticalLine.next = null;
        helperVerticalLine.previous = this.pressedConnector.previous;
        if ((this.blockType == 1 || this.blockType == 6 || this.blockType == 0)) {
            if (this.parentBlock.fluxogramManager.executor.validateExpressionForContainerBlock(helperVerticalLine, this.instructionTextBox.value)) {
                this.parentBlock.addBlock(this.pressedConnector, this.blockType, this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.blockType == 5) {
            if (this.parentBlock.fluxogramManager.executor.validateWriteBlockExpression(helperVerticalLine, this.instructionTextBox.value)) {
                this.parentBlock.addBlock(this.pressedConnector, this.blockType, this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.blockType == 3) {
            if (this.parentBlock.fluxogramManager.executor.validateReadBlockInstruction(helperVerticalLine, this.instructionTextBox.value)) {
                this.parentBlock.addBlock(this.pressedConnector, this.blockType, this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.blockType == 4) {
            if (this.parentBlock.fluxogramManager.executor.validateExecuteBlockExpression(helperVerticalLine, this.instructionTextBox.value)) {
                this.parentBlock.addBlock(this.pressedConnector, this.blockType, this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else {
            this.parentBlock.addBlock(this.pressedConnector, this.blockType, this.instructionTextBox.value);
            this.closePopUp();
        }
    }
    removeBlock() {
        this.parentBlock.fluxogramManager.removeBlock(this.parentBlock);
        this.closePopUp();
    }
    editBlock() {
        if ((this.parentBlock instanceof IfBlock || this.parentBlock instanceof WhileBlock || this.parentBlock instanceof DoWhileBlock)) {
            if (this.parentBlock.fluxogramManager.executor.validateExpressionForContainerBlock(this.pressedConnector, this.instructionTextBox.value)) {
                this.parentBlock.editBlockInstruction(this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.parentBlock instanceof WriteBlock) {
            if (this.parentBlock.fluxogramManager.executor.validateWriteBlockExpression(this.pressedConnector, this.instructionTextBox.value)) {
                this.parentBlock.editBlockInstruction(this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.parentBlock instanceof ReadBlock) {
            if (this.parentBlock.fluxogramManager.executor.validateReadBlockInstruction(this.pressedConnector, this.instructionTextBox.value)) {
                this.parentBlock.editBlockInstruction(this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else if (this.parentBlock instanceof ExecuteBlock) {
            if (this.parentBlock.fluxogramManager.executor.validateExecuteBlockExpression(this.pressedConnector, this.instructionTextBox.value)) {
                this.parentBlock.editBlockInstruction(this.instructionTextBox.value);
                this.closePopUp();
            }
        }
        else {
            this.parentBlock.editBlockInstruction(this.instructionTextBox.value);
            this.closePopUp();
        }
    }
    openHelpPopUp(temp) {
        if (temp instanceof WhileBlock || this.blockType == 0) {
            new helpPopUp(0);
            return;
        }
        else if (temp instanceof ExecuteBlock || this.blockType == 4) {
            new helpPopUp(1);
            return;
        }
        else if (temp instanceof DefineBlock || this.blockType == 2) {
            new helpPopUp(2);
            return;
        }
        else if (temp instanceof ReadBlock || this.blockType == 3) {
            new helpPopUp(3);
            return;
        }
        else if (temp instanceof WriteBlock || this.blockType == 5) {
            new helpPopUp(4);
            return;
        }
        else if (temp instanceof IfBlock || this.blockType == 1) {
            new helpPopUp(5);
            return;
        }
        else if (temp instanceof DoWhileBlock || this.blockType == 6) {
            new helpPopUp(6);
            return;
        }
        else if (temp instanceof BreakBlock || this.blockType == 7) {
            new helpPopUp(7);
            return;
        }
        else if (temp instanceof ContinueBlock || this.blockType == 8) {
            new helpPopUp(8);
            return;
        }
    }
}
//# sourceMappingURL=ContainerBlocksInstructionPopUp.js.map
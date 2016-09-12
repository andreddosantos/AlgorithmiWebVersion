"use strict";
class ReadBlockInstructionPopUp {
    constructor(editBlock, blockType, parentBlock, pressedConnector) {
        this.variableNames = [];
        this.parentBlock = parentBlock;
        this.pressedConnector = pressedConnector;
        this.blockType = blockType;
        this.editBlock = editBlock;
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        var helpImage = document.createElement("span");
        helpImage.setAttribute("id", "helpButtonPopUp");
        var tempHelpImage = document.createElement("i");
        tempHelpImage.setAttribute("class", "fa fa-question-circle");
        helpImage.appendChild(tempHelpImage);
        helpImage.addEventListener('mousedown', (e) => { new helpPopUp(3); });
        this.selectContainerDiv = document.createElement('div');
        this.selectContainerDiv.setAttribute("id", "selectListDivContainer");
        this.selectContainerDiv.setAttribute("class", "select");
        this.spanVariableNames = document.createElement('span');
        this.spanVariableNames.setAttribute("class", "arr");
        this.variableNamesSelectList = document.createElement('select');
        this.variableNamesSelectList.setAttribute("id", "variableTypeSelectBoxPopUp");
        this.selectContainerDiv.appendChild(this.spanVariableNames);
        this.selectContainerDiv.appendChild(this.variableNamesSelectList);
        this.variableNameLabel = document.createElement('label');
        this.variableNameLabel.setAttribute("id", "variableLabelType");
        this.variableNameLabel.innerHTML = "Variable to read:";
        //get variables in scope from executor
        this.variableNames = pressedConnector.parent.fluxogramManager.executor.getVariablesInScope(pressedConnector, this.variableNames);
        this.variableNames.forEach(element => {
            let option = document.createElement('option');
            option.value = element;
            option.text = element;
            this.variableNamesSelectList.appendChild(option);
        });
        this.closingButton = document.createElement('div');
        this.closingButton.innerHTML = "Cancel";
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopInstructionContainer");
        document.body.appendChild(this.popUp);
        if (editBlock == null) {
            this.titleDIV.innerHTML = "Create New Block";
            this.closingButton.setAttribute("id", "popupInstructionCloseButton");
            this.createBlockButton = document.createElement('div');
            this.createBlockButton.setAttribute("id", "popupValidateCreateBlockPopUp");
            this.createBlockButton.innerHTML = "Create Block";
            this.popUp.appendChild(this.createBlockButton);
            this.createBlockButton.addEventListener('mousedown', (e) => {
                this.addBlock();
            });
        }
        else {
            if (this.variableNames.indexOf(this.editBlock.instruction) == -1) {
                new WarningPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, "The selected variable no longer exists, choose another or remove the block");
            }
            this.variableNamesSelectList.selectedIndex = this.variableNames.indexOf(this.editBlock.instruction);
            this.titleDIV.innerHTML = "Edit Block";
            this.closingButton.setAttribute("id", "popupInstructionCloseButtonEditMode");
            this.parentBlock = editBlock;
            this.pressedConnector = editBlock.previousConnector;
            this.editBlockButton = document.createElement('div');
            this.editBlockButton.setAttribute("id", "popupValidateCreateBlockPopUpEditMode");
            this.editBlockButton.innerHTML = "Edit Block";
            this.popUp.appendChild(this.editBlockButton);
            this.editBlockButton.addEventListener('mousedown', (e) => {
                this.editBlockContent();
            });
            this.removeBlockButton = document.createElement('div');
            this.removeBlockButton.setAttribute("id", "popupValidateRemoveBlockPopUp");
            this.removeBlockButton.innerHTML = "Remove Block";
            this.popUp.appendChild(this.removeBlockButton);
            this.removeBlockButton.addEventListener('mousedown', (e) => {
                this.removeBlock();
            });
        }
        this.titleDIV.appendChild(helpImage);
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.titleDIV);
        this.popUp.appendChild(this.selectContainerDiv);
        this.popUp.appendChild(this.variableNameLabel);
        this.closingButton.addEventListener('mousedown', (e) => {
            this.cancelPopUp();
        });
    }
    removeBlock() {
        this.parentBlock.fluxogramManager.removeBlock(this.parentBlock);
        this.closePopUp();
    }
    closePopUp() {
        document.getElementById("divPopInstructionContainer").parentNode.removeChild(document.getElementById("divPopInstructionContainer"));
    }
    cancelPopUp() {
        this.closePopUp();
    }
    editBlockContent() {
        this.editBlock.editBlock(this.variableNamesSelectList.options[this.variableNamesSelectList.selectedIndex].textContent, "");
        this.closePopUp();
    }
    addBlock() {
        let helperVerticalLine = new VerticalLine(false, 10, 12, 12, 105, 6, "#000000", true, this.pressedConnector.parent, null, null);
        helperVerticalLine.next = null;
        helperVerticalLine.previous = this.pressedConnector.previous;
        if (this.variableNames.length < 1) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, "No variables to be selected!");
            this.closePopUp();
            return;
        }
        this.parentBlock.fluxogramManager.addblock(this.pressedConnector.parent, this.pressedConnector, this.blockType, this.variableNamesSelectList.options[this.variableNamesSelectList.selectedIndex].textContent, "", null);
        this.closePopUp();
    }
}
//# sourceMappingURL=ReadBlockInstructionPopUp.js.map
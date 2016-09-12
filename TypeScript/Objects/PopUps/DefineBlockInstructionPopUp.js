"use strict";
class DefineBlockInstructionPopUp {
    constructor(width, height, block, line, blockTye, editBlock) {
        //Create array of variableTypes to be added
        this.variableTypes = ["number", "string", "boolean"];
        this.variableTypesName = [lang.variableTypesNameNumber, lang.variableTypesNameString, lang.variableTypesNameBoolean];
        if (document.body.contains(document.getElementById("divPopInstruction"))) {
            document.getElementById("divPopInstruction").parentNode.removeChild(document.getElementById("divPopInstruction"));
        }
        this.selectContainerDiv = document.createElement('div');
        this.selectContainerDiv.setAttribute("id", "selectListDivContainer");
        this.selectContainerDiv.setAttribute("class", "select");
        this.spanVariableType = document.createElement('span');
        this.spanVariableType.setAttribute("class", "arr");
        this.variableTypesSelectList = document.createElement('select');
        this.variableTypesSelectList.setAttribute("id", "variableTypeSelectBoxPopUp");
        this.selectContainerDiv.appendChild(this.spanVariableType);
        this.selectContainerDiv.appendChild(this.variableTypesSelectList);
        this.variableTypeLabel = document.createElement('label');
        this.variableTypeLabel.setAttribute("id", "variableLabelType");
        this.variableTypeLabel.innerHTML = lang.DefineBlockVariableTypeLabel;
        this.variableNameLabel = document.createElement('label');
        this.variableNameLabel.setAttribute("id", "variableLabelName");
        this.variableNameLabel.innerHTML = lang.DefineBlockVariableNameLabel;
        this.variableValueLabel = document.createElement('label');
        this.variableValueLabel.setAttribute("id", "variableLabelValue");
        this.variableValueLabel.innerHTML = lang.DefineBlockVariableValueLabel;
        this.nameTextBox = document.createElement('input');
        this.nameTextBox.setAttribute("id", "variableNameTextBoxPopUp");
        this.nameTextBox.setAttribute("type", "text");
        this.valueTextBox = document.createElement('input');
        this.valueTextBox.setAttribute("id", "variableValueTextBoxPopUp");
        this.valueTextBox.setAttribute("type", "text");
        this.variableTypes.forEach(element => {
            let option = document.createElement('option');
            option.value = element;
            option.text = this.variableTypesName[this.variableTypes.indexOf(element)];
            this.variableTypesSelectList.appendChild(option);
        });
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        var helpImage = document.createElement("span");
        helpImage.setAttribute("id", "helpButtonPopUp");
        var tempHelpImage = document.createElement("i");
        tempHelpImage.setAttribute("class", "fa fa-question-circle");
        helpImage.appendChild(tempHelpImage);
        helpImage.addEventListener('mousedown', (e) => { new helpPopUp(2); });
        this.parentBlock = block;
        this.pressedLine = line;
        this.blockType = blockTye;
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopInstruction");
        document.body.appendChild(this.popUp);
        this.popUp.appendChild(this.selectContainerDiv);
        this.popUp.appendChild(this.nameTextBox);
        this.popUp.appendChild(this.valueTextBox);
        this.popUp.appendChild(this.variableTypeLabel);
        this.popUp.appendChild(this.variableNameLabel);
        this.popUp.appendChild(this.variableValueLabel);
        this.width = width;
        this.height = height;
        this.closingButton = document.createElement('div');
        //this.closingButton.setAttribute("src", "./img/close-circle-512.png");
        this.closingButton.innerHTML = lang.ButtonCancelPopUp;
        if (editBlock == null) {
            this.titleDIV.innerHTML = lang.DefineBlockTitlePopUp;
            this.closingButton.setAttribute("id", "popupInstructionCloseButton");
            this.createBlockButton = document.createElement('div');
            this.createBlockButton.setAttribute("id", "popupValidateCreateBlockPopUp");
            this.createBlockButton.innerHTML = lang.ButtonCreatePopUp;
            this.popUp.appendChild(this.createBlockButton);
            this.createBlockButton.addEventListener('mousedown', (e) => {
                this.addBlock();
            });
        }
        else {
            this.titleDIV.innerHTML = lang.DefineBlockEditTitlePopUp;
            this.nameTextBox.value = this.parentBlock.instruction;
            this.valueTextBox.value = this.parentBlock.value;
            this.variableTypesSelectList.selectedIndex = this.variableTypes.indexOf(this.parentBlock.type);
            this.closingButton.setAttribute("id", "popupInstructionCloseButtonEditMode");
            this.parentBlock = editBlock;
            this.pressedLine = editBlock.previousConnector;
            this.editBlockButton = document.createElement('div');
            this.editBlockButton.setAttribute("id", "popupValidateCreateBlockPopUpEditMode");
            this.editBlockButton.innerHTML = lang.ButtonEditPopUp;
            this.popUp.appendChild(this.editBlockButton);
            this.editBlockButton.addEventListener('mousedown', (e) => {
                this.editBlock();
            });
            this.removeBlockButton = document.createElement('div');
            this.removeBlockButton.setAttribute("id", "popupValidateRemoveBlockPopUp");
            this.removeBlockButton.innerHTML = lang.ButtonRemovePopUp;
            this.popUp.appendChild(this.removeBlockButton);
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
        document.getElementById("divPopInstruction").parentNode.removeChild(document.getElementById("divPopInstruction"));
    }
    cancelPopUp() {
        this.closePopUp();
        if (this.parentBlock == null) {
            new NewBlockPopUp(100, 100, this.parentBlock, this.pressedLine);
        }
    }
    addBlock() {
        let helperVerticalLine = new VerticalLine(false, 10, 12, 12, 105, 6, "#000000", true, this.pressedLine.parent, null, null);
        helperVerticalLine.next = null;
        helperVerticalLine.previous = this.pressedLine.previous;
        if (this.parentBlock.fluxogramManager.executor.validateVariablesForDefineBlock(helperVerticalLine, this.variableTypesSelectList.options[this.variableTypesSelectList.selectedIndex].value, this.nameTextBox.value, this.valueTextBox.value)) {
            this.parentBlock.fluxogramManager.addblock(this.pressedLine.parent, this.pressedLine, this.blockType, this.nameTextBox.value, this.valueTextBox.value, this.variableTypesSelectList.options[this.variableTypesSelectList.selectedIndex].value);
            this.closePopUp();
            this.parentBlock.fluxogramManager.executor.validateFluxogram();
        }
    }
    removeBlock() {
        this.parentBlock.fluxogramManager.removeBlock(this.parentBlock);
        this.parentBlock.fluxogramManager.executor.validateFluxogram();
        this.closePopUp();
        new WarningPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, lang.DefineErrorErasingBlockMessage);
    }
    editBlock() {
        if (this.parentBlock.fluxogramManager.executor.validateVariablesForDefineBlock(this.parentBlock.previousConnector, this.variableTypesSelectList.options[this.variableTypesSelectList.selectedIndex].value, this.nameTextBox.value, this.valueTextBox.value)) {
            this.parentBlock.editBlockLogicInfo(this.nameTextBox.value, this.valueTextBox.value, this.variableTypesSelectList.options[this.variableTypesSelectList.selectedIndex].value);
            this.closePopUp();
            this.parentBlock.fluxogramManager.executor.validateFluxogram();
        }
    }
}
//# sourceMappingURL=DefineBlockInstructionPopUp.js.map
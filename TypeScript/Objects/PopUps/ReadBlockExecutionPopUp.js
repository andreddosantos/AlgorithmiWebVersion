"use strict";
class ReadBlockExecutionPopUp {
    constructor(parentBlock, nextConnector, variableName, velocity, declaredVariables) {
        this.declaredVariables = declaredVariables;
        this.parentBlock = parentBlock;
        this.nextConnector = nextConnector;
        this.velocity = velocity;
        this.variableName = variableName;
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        this.titleDIV.innerHTML = lang.ReadBlock;
        this.messageLabel = document.createElement('label');
        this.messageLabel.setAttribute("id", "variableLabelType");
        this.messageLabel.innerHTML = lang.ReadBlockExecutionTextOne + variableName + lang.ReadBlockExecutionTextTwo;
        this.messageTextBox = document.createElement('input');
        this.messageTextBox.setAttribute("id", "variableValueExecution");
        this.messageTextBox.setAttribute("type", "text");
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopInstructionContainer");
        document.body.appendChild(this.popUp);
        this.editBlockButton = document.createElement('div');
        this.editBlockButton.setAttribute("id", "popupValidateCreateBlockPopUpEditMode");
        this.editBlockButton.innerHTML = lang.ButtonConfirmPopUp;
        this.popUp.appendChild(this.editBlockButton);
        this.editBlockButton.addEventListener('mousedown', (e) => {
            this.editBlockContent();
        });
        this.popUp.appendChild(this.messageTextBox);
        this.popUp.appendChild(this.messageLabel);
        this.popUp.appendChild(this.titleDIV);
    }
    closePopUp() {
        document.getElementById("divPopInstructionContainer").parentNode.removeChild(document.getElementById("divPopInstructionContainer"));
    }
    editBlockContent() {
        this.parentBlock.fluxogramManager.executor.readFromReadBlock(this.variableName, this.messageTextBox.value);
        this.parentBlock.fluxogramManager.executor.updateMemoryWidget(this.declaredVariables);
        this.parentBlock.fluxogramManager.executor.execute(this.nextConnector, this.velocity, this.declaredVariables);
        this.closePopUp();
    }
}
//# sourceMappingURL=ReadBlockExecutionPopUp.js.map
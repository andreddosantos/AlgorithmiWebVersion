"use strict";
class DummyPopup {
    constructor(connector, width, height) {
        if (document.body.contains(document.getElementById("divPopInstruction"))) {
            document.getElementById("divPopInstruction").parentNode.removeChild(document.getElementById("divPopInstruction"));
        }
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopInstruction");
        document.body.appendChild(this.popUp);
        this.width = width;
        this.height = height;
        this.closingButton = document.createElement('img');
        this.closingButton.setAttribute("src", "./img/close-circle-512.png");
        this.closingButton.setAttribute("id", "popupCloseButton");
        this.instructionTextBox = document.createElement('div');
        this.instructionTextBox.setAttribute("class", "miniature");
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.instructionTextBox);
        this.instructionTextBox.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
        this.closingButton.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
    }
    closePopUp() {
        document.getElementById("divPopInstruction").parentNode.removeChild(document.getElementById("divPopInstruction"));
    }
    addWhileBlock() {
    }
}
//# sourceMappingURL=DummyPopUp.js.map
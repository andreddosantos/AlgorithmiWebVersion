"use strict";
class SuccessPopUp {
    constructor(width, height, messageToDisplay) {
        if (document.body.contains(document.getElementById("errorPopUp"))) {
            document.getElementById("errorPopUp").parentNode.removeChild(document.getElementById("errorPopUp"));
        }
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "errorPopUp");
        document.body.appendChild(this.popUp);
        this.width = width;
        this.height = height;
        //Success Message
        this.messageLabel = document.createElement('label');
        this.messageLabel.setAttribute("id", "messageLabelPopUp");
        this.messageLabel.innerHTML = messageToDisplay;
        //Success Icon
        this.successIcon = document.createElement('img');
        this.successIcon.setAttribute("id", "popUpIcon");
        this.successIcon.setAttribute("src", "./img/sucessIcon.png");
        //Confirm Button
        this.confirmButton = document.createElement('div');
        this.confirmButton.setAttribute("id", "closeButtonPopUp");
        this.confirmButton.innerHTML = lang.CloseButtonSentence;
        this.popUp.appendChild(this.successIcon);
        this.popUp.appendChild(this.confirmButton);
        this.popUp.appendChild(this.messageLabel);
        this.confirmButton.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
    }
    closePopUp() {
        document.getElementById("errorPopUp").parentNode.removeChild(document.getElementById("errorPopUp"));
    }
    addWhileBlock() {
    }
}
//# sourceMappingURL=SuccessPopUp.js.map
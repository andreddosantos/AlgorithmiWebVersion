"use strict";
class ConfirmPopUp {
    constructor(width, height, messageToDisplay, callBack) {
        if (document.body.contains(document.getElementById("errorPopUp"))) {
            document.getElementById("errorPopUp").parentNode.removeChild(document.getElementById("errorPopUp"));
        }
        this.callBackAction = callBack;
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
        this.successIcon.setAttribute("src", "./img/question-mark.png");
        //Confirm Button
        this.confirmButton = document.createElement('div');
        this.confirmButton.setAttribute("id", "confirmButtonPopUp");
        this.confirmButton.innerHTML = lang.ButtonConfirmPopUp;
        //Cancel Button
        this.cancelButton = document.createElement('div');
        this.cancelButton.setAttribute("id", "cancelButtonPopUp");
        this.cancelButton.innerHTML = lang.ButtonCancelPopUp;
        this.popUp.appendChild(this.cancelButton);
        this.popUp.appendChild(this.successIcon);
        this.popUp.appendChild(this.confirmButton);
        this.popUp.appendChild(this.messageLabel);
        this.confirmButton.addEventListener('mousedown', (e) => {
            this.confirmPopUp();
        });
        this.cancelButton.addEventListener('mousedown', (e) => {
            this.cancelPopUp();
        });
    }
    confirmPopUp() {
        try {
            eval(this.callBackAction);
        }
        catch (ex) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, ex);
        }
        finally {
            this.cancelPopUp();
        }
    }
    cancelPopUp() {
        document.getElementById("errorPopUp").parentNode.removeChild(document.getElementById("errorPopUp"));
    }
    addWhileBlock() {
    }
}
//# sourceMappingURL=ConfirmPopUp.js.map
"use strict";
class ShowCodePopUpPopUp {
    constructor(code) {
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        this.titleDIV.innerHTML = lang.CodeTitleSentence + "*.*";
        var helpImage = document.createElement("span");
        helpImage.setAttribute("id", "helpButtonPopUp");
        var tempHelpImage = document.createElement("i");
        tempHelpImage.setAttribute("class", "fa fa-question-circle");
        var divCodeContent = document.createElement('div');
        divCodeContent.setAttribute("id", "divCodeContent");
        divCodeContent.innerHTML = code;
        helpImage.appendChild(tempHelpImage);
        this.closingButton = document.createElement('div');
        this.closingButton.setAttribute("id", "closeCodePopPupButton");
        this.closingButton.innerHTML = lang.CloseButtonSentence;
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divCode");
        document.body.appendChild(this.popUp);
        this.popUp.appendChild(divCodeContent);
        this.titleDIV.appendChild(helpImage);
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.titleDIV);
        this.closingButton.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
    }
    closePopUp() {
        document.getElementById("divCode").parentNode.removeChild(document.getElementById("divCode"));
    }
}
//# sourceMappingURL=ShowCodePopUp.js.map
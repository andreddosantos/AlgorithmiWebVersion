"use strict";
class BreakContinueBlocksInstructionPopUp {
    constructor(width, height, block, line, blockTye, editBlock) {
        if (document.body.contains(document.getElementById("divPopBreakContinueEdit"))) {
            document.getElementById("divPopBreakContinueEdit").parentNode.removeChild(document.getElementById("divPopBreakContinueEdit"));
        }
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        this.titleDIV.innerHTML = 'Edit Block';
        let helpImage = document.createElement("span");
        helpImage.setAttribute("id", "helpButtonPopUp");
        let temp = this.parentBlock != null ? this.parentBlock : editBlock;
        helpImage.addEventListener('mousedown', (e) => {
            if (temp instanceof BreakBlock) {
                new helpPopUp(7);
            }
            else if (temp instanceof ContinueBlock) {
                new helpPopUp(8);
            }
        });
        let tempHelpImage = document.createElement("i");
        tempHelpImage.setAttribute("class", "fa fa-question-circle");
        helpImage.appendChild(tempHelpImage);
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPopBreakContinueEdit");
        document.body.appendChild(this.popUp);
        this.parentBlock = block;
        this.pressedConnector = line;
        this.blockType = blockTye;
        this.width = width;
        this.height = height;
        this.closingButton = document.createElement('div');
        this.closingButton.setAttribute("id", "popupBreakContinueCloseButtonEditMode");
        this.closingButton.innerHTML = "Cancel";
        this.removeBlockButton = document.createElement('div');
        this.removeBlockButton.setAttribute("id", "popupValidateBreakContinue");
        this.removeBlockButton.innerHTML = "Remove Block";
        this.popUp.appendChild(this.removeBlockButton);
        this.titleDIV.appendChild(helpImage);
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.titleDIV);
        this.removeBlockButton.addEventListener('mousedown', (e) => {
            this.removeBlock();
        });
        this.closingButton.addEventListener('mousedown', (e) => {
            this.cancelPopUp();
        });
    }
    closePopUp() {
        document.getElementById("divPopBreakContinueEdit").parentNode.removeChild(document.getElementById("divPopBreakContinueEdit"));
    }
    cancelPopUp() {
        this.closePopUp();
        if (this.parentBlock == null) {
            new NewBlockPopUp(100, 100, this.parentBlock, this.pressedConnector);
        }
    }
    removeBlock() {
        this.parentBlock.fluxogramManager.removeBlock(this.parentBlock);
        this.closePopUp();
    }
}
//# sourceMappingURL=BreakContinueBlocksInstructionPopUp.js.map
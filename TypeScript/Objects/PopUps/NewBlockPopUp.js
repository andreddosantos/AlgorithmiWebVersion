"use strict";
class NewBlockPopUp {
    constructor(width, height, parentBlock, pressedLine) {
        this.parentBlock = null; //Parent 
        this.pressedConnector = null; //Line
        if (document.body.contains(document.getElementById("divPop"))) {
            document.getElementById("divPop").parentNode.removeChild(document.getElementById("divPop"));
        }
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "divPop");
        document.body.appendChild(this.popUp);
        this.width = width;
        this.height = height;
        this.parentBlock = parentBlock;
        this.pressedConnector = pressedLine;
        this.closingButton = document.createElement('div');
        //this.closingButton.setAttribute("src", "./img/close-circle-512.png");
        this.closingButton.setAttribute("id", "popupCloseButton");
        this.closingButton.innerHTML = lang.ButtonCancelPopUp;
        this.blockPopUpCreatorLeftMenu = document.createElement('div');
        this.blockPopUpCreatorLeftMenu.setAttribute("id", "popUpMenu");
        this.titleDIV = document.createElement('div');
        this.titleDIV.setAttribute("id", "popUpMenuTitle");
        this.titleDIV.innerHTML = lang.NewBlockitlePopUp;
        this.firstBlockMiniature = document.createElement('div');
        this.firstBlockMiniature.setAttribute("class", "miniature");
        this.firstBlockMiniature.innerHTML = lang.WhileBlock;
        this.secondBlockMiniature = document.createElement('div');
        this.secondBlockMiniature.setAttribute("class", "miniature");
        this.secondBlockMiniature.innerHTML = lang.IfBlock;
        this.thirdBlockMiniature = document.createElement('div');
        this.thirdBlockMiniature.setAttribute("class", "miniature");
        this.thirdBlockMiniature.innerHTML = lang.DefineBlock;
        this.fourthBlockMiniature = document.createElement('div');
        this.fourthBlockMiniature.setAttribute("class", "miniature");
        this.fourthBlockMiniature.innerHTML = lang.ReadBlock;
        this.fifthBlockMiniature = document.createElement('div');
        this.fifthBlockMiniature.setAttribute("class", "miniature");
        this.fifthBlockMiniature.innerHTML = lang.ExecuteBlock;
        this.sixthBlockMiniature = document.createElement('div');
        this.sixthBlockMiniature.setAttribute("class", "miniature");
        this.sixthBlockMiniature.innerHTML = lang.WriteBlock;
        this.seventhBlockMiniature = document.createElement('div');
        this.seventhBlockMiniature.setAttribute("class", "miniature");
        this.seventhBlockMiniature.innerHTML = lang.DoWhileBlock;
        this.heigthBlockMiniature = document.createElement('div');
        this.heigthBlockMiniature.setAttribute("class", "miniature");
        this.heigthBlockMiniature.innerHTML = lang.BreakBlock;
        this.ninethBlockMiniature = document.createElement('div');
        this.ninethBlockMiniature.setAttribute("class", "miniature");
        this.ninethBlockMiniature.innerHTML = lang.ContinueBlock;
        this.popUp.appendChild(this.blockPopUpCreatorLeftMenu);
        this.popUp.appendChild(this.closingButton);
        this.popUp.appendChild(this.titleDIV);
        this.blockPopUpCreatorLeftMenu.appendChild(this.firstBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.secondBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.thirdBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.fifthBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.fourthBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.sixthBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.seventhBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.heigthBlockMiniature);
        this.blockPopUpCreatorLeftMenu.appendChild(this.ninethBlockMiniature);
        this.firstBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addWhileBlock();
        });
        this.secondBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addIfBlock();
        });
        this.thirdBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addDefineBlock();
        });
        this.fourthBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addReadBlock();
        });
        this.fifthBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addExecuteBlock();
        });
        this.sixthBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addWriteBlock();
        });
        this.seventhBlockMiniature.addEventListener('mousedown', (e) => {
            this.closePopUp();
            this.addDowhileBlock();
        });
        this.heigthBlockMiniature.addEventListener('mousedown', (e) => {
            this.addBreakBlock();
            this.closePopUp();
        });
        this.ninethBlockMiniature.addEventListener('mousedown', (e) => {
            this.addContinueBlock();
            this.closePopUp();
        });
        this.closingButton.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
    }
    closePopUp() {
        document.getElementById("divPop").parentNode.removeChild(document.getElementById("divPop"));
    }
    addWhileBlock() {
        new ContainerBlocksInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 0, null);
    }
    addIfBlock() {
        new ContainerBlocksInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 1, null);
    }
    addDefineBlock() {
        new DefineBlockInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 2, null);
    }
    addReadBlock() {
        new ReadBlockInstructionPopUp(null, 3, this.parentBlock, this.pressedConnector);
    }
    addExecuteBlock() {
        new ContainerBlocksInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 4, null);
    }
    addWriteBlock() {
        new ContainerBlocksInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 5, null);
    }
    addDowhileBlock() {
        new ContainerBlocksInstructionPopUp(100, 100, this.parentBlock, this.pressedConnector, 6, null);
    }
    addBreakBlock() {
        let helperVerticalLine = new VerticalLine(false, 10, 12, 12, 105, 6, "#000000", true, this.pressedConnector.parent, null, null);
        helperVerticalLine.next = null;
        helperVerticalLine.previous = this.pressedConnector.previous;
        this.parentBlock.addBlock(this.pressedConnector, 7, lang.BreakBlockInstruction);
    }
    addContinueBlock() {
        let helperVerticalLine = new VerticalLine(false, 10, 12, 12, 105, 6, "#000000", true, this.pressedConnector.parent, null, null);
        helperVerticalLine.next = null;
        helperVerticalLine.previous = this.pressedConnector.previous;
        this.parentBlock.addBlock(this.pressedConnector, 8, lang.ContinueBlockInstruction);
    }
}
//# sourceMappingURL=NewBlockPopUp.js.map
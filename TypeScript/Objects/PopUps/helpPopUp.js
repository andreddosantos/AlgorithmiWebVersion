class helpPopUp {
    constructor(selectedPopUp) {
        if (document.body.contains(document.getElementById("helpMenu"))) {
            document.getElementById("helpMenu").parentNode.removeChild(document.getElementById("helpMenu"));
        }
        //     <div id ="helpMenu">
        // 	<iframe id="helpInnerHtml" src="Help/index.html">
        // 	</iframe>
        // </div>
        this.popUp = document.createElement('div');
        this.popUp.setAttribute("id", "helpMenu");
        document.body.appendChild(this.popUp);
        this.optionListDiv = document.createElement('div');
        this.optionListDiv.setAttribute("id", "optionListDiv");
        this.popUp.appendChild(this.optionListDiv);
        this.closeButtonDiv = document.createElement('div');
        this.closeButtonDiv.setAttribute("id", "closeCodePopPupButton");
        this.closeButtonDiv.innerHTML = 'close';
        this.popUp.appendChild(this.closeButtonDiv);
        this.contentIframe = document.createElement('iframe');
        this.contentIframe.setAttribute("id", "helpInnerHtml");
        this.contentIframe.setAttribute("src", "help/index.html");
        this.popUp.appendChild(this.contentIframe);
        this.titleDiv = document.createElement('div');
        this.titleDiv.setAttribute("id", "popUpMenuTitle");
        this.titleDiv.innerHTML = 'Help Menu';
        this.popUp.appendChild(this.titleDiv);
        this.masterAboutMiniature = document.createElement('div');
        this.masterAboutMiniature.setAttribute("class", "masterMiniatureHelp");
        this.masterAboutMiniature.innerHTML = "ABOUT";
        this.masterTemplateMiniature = document.createElement('div');
        this.masterTemplateMiniature.setAttribute("class", "masterMiniatureHelp");
        this.masterTemplateMiniature.innerHTML = "ALGORITHMS";
        this.masterBlockMiniature = document.createElement('div');
        this.masterBlockMiniature.setAttribute("class", "masterMiniatureHelp");
        this.masterBlockMiniature.innerHTML = "BLOCKS";
        this.optionListDiv.appendChild(this.masterAboutMiniature);
        this.optionListDiv.appendChild(this.masterTemplateMiniature);
        this.optionListDiv.appendChild(this.masterBlockMiniature);
        this.firstBlockMiniature = document.createElement('div');
        this.firstBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.firstBlockMiniature.innerHTML = "WHILE BLOCK";
        this.secondBlockMiniature = document.createElement('div');
        this.secondBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.secondBlockMiniature.innerHTML = "IF BLOCK";
        this.thirdBlockMiniature = document.createElement('div');
        this.thirdBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.thirdBlockMiniature.innerHTML = "DEFINE BLOCK";
        this.fourthBlockMiniature = document.createElement('div');
        this.fourthBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.fourthBlockMiniature.innerHTML = "READ BLOCK";
        this.fifthBlockMiniature = document.createElement('div');
        this.fifthBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.fifthBlockMiniature.innerHTML = "EXECUTE BLOCK";
        this.sixthBlockMiniature = document.createElement('div');
        this.sixthBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.sixthBlockMiniature.innerHTML = "WRITE BLOCK";
        this.seventhBlockMiniature = document.createElement('div');
        this.seventhBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.seventhBlockMiniature.innerHTML = "DO WHILE BLOCK";
        this.heigthBlockMiniature = document.createElement('div');
        this.heigthBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.heigthBlockMiniature.innerHTML = "BREAK BLOCK";
        this.ninethBlockMiniature = document.createElement('div');
        this.ninethBlockMiniature.setAttribute("class", "miniatureMinorHelp");
        this.ninethBlockMiniature.innerHTML = "CONTINUE BLOCK";
        this.optionListDiv.appendChild(this.firstBlockMiniature);
        this.optionListDiv.appendChild(this.secondBlockMiniature);
        this.optionListDiv.appendChild(this.thirdBlockMiniature);
        this.optionListDiv.appendChild(this.fifthBlockMiniature);
        this.optionListDiv.appendChild(this.fourthBlockMiniature);
        this.optionListDiv.appendChild(this.sixthBlockMiniature);
        this.optionListDiv.appendChild(this.seventhBlockMiniature);
        this.optionListDiv.appendChild(this.heigthBlockMiniature);
        this.optionListDiv.appendChild(this.ninethBlockMiniature);
        this.masterAboutMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/index.html");
        });
        this.firstBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/while.html");
        });
        this.secondBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/if.html");
        });
        this.thirdBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/define.html");
        });
        this.fourthBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/execute.html");
        });
        this.fifthBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/read.html");
        });
        this.sixthBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/write.html");
        });
        this.seventhBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/do_while.html");
        });
        this.heigthBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/break.html");
        });
        this.ninethBlockMiniature.addEventListener('mousedown', (e) => {
            this.contentIframe.setAttribute("src", "help/continue.html");
        });
        this.closeButtonDiv.addEventListener('mousedown', (e) => {
            this.closePopUp();
        });
        this.loadFirstTab(selectedPopUp);
    }
    loadFirstTab(tab) {
        if (tab == -1) {
            this.contentIframe.setAttribute("src", "help/index.html");
        }
        else if (tab == 0) {
            this.contentIframe.setAttribute("src", "help/while.html");
        }
        else if (tab == 1) {
            this.contentIframe.setAttribute("src", "help/execute.html");
        }
        else if (tab == 2) {
            this.contentIframe.setAttribute("src", "help/define.html");
        }
        else if (tab == 3) {
            this.contentIframe.setAttribute("src", "help/read.html");
        }
        else if (tab == 4) {
            this.contentIframe.setAttribute("src", "help/write.html");
        }
        else if (tab == 5) {
            this.contentIframe.setAttribute("src", "help/if.html");
        }
        else if (tab == 6) {
            this.contentIframe.setAttribute("src", "help/do_while.html");
        }
        else if (tab == 7) {
            this.contentIframe.setAttribute("src", "help/break.html");
        }
        else if (tab == 8) {
            this.contentIframe.setAttribute("src", "help/continue.html");
        }
    }
    closePopUp() {
        document.getElementById("helpMenu").parentNode.removeChild(document.getElementById("helpMenu"));
    }
}
//# sourceMappingURL=helpPopUp.js.map
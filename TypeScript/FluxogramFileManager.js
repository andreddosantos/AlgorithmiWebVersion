"use strict";
class FluxogramFileManager {
    constructor(fluxogramManager) {
        this.fluxogramManager = fluxogramManager;
    }
    createFluxogramThrougtStringArray(fileContent) {
        //Remove every existing blocks
        this.fluxogramManager.blocks = [];
        this.fluxogramManager.shapeObjectManager.shapes = [];
        this.fluxogramManager.blocks.push(new BegginingBlock(this.fluxogramManager.startingBlock.xPosition, this.fluxogramManager.startingBlock.yPosition, BegginingBlockShapeSize.endShapeSizeWidth, BegginingBlockShapeSize.blockHeight, this.fluxogramManager.shapeObjectManager, this.fluxogramManager, ""));
        this.fluxogramManager.startingBlock = this.fluxogramManager.blocks[0] instanceof BegginingBlock ? this.fluxogramManager.blocks[0] : null;
        this.createBlocksFromFile(this.fluxogramManager.startingBlock, fileContent, 1);
    }
    createFluxogram(fileContent) {
        //Remove every existing blocks
        this.fluxogramManager.blocks = [];
        this.fluxogramManager.shapeObjectManager.shapes = [];
        this.fluxogramManager.blocks.push(new BegginingBlock(this.fluxogramManager.startingBlock.xPosition, this.fluxogramManager.startingBlock.yPosition, BegginingBlockShapeSize.endShapeSizeWidth, BegginingBlockShapeSize.blockHeight, this.fluxogramManager.shapeObjectManager, this.fluxogramManager, ""));
        this.fluxogramManager.startingBlock = this.fluxogramManager.blocks[0] instanceof BegginingBlock ? this.fluxogramManager.blocks[0] : null;
        var temp = fileContent.split('\n');
        this.createBlocksFromFile(this.fluxogramManager.startingBlock, temp, 1);
    }
    openFile(file) {
        if (file.name.split('.').pop().toLocaleLowerCase() == "flux") {
            var fr = new FileReader();
            me = this;
            fr.onload = function (e) {
                me.createFluxogram(e.target.result);
                if (me.fluxogramManager.executor.validateFluxogram()) {
                    new SuccessPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "The file was successfuly uploaded enjoy!");
                }
                else {
                    new WarningPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Found errors in blocks, try to edit the highlited blocks");
                }
            };
            fr.readAsText(file, "UTF-8");
        }
        else {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Wrong file extension!");
        }
    }
    saveToImage() {
        var name = document.getElementById('projectName').innerHTML;
        var a = document.createElement("a");
        a.href = this.fluxogramManager.canvas.toDataURL('image/png');
        a.download = name;
        a.click();
    }
    download(text, name, type) {
        var a = document.createElement("a");
        var file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
    saveToFile() {
        var temp = [];
        this.createFileFromFluxogram(this.fluxogramManager.startingBlock.findFirstConnector(this.fluxogramManager.startingBlock), temp);
        var projectName = document.getElementById('projectName').innerHTML;
        var fileContent = this.parseFluxoInfoToFile(temp);
        this.download(fileContent, projectName + ".flux", "text");
    }
    parseFluxoInfoToFile(fileContent) {
        var newContent = "";
        var projectName = document.getElementById('projectName').innerHTML;
        newContent += "BEGIN " + projectName + "\n";
        fileContent.forEach(element => { newContent += element + "\n"; });
        newContent += "END " + projectName + "\n";
        return newContent;
    }
    parseFluxoInfoToShow(fileContent) {
        var newContent = "";
        var projectName = document.getElementById('projectName').innerHTML;
        let tab = 1;
        newContent += "BEGIN " + projectName + "<br>";
        fileContent.forEach(element => {
            if (element.search("END") != -1) {
                tab = tab - 1;
                var tempElementTab = "";
                for (var i = tab * 2; i > 0; i--) {
                    tempElementTab += " ";
                }
                tempElementTab += element + "<br>";
                newContent += tempElementTab;
            }
            else {
                var tempElementTab = "";
                for (var i = tab * 2; i > 0; i--) {
                    tempElementTab += " ";
                }
                tempElementTab += element + "<br>";
                newContent += tempElementTab;
                if (element.search("WHILE") != -1
                    || element.search("DOWHILE") != -1
                    || element.search("IF") != -1) {
                    tab = tab + 1;
                }
            }
        });
        newContent += "END " + projectName + "<br>";
        return newContent;
    }
    createFileFromFluxogram(connector, fileContent) {
        if (connector.parent instanceof BegginingBlock && connector.next == null) {
            return fileContent;
        }
        else if (connector.next == null) {
            if (connector.parent instanceof WhileBlock) {
                fileContent.push("END WHILE");
            }
            else if (connector.parent instanceof IfBlock) {
                if (connector.parent.leftConnectors.findIndex(obj => obj == connector) != -1) {
                    fileContent.push("END IF");
                }
                else {
                    if (connector.parent.leftConnectors.length > 1) {
                        fileContent.push("ELSE");
                        return this.createFileFromFluxogram(connector.parent.findFirstConnectorLeft(), fileContent);
                    }
                    else {
                        fileContent.push("END IF");
                    }
                }
            }
            else if (connector.parent instanceof DoWhileBlock) {
                fileContent.push("END DOWHILE");
            }
            var nextConnector = connector.parent.nextConnector;
            return this.createFileFromFluxogram(nextConnector, fileContent);
        }
        else {
            var nextConnector = connector.next.nextConnector;
            if (connector.next instanceof IfBlock) {
                fileContent.push("IF " + connector.next.instruction);
                nextConnector = connector.next.findFirstConnectorRight();
            }
            else if (connector.next instanceof DoWhileBlock) {
                fileContent.push("DOWHILE " + connector.next.instruction);
                nextConnector = connector.next.findFirstConnector(connector.next);
                return this.createFileFromFluxogram(nextConnector, fileContent);
            }
            else if (connector.next instanceof WhileBlock) {
                fileContent.push("WHILE " + connector.next.instruction);
                nextConnector = connector.next.findFirstConnector(connector.next);
            }
            else if (connector.next instanceof DefineBlock) {
                fileContent.push("DECLARE " + connector.next.type + " " + connector.next.instruction
                    + " " + connector.next.value);
            }
            else if (connector.next instanceof ReadBlock) {
                fileContent.push("READ " + connector.next.instruction);
            }
            else if (connector.next instanceof ExecuteBlock) {
                fileContent.push("EXECUTE " + connector.next.instruction);
            }
            else if (connector.next instanceof WriteBlock) {
                fileContent.push('WRITE ' + connector.next.instruction);
            }
            else if (connector.next instanceof BreakBlock) {
                fileContent.push("BREAK");
            }
            else if (connector.next instanceof ContinueBlock) {
                fileContent.push("CONTINUE");
            }
            return this.createFileFromFluxogram(nextConnector, fileContent);
        }
    }
    createBlocksFromFile(parent, arrayLinhas, indexLinha) {
        if (indexLinha > arrayLinhas.length - 1) {
            return;
        }
        var connector = null;
        if (parent instanceof IfBlock) {
            if (arrayLinhas[indexLinha].search("END IF") != -1) {
                return this.createBlocksFromFile(parent.previousConnector.parent, arrayLinhas, indexLinha + 1);
            }
            else if (arrayLinhas[indexLinha].search("ELSE") != -1) {
                return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
            }
            else {
                for (var i = indexLinha - 1; i > 1; i--) {
                    if (arrayLinhas[i].search("IF") != -1) {
                        connector = parent.rightConnectors.find(obj => obj.next == null);
                        break;
                    }
                    if (arrayLinhas[i].search("ELSE") != -1 || arrayLinhas[i].search("IF") != -1) {
                        connector = parent.leftConnectors.find(obj => obj.next == null);
                        break;
                    }
                }
            }
        }
        else {
            connector = parent.connectors.find(obj => obj.next == null);
        }
        if (connector == null) {
            this.fluxogramManager.resizeFluxogramBlocks();
            this.fluxogramManager.shapeObjectManager.draw();
            return;
        }
        if (arrayLinhas[indexLinha].search("DOWHILE") != -1) {
            if (arrayLinhas[indexLinha].search("END DOWHILE") != -1) {
                return this.createBlocksFromFile(parent.previousConnector.parent, arrayLinhas, indexLinha + 1);
            }
            var newBlock = parent.addBlock(connector, 6, arrayLinhas[indexLinha].substring(8, arrayLinhas[indexLinha].length));
            newBlock.instruction = arrayLinhas[indexLinha].substring(8, arrayLinhas[indexLinha].length);
            return this.createBlocksFromFile(newBlock, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("IF") != -1) {
            var newBlock = parent.addBlock(connector, 1, arrayLinhas[indexLinha].substring(3, arrayLinhas[indexLinha].length));
            return this.createBlocksFromFile(newBlock, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("DECLARE") != -1) {
            var newBlock = parent.addBlock(connector, 2, "teste");
            let temp = arrayLinhas[indexLinha].substring(8, arrayLinhas[indexLinha].length);
            let tempInst = temp.split(' ');
            for (var j = 0; j < tempInst.length; j++) {
                if (j >= 2) {
                    if (newBlock.value == null) {
                        newBlock.value = "";
                    }
                    newBlock.value += tempInst[j];
                }
                else if (j == 1) {
                    newBlock.instruction = tempInst[j];
                }
                else if (j == 0) {
                    newBlock.type = tempInst[j];
                }
            }
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("WRITE") != -1) {
            var newBlock = parent.addBlock(connector, 5, arrayLinhas[indexLinha].substring(6, arrayLinhas[indexLinha].length));
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("READ") != -1) {
            var newBlock = parent.addBlock(connector, 3, arrayLinhas[indexLinha].substring(5, arrayLinhas[indexLinha].length));
            newBlock.instruction = arrayLinhas[indexLinha].substring(5, arrayLinhas[indexLinha].length);
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("BREAK") != -1) {
            var newBlock = parent.addBlock(connector, 7, "teste");
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("CONTINUE") != -1) {
            var newBlock = parent.addBlock(connector, 8, "teste");
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("EXECUTE") != -1) {
            var newBlock = parent.addBlock(connector, 4, arrayLinhas[indexLinha].substring(8, arrayLinhas[indexLinha].length));
            newBlock.instruction = arrayLinhas[indexLinha].substring(8, arrayLinhas[indexLinha].length);
            return this.createBlocksFromFile(parent, arrayLinhas, indexLinha + 1);
        }
        else if (arrayLinhas[indexLinha].search("WHILE") != -1) {
            if (arrayLinhas[indexLinha].search("END WHILE") != -1) {
                return this.createBlocksFromFile(parent.previousConnector.parent, arrayLinhas, indexLinha + 1);
            }
            var newBlock = parent.addBlock(connector, 0, arrayLinhas[indexLinha].substring(6, arrayLinhas[indexLinha].length));
            newBlock.instruction = arrayLinhas[indexLinha].substring(6, arrayLinhas[indexLinha].length);
            return this.createBlocksFromFile(newBlock, arrayLinhas, indexLinha + 1);
        }
        return;
    }
}
//# sourceMappingURL=FluxogramFileManager.js.map
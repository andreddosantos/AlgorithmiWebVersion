/*
 *
 * Instituto Politécnico de Tomar
 * Fluxogram Executor - André Daniel Lopes dos Santos
 *
 *
 */
"use strict";
class Executor {
    constructor(fluxogramManager) {
        this.auxDeclaredVaribales = [];
        this.fluxogramManager = fluxogramManager;
    }
    /**
     * Validates all fluxogram blocks according to their individual scope
     */
    validateFluxogram() {
        let finalState = true;
        this.fluxogramManager.blocks.forEach(element => {
            let isExpressionValid = true;
            if (element instanceof WriteBlock)
                isExpressionValid = this.validateWriteBlockExpression(element.previousConnector, element.instruction);
            if (element instanceof DefineBlock)
                isExpressionValid = this.validateVariablesForDefineBlock(element.previousConnector, element.type, element.instruction, element.value);
            if (element instanceof ExecuteBlock)
                isExpressionValid = this.validateExecuteBlockExpression(element.previousConnector, element.instruction);
            if (element instanceof WhileBlock || element instanceof DoWhileBlock)
                isExpressionValid = this.validateExpressionForContainerBlock(element.previousConnector, element.instruction);
            if (element instanceof IfBlock)
                isExpressionValid = this.validateExecuteBlockExpression(element.previousConnector, element.instruction);
            if (element instanceof ReadBlock)
                isExpressionValid = this.validateReadBlockVariable(element.previousConnector, element.instruction);
            if (!isExpressionValid) {
                finalState = false;
                element.executionState = ExecutionStateEnum.invalidBlock;
            }
            if (isExpressionValid) {
                element.executionState = "";
            }
        });
        this.fluxogramManager.shapeObjectManager.draw();
        return finalState;
    }
    /**
     * Method that validates write block expression
     */
    validateReadBlockVariable(line, instruction) {
        var isExpressionValid = false;
        var tempDeclaredVariables = [];
        //Initialize all variables in scope
        tempDeclaredVariables = this.initializeVariablesInScope(line, tempDeclaredVariables);
        try {
            eval(instruction);
            isExpressionValid = true;
        }
        catch (err) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err);
            isExpressionValid = false;
        }
        finally {
            //Destroy all variables in scope
            this.destroyVariables(tempDeclaredVariables);
        }
        return isExpressionValid;
    }
    /**
     * Method that validates write block expression
     */
    validateWriteBlockExpression(line, instruction) {
        var isExpressionValid = false;
        var tempDeclaredVariables = [];
        //Initialize all variables in scope
        tempDeclaredVariables = this.initializeVariablesInScope(line, tempDeclaredVariables);
        try {
            //validate the write block expression
            var instanceType = typeof (eval(instruction));
            isExpressionValid = ('string' == instanceType ? true : false);
            if (!isExpressionValid) {
                //If it is a string 
                new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Invalid content for write block");
            }
        }
        catch (err) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err);
            isExpressionValid = false;
        }
        finally {
            //Destroy all variables in scope
            this.destroyVariables(tempDeclaredVariables);
        }
        return isExpressionValid;
    }
    /**
     * Method that validates execute block expression
     */
    validateExecuteBlockExpression(line, instruction) {
        var isExpressionValid = false;
        var tempDeclaredVariables = [];
        //Initialize all variables in scope
        tempDeclaredVariables = this.initializeVariablesInScope(line, tempDeclaredVariables);
        try {
            //If the execution of the expression succeeds
            eval(instruction);
            isExpressionValid = true;
        }
        catch (err) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err);
            isExpressionValid = false;
        }
        finally {
            //Destroy all variables in scope
            this.destroyVariables(tempDeclaredVariables);
        }
        return isExpressionValid;
    }
    /**
     * Method that validates define block expression
     */
    validateVariablesForDefineBlock(line, typeVar, name, value) {
        var isExpressionValid = false;
        var tempDeclaredVariables = [];
        //Initialize all variables in scope
        tempDeclaredVariables = this.initializeVariablesInScope(line, tempDeclaredVariables);
        try {
            eval(name);
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "A variable with this name already exists!");
        }
        catch (err) {
            if (err.name == "ReferenceError") {
                isExpressionValid = this.declareNewVariable(typeVar, name, value);
                tempDeclaredVariables.push(name);
            }
            else {
                new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err);
            }
        }
        finally {
            //Destroy all variables in scope
            this.destroyVariables(tempDeclaredVariables);
        }
        return isExpressionValid;
    }
    /**
     * Method that validates container block expression - While, If, DoWhile
     */
    validateExpressionForContainerBlock(line, originalInstruction) {
        var isExpressionValid = false;
        var tempDeclaredVariables = [];
        //Initialize all variables in scope
        tempDeclaredVariables = this.initializeVariablesInScope(line, tempDeclaredVariables);
        try {
            //Check if expression is boolean type
            isExpressionValid = typeof (eval(originalInstruction)) === "boolean";
            if (!isExpressionValid) {
                new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Invalid expression");
            }
        }
        catch (err) {
            isExpressionValid = false;
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err.message);
        }
        finally {
            //Destroy all variables in scope
            this.destroyVariables(tempDeclaredVariables);
        }
        return isExpressionValid;
    }
    execute(line, velocity, declaredVariables) {
        if (this.outputConsole == undefined) {
            this.outputConsole = document.getElementById("internalOutputContentDiv");
            this.memoryConsole = document.getElementById("internalMemoryWidgetDiv");
        }
        this.auxDeclaredVaribales = declaredVariables;
        me = this;
        this.globalTimeOutId = window.setTimeout(this.executeFluxogram, velocity, line, velocity, declaredVariables);
    }
    stopExecution() {
        if (this.outputConsole == undefined) {
            this.outputConsole = document.getElementById("internalOutputContentDiv");
            this.memoryConsole = document.getElementById("internalMemoryWidgetDiv");
        }
        if (document.body.contains(document.getElementById("divPopInstructionContainer"))) {
            document.getElementById("divPopInstructionContainer").parentNode.removeChild(document.getElementById("divPopInstructionContainer"));
        }
        this.fluxogramManager.blocks.forEach(element => {
            element.executionState = "";
        });
        if (this.globalTimeOutId != null) {
            window.clearTimeout(this.globalTimeOutId);
            me.outputConsole.innerHTML += '<br><br> <span style="color:red;"> End Program <span>';
            this.globalTimeOutId = null;
        }
        this.fluxogramManager.shapeObjectManager.draw();
        this.destroyVariables(this.auxDeclaredVaribales);
        this.memoryConsole.innerHTML = '';
    }
    isInExecution() {
        if (this.globalTimeOutId != null) {
            return true;
        }
        else {
            return false;
        }
    }
    readFromReadBlock(variableName, value) {
        try {
            eval(variableName + " = " + value);
        }
        catch (err) {
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Heigth, err.message);
        }
    }
    /*
    *Private recursive method that executes the fluxogram
    */
    executeFluxogram(line, velocity, declaredVariables) {
        if (line.next == null) {
            declaredVariables = me.destroyVariablesInScope(line, declaredVariables);
            me.updateMemoryWidget(declaredVariables);
            //check if it is a "cicle parent" 
            if (line.parent instanceof WhileBlock || line.parent instanceof DoWhileBlock) {
                if (eval(line.parent.instruction)) {
                    let helperLine = line.parent.findFirstConnector(line.parent);
                    line.parent.executionState = ExecutionStateEnum.inExection;
                    if (line.previous != null) {
                        line.previous.executionState = ExecutionStateEnum.afterExecution;
                        me.fluxogramManager.shapeObjectManager.draw();
                        return me.execute(helperLine, velocity, declaredVariables);
                    }
                }
                else {
                    if (line.previous != null) {
                        line.previous.executionState = ExecutionStateEnum.afterExecution;
                    }
                    return me.execute(line.parent.nextConnector, velocity, declaredVariables);
                }
            }
            if (line.parent instanceof IfBlock) {
                if (line.previous != null) {
                    line.previous.executionState = ExecutionStateEnum.afterExecution;
                }
                return me.execute(line.parent.nextConnector, velocity, declaredVariables);
            }
            new SuccessPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Executed with success, check the output below.");
            me.stopExecution();
            me.destroyVariables(declaredVariables);
            return;
        }
        if (line.next instanceof WriteBlock)
            var temp = me.parseNewLineChar(line.next.instruction);
        me.outputConsole.innerHTML += eval(temp);
        if (line.next instanceof BreakBlock) {
            var block = me.findCycleInScope(line.next);
            if (block != null) {
                return me.execute(block.nextConnector, velocity, declaredVariables);
            }
        }
        if (line.next instanceof ContinueBlock) {
            var block = me.findCycleInScope(line.next);
            if (block != null) {
                return me.execute(block.previousConnector, velocity, declaredVariables);
            }
        }
        if (line.next instanceof DefineBlock) {
            window.eval("var " + line.next.instruction + " = " + line.next.value);
            if (declaredVariables == undefined) {
                declaredVariables = [];
            }
            declaredVariables.push(line.next.instruction);
            me.updateMemoryWidget(declaredVariables);
        }
        if (line.next instanceof ExecuteBlock) {
            window.eval(line.next.instruction);
            me.updateMemoryWidget(declaredVariables);
        }
        if (line.next instanceof ReadBlock) {
            new ReadBlockExecutionPopUp(line.next, line.next.nextConnector, line.next.instruction, velocity, declaredVariables);
            me.updateBlockExecutionState(line);
            return;
        }
        if (line.next instanceof WhileBlock || line.next instanceof DoWhileBlock) {
            let helperLine = line.next.findFirstConnector(line.next);
            if (line.next instanceof WhileBlock && eval(line.next.instruction)) {
                me.updateBlockExecutionState(line);
                return me.execute(helperLine, velocity, declaredVariables);
            }
            else if (line.next instanceof DoWhileBlock) {
                return me.execute(helperLine, velocity, declaredVariables);
            }
        }
        if (line.next instanceof IfBlock) {
            if (eval(line.next.instruction)) {
                let helperLine = line.next.findFirstConnectorRight();
                me.updateBlockExecutionState(line);
                return me.execute(helperLine, velocity, declaredVariables);
            }
            else {
                let helperLine = line.next.findFirstConnectorLeft();
                me.updateBlockExecutionState(line);
                return me.execute(helperLine, velocity, declaredVariables);
            }
        }
        me.updateBlockExecutionState(line);
        return me.execute(line.next.nextConnector, velocity, declaredVariables);
    }
    updateBlockExecutionState(line) {
        if (line.previous != null) {
            line.previous.executionState = ExecutionStateEnum.afterExecution;
        }
        else {
            if (!(line.parent instanceof BegginingBlock)) {
                line.parent.executionState = ExecutionStateEnum.afterExecution;
            }
        }
        line.next.executionState = ExecutionStateEnum.inExection;
        me.fluxogramManager.shapeObjectManager.draw();
    }
    /**
    * Method that returns all variables in scope
    */
    getVariablesInScope(line, variables) {
        if (line.previous != null) {
            if (line.previous instanceof DefineBlock) {
                variables.push(line.previous.instruction);
            }
            return this.getVariablesInScope(line.previous.previousConnector, variables);
        }
        if (line.parent instanceof BegginingBlock) {
            return variables;
        }
        else {
            return this.getVariablesInScope(line.parent.previousConnector, variables);
        }
    }
    /**
     * Method that initialize all variables in scope
     */
    initializeVariablesInScope(line, variables) {
        if (line.previous != null) {
            if (line.previous instanceof DefineBlock) {
                this.initializeDefineBlockForParser(line.previous);
                variables.push(line.previous.instruction);
            }
            return this.initializeVariablesInScope(line.previous.previousConnector, variables);
        }
        if (line.parent instanceof BegginingBlock) {
            return variables;
        }
        else {
            return this.initializeVariablesInScope(line.parent.previousConnector, variables);
        }
    }
    /**
    * Destroy variables in string[]
    */
    destroyVariables(variables) {
        try {
            variables.forEach(element => {
                var temp = "delete(window." + element + ");";
                eval(temp);
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }
    /**
   * Destroy variables in string[]
   */
    destroyVariablesInScope(line, variables) {
        if (line.previous != null) {
            if (line.previous instanceof DefineBlock) {
                try {
                    var temp = "delete(window." + line.previous.instruction + ");";
                    eval(temp);
                    variables.splice(variables.findIndex(obj => obj == line.previous.instruction));
                }
                catch (err) {
                    console.log("it was not possible to delete " + line.previous.instruction);
                }
            }
            return this.destroyVariablesInScope(line.previous.previousConnector, variables);
        }
        return variables;
    }
    /*
    *Declares new varible for define block
    */
    declareNewVariable(type, name, value) {
        var isExpressionValid = false;
        try {
            window.eval("var " + name + " = " + value);
            //Compares if the given type is the same of the just declared variable
            var instanceType = typeof (eval(name));
            isExpressionValid = (type == instanceType ? true : false);
            if (!isExpressionValid) {
                new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, "Variable of type " + type + ", has " + instanceType + " as value");
            }
        }
        catch (err) {
            isExpressionValid = false;
            new ErrorPopUp(ErrorSuccessWarningPopUpSize.Width, ErrorSuccessWarningPopUpSize.Height, err.message);
        }
        return isExpressionValid;
    }
    updateMemoryWidget(variables) {
        this.memoryConsole.innerHTML = '';
        if (variables != undefined) {
            variables.forEach(element => {
                let temp = document.createElement('div');
                temp.setAttribute("class", "memoryVariableDetailDiv");
                temp.innerHTML = " name: " + element;
                let tempValue = document.createElement('input');
                tempValue.setAttribute("type", "text");
                tempValue.setAttribute("class", "valueInMemoryDetail");
                tempValue.setAttribute("readonly", "true");
                tempValue.value = eval(element);
                temp.appendChild(tempValue);
                this.memoryConsole.appendChild(temp);
            });
        }
    }
    initializeDefineBlockForParser(block) {
        if (block.type == "number") {
            window.eval("var " + block.instruction + " = 1");
        }
        else if (block.type == "boolean") {
            window.eval("var " + block.instruction + " = false");
        }
        else if (block.type == "string") {
            window.eval("var " + block.instruction + ' = ""');
        }
    }
    findCycleInScope(block) {
        if (block.previousConnector.parent instanceof DoWhileBlock ||
            block.previousConnector.parent instanceof WhileBlock) {
            return block.previousConnector.parent;
        }
        else {
            if (block.previousConnector.parent instanceof BegginingBlock) {
                return null;
            }
            else {
                return this.findCycleInScope(block.previousConnector.parent);
            }
        }
    }
    parseNewLineChar(instruction) {
        let temp = instruction.replace(/\\n/g, "<br />");
        debugger;
        return temp;
    }
}
//# sourceMappingURL=Executor.js.map
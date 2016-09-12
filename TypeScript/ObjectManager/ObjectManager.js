"use strict";
class ObjectManager {
    /**
     * canvas - Receive html element canvas
     */
    constructor(canvas, fluxogramManager) {
        this.startCoords = { x: 0, y: 0 };
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.shapes = [];
        this.fluxogramManager = fluxogramManager;
        this.popUpIsActive = false;
        //scale and pan
        this.scaleFactor = 1.0;
        this.isMouseDown = false;
        this.horizontalPan = 0;
        this.verticalPan = 0;
        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.popUpIsActive) {
                this.mouseDownAction(e);
            }
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (document.body.contains(document.getElementById("divPopInstruction"))
                || document.body.contains(document.getElementById("errorPopUp"))
                || document.body.contains(document.getElementById("divPop"))
                || document.body.contains(document.getElementById("divPopInstructionContainer"))
                || document.body.contains(document.getElementById("divCode"))
                || document.body.contains(document.getElementById("BreakContinueBlocksInstructionPopUp"))) {
                this.popUpIsActive = true;
            }
            else {
                this.popUpIsActive = false;
            }
            if (!this.popUpIsActive) {
                this.mouseOverAction(e);
            }
        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.mouseUpAction(e);
        });
        this.canvas.addEventListener('mouseout', (e) => {
            this.mouseOutAction(e);
        });
        var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        this.canvas.addEventListener(event, (e) => {
            if (!this.popUpIsActive) {
                this.mouseOnScroll(e);
            }
        });
    }
    //method to add shapes to be drawn
    addShape(shape) {
        this.shapes.push(shape);
        this.draw();
    }
    //method to add shapes to be drawn
    removeShape(shape) {
        var indexDaShape = this.shapes.findIndex(s => s === shape);
        this.shapes.splice(indexDaShape, 1);
        this.draw();
    }
    //runs through all the shapes drawing them
    draw() {
        this.context.clearRect(-12000, -12000, 100000, 100000);
        this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.horizontalPan, this.verticalPan);
        for (var index = 0; index < this.shapes.length; index++) {
            this.shapes[index].draw(this.context);
        }
    }
    //Mouse Events --------------------------------
    mouseOverAction(e) {
        var rect = this.canvas.getBoundingClientRect();
        if (!this.fluxogramManager.executor.isInExecution()) {
            //check if i'm over the shapes
            for (var index = 0; index < this.shapes.length; index++) {
                if (this.shapes[index].contains(this.mouseX(e, rect), this.mouseY(e, rect)) && this.shapes[index].reactOnHover) {
                    if (!this.shapes[index].onMouseOuver) {
                        this.shapes[index].onMouseOuver = true;
                        this.shapes[index].actionOnMouseOver(this.context);
                    }
                }
                else if (this.shapes[index].onMouseOuver) {
                    this.shapes[index].onMouseOuver = false;
                    this.draw();
                }
            }
        }
        if (this.isMouseDown) {
            this.horizontalPan += this.mouseX(e, rect) - this.startCoords.x,
                this.verticalPan += this.mouseY(e, rect) - this.startCoords.y;
            this.draw();
        }
    }
    mouseUpAction(e) {
        this.isMouseDown = false;
    }
    mouseX(e, rect) {
        return (e.clientX - rect.left - this.horizontalPan) / this.scaleFactor;
    }
    mouseY(e, rect) {
        return (e.clientY - rect.top - this.verticalPan) / this.scaleFactor;
    }
    mouseDownAction(e) {
        e.preventDefault();
        e.stopPropagation();
        var rect = this.canvas.getBoundingClientRect();
        //Panning
        this.isMouseDown = true;
        this.startCoords = { x: this.mouseX(e, rect), y: this.mouseY(e, rect) };
        //check if i clicked any shape
        if (!this.fluxogramManager.executor.isInExecution()) {
            for (var index = 0; index < this.shapes.length; index++) {
                if (this.shapes[index].contains(this.mouseX(e, rect), this.mouseY(e, rect))) {
                    this.popUpIsActive = true;
                    this.isMouseDown = false;
                    this.shapes[index].actionOnMouseClick(this.context, this.fluxogramManager);
                }
            }
        }
    }
    mouseOutAction(e) {
        this.isMouseDown = false;
    }
    mouseOnScroll(e) {
        var delta = e.detail ? e.detail : e.wheelDelta;
        if (delta >= 0) {
            this.scaleFactor *= 1.01;
        }
        else {
            this.scaleFactor = Math.round((this.scaleFactor / 1.01) * 100) / 100 > 0.6 ? Math.round((this.scaleFactor / 1.01) * 100) / 100 : 0.6;
        }
        this.draw();
    }
}
//# sourceMappingURL=ObjectManager.js.map
var me;
var ExecutionStateEnum;
(function (ExecutionStateEnum) {
    ExecutionStateEnum[ExecutionStateEnum["inExection"] = "#FA506F"] = "inExection";
    ExecutionStateEnum[ExecutionStateEnum["afterExecution"] = "#D4B8A3"] = "afterExecution";
    ExecutionStateEnum[ExecutionStateEnum["invalidBlock"] = "#ffd42a"] = "invalidBlock";
})(ExecutionStateEnum || (ExecutionStateEnum = {}));
;
var WhileBlockShapeSize;
(function (WhileBlockShapeSize) {
    WhileBlockShapeSize[WhileBlockShapeSize["losanguloWidth"] = 80] = "losanguloWidth";
    WhileBlockShapeSize[WhileBlockShapeSize["losanguloColor"] = "#BCED91"] = "losanguloColor";
    WhileBlockShapeSize[WhileBlockShapeSize["losanguloHeight"] = 80] = "losanguloHeight";
    WhileBlockShapeSize[WhileBlockShapeSize["joinShapeRadius"] = 40] = "joinShapeRadius";
    WhileBlockShapeSize[WhileBlockShapeSize["blockHeight"] = 180] = "blockHeight";
    WhileBlockShapeSize[WhileBlockShapeSize["blockWidth"] = 120] = "blockWidth";
})(WhileBlockShapeSize || (WhileBlockShapeSize = {}));
;
var BegginingBlockShapeSize;
(function (BegginingBlockShapeSize) {
    BegginingBlockShapeSize[BegginingBlockShapeSize["begginingShapeSizeWidth"] = 126] = "begginingShapeSizeWidth";
    BegginingBlockShapeSize[BegginingBlockShapeSize["endShapeSizeWidth"] = 126] = "endShapeSizeWidth";
    BegginingBlockShapeSize[BegginingBlockShapeSize["begginingShapeSizeHeigth"] = 52] = "begginingShapeSizeHeigth";
    BegginingBlockShapeSize[BegginingBlockShapeSize["endShapeSizeHeigth"] = 52] = "endShapeSizeHeigth";
    BegginingBlockShapeSize[BegginingBlockShapeSize["blockSize"] = 300] = "blockSize";
    BegginingBlockShapeSize[BegginingBlockShapeSize["blockHeight"] = 200] = "blockHeight";
    BegginingBlockShapeSize[BegginingBlockShapeSize["begginingColor"] = "#AAAAFF"] = "begginingColor";
    BegginingBlockShapeSize[BegginingBlockShapeSize["endColor"] = "#AAAAFF"] = "endColor";
})(BegginingBlockShapeSize || (BegginingBlockShapeSize = {}));
;
var IfBlockShapeSize;
(function (IfBlockShapeSize) {
    IfBlockShapeSize[IfBlockShapeSize["losanguloWidth"] = 80] = "losanguloWidth";
    IfBlockShapeSize[IfBlockShapeSize["losanguloColor"] = "#BCED91"] = "losanguloColor";
    IfBlockShapeSize[IfBlockShapeSize["joinShapeColor"] = "#ffccaa"] = "joinShapeColor";
    IfBlockShapeSize[IfBlockShapeSize["losanguloHeight"] = 80] = "losanguloHeight";
    IfBlockShapeSize[IfBlockShapeSize["joinShapeRadius"] = 40] = "joinShapeRadius";
    IfBlockShapeSize[IfBlockShapeSize["blockHeight"] = 180] = "blockHeight";
    IfBlockShapeSize[IfBlockShapeSize["blockWidth"] = 160] = "blockWidth";
})(IfBlockShapeSize || (IfBlockShapeSize = {}));
;
var ReadBlockShapeSize;
(function (ReadBlockShapeSize) {
    ReadBlockShapeSize[ReadBlockShapeSize["readShapeColor"] = "#FF69B4"] = "readShapeColor";
    ReadBlockShapeSize[ReadBlockShapeSize["readShapeWidth"] = 200] = "readShapeWidth";
    ReadBlockShapeSize[ReadBlockShapeSize["readShapeHeight"] = 80] = "readShapeHeight";
})(ReadBlockShapeSize || (ReadBlockShapeSize = {}));
;
var BreakContinueShapeSize;
(function (BreakContinueShapeSize) {
    BreakContinueShapeSize[BreakContinueShapeSize["BreakContinueShapeColor"] = "#ffc174"] = "BreakContinueShapeColor";
    BreakContinueShapeSize[BreakContinueShapeSize["BreakContinueShapeWidth"] = 200] = "BreakContinueShapeWidth";
    BreakContinueShapeSize[BreakContinueShapeSize["BreakContinueShapeHeight"] = 80] = "BreakContinueShapeHeight";
})(BreakContinueShapeSize || (BreakContinueShapeSize = {}));
;
var DefineBlockShapeSize;
(function (DefineBlockShapeSize) {
    DefineBlockShapeSize[DefineBlockShapeSize["rectangleColor"] = "#fed7cd"] = "rectangleColor";
    DefineBlockShapeSize[DefineBlockShapeSize["rectangleWidth"] = 200] = "rectangleWidth";
    DefineBlockShapeSize[DefineBlockShapeSize["rectangleHeight"] = 80] = "rectangleHeight";
})(DefineBlockShapeSize || (DefineBlockShapeSize = {}));
;
var ExecuteBlockShapeSize;
(function (ExecuteBlockShapeSize) {
    ExecuteBlockShapeSize[ExecuteBlockShapeSize["rectangleColor"] = "#ffff99"] = "rectangleColor";
    ExecuteBlockShapeSize[ExecuteBlockShapeSize["rectangleWidth"] = 200] = "rectangleWidth";
    ExecuteBlockShapeSize[ExecuteBlockShapeSize["rectangleHeight"] = 80] = "rectangleHeight";
})(ExecuteBlockShapeSize || (ExecuteBlockShapeSize = {}));
;
var WriteBlockShapeSize;
(function (WriteBlockShapeSize) {
    WriteBlockShapeSize[WriteBlockShapeSize["rectangleColor"] = "#b3d1ff"] = "rectangleColor";
    WriteBlockShapeSize[WriteBlockShapeSize["rectangleWidth"] = 200] = "rectangleWidth";
    WriteBlockShapeSize[WriteBlockShapeSize["rectangleHeight"] = 80] = "rectangleHeight";
})(WriteBlockShapeSize || (WriteBlockShapeSize = {}));
;
var ReturnBlockShapeSize;
(function (ReturnBlockShapeSize) {
    ReturnBlockShapeSize[ReturnBlockShapeSize["rectangleColor"] = "#556677"] = "rectangleColor";
    ReturnBlockShapeSize[ReturnBlockShapeSize["rectangleWidth"] = 200] = "rectangleWidth";
    ReturnBlockShapeSize[ReturnBlockShapeSize["rectangleHeight"] = 80] = "rectangleHeight";
})(ReturnBlockShapeSize || (ReturnBlockShapeSize = {}));
;
var DoWhileBlockShapeSize;
(function (DoWhileBlockShapeSize) {
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["losanguloWidth"] = 80] = "losanguloWidth";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["losanguloColor"] = "#BCED91"] = "losanguloColor";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["joinShapeColor"] = "#ffccaa"] = "joinShapeColor";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["losanguloHeight"] = 80] = "losanguloHeight";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["joinShapeRadius"] = 40] = "joinShapeRadius";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["blockHeight"] = 180] = "blockHeight";
    DoWhileBlockShapeSize[DoWhileBlockShapeSize["blockWidth"] = 120] = "blockWidth";
})(DoWhileBlockShapeSize || (DoWhileBlockShapeSize = {}));
;
var LineSize;
(function (LineSize) {
    LineSize[LineSize["verticalLineSize"] = 52] = "verticalLineSize";
})(LineSize || (LineSize = {}));
;
var ErrorSuccessWarningPopUpSize;
(function (ErrorSuccessWarningPopUpSize) {
    ErrorSuccessWarningPopUpSize[ErrorSuccessWarningPopUpSize["Heigth"] = 80] = "Heigth";
    ErrorSuccessWarningPopUpSize[ErrorSuccessWarningPopUpSize["Width"] = 120] = "Width";
})(ErrorSuccessWarningPopUpSize || (ErrorSuccessWarningPopUpSize = {}));
;
var ConfirmSuccessWarningPopUpSize;
(function (ConfirmSuccessWarningPopUpSize) {
    ConfirmSuccessWarningPopUpSize[ConfirmSuccessWarningPopUpSize["Heigth"] = 80] = "Heigth";
    ConfirmSuccessWarningPopUpSize[ConfirmSuccessWarningPopUpSize["Width"] = 160] = "Width";
})(ConfirmSuccessWarningPopUpSize || (ConfirmSuccessWarningPopUpSize = {}));
;
//# sourceMappingURL=BlockConstants.js.map
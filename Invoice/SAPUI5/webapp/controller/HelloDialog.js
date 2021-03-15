//@ts-check
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
/**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObject
 * @param {typeof sap.ui.core.Fragment} Fragment
 */
function(ManagedObject, Fragment){
    "use strict"

    return ManagedObject.extend("logaligroup.SAPUI5.controller.HelloDialog",{

        constructor: function(oView){
            // the underscore for new objects. The View Is passed
            this._oView = oView;
        },
        // Exit is used when the instance is destroyed
        exit: function(){
            delete this._oView;
        },
        //When the dialog is opened
        open: function(){

                const oView = this._oView;

                //Create dialog lazily
                if (!oView.byId("HelloDialog")) {
                    //New Variable for that emulates the controller
                    let oFragmentController = {
                        onCloseDialog: function(){
                                oView.byId("HelloDialog").close();
                            }
                    };
                    //ID de la vista
                    //Nombre del fragmento a llamar
                    //Se envía luego una instancia del diálogo
                    //load asyncronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "logaligroup.SAPUI5.view.HelloDialog",
                        // Se debe indicar a cual controlador pertenece
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    oView.byId("HelloDialog").open();
                }
        }

    });

});
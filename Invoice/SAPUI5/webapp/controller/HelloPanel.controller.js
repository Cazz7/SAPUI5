//@ts-check
/* eslint-disable no-undef */
/*para llamar al fragment por código*/
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller } Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
     * @param {typeof sap.base.Log} Log 
     */
    function (Controller, MessageToast, Log) {
        "use strict"

        return Controller.extend("logaligroup.SAPUI5.controller.HelloPanel", {
            onInit: function () {

            },
            onShowHello: function () {
                //read text from i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //Read property from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMessage", [sRecipient]);
                MessageToast.show(sMsg);
            },
            onOpenDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            },
            onBeforeRendering: function(){
                window.message = 'Log message - onBeforeRendering';
                Log.info(window.message);
                Log.error(window.message);
            },
            onAfterRendering: function(){
                //App will stop with developper tools
                //debugger;
            }
        });
    });
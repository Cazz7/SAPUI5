// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device"
],
/**
 * @param {typeof sap.ui.core.UIComponent} UIComponent
 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
 * @param {typeof sap.ui.Device} Device
 */
function(UIComponent, Models, ResourceModel, HelloDialog, Device){

    return UIComponent.extend("logaligroup.SAPUI5.Component",{

        metadata: {
            manifest : "json"
        },
        //The component js is perfect to set the managed object because
        // this object is visible throughout the App
        // However we have to adjust this object for the Managed Object
        init : function(){
            //call init function of the parent
            UIComponent.prototype.init.apply(this,arguments);

            //set data model on the view. View is not necessary
            this.setModel(Models.createRecipient());
            //set i18n model on the view (No longer necessary)
            //var i18nModel = new ResourceModel({ bundleName : "logaligroup.SAPUI5.i18n.i18n"});
            //this.setModel(i18nModel,"i18n");

            //Instance of managed Object
            //We have to add the instance of the view in runtime
            this._helloDialog = new HelloDialog(this.getRootControl());

            //Set the device model
            this.setModel(Models.createDeviceModel(), "device");            

            //create the views based on the url/hash
            this.getRouter().initialize();
        },
        //To free up the resources we have used
        exit: function(){
            this._helloDialog.destroy();
            delete this._helloDialog;
        },
        //To open the dialog
        openHelloDialog:function(){
            this._helloDialog.open();
        },
        // returns class that determines content density class: cozy or compact
        getContentDensityClass: function(){
            if (!Device.support.touch){ //Checks whether or not on touch device
                this._sContentDensityClass = "sapUiSizeCompact";
            }else{
                this._sContentDensityClass = "sapUiSizeCozy";
            }
            return this._sContentDensityClass;
        }        
    });
});
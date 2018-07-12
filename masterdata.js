rtl.module("masterdata",["System","Web","Classes","Avamm","webrouter","AvammForms","dhtmlx_base","SysUtils"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass($mod,"TMasterdataForm",pas.AvammForms.TAvammForm,function () {
  });
  this.Masterdata = null;
  this.ShowMasterdata = function (URl, aRoute, Params) {
    var aForm = null;
    aForm = $mod.TMasterdataForm.$create("Create$1",[pas.AvammForms.TAvammFormMode.fmInlineWindow,"masterdata",Params.GetValue("Id"),""]);
  };
  this.ShowMasterdataList = function (URl, aRoute, Params) {
    var aParent = null;
    if ($mod.Masterdata === null) {
      aParent = rtl.getObject(pas.Avamm.GetAvammContainer());
      $mod.Masterdata = pas.AvammForms.TAvammListForm.$create("Create$2",[aParent,"masterdata","1C"]);
      var $with1 = $mod.Masterdata;
      $with1.Grid.setHeader("Nummer,Kurztext,Version,Status,Kategorie");
      $with1.Grid.setColumnIds("ID,SHORTTEXT,VERSION,STATUS,CATEGORY");
      $with1.Grid.attachHeader("#text_filter,#text_filter,#text_filter,#select_filter,#text_filter");
      $with1.Grid.setInitWidths("150,*,70,100,150");
      $with1.Grid.init();
    };
    $mod.Masterdata.Show();
  };
  $mod.$resourcestrings = {strMasterdata: {org: "Artikel"}};
  $mod.$init = function () {
    if (pas.Avamm.getRight("masterdata") > 0) pas.Avamm.RegisterSidebarRoute(rtl.getResStr(pas.masterdata,"strMasterdata"),"masterdata",$mod.ShowMasterdataList);
    pas.webrouter.Router().RegisterRoute("\/masterdata\/by-id\/:Id\/",$mod.ShowMasterdata,false);
  };
});
//# sourceMappingURL=masterdata.js.map

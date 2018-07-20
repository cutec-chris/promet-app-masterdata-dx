rtl.module("masterdata",["System","JS","Web","Classes","Avamm","webrouter","AvammForms","dhtmlx_base","SysUtils","dhtmlx_treeview"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass($mod,"TMasterdataForm",pas.AvammForms.TAvammForm,function () {
    this.$init = function () {
      pas.AvammForms.TAvammForm.$init.call(this);
      this.FStructureTree = null;
    };
    this.$final = function () {
      this.FStructureTree = undefined;
      pas.AvammForms.TAvammForm.$final.call(this);
    };
    this.FillStructure = function (root, aData) {
      var aList = null;
      var aArt = null;
      var i = 0;
      var aText = "";
      aList = rtl.getObject(aData["Data"]);
      for (var $l1 = 0, $end2 = aList.length - 1; $l1 <= $end2; $l1++) {
        i = $l1;
        aArt = rtl.getObject(aList[i]);
        aText = "" + aArt["SHORTTEXT"];
        if (("" + aArt["IDENT"]) !== "") aText = ((aText + " (") + ("" + aArt["IDENT"])) + ")";
        if (("" + aArt["VERSION"]) !== "") aText = ((aText + " [") + ("" + aArt["VERSION"])) + "]";
        this.FStructureTree.addItem(aArt["sql_id"],aText,root);
        var $tmp3 = "" + aArt["POSTYP"];
        if ($tmp3 === "M") {
          this.FStructureTree.setItemIcons(aArt["sql_id"],pas.JS.New(["file","fa-box","folder-opened","fa-box","folder-closed","fa-box"]))}
         else if ($tmp3 === "A") {
          this.FStructureTree.setItemIcons(aArt["sql_id"],pas.JS.New(["file","fa-cog","folder-opened","fa-cog","folder-closed","fa-cog"]))}
         else if ($tmp3 === "X") this.FStructureTree.setItemIcons(aArt["sql_id"],pas.JS.New(["file","fa-comments","folder-opened","fa-comments","folder-closed","fa-comments"]));
      };
    };
    this.TreeViewDblClick = function (id) {
      var aTxt = "";
      aTxt = this.FStructureTree.getItemText(id);
      aTxt = pas.System.Copy(aTxt,pas.System.Pos("(",aTxt) + 1,aTxt.length);
      aTxt = pas.System.Copy(aTxt,0,pas.System.Pos(")",aTxt) - 1);
      pas.webrouter.Router().Push("masterdata\/by-id\/" + aTxt);
    };
    this.DoLoadData = function () {
      this.CreateForm();
      pas.AvammForms.TAvammForm.DoLoadData.call(this);
      this.DoOpen();
    };
    this.CreateForm = function () {
      this.Tabs.addTab("structure",rtl.getResStr(pas.masterdata,"strStructure"),null,1,true,false);
      this.FStructureTree = rtl.getObject(this.Tabs.cells("structure").attachTreeView(pas.JS.New([])));
      this.FStructureTree.setIconset("font_awesome");
      this.FStructureTree.attachEvent("onDblClick",rtl.createCallback(this,"TreeViewDblClick"));
    };
    this.DoOpen = function () {
      this.FStructureTree.clearAll();
      this.FStructureTree.addItem("root",this.FData["SHORTTEXT"]);
      this.FillStructure("root",rtl.getObject(this.FData["MDPOSITIONS"]));
      this.FStructureTree.openItem("root");
    };
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
      $with1.SetFilterHeader("#text_filter,#text_filter,#text_filter,#select_filter,#text_filter");
      $with1.Grid.setInitWidths("150,*,70,100,150");
      $with1.Grid.init();
    };
    $mod.Masterdata.Show();
  };
  $mod.$resourcestrings = {strMasterdata: {org: "Artikel"}, strStructure: {org: "Struktur"}};
  $mod.$init = function () {
    if (pas.Avamm.getRight("masterdata") > 0) pas.Avamm.RegisterSidebarRoute(rtl.getResStr(pas.masterdata,"strMasterdata"),"masterdata",$mod.ShowMasterdataList);
    pas.webrouter.Router().RegisterRoute("\/masterdata\/by-id\/:Id\/",$mod.ShowMasterdata,false);
  };
});
//# sourceMappingURL=masterdata.js.map

library masterdata;
  uses js, web, classes, Avamm, webrouter, AvammForms, dhtmlx_base,
    dhtmlx_form,SysUtils, Types, dhtmlx_treeview;

type

  { TStatisticsForm }

  { TMasterdataForm }

  TMasterdataForm = class(TAvammForm)
  private
    FStructureTree : TDHTMLXTreeview;
    procedure FillStructure(root : JSValue;aData : TJSObject);
  public
    procedure DoLoadData; override;
    procedure CreateForm;
    procedure DoOpen;
  end;

resourcestring
  strMasterdata             = 'Artikel';
  strStructure              = 'Struktur';

var
  Masterdata : TAvammListForm = nil;
Procedure ShowMasterdata(URl : String; aRoute : TRoute; Params: TStrings);
var
  aForm: TAvammForm;
begin
  aForm := TMasterdataForm.Create(fmInlineWindow,'masterdata',Params.Values['Id']);
end;
Procedure ShowMasterdataList(URl : String; aRoute : TRoute; Params: TStrings);
var
  aParent: TJSHTMLElement;
begin
  if Masterdata = nil then
    begin
      aParent := TJSHTMLElement(GetAvammContainer());
      Masterdata := TAvammListForm.Create(aParent,'masterdata');
      with Masterdata do
        begin
          Grid.setHeader('Nummer,Kurztext,Version,Status,Kategorie');
          Grid.setColumnIds('ID,SHORTTEXT,VERSION,STATUS,CATEGORY');
          FilterHeader := '#text_filter,#text_filter,#text_filter,#select_filter,#text_filter';
          Grid.setInitWidths('150,*,70,100,150');
          Grid.init();
        end;
    end;
  Masterdata.Show;
end;

{ TMasterdataForm }

procedure TMasterdataForm.FillStructure(root: JSValue; aData: TJSObject);
var
  aList: TJSArray;
  aArt: TJSObject;
  i: Integer;
  aText: String;
begin
  aList := TJSArray(aData.Properties['Data']);
  for i := 0 to aList.Length-1 do
    begin
      aArt := TJSObject(aList.Elements[i]);
      aText := string(aArt.Properties['SHORTTEXT']);
      if string(aArt.Properties['IDENT']) <> '' then
        aText := aText+' ('+string(aArt.Properties['IDENT'])+')';
      if string(aArt.Properties['VERSION'])<>'' then
        aText := aText+' ['+string(aArt.Properties['VERSION'])+']';
      FStructureTree.addItem(aArt.Properties['sql_id'],aText,root);
      case string(aArt.Properties['POSTYP']) of
      'M':
        FStructureTree.setItemIcons(aArt.Properties['sql_id'],js.new(['file','fa-box',
                                                                    'folder-opened','fa-box',
                                                                    'folder-closed','fa-box'
                                                                   ]));
      'A':
        FStructureTree.setItemIcons(aArt.Properties['sql_id'],js.new(['file','fa-cog',
                                                                    'folder-opened','fa-cog',
                                                                    'folder-closed','fa-cog'
                                                                   ]));
      'X':
        FStructureTree.setItemIcons(aArt.Properties['sql_id'],js.new(['file','fa-comments',
                                                                    'folder-opened','fa-comments',
                                                                    'folder-closed','fa-comments'
                                                                   ]));
      end;
    end;
end;

procedure TMasterdataForm.DoLoadData;
begin
  CreateForm;
  inherited DoLoadData;
  DoOpen;
end;

procedure TMasterdataForm.CreateForm;
begin

end;

procedure TMasterdataForm.DoOpen;
begin
  Tabs.addTab('structure',strStructure,nil,1,true,false);
  FStructureTree := TDHTMLXTreeview(Tabs.cells('structure').attachTreeView(js.new([])));
  FStructureTree.addItem('root',Data.Properties['SHORTTEXT']);
  FStructureTree.setIconset('font_awesome');
  FillStructure('root',TJSObject(Data.Properties['MDPOSITIONS']));
  FStructureTree.openItem('root');
end;

initialization
  if getRight('masterdata')>0 then
    RegisterSidebarRoute(strMasterdata,'masterdata',@ShowMasterdataList);
  Router.RegisterRoute('/masterdata/by-id/:Id/',@ShowMasterdata);
end.


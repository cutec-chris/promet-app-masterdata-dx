library masterdata;
  uses js, web, classes, Avamm, webrouter, AvammForms, dhtmlx_base,
    dhtmlx_form,SysUtils, Types;

type

  { TStatisticsForm }

  TMasterdataForm = class(TAvammForm)
  end;

resourcestring
  strMasterdata             = 'Artikel';

var
  Masterdata : TAvammListForm = nil;
Procedure ShowMasterdata(URl : String; aRoute : TRoute; Params: TStrings);
var
  aForm: TAvammForm;
begin
  aForm := TMasterdataForm.Create(fmTab,'masterdata',Params.Values['Id']);
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
          Grid.setHeader('Nummer,Kurztext,Version,Status,Kategorie',',',TJSArray._of([]));
          Grid.setColumnIds('ID,SHORTTEXT,VERSION,STATUS,CATEGORY');
          Grid.attachHeader('#text_filter,#text_filter,#text_filter,#select_filter,#text_filter');
          Grid.setInitWidths('150,*,70,100,150');
          Grid.init();
        end;
    end;
  Masterdata.Show;
end;

initialization
  RegisterSidebarRoute(strMasterdata,'masterdata',@ShowMasterdataList);
  Router.RegisterRoute('/masterdata/by-id/:Id/',@ShowMasterdata);
end.


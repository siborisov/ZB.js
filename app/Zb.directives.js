
function btnFolderOpen() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("success", "left", "Рвскрыть", "folder-open")              
  };
}

function btnCardCopy() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("success", "left", "Скопировать", "copy")              
  };
}

function btnRemoveFromList() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Скрыть", "remove")             
  };
}

function btnListSortngOff() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Убрать сортировку", "sort")              
  };
}

function btnListFilterOff() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Убрать фильтрыу", "filter")
  };
}


function btnListSelectAllOff() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Закрыть все карточки", "folder-open")    
  };
}

function btnListSelectAllOn() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("success", "left", "Раскрыть все карточки", "folder-open")    
  };
}

function btnListRefresh() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("success", "left", "Обновить ", "refresh")

  }
}

function tooltipTemplate(cls, place, tlt, ic) {
// можно везде потом заменить tooltip на popover-trigger = "mouseenter" popover-placement="left" popover= "Прикрепленные файлы"
  var t = '<button  type="button"' + 
          ' class="btn btn-sm btn-' +  cls + '"' + // '>' +
          ' tooltip-placement="' + place + '"'+
          ' tooltip= "' + tlt +'">' +
	        '<i class="glyphicon glyphicon-' + ic + '"></i>'+
             '</button>';
  return t;
}

function btnTemplate(cls, place, tlt, ic) {
// можно везде потом заменить tooltip на popover-trigger = "mouseenter" popover-placement="left" popover= "Прикрепленные файлы"
  var t = '<span  type="button"' + 
          ' class="fa-stack fa-sm"' +
          ' tooltip-placement="' + place + '"'+
          ' tooltip= "' + tlt +'">' +
	        '<i class="fa fa-'+ic+' fa-stack-1x"></i><i class="fa fa-circle-o'+' fa-stack-2x text-'+cls + '"></i>'+
             '</span>';
  return t;
}


// кнопки для журнала - параметры отбора

function btnJourParsClearAll() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("inverse", "left", "Обновить ", "remove")    
  }}



// tooltipTemplate("default", "left", "Редактировать строку", "pencil") 
// кнопки для строк карточки
     
// в примере смарт-табл используется a !!!!!

function btnExportScv() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("info", "left", "Выгрузка данных в формате CSV", "download")    
}}


function btnShowDetails() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("", "left", "Расширенные параметры отбора", "ellipsis-h")    
}}

     
function btnSetEditOn() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("info", "left", "Перейти в режим редактирования", "pencil") 
  }}

function btnSetEditOff() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Закончить редактирование", "pencil") 
  }}
     
function btnRowEdit() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("info", "left", "Редактировать строку", "pencil") 
  }}

function btnRowFiles() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("info", "left", "Прикрепленные файлы", "thumb-tack")
  }}


function btnRowAdd() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("info", "left", "Добавить строку", "plus")
  }}


function btnRowTrash() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
    template : btnTemplate("danger", "left", "Удалить строку", "trash")
  }}

// кнопки для карточки в режиме редактирования

function btnRowSubmit() {
  return { 
    restrict: 'E', // E - означает что директива предназначена для Element
  template : '<button  type="submit"  class="btn  btn-primary"  tooltip-placement="right" tooltip= "Сохранить строку в базе данных">' +
	           'Записать'+
             '</button>'
  }}

function btnErrors() {
  return { 
    restrict: 'E', 
  template : '<button class="btn btn-sm btn-danger">' +
	           'Ошибки'+
             '</button>'
  };
}


angular
  .module('Zb.directives', ['ui.bootstrap'])
  .directive('btnFolderOpen',btnFolderOpen)
  .directive('btnCardCopy',btnCardCopy)
  .directive('btnRemoveFromList',btnRemoveFromList)
  .directive('btnListSortngOff', btnListSortngOff)
  .directive('btnListFilterOff',btnListFilterOff)
  .directive('btnListSelectAllOn',btnListSelectAllOn)
  .directive('btnListSelectAllOff',btnListSelectAllOff)
  .directive('btnListRefresh',btnListRefresh)
  .directive('btnRowEdit',btnRowEdit)  
  .directive('btnRowFiles',btnRowFiles)  
  .directive('btnRowTrash',btnRowTrash)   
  .directive('btnRowAdd',btnRowAdd)
  .directive('btnRowSubmit',btnRowSubmit)
  .directive('btnErrors',btnErrors)
  .directive('btnJourParsClearAll', btnJourParsClearAll)
  .directive('btnSetEditOff', btnSetEditOff)
  .directive('btnSetEditOn',btnSetEditOn)
  .directive('btnExportScv', btnExportScv)
  .directive('btnShowDetails', btnShowDetails)
  ;
  
  
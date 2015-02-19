function Cardinit($scope,  $http , $filter, ngTableParams) {

/*
	    $http.get('http://www.bik-info.ru/api.html?type=json&bik=044525225').success(function(response) {
	      $scope.bikobj = response; 
        });
*/

// гл меню

//$scope.ZbIni = function($scope,  $http) {
	    $http.get('data/menu.json').success(function(response) {
	      $scope.mainmenu = response;       // гл меню
	    }); 

	    $http.get('data/pars.prtn.json').success(function(response) {
	      $scope.JourParsPrtn = response;   // параметры отбора
	    }); 
//};

//this.ZbIni();
// GRID
$scope.data = [];
$scope.LoadJournal = function() {

	  $scope.data.splice(0, $scope.data.length);

    $http.get('data/list.prtn.json').success(function(response)  {
	  $scope.data = response; 
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            name: ''       // initial filter
        },
        sorting: {
           name: 'asc'
        }
    }, {
        
        total: $scope.data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var filteredData = params.filter() ?
              $filter('filter')($scope.data, params.filter()) : $scope.data;
            var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) : $scope.data;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    });  
};    
    $scope.changeSelection = function(user) {
        // console.info(user);
    };
  
/*  
    $scope.changeSelectionsAll = function(val) {
      for (var i = 0; i < $scope.data.length; i++) {
          $scope.tableParams.data[i].$selected = val;
      }
    };
*/

// сделать универсалтными для любой поисковой формы - а возможно и ее тоже сделать универсальной

    $scope.clearFndTextAll = function() {
      for (var i = 0; i < this.lstFndTextboxes.length; i++) {
          this.lstFndTextboxes[i].value = '';
      }
    };
    
    $scope.clearFndCmbAll = function() {
      for (var j = 0; j < this.JourParsPrtn.length; j++) {      
        for (var i = 0; i < this.JourParsPrtn[j].comboboxes.length; i++) {
            this.JourParsPrtn[j].comboboxes[i].value = {};
        }
      }
    };
    
    $scope.clearFndAll = function() {
      this.clearFndCmbAll();
      this.clearFndTextAll();
    };
    
// журнал    
    



// ======== валидация
    $scope.person = {
      firstName: null,
      lastName: null
    };

    $scope.getItemState = function (item)
    { var strErr = "";
      if (item.$invalid)
      {
        return "Ошибки:";
      }
      else
      {
        return "";
      }
    };

    $scope.getItemMsgError = function (item)
    { var strErr = "";
      if (item.$invalid)
      {
        if (item.$error.required) { strErr = " Обязательное поле " + "\n" }
        if (item.$error.minlength) { strErr = strErr + " Мало символов; " + "\n"}
        if (item.$error.maxlength) { strErr = strErr + " Много символов; " + "\n" }
        if (item.$error.pattern) { strErr = strErr + " Неправильный формат; " + "\n" }
          
        }
//      alert(strErr);
      return strErr;
    };


    $scope.getItemError = function (item)
    {
      if (item.$invalid)
      {
        return item.$error;
      }
      else
      {
        return null;
      }
    };

    $scope.getValidationCSSClass = function (item)
    {
      // We show an error only if the item has been modified
      // at least once to avoid displaying errors as soon as
      // the form is loaded (we wait for the user to interact
      // with the controls before declaring them invalid).
      return {
        invalidItem: item.$invalid && item.$dirty
      };
    };

    $scope.getValidationError = function (item)
    {
      // We show an error only if the item has been modified
      // at least once to avoid displaying errors as soon as
      // the form is loaded (we wait for the user to interact
      // with the controls before declaring them invalid).
      if (item.$dirty && item.$error.required)
      {
        return "Required field";
      }
      else
      {
        return "";
      }
    };



//  ======================== Редактирование Записи

$scope.Pattern_Num = /^[0-9]+$/;
$scope.Pattern_Text = /^[0-9A-Za-zА-Яа-я.№%()-:\s]+$/;

$scope.GetBIKInfo = function(isValid, item) {
if (isValid) { 

	 $http.get('http://www.bik-info.ru/api.html?type=json&bik=' + item.tmpRow.PropValue)
	    .success(function(response, status) {

   	    $scope.bikobj = response;

	      item.tmpRow.PropComment  = "";
	      item.tmpRow.PropComment = $scope.bikobj.name.replace(/&quot;/g,"'") + " г." + $scope.bikobj.city + " кор.сч. " + $scope.bikobj.ks ;
        alert (item.tmpRow.PropComment);
	   })
      .error(function(response, status) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
        });

}
};





$scope.ClassBorderStatus = function(status) {
switch (status) {

  case 0:
    return "zbstatusbordersigned";
  case 1:
    return "zbstatusborderdraft";
  case 10:
    return "zbstatusborderarchive";
  case -1:
    return "zbstatusborderdelete";
  case 2:
    return "zbstatusborderreturn";
  default:
    return "";
}
};

$scope.ClassBorderEdit = function(edit) {
if (edit) {
    return "zbstatusborderisedit"
}
else
    return "zbstatusbordernoedit";
};

// !! на одной странице нельзя редактировать стразу несколько строк и открывать сразу несколько закладок с прикрепленными файлами 
// а в журнале нельзя редактировать несколько карточек ? - просто чтоыне путать юзера

$scope.CardRowEd = function(tab, CardRow) {
	  CardRow.isEdit = true;   
	  tab.isEdit = true;
  	tab.tmpRow = angular.copy(CardRow);
};

$scope.CardRowAdd = function(tab, CardRow) {
	  CardRow.isEdit = true; 	  
	  tab.isEdit = true;
  	tab.tmpRow = angular.copy(CardRow);
  	tab.AddRow = angular.copy(CardRow);
};
	
$scope.CardRowDel = function(tab, CardRow) {
    tab.rows.splice(tab.rows.indexOf(CardRow),1);
		alert('Удаление записи в БД. ');
};

$scope.CardRowClose = function(tab, CardRow) {
	  CardRow.isEdit = false; 	  
	  tab.isEdit = false;
};

$scope.CardRowSubmit = function(isValid, tab, CardRow) {
// надо сделать ее универсальной - не зависящей от типа карточки  
  
  if (isValid) { 
      tab.isEdit = false;
//      CardRow.PropEntRowValue = tab.tmpRow.PropEntRowValue;
  		CardRow.PropValue = tab.tmpRow.PropValue;  
  		CardRow.PropComment = tab.tmpRow.PropComment;
  		if (tab.tmpRow.BA !== undefined) {
  		  CardRow.BA = tab.tmpRow.BA;    // Bank Account
  		  CardRow.SBA = tab.tmpRow.SBA;  // Sub Bank Account
  		}
/*  		
  		if (item.tmpRow.Adr !== undefined) {
  		  CardRow.PropValue = $scope.Addr.details.formatted_address;    // Bank Account
  		}
*/
//  		след строка не работает - с этим надо разобраться
//    код выше некорректен - надо вызывать ф-ию в качестве параметра этой процедуры, чтобы не копировать тех свойств, которых нет на закладке
//    или просто сделать параметр и внутри этой процедуры case
//    второй способ скорее всего даже и лучше
//      OldRecord = angular.copy(item.tmpRow);  		
  		CardRow.isEdit = false;
			if (CardRow.btAdd !== 0) {
			  CardRow.btAdd = 0;
			  CardRow.btEd = 1;
			  CardRow.btDel = 1;
  		  tab.AddRow.isEdit = false;
  		  tab.rows.push( tab.AddRow );
			}
			alert('запись в БД. ');
  }
};

	// строку с кнопкой добавления всегда передаем через json - так настраиваем права 
	
      $scope.glp = "glyphicon glyphicon-tags";    // ЭТО ПРОСТО ДЛЯ ПРИМЕРА - ВЫДЕЛИТЬ В ДРУГОЙ ФАЙЛ

//////////////////////////////////////
$scope.OpenedCards = [];

$scope.CardEditOff = function(card) {
	  card.isEdit = false;
};

$scope.CardEditOn = function(card) {
	 card.isEdit = true;
	 alert('отправляем запрос на сервер - чтобы блокировать изменения карточки ' +
              ' также должны обновить все данные на форме, чтобы юзер видел свежую версию  ' + 
              'ответ может быть неуспешным - если др пользователь карточку уже заблокировал перед этим'
	      );
};  

$scope.CardExportSCV= function(card) {
    alert ('Пока не реализовано ' + card.name);
};

$scope.CardClose = function(row){
//  var card = {};
//  row.card = angular.copy(card);
//    row.card = {};
//  row.card.splice(row.card) ;

  row.detail = false; 
  $scope.OpenedCards.splice(row,1);   // это для отдельной закладки
};

$scope.CardLoad = function(row){
// ф-ия написана как заглушка , чтобы не делать лишних джснов
// на самом деле должна подгружать данные из БД, но пока работаю без БД, чтобы меньше делать json-ов

  $http.get('data/card.prtn.json').success(function(response) {
	 var SoursesPrtn = response; 

    SoursesPrtn.ShortName = row.ShortName;
    SoursesPrtn.JP = row.JP;
    SoursesPrtn.id = row.id;
    SoursesPrtn.login = row.login;
    
    SoursesPrtn.status = row.status; 
	    
    row.card = angular.copy(SoursesPrtn);   // для показа карточек в журнале
    row.detail = true;
    $scope.OpenedCards.push( row );         // для показа карточек на отдельной закладке
    });
};

$scope.CardCopy = function(row){
  alert ('Пока не реализовано ' + row.name);
};

$scope.CardHide = function(row){
  alert ('Пока не реализовано ' + row.name);
};
// невидимость закладок и подзакладок будет определяться 2-мя специальными массивами,
// возвращаемыми из таблиц БД
      

// autocomplete
/*
    $scope.result2 = '';
    $scope.options2 = null;
    $scope.details2 = '';
*/

$scope.Addr = {"options": null, "result" : '', "details": ''};

}

angular
  .module('zb', ['ui.bootstrap', 'Zb.directives', 'ngAutocomplete', 'ngTable'])
  .controller('CardPartnerCtrl',Cardinit);

   
  


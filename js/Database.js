/*METODO DE NOMBRE DE LA CLASE Y CONSTRUCTOR*/
function Database() {
    this._FileJsonEsquema = "{{ site.baseurl}}js/DbSchema.json"
    this._FileJsonData = "{{ site.baseurl}}js/DbData.json"
    this._DataVersion;
    this._DataJson;
    this._NumberOfTables;
    this._DbName;
    this._Schema;
    this._IsOutOfDate    = false;
    this._Conexion       = null;
    this._Database       = null;
    this._IndexedBD      = window.indexedDB || 
                           window.mozIndexedDB || 
                           window.webkitIndexedDB || 
                           window.msIndexedDB;
    this._IDBTransaction = window.IDBTransaction || 
                           window.webkitIDBTransaction || 
                           window.msIDBTransaction;
    this._IDBKeyRange    = window.IDBKeyRange || 
                           window.webkitIDBKeyRange || 
                           window.msIDBKeyRange;
    if (!this._IndexedBD) {
        this.ShowAlert("Base de datos local no soportada." ,'Error.', 'error');
    }
}
Database.prototype.ShowAlert = function(msg, header, type, _cb,_opt){
    this.HideSpinner();
    type = (type != null && typeof type != 'undefined') ? ((type=='danger') ? 'error' : type  ): 'info';
    header = (header != null && typeof header != 'undefined') ? header : '<span class="glyphicon glyphicon-remove-sign"></span> Alerta';
    msg = (msg != null && typeof msg != 'undefined') ? msg : 'Espere un Momento...';

    var btn = 'btn '
    switch(type){
        case 'error'    : btn += "btn-danger"; break;
        case 'danger'   : btn += "btn-danger"; break;
        case 'question' : btn += "btn-primary"; break;
        case 'info'     : btn += "btn-info"; break;
        case 'warning'  : btn += "btn-warning"; break;
        case 'success'  : btn += "btn-success"; break;
        default         : btn += "btn-default"; type = 'info'; break;
    }

    var options = {
        title: header,
        type: type,
        html: msg,
        showCloseButton: false,
        allowOutsideClick: false,
        confirmButtonClass: btn,
        buttonsStyling: false,
        confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
    };


    if(_opt != null && typeof _opt != 'undefined'){
        $.each(_opt, function(key, value){   
            options[key] = value;
        })    
    }

    swal(options).then(_cb);
}
Database.prototype.ShowSpinner = function (msg){
    
    if( $('body').find('.loaderwait').length == 0){
        $('body').prepend('<div class="loaderwait" style="display:none;"><div class="spiner_contend"><div class="loader"></div><p id="spinnerText" class="text-center oxigen">Espere un momento.</p></div></div>');
    }
    if(typeof msg != null && typeof msg != 'undefined')
    {
        $(".loaderwait #spinnerText").html(msg);
    }
    else
    {
        $(".loaderwait #spinnerText").html("Espere un Momento...");
    }
    if( !$(".loaderwait").is(":visible") ){
        //$('.loaderwait').removeClass("hidden");
        //$('.loaderwait').show({'easing': 'linear'});
        $('.loaderwait').css({
            "opacity":"0",
            "display":"block",
        }).show().animate({opacity:1}, 400);
        $('body').css('cursor', 'wait');//ponemos el cursor en icono de LOADING, para fachosear :p
    }
}
Database.prototype.HideSpinner = function (){
    $('body').css('cursor', 'default');//devolvemos el cursor a su esatdo normal
    $('.loaderwait').animate({opacity:0}, 200, function() {
        $('.loaderwait').css({
        "display":"none",
        });
    });
}
Database.prototype.CallBack = function(_CallBack,_Parametro,_Estado){
    var getType = {};
    if(_CallBack == undefined){}
    else if(_CallBack && getType.toString.call(_CallBack) === '[object Function]'){_CallBack(_Parametro,_Estado);}
    else{window[_CallBack](_Parametro,_Estado);}
}

Database.prototype.Open =  function(){
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    if(filename != 'Tab.php'){
        this.ShowSpinner('Consultando Información...');
    }
    var _this = this;
    return $.getJSON( this._FileJsonEsquema)
     .done((_Json)=> {
        this._DataVersion   = _Json.DataVersion;
        this._DbName        = _Json.DbName;
        this._Schema        = _Json;
        this._Conexion      = this._IndexedBD.open(this._DbName, _Json.Version);
        this._Conexion.onsuccess = function (event) {
            
            if(localStorage.getItem("DB_JSON_Version") != _Json.Version){
                this._IsOutOfDate = true;
                window.localStorage.setItem("DB_JSON_Version_TMP", _Json.Version);
            }

            if(localStorage.getItem("DB_JSON_DataVersion") != _Json.DataVersion){
                this._IsOutOfDate = true;
            }
            this._Database = this._Conexion.result;
            if(this._IsOutOfDate==true){
                this.ImportDatabase();
                this._IsOutOfDate=false;
            }
            else{
                this.HideSpinner();
            }
        }.bind(this);
        this._Conexion.onerror = function (event)  {
            var dom_error = '<div class="text-right"><a role="button" data-toggle="collapse" href="#collapseDetalleError" aria-expanded="false" aria-controls="collapseDetalleError"><em>detalles</em></a></div>';
            dom_error += '<div class="collapse" id="collapseDetalleError"><div class="well dom_error">';
            dom_error +=  event.srcElement.error.message;
            dom_error += '</div></div>';
            this.ShowAlert("Error en la base de datos local." + dom_error, 'Error.', 'error');
            this.HideSpinner();

        }.bind(this);
        this._Conexion.onupgradeneeded = function(_event) {
            this.CreateSchema(_event);
            this._IsOutOfDate=true;
        }.bind(this);
    })
    .fail(function(data) {
        this.ShowAlert("Error al cargar esquema de la Base de datos Local." ,'Error.', 'error');
        this.HideSpinner();
      }.bind(this));    
}

Database.prototype.CreateSchema =  function (_event){
    this.ShowSpinner('Actualizando Informacion...');
    var TableNames= _event.target.result.objectStoreNames;
    for (var i = 0;  i < TableNames.length ; i++) {
        //Eliminamos todas las tablas almacenadas
        this.DeleteTable(_event,TableNames[i]);
    }
    for (var i = 0, len = this._Schema['Tabla'].length; i < len; i++) {
        this.CreateTable(_event,this._Schema['Tabla'][i]);
    }
}
Database.prototype.ImportJson = function (_tableNumber,_rowNumber){
    
    var request = this._Database.transaction(this._DataJson['Tabla'][_tableNumber].Name, "readwrite").objectStore( this._DataJson['Tabla'][_tableNumber].Name ).add(  this._DataJson['Tabla'][_tableNumber]['Data'][_rowNumber] );                             
    request.onsuccess = (event)=> {
        var item = parseInt(localStorage.getItem("DB_JSON_Item"), 10);
        var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);
        item = item + 1;
        if(item < rows){
            var p = parseInt((item * 100) / rows, 10);

            $("h3.db-loader").text(p+"%");
            window.localStorage.setItem("DB_JSON_Item", item);   
            if(item == rows){
                this.HideSpinner();
                localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            }
            else{
                if( (_rowNumber + 1) == parseInt(localStorage.getItem("DB_JSON_Lenght_"+this._DataJson['Tabla'][_tableNumber].Name), 10) ){
                    _rowNumber = 0;
                    _tableNumber++;
                }
                 else{
                    _rowNumber++;
                }
                if(_tableNumber <= this._NumberOfTables){
                    this.ImportJson(_tableNumber,_rowNumber);
                }
            }
        }
        else{
            this.HideSpinner();
            localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            localStorage.setItem("DB_JSON_DataVersion", this._DataVersion);
            
        }
    };     
    request.onerror = (event)=> {
        var item = parseInt(localStorage.getItem("DB_JSON_Item"), 10);
        var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);
        item = item + 1;
        if(item < rows){
            
            var p = parseInt((item * 100) / rows, 10);

            $("h3.db-loader").text(p+"%");
            window.localStorage.setItem("DB_JSON_Item", item);   
            if(item == rows){
                this.HideSpinner();
                localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            }
            else{
                if( (_rowNumber + 1) == parseInt(localStorage.getItem("DB_JSON_Lenght_"+this._DataJson['Tabla'][_tableNumber].Name), 10) ){
                    _rowNumber = 0;
                    _tableNumber++;
                }
                else{
                    _rowNumber++;
                }
                if(_tableNumber <= this._NumberOfTables){
                    this.ImportJson(_tableNumber,_rowNumber);
                }
            }
        }
        else{
            this.HideSpinner();
            localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            localStorage.setItem("DB_JSON_DataVersion", this._DataVersion);
 
        }
    }
}

Database.prototype.ImportDatabase = function (){
    $.getJSON( this._FileJsonData)
     .done((_Json)=> {
        this.ShowSpinner('Cargando Informacion...<br><b class="text-danger">Por favor no cierre o recargue la página hasta que este proceso haya terminado.</b><div style="position:relative"><h3 class="text-center db-loader" style="position:absolute;top:-130px;left: 50%;margin-left: -20px;">0%</h3></div>');
        this._DataJson       = _Json;
        this._NumberOfTables = _Json['Tabla'].length;
        window.localStorage.setItem("DB_JSON_Lenght", 0);
        window.localStorage.setItem("DB_JSON_Item", 1);
        for (var i = 0; i < _Json['Tabla'].length; i++) {
            var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);
            var trows = parseInt(_Json['Tabla'][i]['Data'].length, 10);
            rows = rows + trows;
            window.localStorage.setItem("DB_JSON_Lenght", rows);
            window.localStorage.setItem("DB_JSON_Lenght_"+_Json['Tabla'][i].Name,  _Json['Tabla'][i]['Data'].length);  
        }
        this.ImportJson(0,0);


    })
    .fail(function(data) {
        this.ShowAlert("No se encuentran la fuente de la Base de datos Local." ,'Error.', 'error');
    }.bind(this));
}

Database.prototype.ImportDbData =  function (){
    var _this = this;
    $.getJSON( "/Module/Core/Json/DbData.json")
     .done(function(_Json) {
        this.ShowSpinner('Cargando Informacion...<br><b class="text-danger">Por favor no cierre o recargue la pagina hasta que este proceso haya terminado.</b><div style="position:relative"><h3 class="text-center db-loader" style="position:absolute;top:-130px;left: 50%;margin-left: -20px;">0%</h3></div>');
        window.localStorage.setItem("DB_JSON_Lenght", 0);
        window.localStorage.setItem("DB_JSON_Item", 0);

        for (var i = 0; i < _Json['Tabla'].length; i++) {
            var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);
            var trows = parseInt(_Json['Tabla'][i]['Data'].length, 10);
            

            rows = rows + trows;
            window.localStorage.setItem("DB_JSON_Lenght", rows);
            window.localStorage.setItem("DB_JSON_Lenght_"+_Json['Tabla'][i].Name,  _Json['Tabla'][i]['Data'].length);

            for (var index = 0; index < _Json['Tabla'][i]['Data'].length; index++) {
                _this.Save(_Json['Tabla'][i].Name,_Json['Tabla'][i]['Data'][index]);
            }   
        }
        

    })
    .fail(function(data) {
        this.ShowAlert("No se encuentran la fuente de la Base de datos Local." ,'Error.', 'error');
    });
}

Database.prototype.Save = function (_tableName,_data/*,_CallBack*/) {
    
    var request = this._Database.transaction(_tableName, "readwrite").objectStore( _tableName ).add(  _data );                             
    request.onsuccess = function(event) {
        var item = parseInt(localStorage.getItem("DB_JSON_Item"), 10);
        var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);

        if(item < rows){
            item = item + 1;
            var p = parseInt((item * 100) / rows, 10);

            $("h3.db-loader").text(p+"%");
            window.localStorage.setItem("DB_JSON_Item", item);   
            if(p == 100){
                this.HideSpinner();
                localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            }
        }
        else{
            this.HideSpinner();
            localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
        }
    };     
    request.onerror = function(event) {


        var item = parseInt(localStorage.getItem("DB_JSON_Item"), 10);
        var rows = parseInt(localStorage.getItem("DB_JSON_Lenght"), 10);

        if(item < rows){
            item = item + 1;
            var p = parseInt((item * 100) / rows, 10);

            $("h3.db-loader").text(p+"%");
            window.localStorage.setItem("DB_JSON_Item", item);   
            if(p == 100){
                this.HideSpinner();
                localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
            }
        }
        else{
            this.HideSpinner();
            localStorage.setItem("DB_JSON_Version", localStorage.getItem("DB_JSON_Version_TMP"));
        }
    }

}

Database.prototype.GetAll =  function(_tableName,_CallBack) {
    if(this._Database==null){
        this.ShowAlert("No se ha establecido conexion." ,'Error.', 'error');
        return false;
    }
    var _this = this;
    var data  = this._Database.transaction([_tableName], "readonly");
    var object = data.objectStore(_tableName);
    var elements = [];
    object.openCursor().onsuccess = function (e) {
        var result = e.target.result;
        if (result === null) {return;}
        elements.push(result.value);
        result.continue();
    };
    data.oncomplete = function () {
        /*for (var i = 0; i < elements.length; i++) {
        }*/
        _this.CallBack(_CallBack,elements,true);
    };
}

Database.prototype.GetByKey =  function(_tableName,_key) {
    if(this._Database==null){
        this.ShowAlert("No se ha establecido conexion." ,'Error.', 'error');
        return false;
    }
    var data = this._Database.transaction([_tableName], "readonly");
    // create an object store on the transaction
    var objectStore = data.objectStore(_tableName);
    // clear all the data out of the object store
    var objectStoreRequest = objectStore.get(_key);
    objectStoreRequest.onsuccess = function(event) {
    };
}
 
Database.prototype.GetByValue =  function(_tableName,_column,_value,_CallBack) {
    if( this._Database == null ){
        this.ShowAlert( "No se ha establecido conexion." ,'Error.', 'error' );
        return false;
    }
    var _this    = this;
    var data     = this._Database.transaction([_tableName], "readonly");
    var object   = data.objectStore(_tableName).index(_column);
    var request  = null;
    request      = object.openCursor(this._IDBKeyRange.only(_value));
    var elements = [];
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) { 
            elements.push(cursor.value);
            cursor.continue();
        } else {
            _this.CallBack(_CallBack,elements,true);
        }
    };
}

Database.prototype.DeleteByValue =  function(_TableName,_Value,_CallBack){
    this.Open(_TableName,function(_Estado){
        if(_Estado === true){
            var active = this._Conexion.result;
            var data = active.transaction([_TableName], "readwrite");
            var object = data.objectStore(_TableName);
            var request = object.delete(_Value);
            request.onsuccess = function(event) {
              this.CallBack(_CallBack,event,true);
            };
        }
    });
}
Database.prototype.DeleteAll = function (_TableName,_CallBack) {
    this.Open(_TableName,function(_Estado){
        if(_Estado === true){
            var transaction = this._Conexion.result.transaction([_TableName], "readwrite");
            transaction.onerror = function(event) {
                this.CallBack(_CallBack,event,false);
            };
            var objectStore = transaction.objectStore(_TableName);
            var objectStoreRequest = objectStore.clear();
            objectStoreRequest.onsuccess = function(event) {
                this.CallBack(_CallBack,event,true);
            };
        }
    });
};

Database.prototype.CreateTable = function(_event, _schema){
    var db = _event.target.result;
    var objectStore = this.createObjectStore(_schema['Name'], { keyPath: _schema['Index'] });
    for (var i = 0, len = _schema['Schema'].length; i < len; i++) {
        objectStore.createIndex(_schema['Schema'][i]['Column'],_schema['Schema'][i]['Column'], { unique : _schema['Schema'][i]['Unique'] });
    }
};

Database.prototype.DeleteTable = function(_event, _table){
    var db = _event.target.result;
    this.deleteObjectStore(_table);
};

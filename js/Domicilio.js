
function Domicilio(_wraper,_name = 'Domicilio',_level = 'NumeroInterior') {
    this._Db = new Database();
    this._Db.Open();
    setTimeout(()=>{
        this._Wrapper    = _wraper;
        var Render = $(this._Wrapper).hasClass("DomRender");
         //propiedades del domicilio
        this.Id              = Render == true ? $( this._Wrapper + " .IdDomicilio").val()    : null;
        this.IdCatPais       = Render == true ? $( this._Wrapper + " .IdCatPais").val()      : null;
        this.IdCatEstado     = Render == true ? $( this._Wrapper + " .IdCatEstado").val()    : null;
        this.IdCatMunicipio  = Render == true ? $( this._Wrapper + " .IdCatMunicipio").val() : null;
        this.IdCatLocalidad  = Render == true ? $( this._Wrapper + " .IdCatLocalidad").val() : null;
        this.IdCatColonia    = Render == true ? $( this._Wrapper + " .IdCatColonia").val()   : null;
        this.IdCatVialidad   = Render == true ? $( this._Wrapper + " .IdCatVialidad").val()  : null;
        this.Calle           = Render == true ? $( this._Wrapper + " .Calle").val()          : null;
        this.NumeroExterior  = Render == true ? $( this._Wrapper + " .NumeroExterior").val() : null;
        this.NumeroInterior  = Render == true ? $( this._Wrapper + " .NumeroInterior").val() : null;
        this.CodigoPostal    = Render == true ? $( this._Wrapper + " .CodigoPostal").val()   : null;

        this.IdDef              = Render == true ? $( this._Wrapper + " .IdDomicilio").val()    : null;
        this.IdCatPaisDef       = Render == true ? $( this._Wrapper + " .IdCatPais").val()      : null;
        this.IdCatEstadoDef     = Render == true ? $( this._Wrapper + " .IdCatEstado").val()    : null;
        this.IdCatMunicipioDef  = Render == true ? $( this._Wrapper + " .IdCatMunicipio").val() : null;
        this.IdCatLocalidadDef  = Render == true ? $( this._Wrapper + " .IdCatLocalidad").val() : null;
        this.IdCatColoniaDef    = Render == true ? $( this._Wrapper + " .IdCatColonia").val()   : null;
        this.IdCatVialidadDef   = Render == true ? $( this._Wrapper + " .IdCatVialidad").val()  : null;
        this.CalleDef           = Render == true ? $( this._Wrapper + " .Calle").val()          : null;
        this.NumeroExteriorDef  = Render == true ? $( this._Wrapper + " .NumeroExterior").val() : null;
        this.NumeroInteriorDef  = Render == true ? $( this._Wrapper + " .NumeroInterior").val() : null;
        this.CodigoPostalDef    = Render == true ? $( this._Wrapper + " .CodigoPostal").val()   : null;

        this._IsSet          = false;
        if (Render ==  true){
            this._IsSet = true;

            $(this._Wrapper).empty();
            let $SPais           = $('<div class="ContPais"></div>').addClass('col-sm-3 form-group').append(`<label>Pais:</label>`).append(`<select class="form-control IdCatPais" Column='IdCatPais'  name="${_name}[IdCatPais]" ></select>`).append(`<input type="hidden" class="IdDomicilio" Column='IdDomicilio' name="${_name}[Id]" value="0" />`);
            let $SEstado         = $('<div class="ContEstado"></div>').addClass('col-sm-3 form-group').append(`<label>Estado:</label>`).append(`<select class="form-control IdCatEstado" Column='IdCatEstado'  name="${_name}[IdCatEstado]" ></select>`);
            let $SMunicipio      = $('<div class="ContMunicipio"></div>').addClass('col-sm-3 form-group').append(`<label>Municipio:</label>`).append(`<select class="form-control IdCatMunicipio" Column='IdCatMunicipio'  name="${_name}[IdCatMunicipio]" ></select>`);
            let $SLocalidad      = $('<div class="ContLocalidad"></div>').addClass('col-sm-3 form-group').append(`<label>Localidad:</label>`).append(`<select class="form-control IdCatLocalidad" Column='IdCatLocalidad'  name="${_name}[IdCatLocalidad]" ></select>`);
            let $SColonia        = $('<div class="ContColonia"></div>').addClass('col-sm-6 form-group').append(`<label>Colonia:</label>`).append(`<select class="form-control IdCatColonia" Column='IdCatColonia'  name="${_name}[IdCatColonia]" ></select>`);
            let $SCP             = $('<div class="ContCP"></div>').addClass('col-sm-3 form-group').append(`<label>CP:</label>`).append(`<input type="text" class="form-control CodigoPostal" Column='CodigoPostal'  name="${_name}[CodigoPostal]">`);
            let $SVialidad       = $('<div class="ContVialidad"></div>').addClass('col-sm-3 form-group').append(`<label>Tipo Vialidad:</label>`).append(`<select class="form-control IdCatVialidad" Column='IdCatVialidad'  name="${_name}[IdCatVialidad]" ></select>`);
            let $SCalle          = $('<div class="ContCalle"></div>').addClass('col-sm-6 form-group').append(`<label>Calle:</label>`).append(`<input type="text" class="form-control Calle" Column='Calle'  name="${_name}[Calle]">`);
            let $SNumeroExterior = $('<div class="ContNumeroExterior"></div>').addClass('col-sm-3 form-group').append(`<label># Exterior:</label>`).append(`<input type="text" class="form-control NumeroExterior" Column='NumeroExterior'  name="${_name}[NumeroExterior]">`);
            let $SNumeroInterior = $('<div class="ContNumeroInterior"></div>').addClass('col-sm-3 form-group').append(`<label># Interior:</label>`).append(`<input type="text" class="form-control NumeroInterior" Column='NumeroInterior'  name="${_name}[NumeroInterior]">`);
            $( this._Wrapper).append($SPais).append($SEstado).append($SMunicipio).append($SLocalidad).append($SColonia).append($SCP).append($SVialidad).append($SCalle).append($SNumeroExterior).append($SNumeroInterior);
            switch(_level){
                case 'Pais':
                    $( this._Wrapper + " .ContEstado").css('display','none');
                    $( this._Wrapper + " .ContMunicipio").css('display','none');
                    $( this._Wrapper + " .ContLocalidad").css('display','none');
                    $( this._Wrapper + " .ContColonia").css('display','none');
                    $( this._Wrapper + " .ContCP").css('display','none');
                    $( this._Wrapper + " .ContVialidad").css('display','none');
                    $( this._Wrapper + " .ContCalle").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                break;
                case 'Estado':
                    $( this._Wrapper + " .ContMunicipio").css('display','none');
                    $( this._Wrapper + " .ContLocalidad").css('display','none');
                    $( this._Wrapper + " .ContColonia").css('display','none');
                    $( this._Wrapper + " .ContCP").css('display','none');
                    $( this._Wrapper + " .ContVialidad").css('display','none');
                    $( this._Wrapper + " .ContCalle").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                break;
                case 'Municipio':
                    $( this._Wrapper + " .ContLocalidad").css('display','none');
                    $( this._Wrapper + " .ContColonia").css('display','none');
                    $( this._Wrapper + " .ContCP").css('display','none');
                    $( this._Wrapper + " .ContVialidad").css('display','none');
                    $( this._Wrapper + " .ContCalle").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                break;
                case 'Localidad':
                    $( this._Wrapper + " .ContColonia").css('display','none');
                    $( this._Wrapper + " .ContCP").css('display','none');
                    $( this._Wrapper + " .ContVialidad").css('display','none');
                    $( this._Wrapper + " .ContCalle").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                break;
                case 'Colonia':
                    $( this._Wrapper + " .ContVialidad").css('display','none');
                    $( this._Wrapper + " .ContCalle").css('display','none');
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                break;
                case 'Calle':
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                    $( this._Wrapper + " .ContNumeroExterior").css('display','none');
                break;
                case 'NumeroExterior':
                    $( this._Wrapper + " .ContNumeroInterior").css('display','none');
                break;
              
            }
        }
        //selectores e inputs
        this._Pais           = $( this._Wrapper + " .IdCatPais");
        this._Estado         = $( this._Wrapper + " .IdCatEstado");
        this._Municipio      = $( this._Wrapper + " .IdCatMunicipio");
        this._Localidad      = $( this._Wrapper + " .IdCatLocalidad");
        this._Colonia        = $( this._Wrapper + " .IdCatColonia");
        this._Vialidad       = $( this._Wrapper + " .IdCatVialidad");
        this._Calle          = $( this._Wrapper + " .Calle");
        this._NumeroInterior = $( this._Wrapper + " .NumeroInterior");
        this._NumeroExterior = $( this._Wrapper + " .NumeroExterior");
        this._CodigoPostal   = $( this._Wrapper + " .CodigoPostal");
        this._IdDomicilio    = $( this._Wrapper + " .IdDomicilio");

        this._Vialidad.select2({
            placeholder: "Seleccione",
            language: "es",
            allowClear: true
        });
        //establecemos mascara a CodigoPostal
        //this._CodigoPostal .mask("00000");
        //Inicializa,ps Select2
        this._Pais.select2({
            placeholder: "Seleccione",
            language: "es",
            allowClear: true
        });

        this._Pais.prop("disabled", true);
        this._Estado.select2({
            placeholder: "Seleccione",
            language: "es"
        });
        this._Estado.prop("disabled", true);
        this._Municipio.select2({
            placeholder: "Seleccione",
            language: "es"
        });
        this._Municipio.prop("disabled", true);
        this._Localidad.select2({
            placeholder: "Seleccione",
            language: "es"
        });
        this._Localidad.prop("disabled", true);
        this._Colonia.select2({
            placeholder: "Seleccione",
            language: "es"
        });
        this._Colonia.prop("disabled", true);

        //eventos
        this._Pais.on("change", function (e) {

            if(e.target.value.length==0){
                this._IsSet = false;
            }

            this.IdCatPais      = e.target.value;
            if(this._IsSet ==  false){
                this.IdCatEstado    = null;
                this.IdCatMunicipio = null;
                this.IdCatLocalidad = null;
                this._Municipio.prop("disabled", true);
                this._Localidad.prop("disabled", true);
                this._Colonia.prop("disabled", true);
                this._Municipio.select2("val", true);
                this._Localidad.select2("val", true);
                this._Colonia.select2("val", true);
            }
            if(e.target.value.length!=0){

                this.SetSelectCatEstado();
            }
            else{
                this._Estado.select2("val", true);
                this._Estado.prop("disabled", true);
            }
        }.bind(this));
        this._Estado.on("change", function (e) {

            if(e.target.value.length==0){
                this._IsSet = false;
            }
            this.IdCatEstado    = e.target.value;
            if(this._IsSet ==  false){
                this.IdCatMunicipio = null;
                this.IdCatLocalidad = null;
                this._Localidad.prop("disabled", true);
                this._Colonia.prop("disabled", true);
                this._Localidad.select2("val", true);
                this._Colonia.select2("val", true);
            }
            if(e.target.value.length!=0){
                this.SetSelectCatMunicipio();
            }
            else{
                this._Municipio.select2("val", true);
                this._Municipio.prop("disabled", true);
            }
        }.bind(this));
        this._Municipio.on("change", function (e) {

            if(e.target.value.length==0){
                this._IsSet = false;
            }
            this.IdCatMunicipio = e.target.value;
            if(this._IsSet ==  false){
                this.IdCatLocalidad = null;
                this._Colonia.prop("disabled", true);
                this._Colonia.select2("val", true);
            }
            if(e.target.value.length!=0){

              this.SetSelectCatLocalidad();
            }
            else{
              this._Localidad.select2("val", true);
              this._Localidad.prop("disabled", true);
            }
        }.bind(this));
        this._Localidad.on("change", function (e) {

            if(e.target.value.length==0){
              this._IsSet = false;
            }
            this.IdCatLocalidad = e.target.value;
            if(this._IsSet ==  false){
            }
            if(e.target.value.length!=0){

              this.SetSelectCatColonia();
            }
            else{
              this._Colonia.select2("val", true);
              this._Colonia.prop("disabled", true);
            }
        }.bind(this));
        this._Colonia.on("change", function (e) {

            if(e.target.value.length==0){
              this._IsSet = false;
            }
            if(this._IsSet ==  false){
              this.IdCatColonia = e.target.value;
            }
        }.bind(this));
        if(Render)
            this.Set(this.Id ,this.IdCatPais, this.IdCatEstado, this.IdCatMunicipio, this.IdCatLocalidad, this.IdCatColonia,this.IdCatVialidad ,this.Calle, this.NumeroInterior,this.NumeroExterior,this.CodigoPostal);
    },500);
}
Domicilio.prototype.Reset = function (){
 this.Set(this.IdDef ,this.IdCatPaisDef, this.IdCatEstadoDef, this.IdCatMunicipioDef, this.IdCatLocalidadDef, this.IdCatColoniaDef,this.IdCatVialidadDef ,this.CalleDef, this.NumeroInteriorDef,this.NumeroExteriorDef,this.CodigoPostalDef);   
}

Domicilio.prototype.SetSelectCatPais = function(){
    this._Db.GetAll("CORE_CatPais",function(_data){


        this.SetSelect(this._Pais,_data,this.IdCatPais);
    }.bind(this));

}

Domicilio.prototype.SetSelectCatVialidad = function(){
    this._Db.GetAll("CORE_CatVialidad",function(_data){
        this.SetSelect(this._Vialidad,_data,this.IdCatVialidad);
    }.bind(this));

}

Domicilio.prototype.SetSelectCatEstado = function(){
    this._Db.GetByValue("CORE_CatEstado","IdCatPais",this.IdCatPais,function(_data){

        this.SetSelect(this._Estado,_data,this.IdCatEstado);
    }.bind(this));
}

Domicilio.prototype.SetSelectCatMunicipio = function(){
    var Key    = this.IdCatPais + "-" + this.IdCatEstado;
    this._Db.GetByValue("CORE_CatMunicipio","IdCatEstado",Key,function(_data){
        this.SetSelect(this._Municipio,_data,this.IdCatMunicipio);
    }.bind(this));
}

Domicilio.prototype.SetSelectCatLocalidad = function(){
    var Key    = this.IdCatPais + "-" + this.IdCatEstado + "-" + this.IdCatMunicipio;
    this._Db.GetByValue("CORE_CatLocalidad","IdCatMunicipio",Key,function(_data){
        this.SetSelect(this._Localidad,_data,this.IdCatLocalidad);
    }.bind(this));
}

Domicilio.prototype.SetSelectCatColonia = function(){
    var Key    = this.IdCatPais + "-" + this.IdCatEstado + "-" + this.IdCatMunicipio + "-" + this.IdCatLocalidad;
    this._Db.GetByValue("CORE_CatColonia","IdCatLocalidad",Key,function(_data){
        this.SetSelect(this._Colonia,_data,this.IdCatColonia);
    }.bind(this));
}

Domicilio.prototype.SetSelect = function(_selector,_data,_id){


    _selector.empty();
    _selector.select2({
        data: _data,
        placeholder: "Seleccione",
        language: "es",
        allowClear :true,
        sorter: function(data) {
            return data.sort(function (a, b) {
                if (a.text > b.text) {
                    return 1;
                }
                if (a.text < b.text) {
                    return -1;
                }
                return 0;
            });
        }
    });
    if(_data.length == 0){
        _selector.prop("disabled", true);
    }
    else{
        _selector.prop("disabled", false);
    }
    if(_id!=null){
        _selector.select2("val",[_id]);
    }
    else{
        _selector.select2("val",true);
    }
}

Domicilio.prototype.Set = function(_idDomicilio ,_idCatPais, _idCatEstado, _idCatMunicipio, _idCatLocalidad, _idCatColonia,_idCatVialidad ,_calle, _numeroInterior,_numeroExterior,_codigoPostal ){
    //var this = this;
    this.IdCatPais      = _idCatPais;
    this.IdCatEstado    = _idCatEstado;
    this.IdCatMunicipio = _idCatMunicipio;
    this.IdCatLocalidad = _idCatLocalidad;
    this.IdCatColonia   = _idCatColonia;
    this.IdCatVialidad  = _idCatVialidad;
    this._IsSet          = true;
    this._Calle.val(_calle);
    this._NumeroInterior.val(_numeroInterior);
    this._Vialidad.select2("val",[_idCatVialidad]);
    this._NumeroExterior.val(_numeroExterior);
    this._CodigoPostal.val(_codigoPostal);
    this._IdDomicilio.val(_idDomicilio);
    this.SetSelectCatPais();
    this.SetSelectCatVialidad();

}

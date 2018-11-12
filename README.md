# Georeferenia-INEGI
Componente para la selección de un domicilio en cascada en base a los catalogos de INEGI, utilizando base de datos local 

let DomicilioParticular =  new Domicilio("#ContenedorDomicilio");

ContenedorDomicilio debe tener la clase DomRender, para que automaticamente genere inputs dentro de el elemento.

Si hay una direccion que desees desplegar al instanciar puedes agregar elementos input dentro de el contendor con las siguientes clases:
IdDomicilio
IdCatPais
IdCatEstado
IdCatMunicipio
IdCatLocalidad
IdCatColonia
IdCatVialidad
Calle
NumeroExterior
NumeroInterior
CodigoPostal

Tomara el valor de cada uno para construir con valores preseleccionados.




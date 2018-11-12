# Georeferenia-INEGI
Componente para la selección de un domicilio en cascada en base a los catalogos de INEGI, utilizando base de datos local 

En el primer uso se instalara la base de datos local para su uso, paciencia!
<br><br>
 ```
let DomicilioParticular =  new Domicilio("#ContenedorDomicilio");
 ```
<br><br>
ContenedorDomicilio debe tener la clase DomRender, para que automaticamente genere inputs dentro de el elemento.
<br><br>
Si hay una direccion que desees desplegar al instanciar puedes agregar elementos input dentro de el contendor con las siguientes clases:
<br>IdDomicilio
<br>IdCatPais
<br>IdCatEstado
<br>IdCatMunicipio
<br>IdCatLocalidad
<br>IdCatColonia
<br>IdCatVialidad
<br>Calle
<br>NumeroExterior
<br>NumeroInterior
<br>CodigoPostal

<br>Tomara el valor de cada uno para construir con valores preseleccionados.

TODO:Documentacion :3



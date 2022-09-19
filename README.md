  # Code challenge para aspirantes full stack javascript TODO1

  El objetivo del presente repositorio es para validar los conocimientos del aspirante mediante una prueba progresiva en cuanto dificultad se refiere.

  # Importante
  Por favor leer primero todo el documento antes de empezar la prueba, la prueba debe ser completada en el máximo de 2 días una vez iniciada.

  Para empezar el ejercicio, por favor hacer un clón del repositorio.

  La entrega del ejercicio resuelto debe ser comunicado a su reclutador o en su defecto al correo ssanchez@todo1.com con el enlace al repositorio público del candidato o adjuntar el código comprimido en zip.
  ## Objetivo técnico
  ![test_tecnico](https://github.com/chadsfatherlali/rest-api-ui/blob/master/public/test.png)

  El presente ejercicio tiene como objetivo técnico poner en práctica un CRUD (lectura, escritura, modificación y borrado) de datos, para lo cual se necesita resolver los siguientes enunciados:
  ### 1.-
  El formulario 1 consta de 2 inputs (name, lastName) y un botón "Siguiente" el cual debería enviar al usuario al paso 2.
  ### 2.-
  El formulario 2 consta de 3 inputs (email, phoneNumber, cc) y 2 botones uno "Anterior" el cual le debe permitir al usuario regresar al formulario 1 en caso de querer modificar los valores ingresados en este, el botón "Enviar" debe permitir al usuario insertar en la base de datos los datos del usuario así generando un registro nuevo, una vez con la confirmación de la API del registro nuevo el formulario debe limpiarse y volver al paso 1, listo para el ingreso de un nuevo usuario.
  ### 3.-
  Cuando un usuario nuevo es ingresado al consumir la API este se debe mostrar inmediatamente en la tabla en la parte derecha, no siendo válido forzar la recarga del navegador (window.location.reload).
  ### 4.-
  En la tabla se debe añadir 2 botones a cada fila uno de edición el cual permitirá al usuario cambiar cualquier propiedad nombre, email, teléfono, etc..., el segundo botón de borrado debe eliminar el registro de la tabla, para ambos casos tanto en la edición y el borrado una vez obtenido la respuesta correcta de la API los cambios se deben ver reflejados inmediatamente en la tabla, no siendo válido forzar la recarga del navegador (window.location.reload).
  ### 5.-
  La tabla debe llevar páginado.
  ## Puntos a tomar en cuenta
  ### 1.-
  El ejercicio esta desarrollado con https://mui.com/, siendo este el framework UX usado por la empresa, por tanto es importante que la resolución del test sea con el uso de este framework y sus componentes, el candidato tiene la potestad de usar otras librerías que ayuden a completar el ejercicio siendo librerías para vallidación de campos, peticiones a servidor, manejo de estados de la aplicación, etc... 
  ### 2.-
  La edición del usuario esta sujeta a la experiencia que el candidato le pueda dar, siendo que se haga en el propio formulario o usando cualquier otra experiencia de usuario como puede ser un modal, una nueva página, etc...
  ### 3.-
  Indicadores, al ser un desarrollo front end en todo momento se debe indicar al usuario el estado de sus acciones es decir, si se consume un API mostrar un loader para indicar que se esta haciendo algo, si es correcto la petición hacia la API mostrar una alerta indicando que la operación ha sido satisfactoria, si en la petición la API ha sufrido un error se debe indicar un alerta de error.
  ### 4.-
  Validación de los campos de entrada del formulario, se dará mucho valor buenas prácticas de validación de datos, caracteres no válidos, espacios en blanco, campos que solo admitan números, validación del formato del correo, etc...
  ### 5.-
  Se adjunta la colección de la API para que el candidato pueda explorar la API de usuarios mediante https://www.postman.com/ aplicación que la pueden usar gratuitamente, aquí se puede ver un video de como importar el entorno y la colección de la API https://www.youtube.com/watch?v=cjwM9EDkIks:

  [Colección de APIS](https://raw.githubusercontent.com/chadsfatherlali/rest-api-ui/master/postman/api-rest.postman_collection.json) | [Entorno de APIS](https://raw.githubusercontent.com/chadsfatherlali/rest-api-ui/master/postman/api-rest.postman_environment.json)

  ### 6.-
  Cualquier duda sobre el ejercicio, por favor remitirla a Santiago Sánchez ssanchez@todo1.com para su aclaramiento.

  Mucha suerte!!!

  # REST-API-UI FRONTEND 

**Instalar dependencias**

```
 yarn install
```
**Correr Proyecto modo Desarrollo**

```
 yarn start
```
**Correr Proyecto modo Produccion**

``` 
yarn build
```
**Puerto donde se ejecuta el frontend**

```
 http://localhost:3000
```
# Librerias Utilizadas

```
*  dependencies
    "@emotion/react": "^11.8.2",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.10.3", // New
    "@mui/material": "^5.5.1",
    "@mui/styles": "^5.5.1",
    "@reduxjs/toolkit": "^1.8.5", // New
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^12.0.0",
    "@testing-library/user-event": "^13.2.1",
    "axios": "^0.26.1",
    "formik": "^2.2.9", // New
    "prop-types": "^15.8.1", // New
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.0"
```


# Usar docker para development staging production (optional)

Puede usar Docker para mejorar su experiencia de desarrollo. Hay varias configuraciones de docker-compose disponibles en la carpeta [docker](docker) para iniciar los servicios de terceros requeridos.

DEVELOPMENT, para iniciar rest-api-ui en modo desarollo con docker en un contenedor, ejecute:

```
docker-compose -f docker/app-dev.yml up -d
```
**Puerto de ejecuccion : 3100**

STAGING, para iniciar rest-api-ui en modo puesta en escena con docker en un contenedor, ejecute:

```
docker-compose -f docker/app-staging.yml up -d
```
**Puerto de ejecuccion : 3200**

PRODUCTION, para iniciar rest-api-ui en produccion en escena con docker en un contenedor, ejecute:

```
docker-compose -f docker/app-prod.yml up -d
```
**Puerto de ejecuccion : https://restapiui.ml**

Para parar y remover el contenedor, ejecute:

```
docker-compose -f docker/{docker-compose}.yml down
```

También puede dockerizar por completo su aplicación y todos los servicios de los que depende.
Para lograr esto, primero cree una imagen acoplable de su aplicación ejecutando:

```
docker build . -t rest-api-ui:latest
```

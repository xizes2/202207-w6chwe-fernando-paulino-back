[GET] /robots -> devuelve un array con todos los robots de la BD. STATUS: 200

[GET] /robots/:idRobot -> devuelve un robot de la BD por id. STATUS: 200

[POST*] /robots/create -> recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado. STATUS: 201

[PUT*] /robots/update -> recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado. STATUS: 200

[DELETE*] /robots/delete/:idRobot -> elimina de la BD un robot por id y devuelve un objeto con la id. STATUS: 200

Bad request - STATUS: 400
Unauthorized - STATUS: 401
Not Found - STATUS: 404
Conflict - STATUS: 409

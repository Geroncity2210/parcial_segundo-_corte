const axios = require('axios');
const express = require('express');


const app = express();
app.get("/",(req,res) =>{
    res.send("Hola soy Juan Pablo Moreno")

});

//primer punto
app.get("/coin", (req,res) =>{
  res.send('Hola desde coin!!!');
});
//obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {

  try {
    const {coinName} = req.params;//recogemos lo que haya como parametro
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = response.data.data;

    if (data) {
      const precioUSD = data.priceUsd;
      res.send(`El precio en dólares de ${coinName} para el día de hoy es ${precioUSD}`);
    } else {//si no encuentra la moneda

      res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos');
    }
  } catch (error) {
    res.status(500).send('El nombre de la moneda no fue encontrado en la base de datos');
  }
});
//Segundo punto
app.get("/users/:count", (req,res) =>{
  const users = [
    {"apellido": "ACERO GARCIA","nombre": "SAMUEL"},
    {"apellido": "ALJURI MARTINEZ","nombre": "DAREK"},
    {"apellido": "CEPEDA URIBE","nombre": "JUAN FELIPE"},
    {"apellido": "CHAVES PEREZ","nombre": "ANA MARIA"},
    {"apellido": "CRUZ PAVAS","nombre": "CARLOS DAVID"},
    {"apellido": "DIAZ ALGARIN","nombre": "DIEGO NORBERTO"},
    {"apellido": "DIAZ BERNAL","nombre": "JORGE ESTEBAN"},
    {"apellido": "DIAZ VARGAS","nombre": "DAVID ESTEBAN"},
    {"apellido": "FORERO PEÑA","nombre": "JUAN JOSE"},
    {"apellido": "GUTIERREZ DE PIÑERES BARBOSA","nombre": "SANTIAGO"},
    {"apellido": "LOPEZ HUERTAS","nombre": "SAMUEL ESTEBAN"},
    {"apellido": "MEDINA FERNANDEZ","nombre": "MICHAEL STEVEN"},
    {"apellido": "MORENO CARVAJAL","nombre": "KATHERIN JULIANA"},
    {"apellido": "MORENO PATARROYO","nombre": "JUAN PABLO"},
    {"apellido": "MUÑOZ SENDOYA","nombre": "NICOLAS ESTEBAN"},
    {"apellido": "NAVARRO CUY","nombre": "SANTIAGO"},
    {"apellido": "PARRADO MORALES","nombre": "JUAN PABLO"},
    {"apellido": "RAMIREZ CHINCHILLA","nombre": "DANIEL SANTIAGO"},
    {"apellido": "RESTREPO COCA","nombre": "JUAN PABLO"},
    {"apellido": "REYES GONZALEZ","nombre": "GABRIELA"},
    {"apellido": "RODRIGUEZ FALLA","nombre": "JUAN JOSE"},
    {"apellido": "RUIZ TORRES","nombre": "VALENTINA"},
    {"apellido": "SALAS GUTIERREZ","nombre": "MARIANA"},
    {"apellido": "SANCHEZ SANDOVAL","nombre": "SEBASTIAN"},
    {"apellido": "SARMIENTO GUARNIZO","nombre": "JOSUE DAVID"},
    {"apellido": "SOLER PRADO","nombre": "SANTIAGO"},
    {"apellido": "TAMAYO LOPEZ","nombre": "MARIA FERNANDA"},
    {"apellido": "URREA LARA","nombre": "DEIVID NICOLAS"},
    {"apellido": "AZCONA","nombre": "ANDRÉS"}
  ];
  let { count } = req.params;
  count = parseInt(count); // Convertir a entero

  let { sort } = req.query;
  sort = sort ? sort.toUpperCase() : 'ASC'; // Por defecto ASC si no se especifica

  // Verificar si el parámetro count es válido
  if (isNaN(count) || count <= 0 || count > users.length) {
    return res.status(400).send('El parámetro count debe ser un número válido');
  }

  // Verificar si el parámetro sort es válido
  if (sort !== 'ASC' && sort !== 'DESC') {
    return res.status(400).send('El parámetro sort debe ser "ASC" o "DESC"');
  }

  // Ordenar la lista de usuarios según el parámetro sort y devolver los usuarios pedidos
  let sortedUsers = users.slice(); // Copia del arreglo users

  if (sort === 'ASC') {
    sortedUsers.sort((a, b) => a.apellido.localeCompare(b.apellido));
  } else {
    sortedUsers.sort((a, b) => b.apellido.localeCompare(a.apellido));
  }

  const result = sortedUsers.slice(0, count).map(user => ({ nombre: user.nombre, apellido: user.apellido }));
  res.json(result);
});

//tercer punto 
app.post('/users', (req, res) => {

  const { nombre, apellido, correo, ciudad = "Bogotá", país = "Colombia" } = req.body;

  // Comprobar que se proporcionaron los parámetros obligatorios
  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  // "Crear" el usuario
  const usuario = {
    nombre,
    apellido,
    correo,
    ciudad,
    país
  };

  // Retornar el usuario creado como JSON
  res.json(usuario);
  
});

app.listen(3000, () => {
  console.log(`Servidor Express corriendo en puerto 3000`);
});

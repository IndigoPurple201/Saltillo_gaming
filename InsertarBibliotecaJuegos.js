const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuración de Supabase
const supabaseUrl = 'https://thurpdtfiowocapohlrg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodXJwZHRmaW93b2NhcG9obHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzQzMTQsImV4cCI6MjAyNjU1MDMxNH0.fVd9cmV6Ttsnh7YLEcKvox8vlEw93SHvFZ6ZyvL6Cfc';

// Crear cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para insertar datos en la tabla 'biblioteca_has_juegos'
async function insertData() {
  try {
    // Datos para insertar en la tabla 'Biblioteca_has_juegos'
    const dataToInsert = [
      {BibliotecaIdBiblioteca:'1',JuegosIdJuegos:'1'}
    ];

    // Insertar datos en la tabla 'Biblioteca_has_juegos'
    const { data, error } = await supabase.from('Biblioteca_has_Juegos').insert(dataToInsert).select();

    if (error) {
      throw error;
    }

    console.log('Datos insertados correctamente:', data);
  } catch (error) {
    console.error('Error al insertar datos:', error.message);
  }
}

// Verificar la conexión con Supabase y luego insertar datos
supabase
  .from('Biblioteca_has_Juegos')
  .select('*')
  .then(({ data, error }) => {
    if (error) {
      console.error('Error al verificar la conexión con Supabase:', error.message);
    } else {
      console.log('Conexión exitosa con Supabase, datos obtenidos:', data);
      // Llamar a la función insertData después de verificar la conexión
      insertData();
    }
  })
  .catch(error => {
    console.error('Error al intentar conectar con Supabase:', error.message);
  });

// Ruta para obtener datos de la base de datos
app.get('/data', async (req, res) => {
  try {
    // Consulta datos desde la tabla 'Juegos'
    const { data, error } = await supabase.from('Biblioteca_has_Juegos').select('*');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

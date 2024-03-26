// Importa o módulo Express
const express = require('express');
// Importa o módulo express-ejs-layouts
const expressEjsLayout = require('express-ejs-layouts');
const homeRoute = require('./routes/homeRoute');
const voluntariosRoute = require('./routes/voluntariosRoute')
// Cria uma instância do aplicativo Express
const app = express();


//---- configura a localização da pasta views ----
// Configura a pasta de views
app.set("views", "./views");
// Define o EJS como o motor de views
app.set("view engine", "ejs");
// Define o layout padrão
app.set("layout", "./layout");


app.use(express.urlencoded({extended:true}));
// Middleware para parsear requests JSON
app.use(express.json());
// Serve arquivos estáticos da pasta public
app.use(express.static("public"));
// Usa o módulo express-ejs-layouts
app.use(expressEjsLayout);

//---- Configuções de Rotas existentes no nosso sistema ----
app.use('/', homeRoute);
app.use('/voluntarios', voluntariosRoute)

// Inicia o servidor na porta 5000
app.listen(5000, function() {
  console.log("Servidor web iniciado");
});










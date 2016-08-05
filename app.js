
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/primera_pagina");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//definicion de elementos del schema
//estructuras de los registros en la bd
var productosSchema =
{
	nombre: String,
	descripcion: String,
	imagenUrl: String,
	precio: Number
};

//modelo
var Product = mongoose.model("Product", productosSchema);



app.set("view engine", "jade");

app.use(express.static("publicc"));

app.get("/",function(req,res)
{
	//resp.send("hola1");
	res.render("index");
});

app.post("/producto", function(req,res)
{
	console.log(req.body);
	if(req.body.contrasenia == '12345678')
	{
		var data =
		{
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			imagenUrl: "data.png",
			precio: req.body.precio
		}

		var product = new Product(data);
		product.save(function(err)
			{
				console.log(product);
				res.render("index");
			});
	}
	else
	{
		res.render("producto/new");
	}

	
});

app.get("/producto/new", function(solicitud, respuesta)
{

	respuesta.render("producto/new")

});

app.listen(8080);
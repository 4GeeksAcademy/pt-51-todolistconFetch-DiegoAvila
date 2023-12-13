import React, { useState, useEffect} from "react";

//create your first component
const Home = () => {
	
	const [entrada, setEntrada] = useState ("")
	const [contenido, setContenido] = useState ([])
	const [hoverIndex, setHoverIndex] = useState (null)
 
	function crearUsuario(){
		fetch('https://playground.4geeks.com/apis/fake/todos/user/avila46', {
			method: "POST", // or 'PUT'
			body: JSON.stringify([]),
			headers: {"Content-Type": "application/json"},
		  })
		  .then((response)=>{
			if (response.status === 400){
				obtenerContenido()
			}
			return response.json() 
			})
		  .then((data)=>(data))
		  .catch((error)=>console.log(error))
	}
	function obtenerContenido() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/avila46')
		  .then((response)=>response.json()) 
		  .then((data)=>setContenido(data))
		  .catch((error)=>console.log(error))		
	}
	
	function actualizarContenido(lista){
		fetch('https://playground.4geeks.com/apis/fake/todos/user/avila46', {
			method: "PUT", // or 'PUT'
			body: JSON.stringify(lista),
			headers: {"Content-Type": "application/json"},
		  })
		  .then((response)=> response.json()) 
		  .then((data)=>(data))
		  .catch((error)=>console.log(error))

	}
	
	useEffect(()=>{
		crearUsuario()
		obtenerContenido()
	},[])

	function capturarEntrada(event) {
		setEntrada(event.target.value)
	}
	function capturarContenido(event) {
		let aux = []
		if (event.keyCode===13 && entrada!= ""){
			setContenido(contenido.concat({ label: entrada, done: false }))
			aux = contenido.concat({ label: entrada, done: false })
			actualizarContenido(aux)
		}	
	}
	const mostrarBoton = (index) =>{
		setHoverIndex(index)
	}
	const ocultarBoton = () =>{
		setHoverIndex(null)
	}
	const eliminarDato = (index) => {
		let aux = [] 
		setContenido(contenido.filter((elemento,i) => i !== index))
		aux = contenido.filter((elemento,i) => i !== index)
		actualizarContenido(aux)
	}
	const listaContenido = contenido.map((elemento, index) =>
		<li key={index} className="list-group-item border-bottom">
			<div className="d-flex justify-content-between py-1" onMouseEnter={() => mostrarBoton(index)} onMouseLeave={ocultarBoton}>
				{elemento.label}
				<button type="button" className={`btn py-0 ${hoverIndex===index ? "d-flex" : "d-none"}`} onClick={() => eliminarDato(index)} >x</button>
			</div>
  	 	</li>
	 );
	 const actualizacionContenido =  () =>{
		return contenido.length
	 }
	 const sinContenido = ()  =>{
		return actualizacionContenido() === 0 ? "Sin contenido, añadelo pulsando enter" : ""

	 }
	return (

		<div className="w-50 mx-auto mt-5" onKeyDown={capturarContenido} >
			<h1 className="text-center w-50 mx-auto">Lista de Tareas</h1>
			<input type="text" className="form-control mx-auto" onChange={capturarEntrada} />
			<p className="text-center w-50 mx-auto">{sinContenido()}</p>
			<ul className="list-group-flush border-end m-3">
				{listaContenido}
				<li className="list-group-item border-bottom">Tienes {actualizacionContenido()} items</li>
	  		</ul>
		</div>
		
	);
};

export default Home;

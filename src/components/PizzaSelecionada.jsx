import { React, useState } from "react";
import { Headers } from "./Header";
import { Copyrights } from "./Copyright";
import { useLocation } from "react-router-dom";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export const Pizza = () => {
    /*extremos el objeto de la pizza seleccionada*/
    let { state } = useLocation();
    const animatedComponents = makeAnimated();

    const options = [
        { value: 'Champiñones', label: 'Champiñones' },
        { value: 'Albahaca', label: 'Albahaca' },
        { value: 'Piña', label: 'Piña' },
        { value: 'Pepperoni', label: 'Pepperoni' },
        { value: 'Jamón', label: 'Jamón' },
        { value: 'Pollo', label: 'Pollo' }
    ]
    //todos los ingredientes seleccionados seleccionados
    const [ingredientes, setIngredientes] = useState([]);
    //ingre
    const [ingreMasPrecio, setIngreMasPrecio] = useState([]);

    //objeto final para factura
    const [factura, setFactura] = useState(
        {
            nombre: "",
            pizza: state.product.title,
            precio: 0,
            ingredientes: [],
            adicional: 0,
            total: 0,
        }


    );

    const onChange = (e) => {
        setIngredientes(e);
    }

    const onClickComprar = () => {
        onClickTotal();
        let nombre = document.getElementById("nombre")
        console.log(nombre.value);
        if(nombre.value===""){
            alert("El nombre es un campo requerido")
        }
        console.log(ingreMasPrecio);

        let fac = {
            nombre: "",
            pizza: state.product.title,
            precio: 0,
            ingredientes: [],
            adicional: 0,
            total: 0,
        }
        console.log(fac);
        //.innerHTML = `descuento aplicado: ${descuento} %`;
    }
    const onClickTotal = () => {
        //validar el numero de clientes seleccionados
        if (ingredientes.length === 0) {
            alert("Debe seleccionar al menos un ingrediente");
        }

        let cantidadIngredientes = ingredientes.length;

        //validar que la cantidad de ingredientes sea mayor a dos para que aplique la logica
        if (cantidadIngredientes > 2) {
            //validar el tipo de pizza selecciona
            let ingTmp = [];
            switch (state.product.id) {
                case 1: //caso pizza personal
                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];

                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 1 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.50 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.25 })
                        }
                    }

                    break;
                case 2: //caso pizza mediana
                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.00 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 1.00 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.50 })
                        }
                    }
                    break;
                case 3: //caso pizza grande

                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.50 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.00 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 1.00 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        }
                    }
                    break;

                default:
                    break;
            }
            setIngreMasPrecio(ingTmp);
        }


    }


    return (
        <>
            <Headers />
            <br /><br />
            <section className="m-1 ">
                <h1 className="mx-auto text-center">Pizza seleccionada</h1>
                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <div className="row">
                            <div className="col-6">
                                <img className="card mx-auto" width={300} height={500} src={state.product.urlImage} alt={state.product.title} />
                            </div>
                            <div className="col-6">
                                <div className="card-body">
                                    <h5 className="card-title">{state.product.title}</h5>
                                    <p className="card-text">{state.product.descripcion}</p>
                                    <p className="card-text"><small className="text-muted">Precio ${state.product.price}</small></p>
                                </div>
                                {/* detalle de como quiere la pizza */}
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="">Seleccione minimo dos ingredientes para su pizza</label>
                                        <Select
                                            name="ingredientes"
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            required
                                            onChange={(choice) => onChange(choice)}
                                            options={options}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Nombre</label>
                                        <input type="text" className="form-control" name="nombre" id="nombre" required />
                                    </div>

                                    <br />
                                    <div className="row">
                                        <div className="col"><button type="submit" className="btn btn-primary text-center mx-auto p-2 m-2 px-4" onClick={onClickTotal}>Calcular Total</button></div>
                                        <div className="col"><button type="submit" className="btn btn-primary text-center mx-auto p-2 m-2 px-4" onClick={onClickComprar}>Comprar</button></div>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <h2 className="mx-auto text-center">Factura:
                       
                        </h2>
                    </div>
                </div>

            </section>


            <Copyrights />


        </>
    );
}
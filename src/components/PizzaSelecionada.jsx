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
        { value: 'Jamón', label: 'Jamón' }
    ]
    //ingredientes seleccionados
    const [ingredientes, setIngredientes] = useState([]);

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

    const onClickTotal = () => {
        //validar el numero de clientes seleccionados
        if (ingredientes.length === 0) {
            alert("Debe seleccionar al menos un ingrediente");
        }

        let cantidadIngredientes = ingredientes.length;

        //validar que la cantidad de ingredientes sea mayor a dos para que aplique la logica
        if (cantidadIngredientes > 2) {
            //validar el tipo de pizza selecciona

            switch (state.product.id) {
                case 1: //caso pizza personal
                    /*
                        i. El primer ingrediente adicional a $1.00.
                        ii. Si agregan dos ingredientes adicionales a $0.75 (c/u).
                        iii. Si se agregan tres ingredientes adicionales a $0.50 (c/u).
                        iv. Si se agregan más de tres ingredientes adicionales serán a $.0.25 (c/u).   
                    */

                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        console.log(element);
                    }
                    break;
                case 2: //caso pizza mediana
                    /* 
                        i. El primer ingrediente adicional a $2.00.
                        ii. Si agregan dos ingredientes adicionales a $1.00 (c/u).
                        iii. Si se agregan tres ingredientes adicionales a $0.75 (c/u).
                        iv. Si se agregan más de tres ingredientes adicionales serán a $.0.50 (c/u)
                     */
                    
                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        console.log(element);
                    }
                    break;
                case 3: //caso pizza grande
                    /* 
                        i. El primer ingrediente adicional a $2.50.
                        ii. Si agregan dos ingredientes adicionales a $2.00 (c/u).
                        iii. Si se agregan tres ingredientes adicionales a $1.00 (c/u).
                        iv. Si se agregan más de tres ingredientes adicionales serán a $.0.75 (c/u).
                      */

                     //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        console.log(element);
                    }
                    break;

                default:
                    break;
            }
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

                                    <br />
                                    <button type="submit" className="btn btn-primary text-center mx-auto" onClick={onClickTotal}>Calcular Total</button>

                                    <div className="tmpTotal" id="tmpTotal">

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <h2 className="mx-auto text-center">Información de pago</h2>
                    </div>
                </div>

            </section>


            <Copyrights />


        </>
    );
}
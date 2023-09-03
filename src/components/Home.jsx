import React from "react";
import { Headers } from "./Header";
import { MenuPrincipal } from "./Menu";
import { Copyrights } from "./Copyright";
import {data} from "./data";

export const HomePage = () => {

    return (
        
        <>
            <Headers />
            <section className="home" id="home">
                <div className="home-text">
                    <h1>La Italiana</h1>
                    <h2>The tasty pizza of <br /> your choice</h2>
                    <p className="btn">Ver Menu</p>
                </div>
                <div className="home-img">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80.png" alt="" />
                </div>
            </section>
            <MenuPrincipal menu={data}/>

            <Copyrights />

        </>
    );
}
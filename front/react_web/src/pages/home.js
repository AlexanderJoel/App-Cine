/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const Home = () => {
  return (
    <div>
        <Sidebar />,
        <Header />,
        <div className="ml-64">
            <hr />
            <main className="my-8">
                <div className="flex h-56">
                    <div className="w-1/3 h-48 flex-1 text-center px-4 py-2">
                        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src="https://as.com/meristation/imagenes/2018/01/22/reportaje/1516604400_722996_1531823096_sumario_normal.jpg" alt="Sunset in the mountains"></img>
                                <Link to="/add_movie">
                                <div className="px-6 py-4 hover:bg-pink-200">
                                    <div className="font-bold text-xl mb-2">Agregar nueva Pelicula</div>
                                </div>
                                </Link>
                        </div>
                    </div>
                    <div className="w-1/3 h-40 flex-1 text-center px-4 py-2 m-2">
                        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src="https://cadenaser00.epimg.net/emisora/imagenes/2017/12/28/radio_madrid/1514461313_511638_1514464415_noticia_normal.jpg" alt="Sunset in the mountains"></img>
                            <Link to="/rooms">
                                <div className="px-6 py-4 hover:bg-pink-200">
                                    <div className="font-bold text-xl mb-2">Nueva Sala de cine</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/3 h-40 flex-1 text-center px-4 py-2 m-2">
                        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src="https://www.cinepremiere.com.mx/wp-content/uploads/2019/01/7473-cine-en-mexico-e1547245342230.jpg" alt="Sunset in the mountains"></img>
                            <Link to="/home">
                                <div className="px-6 py-4 hover:bg-pink-200">
                                    <div className="font-bold text-xl mb-2">Reporte de compras</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

export default Home;

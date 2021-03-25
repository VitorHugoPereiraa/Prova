import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiOutlineMenu } from 'react-icons/ai';

import './Navbar.css'


function Navbar() {
    return (
        <>

            <AiOutlineMenu onClick={showNavbar()} className="menuIcon" size={45} color="#02acac" />

            <nav className="sideBar">
                <h2 className="logo">Tarefas</h2>

                <p className="welcome">Bem-Vindo, <br /><span>Teste@gmail.com</span></p>

                <div className="navLink-container">
                    <div className="navLink"><p className="first-link">Tarefas <AiOutlineArrowLeft size={16} color="#02acac" /></p></div>
                    <div className="navLink filter-task">
                        <p className="statusTask">Status: </p>

                        <div className="containerInputs">
                            <label for="pendente">Pendente</label>
                            <input type="radio" id="pendente" name="status" value="pendente" />
                        </div>

                        <div className="containerInputs">
                            <label for="em-andamento">Em andamento</label>
                            <input type="radio" id="em-andamento" name="status" value="em andamento" />
                        </div>

                        <div className="containerInputs">
                            <label for="finalizada">Finalizada</label>
                            <input type="radio" id="finalizada" name="status" value="finalizada" />
                        </div>

                        <div className="containerInputs">
                            <label for="cancelada">Cancelada</label>
                            <input type="radio" id="cancelada" name="status" value="cancelada" />
                        </div>

                        <button className='button-search'><p>Buscar</p></button>

                    </div>
                    <div className="navLink lastLink"><p>Nova tarefas <AiOutlineArrowLeft size={16} color="#02acac" /></p></div>
                </div>



                <span className="logout"><HiOutlineLogout color="red" /><p>Sair</p> </span>
            </nav>
        </>
    );
}

function showNavbar() {
    setTimeout(() =>{
        const icon = document.querySelector('.menuIcon');
        const navBar = document.querySelector('.sideBar');
        icon.addEventListener('click', () => {
            if(navBar.style.display === 'none'){
                navBar.style.display = 'flex'
            }else{
                navBar.style.display = 'none'
            }
        })
    }, 0)
}

export default Navbar;
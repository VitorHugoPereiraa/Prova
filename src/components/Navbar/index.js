import React, { useEffect, useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineArrowLeft, AiOutlineMenu } from 'react-icons/ai';

import {
    Link
  } from "react-router-dom";

import './Navbar.css'

import { handleLogout } from '../../utils/signOut'
import { getLocalStorage } from '../../utils/getLocalStorage'



function Navbar() {
    const [email, setEmail] = useState('')

    useEffect(() => {
        const emailSaved = getLocalStorage('user_email')
        setEmail(emailSaved)
    }, [])

    return (
        <>

            <AiOutlineMenu onClick={() =>showNavbar()} className="menuIcon" size={45} color="#02acac" />

            <nav className="sideBar">
                <h2 className="logo"><Link to="/home" className="toNewLink linkLogo">Tarefas</Link></h2>

                <p className="welcome">Bem-Vindo, <br /><span>{email}</span></p>

                <div className="navLink-container">
                    <div className="navLink"><p className="first-link"><Link to="/home" className="toNewLink">Tarefas</Link> <AiOutlineArrowLeft size={16} color="#02acac" /></p></div>
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

                        <div className="containerInputs">
                            <label for="todas">Todas</label>
                            <input type="radio" id="todas" name="status" value="todas" />
                        </div>

                        <button className='button-search'><p>Buscar</p></button>

                    </div>
                    <div className="navLink lastLink"><p><Link to="/nova-tarefa" className="toNewLink">Nova tarefas <AiOutlineArrowLeft size={16} color="#02acac" /></Link></p></div>
                </div>



                <span className="logout" onClick={() => handleLogout()} ><HiOutlineLogout color="red" /><p>Sair</p> </span>
            </nav>
        </>
    );
}

function showNavbar() {
    setTimeout(() => {
        const icon = document.querySelector('.menuIcon');
        const navBar = document.querySelector('.sideBar');
        icon.addEventListener('click', () => {
            if (navBar.style.display === 'none') {
                navBar.style.display = 'flex'
            } else if(navBar.style.display != 'none') {
                navBar.style.display = 'none'
            }
        })
    }, 0)
}

export default Navbar;
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


    function setSearchStatus() {
        localStorage.setItem('search_status', getInputStatusValue())
    }

    function getInputStatusValue() {
        const select = document.getElementById('selectStatusSearch');
        const value = select.options[select.selectedIndex].value;
    
        return value
      }

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

                            <select id="selectStatusSearch" className="selectStatusSearch">
                                <option>Pendente</option>
                                <option>Em andamento</option>
                                <option>Finalizada</option>
                                <option>Cancelada</option>
                            </select>

                        <button className='button-search' onClick={() => { 
                            setSearchStatus() 
                            window.location.href = "/pesquisar-tarefas" 
                        }}><Link to="/pesquisar-tarefas">Buscar</Link></button>

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
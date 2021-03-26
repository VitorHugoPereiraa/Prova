import React, { useState } from 'react';

import './NewTask.css'

import { AiOutlineSave } from 'react-icons/ai';
import fire, { db } from '../../fire'


import Navbar from '../Navbar'


function NewTaks() {

  const [sended, setSended] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [userResponsible, setUserResponsible] = useState("")
  const [emailError, setEmailError] = useState("")
  const [taskId, setTasksId] = useState(0)

  async function creteTasks() {

    const user = await db.collection('usuarios').where('email', '==', userResponsible).get()

    if(user.docs.length === 0) return setEmailError("Usuario não encontrado")

    const taskRef = (await db.collection("tarefas").get()).docs.length++

    setTasksId(taskRef + 1)

    await db.collection('tarefas').doc(taskId.toString()).set({
      titulo: title,
      descricao: description,
      responsavel: userResponsible,
      status: "Pendente",
      historico: ["Pendente"],
      id: taskId
    }).catch(err => console.error(err))

   await setEmailError('')
    window.location.href = "/home"
  }


  return (
    <div className='divNewTask'>
      <Navbar />

      <div className='content'>
        <section className='containerNewTask'>
          <h2>Adcione uma nova tarefa: </h2>

          <div className='containerInputsNewTask'>
            <label for="titleTask" > Titulo:  </label>
            <input required
              onChange={val => setTitle(val.target.value)}
              value={title} id='titleTask' placeholder="Ex: Desenvolver um header" type='text' />
            <label for="descriptionTask"> Descrição:  </label>
            <textarea type='text'
              onChange={val => setDescription(val.target.value)}
              value={description} placeholder="Ex: Preciso desenvolver um header com React para meu site." required id='descriptionTask' type='text' />
            <label for="userTask"> Usuário responsável: (Email*) </label>
            <input required
              onChange={val => setUserResponsible(val.target.value)}
              value={userResponsible} placeholder="Ex: meuamigo@gmail.com" id='userTask' type='email' />
              <p className="errorMsg">{emailError}</p>
            <button onClick={() => {
              creteTasks()
              setSended(!sended)
            }} className='btnCreateTask'>Criado!!!</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewTaks;
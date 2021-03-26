import React, { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';




import fire, { db } from '../../fire'

import "./SearchTask.css"
import Navbar from '../Navbar'



function SearchTask() {

  const [alReady, setAlready] = useState(false)
  const [tasks, setTasks] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [existData, setExistData] = useState(false)


  useEffect(() => {
    (async function handleTasks() {
      const statusLocalStorage = localStorage.getItem('search_status')
      const doc = await db.collection('tarefas').where('status', '==', statusLocalStorage).get()

      setTasks(doc.docs)
      if(doc.size !== 0) setExistData(true)
      setAlready(true)
    })()
  }, [])

  

  async function handleEditTasks() {
    const _id = localStorage.getItem('task_id')

    const doc = await db.collection('tarefas').doc(_id.toString()).get()
    const historico = doc.data().historico
    const historicoLength = historico.length
    const responsavel = doc.data().responsavel

    const statusValue = getInputStatusValue()
    const responsibleValue = getInputResponsibleValue()

    const existEmail = await verifyExistEmail(responsibleValue)

    const newDoc = await db.collection('tarefas').doc(_id.toString()).update({
      status: statusValue,
      historico: historico[historicoLength - 1] === statusValue ? historico : [...historico, statusValue],
      responsavel: existEmail ? responsibleValue : responsavel
    })

  }

  async function handleCancelStatus(id) {
    const oldStatus = await db.collection('tarefas').doc(id.toString()).get()
    const historico = await oldStatus.data().historico
    const historicoLength = historico.length
    const attStatus = await db.collection('tarefas').doc(id.toString()).update({
      status: "Cancelada",
      historico: historico[historicoLength - 1] === "Cancelada" ? historico : [...historico, "Cancelada"],
    })
  }


  async function verifyExistEmail(email) {
    const user = await db.collection('usuarios').where('email', '==', email).get()

    if (user.docs.length === 0) {
      return false
    } else {
      return true
    }

  }


  function getInputStatusValue() {
    const select = document.getElementById('inputStatus');
    const value = select.options[select.selectedIndex].value;

    return value
  }


  function getInputResponsibleValue() {
    const select = document.getElementById('inputEditReponsible');
    const value = select.value;

    return value
  }



  return (
    <>
      {


        openModal ? (
          <div className="containerModal">
            <div className="modal">
              <IoMdClose
                className="closeModal"
                onClick={() => setOpenModal(!openModal)}
                color="red" size={45} />

              <h3>Atualizar status: </h3>

              <select id="inputStatus">
                <option value='Pendente'>Pendente</option>
                <option value='Em andamento'>Em andamento</option>
                <option value='Finalizada'>Finalizada</option>
                <option value='Cancelada'>Cancelada</option>
              </select>

              <h3>Atualizar Responsavel pela tarefa: </h3>

              <input
                type="email"
                id="inputEditReponsible"
              />

              <button
                onClick={async () => {
                  await handleEditTasks()
                  window.location.href = "/home"
                }}
                id="btnSendUpdate"
              >
                Atualizar
              </button>
            </div>
          </div>
        ) : (
          <p></p>
        )

      }
      <div className='divHome'>
        <Navbar />
        <div className='content'>
          <section className='containerTasks'>
            {

              alReady && existData ?
                tasks.map((i, key) => {
                  const response = i.data()
                  return (
                    <div key={key} className='containerTask'>

                      <div className="containerTaskTitle">
                        <h3>{response.titulo}</h3>
                        <p>{response.status}</p>
                      </div>
                      <div className="containerTaskDescription">
                        <p>{response.descricao}</p>
                        <BsPencil
                          onClick={() => {
                            localStorage.setItem('task_id', response.id)
                            setOpenModal(!openModal)
                          }}
                          className="editIcon" size={40} color='green' />
                        <FcCancel onClick={async () => {
                          await handleCancelStatus(response.id)
                          window.location.href = "/home"
                        }} className="editIcon" size={40} color='red' />
                      </div>
                      <span className="containerTaskResponsible">
                        Responsavel: <p>{response.responsavel}</p>
                      </span>
                      <span className="containerHistory">
                        Historico: <a href=""> <AiOutlineArrowDown size={40} />  </a>
                      </span>

                      <div>
                        {
                          response.historico.map(i => {
                            return (
                              <ul className="listHistory">
                                <li><MdPlaylistAddCheck color='green' size={35} />{i}</li>
                              </ul>
                            );
                          })
                        }
                      </div>

                    </div>
                  )
                })
                :
                <p className="finding">Nada foi encontrado :-(</p>
            }
          </section>
        </div>
      </div>
    </>
  );
}

export default SearchTask;
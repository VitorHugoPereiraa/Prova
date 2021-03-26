import React, { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';




import fire, { db } from '../../fire'

import "./Home.css"
import Navbar from '../Navbar'



function Home() {
  const [task, setTask] = useState([{
    titulo: "Limpar casa",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor velit vel leo viverra, vitae sollicitudin nisi laoreet. Praesent laoreet tellus quis scelerisque egestas. Morbi vulputate quam ligula, nec luctus sem luctus eget. Aliquam suscipit nibh nec sapien finibus aliquet. Vivamus elementum purus quis ligula mollis, quis dapibus massa dictum.",
    status: "Pendente",
    historico: [
      "Pendente"
    ],
    responsavel: "teste01@gmail.com"
  },
  {
    titulo: "Limpar o quarto",
    descricao: "Arrumar a quarto o mais rapido possivel",
    status: "Finalizada",
    historico: [
      "Pendente",
      "Em andamento",
      "Finalizada"
    ],
    responsavel: "teste01@gmail.com"

  },
  {
    titulo: "Limpar casa",
    descricao: "Arrumar a casa o mais rapido possivel",
    status: "Pendente",
    historico: [
      "Pendente"
    ],
    responsavel: "teste01@gmail.com"

  },
  {
    titulo: "Limpar o quarto",
    descricao: "Arrumar a quarto o mais rapido possivel",
    status: "Finalizada",
    historico: [
      "Pendente",
      "Em andamento",
      "Finalizada"
    ],
    responsavel: "teste01@gmail.com"

  },])

  const [alReady, setAlready] = useState(false)
  const [tasks, setTasks] = useState()
  const [history, setHistory] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    (async function handleTasks() {
      const doc = await db.collection('tarefas').get()

      setTasks(doc.docs)
      setAlready(true)
    })()
  }, [])

  async function handleEditTasks() {
    const _id = localStorage.getItem('task_id')

    const doc = await db.collection('tarefas').doc(_id.toString()).get()
    const historico = doc.data().historico
    const historicoLength = historico.length
    const responsavel = doc.data().responsavel

    // console.log(getInputStatusValue())
    // console.log(doc.data()) 

    // const existEmail = await verifyExistEmail()
    const statusValue = getInputStatusValue()
    const responsibleValue = getInputResponsibleValue()

    const existEmail = await verifyExistEmail(responsibleValue)

    const newDoc = await db.collection('tarefas').doc(_id.toString()).update({
      status: statusValue,
      historico: historico[historicoLength - 1] === statusValue ? historico: [...historico, statusValue],
      responsavel: existEmail ? responsibleValue : responsavel
    })

  }

  async function verifyExistEmail(email) {
    const user = await db.collection('usuarios').where('email', '==', email).get()

    if (user.docs.length === 0) {
      return false
    }else{
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
                onClick={() => handleEditTasks()}
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

              alReady ?
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
                        <FcCancel className="editIcon" size={40} color='red' />
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
                <p>sem tarefas</p>
            }
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
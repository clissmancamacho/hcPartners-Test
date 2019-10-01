import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import View from '../../../components/Ticket/View'
import Form from '../Form'

import { ticketServices } from '../../../services'

import './styles.css'

import { Table, Tag, Popconfirm, Icon, Modal, Button, message } from 'antd'

const ListAdmin = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [tickets, setTickets] = useState([])
  const [visible, setVisible] = useState(false)
  const [actualTicket, setActualTicket] = useState({})
  const [showModalForm, setShowModalForm] = useState(false)
  const [actionModalForm, setActionModalForm] = useState("")
  const [titleModalForm, setTitleModalForm] = useState("")
  const [okTextModalForm, setOkTextModalForm] = useState("")

  const columns = [
    {
      title: 'Nº Ticket',
      dataIndex: 'id',
      key: 'id'  
    },
    {
      title: 'Estatus del Ticket',
      dataIndex: 'requested_ticket',
      key: 'requested_ticket',
      render: element => (
        <Tag color={getTagColor(element)}>
          {getTagText(element)}
        </Tag>
      ),
    },
    {
      title: 'Usuario asignado',
      dataIndex: 'user',
      key: 'user',
      render: user => (
        <span>{ user.name }</span>
      ),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, element) => getActions(element)
    },
  ]

  useEffect(() => {
    fillTickets()
  }, [])


  const fillTickets = async () => {
    try {
      const response = await ticketServices.getTickets()
      if (response.status) {
        setTickets(response.tickets)
      }
    } catch (error) {
      console.log(error)
      message.error('Ha ocurrido un error.')
    }
  }

  const getTagColor = (element) => {
    let color
    if (element) {
      color = 'green'
    } else {
      color = 'volcano'
    }
    return color
  }

  const getTagText = (element) => {
    let text
    if (element) {
      text = 'Ticket pedido'
    } else {
      text = 'Ticket no pedido'
    }
    return text
  }

  const confirmDeleteTicket = async (ticket) => {
    try {
      const response = await ticketServices.deleteTicket(ticket)
      if(response.status) {
        updateTickets(ticket, 'delete')
        return message.success(`Ticket ${ticket.id} Eliminado`)
      }
    } catch (error) {
      console.log(error)
      message.error('Ha ocurrido un error')
    }
  }


  const updateTickets = (ticket, action) => {
    let newTickets;

    if(action === 'delete') {
      newTickets = tickets.filter(element => element.id != ticket.id)
    } else if (action === 'update') {
      const index = tickets.findIndex(element => element.id === ticket.id)
      tickets[index] = ticket
      newTickets = tickets
    }
    setTickets([...newTickets])
  }

  /* Modal Functions */

  const showModalView = (ticket) => {
    Modal.info({
      title: "Descripción del ticket",
      content: (
        <div>
        <View ticket={ticket}></View>
        </div>
      ),
      width: "95%"
    })
  };

  const enableModalForm = (ticket, action) => {
    const title = action === "create" ? "Crear un Ticket" : "Editar Ticket"
    const okText =  action === "create" ? "Crear" : "Editar"
    setActualTicket(ticket)
    setActionModalForm(action)
    setTitleModalForm(title)
    setOkTextModalForm(okText)
    setShowModalForm(true)
  };

  const disableShowModalFrom = () => {
    setShowModalForm(false)
  }

  /* Table Actions  */
  const getActions = (element) => {
      return (
        <Fragment>
          <span>
            <Icon className="icon" type="eye" theme="filled" onClick={() => showModalView(element)} style={{ color: 'blue', marginRight: '2%' }} />          
          </span>

          <span>
          <Icon className="icon" type="edit" theme="filled" onClick={() => enableModalForm(element, "edit")} style={{ color: 'teal', marginRight: '2%' }} />          
          </span>

          <span>
            <Popconfirm
              title="¿Quieres eliminar este ticket?"
              onConfirm={() => confirmDeleteTicket(element)}
              onCancel={() => {}}
              okText="Si"
              cancelText="No"
              >
              <Icon className="icon" type="delete" theme="filled" style={{ color: 'red' }} />          
            </Popconfirm>
          </span>
        </Fragment>
      );
  }

  return (
    <div>
      <div className="button">
        <Button type="primary" onClick={() => enableModalForm(null, 'create')}>Crear Ticket</Button>
      </div>
     
      <Table rowKey="id" columns={columns} dataSource={tickets} />
      {showModalForm ?
        <Form fillTickets={fillTickets} disableShowModalFrom={disableShowModalFrom} ticket={actualTicket} action={actionModalForm} title={titleModalForm} okText={okTextModalForm} ></Form> :
           null
      }
      
    </div>
  )
}

export default withRouter(ListAdmin)


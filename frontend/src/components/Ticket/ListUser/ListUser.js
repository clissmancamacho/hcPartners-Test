import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { ticketServices } from '../../../services'


import { Table, Tag, Popconfirm, message } from 'antd'

const ListUser = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [tickets, setTickets] = useState([])

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
      title: 'Acciones',
      key: 'action',
      render: (text, element) => getAction(element)
    },
  ]

  useEffect(() => {
    fillTickets()
  }, [])


  const fillTickets = async () => {
    try {
      const response = await ticketServices.getTicketsByUser(user)
      if (response.status) {
        setTickets(response.ticketsByUser)
      }
    } catch (error) {
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

  const getAction = (element) => {
    if(!element.requested_ticket) {
      return (
        <span>
          <Popconfirm
            title="¿Quieres pedir este ticket?"
            onConfirm={() => confirmRequestTicket(element)}
            onCancel={() => cancelRequestTicket}
            okText="Si"
            cancelText="No"
            >
            <a href="#">Pedir Ticket</a>
          </Popconfirm>
        </span>
      )
    } else {
      return (
        <span>
          <Popconfirm
            title="¿Quieres cancelar el pedido de este ticket?"
            onConfirm={() => confirmRequestTicket(element)}
            onCancel={() => cancelRequestTicket}
            okText="Si"
            cancelText="No"
            >
            <a href="#">Cancelar pedido</a>
          </Popconfirm>
        </span>
      )
    }
    
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

  const confirmRequestTicket = async (ticket) => {
    try {
      ticket.requested_ticket = !ticket.requested_ticket
      const response = await ticketServices.updateTicket(ticket)
      if(response.status) {
        updateTicket(response.ticket)
        if(response.ticket.requested_ticket) return message.success('Ticket pedido')
        message.success('Pedido del ticket cancelado')
      }
    } catch (error) {
      console.log(error)
      message.error('Ha ocurrido un error')
    }
    
  }
  
  const cancelRequestTicket = (e) => {
    console.log(e)
  }

  const updateTicket = (ticket) => {
    const index = tickets.findIndex(element => element.id === ticket.id)
    tickets[index] = ticket
    setTickets([...tickets])
  }
  
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={tickets} />
    </div>
  )
}

export default withRouter(ListUser)


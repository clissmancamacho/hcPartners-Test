import React from 'react'
import { Descriptions } from 'antd';

const View = ({ticket, ...props}) => { 
  return (
    <div>
    <Descriptions layout="vertical">
      <Descriptions.Item label="ID">{ticket.id}</Descriptions.Item>
      <Descriptions.Item label="¿Ticket Pedido?">{ticket.requested_ticket ? "Si" : "No"}</Descriptions.Item>
      <Descriptions.Item label="ID Usuario">{ ticket.user.id }</Descriptions.Item>
      <Descriptions.Item label="Correo Usuario">{ ticket.user.email }</Descriptions.Item>
      <Descriptions.Item label="Nombre Usuario">{ ticket.user.name }</Descriptions.Item>
    </Descriptions>
    </div>
    
  )
}

export default View

import React, { useState, useEffect } from "react"
import { Form as FormAnt, Modal, message, Select } from "antd"
import { ticketServices, userServices } from "../../../services"

const { Option } = Select;

const Form = (props) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fillUsers()
	}, [])

  const { getFieldDecorator } = props.form
  const { ticket, action, title, okText, fillTickets, disableShowModalFrom } = props

  /* Function and Methods */

  const fillUsers = async () => {
    const response = await userServices.getUsersByTypeUser()
    if (response.status) {
      setUsers(response.users)
    }
  }
  
  const handleOk = e => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        try {
          if(action === 'create') {
            await saveTicket(values.userId)
            message.success('Ticket Creado')
          } else {
            await editTicket({...ticket, userId: values.userId})
            message.success('Ticket Editado')
          }
          disableModal()
          fillTickets()
    
        } catch (error) {
          disableModal()
          message.error('Ha ocurrido un error.')
        }
      }
    })
  }

  const disableModal = () => {
    disableShowModalFrom()
    setLoading(false)
    setVisible(false)
  }

  const saveTicket = async (userId) => {
    const ticket = { userId : userId }
    return ticketServices.saveTicket(ticket)
  }
  
  const editTicket = async (ticket) => {
    return ticketServices.updateTicket(ticket)
  }

  const handleCancel = () => {
    disableShowModalFrom()
    setVisible(false)
  };

  const getDefaultSelectValue = () => {
    return ticket ? ticket.userId : undefined
  }

  return (
    <div>
      <Modal
          visible={visible}
          title={title}
          okText={okText}
          cancelText="Cancelar"
          onCancel={handleCancel}
          onOk={handleOk}
        >
        <FormAnt layout="vertical">
          <FormAnt.Item>
            {getFieldDecorator("userId", {
              initialValue: getDefaultSelectValue(),
              rules: [{ required: true, message: "¡Por favor selecciona un usuario!" }]
            })(
              <Select
                showSearch
                placeholder="Selecciona un usuario"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                  {
                    users.map(user => (<Option key={user.id} value={user.id}>{user.name}</Option>))
                  }
                </Select>
              )}
          </FormAnt.Item>
        </FormAnt>
      </Modal>

      
    </div>
  )
}

const WrappedTicketForm = FormAnt.create({ name: "ticket_form" })(Form)

export default WrappedTicketForm
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select'
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from '../../../services/api'
import '../index.css'
interface ICrud {
    title: string;
    description: string;


}

interface IParamsProps {
    id: string;
}


const Crud: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<IParamsProps>();


    const [model, setModel] = useState<ICrud>({
        title: '',
        description: '',
    })

    useEffect(() => {
        if (id !== undefined) {
            findOne(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (id !== undefined) {

            const response = await api.put(`/crud/${id}`, model)


        } else {
            const response = await api.post('/crud', model)

        }

        back()
    }

    async function findOne(id: string) {
        const response = await api.get(`crud/${id}`)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    function back() {
        history.goBack()
    }

    return (
        <div className="container">
            <br />
            <div className="crud-header">
                <h3>Novo Pedido</h3>
                <Button size="sm" variant="dark" onClick={back}>Voltar</Button>
            </div>
            <br />

            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={model.title} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={3} value={model.description} name="description" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>

            <Select />
        </div>
    )
}


export default Crud;
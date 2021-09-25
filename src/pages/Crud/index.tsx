import React, { useState, useEffect } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import api from '../../services/api'
import moment from 'moment'
import {useHistory } from 'react-router-dom';
import './index.css'
const Crud: React.FC = () => {
    interface ICrud {
        id: number;
        title: string;
        description: string;
        finished: boolean;
        created_at: Date;
        updated_at: Date;

    }
    const [painelCrud, setCrud] = useState<ICrud[]>([])
    const history = useHistory()
    useEffect(() => {
        loadCrud()
    }, [])

    async function loadCrud() {

        const response = await api.get('/crud')
        console.log(response)
        setCrud(response.data)
    }

    async function finishedCD(id: number) {
        await api.patch(`/crud/${id}`)
        loadCrud()
    }


    async function DeleteCD(id: number) {
        await api.delete(`/crud/${id}`)
        loadCrud()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    function newPedido() {
        history.push('/crud_cadastro')
    }

    function editOne(id: number) {
        history.push(`/crud_cadastro/${id}`)
    }

    function view(id: number) {
        history.push(`/crud/${id}`)
    }



    return (
        <div className="container">
            <br />
            <div className="crud-header">
                <h1>Crud</h1>
                <Button size="sm" variant="dark" onClick={newPedido}>Novo pedido</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do pedido</th>
                        <th>Data de atualização</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        painelCrud.map(crud => (
                            <tr key={crud.id}>
                                <td>{crud.id}</td>
                                <td>{crud.title}</td>
                                <td>{formateDate(crud.updated_at)}</td>
                                <td>
                                    <Badge className="text-padrao">
                                        {crud.finished ? "Finalizado" : "Pendente"}
                                    </Badge>

                                </td>
                                <td>
                                    <Button size="sm" disabled={crud.finished} onClick={() => editOne(crud.id)}>Editar</Button>{' '}
                                    <Button variant="success" disabled={crud.finished} size="sm" onClick={() => finishedCD(crud.id)}>Finalizar</Button>{' '}
                                    <Button variant="info" size="sm" onClick={() => view(crud.id)}>Visualizar</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => DeleteCD(crud.id)}>Remover</Button>{' '}



                                </td>

                            </tr>
                        ))
                    }



                </tbody>
            </Table>
        </div>
    )
}


export default Crud;
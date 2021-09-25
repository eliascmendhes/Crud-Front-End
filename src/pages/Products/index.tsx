import React, { useState, useEffect } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import api from '../../services/api'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import './index.css'
const Products: React.FC = () => {
    interface IProducts {
        id: number;
        title: string;
        description: string;
        numberItens: number;
        Value: number;
        ValueUnits: number;
        Price: number;
        available: boolean;
        created_at: Date;
        updated_at: Date;

    }
    const [painelProducts, setProduct] = useState<IProducts[]>([])
    const history = useHistory()
    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {

        const response = await api.get('/products')
        console.log(response)
        setProduct(response.data)
    }

    async function finishedCD(id: number) {
        await api.patch(`/products/${id}`)
        loadProducts()
    }


    async function DeleteCD(id: number) {
        await api.delete(`/products/${id}`)
        loadProducts()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    function newPedido() {
        history.push('/products_cadastro')
    }

    function editOne(id: number) {
        history.push(`/products_cadastro/${id}`)
    }

    function view(id: number) {
        history.push(`/products/${id}`)
    }



    return (
        <div className="container">
            <br />
            <div className="products-header">
                <h1>Produtos</h1>
                <Button size="sm" variant="dark" onClick={newPedido}>Novo Produtos</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Data de atualização</th>
                        <th>Status</th>
                        <th>Quantidade disponível</th>
                        <th>Preço do produto</th>
                        <th>Valor da mercadoria</th>
                        <th>Ações</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        painelProducts.map(products => (
                            <tr key={products.id}>
                                <td>{products.id}</td>
                                <td>{products.title}</td>
                                <td>{formateDate(products.updated_at)}</td>
                                <td>
                                    <Badge className="text-padrao">
                                        {products.available ? "Finalizado" : "Pendente"}
                                    </Badge>

                                </td>

                                <td>
                                    {products.numberItens}
                                </td>

                                <td>{products.Price}</td>

                                <td>
                                    {products.Value}
                                </td>
                                <td className="buttons">
                                    <Button size="sm" disabled={products.available} onClick={() => editOne(products.id)}>Editar</Button>{' '}
                                    <Button variant="success" disabled={products.available} size="sm" onClick={() => finishedCD(products.id)}>Finalizar</Button>{' '}
                                    <Button variant="info" size="sm" onClick={() => view(products.id)}>Visualizar</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => DeleteCD(products.id)}>Remover</Button>{' '}



                                </td>

                            </tr>
                        ))
                    }



                </tbody>
            </Table>
        </div>
    )
}


export default Products;
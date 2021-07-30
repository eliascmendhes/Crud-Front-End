/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from '../../../services/api'
import '../index.css'
interface IProducts {
    title: string;
    description: string;
    numberItens: number;
    Price: number;
    Value: number;

}

interface IParamsProps {
    id: string;
}


const ProductsForm: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<IParamsProps>();


    const [model, setModel] = useState<IProducts>({
        title: '',
        description: '',
        numberItens: 0,
        Value: 0,
        Price: 0
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

            const response = await api.put(`/products/${id}`, model)


        } else {
            const response = await api.post('/products', model)

        }

        back()
    }

    async function findOne(id: string) {
        const response = await api.get(`products/${id}`)
        setModel({
            title: response.data.title,
            description: response.data.description,
            numberItens: response.data.numberItens,
            Value: response.data.Value,
            Price: response.data.Price
        })
    }

    function back() {
        history.goBack()
    }

    return (
        <div className="container">
            <br />
            <div className="products-header">
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

                    <Form.Group >
                        <Form.Label>Quantidade de itens</Form.Label>
                        <Form.Control type="number" name="numberItens" value={model.numberItens} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />

                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Valor em reais</Form.Label>
                        <Form.Control type="number" name="Price" value={model.Price} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />

                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Valor da mercadoria</Form.Label>
                        <Form.Control type="number" name="Value" value={model.Value} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />

                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>

        </div>
    )
}


export default ProductsForm;
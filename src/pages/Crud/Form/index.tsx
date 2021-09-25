/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select'
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from '../../../services/api'
import '../index.css'
interface IProducts {
    title: string;

}
interface ICrud {
    title: string;
    description: string;
    numberItens: number;
    Value: number;


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
        numberItens: 0,
        Value: 0,
    })

    const [products, setproducts] = useState<IProducts>({
        title: '',
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

    function updatedProducts(e: ChangeEvent<HTMLInputElement>) {
        setproducts({
            ...products,
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
            description: response.data.description,
            numberItens: response.data.numberItens,
            Value: response.data.Value,

        })


        setproducts({
            title: response.data.title,
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
                        <Form.Label>Nome do pedido</Form.Label>
                        <Select >
                            {/* <option value={products.title}>{products.title} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProducts(e)}</option> */}
                         {/* <option value={products.title}>{products.title}</option> */}
                        </Select>


                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Valor do pedido</Form.Label>
                        <Form.Control type="number"  value={model.Value} name="Value" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control type="number" value={model.numberItens} name="numberItens" onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}></Form.Control>
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>

        </div>
    )
}


export default Crud;
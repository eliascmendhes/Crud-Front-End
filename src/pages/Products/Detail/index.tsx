/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import { Badge, Button, Card } from 'react-bootstrap';
import api from '../../../services/api'
import moment from 'moment';
interface IParamsProps {
    id: string;
}

interface IProducts {
    id: number;
    title: string;
    description: string;
    available: boolean;
    numberItens: number;
    Value: number;
    Price: number;
    created_at: Date;
    updated_at: Date;

}

const Detail: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<IParamsProps>();
    const [products, setNew] = useState<IProducts>()
    useEffect(() => {
        findOne()
    }, [id])
    function back() {
        history.goBack()
    }

    async function findOne() {
        const response = await api.get<IProducts>(`/products/${id}`)
        console.log(response)
        setNew(response.data)
    }

    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY")
    }




    return (
        <div className="container">
            <br />
            <div className="products-header">
                <h1>products detalhes</h1>
                <Button size="sm" variant="dark" onClick={back} >Voltar</Button>
            </div>
            <br />

            <Card>
                <Card.Body>
                    <Card.Title>{products?.title}</Card.Title>
                    <Card.Text>
                        {products?.description}
                        <br />
                        <Badge className="text-padrao">
                            {products?.available ? "Finalizado" : "Pendente"}
                        </Badge>
                        <br />
                        <strong>Data de cadastro:</strong>
                        <Badge className="text-padrao">
                            {formateDate(products?.created_at)}
                        </Badge>
                        <br />
                        <strong>Número de itens disponível</strong>
                        <p>{products?.numberItens}</p>
                        <br />
                        <strong>Valor da mercadoria:{products?.Value}</strong>
                        <br />
                        <strong>Preço do produto:{products?.Price}</strong>
                        <br />

                        <strong>Atualização:</strong>
                        <Badge className="text-padrao">
                            {formateDate(products?.updated_at)}
                        </Badge>
                    </Card.Text>

                </Card.Body>
            </Card>


        </div>
    )
}

export default Detail;
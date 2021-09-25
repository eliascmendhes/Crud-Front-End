import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Crud from './pages/Crud'
import CrudForm from './pages/Crud/Form'
import CrudDetail from './pages/Crud/Detail'
import Products from './pages/Products'
import ProductForm from './pages/Products/Form'
import Detail from './pages/Products/Detail'
const Routes: React.FC =() =>  {
    return(
        <Switch>
            <Route path="/" exact component={Crud} />
            <Route path="/crud" exact component={Crud} />
            <Route path="/crud_cadastro" exact component={CrudForm} />
            <Route path="/crud_cadastro/:id" exact component={CrudForm} />
            <Route path="/crud/:id" exact component={CrudDetail} />
            <Route path="/products" exact component={Products} />
            <Route path="/products_cadastro" exact component={ProductForm} />
            <Route path="/products_cadastro/:id" exact component={ProductForm} />
            <Route path="/products/:id" exact component={Detail} />









        </Switch>
        )
}


export default Routes;
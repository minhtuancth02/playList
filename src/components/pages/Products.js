import React from 'react'
import '../../App.css'
import Cards from '../Cards'
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import PageNotFound from './PageNotFound';

const Products = () => {
  const { path } = useParams();
    return (
      <div>
        <h1 className="products">PRODUCTS</h1>
        {!path ? <Cards /> : <PageNotFound /> }
      </div>
    );
}

export default Products

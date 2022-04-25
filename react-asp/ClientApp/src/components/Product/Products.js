import React, { useEffect, useState } from 'react';
import { AddProduct } from "./AddProduct";
import { DeleteProduct } from './DeleteProduct'
import { ChangeProduct } from "./ChangeProduct";
import { useLocation } from 'react-router';
import { CustomError } from '../errors/CustomError';
import { useErrorHandler } from 'react-error-boundary'
import '../Manager.css'
import { Spinner } from 'react-bootstrap';

export const renderProductsTable = (products, populateProductsData) => {
  return (
    <table className='table table-striped table-hover' aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Production date</th>
          <th>Customer</th>
          <th>Manage</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) =>
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.weight}</td>
            <td>
              {product.createDate.split("T").join(" ")}</td>
            <td>{product.customerUsername}</td>
            <td className="table-operation">
              <div>
                <DeleteProduct id={product.id} onUpdate={populateProductsData}>{ }</DeleteProduct>
                <ChangeProduct product={product} onUpdate={populateProductsData}>{ }</ChangeProduct>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const errorHandler = useErrorHandler();

  const populateProductsData = async () => {
    setLoading(true);

    try {
      const response = await fetch("api/products");
      if (!response.ok) {
        throw new CustomError(response.status, location.pathname, "Fetch error");
      }

      const data = await response.json();
      setProducts(data);
    }
    catch (err) {
      errorHandler(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    populateProductsData();
  }, []);

  let contents = loading
    ? <Spinner animation="border" role="status" />
    : renderProductsTable(products, () => populateProductsData());

  return (
    <main>
      <section className="product-header">
        <h1 id="tableLabel">Products</h1>
        <AddProduct onUpdate={populateProductsData}>{ }</AddProduct>
      </section>
      {contents}
    </main>
  );
}

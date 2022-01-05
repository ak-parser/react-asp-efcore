import React, { Component } from 'react';
import {AddProduct} from "./AddProduct";
import {DeleteProduct} from './DeleteProduct'
import {ChangeProduct} from "./ChangeProduct";
import '../Manager.css'

export class Products extends Component {
    static displayName = Products.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true};
    }

    componentDidMount() {
        this.populateProductsData();
    }

    static renderProductsTable(products, populateProductsData) {
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
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.weight}</td>
                        <td>
                            {product.createDate.split("T").join(" ")}</td>
                        <td>{product.customerUsername}</td>
                        <td className="table-operation">
                            <div>
                                <DeleteProduct id={product.id} onUpdate={populateProductsData}>{}</DeleteProduct>
                                <ChangeProduct product={product} onUpdate={populateProductsData}>{}</ChangeProduct>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Products.renderProductsTable(this.state.products, () => this.populateProductsData());

        return (
            <main>
                <section className="product-header">
                    <h1 id="tableLabel">Products</h1>
                    <AddProduct onUpdate={() => this.populateProductsData()}>{}</AddProduct>
                </section>
                {contents}
            </main>
        );
    }

    async populateProductsData() {
        const response = await fetch('api/products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}

import React, { Component } from 'react';
import '../Manager.css'
import {AddCustomer} from "./AddCustomer";
import {DeleteCustomer} from "./DeleteCustomer";
import {ChangeCustomer} from "./ChangeCustomer";
import {Products} from '../Product/Products'
import {Accordion} from "react-bootstrap";

export class Customers extends Component {
    static displayName = Customers.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
    }

    componentDidMount() {
        this.populateCustomersData();
    }

    static renderCustomersTable(customers, populateCustomersData) {
        return (
            <Accordion>
            <table className='table table-striped table-hover' aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Manage</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) =>
                    <>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{customer.username}</td>
                            <td>{customer.password}</td>
                            <td className="table-operation">
                                <div>
                                    <DeleteCustomer username={customer.username} onUpdate={populateCustomersData}>{}</DeleteCustomer>
                                    <ChangeCustomer customer={customer} onUpdate={populateCustomersData}>{}</ChangeCustomer>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header style={{padding: "0"}}>Products</Accordion.Header>
                                    <Accordion.Body>
                                        {Products.renderProductsTable(customer.products, populateCustomersData)}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </td>
                        </tr>
                    </>
                )}
                </tbody>
            </table>
            </Accordion>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customers.renderCustomersTable(this.state.customers, () => this.populateCustomersData());

        return (
            <main>
                <section className="product-header">
                    <h1 id="tableLabel" >Customers</h1>
                    <AddCustomer onUpdate={() => this.populateCustomersData()}>{}</AddCustomer>
                </section>
                {contents}
            </main>
        );
    }

    async populateCustomersData() {
        const response = await fetch('api/customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}

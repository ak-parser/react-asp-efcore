import React, { useEffect, useState } from 'react';
import { DeleteCustomer } from "./DeleteCustomer";
import { ChangeCustomer } from "./ChangeCustomer";
import { renderProductsTable } from '../Product/Products'
import { Accordion, Spinner } from "react-bootstrap";
import { useLocation } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { CustomError } from '../errors/CustomError';
import '../Manager.css'

export const Roles = {
  0: "User",
  1: "Admin",
  2: "Manager",
}

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const errorHandler = useErrorHandler();

  const populateCustomersData = async () => {
    setLoading(true);

    try {
      const response = await fetch("api/customers");
      if (!response.ok) {
        throw new CustomError(response.status, location.pathname, "Fetch error");
      }

      const data = await response.json();
      setCustomers(data);
    }
    catch (err) {
      errorHandler(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    populateCustomersData();
  }, []);

  const renderCustomersTable = (customers, populateCustomersData) => {
    return (
      <Accordion>
        <table className='table table-striped table-hover' aria-labelledby="tableLabel">
          <thead>
            <tr>
              <th>№</th>
              <th>Username</th>
              <th>Role</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) =>
              <>
                <tr key={customer.username}>
                  <td>{index + 1}</td>
                  <td>{customer.username}</td>
                  <td>{Roles[customer.role]}</td>
                  <td className="table-operation">
                    <div>
                      <DeleteCustomer username={customer.username} onUpdate={populateCustomersData}>{ }</DeleteCustomer>
                      <ChangeCustomer customer={customer} onUpdate={populateCustomersData}>{ }</ChangeCustomer>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header style={{ padding: "0" }}>Products</Accordion.Header>
                      <Accordion.Body>
                        {renderProductsTable(customer.products, populateCustomersData)}
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

  let contents = loading
    ? <Spinner animation="border" role="status" />
    : renderCustomersTable(customers, populateCustomersData);

  return (
    <main>
      <section className="product-header">
        <h1 id="tableLabel" >Customers</h1>
      </section>
      {contents}
    </main>
  );
}
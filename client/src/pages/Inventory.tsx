import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getInventory, getCollectionPoints, getProducts } from '../service';
import { NavLink } from 'react-router-dom';
import { IGetProducts } from '../models/IGetProducts';
import { IGetCollectionPoints } from '../models/IGetCollectionPoints';
import { IGetInventories } from '../models/IGetInventories';

function Inventory() {
    const [inventories, setInventories] = useState<IGetInventories[]>([]);
    const [filteredInventories, setFilteredInventories] = useState<IGetInventories[]>([]);
    const [selectedCollectionPointId, setSelectedCollectionPointId] = useState<string | null>(null);
    const [collectionPoints, setCollectionPoints] = useState<IGetCollectionPoints[]>([]);
    const [products, setProducts] = useState<IGetProducts[]>([]);


    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCollectionPointId(value === '' ? null : value);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryData = await getInventory('123');
                setInventories(inventoryData);

                const collectionPointData = await getCollectionPoints('123');
                setCollectionPoints(collectionPointData);

                const productData = await getProducts('123');
                setProducts(productData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCollectionPointId !== null) {
            const filteredData = inventories.filter((inventory) => inventory.collectionPointId === selectedCollectionPointId);
            setFilteredInventories(filteredData);
        } else {
            setFilteredInventories(inventories);
        }
    }, [selectedCollectionPointId, inventories]);

    return (
        <>
            <h1>Inventory</h1>

            <div className="row mb-3">
                <div className="col-9">
                    <Form.Select onChange={handleFilterChange}>
                        <option value="">All Collection Points</option>
                        {collectionPoints.map((point) => (
                            <option key={point._id} value={point._id}>
                                {point.collectionPointName}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col-3">
                    <NavLink to="/inventories/add">
                        <Button variant="success" className="w-100">Enter Inventory</Button>
                    </NavLink>
                </div>
            </div>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Collection Point</th>
                        <th>Product</th>
                        <th>Custom Fields</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInventories.map((inventory) => {
                        // Find the collection point with the corresponding ID
                        const collectionPoint = collectionPoints.find((point) => point._id === inventory.collectionPointId);
                        const product = products.find((product) => product._id === inventory.productId);

                        return (
                            <tr key={inventory._id}>
                                <td>{collectionPoint ? collectionPoint.collectionPointName : inventory.collectionPointId}</td>
                                <td>{product ? product.name : inventory.productId}</td>
                                <td>{JSON.stringify(inventory.customFields)}</td>
                                <td>{inventory.quantity}</td>
                                <td>{product ? product.unit : ""}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default Inventory;
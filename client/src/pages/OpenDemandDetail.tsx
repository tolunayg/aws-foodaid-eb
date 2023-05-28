import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDemandById, getDistributionPointById, getProductById } from '../service';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { IGetDemands, RequestItem } from '../models/IGetDemands';
import { Button, Form, Table } from 'react-bootstrap';
import './OpenDemandDetail.css';

function OpenDemandDetail() {
  const location = useLocation();
  const demandId = location.state?.demandId;
  const [distributionPoint, setDistributionPoint] = useState<IGetDistributionPoints | null>(null);
  const [demand, setDemand] = useState<IGetDemands | null>(null);
  const [productMap, setProductMap] = useState<{ [key: string]: any }>({});
  const [inventoryMap, setInventoryMap] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = '123'; // Replace with your actual access token retrieval logic
        const demand = await getDemandById(accessToken, demandId || '');
        setDemand(demand);

        if (demand) {
          const distributionPoint = await getDistributionPointById(accessToken, demand.distributionPointId);
          setDistributionPoint(distributionPoint);

          const productIds = demand.requestItems.map((item: { product: any }) => item.product);
          const products = await Promise.all(productIds.map((productId: string) => getProductById(accessToken, productId)));

          const productMap = products.reduce<{ [key: string]: any }>((map, product) => {
            map[product._id] = product;
            return map;
          }, {});

          setProductMap(productMap);

          // const inventoryData = await Promise.all(
          //   productIds.map((productId: string) => getInventoryByProductId(accessToken, productId))
          // );

          // const inventoryMap = inventoryData.reduce<{ [key: string]: number }>((map, inventory) => {
          //   map[inventory.productId] = inventory.quantity;
          //   return map;
          // }, {});

          // setInventoryMap(inventoryMap);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [demandId]);

  return (
    <>
      <h1>Open Demand Details</h1>
      {demand && distributionPoint && (
        <div>
          <div className="demand-details">
            <p><span className="label">Demand ID:</span> {demandId}</p>
            <p><span className="label">City:</span> {distributionPoint.city}</p>
            <p><span className="label">District:</span> {distributionPoint.district}</p>
            <p><span className="label">Distribution Point Name:</span> {distributionPoint.distributionPointName}</p>
            <p><span className="label">Address:</span> {distributionPoint.address}</p>
          </div>

  
          <h2>Request Items</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Inventory Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demand.requestItems.map((item: RequestItem) => (
                <tr key={item.product}>
                  <td>{productMap[item.product]?.name}</td>
                  <td>{item.quantity} ({productMap[item.product]?.unit})</td>
                  <td>{inventoryMap[item.product]}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
  
          <Form>
            <Form.Group controlId="vehiclePlateNumber">
              <Form.Label>Vehicle Plate Number:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
  
            <Form.Group controlId="collectionPoint">
              <Form.Label>Collection Point:</Form.Label>
              <Form.Control as="select">
                <option value="point1">Collection Point 1</option>
                <option value="point2">Collection Point 2</option>
                <option value="point3">Collection Point 3</option>
              </Form.Control>
            </Form.Group>
  
            <Button variant="primary" onClick={() => console.log("Confirm button clicked")}>
              Confirm
            </Button>
          </Form>
        </div>
      )}
    </>
  );
  
}

export default OpenDemandDetail;

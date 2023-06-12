import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCollectionPoints, getDemandById, getDistributionPointById, getProductById, getInventory, createTransportation } from '../service';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { IGetInventories  } from '../models/IGetInventories';
import { IGetDemands, RequestItem } from '../models/IGetDemands';
import { Button, Form, Table } from 'react-bootstrap';
import './OpenDemandDetail.css';
import { IGetCollectionPoints } from '../models/IGetCollectionPoints';
import { URLEnum } from '../RouterEnum';

function OpenDemandDetail() {
  const location = useLocation();
  const demandId = location.state?.demandId;
  const [distributionPoint, setDistributionPoint] = useState<IGetDistributionPoints | null>(null);
  const [demand, setDemand] = useState<IGetDemands | null>(null);
  const [productMap, setProductMap] = useState<{ [key: string]: any }>({});
  const [inventoryMap, setInventoryMap] = useState<{ [key: string]: number }>({});
  const [collectionPoints, setCollectionPoints] = useState<IGetCollectionPoints[]>([])
  const [selectedCollectionPoint, setSelectedCollectionPoint] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState<string>('');

  const navigate = useNavigate(); // Access the navigate function
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const demand = await getDemandById(accessToken!, demandId || '');
        setDemand(demand);

        if (demand) {
          const distributionPoint = await getDistributionPointById(accessToken!, demand.distributionPointId);
          setDistributionPoint(distributionPoint);

          const productIds = demand.requestItems.map((item: { product: any }) => item.product);
          const products = await Promise.all(productIds.map((productId: string) => getProductById(accessToken!, productId)));

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

    const fetchCollectionPointsData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const collectionPointData = await getCollectionPoints(accessToken!);
        setCollectionPoints(collectionPointData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollectionPointsData();

    const fetchInventoryData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const inventoryData:IGetInventories[] = await getInventory(accessToken!);
        console.log('inventoryData', inventoryData);

        const inventoryMap = inventoryData.reduce<{ [key: string]: number }>((map, inventory) => {
          // Check if the inventory belongs to the selected collection point
          if (inventory.collectionPointId === selectedCollectionPoint) {
            map[inventory.productId] = inventory.quantity;
          }
          return map;
        }, {});

        setInventoryMap(inventoryMap);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch inventory data only if a collection point is selected
    if (selectedCollectionPoint) {
      fetchInventoryData();
    }
  }, [demandId, selectedCollectionPoint]);

  // Define the type of the event parameter in the event handler
  const handleCollectionPointChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCollectionPoint = event.target.value;
    // Update the state or perform any other necessary actions
    setSelectedCollectionPoint(selectedCollectionPoint);
  };

  const handleVehiclePlateNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const plateNumber = event.target.value;
    setVehiclePlateNumber(plateNumber);
  };
  
  const handleVehicleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setVehicleType(type);
  };

  // Function to handle the Confirm button click
  const handleConfirmButtonClick = async () => {
    try {
      const accessToken = localStorage.getItem('token');
  
      // Create the transportation object using the selected values
      const transportation = {
        demandId: demandId,
        collectionPointId: selectedCollectionPoint,
        vehicleType: vehicleType,
        vehiclePlate: vehiclePlateNumber,
      };
  
      // Call the createTransportation service to make the POST request
      const response = await createTransportation(accessToken!, transportation);
      console.log('Transportation created:', response);
      navigate(URLEnum.OPEN_DEMANDS)
  
      // Perform any additional actions upon successful creation of transportation
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <h1 className="display-4">Open Demand Details</h1>
      {demand && distributionPoint && (
        <div>
          <div className="demand-details">
            <p><span className="label">Demand ID:</span> {demandId}</p>
            <p><span className="label">City:</span> {distributionPoint.city}</p>
            <p><span className="label">District:</span> {distributionPoint.district}</p>
            <p><span className="label">Distribution Point Name:</span> {distributionPoint.distributionPointName}</p>
            <p><span className="label">Address:</span> {distributionPoint.address}</p>
          </div>

  
          
          <br/>
          <Form>
            <Form.Group controlId="collectionPoint">
              <Form.Label>Collection Point:</Form.Label>
              <Form.Control as="select" onChange={handleCollectionPointChange as any}>
                <option value="">Select a collection point</option>
                {collectionPoints.map((point) => (
                  <option key={point._id} value={point._id}>
                    {point.collectionPointName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <br/>

            <h2>Request Items</h2>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Custom Fields</th>
                  <th>Quantity</th>
                  <th>Satisfied Quantity</th>
                  <th>Unsatisfied Quantity</th>
                  <th>Inventory Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {demand.requestItems.map((item: RequestItem) => (
                  <tr key={item.product}>
                    <td>{productMap[item.product]?.name}</td>
                    <td>{JSON.stringify(item.customFields)}</td>
                    <td>{item.quantity} {productMap[item.product]?.unit}</td>
                    <td>{item.satisfiedQuantity} {productMap[item.product]?.unit}</td>
                    <td>{item.unSatisfiedQuantity} {productMap[item.product]?.unit}</td>
                    <td>{inventoryMap[item.product]} {productMap[item.product]?.unit}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>


            <Form.Group controlId="vehiclePlateNumber">
              <Form.Label>Vehicle Plate Number:</Form.Label>
              <Form.Control type="text" value={vehiclePlateNumber} onChange={handleVehiclePlateNumberChange} />
            </Form.Group>

            <Form.Group controlId="vehicleType">
              <Form.Label>Vehicle Type:</Form.Label>
              <Form.Control as="select" value={vehicleType} onChange={handleVehicleTypeChange as any}>
                <option value="">Select a vehicle type</option>
                <option key="Truck" value="Truck">Truck</option>
                <option key="Bus" value="Bus">Bus</option>
                <option key="Van" value="Van">Van</option>
              </Form.Control>
            </Form.Group>
  

            <br/>
            <Button variant="primary" onClick={handleConfirmButtonClick}>
              Confirm
            </Button>
          </Form>
        </div>
      )}
    </>
  );
  
}

export default OpenDemandDetail;

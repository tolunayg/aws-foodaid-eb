import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { approveTransportationById, getTransportations, getUsers, getCollectionPoints, getDistributionPoints } from '../service';
import { IGetTransportation } from '../models/IGetTransportation';
import { IGetUser } from '../models/IGetUser';
import { IGetCollectionPoints } from '../models/IGetCollectionPoints';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { URLEnum } from '../RouterEnum';
import { useNavigate } from 'react-router-dom';

function Transportation() {
  const [transportations, setTransportations] = useState<IGetTransportation[]>([]);
  const [filteredTransportations, setFilteredTransportations] = useState<IGetTransportation[]>([]);
  const [selectedDistributionPointId, setSelectedDistributionPointId] = useState<string | null>(null);
  const [selectedCollectionPointId, setSelectedCollectionPointId] = useState<string | null>(null);
  const [users, setUsers] = useState<Record<string, IGetUser>>({});
  const [collectionPoints, setCollectionPoints] = useState<Record<string, IGetCollectionPoints>>({});
  const [distributionPoints, setDistributionPoints] = useState<Record<string, IGetDistributionPoints>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTransportationId, setSelectedTransportationId] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = user?.roles || [];

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const transportationData = await getTransportations(accessToken!);
      setTransportations(transportationData);

      const userData = await getUsers(accessToken!);
      const collectionPointsData = await getCollectionPoints(accessToken!);
      const distributionPointsData = await getDistributionPoints(accessToken!);

      // Create a dictionary with userId as the key and user object as the value
      const userDictionary: Record<string, IGetUser> = {};
      userData.forEach((user: IGetUser) => {
        userDictionary[user._id] = user;
      });

      setUsers(userDictionary);

      // Create a dictionary with collectionPointId as the key and collection point object as the value
      const collectionPointsDictionary: Record<string, IGetCollectionPoints> = {};
      collectionPointsData.forEach((collectionPoint: IGetCollectionPoints) => {
        collectionPointsDictionary[collectionPoint._id] = collectionPoint;
      });

      setCollectionPoints(collectionPointsDictionary);

      // Create a dictionary with distributionPointId as the key and distribution point object as the value
      const distributionPointsDictionary: Record<string, IGetDistributionPoints> = {};
      distributionPointsData.forEach((distributionPoint: IGetDistributionPoints) => {
        distributionPointsDictionary[distributionPoint._id] = distributionPoint;
      });

      setDistributionPoints(distributionPointsDictionary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDistributionPointId !== null && selectedCollectionPointId !== null) {
      const filteredData = transportations.filter((demand) => demand.distributionPointId === selectedDistributionPointId)
                                          .filter((demand) => demand.collectionPointId === selectedCollectionPointId);
      setFilteredTransportations(filteredData);
    } else if (selectedDistributionPointId !== null) {
      const filteredData = transportations.filter((demand) => demand.distributionPointId === selectedDistributionPointId)
      setFilteredTransportations(filteredData);
    } else if (selectedCollectionPointId !== null) {
      const filteredData = transportations.filter((demand) => demand.collectionPointId === selectedCollectionPointId)
      setFilteredTransportations(filteredData);
    } else {
      setFilteredTransportations(transportations);
    }

  }, [selectedDistributionPointId, selectedCollectionPointId, transportations]);

  const handleRefresh = () => {
    fetchData();
  };

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleString();
    return formattedDate !== "Invalid Date" ? formattedDate : <i className="fa fa-truck" aria-hidden="true"></i>;
  };
  
  const formatId = (id: string) => {
    if (id.length < 9) {
      return id; // Return the original ID if it is shorter than 9 characters
    }
  
    const lastNineCharacters = id.substr(id.length - 9);
    const formattedId = `${lastNineCharacters.substr(0, 3)} ${lastNineCharacters.substr(3, 3)} ${lastNineCharacters.substr(6, 3)}`;
    return formattedId;
  };

  const handleApproveClick = (transportationId: string) => {
    setSelectedTransportationId(transportationId);
    setShowConfirmationModal(true);
  };

  const handleConfirmApprove = async () => {
    if (selectedTransportationId) {
      try {
        const accessToken = localStorage.getItem('token');
        await approveTransportationById(accessToken!, selectedTransportationId);
        // Perform any additional actions after successful approval
        handleRefresh();

      } catch (error) {
        console.error(error);
      }
    }
    setShowConfirmationModal(false);
  };

  const handleCancelApprove = () => {
    setShowConfirmationModal(false);
  };

  const handleDistributionPointFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDistributionPointId(value === '' ? null : value);
  };

  const handleCollectionPointFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCollectionPointId(value === '' ? null : value);
  };

  return (
    <>
      <h1 className="display-4">Transportation</h1>
      
      <div className="row mb-3">
        <div className="col-4">
          <Form.Select onChange={handleDistributionPointFilterChange}>
            <option value="">All Distribution Points</option>
            {Object.values(distributionPoints).map((point) => (
              <option key={point._id} value={point._id}>
                {point.distributionPointName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-4">
          <Form.Select onChange={handleCollectionPointFilterChange}>
            <option value="">All Collection Points</option>
            {Object.values(collectionPoints).map((point) => (
              <option key={point._id} value={point._id}>
                {point.collectionPointName}
              </option>
            ))}
          </Form.Select>
        </div>
        
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Vehicle Plate</th>
            <th>Demand ID</th>
            <th>Collection Point</th>
            <th>Distribution Point</th>
            <th>Loading Date</th>
            <th>Arriving Date</th>
            <th>Approved User</th>
            {roles.includes('distribution-staff') && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredTransportations.map((transportation) => {
            const user = users[transportation.approvedUser];
            const userName = user ? `${user.firstName} ${user.lastName}` : "-";
            const collectionPoint = collectionPoints[transportation.collectionPointId];
            const collectionPointName = collectionPoint ? collectionPoint.collectionPointName : transportation.collectionPointId;
            const distributionPoint = distributionPoints[transportation.distributionPointId];
            const distributionPointName = distributionPoint ? distributionPoint.distributionPointName : transportation.distributionPointId;
  
            return (
              <tr key={transportation._id}>
                <td>{transportation.vehicleType}</td>
                <td>{transportation.vehiclePlate}</td>
                <td>{formatId(transportation.demandId)}</td>
                <td>{collectionPointName}</td>
                <td>{distributionPointName}</td>
                <td>{formatDate(transportation.loadingDate)}</td>
                <td>{formatDate(transportation.arrivingDate)}</td>
                <td>{userName}</td>
                {roles.includes('distribution-staff') && (
                  <td>
                  {new Date(transportation.arrivingDate).toLocaleString() === "Invalid Date" && (
                    <Button variant="success btn-sm" onClick={() => handleApproveClick(transportation._id)}>
                      Approve
                    </Button>
                  )}
                  </td>
                )}

                
              </tr>
            );
          })}
        </tbody>
      </Table>
  
      <Modal show={showConfirmationModal} onHide={handleCancelApprove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to approve this transportation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelApprove}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmApprove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
  


}

export default Transportation;

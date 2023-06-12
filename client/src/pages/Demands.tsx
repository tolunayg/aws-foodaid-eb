import React, { useEffect, useState } from 'react';
import { getDemands, getDistributionPoints, getUsers } from '../service';
import { Table, Button, Form } from 'react-bootstrap';
import { IGetDemands } from '../models/IGetDemands';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { NavLink } from 'react-router-dom';
import DemandDetail from '../components/DemandDetail';
import { IGetUser } from '../models/IGetUser';

function Demands() {
  const [demands, setDemands] = useState<IGetDemands[]>([]);
  const [filteredDemands, setFilteredDemands] = useState<IGetDemands[]>([]);
  const [selectedDistributionPointId, setSelectedDistributionPointId] = useState<string | null>(null);
  const [distributionPoints, setDistributionPoints] = useState<IGetDistributionPoints[]>([]);
  const [selectedDemand, setSelectedDemand] = useState<IGetDemands>();
  const [users, setUsers] = useState<Record<string, IGetUser>>({});
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const demandData = await getDemands(accessToken!);
        setDemands(demandData);

        const userData = await getUsers(accessToken!);
        
        // Create a dictionary with userId as the key and user object as the value
        const userDictionary: Record<string, IGetUser> = {};
        userData.forEach((user: IGetUser) => {
          userDictionary[user._id] = user;
        });

        setUsers(userDictionary);

        const distributionPointData = await getDistributionPoints(accessToken!);
        setDistributionPoints(distributionPointData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDistributionPointId !== null && selectedStatus !== null) {
      const filteredData = demands.filter((demand) => demand.distributionPointId === selectedDistributionPointId)
                                  .filter((demand) => getStatus(demand) === selectedStatus)
      setFilteredDemands(filteredData);
    } else if 
    (selectedDistributionPointId !== null ) {
      const filteredData = demands.filter((demand) => demand.distributionPointId === selectedDistributionPointId);
      setFilteredDemands(filteredData);
    } else if 
    (selectedStatus !== null ) {
      const filteredData = demands.filter((demand) => getStatus(demand) === selectedStatus);
      setFilteredDemands(filteredData);
    } else {
      setFilteredDemands(demands);
    }
  }, [selectedDistributionPointId, selectedStatus, demands]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDistributionPointId(value === '' ? null : value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value === '' ? null : value);
  };

  const handleDemandClick = (demand: IGetDemands) => {
    setSelectedDemand(demand);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDemand(undefined);
    setShowModal(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const getUserName = (id: string) => {
    const user = users[id];
    return user ? `${user.firstName} ${user.lastName}` : '-';
  };

  const formatId = (id: string) => {
    if (id.length < 9) {
      return id; // Return the original ID if it is shorter than 9 characters
    }
  
    const lastNineCharacters = id.substr(id.length - 9);
    const formattedId = `${lastNineCharacters.substr(0, 3)} ${lastNineCharacters.substr(3, 3)} ${lastNineCharacters.substr(6, 3)}`;
    return formattedId;
  };

  const getStatus = (demand: IGetDemands) => {
    const statuses = demand.requestItems.map((item) => item.status);

    if (statuses.every((status) => status === 'COMPLETED')) {
      return 'COMPLETED';
    } else if (statuses.some((status) => status === 'IN_PROGRESS')) {
      return 'IN_PROGRESS';
    } else {
      return 'CREATED';
    }
  };

  return (
    <>
      <h1 className="display-4">Demands</h1>
  
      <div className="row mb-3">
        <div className="col-4">
          <Form.Select onChange={handleFilterChange}>
            <option value="">All Distribution Points</option>
            {distributionPoints.map((point) => (
              <option key={point._id} value={point._id}>
                {point.distributionPointName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-4">
          <Form.Select onChange={handleStatusFilterChange}>
            <option value="">All Status</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="CREATED">CREATED</option>
          </Form.Select>
        </div>
        <div className="col-4">
            <NavLink to="/demands/add">
              <Button variant="success" className="w-100">
                New Demand
              </Button>
            </NavLink>
          </div>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Distribution Point ID</th>
            <th>Creation Date</th>
            <th>Created By</th>
            <th>Last Modified Date</th>
            <th>Last Modified By</th>
            <th>Status</th> {/* New column for Status */}
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map((demand) => {
            // Find the distribution point with the corresponding ID
            const distributionPoint = distributionPoints.find((point) => point._id === demand.distributionPointId);

            return (
              <tr key={demand._id} onClick={() => handleDemandClick(demand)}>
                <td>{formatId(demand._id)}</td>
                <td>{distributionPoint ? distributionPoint.distributionPointName : ''}</td>
                <td>{formatDate(demand.creationDate)}</td>
                <td>{getUserName(demand.createdBy)}</td>
                <td>{formatDate(demand.lastModifiedDate)}</td>
                <td>{getUserName(demand.lastModifiedBy)}</td>
                <td>{getStatus(demand)}</td> {/* Render the Status */}
              </tr>
            );
          })}
        </tbody>
      </Table>

  
      <DemandDetail demand={selectedDemand} showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
  

}

export default Demands;

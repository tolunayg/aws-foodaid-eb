import React, { useEffect, useState } from 'react';
import { getDemands, getDistributionPoints } from '../service';
import { Table, Button, Form } from 'react-bootstrap';
import { IGetDemands } from '../models/IGetDemands';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { NavLink } from 'react-router-dom';
import OpenDemandDetailComponent from '../components/OpenDemandDetailComponent';
import './OpenDemands.css';

function OpenDemands() {
  const [demands, setDemands] = useState<IGetDemands[]>([]);
  const [filteredDemands, setFilteredDemands] = useState<IGetDemands[]>([]);
  const [selectedDistributionPointId, setSelectedDistributionPointId] = useState<string | null>(null);
  const [distributionPoints, setDistributionPoints] = useState<IGetDistributionPoints[]>([]);
  const [selectedDemand, setSelectedDemand] = useState<IGetDemands>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const demandData = await getDemands(accessToken!);
        setDemands(demandData);

        const distributionPointData = await getDistributionPoints(accessToken!);
        setDistributionPoints(distributionPointData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDistributionPointId !== null) {
      const filteredData = demands.filter((demand) => demand.distributionPointId === selectedDistributionPointId);
      setFilteredDemands(filteredData);
    } else {
      setFilteredDemands(demands);
    }
  }, [selectedDistributionPointId, demands]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedDistributionPointId(value === '' ? null : value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const handleDemandClick = (demand: IGetDemands) => {
    setSelectedDemand(demand);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDemand(undefined);
    setShowModal(false);
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
      <h1 className="display-4">OpenDemands</h1>
  
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
                <td>{demand._id}</td>
                <td>{distributionPoint ? distributionPoint.distributionPointName : ''}</td>
                <td>{formatDate(demand.creationDate)}</td>
                <td>{demand.createdBy}</td>
                <td>{formatDate(demand.lastModifiedDate)}</td>
                <td>{demand.lastModifiedBy}</td>
                <td>{getStatus(demand)}</td> {/* Render the Status */}
              </tr>
            );
          })}
        </tbody>
      </Table>

  
      <OpenDemandDetailComponent
        demand={selectedDemand}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        demandStatus={selectedDemand ? getStatus(selectedDemand) : ''}
      />
    </>
  );
  

}

export default OpenDemands;

import React, { useEffect, useState } from 'react';
import { getDemands, getDistributionPoints } from '../service';
import { Table, Button, Form } from 'react-bootstrap';
import { IGetDemands } from '../models/IGetDemands';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { NavLink } from 'react-router-dom';

function Demands() {
  const [demands, setDemands] = useState<IGetDemands[]>([]);
  const [filteredDemands, setFilteredDemands] = useState<IGetDemands[]>([]);
  const [selectedDistributionPointId, setSelectedDistributionPointId] = useState<string | null>(null);
  const [distributionPoints, setDistributionPoints] = useState<IGetDistributionPoints[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demandData = await getDemands('123');
        setDemands(demandData);

        const distributionPointData = await getDistributionPoints('123');
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


  return (
    <>
      <h1>Demands</h1>

      <div className="row mb-3">
        <div className="col-9">
          <Form.Select onChange={handleFilterChange}>
            <option value="">All Distribution Points</option>
            {distributionPoints.map((point) => (
              <option key={point._id} value={point._id}>
                {point.distributionPointName}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-3">
          <NavLink to="/demands/add">
            <Button variant="success" className="w-100">New Demand</Button>
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
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map((demand) => {
            // Find the distribution point with the corresponding ID
            const distributionPoint = distributionPoints.find((point) => point._id === demand.distributionPointId);

            return (
              <tr key={demand._id}>
                <td>{demand._id}</td>
                <td>{distributionPoint ? distributionPoint.distributionPointName : ''}</td>
                <td>{demand.creationDate.toLocaleString()}</td>
                <td>{demand.createdBy}</td>
                <td>{demand.lastModifiedDate.toLocaleString()}</td>
                <td>{demand.lastModifiedBy}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );

}

export default Demands;

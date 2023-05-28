import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { URLEnum } from '../RouterEnum'
import { NavLink } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import './Dashboard.css';

function Dashboard() {
  return (
        <div className='mt-5'>

          <Row xs={1} md={2} lg={2} xl={2} className="g-4" >
              <Col key="users">
                <Card as={NavLink} to={URLEnum.USERS} className="card-hover" >
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>Users</Card.Title>
                    <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                      This is a summary of users.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col key="centers">
                <Card as={NavLink} to={URLEnum.CENTERS} className="card-hover" >
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>Centers</Card.Title>
                    <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                      This is a summary of centers.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col key="open-demands">
                <Card as={NavLink} to={URLEnum.OPEN_DEMANDS} className="card-hover" >
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>Open Demands</Card.Title>
                    <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                      This is a summary of open demands.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col key="food">
                <Card as={NavLink} to={URLEnum.FOOD} className="card-hover" >
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>Food</Card.Title>
                    <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                      Registered foods on the system.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col key="distribution-points">
                <Card as={NavLink} to={URLEnum.DISTRIBUTION_POINT} className="card-hover" >
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>Distribution Points</Card.Title>
                    <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                      This is a summary of distribution points.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          </Row>

        </div>
  );
}

// export default withAuthenticationRequired(Dashboard);
export default Dashboard;
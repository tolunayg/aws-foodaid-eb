import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { URLEnum } from '../RouterEnum';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

// Import icons

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = user?.roles || [];
  const username = user?.name || 'User';

  return (
    <>
      <h1 className="display-4">Welcome, {username}</h1>

      <div className="mt-5">
        <Row xs={1} md={2} lg={2} xl={2} className="g-4">
          {roles.includes('management-staff') && (
            <>
              <Col key="food">
                <Card as={NavLink} to={URLEnum.FOOD} className="card-hover text-white card2 card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Food</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      Registered foods on the system.
                    </Card.Text>
                    <i className="fas fa-utensils fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
              <Col key="distribution-points">
                <Card as={NavLink} to={URLEnum.DISTRIBUTION_POINT} className="card-hover text-white card3 card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Distribution Points</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      This is a summary of distribution points.
                    </Card.Text>
                    <i className="fas fa-building fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
              <Col key="collection-points">
                <Card as={NavLink} to={URLEnum.COLLECTION_POINT} className="card-hover card4 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Collection Points</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      This is a summary of collection points.
                    </Card.Text>
                    <i className="fas fa-building fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          {roles.includes('distribution-staff') && (
            <>
              <Col key="demands">
                <Card as={NavLink} to={URLEnum.DEMANDS} className="card-hover card5 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Demands</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      Registered demands on the system.
                    </Card.Text>
                    <i className="fas fa-building fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
              <Col key="transportations">
                <Card as={NavLink} to={URLEnum.TRANSPORTATION} className="card-hover card1 text-dark card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Transportations</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      This is a summary of transportations.
                    </Card.Text>
                    <i className="fas fa-truck fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          {roles.includes('collection-staff') && (
            <>
              <Col key="inventory">
                <Card as={NavLink} to={URLEnum.INVENTORY} className="card-hover card2 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Inventory</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      Inventory on the system.
                    </Card.Text>
                    <i className="fas fa-box fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
              <Col key="transportations">
                <Card as={NavLink} to={URLEnum.TRANSPORTATION} className="card-hover card3 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Transportations</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      This is a summary of transportations.
                    </Card.Text>
                    <i className="fas fa-truck fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
              <Col key="open-demands">
                <Card as={NavLink} to={URLEnum.OPEN_DEMANDS} className="card-hover card4 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Open Demands</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      Open Demands page.
                    </Card.Text>
                    <i className="fas fa-hand fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          {roles.includes('admin') && (
            <>
              <Col key="user">
                <Card as={NavLink} to={URLEnum.USERS} className="card-hover card5 text-white card-special">
                  <Card.Body>
                    <Card.Title className="text-truncate" style={{ maxHeight: '3.6em' }}>Users</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxHeight: '3.6em' }}>
                      Users on the system.
                    </Card.Text>
                    <i className="fas fa-users fa-3x float-end"></i> {/* Font Awesome icon */}
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

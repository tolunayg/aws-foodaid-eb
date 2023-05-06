
import React, { useEffect, useState } from 'react'
import { getProducts } from '../service'
import { IGetProducts } from '../models/IGetProducts';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Form from '../components/locationselectform'
import MyComponent from '../components/foodform'
import { Button, Card, Col, Modal, Nav, Row } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import ProductDetail from '../components/ProductDetail';

function Food() {
  const [productData, setProductData] = useState<IGetProducts[]>()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IGetProducts>();
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = await getAccessTokenSilently();
        const data = await getProducts(accessToken);
        setProductData(data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);

  const handleCardClick = (product: IGetProducts) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(undefined);
    setShowModal(false);
  };


  return (
    <>
        <h1>Food</h1>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <NavLink to="/food/add">
            <Button variant="primary" type="submit">Add Food</Button>
          </NavLink>
          <NavLink to="/food/edit">
            <Button variant="warning" type="submit">Edit Food</Button>
          </NavLink>
        </div>


        <Row xs={1} md={2} lg={2} xl={3} className="g-4">
        {productData?.map((product) => (
          <Col key={product._id}>
            <Card onClick={() => handleCardClick(product)} className="card-hover">
              <Card.Body>
                <Card.Title className="text-truncate" style={{maxHeight: '3.6em'}}>{product.name}</Card.Title>
                <Card.Text className="text-truncate" style={{maxHeight: '3.6em'}}>
                  This is a summary of {product.name}.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
     
      {/* <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Description of the product
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleCloseModal}>Save changes</Button>
        </Modal.Footer>
      </Modal> */}


        <ProductDetail product={selectedProduct} showModal={showModal} handleCloseModal={handleCloseModal} />
      

        {/* <Form/>
        <MyComponent/>  */}
      
    </>
  )
}

export default withAuthenticationRequired(Food);

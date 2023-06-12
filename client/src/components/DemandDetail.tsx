
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetDemands } from '../models/IGetDemands';
import { IGetProductCategory } from '../models/IGetProductCategories';
import { useNavigate } from 'react-router-dom';
import { URLEnum } from '../RouterEnum';
import { getDistributionPointById, getProductById } from '../service';
import { IGetDistributionPoints } from '../models/IGetDistributionPoints';
import { IGetProducts } from '../models/IGetProducts';


interface Props {
    demand?: IGetDemands;
    showModal: boolean;
    handleCloseModal: () => void;
  }


function DemandDetail({ showModal, handleCloseModal, demand }: Props) {
    const [distributionPointName, setDistributionPointName] = useState('');
    const [products, setProducts] = useState<IGetProducts[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const accessToken = localStorage.getItem('token');
            const distributionPoint = await getDistributionPointById(accessToken!, demand?.distributionPointId || '');
            setDistributionPointName(distributionPoint.distributionPointName);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();

        // Fetch product details and retrieve names from the product id
        const fetchProducts = async () => {
          try {
            const accessToken = localStorage.getItem('token');
            const products: IGetProducts[] = [];
    
            for (const requestItem of demand?.requestItems || []) {
              const product = await getProductById(accessToken!, requestItem.product);
              products.push(product);
            }
    
            setProducts(products);
          } catch (error) {
            console.error(error);
          }
        };

        fetchProducts();

      }, [demand]);
      

    const navigate = useNavigate()

    const handleCancelClicked = (id:string) => {
        console.log("Cancel Demand Clicked!");
    };
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Demand</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <p>Category: {product?.productCategoryId}</p> */}
            <p>Distribution Point Name: {distributionPointName}</p>
            <p>Product Details:</p>
            <ul>
              {demand?.requestItems.map((requestItem, index) => {
                const product = products.find((p) => p._id === requestItem.product);

                if (!product) return null;

                return (
                  <li key={index}>
                    <p>{product.name}</p>
                    <p>Quantity: {requestItem.quantity} ({product.unit})</p>
                    <ul>
                      {Object.entries(requestItem.customFields).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={() => demand?._id && handleCancelClicked(demand._id)}>
                Cancel Demand
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            {/* <Button variant="primary" onClick={() => demand?._id && handleEditClicked(demand._id)}>
                Edit
            </Button> */}
            </Modal.Footer>
        </Modal>
        );
}

// export default withAuthenticationRequired(DemandDetail);
export default DemandDetail;
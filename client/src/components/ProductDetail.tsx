
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IGetProducts } from '../models/IGetProducts';
import { IGetProductCategory } from '../models/IGetProductCategories';
import { useNavigate } from 'react-router-dom';
import { URLEnum } from '../RouterEnum';
import { getProductCategoryById } from '../service';
import './ProductDetail.css';


interface Props {
    product?: IGetProducts;
    showModal: boolean;
    handleCloseModal: () => void;
  }


function ProductDetail({ showModal, handleCloseModal, product }: Props) {
    const [productCategory, setProductCategory] = useState<IGetProductCategory>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const accessToken = localStorage.getItem('token');
            const category = await getProductCategoryById(accessToken!, product?.productCategoryId || '');
            setProductCategory(category);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, [product]);
      
      

    const navigate = useNavigate()

    const handleEditClicked = (id:string) => {
        console.log("EDIT CLICKED!!");
        navigate('/food/add', { state: { productId: id } });
      };
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>{product?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Description lorem ipsum</p>
            <div className="product-details">
              <p><span className="label">Category:</span> {productCategory?.name}</p>
              <p><span className="label">Unit:</span> {product?.unit}</p>
              <p><span className="label">Id:</span> {product?._id}</p>
              {product && Object.entries(product.fields).map(([key, value]) => (
                <p key={key}><span className="label">{key}:</span> {value}</p>
              ))}
            </div>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            <Button variant="primary" onClick={() => product?._id && handleEditClicked(product._id)}>
                Edit
            </Button>
            </Modal.Footer>
        </Modal>
        );
}

// export default withAuthenticationRequired(ProductDetail);
export default ProductDetail;
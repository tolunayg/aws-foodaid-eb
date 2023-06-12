import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button, Col, Form } from 'react-bootstrap';
import { getCollectionPoints, getProducts, addInventory } from '../../service'; // Replace 'your-api-file' with the actual file containing the API functions
import { IGetProducts } from '../../models/IGetProducts'; // Replace 'your-models-file' with the actual file containing the interfaces
import { IGetCollectionPoints } from '../../models/IGetCollectionPoints'; // Replace 'your-models-file' with the actual file containing the interfaces
import { useNavigate } from 'react-router-dom';
import { URLEnum } from '../../RouterEnum';

function InventoryForm() {
  interface IInventoryItem {
    productId: string;
    quantity: number;
    customFields: {
      [key: string]: string;
    };
  }
  
  const navigate = useNavigate()
  const [collectionPoints, setCollectionPoints] = useState<IGetCollectionPoints[]>([]);
  const [products, setProducts] = useState<IGetProducts[]>([]);

  const formik = useFormik({
    initialValues: {
      collectionPointId: '',
      items: [{ productId: '', quantity: 0, customFields: {} }],
    },
    onSubmit: async (values) => {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await addInventory(accessToken!, values);
        // Handle success response
        navigate(URLEnum.INVENTORY);

      } catch (error) {
        console.error('API error:', error);
        // Handle error
      }
    },
    validate: (values) => {
      const errors: {
        collectionPointId?: string;
        items?: Array<{ product?: string; unit?: string }>;
      } = {};

      if (!values.collectionPointId) {
        errors.collectionPointId = 'Collection Point is required';
      }

      values.items.forEach((item, index) => {
        if (!item.productId) {
          if (!errors.items) {
            errors.items = [];
          }
          if (!errors.items[index]) {
            errors.items[index] = {};
          }
          errors.items[index].product = 'Product is required';
        }

        if (!item.quantity) {
          if (!errors.items) {
            errors.items = [];
          }
          if (!errors.items[index]) {
            errors.items[index] = {};
          }
          errors.items[index].unit = 'Unit is required';
        }
      });

      // console.log(errors)
      return errors;
    },

  });

  useEffect(() => {
    const fetchCollectionPoints = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const points = await getCollectionPoints(accessToken!);
        setCollectionPoints(points);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const products = await getProducts(accessToken!);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollectionPoints();
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    const newItems = [...formik.values.items, { productId: '', quantity: 0, customFields: {} }];
    formik.setFieldValue('items', newItems);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newRequestItems = [...formik.values.items];
    newRequestItems[index].productId = event.target.value;
  
    // Check if the selected product has a custom field of boolean type
    const selectedProduct = products.find((product) => product._id === event.target.value);
  
    if (selectedProduct && selectedProduct.fields) {
      Object.entries(selectedProduct.fields).forEach(([field, fieldType]) => {
        if (fieldType === 'boolean') {
          const customFields: { [x: string]: string } = { ...newRequestItems[index].customFields };
          customFields[field] = 'false';
          newRequestItems[index].customFields = customFields;
        }
      });
    }
  
    formik.setFieldValue('requestItems', newRequestItems);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newItems = [...formik.values.items];
    newItems[index].quantity = Number(event.target.value);
    formik.setFieldValue('items', newItems);
  };

  const handleCustomFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const { value, type } = event.target;

    const newItems: IInventoryItem[] = [...formik.values.items];
    const customFields = { ...newItems[index].customFields };

    if (type === 'checkbox') {
      var isChecked = (event.target as HTMLInputElement).checked;
      customFields[field] = isChecked ? 'true' : 'false';
    } else {
      customFields[field] = value;
    }

    newItems[index].customFields = customFields;
    formik.setFieldValue('items', newItems);
  };



  return (
    <>
      <h1 className="display-4">Add Inventory</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Collection Point</Form.Label>
          <Form.Select
            id="collectionPointId"
            name="collectionPointId"
            value={formik.values.collectionPointId}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.collectionPointId} // Highlight invalid field
          >
            <option value="">Select a collection point</option>
            {collectionPoints.map((point) => (
              <option key={point._id} value={point._id}>
                {point.collectionPointName}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.collectionPointId}
          </Form.Control.Feedback>
        </Form.Group>

        {formik.values.items.map((item, index) => (
          <div key={index} className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={item.productId}
                onChange={(event) => handleProductChange(event, index)}
                isInvalid={!!(formik.errors.items?.[index] as FormikErrors<{
                  product: string;
                  unit: number;
                  customFields: {};
                }>)?.product} // Highlight invalid field
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {(formik.errors.items?.[index] as FormikErrors<{
                  product: string;
                  unit: number;
                  customFields: {};
                }>)?.product}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Quantity {`(${products.find((product) => product._id === item.productId)?.unit})`}
              </Form.Label>
              <Form.Control
                type="number"
                value={item.quantity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(event, index)}
                isInvalid={ // Highlight invalid field
                  !!(formik.errors as any)[`requestItems[${index}].unit`] ||
                  (item.quantity === 0 && formik.touched.items?.[index]?.quantity)
                }
                required // Add the "required" attribute
              />
              <Form.Control.Feedback type="invalid">
                {(formik.errors as any)[`requestItems[${index}].unit`]}
              </Form.Control.Feedback>
            </Form.Group>


            {/* Render custom fields for the selected product */}
            {item.productId && products.find((product) => product._id === item.productId)?.fields && (
              <>
                {Object.entries(products.find((product) => product._id === item.productId)?.fields || {}).map(([field, fieldType]) => (
                  <Form.Group key={field} className="mb-3">
                    <Form.Label>{field}</Form.Label>
                    {fieldType === 'boolean' ? (
                      <Col>
                        <Form.Check
                          type="checkbox"
                          onChange={(event) => handleCustomFieldChange(event, index, field)}
                        />
                      </Col>
                    ) : fieldType === 'numeric' ? (
                      <Col>
                        <Form.Control
                          type="number"
                          value={(item.customFields as { [key: string]: string })[field] || ''}
                          onChange={(event) => handleCustomFieldChange(event, index, field)}
                        />
                      </Col>
                    ) : (
                      <Col>
                        <Form.Control
                          type="text"
                          value={(item.customFields as { [key: string]: string })[field] || ''}
                          onChange={(event) => handleCustomFieldChange(event, index, field)}
                        />
                      </Col>
                    )}
                  </Form.Group>
                ))}
              </>
            )}


          </div>
        ))}
        <Button variant="success" onClick={handleAddItem}>Add Item</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default InventoryForm;

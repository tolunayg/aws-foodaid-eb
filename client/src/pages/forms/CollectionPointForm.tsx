import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { createCollectionPoint, getCollectionPointById, updateCollectionPoint } from '../../service';

enum Mode {
    Add = 'add',
    Edit = 'edit'
}

type Props = {
    mode: Mode;
  };

interface CustomField {
  name: string;
  value: string;
}

function CollectionPointForm() {
    // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { state } = useLocation();
    const collectionPointId = state?.collectionPointId;
    const mode:Mode = collectionPointId ? Mode.Edit : Mode.Add;
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const formik = useFormik({
    initialValues: {
      city: '',
      district: '',
      collectionPointName: '',
      address: '',
    },
    onSubmit: (values) => {
        const customFieldsObj: Record<string, string> = {};
        customFields.forEach((customField) => {
          customFieldsObj[customField.name] = customField.value;
        });
        const newValues = { ...values, customFields: customFieldsObj };
        console.log(newValues);
      },
      
  });


  useEffect(() => {
    // Set the initial values
    if (mode === 'edit' && collectionPointId) {
        const fetchData = async () => {

        try {
            // const accessToken = await getAccessTokenSilently();
            const accessToken = '123';
            const data = await getCollectionPointById(accessToken, collectionPointId);
            console.log(data);
            // Set form values from data
            const updatedInitialValues = {
              city: data.city,
              district: data.district,
              collectionPointName: data.collectionPointName,
              address: data.address,
            };
            // Set the form values from the updated initial values
            formik.setValues(updatedInitialValues);


            // Create a new object with the custom field names and their values
            const customFieldsData = Object.entries(data.fields).map(([name, value]) => ({ name, value: String(value) }));
            console.log(customFieldsData);
            setCustomFields(customFieldsData);

        } catch (error) {
            console.error(error);
        }
        };
        fetchData();
    }
}, [mode, collectionPointId]);
 

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleSubmitButton = async () => {
    const { city, district, collectionPointName, address } = formik.values;
    const fields = Object.fromEntries(customFields.map(customField => [customField.name, customField.value]));

    const collectionPoint = {
      city, 
      district, 
      collectionPointName, 
      address,
      fields,
    };
  
    if (mode === 'edit' && collectionPointName) {
      console.log("IN EDIT MODE, UPDATE");
      const updatedCollectionPoint = await updateCollectionPoint('123', collectionPointId, collectionPoint);
    } else {
      console.log("IN ADD MODE, CREATE");
      try {
        const createdCollectionPoint = await createCollectionPoint('123', collectionPoint);
        console.log(createdCollectionPoint);
        // TODO: Handle successful creation
      } catch (error) {
        console.error(error);
        // TODO: Handle error
      }
    }
  };
  

  const handleCustomFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].name = event.target.value;
    setCustomFields(newCustomFields);
  };

  const handleCustomFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].value = event.target.value;
    setCustomFields(newCustomFields);
  };

  const handleClear = () => {
    formik.resetForm();
    setCustomFields([]);
  };
  
  const headingText = mode === Mode.Add ? 'Add New Collection Point' : 'Edit Collection Point';
  
  return (

    <>
      <h1>{headingText}</h1>
      <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id="city" name="city" value={formik.values.city} onChange={formik.handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>District</Form.Label>
          <Form.Control type="text" id="district" name="district" value={formik.values.district} onChange={formik.handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="collectionPointName" name="collectionPointName" value={formik.values.collectionPointName} onChange={formik.handleChange} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} />
        </Form.Group>

        {customFields.map((field, index) => (
          <div className="mb-3" key={index}>
            <Form.Label>Custom Field Name</Form.Label>
            <Form.Control type="text" value={field.name} onChange={(event: ChangeEvent<HTMLInputElement>) => handleCustomFieldNameChange(event, index)} />


            <Form.Label>Custom Field Value</Form.Label>
            <Form.Control type="text" value={field.value} onChange={(event: ChangeEvent<HTMLInputElement>) => handleCustomFieldValueChange(event, index)} />

          </div>
        ))}

        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
          <Button variant="primary" type="submit" onClick={handleSubmitButton}>Submit</Button>
          <Button variant="success" type="button" onClick={handleAddCustomField}>New Field</Button>
          <Button variant="warning" type="button" onClick={() => setCustomFields([])}>Clear Custom Fields</Button>
          <Button variant="danger" type="button" onClick={() => handleClear()}>Clear All</Button>
        </div>
      </Form>
    </>
  );
}

export default CollectionPointForm;

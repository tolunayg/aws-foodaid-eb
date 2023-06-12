import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { createDistributionPoint, getDistributionPointById, updateDistributionPoint } from '../../service';
import { IGetDistributionPoints } from '../../models/IGetDistributionPoints';
import { URLEnum } from '../../RouterEnum';

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

function DistributionPointForm() {
  const navigate = useNavigate()

    // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { state } = useLocation();
    const distributionPointId = state?.distributionPointId;
    const mode:Mode = distributionPointId ? Mode.Edit : Mode.Add;
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const formik = useFormik({
    initialValues: {
      city: '',
      district: '',
      distributionPointName: '',
      address: '',
    },
    onSubmit: (values) => {
        const customFieldsObj: Record<string, string> = {};
        customFields.forEach((customField) => {
          customFieldsObj[customField.name] = customField.value;
        });
        const newValues = { ...values, customFields: customFieldsObj };
        console.log(newValues);
        navigate(URLEnum.DISTRIBUTION_POINT);
      },
      
  });


  useEffect(() => {
    // Make API call to get distributionPoint details based on `distributionPointId`
    // Set the initial values
    if (mode === 'edit' && distributionPointId) {
        const fetchData = async () => {

        try {
            const accessToken = localStorage.getItem('token');
            const data = await getDistributionPointById(accessToken!, distributionPointId);
            console.log(data);
            // Set form values from data
            const updatedInitialValues = {
              city: data.city,
              district: data.district,
              distributionPointName: data.distributionPointName,
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
}, [mode, distributionPointId]);
 

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleSubmitButton = async () => {
    const { city, district, distributionPointName, address } = formik.values;
    const fields = Object.fromEntries(customFields.map(customField => [customField.name, customField.value]));

    const distributionPoint = {
      city, 
      district, 
      distributionPointName, 
      address,
      fields,
    };
  
    if (mode === 'edit' && distributionPointId) {
      console.log("IN EDIT MODE, UPDATE");
      const updatedDistributionPoint = await updateDistributionPoint('123', distributionPointId, distributionPoint);
        console.log(updatedDistributionPoint);
      // TODO: Update distributionPoint and call
    } else {
      console.log("IN ADD MODE, CREATE");
      try {
        console.log(distributionPoint)
        const createdDistributionPoint = await createDistributionPoint('123', distributionPoint);
        console.log(createdDistributionPoint);
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
  
  const headingText = mode === Mode.Add ? 'Add New Distribution Point' : 'Edit Distribution Point';
  
  return (

    <>
      <h1 className="display-4">{headingText}</h1>
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
          <Form.Control type="text" id="distributionPointName" name="distributionPointName" value={formik.values.distributionPointName} onChange={formik.handleChange} />
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

// export default withAuthenticationRequired(DistributionPointForm);
export default DistributionPointForm;

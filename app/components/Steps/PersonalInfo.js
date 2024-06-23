"use client";

import { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  height: 100%;
  min-height: 550px;

  h1 {
    color: #01285a;
    margin: 0;
    font-size: 36px;
    font-weight: bold;
  }

  h4 {
    color: #9b9ba5;
    margin: 0 0 20px 0;
    font-size: 18px;
  }
`;

const FieldLabel = styled.label`
  color: #354858;
  margin-bottom: 8px;
`;

const InputField = styled(TextField)`
  width: 100%;
  height: 80px;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PersonalInfo = ({ nextStep, handleFormDataChange, data }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "This field is required.";
    tempErrors.email = formData.email
      ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
        ? ""
        : "Email is not valid."
      : "This field is required.";
    tempErrors.phone = formData.phone
      ? /^\d+$/.test(formData.phone)
        ? ""
        : "Phone number is not valid."
      : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleFormDataChange("personalInfo", formData);
      nextStep();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <h1>Personal Info</h1>
        <h4>Please provide your name, email address, and phone number</h4>
      </div>

      <div style={{ width: "100%" }}>
        <FieldLabel>Name</FieldLabel>
        <InputField
          variant="outlined"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          placeholder="e.g. Stephen King"
        />
      </div>

      <div style={{ width: "100%" }}>
        <FieldLabel>Email Address</FieldLabel>
        <InputField
          variant="outlined"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          placeholder="e.g. stephenking@lorem.com"
        />
      </div>

      <div style={{ width: "100%" }}>
        <FieldLabel>Phone Number</FieldLabel>
        <InputField
          variant="outlined"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          placeholder="e.g. +1 234 567 890"
        />
      </div>

      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            backgroundColor: "#042858",
            height: "50px",
            "&:hover": {
              backgroundColor: "#031d45",
            },
          }}
        >
          Next Step
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default PersonalInfo;

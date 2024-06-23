"use client";
import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Plan from "@/app/components/Plan";
import ArcadeIcon from "../../../public/icon-arcade.svg";
import AdvancedIcon from "../../../public/icon-advanced.svg";
import ProIcon from "../../../public/icon-pro.svg";

const PlanContainer = styled.div`
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

const PlansWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9ff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;

  .label {
    font-size: 14px;
    font-weight: bold;
    margin: 0 10px;
  }

  .selected {
    color: #01285a;
  }

  .not-selected {
    color: #9b9ba5;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const plans = [
  {
    id: "arcade-plan",
    icon: ArcadeIcon,
    monthlyPrice: "9",
    yearlyPrice: "90",
    title: "Arcade",
  },
  {
    id: "advanced-plan",
    icon: AdvancedIcon,
    monthlyPrice: "12",
    yearlyPrice: "120",
    title: "Advanced",
  },
  {
    id: "pro-plan",
    icon: ProIcon,
    monthlyPrice: "15",
    yearlyPrice: "150",
    title: "Pro",
  },
];

const UserPlan = ({ nextStep, prevStep, handleFormDataChange, data }) => {
  const [selectedPlan, setSelectedPlan] = useState(data?.plan || null);
  const [billingCycle, setBillingCycle] = useState(
    data?.billingCycle || "monthly",
  );
  const [errorState, setErrorState] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setErrorState(false);
  };
  const handleBillingCycleChange = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  const handleSubmit = () => {
    if (!selectedPlan) {
      setErrorState(true);
      return;
    }
    handleFormDataChange("userPlan", { plan: selectedPlan, billingCycle });
    nextStep();
  };

  return (
    <PlanContainer>
      <div>
        <h1>Select your plan</h1>
        <h4>You have the option of monthly or yearly billing.</h4>
      </div>

      <PlansWrapper>
        {plans.map((plan) => (
          <Plan
            key={plan.id}
            icon={plan.icon}
            isMonthly={billingCycle === "monthly"}
            isSelected={plan.id === selectedPlan?.id}
            monthlyPrice={plan.monthlyPrice}
            title={plan.title}
            yearlyPrice={plan.yearlyPrice}
            onSelect={() => handlePlanSelect(plan)}
          />
        ))}
      </PlansWrapper>

      <SwitchContainer>
        <span
          className={`label ${billingCycle === "monthly" ? "selected" : "not-selected"}`}
        >
          Monthly
        </span>
        <Switch
          checked={billingCycle === "yearly"}
          onChange={handleBillingCycleChange}
          color={"primary"}
        />
        <span
          className={`label ${billingCycle === "yearly" ? "selected" : "not-selected"}`}
        >
          Yearly
        </span>
      </SwitchContainer>

      {errorState && (
        <ErrorText>Please select a plan before proceeding.</ErrorText>
      )}

      <ButtonContainer>
        <Button
          variant="text"
          sx={{
            color: "#9b9ba5",
            backgroundColor: "transparent",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#01285a",
            },
          }}
          onClick={prevStep}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
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
    </PlanContainer>
  );
};

export default UserPlan;

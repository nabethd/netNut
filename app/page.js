"use client";
import Stepper from "@/app/components/Stepper";
import styled from "styled-components";
import { useState } from "react";
import PersonalInfo from "@/app/components/Steps/PersonalInfo";
import UserPlan from "@/app/components/Steps/UserPlan";
import Addons from "@/app/components/Steps/AddOns";
import Summary from "@/app/components/Steps/Summary";

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 12px;
  width: 100%;
  max-width: 1000px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StepContent = styled.div`
  flex: 1;
  padding: 40px 40px 40px 90px;
`;

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    userPlan: {},
    addOns: {},
  });

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const handleFormDataChange = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <PersonalInfo
            nextStep={nextStep}
            handleFormDataChange={handleFormDataChange}
            data={formData.personalInfo}
          />
        );
      case 2:
        return (
          <UserPlan
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormDataChange={handleFormDataChange}
            data={formData.userPlan}
          />
        );
      case 3:
        return (
          <Addons
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormDataChange={handleFormDataChange}
            data={{
              addOns: formData?.addOns,
              billingCycle: formData?.userPlan?.billingCycle,
            }}
          />
        );
      case 4:
        return (
          <Summary
            prevStep={prevStep}
            data={formData}
            changePlan={() => setActiveStep(2)}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-24">
      <Container>
        <Stepper ActiveStep={activeStep} setActiveStep={setActiveStep} />
        <StepContent>{renderStep()}</StepContent>
      </Container>
    </main>
  );
}

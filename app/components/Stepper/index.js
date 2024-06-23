'use client';

import styled from 'styled-components';
import SideBarBG from '../../../public/bg-sidebar-desktop.svg';

const Background = styled.div`
  background-image: url(${SideBarBG.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 24px;
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  justify-content: flex-start;
`;

const StepList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 0;
  color: ${({active}) => (active ? 'black' : 'white')};

  .circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
    background-color: ${({active}) => (active ? '#bce3fa' : 'transparent')};
    color: ${({active}) => (active ? 'black' : 'white')};
    border: ${({active}) => (active ? 'none' : '1px solid white')};
    font-weight: bold;
  }

  .step-info {
    display: flex;
    flex-direction: column;
  }

  .step-title {
    font-size: 12px;
    text-transform: uppercase;
    color: #999dff;

  }

  .step-description {
    font-size: 16px;
    font-weight: normal;
    color: white;


  }
`;

const Stepper = ({ActiveStep}) => {
    const steps = [
        {stepNumber: 1, title: 'YOUR INFO'},
        {stepNumber: 2, title: 'SELECT PLAN'},
        {stepNumber: 3, title: 'ADD-ONS'},
        {stepNumber: 4, title: 'SUMMARY'}
    ];

    return (
        <Background>
            <StepList>
                {steps.map((step) => (
                    <StepItem key={step.stepNumber} active={step.stepNumber === ActiveStep}>
                        <div className="circle">{step.stepNumber}</div>
                        <div className="step-info">
                            <div className="step-title">Step {step.stepNumber}</div>
                            <div className="step-description">{step.title}</div>
                        </div>
                    </StepItem>
                ))}
            </StepList>
        </Background>
    );
};

export default Stepper;

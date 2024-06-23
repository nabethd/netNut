'use client';

import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const SummaryContainer = styled.div`
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

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f8f9ff;
  padding: 20px;
  border-radius: 8px;
`;

const PlanSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;

  .plan-details {
    display: flex;
    flex-direction: column;

    .plan-title {
      color: #01285a;
      font-weight: bold;
    }

    .change-button {
      background: none;
      border: none;
      color: grey;
      text-underline: grey;
      align-self: start;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      font-size: 14px;

      &:hover {
        color: #5452b2;
      }
    }
  }

  .plan-price {
    font-size: 16px;
    color: #01285a;
    font-weight: bold;
  }
`;

const AddOnSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 24px;

  .add-on-title {
    font-size: 14px;
    color: #a0a0aa
  }

  .add-on-price {
    font-size: 14px;
    color: #01285a;

  }
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  color: #a0a0aa;

  .total-label {
    font-size: 16px;
    margin-left: 20px;
  }

  .total-price {
    font-size: 24px;
    font-weight: bold;
    color: #4e43f7
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Summary = ({prevStep, data, changePlan}) => {
    const selectedPlan = data?.userPlan?.plan || null;
    const billingCycle = data?.userPlan?.billingCycle || 'monthly';
    const selectedAddOns = data?.addOns || [];
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (selectedPlan) {
            const planPrice = billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;
            const addOnsPrice = selectedAddOns.reduce((acc, addOn) => {
                const addOnPrice = billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
                return acc + parseFloat(addOnPrice);
            }, 0);
            setTotalPrice(parseFloat(planPrice) + addOnsPrice);
        }
    }, [selectedPlan, billingCycle, selectedAddOns]);

    const handleSubmit = () => {
        console.log(data);
    };

    return (
        <SummaryContainer>
            <div>
                <h1>Finishing up</h1>
                <h4>Double-check everything looks OK before confirming.</h4>
            </div>

            <SummaryWrapper>
                {selectedPlan && (
                    <PlanSummary>
                        <div className="plan-details">
                            <div className="plan-title">
                                {selectedPlan.title} ({billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})
                            </div>
                            <button className="change-button" onClick={changePlan}>Change</button>
                        </div>
                        <div className="plan-price">
                            ${billingCycle === 'monthly' ? `${selectedPlan.monthlyPrice}/mo` : `${selectedPlan.yearlyPrice}/yr`}
                        </div>
                    </PlanSummary>
                )}

                {selectedAddOns.length > 0 && <Divider/>}

                {selectedAddOns.map(addOn => (
                    <AddOnSummary key={addOn.id}>
                        <div className="add-on-title">{addOn.title}</div>
                        <div className="add-on-price">
                            +${billingCycle === 'monthly' ? `${addOn.monthlyPrice}/mo` : `${addOn.yearlyPrice}/yr`}
                        </div>
                    </AddOnSummary>
                ))}
            </SummaryWrapper>

            <TotalSummary>
                <div className="total-label">Total
                    ({billingCycle === 'monthly' ? 'per month' : 'per year'})
                </div>
                <div
                    className="total-price">+${totalPrice}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </div>
            </TotalSummary>

            <ButtonContainer>
                <Button
                    variant="text"
                    sx={{
                        color: '#9b9ba5',
                        backgroundColor: 'transparent',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#01285a'
                        }
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
                        backgroundColor: '#473fff',
                        height: '50px',
                        '&:hover': {
                            backgroundColor: '#938cfe'
                        }
                    }}
                >
                    Confirm
                </Button>
            </ButtonContainer>
        </SummaryContainer>
    );
};

export default Summary;

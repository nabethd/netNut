'use client';

import {useState} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddOn from '@/app/components/AddOn';

const AddOnsContainer = styled.div`
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

const AddOnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const addons = [
    {
        id: 'online-service-add-on',
        monthlyPrice: '1',
        yearlyPrice: '10',
        title: 'Online service',
        subTitle: 'Access to multiplayer games'
    },
    {
        id: 'larger-storage-add-on',
        monthlyPrice: '2',
        yearlyPrice: '20',
        title: 'Larger storage',
        subTitle: 'Extra 1TB of cloud save'
    },
    {
        id: 'customizable-profile-add-on',
        monthlyPrice: '2',
        yearlyPrice: '20',
        title: 'Customizable profile',
        subTitle: 'Custom theme on your profile'
    }
];

const Addons = ({nextStep, prevStep, handleFormDataChange, data}) => {
    const [selectedAddOns, setSelectedAddOns] = useState(data || []);
    debugger
    const billingCycle = data?.billingCycle || 'monthly';

    const handleAddOnSelect = (addOnId) => {
        if (selectedAddOns.find((addon) => addon.id === addOnId)) {
            setSelectedAddOns((prevSelectedAddOns) =>
                prevSelectedAddOns.filter((addon) => addon.id !== addOnId)
            );
        } else {
            const selectedAddon = addons.find((addon) => addon.id === addOnId);
            if (selectedAddon) {
                setSelectedAddOns((prevSelectedAddOns) => [...prevSelectedAddOns, selectedAddon]);
            }
        }
    };

    const handleSubmit = () => {
        handleFormDataChange('addOns', selectedAddOns);
        debugger
        nextStep();
    };

    return (
        <AddOnsContainer>
            <div>
                <h1>Pick add-ons</h1>
                <h4>Add-ons help enhance your gaming experience.</h4>
            </div>

            <AddOnsWrapper>
                {addons.map((addOn) => (
                    <AddOn
                        key={addOn.id}
                        isMonthly={billingCycle === 'monthly'}
                        isSelected={selectedAddOns.some((ao) => ao.id === addOn.id)}
                        monthlyPrice={addOn.monthlyPrice}
                        title={addOn.title}
                        subtitle={addOn.subTitle}
                        yearlyPrice={addOn.yearlyPrice}
                        onSelect={() => handleAddOnSelect(addOn.id)}
                    />
                ))}
            </AddOnsWrapper>

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
                        backgroundColor: '#042858',
                        height: '50px',
                        '&:hover': {
                            backgroundColor: '#031d45'
                        }
                    }}
                >
                    Next Step
                </Button>
            </ButtonContainer>
        </AddOnsContainer>
    );
};

export default Addons;

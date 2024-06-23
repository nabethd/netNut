'use client';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox'

const AddOnContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: ${({isSelected}) =>
          isSelected ? '1px solid #5e5997' : '1px solid #dad9de'};
  background: ${({isSelected}) => (isSelected ? '#f8f9ff' : 'white')};
  display: flex;
  align-items: center;
  padding: 18px;
  box-shadow: ${({isSelected}) =>
          isSelected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #5e5997;
  }
`;

const CheckboxContainer = styled.div`
  margin-right: 24px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #01285a;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #9b9ba5;
`;

const Price = styled.div`
  font-size: 16px;
  color: #5e5997;
  margin-left: auto;
`;

const AddOn = ({
                   title,
                   subtitle,
                   isMonthly,
                   monthlyPrice,
                   yearlyPrice,
                   isSelected,
                   onSelect
               }) => {
    return (
        <AddOnContainer isSelected={isSelected} onClick={onSelect}>
            <CheckboxContainer>
                <Checkbox checked={isSelected} onChange={() => {
                }}/>
            </CheckboxContainer>
            <div>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </div>
            <Price>{isMonthly ? `+$${monthlyPrice}/mo` : `+$${yearlyPrice}/yr`}</Price>
        </AddOnContainer>
    );
};

export default AddOn;

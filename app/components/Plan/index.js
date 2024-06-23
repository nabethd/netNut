'use client';
import styled from 'styled-components';
import Image from 'next/image';

const PlanContainer = styled.div`
  width: 160px;

  border-radius: 8px;
  border: ${({isSelected}) => (isSelected ? '1px solid #5e5997' : '1px solid #dad9de')};
  background: ${({isSelected}) => (isSelected ? '#f8f9ff' : 'white')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
  box-shadow: ${({isSelected}) => (isSelected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  cursor: pointer;

  &:hover {
    border: 1px solid #5e5997;
  }
`;

const Icon = styled(Image)`
  width: 40px;
  height: 40px;
  margin-bottom: 48px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #01285a;
  margin-bottom: 8px;
`;

const Price = styled.div`
  font-size: 14px;
  color: #354858;
  font-weight: lighter;
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: #01285a;
  font-weight: bold;
`;

const Plan = ({title, isMonthly, icon, monthlyPrice, yearlyPrice, isSelected, onSelect}) => {
    return (
        <PlanContainer isSelected={isSelected} isMonthly={isMonthly} onClick={onSelect}>
            <div>
                <Icon src={icon} alt={`${title} icon`}/>
            </div>
            <div>

                <Title>{title}</Title>
                <Price>{isMonthly ? `$${monthlyPrice}/mo` : `$${yearlyPrice}/yr`}</Price>
                {isMonthly && <Subtitle>2 months free</Subtitle>}
            </div>
        </PlanContainer>
    );
};

export default Plan;

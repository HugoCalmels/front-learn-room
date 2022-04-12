import styled from "styled-components";
import { BounceLoader } from "react-spinners";

const LoaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  align-items: center;
  justify-content: center;
`;

const LoaderSpinnerComponent = ({ isLoading }) => {
  return (
    <LoaderStyle>
      <BounceLoader loading={isLoading} color="#005939" />
    </LoaderStyle>
  );
};

export default LoaderSpinnerComponent;

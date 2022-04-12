import { Link } from "react-router-dom";
import styled from "styled-components";

const StoryStyle = styled.div `
  max-width: ${(props) => props.theme.spacings.maxWidth};
  margin: 3rem auto;
  padding: 0 ${(props) => props.theme.paddings.NavLaptop};

  .bgGreenLight {
    background-color: ${(props) => props.theme.colors.greenLight};
  }
  h2 {
    color: ${(props) => props.theme.colors.greenDark};
    margin-bottom: 2rem;
  }
  img {
    max-height: 20rem;
    max-width: 20rem;
    align-self: center;
  }
  .story-link {
    display: flex;
    flex-direction: column;
  }
`

const StorySection = () => {

  return (
    <StoryStyle>
      <Link to="/story" className="story-link">
        <h2>The Story Behind the Website</h2>
        <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="story" />
      </Link>
    </StoryStyle>
  )
};

export default StorySection;
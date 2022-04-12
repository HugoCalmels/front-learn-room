import { LoggedContext } from 'App'
import { ButtonComponent } from 'components/ButtonComponent'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const HeroStyles = styled.div`
	margin-top: 50px;
	margin-bottom: 100px;
	/* display: grid;
	gap: 1rem;
	grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); */
	background-color: ${props => props.theme.colors.greenLight};

	&:before {
		bottom: 210px !important;
	}

	.row {
		max-width: 970px;
		margin-left: auto;
		margin-right: auto;
		padding: 80px 40px;
	}

	.hero-col-desc {
		overflow: hidden;
	}

	img {
		width: 100%;
		border-radius: 1rem;
	}

	button {
		margin-bottom: 3rem;
	}

	.tagline {
		color: ${props => props.theme.colors.greenDark};
		font-size: 3.5rem;
		white-space: break-spaces;
	}

	.description {
		font-size: 1.5rem;
		line-height: 140%;
		color: ${props => props.theme.colors.greenDark};
		opacity: .8;
	}

	@media ${props => props.theme.breakpoints.mobile} {
		margin-bottom: 0;
		padding: 0;
		margin-bottom: 150px;
		padding-bottom:1rem;

		.tagline {
			font-size: 2.5rem;
		}
		.description {
			font-size: 1.2rem;
		}
	}
`;


export const Hero = () => {

	const history = useHistory();
	const { isLogged } = useContext(LoggedContext);

	const redirectMe = (path) => {
		history.push(path);
	};

	return (
		<HeroStyles>
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-6 hero-col-desc">
					<h1 className="tagline">
						Master code by pair-learning
					</h1>
					<p className="description">We believe working with others aspiring developer can help you keep your motivation up! That why we hand-picked some of the best and most challenging MOOC for you. You only have to choose, get up and ready with your new camarade</p>
					{!isLogged && <ButtonComponent onClick={() => redirectMe('/register')}>Register</ButtonComponent>}
					{isLogged && <ButtonComponent onClick={() => redirectMe('/courses')}>See the courses</ButtonComponent>}
				</div>
				<div className="col-xs-12 col-sm-12 col-md-6">
					<img src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
							alt="woman working remote code" />
				</div>
			</div>
		</HeroStyles>
	)
}

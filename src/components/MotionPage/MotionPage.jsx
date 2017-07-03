import preact, { h, Component } from 'preact';
import { Animate } from 'react-move';
import Springer from 'springer';

const normalSpring = Springer();
const hardSpring = Springer(0.9, 0.3);
const wobblySpring = Springer(0.5, 0.9);

const MotionPage = (ComposedComponent) => {
	return class extends Component {
		constructor() {
			super();
		}
		componentDidMount() {
			console.log('componentDidMount');
		}
		render() {
			const { item } = this.state;
			return (
				<Animate
					default={{
						left: -20,
						opacity: 0
					}}
					data={{
						left: 0,
						opacity: 1
					}}
					duration={3000}
					easing={wobblySpring}
				>
					{data => {
						return (<div
							style={{
								width: '100%',
								position:'absolute',
								background: '#aaa',
								opacity: data.opacity,
								height: '10rem',
								left: data.left
							}}
						>
							<ComposedComponent {...this.props}/>
						</div>);
					}}
				</Animate>
			);
		}
    };
};

export default MotionPage;

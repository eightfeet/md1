import preact, { h, Component } from 'preact';
import { Animate } from 'react-move';
import Springer from 'springer';
import s from './MotionPage.scss';

const normalSpring = Springer();
const hardSpring = Springer(0.9, 0.3);
const wobblySpring = Springer(0.5, 0.9);

const MotionPage = (ComposedComponent) => {
	return class extends Component {
		constructor() {
			super();
		}
		render() {
			const { item } = this.state;
			return (
				<Animate
					default={{
						left: -40,
						opacity: 0,
						scale: 0.8
					}}
					data={{
						left: 0,
						opacity: 1,
						scale: 1
					}}
					duration={2000}
					easing={hardSpring}
				>
					{data => {
						return (<div
							className={s.root}
							style={{
								opacity: data.opacity,
								// transform: `scale(${data.scale})`,
								transform: `translateX(${data.left}px)`,
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

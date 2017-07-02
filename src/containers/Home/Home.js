import { h, Component } from 'preact';
import { Animate } from 'react-move';
import _ from 'lodash';
import { FStringPrivacy, FTimeStamp } from '~/utils/fliter';
import history from '~/core/history';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import s from './style';
import sl from './styleb';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			item: {
				left: 10,
				color: 'red',
				rotate: 45
			}
		};
	}

	render() {
		const { item } = this.state

		return (
			<div className="pdt2 al-c center w6">
				<Animate
						default={{
							left: -20
						}}
						data={{
							left: 0
						}}
						duration={200}
					>
					{data => {
						return (
							<div
							style={{
								width: '100%',
								position:'absolute',
								background: 'red',
								left: data.left
							}}
							>
							怎么动？
							</div>
						)
						}}
					</Animate>
			</div>
		);
	}
}

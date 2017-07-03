import { h, Component } from 'preact';
import { Animate } from 'react-move';
import _ from 'lodash';
import { FStringPrivacy, FTimeStamp } from '~/utils/fliter';
import history from '~/core/history';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';

export default class View extends Component {
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
		const { item } = this.state;

		return (
			<div className="pdt2 al-c center w6">
				<div onClick={() => (history.push('/'))}>测试</div>
				<Animate
					default={{
						left: -20,
						color: 'blue'
					}}
					data={{
						left: 0,
						color: 'green'
					}}
				>
					{data => {
						return (
							<div
							style={{
								width: '100%',
								position:'absolute',
								background: data.color,
								left: data.left
							}}
							>
							怎么动？
							</div>
						);
					}}
				</Animate>
			</div>
		);
	}
}

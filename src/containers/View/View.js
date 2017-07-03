import { h, Component } from 'preact';
import MotionPage from '~/components/MotionPage';
import history from '~/core/history';

class View extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="pdt2 al-c center w6">
				<div onClick={() => (history.push('/'))}>测试</div>
				<div>测试二</div>
			</div>
		);
	}
}

export default MotionPage(View)

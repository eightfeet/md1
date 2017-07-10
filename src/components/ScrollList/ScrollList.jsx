import { h, Component } from 'preact';
import Scrollload from 'scrollload';

class ScrollList extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		const { children } = this.props;
		return (<div class="scrollload-container">
			<div class="scrollload-content">
				{children}
			</div>
		</div>);
	}
}

export default ScrollList;

import { h, Component } from 'preact';

export default class SecurityCode extends Component {

	render({ path }) {
		return (
			<div className="pd2">
				<h1>扫码: { path }</h1>
			</div>
		);
	}
}

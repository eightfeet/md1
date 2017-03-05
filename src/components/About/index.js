import { h, Component } from 'preact';

export default class Profile extends Component {
	state = {
		count: 0
	};

	handleTest = e => {
		this.setState({
			count: this.state.count + 1
		});
	}

	render(props, state) {
		console.log(props);
		console.log(state);
		return (
			<div className="al-c pd3">
				<h1>count:{this.state.count}</h1>
				<button
					style={{padding:'0.5rem 1rem', marginTop: '1rem'}}
					onClick={this.handleTest}
				>
					count+1
				</button>
			</div>
		);
	}
}

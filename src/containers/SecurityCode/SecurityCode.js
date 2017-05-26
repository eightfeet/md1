import { h, Component } from 'preact';
import Modal from '~/components/Modal';
import validate from '~/utils/validate';

export default class SecurityCode extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			errorMsg: null,
			vname: null,
			vphone: null,
			strict: null,
			Zh: null
		};
	}

	onChangeName = (e) => {
		this.setState({
			vname: e.target.value
		});
	}
	onChangePhone = (e) => {
		this.setState({
			vphone: e.target.value
		});
	}

	VNameSet = (e) => {
		this.setState({
			Zh: e.target.value
		});
	}
	VPhoneSet = (e) => {
		this.setState({
			strict: e.target.value
		});
	}

	validateData = () => {
		const { vname, Zh, vphone, strict } = this.state;
		const eMsg = validate({
			VName: [this.state.vname, null, Zh],
			VPhone: [this.state.vphone, null, strict],
			VRequire: ['', '必填字段'], // 必填验证字段
			VRequire_name: ['1', '必填字段name'], // 验证通过
			VPhone_Jhon: ['12622809420', 'Jhon电话验证不通过', 'strict'], // Jhon电话验证不通过
			VPhone_Jime: 13111111111 // 验证通过
		});

		console.log('eMsg', eMsg);

		if (eMsg) {
			this.setState({
				errorMsg: eMsg,
				showModal: true
			});
			return;
		}
		this.setState({
			errorMsg: '验证通过！',
			showModal: true
		});
	}

	handleOpenModal = () => {
		this.setState({ showModal: true });
	}

	handleCloseModal = () => {
		this.setState({ showModal: false });
	}

	render() {
		const { errorMsg, vname, vphone } = this.state;
		return (
			<div className="pd2">
				<div className="pd2 radius-small bg-white">
					<h3 className="al-c">validate</h3>
					<div className="ww formBox clearfix">
						<div className="w6 fl mgb1">
							<input
								type="text"
								className="pd1 ww radius-small bg-gray-lighter"
								maxLength="10"
								placeholder="VName"
								value={vname}
								onChange={this.onChangeName}
							/>
						</div>
						<div className="w4 fl mgb1">
							<select name="" id="" className="ww" onChange={this.VNameSet}>
								<option value="">正常</option>
								<option value="Zh">中文姓名验证</option>
							</select>
						</div>
						<div className="w6 fl mgb1">
							<input
								type="text"
								className="pd1 ww radius-small bg-gray-lighter"
								maxLength="11"
								placeholder="VPhone"
								value={vphone}
								onChange={this.onChangePhone}
							/>
						</div>
						<div className="w4 fl mgb1">
							<select name="" id="" className="ww" onChange={this.VPhoneSet}>
								<option value="">正常</option>
								<option value="strict">手机严格验证</option>
							</select>
						</div>
						<div className="ww">
							<button
								className="al-c ww radius-small pd1 bg-green-light white font-bigger"
								onClick={this.validateData}
							>
								validate
							</button>
						</div>
					</div>
				</div>
				<Modal
					contentLabel="Modal"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
					shouldCloseOnOverlayClick={true}
				>
					<div className="center w9 pd1 font">
						<div className="al-c pdt2 red">
							{errorMsg}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

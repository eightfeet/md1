import { h, Component } from 'preact';
import Modal from '~/components/Modal';
import validate from '~/utils/validate';

const avalidate =  new validate();

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
			VRequire: [this.state.vname, '请输入名字'],
			VChinese: [this.state.vname, '名字请输入中文字符'],
			VPhone: this.state.vphone
		});
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
						<div className="w8 fl mgb1">
							<input
								type="text"
								className="pd1 ww radius-small bg-gray-lighter"
								maxLength="10"
								placeholder="VName"
								value={vname}
								onChange={this.onChangeName}
							/>
						</div>
						<div className="w2 fl mgb1">
							<select name="" id="" className="ww" onChange={this.VNameSet}>
								<option value="">N</option>
								<option value="Zh">Zh</option>
							</select>
						</div>
						<div className="w8 fl mgb1">
							<input
								type="text"
								className="pd1 ww radius-small bg-gray-lighter"
								maxLength="11"
								placeholder="VPhone"
								value={vphone}
								onChange={this.onChangePhone}
							/>
						</div>
						<div className="w2 fl mgb1">
							<select name="" id="" className="ww" onChange={this.VPhoneSet}>
								<option value="">N</option>
								<option value="strict">strict</option>
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

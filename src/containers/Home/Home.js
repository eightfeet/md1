import { h, Component } from 'preact';
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
			showModal: false,
			showModalb: false,
			voiceId: null,
			voiceStatus: '0'
		};
	}

	handleOpenModal = () => {
		this.setState({ showModal: true });
	}

	handleCloseModal = () => {
		this.setState({ showModal: false });
	}

	handleOpenModalb = () => {
		this.setState({ showModalb: true });
	}

	handleCloseModalb = () => {
		this.setState({ showModalb: false });
	}

	handelLoading = () => {
		Loading.show();
		setTimeout(() => {
			Loading.hide();
		}, 4000);
	}

	handleStartVoice = () => {
		window.wx.ready(() => {
			window.wx.startRecord();
			this.setState({
				voiceStatus: '1'
			});
		});
	}

	handleEndVoice = () => {
		let __this = this;
		window.wx.stopRecord({
			success (res) {
				__this.setState({
					voiceId: res.localId,
					voiceStatus: '2'
				});
			}
		});
	}

	handlePlayVoice = () => {
		let __this = this;
		window.wx.playVoice({
			localId: this.state.voiceId
		});
		this.setState({
			voiceStatus: '0'
		});
	}

	render() {
		console.log(this.context);
		return (
			<div className="pdt2 al-c center w6">
				<div className="w9 center pdt2">
					<button className={`${s.root} ${sl.root} ww pd1 radius-small`}
						onClick={this.handleOpenModal}
					>
					Modal
					</button>
					<button className={`${s.root} bg-red mgt1 ww pd1 radius-small`}
						onClick={this.handelLoading}
					>
					ShowLoading
					</button>
					{
						this.state.voiceStatus === '0' ?
						<button className={`${s.root} bg-orange mgt1 ww pd1 radius-small`}
							onClick={this.handleStartVoice}
						>
						录音sssss
						</button> : null
					}
					{
						this.state.voiceStatus === '1' ?
						<button className={`${s.root} bg-orange mgt1 ww pd1 radius-small`}
							onClick={this.handleEndVoice}
						>
						停止
						</button> : null
					}
					{
						this.state.voiceStatus === '2' ?
						<button className={`${s.root} bg-orange mgt1 ww pd1 radius-small`}
							onClick={this.handlePlayVoice}
						>
						播放
						</button> : null
					}
				</div>

				<Modal
					contentLabel="ModalA"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					<div className="center w9 pd1 font">
						<h2 className="al-c mgb1" >modalA</h2>
						<button
							className="ww bg-green radius-small white pd1 mgb1"
							onClick={this.handleOpenModalb}
						>
							ModalB
						</button>
						<button
							className="ww bg-red radius-small white pd1"
							onClick={this.handleCloseModal}
						>
							Close
						</button>
					</div>
				</Modal>
				<Modal
					contentLabel="ModalB"
					isOpen={this.state.showModalb}
					onRequestClose={this.handleCloseModalb}
					shouldCloseOnOverlayClick={true}
				>
					<div className="center w9 pd1 font">
						<h2 className="al-c mgb1" >modalB</h2>
					</div>
				</Modal>

			</div>
		);
	}
}

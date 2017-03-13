import { h, Component } from 'preact';
import validate, { VPhone, VName, VSecurityCode, VEnglish } from '~/utils/validate';
import { FStringPrivacy, FTimeStamp } from '~/utils/fliter';
import wechat, {share} from '~/utils/wechat';
import history from '~/core/history';
import Request from '~/core/request';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import s from './style';
import sl from './styleb';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			showModalb: false
		};
	}

	componentDidMount() {
		wechat({
			debug: false,
			appId:'wx2f995336548675b4',
			timestamp:'1489029986',
			nonceStr:'a360855d-eb0e-44ee-9ea6-456d672badb8',
			signature:'ce8715c4d5980383d3628f59f5222be8b0b3b369',
			jsApiList:['showMenuItems', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'scanQRCode', 'showAllNonBaseMenuItem']
		}).then(() => {
			console.log(window.wx);
			share('分享页面');
		});
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
		}, 2000);
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

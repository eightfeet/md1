import { h, Component } from 'preact';
import s from './Spin.scss';

class Spin extends Component {
	render() {
		return (
			<div className={`${s.uildefaultcss} ${s.block}`} {...this.props}>
				<div className={`${s.ela} ${s.element}`}></div>
				<div className={`${s.elb} ${s.element}`}></div>
				<div className={`${s.elc} ${s.element}`}></div>
				<div className={`${s.eld} ${s.element}`}></div>
				<div className={`${s.ele} ${s.element}`}></div>
				<div className={`${s.elf} ${s.element}`}></div>
				<div className={`${s.elg} ${s.element}`}></div>
				<div className={`${s.elh} ${s.element}`}></div>
				<div className={`${s.eli} ${s.element}`}></div>
				<div className={`${s.elj} ${s.element}`}></div>
				<div className={`${s.elk} ${s.element}`}></div>
				<div className={`${s.ell} ${s.element}`}></div>
				<div className={`${s.elm} ${s.element}`}></div>
			</div>
		);
	}
}

export default Spin;

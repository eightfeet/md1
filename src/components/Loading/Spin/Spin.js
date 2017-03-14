import { h, Component } from 'preact';
import s from './Spin.scss';

class Spin extends Component {
	render() {
		return (
			<div className={`${s.uildefaultcss} ${s.block}`} {...this.props}>
				<div className={`${s.ela} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elb} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elc} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.eld} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.ele} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elf} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elg} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elh} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.eli} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elj} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elk} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.ell} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
				<div className={`${s.elm} ${s.element}`} style={{backgroundColor: this.props.spinColor}}></div>
			</div>
		);
	}
}

export default Spin;

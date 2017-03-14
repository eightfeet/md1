import { h, Component } from 'preact';
import Spin from '~/components/Loading/Spin';
import classNames from 'classnames';
import s from './maskspin.scss';
// import Loading from './loading.gif';

class MaskSpin extends Component {
	render() {
		const eleClass = classNames({
			[s.spin]: true,
			[s.hide]: !this.props.show,
			[s.fixed]: this.props.fixed
		});
		// const icon = this.props.icon === undefined ? <img src={Loading} /> : this.props.icon;
		return (
      <div className={eleClass}>
        <div className={s.mask}></div>
		<Spin style={{backgroundColor: 'rgba(200, 0, 0, 0.5)'}} spinColor="red" />
      </div>
		);
	}
}

export default MaskSpin;

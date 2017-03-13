import { h, Component } from 'preact';
import ReactModal from 'react-modal';
import elementClass from 'element-class';
import s from './Modal.scss';

const style = {
	overlay : {
		position          : 'absolute',
		top               : 0,
		left              : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : 'rgba(0, 0, 0, 0.45)'
	},
	content : {
		position                   : 'absolute',
		top                        : '20%',
		width                      : '80%',
		left                       : '10%',
		right                      : '10%',
		bottom                     : 'auto',
		minHeight                  : '20%',
		maxHeight                  : '80%',
		border                     : 'node',
		background                 : '#fff',
		overflow                   : 'auto',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '1rem',
		outline                    : 'none',
		padding                    : '0'
	}
};

export default class Modal extends Component {

	render() {
		const { onRequestClose, children, ...rest } = this.props;

		return (
		<ReactModal
			shouldCloseOnOverlayClick={false}
			style={style}
			{ ...rest }
		>
			{onRequestClose ? <button className={s.close} onClick={onRequestClose}>关闭</button> : null}
			{children}
		</ReactModal>
		);
	}
}

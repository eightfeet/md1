import { h, Component, PropTypes } from 'preact';
import { Link } from 'preact-router';
import history from '~/core/history';
import s from './HeaderBar.scss';
import logo from '~/assets/logo.png';
import svglogo from '~/assets/logo.svg';

class HeaderBar extends Component {
	constructor() {
		super();
		this.state = {
			isSearch: false,
			isSubMenu: false
		};
	}

	handleLeftIcon = (e) => {
		const {onClickLeft} = this.props;
		if (onClickLeft && typeof onClickLeft === 'function') {
			onClickLeft(e);
		} else {
			history.goBack();
		}
	}

	handleRightIcon = (e) => {
		const {onClickRight} = this.props;
		if (onClickRight && typeof onClickRight === 'function') {
			onClickRight(e);
		} else {
			history.goBack();
		}
	}

	render() {
		const { title, leftIcon, onClickLeft, onClickRight, rightIcon} = this.props;
		return (
      <header>
        <div className={`${s.heardbar} clearfix`}>
          <h3 className="center al-c w3 pr txt_cut">
					{title}
          </h3>
          {onClickLeft ? (<div className={`${s.fixleft} ${s.headerbarIcon}`} onClick={this.handleLeftIcon}>
						<a href="" onClick={e => {e.preventDefault();}}>
							<span className={`${leftIcon ? leftIcon : 'icon_chevron_left'} ${s.bannerico}`} />
						</a>
					</div>) : null}
					{
						onClickRight && typeof onClickRight === 'function' ?
						(<div className={`${s.fixright} ${s.headerbarIcon}`} onClick={onClickRight}>
							<a href="" onClick={e => {e.preventDefault();}}>
								<span className={`${rightIcon ? rightIcon : 'icon_circle'} ${s.bannerico}`} />
							</a>
						</div>) : null
					}
        </div>
      </header>
		);
	}
}

export default HeaderBar;

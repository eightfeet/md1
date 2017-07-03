import { h, Component } from 'preact';
import { Link } from 'preact-router';
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
	handlerSearch = () => {
		const serchinput = window.document.getElementById('search');
		if (this.state.isSearch) {
			this.setState({ isSearch: false });
			serchinput.blur();
		} else {
			this.setState({ isSearch: true });
			serchinput.focus();
		}
	}

	handlerOpenMenu = () => {
		if (!this.state.isSubMenu) {
			this.setState({ isSubMenu: true });
		}
	}
	handlerCloseMenu = () => {
		if (this.state.isSubMenu) {
			this.setState({ isSubMenu: false });
		}
	}

	render() {
		return (
      <header>
        <div className={`${s.heardbar} clearfix`}>
          <div className="center w3 pr">
            <img
              ref={(ref) => { this.logoRef = ref; }}
              src={svglogo}
              onError={() => { this.logoRef.src = logo; }}
              className={s.svglogo}
            />
          </div>
          <div className={`${s.fixleft} ${s.headerbarIcon}`} onClick={this.handlerOpenMenu}>
            <span className={`icon-more-b ${s.bannerico}`} />
          </div>
          <div className={`${s.fixright} ${s.headerbarIcon}`} >
            <Link to="/search">
              <span className={`icon-search-a ${s.bannerico}`} />
            </Link>
          </div>

        </div>
        <div
          className={this.state.isSubMenu
          ? `fr ${s.submenu} show`
          : `fr ${s.submenu} hide`}
          onClick={this.handlerCloseMenu}

        >
          <SubNav />
        </div>
      </header>
		);
	}
}

export default HeaderBar;

import { h, Component } from 'preact';
import { Link } from 'preact-router';
import MenuData from './MenuData';
import s from './SubNav.scss';

class SubNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
      <nav>
        <ul className={`clearfix ${s.subicon} nls`}>
          {MenuData.map((item, i) => (
            <li className={`fl ${s.iconitem}`} key={i}>
              <a href={item.url}>
                <div className={`${(i += 1) % 4 === 0 ? '' : s.bdright} ${s.bdbottom} ${item.icon}`}>
                  <span>
                    {item.name}
                  </span>
                </div>
              </a>
            </li>
            )
          )}
        </ul>
      </nav>
		);
	}
}

SubNav.propTypes = {};

export default SubNav;

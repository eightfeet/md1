import Request from './request';
import { http, json } from './middleware';

export { Request, http, json };

export default new Request({
	middlewares: [http, json],
	crossDomain: true
});

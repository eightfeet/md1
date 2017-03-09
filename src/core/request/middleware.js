/**
 * BY-Health Official Website
 *
 * Copyright © 2016 By-Health Co Ltd. All rights reserved.
 */
/* eslint-disable import/prefer-default-export */

/**
 * Http middleware
 *
 * @export
 * @param {Promise} request
 * @returns {Promise}
 */
export function http(request) {
	return request.then(response => (
    // response.ok may be undefined
    response.status >= 200 && response.status < 300
      ? Promise.resolve(response.text())
      : Promise.reject(response)
  ));
}

/**
 * JSON middleware
 *
 * @export
 * @param {String|Object} response
 * @returns {Promise}
 */
export function json(request) {
	return request.then(response => {
		const jsonObj = typeof response === 'string' ? JSON.parse(response) : response;

		return jsonObj.status === '0'
      ? Promise.resolve(jsonObj.body)
      : Promise.reject(jsonObj);
	});
}

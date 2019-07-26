const crypto = require("crypto");

function ksort(query) {
	return query
		.split("&")
		.map(queryParam => {
			let kvp = queryParam.split("=");
			return { key: kvp[0], value: kvp[1] };
		})
		.reduce((query, kvp) => {
			query[kvp.key] = kvp.value;
			return query;
		}, {});
}

function check(query, key) {
	let params = ksort(query);

	const sign = params.sign;
	let str = Object.keys(params).reduce((signQuery, param) => {
		if (param.indexOf("vk_") !== -1)
			return (signQuery += `${param}=${params[`${param}`]}&`);
		else return signQuery;
	}, "?");
	str = str.substring(1, str.length - 1);

	let hash = crypto
		.createHmac("sha256", key)
		.update(str)
		.digest("base64")
		.split("+")
		.join("-")
		.split("/")
		.join("_")
		.replace("=", "");

	return new Promise((resolve, reject) =>
		hash === sign ? resolve(params) : reject(params)
	);
}

module.exports = {
	check
};

const qs = require("querystring");
const crypto = require("crypto");

function check(query) {
	const urlParams = qs.parse(query);
	const ordered = {};
	Object.keys(urlParams)
		.sort()
		.forEach((key) => {
			if (key.slice(0, 3) === "vk_") {
				ordered[key] = urlParams[key];
			}
		});

	const stringParams = qs.stringify(ordered);
	const paramsHash = crypto
		.createHmac("sha256", "123")
		.update(stringParams)
		.digest()
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=$/, "");

	return new Promise((resolve, reject) =>
		paramsHash === urlParams.sign ? resolve(urlParams) : reject(urlParams)
	);
}

module.exports = check;

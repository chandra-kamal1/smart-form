"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _react = require("react");

var _lodash = _interopRequireDefault(require("../lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function download(file) {
  if (!file) {
    return;
  }
  /*const response = await axios.post(api.getFile, {fileUrl: file});
  // console.log(`response`, response.data.fileUrl)
  window.open(response.data.fileUrl, '_blank');*/

}

var _default = download; // aws.config.update({
//     region: 'ap-south-1',
//     accessKeyId: 'AKIA2BMG4C7N5HON2FFB',
//     secretAccessKey: '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',
// })
// class getDocument {
// 	static async saveDoc(fileObj,folderName) {
// 		const formData = new FormData();
// 		formData.append('file',fileObj);
// 		formData.append('folderName',folderName);
// 		const config = {
// 			headers: {
// 				'content-type': 'multipart/form-data'
// 			}
// 		}
// 		const response = await axios.post(api.document.saveByReact, formData, config);
// 		const data = await response.data;
//         return data;
// 	}
// }
// export default uploadDoc;

exports.default = _default;
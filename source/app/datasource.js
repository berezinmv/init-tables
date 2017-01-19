import $ from "jquery";

export default class Datasource {
	constructor(url, dataField) {
		this.url = url;
		this.dataField = dataField;
	}

	loadData() {
		return $.post("/getData", {dataUrl: this.url})
			.then(data => data[this.dataField]);
	}

	getDataUrl() {
		return this.url;
	}
}
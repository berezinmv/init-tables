import React from "react";
import styles from "./table.less";

const ID_FIELD = "id";

function firstLetterToUpperCase(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export default class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined, 
			sortField: undefined, 
			sortDesc: false
		};
	}

	componentDidMount() {
		this.loadDataFromDatasource(this.props.datasource);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.datasource.getDataUrl() !== nextProps.datasource.getDataUrl()) {
			this.setState({data: undefined}, () => {
				this.loadDataFromDatasource(nextProps.datasource);
			});
		}
	}

	loadDataFromDatasource(datasource) {
		datasource.loadData()
			.then(data => this.setData(data));
	}

	getIdField() {
		return this.getFields().find(field => field.toUpperCase() === ID_FIELD.toUpperCase());
	}

	getIgnoredFields() {
		return [this.getIdField()];
	}

	setData(data) {
		if (!data || data.length === 0) {
			this.setState({data: undefined});
		}
		this.setState({data: data});
	}

	getData() {
		return this.state.data;
	}

	getSearchString() {
		return this.props.searchString || "";
	}

	getFilteredData() {
		let data = this.getData();
		const searchString = this.getSearchString();
		if (searchString === "") {
			return data;
		}
		return data.filter(record => this.isRecordContainsString(record, searchString));
	}

	getSortField() {
		return this.state.sortField;
	}

	isSortDesc() {
		return this.state.sortDesc;
	}

	getSortFunction(sortField) {
		if (this.isSortDesc()) {
			return (a, b) => {
				a = a[sortField];
				b = b[sortField];
				if (a === b) {
					return 0;
				} else if (a < b) {
					return -1;
				} else {
					return 1;
				}
			};
		}
		return (a, b) => {
			a = a[sortField];
			b = b[sortField];
			if (a === b) {
				return 0;
			} else if (a < b) {
				return 1;
			} else {
				return -1;
			}
		};
	}

	sortData(data) {
		const sortField = this.getSortField();
		if (!sortField) {
			return data;
		}
		return data.sort(this.getSortFunction(sortField));
	}

	getTableData() {
		return this.sortData(this.getFilteredData().concat());
	}

	isRecordContainsString(record, searchString) {
		searchString = searchString.toUpperCase();
		return this.getColumnFields().some(field => 
			record[field].toUpperCase().indexOf(searchString) > -1);
	}

	getFields() {
		let data = this.getData();
		let record = data[0];
		if (!record) {
			return [];
		}
		return Object.keys(record);
	}

	getColumnFields() {
		let ignoredFields = this.getIgnoredFields();
		return this.getFields().filter(field => ignoredFields.indexOf(field) === -1);
	}

	onColumnClick(field) {
		if (this.getSortField() === field) {
			this.setState({sortDesc: !this.isSortDesc()});
		} else {
			this.setState({sortField: field, sortDesc: false});
		}
	}

	isSortedByField(field) {
		return this.getSortField() === field;
	}

	render() {
		let data = this.getData();
		if (!data) {
			return <span/>;
		}
		let fields = this.getColumnFields();
		return (
			<div className={styles["table-container"]}>
				<table className={styles["table"]}>
				<thead>
					<tr>
						{fields.map(field => 
							<th key={field} onClick={() => this.onColumnClick(field)}>
								{firstLetterToUpperCase(field)}
								{this.isSortedByField(field) 
									? this.isSortDesc() ? <span>&#9650;</span> : <span>&#9660;</span> 
									: ""
								}
							</th>)}
					</tr>	
				</thead>
				<tbody>
					{this.getTableData().map(record => 
						<tr key={record[this.getIdField()]}>
							{fields.map(field =>
								<td key={field}>{record[field]}</td>)}
						</tr>
					)}
				</tbody>
				</table>
			</div>
		);
	}
}
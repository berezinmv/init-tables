import React from "react";
import Panel from "./panel/panel";
import PanelHeading from "./panel/panel-heading";
import PanelBody from "./panel/panel-body";
import Tabsheet from "./tabsheet/tabsheet";
import Table from "./table/table";
import Datasource from "./datasource";
import styles from "./application.less";

export default class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTabIndex: 0,
			searchString: ""
		};
		this.setActiveTabIndex = this.setActiveTabIndex.bind(this);
	}

	getTabs() {
		return [
			{
				title: "First",
				datasourceUrl: "https://dev.initpro.ru/applicants/Table1.json",
				dataField: "tenders"
			},
			{
				title: "Second",
				datasourceUrl: "https://dev.initpro.ru/applicants/Table2.json",
				dataField: "companies"
			}
		];
	}

	getTabTitles() {
		return this.getTabs().map(tab => tab.title);
	}

	getActiveTabIndex() {
		return this.state.activeTabIndex;
	}

	setActiveTabIndex(tabIndex) {
		this.setState({activeTabIndex: tabIndex});
	}

	getSearchString() {
		return this.state.searchString;
	}

	setSearchString(searchString) {
		this.setState({searchString: searchString});
	} 

	getActiveTab() {
		return this.getTabs()[this.getActiveTabIndex()];
	}

	getDatasource() {
		return new Datasource(this.getActiveTab().datasourceUrl, this.getActiveTab().dataField);
	}

	render() {
		return (
			<div className={styles["application"]}>
				<Panel>
					<PanelHeading>
						<Tabsheet tabs={this.getTabTitles()} activeTabIndex={this.getActiveTabIndex()}
								  onTabClick={this.setActiveTabIndex}/>
						<input className="search" onChange={(e) => this.setSearchString(e.target.value)} 
							   value={this.getSearchString()} placeholder="Search"/>
					</PanelHeading>
					<PanelBody>
						<Table datasource={this.getDatasource()} searchString={this.getSearchString()}/>
					</PanelBody>
				</Panel>
			</div>
		);
	}
}
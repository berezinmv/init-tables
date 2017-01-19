import React from "react";
import styles from "./tabsheet.less";

export default class Tabsheet extends React.Component {
	getActiveTabIndex() {
		return this.props.activeTabIndex;
	}

	getTabClassName(tabIndex) {
		return (this.getActiveTabIndex() === tabIndex) ? "active" : "";
	}

	getTabs() {
		return this.props.tabs || [];
	}

	propagateTabClick(tabIndex) {
		if (tabIndex === this.getActiveTabIndex()) {
			return;
		}
		this.props.onTabClick(tabIndex);
	}

	render() {
		return (
			<ul className={styles["tabsheet"]}>
				{this.getTabs().map((title, index) => 
					<li key={index} role="presentation" className={this.getTabClassName(index)}
						onClick={() => this.propagateTabClick(index)}>
						<a>{title}</a>
					</li>)}
			</ul>
		);
	}
}
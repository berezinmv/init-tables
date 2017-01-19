import React from "react";
import styles from "./panel.less";

export default class PanelBody extends React.Component {
	render() {
		return (
			<div className={styles["panel-body"]}>
				{this.props.children}
			</div>
		);
	}
}
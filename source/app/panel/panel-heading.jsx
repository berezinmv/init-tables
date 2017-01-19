import React from "react";
import styles from "./panel.less";

export default class PanelHeading extends React.Component {
	render() {
		return (
			<div className={styles["panel-heading"]}>
				{this.props.children}
			</div>
		);
	}
}
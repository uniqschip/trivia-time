// Loading.js
import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function Loading() {
	return (
		<div
			className="quiz--container"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Spinner size="xl" thickness="4px" speed="0.65s" />
			<h1>LOADING...</h1>
		</div>
	);
}

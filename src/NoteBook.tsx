import React from "react";
import { RouteComponentProps } from "@reach/router";

export const NoteBook: React.FunctionComponent<RouteComponentProps> = () => (
  <iframe
    seamless
    style={{ display: "fixed" }}
    src="https://brentbaum-notion.netlify.com/"
  ></iframe>
);

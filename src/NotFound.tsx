import React from "react";
import { RouteComponentProps } from "@reach/router";

export const NotFound: React.FunctionComponent<RouteComponentProps> = () => (
  <div
    className="page"
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <div>
      <code style={{ lineHeight: 1.4 }}>
        <div style={{ marginBottom: 24, opacity: 0.6 }}>
          404: that page is Lost
        </div>
        {poemText.split("\n").map(text => (
          <div key={text}>{text}</div>
        ))}
        <div style={{ marginTop: 24 }}>
          "{title}", by {author}
        </div>
      </code>
    </div>
  </div>
);

const poemText = `
Stand still. The trees ahead and bushes beside you
Are not lost. Wherever you are is called Here,
And you must treat it as a powerful stranger,
Must ask permission to know it and be known.
The forest breathes. Listen. It answers,
I have made this place around you.
If you leave it, you may come back again, saying Here.
No two trees are the same to Raven.
No two branches are the same to Wren.
If what a tree or a bush does is lost on you,
You are surely lost. Stand still. The forest knows
Where you are. You must let it find you.
`;

const title = "Lost";
const author = "David Wagoner";

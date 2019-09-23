import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
const base = 0.7;

export const NotFound: React.FunctionComponent<RouteComponentProps> = () => {
  const count = poemText.split("\n").length;
  const getOpacity = (i: number) =>
    base + (1 - base) * ((i + 2 * (i % 2)) / count);
  return (
    <div
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div>
        <code style={{ lineHeight: 1.4 }}>
          <div style={{ marginBottom: 24, opacity: base }}>
            404: that page is Lost
          </div>
          {poemText.split("\n").map((text, i) => (
            <div key={text} style={{ opacity: getOpacity(i) }}>
              {text}
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            "{title}", by {author}
          </div>
          <Link
            style={{
              marginLeft: 16,
              marginTop: 8,
              color: "black"
            }}
            to="/"
          >
            {"<- Go home"}
          </Link>
        </code>
      </div>
    </div>
  );
};

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

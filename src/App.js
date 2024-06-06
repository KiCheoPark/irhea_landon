import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode("WELCOME");
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.recipes.length; i++) {
    let r = props.recipes[i];
    lis.push(
      <li key={r.id}>
        <a
          id={r.id}
          href={"/read" + r.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {r.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title} </h2>
      {props.body}
    </article>
  );
}
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const recipes = [
    { id: 1, title: "RECIPE1", body: "RECIPE1 is ..." },
    { id: 2, title: "RECIPE2", body: "RECIPE2 is ..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome!" body="Enjoy the Best Flavor" />;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < recipes.length; i++) {
      if (id === recipes[i].id) {
        title = recipes[i].title;
        body = recipes[i].body;
      }
    }
    content = <Article title={title} body={body} />;
  }
  return (
    <div>
      <Header
        title="iRHEA"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        recipes={recipes}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      {content}
    </div>
  );
}

export default App;

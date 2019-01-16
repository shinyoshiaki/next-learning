import * as React from "react";
import axios from "axios";
import Link from "next/link";

import Layout from "../components/MyLayout";

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>;
}

const Index: StatelessPage<{ shows?: any[] }> = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await axios
    .get("https://api.tvmaze.com/search/shows?q=batman")
    .catch(console.log);
  if (!res) return;
  return { shows: res.data };
};

export default Index;

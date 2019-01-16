import Layout from "../components/MyLayout";
import Link from "next/link";
import loadDB from "../lib/load-db";

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = ({ data }) => {
  console.log({ data });
  return (
    <Layout>
      <h1>Hacker News - Latest</h1>
      <ul>
        {data &&
          data.map(story => (
            <PostLink key={story.id} id={story.id} title={story.title} />
          ))}
      </ul>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const db = await loadDB();

  const ids = await db.child("topstories").once("value");
  let stories = await Promise.all(
    ids
      .val()
      .slice(0, 10)
      .map(id =>
        db
          .child("item")
          .child(id)
          .once("value")
      )
  );

  const data = stories.map((s: any) => s.val());
  console.log(data);

  return { data };
};

export default Index;

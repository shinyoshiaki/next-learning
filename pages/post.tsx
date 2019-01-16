import { withRouter } from "next/router";
import Layout from "../components/MyLayout";

const Content = withRouter((props: any) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
));

const Page = () => (
  <Layout>
    <Content />
  </Layout>
);

export default Page;

/* eslint-disable-next-line */
export interface IntroToGraphqlProps {}

export function IntroToGraphql(props: IntroToGraphqlProps) {
  return (
    <div>
      <h1>Intro to GraphQL</h1>
      <p>
        GraphQL is a query language for APIs. What does this mean for you? Unlike regular SOAP or REST APIs, Graphql
        gives you the ultimate flexibility in being able to specify in your API requests specifically what data you
        need, and get back exactly that.
      </p>
      <p>
        As a query language, it provides you with a lot of flexibility that most normal APIs will not. Without needing
        to recreate endpoints, you can provide developers with the same functionality as a bulk endpoint. Your queries
        will be cleaner and easier to understand by combining multiple queries into one request.
      </p>
    </div>
  );
}

export default IntroToGraphql;

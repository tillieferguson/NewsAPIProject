import React from "react";
import { Grid, Header, Image, List } from "semantic-ui-react";

const Article = props => {
  const { article } = props;
  if (article.urlToImage == null) {
    return (
      <List.Item style={{ padding: 30 }}>
        <Grid>
          <Grid.Column
            width={16}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <Header as="h3"><a href={article.url} target="_blank">{article.title}</a></Header>
            <List.Description style={{ margin: "20px 0" }}>
              {article.description}
            </List.Description>
            <p>{article.publishedAt.split("T")[0]} – {article.source.name}</p>
          </Grid.Column>

        </Grid>
      </List.Item>
    );
  }
  return (
    <List.Item style={{ padding: 20 }}>
      <Grid>
        <Grid.Column width={5}>
          <Image src={article.urlToImage} />

        </Grid.Column>
        <Grid.Column
          width={11}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <Header as="h3"><a href={article.url} target="_blank">{article.title}</a></Header>
          <List.Description style={{ margin: "20px 0" }}>
            {article.description}
          </List.Description>
          <p>{article.publishedAt.split("T")[0]} – {article.source.name}</p>
        </Grid.Column>

      </Grid>
    </List.Item>
  );
};

export const ArticleList = props => {
  return (
    <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
      {props.articles.map((article, index) => (
        <Article article={article} key={article.title + index} />
      ))}
    </List>
  );
};


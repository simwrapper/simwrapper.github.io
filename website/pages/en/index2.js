/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2
        style={{
          padding: '1rem 0',
          color: 'white',
        }}
        className="projectTitle"
      >
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a
          style={{ padding: '1rem 1rem', backgroundColor: 'white' }}
          className="button"
          href={props.href}
          target={props.target}
        >
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div
          style={{
            marginTop: '3rem',
            paddingBottom: '1rem',
            backgroundColor: '#00000090',
          }}
          className="inner"
        >
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href={docUrl('intro')}>Go to Documentation</Button>
            {/* <Button href={docUrl("doc1.html")}>Example Link</Button> */}
            {/* <Button href={docUrl("doc2.html")}>Example Link 2</Button> */}
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
        <GridBlock align="center" contents={props.children} layout={props.layout} />
      </Container>
    );

    const FeatureCallout = () => (
      <div className="productShowcaseSection paddingBottom" style={{ textAlign: 'center' }}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'To make your landing page more attractive, use illustrations! Check out ' +
              '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
              'The illustrations you see on this page are from unDraw.',
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const MetadataBlog = require('../../core/MetadataBlog.js');

    const LatestBlogEntries = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{
          textAlign: 'center',
          backgroundColor: '#222244ee',
          color: '#888',
          paddingTop: '1rem',
        }}
      >
        <h2 style={{ color: 'white' }}>Latest News</h2>
        <ul style={{ listStyleType: 'none' }}>
          {MetadataBlog.slice(0, 4).map((item, index) => (
            <li style={{ marginBottom: '1rem', fontSize: '22px' }} key={index}>
              <a style={{ color: '#33bb77' }} href={`/blog/${item.path}`}>
                {item.title}
              </a>{' '}
              <br />
              <small style={{ fontSize: '15px' }}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  weekday: undefined,
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </small>
            </li>
          ))}
        </ul>
      </div>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content: 'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Each new Docusaurus project has **randomly-generated** theme colors.',
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div
        style={{
          backgroundImage: 'url("img/dark-background.jpg")',
          backgroundColor: 'black',
        }}
      >
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          {/* <FeatureCallout /> */}
          {/* <Features /> */}
          <LatestBlogEntries />
          {/* <LearnHow /> */}
          {/* <TryOut /> */}
          {/* <Description /> */}
          {/* <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;

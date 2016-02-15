import React from 'react';
import {
  Layout, Header, HeaderRow, HeaderTabs, Tab, Drawer, Content,
  FABButton, Icon,
  Card, CardTitle, CardText
} from 'react-mdl';
import CompanyBox from './CompanyBox'

const About = (prop)=>(
  <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
    <CardTitle style={{color: '#fff', height: '176px',
    background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>{prop.title}</CardTitle>
    <CardText>{prop.description}</CardText>
  </Card>
);

export default class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: 0};
  }

  render() {
    const tabContent = this.state.activeTab === 0 ?
      <CompanyBox url="/companies"/> :
      <div className="mdl-grid">
        <About title="Demo REST Client"
               description="Made possible with Material Design Lite (MDL), ReactJS, ECMAScript 2015 & Gulp."/>
      </div>;

    return (
      <div style={{height: '100%', position: 'relative'}}>
        <Layout fixedHeader fixedTabs>
          <Header>
            <HeaderRow title="Company Services"/>
            <HeaderTabs onChange={this.activateTab.bind(this)}>
              <Tab>Demo</Tab>
              <Tab>About</Tab>
            </HeaderTabs>
          </Header>
          <Drawer title="Company Services"/>
          <Content>
            <div className="page-content">
              {tabContent}
            </div>
          </Content>
        </Layout>
      </div>
    );

  }

  activateTab(activeTab) {
    this.setState({activeTab});
  }

}
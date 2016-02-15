import React from 'react';
import {
  Layout, Header, HeaderRow, HeaderTabs, Tab, Drawer, Content,
  FABButton, Icon,
  DataTable,
  Textfield
} from 'react-mdl';

import CompanyForm from './CompanyForm'
import CompanyList from './CompanyList'

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.state.showNewForm ?
          <CompanyForm url={this.props.url}
                       title="New Company"
                       onCancel={this.toggleNewForm.bind(this, false)}
                       onSave={this.savedNewCompany.bind(this)}/>
          : this.state.companies.length ?
          <CompanyList url={this.props.url} companies={this.state.companies}
                       onSave={this.refreshFromServer.bind(this)}/>
          :
          <div className="mdl-grid mdl-cell mdl-cell--12-col mdl-shadow--2dp">No company data found. Add a
            company?</div>

        }
        <FABButton colored onClick={this.toggleNewForm.bind(this, true)}>
          <Icon name="add"/>
        </FABButton>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      showNewForm: false
    };
  }

  componentDidMount() {
    this.refreshFromServer();
  }

  refreshFromServer() {
    $.when($.ajax({
      url: this.props.url,
      cache: false
    })).then(companies => this.setState({companies}), function (error) {
      throw error;
    });
  }

  savedNewCompany() {
    this.toggleNewForm(false);
    this.refreshFromServer();
  }

  toggleNewForm(showNewForm) {
    this.setState({showNewForm});
  }
}

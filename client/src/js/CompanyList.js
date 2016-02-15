import React from 'react';
import {
  List, ListItem, ListItemContent, ListItemAction,
  IconButton
} from 'react-mdl';
import CompanyForm from './CompanyForm'

export default class extends React.Component {
  render() {
    const editModes = this.state.editModes;

    const items = this.props.companies.map(company => {

      return (
        <ListItem key={company.id}>
          <ListItemContent avatar="person">
            {editModes.has(company.id) ?
              <CompanyForm
                title={company.name}
                companyId={company.id}
                url={this.props.url + '/' + company.id}
                onSave={this.companyUpdated.bind(this, company.id)}
                onCancel={this.viewMode.bind(this, company.id)}
              />
              :
              company.name
            }
          </ListItemContent>
          <ListItemAction>
            {editModes.has(company.id) ? null :
              <IconButton name="edit" onClick={this.editCompany.bind(this, company.id)}/>
            }
          </ListItemAction>
        </ListItem>
      );
    });

    return <List className="company-list">{items}</List>;
  }

  constructor(props) {
    super(props);

    this.state = {
      editModes: new Set()
    };
  }

  editCompany(companyId) {
    const editModes = this.state.editModes;

    if (editModes.has(companyId)) {
      editModes.delete(companyId);
    } else {
      editModes.add(companyId);
    }

    this.setState({editModes});
  }

  companyUpdated(companyId) {
    this.viewMode(companyId);
    this.props.onSave();
  }

  viewMode(companyId) {
    const editModes = this.state.editModes;
    editModes.delete(companyId);
    this.setState({editModes});
  }

}

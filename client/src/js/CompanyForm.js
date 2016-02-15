import React from 'react';

import {
  Textfield, Button,
  Card, CardTitle, CardText,CardActions, CardMenu, IconButton,
  List, ListItem, ListItemAction, ListItemContent
} from 'react-mdl';

class CompanyForm extends React.Component {
  render() {
    const form = this.state.form;

    const owners = form.owners.map((name, index) => (
      <ListItem key={index}>
        <ListItemContent>{name}</ListItemContent>
        <ListItemAction>
          <IconButton type="button" name="delete" onClick={this.removeOwner.bind(this, index)}/>
        </ListItemAction>
      </ListItem>
    ));

    return (
      <form onSubmit={this.submitForm.bind(this)} className="mdl-grid mdl-cell mdl-cell--12-col mdl-shadow--2dp">
        <div className="mdl-typography--headline-color-contrast mdl-cell--12-col">{this.props.title}</div>
        <Textfield label="Name" value={form.name}
                   className="mdl-cell"
                   error={this.state.errors.name} onChange={this.changeName.bind(this)}/>
        <Textfield label="Address" value={form.address}
                   className="mdl-cell"
                   error={this.state.errors.address} onChange={this.changeAddress.bind(this)}/>
        <Textfield label="City" value={form.city}
                   className="mdl-cell"
                   error={this.state.errors.city} onChange={this.changeCity.bind(this)}/>
        <Textfield label="Country" value={form.country}
                   className="mdl-cell"
                   error={this.state.errors.country} onChange={this.changeCountry.bind(this)}/>
        <Textfield label="Email" value={form.email}
                   className="mdl-cell"
                   error={this.state.errors.email} onChange={this.changeEmail.bind(this)}/>
        <div className="mdl-cell mdl-cell--12-col mdl-grid mdl-grid--no-spacing">
          <Textfield className="mdl-cell mdl-cell--12-col" label="Add Owner ('Enter' to add one owner)"
                     value={form.addOwner}
                     error={this.state.errors.owners}
                     onKeyDown={this.addOwner.bind(this)}
                     onChange={this.changeAddOwner.bind(this)}/>
          {owners.length > 0 &&
          <List className="owner-list mdl-cell mdl-cell-12 mdl-cell--12-col mdl-shadow--2dp">{owners}</List>
          }
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <Button colored ripple>Save</Button>
          <Button type="button" ripple onClick={this.cancel.bind(this)}>Cancel</Button>
        </div>
      </form>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '', address: '', city: '', country: '', email: '',
        addOwner: '', owners: [],
      },
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.companyId) {
      $.when($.ajax({
        url: this.props.url,
        cache: false
      })).then(company => {
        this.setState({form: company});
      }, function (error) {
        throw error;
      });
    }
  }

  changeName(e) {
    const form = this.state.form;
    form.name = e.target.value;
    this.setState({form});
  }

  changeAddress(e) {
    const form = this.state.form;
    form.address = e.target.value;
    this.setState({form});
  }

  changeCity(e) {
    const form = this.state.form;
    form.city = e.target.value;
    this.setState({form});
  }

  changeCountry(e) {
    const form = this.state.form;
    form.country = e.target.value;
    this.setState({form});
  }

  changeEmail(e) {
    const form = this.state.form;
    form.email = e.target.value;
    this.setState({form});
  }

  changeAddOwner(e) {
    const form = this.state.form;
    form.addOwner = e.target.value;
    this.setState({form});
  }

  addOwner(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      const form = this.state.form;
      const errors = this.state.errors;

      if (form.addOwner.trim().length > 0) {
        const owners = form.owners;
        owners.push(form.addOwner.trim());
        delete errors['owners'];
        this.setState({owners, errors});
      } else {
        errors['owners'] = 'cannot add empty owner';
        this.setState({errors});
      }
    }
  }

  removeOwner(idx) {
    const form = this.state.form;
    form.owners.splice(idx, 1);
    this.setState({form});
  }

  submitForm(e) {
    e.preventDefault();

    let method = 'POST';
    if (this.props.companyId) {
      method = 'PUT';
    }

    $.when($.ajax({
      method,
      url: this.props.url,
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify(this.state.form)

    })).then(company => {
      this.props.onSave(company);

    }, xhr => {
      if (xhr.responseJSON) {
        const errors = {};
        const serverErrors = xhr.responseJSON.errors;
        serverErrors.forEach(error => {
          errors[error.field] = error.defaultMessage;
        });
        console.debug(errors);
        this.setState({errors});
      } else {
        debugger;
      }
    });
  }

  cancel() {
    this.props.onCancel();
  }
}

CompanyForm.defaultProps = {
  onCancel() {

  }
};

export default CompanyForm;


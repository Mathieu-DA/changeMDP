import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card, CardImg, CardTitle, } from 'reactstrap';
import "./breached.css";


class Breached extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "https://haveibeenpwned.com/Content/Images/PwnedLogos/" + this.props.site.Name + "." + this.props.site.LogoType,
      id: this.props.site.Name.replace(/[0-9]/g, '')
    };
  }


  render() {
    return (
      <div>
        <Card className="cards">
          <CardImg className="cardImage" top width="100%" src={this.state.logo} alt={this.props.site.Name} />
          <CardBody>
            <CardTitle><u>Site piraté</u>: <p>{this.props.site.Name}</p></CardTitle>
            <p className="lead"><u>Données compromises</u>: {this.props.site.DataClasses.map(c => <span>{c}, </span>)}</p>
            <p><u>Date de la violation</u>: {this.props.site.BreachDate}</p>
            <div id={this.state.id} style={{ marginBottom: '1rem' }} className="description">+ d'informations</div>
            <UncontrolledCollapse toggler={"#" + this.state.id}>
              <Card>
                <CardBody className="cardbody">
                <div dangerouslySetInnerHTML={{__html: this.props.site.Description}} />
                </CardBody>
              </Card>
            </UncontrolledCollapse>
            {this.props.site.Domain === "" ? <div></div> : 
            <a href={"https://" + this.props.site.Domain} target="_blank" rel="noopener noreferrer">
            <Button className="buttons" color="primary" style={{ marginBottom: '1rem' }}>Aller sur {(this.props.site.Domain)[0].toUpperCase() + (this.props.site.Domain).slice(1).toLowerCase()}</Button></a>}
          </CardBody>
        </ Card>
      </div>

    )
  }
}


export default Breached;
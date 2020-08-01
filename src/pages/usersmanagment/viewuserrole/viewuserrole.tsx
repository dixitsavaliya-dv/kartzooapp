import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import API from "../../../service/role.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";

class ViewUserRole extends React.Component<{ history: any; location: any }> {
  state = {
    roledata: {
      rolename: "",
      description: "",
    },
  };
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    document.title = constant.viewUserRoleTitle + utils.getAppName();
    const roleId = this.props.location.pathname.split("/")[2];
    if (roleId != undefined) {
      const obj = {
        id: roleId,
      };
      const getRoleById: any = await API.getRoleById(obj);
      console.log("getRoleById", getRoleById);
      this.setState({
        roledata: {
          rolename: getRoleById.resultObject.role,
          description: getRoleById.resultObject.description,
        },
      });
    }
  }

  render() {
    return (
      <>
        <NavBar>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>View Role</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/userrole">
                          <Button
                            type="button"
                            size="sm"
                            color="primary"
                            className="mb-2 mr-2 custom-button"
                          >
                            Back
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="role_name">
                            <b>Role Name</b>
                          </Label>
                          <p>{this.state.roledata.rolename}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>Description</b>
                          </Label>
                          <p>{this.state.roledata.description}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </NavBar>
      </>
    );
  }
}

export default ViewUserRole;

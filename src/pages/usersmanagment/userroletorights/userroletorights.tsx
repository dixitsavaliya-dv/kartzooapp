import React from "react";
import { Link } from "react-router-dom";
import RoleAPI from "../../../service/role.service";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  Form,
  CustomInput,
  FormGroup,
  Table,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
// import './users.css';
import NavBar from "../../navbar/navbar";
import constant from "../../../constant/constant";
import utils from "../../../utils";
import "./userroletorights.css";
import { any } from "prop-types";

class UserRoleToRights extends React.Component {
  state = {
    userrole: [],
    roleid: '0',
    onItemSelect: "",
    mainItemName: [],
    role: [],
    roleprivileges: [],
    _maincheck: false,
    show: false,
  };

  constructor(props: any) {
    super(props);
    this.getUserRole = this.getUserRole.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkMaster = this.checkMaster.bind(this);
    this.updateRights = this.updateRights.bind(this);
  }

  componentDidMount() {
    document.title = constant.rolePrivilegesTitle + utils.getAppName();
    this.getUserRole();
  }

  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();

    if (getUserRole.resultObject != null) {
      this.setState({
        userrole: this.state.userrole = getUserRole.resultObject,
      });
    } else {
      const msg1 = getUserRole.explanation;
      utils.showError(msg1);
    }
  }

  async onItemSelect(event: any) {
    this.setState({
      roleid: this.state.roleid =
        event.target.options[event.target.selectedIndex].value,
      show: this.state.show = true,
    });
    const obj = {
      id: this.state.roleid,
    };
    const getRolePreveliges = await RoleAPI.getRolePreveliges(obj);
    if (getRolePreveliges.resultObject !== null) {
      this.setState({
        mainItemName: this.state.mainItemName =
          getRolePreveliges.resultObject.menuItems,
        role: this.state.role = getRolePreveliges.resultObject.roleprivileges,
      });

      let data = this.state.role;

      let count = 0;
      data.forEach((element: any) => {
        if (
          element.view == true &&
          element.delete == true &&
          element.add == true &&
          element.edit == true &&
          element.detail == true
        ) {
          element._rowChecked = true;
          count++;
        } else {
          element._rowChecked = false;
        }
      });
      this.setState({
        roleprivileges: this.state.roleprivileges = data,
      });
    } else {
      const msg1 = "Error";
      utils.showError(msg1);
    }
  }

  checkMaster(data: any) {
    let count = 0;
    data.forEach((element: any) => {
      if (
        element.view == true &&
        element.add == true &&
        element.edit == true &&
        element.delete == true &&
        element.detail == true
      ) {
        element._rowChecked = true;
        count++;
      } else {
        element._rowChecked = false;
      }
    });
    if (count == data.length) {
      this.setState({
        _maincheck: true,
      });
    } else {
      this.setState({
        _maincheck: false,
      });
    }
    this.setState({
      roleprivileges: data,
    });
  }

  handleChange(item: any, type: any, e: any) {
    let _id = item.menuItemID;
    let _type = type;
    let ind: any = this.state.roleprivileges.findIndex(
      (x: any) => x.menuItemID == _id
    );
    let data: any = this.state.roleprivileges;
    if (ind > -1) {
      if (
        _type != "view" &&
        _type != "add" &&
        _type != "edit" &&
        _type != "delete" &&
        _type != "detail"
      ) {
        let newState: any = !item._rowChecked;
        data[ind]._rowChecked = newState;
        if (!newState) {
          data[ind].view = false;
          data[ind].add = false;
          data[ind].edit = false;
          data[ind].delete = false;
          data[ind].detail = false;
        } else {
          data[ind].view = true;
          data[ind].add = true;
          data[ind].edit = true;
          data[ind].delete = true;
          data[ind].detail = true;
        }
      } else {
        let newState = !item[_type];
        data[ind][_type] = newState;
      }
      this.setState({
        roleprivileges: data,
      });
    }
    this.checkMaster(data);
  }

  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.roleprivileges.forEach((element: any) => {
      element._rowChecked = _val;
      element.view = _val == true ? true : false;
      element.add = _val == true ? true : false;
      element.edit = _val == true ? true : false;
      element.delete = _val == true ? true : false;
      element.detail = _val == true ? true : false;
    });
    this.setState({
      roleprivileges: this.state.roleprivileges,
    });
    this.setState({
      _maincheck: _val,
    });
  }

  async updateRights() {
    console.log("userdata",this.state.roleprivileges);
    let privilegesArray = [];
    for(var i=0;i<this.state.roleprivileges.length;i++) {
      privilegesArray.push({
        menuitemid: this.state.roleprivileges[i]['menuItemID'],
        view:this.state.roleprivileges[i]['view'],
        add:this.state.roleprivileges[i]['add'],
        edit:this.state.roleprivileges[i]['edit'],
        delete:this.state.roleprivileges[i]['delete'],
        detail:this.state.roleprivileges[i]['detail']
      })
    }
    const obj = {
      roleid:parseInt(this.state.roleid),
      isadminuser:true,
      privileges:privilegesArray
    }

    const updateRolePreveliges = await RoleAPI.updateRolePreveliges(obj);
    console.log("updateRolePreveliges", updateRolePreveliges);

    if (updateRolePreveliges.resultObject !== null) {
      const msg = "Role privileges Updated Successfully";
      utils.showSuccess(msg);
    } else {
      const msg1 = "Error";
      utils.showError(msg1);
    }

  }

  render() {
    return (
      <>
        <NavBar>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <CardTitle className="font">
                      Role Privileges Management
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Row>
                        <Col md="4">
                          <Form>
                            <FormGroup>
                              <Label for="exampleCustomSelect">
                                <b>Select Role To Manage The All Rights:</b>
                              </Label>
                              <CustomInput
                                type="select"
                                id="exampleCustomSelect"
                                name="customSelect"
                                onChange={this.onItemSelect}
                              >
                                <option value="">Select UserRole:</option>
                                {
                                this.state.userrole.length > 0 ? this.state.userrole.map((data:any, index) =>
                                    <option key={data.value} value={data.value}>{data.name}</option>
                                ) : ''
                            }
                              </CustomInput>
                            </FormGroup>
                          </Form>
                        </Col>
                        <Col md="8">
                          <div className="right">
                            <Link to="/">
                              <Button
                                className="mb-2 mr-2 custom-button"
                                color="primary"
                              >
                                Export Details
                              </Button>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                      {this.state.show === true ? (
                        <>
                          <Row>
                            <Col md="12">
                              <Card className="main-card mb-8">
                                <CardHeader>
                                  <CardTitle className="font">
                                    Role Privileges
                                  </CardTitle>
                                </CardHeader>
                                <CardBody>
                                  <Table
                                    hover
                                    className="mb-0 table_responsive"
                                    bordered
                                  >
                                    <thead>
                                      <tr>
                                        <th className="centers">
                                          <CustomInput
                                            name="name"
                                            defaultValue="value"
                                            type="checkbox"
                                            id="exampleCustomCheckbox"
                                            onChange={this.handleMainChange}
                                            checked={this.state._maincheck}
                                          />
                                        </th>
                                        <th className="centers">
                                          <span>Name</span>
                                        </th>
                                        <th>View</th>
                                        <th>Add</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        <th>Detail</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.roleprivileges != null ? (
                                        <>
                                          {this.state.roleprivileges.map(
                                            (data: any, index: any) => (
                                              <tr>
                                                <td className="centers">
                                                  <CustomInput
                                                    name={data.module}
                                                    defaultValue={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["_rowChecked"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={data.menuItemID}
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "row",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["_rowChecked"] == true
                                                    }
                                                  />
                                                </td>

                                                <td>
                                                  <span>{data.menuItem}</span>
                                                </td>

                                                <td className="centers">
                                                  <CustomInput
                                                    name="view"
                                                    value={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["view"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={
                                                      data.menuItemID + "view"
                                                    }
                                                    data_type="view"
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "view",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["view"] == true
                                                    }
                                                  />
                                                </td>
                                                <td className="centers">
                                                  <CustomInput
                                                    name="add"
                                                    value={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["add"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={data.menuItemID + "add"}
                                                    data_type="add"
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "add",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["add"] == true
                                                    }
                                                  />
                                                </td>
                                                <td className="centers">
                                                  <CustomInput
                                                    name="edit"
                                                    value={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["edit"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={
                                                      data.menuItemID + "edit"
                                                    }
                                                    data_type="edit"
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "edit",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["edit"] == true
                                                    }
                                                  />
                                                </td>
                                                <td className="centers">
                                                  <CustomInput
                                                    name="delete"
                                                    value={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["delete"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={
                                                      data.menuItemID + "delete"
                                                    }
                                                    data_type="delete"
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "delete",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["delete"] == true
                                                    }
                                                  />
                                                </td>
                                                <td className="centers">
                                                  <CustomInput
                                                    name="detail"
                                                    value={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["detail"] == true
                                                        ? 1
                                                        : 0
                                                    }
                                                    type="checkbox"
                                                    id={
                                                      data.menuItemID + "detail"
                                                    }
                                                    data_type="detail"
                                                    onChange={(e) =>
                                                      this.handleChange(
                                                        data,
                                                        "detail",
                                                        e
                                                      )
                                                    }
                                                    checked={
                                                      this.state.roleprivileges[
                                                        index
                                                      ]["detail"] == true
                                                    }
                                                  />
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </tbody>
                                  </Table>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                          <Row className="button_top">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                              style={{ margin: "15px" }}
                              onClick={this.updateRights}
                            >
                              Save
                            </Button>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <br />
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

export default UserRoleToRights;

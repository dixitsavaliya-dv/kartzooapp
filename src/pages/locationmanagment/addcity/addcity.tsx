import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Input,
    Col,
    Form,
    CustomInput,
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/location.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { cityCreateRequest, cityUpdateRequest } from '../../../modelController/cityModel';

class AddCity extends React.Component<{ history: any }> {

    state = {
        selectedFile: {},
        selectedState:'',
        cityname: '',
        citynameerror: '',
        selectedFileerror: '',
        selectedStateerror: ''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addCity = this.addCity.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onItemStateSelect = this.onItemStateSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addCityTitle + utils.getAppName();
        // const getCountry = await API.getCountry();
        // console.log("getCountry",getCountry);

          // const getState = await API.getState();
        // console.log("getState",getState);
    }

    validate() {
        let citynameerror = "";
        let selectedFileerror = "";
        let selectedStateerror = "";

        if (!this.state.cityname) {
            citynameerror = "please enter city name";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select country";
        }

        if (!this.state.selectedState) {
            selectedStateerror = "please select state";
        }

        if (citynameerror || selectedFileerror || selectedStateerror) {
            this.setState({ citynameerror,selectedFileerror,selectedStateerror });
            return false;
        }
        return true;
    };

    onItemSelect(event: any) {
        // this.setState({

        // })
    }

    onItemStateSelect(event:any) {

    }

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async addCity() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                citynameerror: '',
                selectedFileerror: '',
                selectedStateerror: ''
            })
            if (this.state.cityname && this.state.selectedFile && this.state.selectedState) {
                const obj : cityCreateRequest = {
                    cityname: this.state.cityname,
                    selectedFile: this.state.selectedFile,
                    selectedState: this.state.selectedState
                }

                const obj1 : cityUpdateRequest = {
                    id:'',
                    cityname: this.state.cityname,
                    selectedFile: this.state.selectedFile,
                    selectedState: this.state.selectedState
                }


                // const addCity = await API.addCity(obj);
                // console.log("addCity",addCity);

                // const editCity = await API.editCity(obj);
                // console.log("editCity",editCity);

                if (this.state.cityname === obj.cityname && this.state.selectedFile === obj.selectedFile && this.state.selectedState === obj.selectedState) {
                    const msg = "City Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/city');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
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
                                                <h1>Add City</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/city">
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
                                                    <Label htmlFor="city_name">City Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="city_name"
                                                        name="cityname"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your city name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.citynameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select State</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="customSelect"
                                                            onChange={this.onItemStateSelect}
                                                        >
                                                            <option value="">Select State</option>
                                                            <option value="Gujarat">Gujarat</option>
                                                            <option value="Rajasthan">Rajasthan</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.selectedStateerror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addCity}
                                        >
                                            Save
                                    </Button>
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

export default AddCity;

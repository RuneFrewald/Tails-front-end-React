import { connect } from 'react-redux'
import StepHistory from '../StepHistory'
import NextStep from '../NextStep'
import { getListings } from '../Actions/listing'
import '../lists.scss'

class StepThree extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            pick_up_address: "",
            pick_up_state: -1,
            pick_up_city: "",
            pick_up_zip: "",
            delivery_address: "",
            delivery_state: -1,
            delivery_city: "",
            delivery_zip: ""
        }
    }

    componentWillMount() {
        const { animalInfos } = this.props
        this.props.getListings(animalInfos.selectedAnimals.listing_id)
    }

    componentDidMount() {
        const { listing } = this.props
        console.log(listing)
    }
    setValue = (field, value) => {
        this.setState({[field]: value.target.value})
    }

    render() {
        const {
            pick_up_address,
            pick_up_state,
            pick_up_city,
            pick_up_zip,
            delivery_address,
            delivery_state,
            delivery_city,
            delivery_zip
        } = this.state

        return (
            <div className="create-list">
                <div className="container">
                    <StepHistory currentState="stepThree"/>
                    <div className="step-three">
                        <div className="comment">
                            Where is it coming from and Where is it going ?
                        </div>
                        <div className="main-content">
                            <div className="form-group">
                                <label>Pick up Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pick_up_address"
                                    value={pick_up_address}
                                    onChange={this .setValue.bind(this, 'pick_up_address')}/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4 col-12">
                                        <label>Pick up State</label>
                                        <select
                                            className="form-control"
                                            name="pick_up_state"
                                            value={pick_up_state}
                                            onChange={this.setValue.bind(this, 'pick_up_state')}>
                                            <option value="-1">-- Please Select --</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 col-12">
                                        <label>Pick up City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pick_up_city"
                                            value={pick_up_city}
                                            onChange={this.setValue.bind(this, 'pick_up_city')}/>
                                    </div>
                                    <div className="col-sm-4 col-12">
                                        <label>Pick up Zip</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pick_up_zip"
                                            value={pick_up_zip}
                                            onChange={this.setValue.bind(this, 'pick_up_zip')}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Destination Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="delivery_address"
                                    value={delivery_address}
                                    onChange={this.setValue.bind(this, 'delivery_address')}/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4 col-12">
                                        <label>Destination State</label>
                                        <select
                                            className="form-control"
                                            name="delivery_state"
                                            value={delivery_state}
                                            onChange={this.setValue.bind(this, 'delivery_state')}>
                                            <option value="-1">-- Please Select --</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 col-12">
                                        <label>Destination City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="delivery_city"
                                            value={delivery_city}
                                            onChange={this.setValue.bind(this, 'delivery_city')}/>
                                    </div>
                                    <div className="col-sm-4 col-12">
                                        <label>Destination Zip</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="delivery_zip"
                                            value={delivery_zip}
                                            onChange={this.setValue.bind(this, 'delivery_zip')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NextStep nextStep="/step-four"/>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    animalInfos: state.animalsReducer,
    listing: state.listing
})

const mapDispatchToProps = dispatch => ({
    getListings: (id) => dispatch(getListings(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepThree)

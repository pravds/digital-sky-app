import React from 'react';

import { Link } from 'react-router-dom'

import FormErrors from '../components/FormErrors';

import DashboardApplicationView from './DashboardApplicationView';
import DashBoardOperatorDroneView from './DashboardOperatorDroneView';

class Dashboard extends React.Component {
  
    render() {

    const pilotProfileId = localStorage.getItem('pilotProfileId');
    const individualOperatorProfileId = localStorage.getItem('individualOperatorProfileId');
    const organizationOperatorProfileId = localStorage.getItem('organizationOperatorProfileId');
    const manufacturerProfileId = localStorage.getItem('manufacturerProfileId');

    const hasOperatorProfile = (individualOperatorProfileId > 0) || (organizationOperatorProfileId > 0)
    const hasPilotProfile = ( pilotProfileId > 0)
    const hasManufacturerProfile = ( manufacturerProfileId > 0 );
    const { errors, applications, operatorDrones } = this.props;
    
    return (
            <div>
                <div>
                    <div className="page-header dashboard-header">
                        <div className="grid-container">
                            <div className="grid-x grid-padding-x">
                                <div className="large-6 cell">
                                    <div className="buttons-wrap">
                                        {   !hasPilotProfile && !hasManufacturerProfile &&
                                            <div>
                                                <p> If you are pilot, setup your pilot profile to begin</p>
                                                <Link to="/profile" className="button">Setup my Pilot Profile</Link>
                                            </div>
                                        }

                                        {   hasPilotProfile &&
                                            <Link to="/profile" className="button">Update my Pilot Profile</Link>
                                        }
                                        <br/>
                                        {   !hasOperatorProfile && !hasManufacturerProfile &&
                                            <div>
                                                <p> If you are an operator, setup your operator profile to begin</p>
                                                <Link to="/profile" className="button">Setup my Operator Profile</Link>
                                            </div>
                                        }

                                        {   hasOperatorProfile &&
                                            <div>
                                                <Link to="/profile" className="button">Update my Operator Profile</Link>
                                                <Link to="/localDroneAcquisitionApplication" className="button">Apply here for Local Drone Acquisition</Link>
                                                <Link to="/importDroneApplication" className="button">Apply here to Import Drones</Link>
                                                <Link to="/uaopApplication" className="button">Apply here for UAOP Licence</Link>
                                            </div>
                                        }
                                        { !hasPilotProfile && !hasOperatorProfile && !hasManufacturerProfile &&
                                            <div>
                                                <br/>
                                                <p> If you are a manufacturer, setup your manufacturer profile to begin</p>
                                                <Link to="/profile" className="button">Setup my manufacturer Profile</Link>
                                            </div>
                                        }
                                        { hasManufacturerProfile &&
                                            <div>
                                                <br/>
                                                <Link to="/profile" className="button">Update my Manufacturer Profile</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="large-6 cell show-for-large">
                                    <div className="dashboard-tite-wrap">
                                        <h2>Dashboard</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                </div>
                <br/>
                {  hasOperatorProfile &&
                    <div className="page-dashboard">
                        <section id="application-status">
                            <div className="grid-container">
                                <div className="grid-x grid-padding-x">
                                    <div className="large-6  large-offset-3 cell">
                                        <h3> Application Status</h3>
                                         <FormErrors errors = {errors}/>
                                         <DashboardApplicationView applications={applications}/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
                {  hasOperatorProfile &&
                    <div className="page-dashboard">
                        <section id="my-drones">
                            <div className="grid-container">
                                <div className="grid-x grid-padding-x">
                                    <div className="large-6 large-offset-3 cell">
                                        <h3>My Drones</h3>
                                        <FormErrors errors = {errors}/>
                                        <DashBoardOperatorDroneView operatorDrones={operatorDrones} droneSelected={this.droneSelected}/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
    );
  } 
}

export default Dashboard;
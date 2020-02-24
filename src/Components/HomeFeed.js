import React from 'react'
import { Grid, List } from 'semantic-ui-react'

import SideBar from './SideBarHomeFeed'
import SideBarTwo from './SideBarTwo'
import MainFeed from './MainFeed'

class HomeFeed extends React.Component {

    render(){
        return(
            <Grid>
                <Grid.Column width={1} /> 

                <Grid.Column width={3}>
                    <SideBar />
                    <hr />
                    <SideBarTwo />
                </ Grid.Column>

                <Grid.Column width={9}>
                    <h1 style={{textAlign:'center'}}>Article Feed</h1>
                    <MainFeed />
                    
                </Grid.Column>

                <Grid.Column width={4} />
                
            </Grid>
        )
    }
}

export default HomeFeed
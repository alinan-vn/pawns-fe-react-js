import React from 'react'
import { Grid } from 'semantic-ui-react'

import SideBar from './SideBarHomeFeed'
import MainFeed from './MainFeed'

class HomeFeed extends React.Component {
    
    render(){

        const pawnsStyle = {
            textAlign: 'center',
            fontFamily: 'Didot'

        }
        
        return(
            <Grid>

                <Grid.Column width={5}>
                    <SideBar />
                </ Grid.Column>

                <Grid.Column width={9}>
                    <h1 style={pawnsStyle}>Pawns</h1>
                    <MainFeed />
                    
                </Grid.Column>

                {/* <Grid.Column width={4} /> */}
                
            </Grid>
        )
    }
}

export default HomeFeed
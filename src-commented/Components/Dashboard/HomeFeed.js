import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import SideBar from './SideBarHomeFeed'
import MainFeed from './MainFeed'
import PawnsLogo from '../../Images/pawnsOutline.png'

class HomeFeed extends React.Component {
    
    render(){

        const pawnsStyle = {
            textAlign: 'center',
            fontFamily: 'Didot'

        }
        
        return(
            <Grid>
                <div>
                    {/* <img src='h kttps://media.giphy.com/media/1ZkJFuRcBIRHH9IwPU/giphy.gif' /> */}
                </div>
                <Grid.Column width={5}>
                    <SideBar />
                </ Grid.Column>

                <Grid.Column width={9}>
                    <h1 style={pawnsStyle}> Pawns</h1>
                    <MainFeed />
                    
                </Grid.Column>

                {/* <Grid.Column width={4} /> */}
                
            </Grid>
        )
    }
}

export default HomeFeed
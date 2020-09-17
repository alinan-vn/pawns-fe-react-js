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
            <section className='home-feed'>
                <SideBar />
                <MainFeed />
            </section>



            // <Grid>
            //     <Grid.Column width={5}>
            //         <SideBar />
            //     </ Grid.Column>

            //     <Grid.Column width={9}>
            //         <h1 style={pawnsStyle}> Pawns</h1>
            //         <MainFeed />
                    
            //     </Grid.Column>
            // </Grid>
        )
    }
}

export default HomeFeed
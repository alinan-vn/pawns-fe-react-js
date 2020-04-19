import React from 'react'
import { Grid, Feed, Button, Loader} from 'semantic-ui-react'
import { tokenValidation } from '../../Actions/userValidation'
import { connect } from 'react-redux'
import { loginUser } from '../../Actions/auth'
import '../../App.css'

class Blogs extends React.Component {
    
    renderBlogs = () => {
        if (this.props.blogs.length === 0){
            return(
                <div>Loading</div>
            )
        } else {
            return(
                this.props.blogs.map(blog => {
                    
                })
            )
        }
        
    }

    componentDidMount(){
        tokenValidation(this.props)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />

                <Grid.Column width={8} className='divBackgroundCardWShadow'>
                    { this.renderBlogs() }
                </Grid.Column>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        blogs: state.blogReducer.blogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
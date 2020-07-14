import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import '../../App.css'

class EditBlog extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            date: '',
            content: '',
            author: ''
        }
    }

    getBlog = () => {
        const blogId = this.props.match.params.id 

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/${blogId}`)
        .then(r => r.json())
        .then(blog => this.setBlog(blog))
    }

    setBlog = blog => {
        console.log(blog)
        this.setState({
            title: blog.title,
            date: blog.date,
            content: blog.content,
            author: blog.author
        })
    }

    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.title]: e.target.value
        })
    }

    editBlog = () => {
        const blogId = this.props.match.params.id

        const blogObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch(`https://enigmatic-gorge-45286.herokuapp.com/${blogId}`, blogObj)
        .then(r => r.json())
        .then(blog => this.props.history.push(`/blog/${blogId}`))
    }

    componentDidMount(){
        this.getBlog()
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={3} />
                <Grid.Column 
                    width={10} 
                    className='divBackgroundCardWShadow'
                >
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <h3>{this.state.title}</h3><br />
                            <label>Author</label>
                            <h3>{this.state.author}</h3><br />
                            <label>Date written</label>
                            <h3>{this.state.date}</h3>
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea 
                                title='content'
                                label='Content'
                                placeholder='content here'
                                value={this.state.content}
                                onChange={this.handleInputChange}
                            />
                        </Form.Field>
                        <Form.Button 
                            compact={true}
                            className='buttonStyle'
                            onClick={this.editBlog}
                        >
                            Edit
                        </Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(EditBlog))
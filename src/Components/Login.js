import React from 'react'
import { Grid, Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Login extends React.Component{

    render(){
        return(
            <Grid>
                <Grid.Column width={4} />
                
                <Grid.Column width={8}>
                    <Form>
                        <Form.Field>
                            {/* <Input label='username' placeholder='username' /> */}
                            <label>Username</label>
                            <input placeholder='username' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='password' />
                        </Form.Field>
                        <Button type='submit'>Sign In!</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column width={4} />
                
            </Grid>
            
            
        )
    }
}

export default Login
import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export const Address = ({
    address,
    city,
    state,
    zip, setForm, navigation, stepHandle
}) => {
    return (
        <Container maxWidth='xs' style={{ marginTop:'3rem', marginBottom:'5rem' }}>
            <h3 style={{marginBottom:'1rem' , color:'gray', fontSize:'4vh'}}> 
                <i className="fas fa-map-marker-alt"></i> Address
            </h3>
            <TextField 
                label="Address..." 
                name= "address" value={address} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <TextField 
                label="City..." 
                name= "city" value={city} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <TextField 
                label="State..." 
                name= "state" value={state} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <TextField 
                label="Zip..." 
                name= "zip" value={zip} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
    
            <Button
                variant='contained' fullWidth color='primary' style={{ marginTop: '1rem' }}
                onClick={stepHandle}
            >
                Next
            </Button>
            <Button
                variant='contained' fullWidth color='secondary' style={{ marginTop: '1rem' }}
                onClick={() => navigation.previous()}
            >
                Back
            </Button>
        </Container>
    )
}

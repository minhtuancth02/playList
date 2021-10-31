import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export const Contact = ({ formData, setForm, navigation ,stepHandle}) => {
    return (
        <Container maxWidth='xs' style={{ marginTop:'3rem', marginBottom:'5rem' }}>
            <h3 style={{marginBottom:'1rem' ,color:'gray', fontSize:'4vh'}}> 
                <i class="far fa-address-book"></i> Contact
            </h3>
            <TextField 
                label="Phone..." 
                name= "phone" value={formData.phone} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <TextField 
                label="Email..." 
                name= "email" value={formData.email} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <TextField 
                label="Fax..." 
                name= "fax" value={formData.fax} onChange={setForm}
                required 
                margin='normal' variant='outlined' autoComplete='off' fullWidth
            />
            <Button variant='contained' fullWidth color='primary' style={{marginTop:'1rem'}}
                    onClick={stepHandle}
            >
                Next
            </Button>
            <Button variant='contained' fullWidth color='secondary' style={{marginTop:'1rem'}}
                    onClick={() => navigation.previous()}
            >
                Back
            </Button>
        </Container>
    )
}

import React from 'react'
import Container from '@material-ui/core/Container'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetail from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'



export const Review = ({ formData, setForm, navigation , stepHandle}) => {

    const { go } = navigation;
    const NamesRender = { 
        summary: ['Names'],
        details: [
            { 'First Name' : formData.firstName },
            { 'Last Name' : formData.lastName },
            { 'Nick Name' : formData.nickName }
        ],
        go: go
    };
    const AddressRender = {
      summary: ["Address"],
      details: [
        { Address: formData.address },
        { City: formData.city },
        { State: formData.state },
        { Zip: formData.zip },
      ],
      go
    };
    const ContactRender = {
      summary: ["Contacts"],
      details: [
        { Phone: formData.phone },
        { Email: formData.email },
        { Fax: formData.fax },
      ],
      go
    };


    return (
         <Container  maxWidth='xs' style={{ marginTop:'3rem', marginBottom:'5rem' }}>
            <h3 style={{marginBottom:'2rem' , color:'gray', fontSize:'4vh'}}> 
                <i class="fas fa-search"></i> Review
            </h3>
            <div>
                <RenderAccordion {...NamesRender} />
                <RenderAccordion {...AddressRender} />
                <RenderAccordion {...ContactRender} />
            </div>
    
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

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary>{summary[0]}</AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((obj, index) => {
          const ObjArr = Object.keys(obj);
          const objKey = ObjArr[0];
          const objValue = obj[objKey];
          return (
            <ListItemText
              key={index}
            >{` ${objKey} : ${objValue} `}</ListItemText>
          );
        })}
        <IconButton
          color="primary"
          component="span"
          style={{ marginTop: "0.7rem" }}
        >
          <EditIcon onClick={() => go(`${summary[0].toLowerCase()}`)} />
        </IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
);




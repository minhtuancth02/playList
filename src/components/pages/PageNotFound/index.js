import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    const history = useHistory();

    return (
      <>
        <div className="w-100 p-10">
          <div className="text-center m-6">
            <p className='text-xl m-6'>Page you're trying to access is not available!</p>
            <Button variant="outlined" color='primary' onClick={() => history.push("/")}>
              Go to Home Page
            </Button>
          </div>
        </div>
      </>
    );
};

export default PageNotFound;

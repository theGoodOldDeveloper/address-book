import React from "react";
import spinnerImg from '../../assets/img/loading.gif'

let Spinner = () => {
    return (
        <React.Fragment>
            <div>
                <img src={spinnerImg} alt='' className="d-block m-auto" style={{ width: '200px' }} />
            </div>
        </React.Fragment>
    )


    /* { <React.Fragment>
        <div>
            <img src={spinnerImg} alt='' />
        </div>
    </React.Fragment>} */
}
export default Spinner
import React from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

const News = () => {
    return (
        <div>
            News
        </div>
    );
}

export default compose(
    WithAuthRedirect,
)(News);
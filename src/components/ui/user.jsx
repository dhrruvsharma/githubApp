import React from "react";
import {Link} from "react-router-dom";
const User = ({ user }) => {
    const {avatar_url,login,id} = user;
    return (
        <div className="user">
            <div className="image">
                <figure>
                    <img src={avatar_url} alt={login}/>
                </figure>
            </div>
            <div className="user-info">
                <h3>{login}</h3>
                <small>{id}</small>
                <Link to = {`/user/${login}`}>View Profile</Link>
            </div>
        </div>
    )
};
export default User;
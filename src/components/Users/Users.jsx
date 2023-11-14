import React from "react";
import "./Users.css"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Repo from "../ui/repos"
const Users = () => {
    const { login } = useParams();

    //User Information
    const [userInfo, setUserInfo] = useState({});
    //User repos
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchUserInformation = async () => {
            const URL = "https://api.github.com";
            try {
                const response = await Promise.all([
                    axios.get(URL + `/users/${login}`),
                    axios.get(URL + `/users/${login}/repos`)
                ]);
                setUserInfo(response[0].data);
                setRepos(response[1].data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchUserInformation();
    }, [])

    return (
        <div className="container">
            <a href="/" className="back">Back</a>
            <div className="users-information">
                <figure className="image">
                    <img src={userInfo?.avatar_url} alt="" />
                    <img src="" alt="" />
                </figure>
                <div className="user-content">
                    <h3>{userInfo?.name}</h3>
                    <p>
                        {userInfo?.bio}
                    </p>
                    <div className="more-data">
                        {userInfo?.followers} Followers {userInfo?.following} Following
                        {userInfo?.location && <p>
                            {userInfo?.location}
                        </p>}
                        {userInfo.blog && <p>
                            Website : <a href={userInfo?.blog}>{userInfo?.blog}</a>
                        </p>}
                        <p>
                            <a href={userInfo?.html_url}>View Github Profile</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="user-repos">
                {
                    repos ? repos.map(repo => {
                        return <Repo repo = {repo} key = {repo.id} />
                    }): <h2>There is nothing to display...</h2>
                }
            </div>
        </div>
    )
};
export default Users;
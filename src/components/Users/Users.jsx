import React from "react";
import "./Users.css"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Repo from "../ui/repos"
import Followers from "../Followers/Followers";
import { Link } from "react-router-dom";
const Users = () => {
    const { login } = useParams();

    //User Information
    const [userInfo, setUserInfo] = useState({});
    //User repos
    const [repos, setRepos] = useState([]);

    const [el,setEl] = useState("");
    
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
                // console.log(response[1].data);
                return response[1].data;
            }
            catch (error) {
                console.error(error);
            }
        };
        // fetchUserInformation();
        let language = [];
        let obj = {};
        const most = async () => {
            const data = await fetchUserInformation();
            // console.log(data);
            data.map((d) => {
                language.push(d.language)
            })
            // console.log(language);
            for (let i = 0;i < language.length;i++){
                if (language[i] === null){
                    continue;
                }
                if (!obj[language[i]]){
                    obj[language[i]] = 1;
                }
                else {
                    obj[language[i]]++;
                }
            }
            // console.log(obj);
            let max = 0;
            
            for (const i in obj){
                if (max < obj[i]){
                    max = obj[i];
                    setEl(i);
                }
            }
            console.log(el);
        }
        most();
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
                        <Link to = {`/user/${login}/followers`}>{userInfo?.followers} Followers </Link> 
                        {userInfo?.following} Following
                        {userInfo?.location && <p>
                            {userInfo?.location}
                        </p>}
                        <p>The language most used by the user is : {el}</p>
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
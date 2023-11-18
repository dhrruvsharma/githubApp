import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Octokit } from "octokit";
const Followers = () => {
    const { login } = useParams();
    console.log(login);
    useEffect(() => {
        const fetchFollowers = async () => {
            const octokit = new octokit({
                auth: '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'
            })
            try {
                const data = await octokit.request('GET/dhrruvsharma/followers', {
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchFollowers();
    }, [])
}
export default Followers;
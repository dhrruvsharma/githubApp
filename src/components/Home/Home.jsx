import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import User from "../ui/user";
import axios from "axios";
import LoadingScreen from "../ui/Loader";
const Home = () => {

    const [load,setLoad]= useState(false);
    const [query, setQuery] = useState("");
    const handlQueryInput = (e) => {
        const value = e.target.value;
        setQuery(value);
    }
    //Users fetched from the API
    const [users, setUsers] = useState([]);
    //Page
    const [page, setPage] = useState(1);
    //Per Page
    const [limit, setLimit] = useState(10);

    const handlePrevPage = () => {
        setPage((page) => {
            if (page === 1){
                return page;
            }
            else {
                return page-1;
            }
        })
    }

    const handleNextPage = () => {
        setPage((page) => page + 1)
    }

    const handlePageLimit = (e) => {
        const value = e.target.value;
        setLimit(parseInt(value));
    }
    
    useEffect(() => {
        const displayUsersOnChange = async () => {
            if (query) {
                const items = await fetchUsers();   
                setUsers(items);
            }
        }
        displayUsersOnChange();
    }, [page, limit])
    const fetchUsers = async () => {
        try {
            const {data} = await axios.get("https://api.github.com/search/users?q="+query,{
                params: {
                    page,
                    per_page: limit,
                },
            });
            return data?.items;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    
    const handleSearchUsers = async (e) => {
        e.preventDefault();
        
        if (query) {
            setLoad(true);
            const items = await fetchUsers();
            setUsers(items);
            setLoad(false);
        }
        else {
            console.log("Your query is empty...");
        }
    }
    return (
        <div className="container">
            <div className="search-form">
                <h2>Github Search User</h2>
                <form>
                    <input value={query} onChange={handlQueryInput} type="text" name="" id="" />
                    <button onClick={handleSearchUsers}>Search</button>
                </form>
            </div>
            <div className="search-results">
                <div className="more-options">
                    <label>
                        Items Per Page
                        <select onChange={handlePageLimit}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                    <div className="pagination">
                        <button onClick={handlePrevPage}>&lt;</button>
                        <button>{page}</button>
                        <button>{page + 1}</button>
                        <button onClick={handleNextPage}>&gt;</button>
                    </div>
                </div>
                {users ? (
                    // console.log(users),
                    users.map((user) => {
                        return <User user={user} key={user.id} />;
                    })
                ) : (
                    <h2>There is nothing to display...</h2>
                )}
            </div>
            <div>
                {load ? <LoadingScreen /> : null}
            </div>
        </div>
    )
}
export default Home;
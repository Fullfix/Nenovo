import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import Anime, { anime } from 'react-anime'
import Cookies from 'js-cookie'

class Newest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            news: []
        }
    }
    componentWillMount(){
        fetch('http://localhost:3001/api/article/recent')
        .then((res) => res.json())
        .then((res) => {
            let promise = new Promise((ress) => {
                this.setState({news: res.response.articles})
            })
            promise.finally((ress) => {
                console.log(res.response.articles)
            })
            console.log(1)
            console.log(this.state.news)
        })
    }
    render(){
        return (
            <>
                <h1>Дичь новая</h1>
                <p>Новостей: {this.state.news.length}</p>
                <div className="item-list">
                {this.state.news.map(
                    (ne)=>
                    <div className="item">
                        <div className="item-pic">
                            <img src={ne.imageSrc}></img>
                        </div>
                        <div className="item-cont">
                            <a href={ne.originSrc}><p>{ne.title}</p></a>
                        </div>
                    </div>
                )}
                </div>
            </>
        )

    }
}
export default Newest;
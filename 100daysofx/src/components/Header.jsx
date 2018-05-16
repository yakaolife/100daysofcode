import React from 'react';
import "../styles/css/Header.css";
import NewPost from "./NewPost";
import _ from 'lodash';
import new_post_icon from "../assets/add-circle-icon.svg";

const DELTA = 5;

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lastScrollTop: 0,
            navClass: "nav-down",
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.hasScrolled = this.hasScrolled.bind(this);
        this.hideHeader = this.hideHeader.bind(this);
        this.showHeader = this.showHeader.bind(this);
        this.getDocHeight = this.getDocHeight.bind(this);
        this.getHeight = this.getHeight.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.hasScrolled);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hasScrolled);
    }

    handleScroll(event) {
        _.throttle(this.hasScrolled(), 250);
    }

    hasScrolled() {
        const st = window.scrollY;
        if (!this.navbarHeight) {
            return;
        }
        // Make sure they scroll more than delta
        if(Math.abs(this.state.lastScrollTop - st) <= DELTA)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > this.state.lastScrollTop && st > this.navbarHeight){
            // Scroll Down
            this.hideHeader();
        } else {
            if(st < this.getDocHeight()) {
              this.showHeader();
            }
        }

        this.setState({
            lastScrollTop: st
        });
    }

    hideHeader() {
        this.setState({
            navClass: 'nav-up'
        })
    }

    showHeader() {
        this.setState({
            navClass: 'nav-down'
        })
    }

    getDocHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    getHeight(ref) {
        if (ref) {
            this.navbarHeight = ref.offsetHeight;
        }
    }

    render() {
        const { newPost } = this.props;
        return (
            <header id="navbar" className={this.state.navClass} ref={this.getHeight}>
                <div className="header-container">
                    <div className="left"></div>
                    <div className="center">100 days of _</div>
                    <div className="right">
                        <input type="image" src={new_post_icon} className="new-post" onClick={newPost}/>
                    </div>
                </div>
            </header>
        );

    }
}
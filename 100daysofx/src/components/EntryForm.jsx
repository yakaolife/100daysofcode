import React from 'react';

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            id: 0,
            title: "",
            content: "",
            date: "",
        };
    }

    // componentWillReceiveProps(newProps) {
        // TODO: for Edits?
    // }

    // componentDidMount() {
    //     const { entry } = this.props;
    //     if (entry) {
    //         this.setState({
    //             title: entry.title,
                
    //         })
    //     }
    // }

    onSubmit(event) {
        const { onSubmit } = this.props;
        console.log("onSubmit:", onSubmit);
        onSubmit(this.state);
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    render() {
        return (
            <form className="entry-form" onSubmit={this.onSubmit}>
                <input type="text" name="title" placeholder="title" onChange={this.onChange}/>
                <textarea name="content" value={this.state.content} onChange={this.onChange}/>
                <input type="submit" value="Done" />
            </form>
        );
    }
}

export default EntryForm;
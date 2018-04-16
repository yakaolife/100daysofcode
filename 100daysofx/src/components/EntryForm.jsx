import React from 'react';

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.state = {
            title: "",
            content: "",   
            editMode: true,
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        const { entry } = this.props;
        if (entry) {
            console.log("has entry!", entry);
            const { id, title, content, date } = entry;
            this.setState({
                id: id,
                title: title,
                content: content,
                date: date,
                editMode: false,
            });
        } 
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onEdit() {
        this.setState({ editMode: true });
    }

    onSubmit() {
        const { onSubmit } = this.props;
        const { id } = this.state;
        debugger
        onSubmit(this.state);
        if (id) {
            this.setState({ editMode: false });
        } else {
            //clear form
            this.setState({
                title: "",
                content: "",
            })
        }
    }

    render() {
        const { onDelete } = this.props;
        const { date, title, content, id, editMode } = this.state;

        if (!editMode) {
            return (
                <div className="entry">
                    <div className="entry-body">
                        {date}
                        <h1>{title}</h1>
                        <p>{content}</p>
                        <button onClick={(e) => onDelete(id)}>Delete</button>
                        <button onClick={this.onEdit}>Edit</button>
                    </div>
                </div>);
        }

        return (
            <div className="entry-form">
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.onChange}/>
                <textarea name="content" value={this.state.content} onChange={this.onChange}/>
                <input type="button" value="Post" onClick={this.onSubmit}/>
            </div>
        );
    }
}

export default EntryForm;
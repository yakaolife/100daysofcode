import React from "react";
import "./EntryForm.css";
import RichTextEditor from "react-rte";

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.state = {
            title: "",
            content: "",   
            editMode: true,
            value: RichTextEditor.createEmptyValue(),
        };
    }

    componentDidMount() {
        const { entry } = this.props;
        if (entry) {
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

    onCancel() {
        this.setState({editMode: false});
    }

    onEditorChange(value) {
        this.setState({value});
    }


    onEdit() {
        const value = RichTextEditor.createValueFromString(this.state.content, 'html');
        this.setState({ editMode: true, value });
    }

    onSubmit() {
        const { onSubmit } = this.props;
        const { id } = this.state;
        // for rich text
        this.setState({ content: this.state.value.toString('html') }, () => {
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
        });
    }

    render() {
        const { onDelete } = this.props;
        const { date, title, content, id, editMode } = this.state;

        if (!editMode) {
            return (
                <div className="entry">
                    <div className="entry-body">
                        {date}
                        <h1 className="entry-title">{title}</h1>
                        <p className="entry-content" dangerouslySetInnerHTML={{__html: content}}></p>
                        <button onClick={(e) => onDelete(id)}>Delete</button>
                        <button onClick={this.onEdit}>Edit</button>
                    </div>
                </div>);
        }

        // toolbar config
        const toolbarConfig = {
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item'},
              {label: 'OL', style: 'ordered-list-item'},
              {label: 'Blockquote', style: 'blockquote'},
              {label: 'Codeblock', style: 'code'}
            ]
        };

        return (
            <div className="entry-form">
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.onChange}/>
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    value={this.state.value}
                    onChange={this.onEditorChange}
                />
                <input type="button" value="Post" onClick={this.onSubmit}/>
                <input type="button" value="Cancel" onClick={this.onCancel}/>
            </div>
        );
    }
}

export default EntryForm;
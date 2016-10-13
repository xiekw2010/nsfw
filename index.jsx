import React from 'react'
import ReactDOM from 'react-dom'

import marked from 'marked'
import hljs from 'highlight.js'
import md from 'raw!./README.md'

const renderer = new marked.Renderer()

renderer.listitem = (text) => {
    if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
            .replace(/^\s*\[ \]\s*/, '<input type="checkbox" class="task-list-item-checkbox" disabled> ')
            .replace(/^\s*\[x\]\s*/, '<input type="checkbox" class="task-list-item-checkbox" checked disabled> ')

        return `<li class="task-list-item">${text}</li>\n`
    } else {
        return `<li>${text}</li>\n`
    }
}

marked.setOptions({
    renderer: renderer,
    highlight: (code, lang, callback) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, code).value
            } catch (err) { }
        }

        try {
            return hljs.highlightAuto(code).value
        } catch (err) { }

        return ''
    }
})

import Dropzone from 'react-dropzone'

import './main.css'

class Ribbons extends React.Component {

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            right: 0,
            border: 0,
            zIndex: 1
        }

        return (
            <a href="https://github.com/itoolset/nsfw">
                <img style={style} src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" />
            </a>
        )
    }

}

class Upload extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            files: []
        }

        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(files) {
        files.forEach((file) => {
            const formData = new FormData()
            formData.append('file', file)

            $.ajax({
                url: '/nsfw/api/0/score',
                type: 'POST',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: (res) => {
                    res['preview'] = file.preview
                    this.setState({
                        files: this.state.files.concat(res)
                    })
                },
                error: () => {
                    console.log('error: ajax')
                }
            })
        })
    }

    render() {
        const upload = {
            backgroundColor: "white",
            padding: "1rem",
            boxShadow: "0 10px 6px -6px gray",
            borderRadius: "4px"
        }

        return (
            <div className="col-md-6">
                <div style={upload}>
                    <div style={{ marginBottom: "1rem" }}>
                        <h1>Try it out!</h1>
                    </div>
                    <div style={{ marginBottom: "3rem" }}>
                        <Dropzone className="dropzone" accept="image/jpeg" multiple={false} onDrop={this.onDrop}>
                            <div className="dz-message">
                                Drop files here or click to upload.
                                <br/>
                                <span className="note">(The maximum file size limit for uploads is 1MB, <br/>only jpeg format are allowed.) </span>
                            </div>
                        </Dropzone>
                        {
                            // result list
                            // TODO: rewrite this code
                            this.state.files.length > 0 ?
                                <div style={{ marginTop: "3rem" }}>
                                    <ul className="list-group">
                                        {
                                            this.state.files.map((file) =>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <img src={file.preview} className="img-fluid" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <p style={{ overflowWrap: "break-word" }}>name: {file.name}</p>
                                                            <p style={{ overflowWrap: "break-word" }}>NSFW score: {file.score}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class Guides extends React.Component {

    createMarkup() {
        return {
            __html: marked(md)
        }
    }

    render() {
        const guides = {
            backgroundColor: "white",
            boxShadow: "0 10px 6px -6px gray",
            borderRadius: "4px"
        }

        return (
            <div className="col-md-6">
                <div style={guides}>
                    <article className="markdown-body" dangerouslySetInnerHTML={this.createMarkup() } />
                </div>
            </div>
        )
    }

}

class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">© itoolset 2016, all rights reserved.</span>
                </div>
            </footer>
        )
    }

}

class App extends React.Component {

    render() {
        return (
            <div id="content">
                <Ribbons />
                <div className="container">
                    <div className="row" style={{ margin: "2rem 0" }}>
                        <Upload />
                        <Guides />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

ReactDOM.render(
    <App />,
    document.querySelector('body')
)

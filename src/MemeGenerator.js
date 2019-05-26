import React from "react";

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.generateMeme = this.generateMeme.bind(this);
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(response => {

                this.setState({
                    allMemeImgs: response.data.memes
                })

            })
    }
    handleChange(event){
       
        const {name,value} = event.target;
        this.setState({
            [name] : value
        })
        
    }

    generateMeme(event){
        event.preventDefault();
        const index = Math.floor(Math.random() * 100);
        this.setState(prevState => {
            return {
                randomImage:prevState.allMemeImgs[index].url
            }
        })
    }
    render() {
        return(
        <div>
            <form className="meme-form" onSubmit={this.generateMeme}>

                <input type="text" 
                name="topText" 
                value={this.state.topText} 
                onChange={this.handleChange}
                placeholder="Top Text"/>

                <input type="text" 
                name="bottomText" 
                value={this.state.bottomText} 
                onChange={this.handleChange}
                placeholder="Bottom Text"/>

                <button>Gen</button>
            </form>
            <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
        </div>
        )}
}

export default MemeGenerator;
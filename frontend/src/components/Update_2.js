import React from 'react';
class Update_2 extends React.Component{
    constructor(){
        super();
        this.state={
            author:'',
            guide:'',
            review:'',
            rating:''
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }

    // Input Change Handler
    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // Submit Form
    submitForm(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/reviewOnGuides/'+id+'/',{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
    }

    fetchData(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/reviewOnGuides/'+id)
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                author:data.author,
                guide:data.guide,
                review:data.review,
                rating:data.rating
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        return (
            <table className="table table-bordered">
                <tbody>
                    {/* <tr>
                        <th>Tourist</th>
                        <td>
                            <input value={this.state.author} name="author" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr> */}
                    <tr>
                        <th>Guide</th>
                        <td>
                            <input value={this.state.guide} name="guide" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Review</th>
                        <td>
                            <input value={this.state.review} name="review" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Rating</th>
                        <td>
                            <input value={this.state.rating} name="rating" onChange={this.changeHandler} type="number" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Update_2;
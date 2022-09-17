import React,{Component} from "react"
import Brands from "./Brand";

class BrandProducts extends Component{
    constructor(){
        super();
        this.state = {
            brands: []
        }
    }
    componentDidMount(){
        fetch("/brand")
        .then(res => res.json())
        .then(data => {
            this.setState({ brands: data.data })
        })
    .catch(error => console.log(error))
    }
    render(){
        return(
            <div className="brand-list">
            <h3 className="title-productList">Listado productos con categorias</h3>
            {this.state.brands? this.state.brands.map((brand, i) =>
            <Brands key = {i} {...brand} />): <div>loading Brands...</div>
        }

            </div>
        )
    }
}

export default BrandProducts
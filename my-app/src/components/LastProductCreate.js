import React,{Component} from "react"
import LastProduct from "./LastProduct";

class LastProductCreate extends Component{
    constructor(){
        super();
        this.state = {
            products: []
        }
    }
    componentDidMount(){
        fetch("/products")
        .then(res => res.json())
        .then(data => {
            this.setState({ products: data.data })
        })
    .catch(error => console.log(error))
    }
    render(){
        return(
            <div className="product-list">
                <h3>Listado nombres de productos</h3>
                {this.state.products? this.state.products.map((product, i) =>
                <LastProduct key = {i} {...product} />): <div>loading products...</div>
            }

            </div>
        )
    }
}

export default LastProductCreate
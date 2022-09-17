import React,{Component} from "react"
import Product from "./Product";
import '../App.css';

class ProductList extends Component{
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
                <h3>Listado productos con categorias</h3>
                {this.state.products? this.state.products.map((product, i) =>
                <Product key = {i} {...product} />): <div>loading products...</div>
            }

            </div>
        )
    }
}

export default ProductList
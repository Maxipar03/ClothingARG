import React,{Component} from "react"

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
            <div className="row">
                {this.state.products.map((product, i) =>
                <div key = {i + product} className="col-lg-6 mb-4">
                    <div className="card bg-dark text-white shadow">
                    {product.name}
                    {product.brands.name}
                    </div>
                </div>
                )
            }

            </div>
        )
    }
}

export default ProductList
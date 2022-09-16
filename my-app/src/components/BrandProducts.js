import React,{Component} from "react"

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
            <div className="row">
                {this.state.brands.map((brand, i) =>
                <div key = {i + brand} className="col-lg-6 mb-4">
                    <div className="card bg-dark text-white shadow">
                   <h4>cantidad de productos de {brand.name}:</h4>
                    {brand.products.length}
                    </div>
                </div>
                )
            }

            </div>
        )
    }
}

export default BrandProducts
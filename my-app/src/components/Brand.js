export default function Brands({name,products}){
return(
    <div className="row"> 
        <div >
           <h3 className="countProduct">Cantidad de productos de {name}:</h3>
            <h4 className="cantidad">{products.length}</h4>
            </div>
        </div>
    )}
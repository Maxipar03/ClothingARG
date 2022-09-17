export default function Brands({name,products}){
return(
    <div className="row"> 
        <div >
           <h4 className="countProduct">Cantidad de productos de {name}:</h4>
            <h4 className="cantidad">{products.length}</h4>
            </div>
        </div>
    )}
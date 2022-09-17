export default function Product({name,brands}){
return(
        <div >
         <h3 className="product-name">{name}:</h3>
         <h4 className="categoria">{brands.name}</h4>
        </div>
)
}
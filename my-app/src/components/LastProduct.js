export default function LastProduct({name,images,brands,colors,price}){
return(
    <div className="row">
        
        <div >
        <img src= {images && images.url} width="300" alt="product img"/>
        <h3 className="product-name-last-label">Nombre:</h3>  
         <h3 className="product-name-last">{name}</h3>
         <h3 className="product-name-last-label">Marca:</h3>
         <h3 className="product-name-last">{brands.name}</h3>
         <h3 className="product-name-last-label">Color:</h3>
         <h3 className="product-name-last">{colors.name}</h3>
         <h3 className="product-name-last-label">precio:</h3>
         <h3 className="product-name-last">{price} USD</h3>
           
        </div>

    </div>
)
}
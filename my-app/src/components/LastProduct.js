export default function LastProduct({name,images}){
return(
    <div className="row">
        
        <div >
         <h3 className="product-name">{name}</h3>
         <img src= {images && images.url} width="50" alt="product img"/>

        </div>

    </div>
)
}
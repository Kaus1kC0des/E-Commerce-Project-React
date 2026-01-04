import Product from "./Products.jsx"

export function ProductsGrid({products, loadCart}) {
    return(
        <div className="products-grid">
            {
                products.map((product) =>{
                    return <Product product={product} loadCart={loadCart} key={product.id}/>
                })
            }
        </div>
    )
}
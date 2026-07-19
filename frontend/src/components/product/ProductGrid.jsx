import ProductCard from './ProductCard';

export default function ProductGrid({ products, searchQuery }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5 xl:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} searchQuery={searchQuery} />
      ))}
    </div>
  );
}

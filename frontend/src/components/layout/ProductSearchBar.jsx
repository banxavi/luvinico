import ProductSearchForm from './ProductSearchForm';

/** Thanh tìm kiếm cố định — chỉ desktop (lg+). Mobile dùng icon trong Header */
export default function ProductSearchBar() {
  return (
    <div className="hidden border-t border-white/10 bg-premium-black/75 lg:block">
      <div className="site-container py-2.5 sm:py-3">
        <ProductSearchForm />
      </div>
    </div>
  );
}

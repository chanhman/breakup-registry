export default function Filters() {
  return (
    <div>
      <select name="items">
        <option value="">All items</option>
        <option value="purchased">Purchased items</option>
        <option value="unpurchased">Unpurchased items</option>
      </select>
      <select name="items">
        <option value="">Price</option>
        <option value="under-50">Under $50</option>
        <option value="under-100">Under $100</option>
        <option value="above-100">Above $100</option>
      </select>
    </div>
  );
}

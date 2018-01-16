export default ({ isSelected, value, children }) => (
  isSelected
  ? <option value={value} selected={true}>{children}</option>
  : <option value={value}>{children}</option>
);
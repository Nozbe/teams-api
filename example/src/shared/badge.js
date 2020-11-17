const Badge = ({ elementId, selectedElementId }) =>
  elementId === selectedElementId ? "[x] " : "[ ] ";

export default Badge;
